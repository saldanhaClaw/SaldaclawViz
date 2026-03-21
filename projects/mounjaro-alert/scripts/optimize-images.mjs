import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const projects = [
  { dir: 'mounjaro-alert', assets: ['ebook-mockup-luxury.png', 'hero-luxury-8k.png', 'social-preview-luxury.jpg'] },
  { dir: 'ebookgen-pro', assets: ['ebook-mockup-luxury.png', 'hero-luxury-8k.png', 'social-preview-luxury.jpg'] },
];

for (const proj of projects) {
  for (const asset of proj.assets) {
    const filePath = path.join(proj.dir, 'public', asset);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Not found: ${filePath}`);
      continue;
    }
    const ext = path.extname(asset).toLowerCase();
    const optimizedPath = path.join(proj.dir, 'public', `optimized-${asset}`);

    try {
      let sharpInst = sharp(filePath);
      const metadata = await sharpInst.metadata();

      // Resize if too large: target max 2000px on longest side, quality 80
      let { width, height } = metadata;
      const maxDim = 2000;
      if (width > maxDim || height > maxDim) {
        if (width >= height) {
          height = Math.round((height / width) * maxDim);
          width = maxDim;
        } else {
          width = Math.round((width / height) * maxDim);
          height = maxDim;
        }
        sharpInst = sharpInst.resize(width, height);
      }

      // Compress: webp for better compression, keep original ext alternative
      if (ext === '.jpg' || ext === '.jpeg') {
        await sharpInst.jpeg({ quality: 80, mozjpeg: true }).toFile(optimizedPath);
      } else if (ext === '.png') {
        await sharpInst.png({ compressionLevel: 9, quality: 80 }).toFile(optimizedPath);
      } else {
        // default to webp
        await sharpInst.webp({ quality: 80 }).toFile(optimizedPath.replace(/\.[^.]+$/, '.webp'));
      }

      const origSize = fs.statSync(filePath).size;
      const newSize = fs.statSync(optimizedPath).size;
      console.log(`✅ ${proj.dir}/${asset}: ${(origSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB`);
    } catch (err) {
      console.error(`❌ Error processing ${filePath}:`, err.message);
    }
  }
}