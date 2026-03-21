import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDcf98UcLsxshgPtzW1dUYR7EDX6fv2h5g');

async function generateProductImage() {
  const { imagen } = await genAI.getImageModel('imagen-3.0-generate-001');
  const prompt = 'Sleek modern pharmaceutical product packaging, gold and black, luxury health supplement, 3D render, studio lighting, 8k, photorealistic, no text';
  const { images } = await imagen.generate({
    prompt,
    config: { aspectRatio: '1:1', size: '1024x1024' },
  });
  const image = images[0];
  const buffer = Buffer.from(image, 'base64');
  require('fs').writeFileSync('public/assets/product-mockup.jpg', buffer);
  console.log('✅ Product mockup generated (Gemini)');
}

generateProductImage().catch(console.error);
