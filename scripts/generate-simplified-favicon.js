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

async function generateWhiteBrain(size) {
  // Extract brain from logo
  const brainRaw = await sharp(LOGO)
    .extract({ left: 29, top: 35, width: 442, height: 255 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = 442, h = 255, ch = brainRaw.info.channels;

  // Create white silhouette: any pixel with alpha > 0 = solid white
  const silhouette = Buffer.alloc(w * h * ch);
  for (let i = 0; i < w * h; i++) {
    const a = brainRaw.data[i * ch + 3];
    if (a > 20) {
      silhouette[i * ch + 0] = 255;
      silhouette[i * ch + 1] = 255;
      silhouette[i * ch + 2] = 255;
      silhouette[i * ch + 3] = 255;
    } else {
      silhouette[i * ch + 3] = 0;
    }
  }

  const silhouettePng = await sharp(silhouette, {
    raw: { width: w, height: h, channels: ch },
  }).png().toBuffer();

  // Square canvas
  const square = await sharp(silhouettePng)
    .resize(442, 442, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Resize to target with binary alpha
  const resized = await sharp(square)
    .resize(size, size, { fit: 'fill', kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pxCount = size * size;
  const out = Buffer.alloc(pxCount * ch);
  let opq = 0;
  for (let i = 0; i < pxCount; i++) {
    out[i * ch + 0] = resized.data[i * ch + 0];
    out[i * ch + 1] = resized.data[i * ch + 1];
    out[i * ch + 2] = resized.data[i * ch + 2];
    out[i * ch + 3] = resized.data[i * ch + 3] > 30 ? 255 : 0;
    if (out[i * ch + 3] === 255) opq++;
  }

  const buf = await sharp(out, {
    raw: { width: size, height: size, channels: ch },
  }).png().toBuffer();

  return { buf, opq };
}

async function main() {
  console.log('=== Generating white single-color brain favicon ===\n');

  const faviconSizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of faviconSizes) {
    const { buf, opq } = await generateWhiteBrain(size);
    console.log(`  ${size}x${size}: ${buf.length} bytes, ${opq}/${size*size} opaque`);
    pngBuffers.push(buf);
  }

  // 192x192 for android
  const { buf: buf192 } = await generateWhiteBrain(192);
  console.log('  192x192:', buf192.length, 'bytes');

  console.log('\n=== Writing files ===');
  fs.writeFileSync(path.join(OUT_APP, 'icon.png'), pngBuffers[1]);
  console.log('Written: src/app/icon.png (32x32)');

  const icoBuf = await createICO(pngBuffers, faviconSizes);
  fs.writeFileSync(path.join(OUT_APP, 'favicon.ico'), icoBuf);
  console.log('Written: src/app/favicon.ico (16+32+48)');

  const OUT_PUBLIC = path.join(__dirname, '..', 'public', 'favicons');
  fs.writeFileSync(path.join(OUT_PUBLIC, 'favicon-16x16.png'), pngBuffers[0]);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'favicon-32x32.png'), pngBuffers[1]);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'android-chrome-192x192.png'), buf192);
  console.log('Written: public/favicons/');

  console.log('\nDone!');
}

main().catch(err => { console.error(err); process.exit(1); });
