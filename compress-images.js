const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public';
const outputDir = './public';

const images = [
  'branding.png',
  'calender.png', 
  'design.png',
  'energy.png',
  'fashion.png',
  'healthy.png'
];

async function compressImage(filename) {
  const inputPath = path.join(inputDir, filename);
  const outputPath = path.join(outputDir, filename.replace('.png', '.jpg'));
  
  try {
    const originalSize = fs.statSync(inputPath).size;
    
    await sharp(inputPath)
      .resize(800, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ 
        quality: 70,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath);
    
    const newSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${filename}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024).toFixed(0)}KB (${savings}% smaller)`);
    
    // Replace original with compressed
    fs.unlinkSync(inputPath);
    fs.renameSync(outputPath, inputPath.replace('.png', '.jpg'));
    
  } catch (err) {
    console.error(`❌ Error with ${filename}:`, err.message);
  }
}

async function main() {
  console.log('🔄 Compressing images...\n');
  
  for (const image of images) {
    await compressImage(image);
  }
  
  console.log('\n✨ Done! Images are now optimized.');
}

main();
