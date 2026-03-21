import fetch from 'node-fetch';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const GAMMA_API_KEY = process.env.GAMMA_API_KEY;
if (!GAMMA_API_KEY) throw new Error('GAMMA_API_KEY missing');

const title = '15 Coisas que Você Precisa Saber Antes de Usar o Mounjaro';
const chapters = [
  { title: 'O que é Mounjaro?', prompt: 'Explique de forma simples e acessível o que é o medicamento Mounjaro (tirzepatida), sua ação no corpo e para que serve, focando em mulheres 40+ que buscam emagrecimento.' },
  { title: 'Como funciona?', prompt: 'Descreva o mecanismo de ação do Mounjaro no controle de glicemia e apetite, com linguagem leiga.' },
  { title: 'Efeitos colaterais comuns', prompt: 'Liste os efeitos colaterais mais frequentes (náusea, diarreia, vômito) e como mitigá-los com alimentação.' },
  { title: 'Quem não deve usar', prompt: 'Contraindicações: quem deve evitar o Mounjaro (histórico de pancreatite, mulher grávida, etc.)' },
  { title: 'Alternativas naturais', prompt: 'Apresente alternativas naturais para controlar o apetite e glicemia (fibras, proteína, exercício).' },
  { title: 'Perguntas frequentes', prompt: 'Responda 5 FAQs sobre Mounjaro: preço, onde comprar, necessidade de receita, duração do tratamento.' },
];

const inputText = `Título: ${title}\n\n` + chapters.map((c, i) => `Capítulo ${i+1}: ${c.title}\n\n${c.prompt}`).join('\n\n');

// 1. Criar geração COM template gold-leaf
const createRes = await fetch('https://public-api.gamma.app/v1.0/generations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': GAMMA_API_KEY,
  },
  body: JSON.stringify({
    inputText,
    textMode: 'generate',
    format: 'document',
    numCards: Math.max(10, chapters.length * 5),
    exportAs: 'pdf',
    // Template premium gold-leaf
    themeId: 'gold-leaf',
  }),
});

if (!createRes.ok) {
  const err = await createRes.text();
  throw new Error(`Gamma create failed: ${createRes.status} ${err}`);
}

const { generationId } = await createRes.json();
console.log('🆙 Mounjaro Gamma ID:', generationId);

// 2. Poll
let status = 'pending';
let result;
let attempts = 0;
while (status === 'pending' || status === 'running' || status === 'queued') {
  await new Promise(r => setTimeout(r, 10000));
  const pollRes = await fetch(`https://public-api.gamma.app/v1.0/generations/${generationId}`, {
    headers: { 'X-API-KEY': GAMMA_API_KEY },
  });
  result = await pollRes.json();
  status = result.status;
  attempts++;
  console.log(`⏳ Mounjaro PDF status: ${status} (attempt ${attempts})`);
  if (status === 'failed') throw new Error('Gamma failed: ' + (result.error || 'unknown'));
  if (attempts > 30) throw new Error('Gamma timeout');
}

if (status !== 'completed') throw new Error(`Unexpected status: ${status}`);

// 3. Download
const pdfRes = await fetch(result.exportUrl);
if (!pdfRes.ok) throw new Error(`Download failed: ${pdfRes.status}`);
const pdfBuffer = await pdfRes.buffer();

const outDir = join(process.cwd(), 'public', 'downloads');
mkdirSync(outDir, { recursive: true });
const filename = 'mounjaro-alert.pdf';
writeFileSync(join(outDir, filename), pdfBuffer);
console.log(`✅ Mounjaro PDF premium salvo: ${filename} (${(pdfBuffer.length/1024/1024).toFixed(2)} MB)`);

// Notificação Telegram será enviada pelo Launcher após copiar o PDF
