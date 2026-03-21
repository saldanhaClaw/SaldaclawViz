import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config';

const clientId = process.env.TWITTER_CLIENT_ID;
const clientSecret = process.env.TWITTER_CLIENT_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;

let client;

if (clientId && clientSecret && accessToken) {
  client = new TwitterApi({
    clientId,
    clientSecret,
    accessToken,
  });
} else {
  const {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN: at1,
    TWITTER_ACCESS_TOKEN_SECRET: ats1,
  } = process.env;
  if (!TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET || !at1 || !ats1) {
    throw new Error('Missing Twitter credentials in environment');
  }
  client = new TwitterApi({
    appKey: TWITTER_CONSUMER_KEY,
    appSecret: TWITTER_CONSUMER_SECRET,
    accessToken: at1,
    accessSecret: ats1,
  });
}

const posts = [
  // Copy 1 - Prova social + urgência
  'Perdi 8kg com Mounjaro em 45 dias, SEM cirurgia. O protocolo completo está aqui 🧵 Se você tem 30+ e está cansada de dietas que não funcionam, essa thread é para você. ⏳ Vagas limitadas para o alerta gratuito! mounjaro-alert.vercel.app',
  // Copy 2 - Medo de ficar pra trás + solução
  'Enquanto você hesita, milhares de mulheres 40+ já estão usando Mounjaro para recuperar a autoestima. O que você está esperando? 🔥 Acesse o guia urgente: mounjaro-alert.vercel.app ⬇️',
  // Copy 3 - Resultado rápido + escassez
  '12kg em 2 meses. Isso não é milagre, é Mounjaro protocolado. Se você quer resultado DE VERDADE, não perca essa chance. Link na bio para o alerta gratuito ⬆️ 👆 mounjaro-alert.vercel.app',
  // Copy 4 - Autoridade + referência médica
  'Endocrinologistas estão alarmados: Mounjaro pode ser a redenção para mulheres 35+ com diabetes tipo 2. Mas poucos sabem o protocolo correto. Eu descobri e compartilho 🧵 mounjaro-alert.vercel.app',
  // Copy 5 - Pergunta polêmica + CTA
  'Você ainda acha que emagrecer depois dos 40 é impossível? 🤔 Eu também achava… até encontrar o protocolo Mounjaro. Clique no link e veja as transformações reais: mounjaro-alert.vercel.app',
  // Copy 6 - FOMO + urgência
  'O Mounjaro está revolucionando a vida de mulheres 40+ no Brasil. Quem não se adaptar, fica pra trás. Não seja a última a saber. Acesse AGORA: mounjaro-alert.vercel.app 🚨',
  // Copy 7 - História pessoal + identificação
  'Aos 47, meu médico me deu 6 meses de vida se não emagrecesse. Descobri o protocolo Mounjaro e mudei tudo. Hoje peso 62kg (antes 84kg). Quer saber como? Thread aberta 🧵 mounjaro-alert.vercel.app',
  // Copy 8 - Dados crus + curiosidade
  '83% das mulheres que usaram Mounjaro sob prescrição emagreceram 10%+ do peso em 3 meses. Você está no grupo dos 17% que não sabem? Aprenda o protocolo gratuito: mounjaro-alert.vercel.app',
  // Copy 9 - Desafio + transformação
  'Desafio 45 dias Mounjaro: Quer acompanhar minha evolução DIÁRIA? Vou postar tudo: peso, dosagem, efeitos colaterais, resultados. Siga e não perca. Link com protocolo completo no perfil ⬆️ mounjaro-alert.vercel.app',
  // Copy 10 - Comparação + solução definitiva
  'Dietas malucas: resultado zero. Mounjaro protocolado: -10kg em 1 mês. Escolha o seu lado. Se quer emagrecer de vez, clique aqui e pegue o guia GRATUITO: mounjaro-alert.vercel.app 🔥',
];

// Images configuration (must be in public/images/)
const images = [
  'mounjaro-antes-depois.jpg', // Visual 1
  'mounjaro-grafico.jpg',      // Visual 2
  'mounjaro-frasco.jpg',       // Visual 3
  'mounjaro-quote.jpg',        // Visual 4
  'mounjaro-comparativo.jpg',  // Visual 5
];

// Schedule times (Brasília time, 8h, 13h, 20h)
const SCHEDULE_HOURS = [8, 13, 20];
const POSTS_PER_DAY_MIN = 2;
const POSTS_PER_DAY_MAX = 3;

// ============================================
// Mounjaro Alert — Twitter Auto Campaign
// System: 14-day rollout, 2-3 posts/day at 8h, 13h, 20h
// Includes: Scheduling, Media Upload, Active Engagement
// ============================================

import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { randomInt } from 'crypto';

const clientId = process.env.TWITTER_CLIENT_ID;
const clientSecret = process.env.TWITTER_CLIENT_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;

let client;

if (clientId && clientSecret && accessToken) {
  client = new TwitterApi({
    clientId,
    clientSecret,
    accessToken,
  });
} else {
  const {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN: at1,
    TWITTER_ACCESS_TOKEN_SECRET: ats1,
  } = process.env;
  if (!TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET || !at1 || !ats1) {
    throw new Error('Missing Twitter credentials in environment');
  }
  client = new TwitterApi({
    appKey: TWITTER_CONSUMER_KEY,
    appSecret: TWITTER_CONSUMER_SECRET,
    accessToken: at1,
    accessSecret: ats1,
  });
}

// 10 Aggressive Copies (Mounjaro Alert)
const posts = [
  'Perdi 8kg com Mounjaro em 45 dias, SEM cirurgia. O protocolo completo está aqui 🧵 Se você tem 30+ e está cansada de dietas que não funcionam, essa thread é para você. ⏳ Vagas limitadas para o alerta gratuito! mounjaro-alert.vercel.app',
  'Enquanto você hesita, milhares de mulheres 40+ já estão usando Mounjaro para recuperar a autoestima. O que você está esperando? 🔥 Acesse o guia urgente: mounjaro-alert.vercel.app ⬇️',
  '12kg em 2 meses. Isso não é milagre, é Mounjaro protocolado. Se você quer resultado DE VERDADE, não perca essa chance. Link na bio para o alerta gratuito ⬆️ 👆 mounjaro-alert.vercel.app',
  'Endocrinologistas estão alarmados: Mounjaro pode ser a redenção para mulheres 35+ com diabetes tipo 2. Mas poucos sabem o protocolo correto. Eu descobri e compartilho 🧵 mounjaro-alert.vercel.app',
  'Você ainda acha que emagrecer depois dos 40 é impossível? 🤔 Eu também achava… até encontrar o protocolo Mounjaro. Clique no link e veja as transformações reais: mounjaro-alert.vercel.app',
  'O Mounjaro está revolucionando a vida de mulheres 40+ no Brasil. Quem não se adaptar, fica pra trás. Não seja a última a saber. Acesse AGORA: mounjaro-alert.vercel.app 🚨',
  'Aos 47, meu médico me deu 6 meses de vida se não emagrecesse. Descobri o protocolo Mounjaro e mudei tudo. Hoje peso 62kg (antes 84kg). Quer saber como? Thread aberta 🧵 mounjaro-alert.vercel.app',
  '83% das mulheres que usaram Mounjaro sob prescrição emagreceram 10%+ do peso em 3 meses. Você está no grupo dos 17% que não sabem? Aprenda o protocolo gratuito: mounjaro-alert.vercel.app',
  'Desafio 45 dias Mounjaro: Quer acompanhar minha evolução DIÁRIA? Vou postar tudo: peso, dosagem, efeitos colaterais, resultados. Siga e não perca. Link com protocolo completo no perfil ⬆️ mounjaro-alert.vercel.app',
  'Dietas malucas: resultado zero. Mounjaro protocolado: -10kg em 1 mês. Escolha o seu lado. Se quer emagrecer de vez, clique aqui e pegue o guia GRATUITO: mounjaro-alert.vercel.app 🔥',
];

// Images (1200x675) in public/images/
const imagesDir = path.join(process.cwd(), 'public', 'images');
const images = [];
if (fs.existsSync(imagesDir)) {
  const files = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  images.push(...files);
  console.log(`✅ Found ${files.length} images in public/images/`);
} else {
  console.warn('⚠️ Images directory not found. Posts will be text-only.');
}

// Influencer targets for engagement (from campaign doc)
const targetHandles = [
  'evelynregly', 'gazetamulheres', 'sbddiabetes', 'draanapaulaleandro',
  'draelianasaude', 'nutricaocomliberdade', 'belezamatura', 'saudefeminina40',
  'emagrecimentosaudavel', 'diabetes.type2', 'vidasaudavel.diabetes',
  'lowcarbbrasil', 'mulheres40mais', 'saude.damulher', 'menopausasaudavel',
  // ... expand to 30-50 as needed
];

// Global state
let postsToday = 0;
let lastPostDate = null;
let metrics = {
  totalPosts: 0,
  totalLikes: 0,
  totalRetweets: 0,
  totalReplies: 0,
  clicksEstimate: 0,
  engagementActions: 0,
  startTime: new Date().toISOString(),
};

// Helper: Wait until next scheduled time
function msUntilNextSchedule(hour) {
  const now = new Date();
  const target = new Date(now);
  target.setHours(hour, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1); // tomorrow if already passed
  return target.getTime() - now.getTime();
}

// Helper: Get random time within hour window (+- 15 min)
function randomScheduleOffset(hour) {
  const offset = randomInt(0, 30) - 15; // -15 to +15 minutes
  const date = new Date();
  date.setHours(hour, offset, 0, 0);
  return date;
}

// Core: Post tweet with optional image
async function postTweet(withImage = true) {
  const copy = posts[Math.floor(Math.random() * posts.length)];
  const mediaId = withImage && images.length > 0
    ? await uploadRandomImage()
    : undefined;

  try {
    const tweet = await client.v2.tweet(copy, mediaId ? { media: { media_ids: [mediaId] } : undefined);
    metrics.totalPosts++;
    metrics.totalLikes += 0; // will be updated later via analytics
    console.log(`[${new Date().toLocaleTimeString()}] ✅ Tweet posted: ${copy.substring(0, 80)}...`);
    logMetrics();
    return tweet;
  } catch (err) {
    console.error('❌ Twitter error:', err.statusCode, err.message);
    if (err.statusCode === 401) {
      console.error('❌ Invalid credentials. Check Twitter app permissions.');
    } else if (err.statusCode === 429) {
      console.error('❌ Rate limit reached. Backing off...');
    }
    throw err;
  }
}

// Upload random image from public/images/
async function uploadRandomImage() {
  if (images.length === 0) return null;
  const filename = images[Math.floor(Math.random() * images.length)];
  const filepath = path.join(imagesDir, filename);
  const data = fs.readFileSync(filepath);
  try {
    const media = await client.v1.uploadMedia(data, { mimeType: 'image/jpeg' });
    console.log(`   📎 Uploaded image: ${filename} (media_id: ${media.media_id_string})`);
    return media.media_id_string;
  } catch (err) {
    console.error(`   ❌ Failed to upload ${filename}:`, err.message);
    return null;
  }
}

// Engagement: Comment on target influencer posts (15-20/day)
async function performEngagement() {
  console.log(`\n[${new Date().toLocaleTimeString()}] 🔥 Starting engagement round...`);
  let commentedCount = 0;
  const targetCount = randomInt(15, 21); // 15-20

  for (const handle of targetHandles) {
    if (commentedCount >= targetCount) break;
    try {
      // Get recent tweets from this user (last 50)
      const userTimeline = await client.v2.userTimeline(handle, {
        max_results: 10,
        'tweet.fields': ['created_at', 'public_metrics'],
        exclude: 'retweets,replies',
      });
      if (!userTimeline.data?.data?.length) continue;

      const recentTweet = userTimeline.data.data[0]; // most recent
      const tweetId = recentTweet.id;

      // Compose comment (approval-seeking, value-add)
      const comment = generateComment(recentTweet.text || '');
      await client.v2.reply(comment, tweetId);
      commentedCount++;
      console.log(`   💬 Replied to @${handle}: "${comment.substring(0, 60)}..."`);
      // Rate limit: wait 10-20 seconds between comments
      await new Promise(r => setTimeout(r, randomInt(10000, 20000)));
    } catch (err) {
      console.error(`   ⚠️ Failed to engage @${handle}:`, err.message);
    }
  }
  metrics.engagementActions += commentedCount;
  console.log(`✅ Engagement complete: ${commentedCount} comments posted.\n`);
}

function generateComment(originalText) {
  const templates = [
    'Entendo sua dúvida. Muitas mulheres 40+ passam por isso. O que me ajudou foi entender o protocolo Mounjaro corretamente. Tem um alerta gratuito aqui que explica tudo: mounjaro-alert.vercel.app',
    'Ótima pergunta! Eu também tinha essas preocupações. O guia Mounjaro Alert esclarece os pontos cruciais. Vale a pena conferir: mounjaro-alert.vercel.app',
    'Passei por algo similar. Okey é manter a segurança em primeiro lugar. O Mounjaro Alert traz 15 verdades que ninguém comenta. Link: mounjaro-alert.vercel.app',
    'Realmente, é importante se informar bem. Eu li o guia e me sinto muito mais segura agora. Recomendo: mounjaro-alert.vercel.app',
    'Concordo! A informação é poder. O protocolo Mounjaro mudou minha vida. Veja o alerta gratuito: mounjaro-alert.vercel.app',
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Metrics logging
function logMetrics() {
  const logPath = path.join(process.cwd(), '..', 'antigravity_results', 'twitter-rollout-status.md');
  const now = new Date().toLocaleString('pt-BR');
  const summary = `
## 📊 Metrics Update — ${now}

- Total posts: ${metrics.totalPosts}
- Engagement actions: ${metrics.engagementActions}
- Last activity: ${new Date().toISOString()}

*Auto-updated by twitter-auto.mjs*
`;
  try {
    // Append to existing report (simplified — in production use proper append)
    console.log(summary);
  } catch (e) {
    console.warn('Could not update metrics file:', e.message);
  }
}

// Main scheduler loop
async function runCampaign() {
  console.log('🚀 Mounjaro Alert — Twitter Campaign Starting...');
  console.log(`📍 Timezone: America/Sao_Paulo (UTC-3)`);
  console.log(`📅 14-day schedule: 2-3 posts/day at 8h, 13h, 20h`);
  console.log(`🎯 Engagement: 15-20 comments/day on influencer posts`);
  console.log(`🖼️  Images: ${images.length} files ready in public/images/\n`);

  // Day 1: Check if first post should be today (after 20h) or tomorrow 8h
  const now = new Date();
  const currentHour = now.getHours();
  let firstPostHour = 20; // today at 20h if still possible

  if (currentHour >= 20) {
    // Too late for today, start tomorrow 8h
    firstPostHour = 8;
    console.log('⏳ First post scheduled for tomorrow 08:00 (images must be ready)');
  } else {
    console.log('🎯 First post scheduled for today 20:00 (if images are ready)');
  }

  while (true) {
    const now = new Date();
    const todayStr = now.toDateString();
    const currentHour = now.getHours();

    // Reset daily counter
    if (lastPostDate !== todayStr) {
      postsToday = 0;
      lastPostDate = todayStr;
      console.log(`\n📅 New day: ${todayStr} — reset daily counter.`);
    }

    // Check if we should post now (within schedule hours)
    const isScheduleHour = SCHEDULE_HOURS.includes(currentHour);
    const withinWindow = now.getMinutes() < 30; // first 30 min of hour

    if (isScheduleHour && withinWindow && postsToday < POSTS_PER_DAY_MAX) {
      withImage = images.length > 0 && metrics.totalPosts % 2 === 0; // alternate images
      await postTweet(withImage);
      postsToday++;

      // After posting, also do some engagement (only once per day maybe after second post)
      if (postsToday >= 2) {
        await performEngagement();
      }

      // Wait to avoid duplicate posts in same minute
      await new Promise(r => setTimeout(r, 60000)); // wait 1 min
      continue;
    }

    // Sleep until next check (every 5 minutes)
    await new Promise(r => setTimeout(r, 300000));
  }
}

// Start the campaign
if (require.main === module) {
  runCampaign().catch(console.error);
}

export { postTweet, performEngagement, runCampaign };
