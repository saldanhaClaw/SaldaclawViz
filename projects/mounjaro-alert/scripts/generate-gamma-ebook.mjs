import 'dotenv/config';
import fetch from 'node-fetch';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function generateGammaDocument(title, chapters) {
  const apiKey = process.env.GAMMA_API_KEY;
  if (!apiKey) throw new Error('GAMMA_API_KEY missing');

  const inputText = `Título: ${title}\n\n` + chapters.map((c, i) => `Capítulo ${i+1}: ${c.title}\n\n${c.prompt}`).join('\n\n');

  // 1. Criar geração
  const createRes = await fetch('https://public-api.gamma.app/v1.0/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey,
    },
    body: JSON.stringify({
      inputText,
      textMode: 'generate',
      format: 'document',
      numCards: Math.max(10, chapters.length * 5),
      exportAs: 'pdf',
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Gamma create failed: ${createRes.status} ${err}`);
  }

  const { generationId } = await createRes.json();
  console.log('🆔 Generation ID:', generationId);

  // 2. Poll
  let status = 'pending';
  let result;
  let attempts = 0;
  while (status === 'pending' || status === 'running' || status === 'queued') {
    await new Promise(r => setTimeout(r, 10000));
    const pollRes = await fetch(`https://public-api.gamma.app/v1.0/generations/${generationId}`, {
      headers: { 'X-API-KEY': apiKey },
    });
    result = await pollRes.json();
    status = result.status;
    attempts++;
    console.log(`⏳ Status after ${attempts} check(s): ${status}`);
    if (status === 'failed') throw new Error('Gamma generation failed: ' + (result.error || 'unknown'));
    if (attempts > 30) throw new Error('Gamma generation timeout');
  }

  if (status !== 'completed') throw new Error(`Unexpected final status: ${status}`);

  // 3. Download PDF content (Gamma API returns PDF exportUrl)
  // To ensure PT-BR, we rely on Gamma's own model; our prompt is in PT-BR.
  const exportUrl = result.exportUrl;
  console.log('📥 Downloading PDF from:', exportUrl);
  const pdfRes = await fetch(exportUrl);
  if (!pdfRes.ok) throw new Error(`Download failed: ${pdfRes.status}`);
  const pdfBuffer = await pdfRes.buffer();

  const filename = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '.pdf';
  const outPath = join(process.cwd(), 'public', 'downloads', filename);
  writeFileSync(outPath, pdfBuffer);
  console.log(`✅ PDF salvo: ${filename} (${(pdfBuffer.length/1024/1024).toFixed(2)} MB)`);
  return outPath;
}

// Uso: node generate-gamma-ebook.mjs "Título" "cap1|prompt1" "cap2|prompt2" ...
if (process.argv.length > 2) {
  const title = process.argv[2];
  const chapters = process.argv.slice(3).map(arg => {
    const [t, p] = arg.split('|');
    return { title: t, prompt: p };
  });
  generateGammaDocument(title, chapters).catch(e => {
    console.error('❌ Erro:', e.message);
    process.exit(1);
  });
}

export { generateGammaDocument };
