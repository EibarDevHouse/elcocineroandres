const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Image optimization configurations
const images = [
  { name: 'tacos.jpg', width: 480, quality: 75 },
  { name: 'pizzas.jpeg', width: 480, quality: 75 },
  { name: 'pizzas-2.jpeg', width: 480, quality: 75 },
  { name: 'ceviches.jpeg', width: 480, quality: 75 },
  { name: 'open-graph.jpg', width: 1200, quality: 80 },
  { name: 'logo-green.png', width: 200, quality: 85 },
];

async function optimizeImages() {
  for (const img of images) {
    const inputPath = path.join(publicDir, img.name);
    const outputNameWithoutExt = path.basename(img.name, path.extname(img.name));

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  File not found: ${img.name}`);
      continue;
    }

    try {
      // WebP version
      const webpPath = path.join(publicDir, `${outputNameWithoutExt}.webp`);
      await sharp(inputPath)
        .resize(img.width, null, { withoutEnlargement: true })
        .webp({ quality: img.quality })
        .toFile(webpPath);

      const webpSize = fs.statSync(webpPath).size / 1024;
      console.log(`✅ ${outputNameWithoutExt}.webp - ${webpSize.toFixed(2)} KB`);

      // AVIF version (even smaller)
      const avifPath = path.join(publicDir, `${outputNameWithoutExt}.avif`);
      await sharp(inputPath)
        .resize(img.width, null, { withoutEnlargement: true })
        .avif({ quality: img.quality })
        .toFile(avifPath);

      const avifSize = fs.statSync(avifPath).size / 1024;
      console.log(`✅ ${outputNameWithoutExt}.avif - ${avifSize.toFixed(2)} KB`);

      // Original optimization
      const originalPath = inputPath;
      const originalStats = fs.statSync(originalPath);
      console.log(`📊 Original size: ${(originalStats.size / 1024).toFixed(2)} KB\n`);

    } catch (error) {
      console.error(`❌ Error optimizing ${img.name}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!');
}

optimizeImages();
