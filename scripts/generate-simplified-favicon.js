const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const LOGO = path.join(__dirname, '..', 'public', 'images', 'logo.png');
const OUT_APP = path.join(__dirname, '..', 'src', 'app');

async function createICO(pngBuffers, sizes) {
  const count = sizes.length;
  const headerSize = 6 + count * 16;
  let dataOffset = headerSize;
  const entries = [];
  const images = [];
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    entries.push({
      width: size > 255 ? 0 : size,
      height: size > 255 ? 0 : size,
      colors: 0, reserved: 0, planes: 1, bpp: 32,
      size: buf.length, offset: dataOffset,
    });
    images.push(buf);
    dataOffset += buf.length;
  }
  const ico = Buffer.alloc(dataOffset);
  ico.writeUInt16LE(0, 0);
  ico.writeUInt16LE(1, 2);
  ico.writeUInt16LE(count, 4);
  let offset = 6;
  for (const e of entries) {
    ico.writeUInt8(e.width, offset);
    ico.writeUInt8(e.height, offset + 1);
    ico.writeUInt8(e.colors, offset + 2);
    ico.writeUInt8(e.reserved, offset + 3);
    ico.writeUInt16LE(e.planes, offset + 4);
    ico.writeUInt16LE(e.bpp, offset + 6);
    ico.writeUInt32LE(e.size, offset + 8);
    ico.writeUInt32LE(e.offset, offset + 12);
    offset += 16;
  }
  for (const img of images) {
    img.copy(ico, offset);
    offset += img.length;
  }
  return ico;
}

async function makeFavicon(srcBuffer, size) {
  // Step 1: Resize to target
  const resized = await sharp(srcBuffer)
    .resize(size, size, { fit: 'fill', kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = resized.info.channels;
  const pxCount = size * size;
  const outData = Buffer.alloc(pxCount * ch);

  // Step 2: For each pixel, force alpha to 0 or 255 (binary alpha)
  // Also sample RGB from the center of the brain (average of non-transparent source pixels)
  let opqCount = 0;
  for (let i = 0; i < pxCount; i++) {
    const a = resized.data[i * ch + 3];
    outData[i * ch + 0] = resized.data[i * ch + 0]; // R
    outData[i * ch + 1] = resized.data[i * ch + 1]; // G
    outData[i * ch + 2] = resized.data[i * ch + 2]; // B
    outData[i * ch + 3] = a > 30 ? 255 : 0;          // Binary alpha threshold
    if (a > 30) opqCount++;
  }

  const buf = await sharp(outData, {
    raw: { width: size, height: size, channels: ch },
  }).png().toBuffer();

  return { buf, opqCount };
}

async function main() {
  console.log('=== Step 1: Extract brain + force opaque ===');
  const { data: rawBrain, info } = await sharp(LOGO)
    .extract({ left: 29, top: 35, width: 442, height: 255 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width, h = info.height, ch = info.channels;
  const opaqueData = Buffer.alloc(w * h * ch);
  for (let i = 0; i < w * h; i++) {
    opaqueData[i * ch + 0] = rawBrain[i * ch + 0];
    opaqueData[i * ch + 1] = rawBrain[i * ch + 1];
    opaqueData[i * ch + 2] = rawBrain[i * ch + 2];
    opaqueData[i * ch + 3] = rawBrain[i * ch + 3] > 0 ? 255 : 0;
  }
  const opaqueBrain = await sharp(opaqueData, {
    raw: { width: w, height: h, channels: ch },
  }).png().toBuffer();
  console.log('Brain made fully opaque:', w + 'x' + h);

  console.log('\n=== Step 2: Create square canvas ===');
  const squareBrain = await sharp(opaqueBrain)
    .resize(442, 442, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      position: 'center',
    })
    .png()
    .toBuffer();

  console.log('\n=== Step 3: Generate favicons with binary alpha ===');
  const faviconSizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of faviconSizes) {
    const { buf, opqCount } = await makeFavicon(squareBrain, size);
    console.log(`  ${size}x${size}: ${buf.length} bytes, ${opqCount}/${size*size} opaque`);
    pngBuffers.push(buf);
  }

  const buf192 = await sharp(squareBrain)
    .resize(192, 192, { fit: 'fill', kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch192 = buf192.info.channels;
  const out192 = Buffer.alloc(192 * 192 * ch192);
  for (let i = 0; i < 192 * 192; i++) {
    out192[i * ch192 + 0] = buf192.data[i * ch192 + 0];
    out192[i * ch192 + 1] = buf192.data[i * ch192 + 1];
    out192[i * ch192 + 2] = buf192.data[i * ch192 + 2];
    out192[i * ch192 + 3] = buf192.data[i * ch192 + 3] > 30 ? 255 : 0;
  }
  const buf192png = await sharp(out192, {
    raw: { width: 192, height: 192, channels: ch192 },
  }).png().toBuffer();
  console.log('  192x192:', buf192png.length, 'bytes');

  console.log('\n=== Step 4: Write files ===');
  fs.writeFileSync(path.join(OUT_APP, 'icon.png'), pngBuffers[1]);
  console.log('Written: src/app/icon.png');

  const icoBuf = await createICO(pngBuffers, faviconSizes);
  fs.writeFileSync(path.join(OUT_APP, 'favicon.ico'), icoBuf);
  console.log('Written: src/app/favicon.ico');

  const OUT_PUBLIC = path.join(__dirname, '..', 'public', 'favicons');
  fs.writeFileSync(path.join(OUT_PUBLIC, 'favicon-16x16.png'), pngBuffers[0]);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'favicon-32x32.png'), pngBuffers[1]);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'android-chrome-192x192.png'), buf192png);
  console.log('Written: public/favicons/');

  // Debug
  fs.writeFileSync(path.join(__dirname, 'debug-icon-32.png'), pngBuffers[1]);
  fs.writeFileSync(path.join(__dirname, 'debug-icon-16.png'), pngBuffers[0]);
  console.log('Written: scripts/debug-*.png');

  console.log('\nDone!');
}

main().catch(err => { console.error(err); process.exit(1); });
