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

async function main() {
  console.log('=== Step 1: Extract brain-only region from logo ===');

  // The brain occupies roughly rows 35-285, columns ~29-470
  // Extract that region with tight crop
  const brainBuffer = await sharp(LOGO)
    .extract({ left: 29, top: 35, width: 442, height: 255 })
    .toBuffer();
  console.log('Extracted brain region: 442x255');

  // Save a preview of the extracted brain
  fs.writeFileSync(path.join(__dirname, 'brain-extracted.png'), brainBuffer);

  console.log('\n=== Step 2: Create simplified high-contrast brain icon ===');

  // For favicon, we need a square canvas. Place brain centered on transparent bg.
  // The brain is ~442x255, so we'll pad to make it square (442x442) with brain centered.
  const brainMeta = await sharp(brainBuffer).metadata();
  const canvasSize = Math.max(brainMeta.width, brainMeta.height);
  const padX = Math.floor((canvasSize - brainMeta.width) / 2);
  const padY = Math.floor((canvasSize - brainMeta.height) / 2);

  // Create square canvas with brain centered, then boost contrast and sharpen
  const squareBrain = await sharp(brainBuffer)
    .resize(canvasSize, canvasSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      position: 'center',
    })
    .linear(1.3, -20)   // boost contrast: increase gain, reduce offset
    .sharpen({ sigma: 0.5 })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(__dirname, 'brain-square.png'), squareBrain);
  console.log('Created square brain canvas:', canvasSize + 'x' + canvasSize);

  console.log('\n=== Step 3: Generate optimized favicon sizes ===');

  const faviconSizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of faviconSizes) {
    const buf = await sharp(squareBrain)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        kernel: 'lanczos3',
      })
      .png()
      .toBuffer();
    pngBuffers.push(buf);
    console.log(`  ${size}x${size}: ${buf.length} bytes`);
  }

  // Also generate 192x192 for public/favicons (android)
  const buf192 = await sharp(squareBrain)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
    .png()
    .toBuffer();
  console.log('  192x192:', buf192.length, 'bytes');

  console.log('\n=== Step 4: Write favicon files ===');

  // icon.png = 32x32 (Next.js auto-resizes for <link rel="icon">)
  fs.writeFileSync(path.join(OUT_APP, 'icon.png'), pngBuffers[1]);
  console.log('Written: src/app/icon.png (32x32)');

  // favicon.ico = multi-resolution (16+32+48)
  const icoBuf = await createICO(pngBuffers, faviconSizes);
  fs.writeFileSync(path.join(OUT_APP, 'favicon.ico'), icoBuf);
  console.log('Written: src/app/favicon.ico (16+32+48 multi-res)');

  // public/favicons/
  const OUT_PUBLIC = path.join(__dirname, '..', 'public', 'favicons');
  fs.writeFileSync(path.join(OUT_PUBLIC, 'favicon-16x16.png'), pngBuffers[0]);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'favicon-32x32.png'), pngBuffers[1]);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'android-chrome-192x192.png'), buf192);
  console.log('Written: public/favicons/ variants');

  console.log('\n=== Done! ===');
  console.log('Brain-only icon (no text, tightly cropped, high contrast)');
  console.log('apple-icon.png left untouched (full-detail at 180x180)');
}

main().catch(err => { console.error(err); process.exit(1); });
