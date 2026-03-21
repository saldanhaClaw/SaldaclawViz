import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDcf98UcLsxshgPtzW1dUYR7EDX6fv2h5g');

async function generateImage(prompt, filename) {
  const { imagen } = await genAI.getImageModel('imagen-3.0-generate-001');
  const { images } = await imagen.generate({
    prompt,
    config: { aspectRatio: '1:1', size: '1024x1024' },
  });
  const image = images[0];
  const buffer = Buffer.from(image, 'base64');
  fs.writeFileSync(path.join('public', 'assets', filename), buffer);
  console.log(`✅ Generated ${filename}`);
}

async function main() {
  const assetsDir = path.join('public', 'assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  // Existing assets
  await generateImage(
    'Ultra-premium luxury health ebook cover, black and gold, cinematic lighting, 3D book mockup, floating, high detail, 8k',
    'offer-product-3d.png'
  );

  await generateImage(
    'Professional female pharmacist, 40 years old, white coat, studio lighting, trustworthy, high resolution, portrait',
    'author-anna.jpg'
  );

  await generateImage(
    'Abstract black and gold luxury background, sparkling particles, gradient, high end, 8k',
    'hero-background-luxury.png' // Gemini generates PNG
  );

  await generateImage(
    'Gold premium icon set: book open, checklist checklist, crown, on black background, minimalist, luxury',
    'bonus-icons.png'
  );

  // New assets for Musa standard
  await generateImage(
    'Professional woman 45 years old, farmacêutica, lab coat, standing in a modern pharmacy or laboratory, cinematic lighting, gold accents, high resolution, realistic portrait',
    'hero-person.png'
  );

  // WhatsApp screenshots (6 variations)
  const whatsappPrompts = [
    {
      filename: 'whatsapp-1.png',
      prompt: 'WhatsApp chat screenshot, iPhone style, message from "Maria" saying "Gente, comprei o Mounjaro Alert e mudou minha vida! O guia é completo, valeu cada centavo." Realistic, high resolution, cute.'
    },
    {
      filename: 'whatsapp-2.png',
      prompt: 'WhatsApp chat screenshot, iPhone style, message from "Cristina" saying "O Mounjaro Alert me mostrou os riscos que o médico não fala. Super indico para quem quer emagrecer com segurança." Realistic, high resolution.'
    },
    {
      filename: 'whatsapp-3.png',
      prompt: 'WhatsApp chat screenshot, iPhone style, message from "Fernanda" saying "Paguei R$ 9,90 e recebi um PDF lindo, capa dourada! O conteúdo éprofissional, nota 10." Realistic.'
    },
    {
      filename: 'whatsapp-4.png',
      prompt: 'WhatsApp chat screenshot, iPhone style, voice message visual, text: "Acabei de ler o Mounjaro Alert. Melhor investimento!" Realistic.'
    },
    {
      filename: 'whatsapp-5.png',
      prompt: 'WhatsApp chat screenshot, iPhone style, group chat named "Saúde 40+", messages talking about Mounjaro Alert being worth it.Realistic.'
    },
    {
      filename: 'whatsapp-6.png',
      prompt: 'WhatsApp chat screenshot, iPhone style, message from "Patricia" saying "Já perdi 5kg com as dicas do guia. Obrigada!" Realistic.'
    }
  ];

  for (const { filename, prompt } of whatsappPrompts) {
    await generateImage(prompt, filename);
  }

  console.log('🎉 All images generated!');
}

main().catch(console.error);
