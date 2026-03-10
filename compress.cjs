const sharp = require('sharp');
const fs = require('fs');

const images = ['branding.png', 'calender.png', 'design.png', 'energy.png', 'fashion.png', 'healthy.png'];

async function compress() {
  for (const img of images) {
    const input = `public/${img}`;
    const output = `public/${img.replace('.png', '.jpg')}`;
    
    if (!fs.existsSync(input)) continue;
    
    const original = fs.statSync(input).size;
    
    await sharp(input)
      .resize(800, 1200, { fit: 'inside' })
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(output);
    
    const compressed = fs.statSync(output).size;
    const savings = ((original - compressed) / original * 100).toFixed(0);
    
    console.log(`${img}: ${(original/1024/1024).toFixed(1)}MB → ${(compressed/1024).toFixed(0)}KB (${savings}% أصغر)`);
    
    fs.unlinkSync(input);
    fs.renameSync(output, input);
  }
  console.log('تم الضغط بنجاح!');
}

compress().catch(console.error);
