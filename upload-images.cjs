const fs = require('fs');
const https = require('https');
const FormData = require('form-data');

const IMGBB_API_KEY = '93682dbb2192580f876d565b1d040edc';

const images = [
  { name: 'branding.png', path: './public/branding.png' },
  { name: 'calender.png', path: './public/calender.png' },
  { name: 'design.png', path: './public/design.png' },
  { name: 'energy.png', path: './public/energy.png' },
  { name: 'fashion.png', path: './public/fashion.png' },
  { name: 'healthy.png', path: './public/healthy.png' }
];

async function uploadToImgBB(imagePath, name) {
  const fileData = fs.readFileSync(imagePath);
  const base64 = fileData.toString('base64');
  
  const form = new FormData();
  form.append('key', IMGBB_API_KEY);
  form.append('image', base64);
  
  return new Promise((resolve, reject) => {
    const request = https.request({
      hostname: 'api.imgbb.com',
      path: '/1/upload',
      method: 'POST',
      headers: form.getHeaders()
    }, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.success) {
            resolve(result.data.url);
          } else {
            reject(new Error(result.error?.message || 'Upload failed'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    
    request.on('error', reject);
    form.pipe(request);
  });
}

async function main() {
  console.log('Uploading images to IMGBB...\n');
  
  const urls = {};
  
  for (const img of images) {
    if (!fs.existsSync(img.path)) {
      console.log(`❌ ${img.name} not found, skipping...`);
      continue;
    }
    
    try {
      console.log(`Uploading ${img.name}...`);
      const url = await uploadToImgBB(img.path, img.name);
      urls[img.name.replace('.png', '')] = url;
      console.log(`✅ ${img.name}: ${url}\n`);
    } catch (err) {
      console.error(`❌ Error uploading ${img.name}:`, err.message);
    }
  }
  
  console.log('\n🎉 All images uploaded!');
  console.log('\nCopy these URLs to your App.tsx:');
  console.log(JSON.stringify(urls, null, 2));
}

main().catch(console.error);
