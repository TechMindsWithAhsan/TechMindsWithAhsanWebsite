const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const LOGO = path.join(__dirname, '..', 'public', 'images', 'logo.png');
const OUT_APP = path.join(__dirname, '..', 'src', 'app');

async function createICO(pngBuffers, sizes) {
  // ICO file format:
  // ICONDIR (6 bytes): reserved(2) + type(2) + count(2)
  // ICONDIRENTRY (16 bytes each): width(1) + height(1) + colors(1) + reserved(1) + planes(2) + bpp(2) + size(4) + offset(4)
  // Image data: PNG data for each size

  const count = sizes.length;
  const headerSize = 6 + count * 16;
  let dataOffset = headerSize;

  const entries = [];
  const images = [];

  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const w = size > 255 ? 0 : size;
    const h = size > 255 ? 0 : size;

    entries.push({
      width: w,
      height: h,
      colors: 0,
      reserved: 0,
      planes: 1,
      bpp: 32,
      size: buf.length,
      offset: dataOffset,
    });

    images.push(buf);
    dataOffset += buf.length;
  }

  const totalSize = dataOffset;
  const ico = Buffer.alloc(totalSize);

  // ICONDIR
  ico.writeUInt16LE(0, 0);       // reserved
  ico.writeUInt16LE(1, 2);       // type = ICO
  ico.writeUInt16LE(count, 4);   // count

  let offset = 6;
  for (const entry of entries) {
    ico.writeUInt8(entry.width, offset);
    ico.writeUInt8(entry.height, offset + 1);
    ico.writeUInt8(entry.colors, offset + 2);
    ico.writeUInt8(entry.reserved, offset + 3);
    ico.writeUInt16LE(entry.planes, offset + 4);
    ico.writeUInt16LE(entry.bpp, offset + 6);
    ico.writeUInt32LE(entry.size, offset + 8);
    ico.writeUInt32LE(entry.offset, offset + 12);
    offset += 16;
  }

  for (const img of images) {
    img.copy(ico, offset);
    offset += img.length;
  }

  return ico;
}

async function main() {
  console.log('Reading logo from:', LOGO);
  const logo = sharp(LOGO);
  const metadata = await logo.metadata();
  console.log(`Original size: ${metadata.width}x${metadata.height}`);

  // Generate sizes
  const sizes = [16, 32, 48, 180, 192];
  const pngBuffers = [];

  for (const size of sizes) {
    const buf = await sharp(LOGO)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers.push(buf);
    console.log(`Generated ${size}x${size} PNG (${buf.length} bytes)`);
  }

  // Save individual PNGs
  const sizes32 = pngBuffers[1]; // 32x32
  const sizes16 = pngBuffers[0]; // 16x16
  const sizes180 = pngBuffers[3]; // 180x180
  const sizes192 = pngBuffers[4]; // 192x192

  // Write src/app/icon.png (32x32 - Next.js auto-resizes for favicon)
  fs.writeFileSync(path.join(OUT_APP, 'icon.png'), sizes32);
  console.log('Written: src/app/icon.png (32x32)');

  // Write src/app/apple-icon.png (180x180)
  fs.writeFileSync(path.join(OUT_APP, 'apple-icon.png'), sizes180);
  console.log('Written: src/app/apple-icon.png (180x180)');

  // Also save the public versions for explicit <link> tags
  const OUT_PUBLIC = path.join(__dirname, '..', 'public', 'favicons');
  if (!fs.existsSync(OUT_PUBLIC)) fs.mkdirSync(OUT_PUBLIC, { recursive: true });

  fs.writeFileSync(path.join(OUT_PUBLIC, 'favicon-16x16.png'), sizes16);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'favicon-32x32.png'), sizes32);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'apple-touch-icon.png'), sizes180);
  fs.writeFileSync(path.join(OUT_PUBLIC, 'android-chrome-192x192.png'), sizes192);
  console.log('Written: public/favicons/ variants');

  // Create multi-resolution favicon.ico (16x16 + 32x32 + 48x48)
  const icoBuf = await createICO([sizes16, sizes32, pngBuffers[2]], [16, 32, 48]);
  fs.writeFileSync(path.join(OUT_APP, 'favicon.ico'), icoBuf);
  console.log('Written: src/app/favicon.ico (multi-resolution 16+32+48)');

  console.log('\nDone! All favicon files generated.');
}

main().catch(err => { console.error(err); process.exit(1); });
