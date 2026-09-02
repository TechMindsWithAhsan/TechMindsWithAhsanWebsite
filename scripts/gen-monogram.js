const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BRAND_BLUE = { r: 74, g: 161, b: 216 };
const WHITE = { r: 255, g: 255, b: 255 };
const OUT_APP = path.join(__dirname, '..', 'src', 'app');
const OUT_PUBLIC = path.join(__dirname, '..', 'public', 'favicons');

async function createMonogram(size, radius) {
  const fontSize = Math.round(size * 0.62);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${radius}" fill="rgb(${BRAND_BLUE.r},${BRAND_BLUE.g},${BRAND_BLUE.b})" />
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial Black, Helvetica Neue, Arial, sans-serif" font-weight="900"
      font-size="${fontSize}" fill="rgb(${WHITE.r},${WHITE.g},${WHITE.b})">T</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function createICO(pngBuffers, sizes) {
  const count = sizes.length;
  const headerSize = 6 + count * 16;
  let dataOffset = headerSize;
  const entries = [];
  const images = [];
  for (let i = 0; i < count; i++) {
    entries.push({
      width: sizes[i] > 255 ? 0 : sizes[i],
      height: sizes[i] > 255 ? 0 : sizes[i],
      colors: 0, reserved: 0, planes: 1, bpp: 32,
      size: pngBuffers[i].length, offset: dataOffset,
    });
    images.push(pngBuffers[i]);
    dataOffset += pngBuffers[i].length;
  }
  const ico = Buffer.alloc(dataOffset);
  ico.writeUInt16LE(0, 0);
  ico.writeUInt16LE(1, 2);
  ico.writeUInt16LE(count, 4);
  let off = 6;
  for (const e of entries) {
    ico.writeUInt8(e.width, off);
    ico.writeUInt8(e.height, off + 1);
    ico.writeUInt8(e.colors, off + 2);
    ico.writeUInt8(e.reserved, off + 3);
    ico.writeUInt16LE(e.planes, off + 4);
    ico.writeUInt16LE(e.bpp, off + 6);
    ico.writeUInt32LE(e.size, off + 8);
    ico.writeUInt32LE(e.offset, off + 12);
    off += 16;
  }
  for (const img of images) {
    img.copy(ico, off);
    off += img.length;
  }
  return ico;
}

async function main() {
  console.log('=== Generating "T" monogram favicon set ===\n');

  const faviconSizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of faviconSizes) {
    const radius = Math.round(size * 0.22);
    const buf = await createMonogram(size, radius);
    pngBuffers.push(buf);
    console.log(`  favicon ${size}x${size}: ${buf.length} bytes`);
  }

  // icon.png (32x32)
  fs.writeFileSync(path.join(OUT_APP, 'icon.png'), pngBuffers[1]);
  console.log('\nWritten: src/app/icon.png (32x32)');

  // favicon.ico (16/32/48 multi-res)
  const icoBuf = await createICO(pngBuffers, faviconSizes);
  fs.writeFileSync(path.join(OUT_APP, 'favicon.ico'), icoBuf);
  console.log('Written: src/app/favicon.ico (16+32+48)');

  // apple-icon.png (180x180) — larger, more refined with bigger radius
  const appleRadius = Math.round(180 * 0.2);
  const appleBuf = await createMonogram(180, appleRadius);
  fs.writeFileSync(path.join(OUT_APP, 'apple-icon.png'), appleBuf);
  console.log('Written: src/app/apple-icon.png (180x180)');

  // public/favicons/
  fs.mkdirSync(OUT_PUBLIC, { recursive: true });
  fs.writeFileSync(path.join(OUT_PUBLIC, 'favicon-16x16.png'), pngBuffers[0]);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'favicon-32x32.png'), pngBuffers[1]);

  const appleTouchBuf = await createMonogram(180, appleRadius);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'apple-touch-icon.png'), appleTouchBuf);

  const androidRadius = Math.round(192 * 0.22);
  const androidBuf = await createMonogram(192, androidRadius);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'android-chrome-192x192.png'), androidBuf);

  console.log('Written: public/favicons/ (all variants)');
  console.log('\nDone!');
}

main().catch(err => { console.error(err); process.exit(1); });
