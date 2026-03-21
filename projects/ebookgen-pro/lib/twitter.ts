import { TwitterApi } from 'twitter-api-v2';

let twitterInstance: any = null;

export function getTwitterClient() {
  if (twitterInstance) return twitterInstance;

  const appKey = process.env.TWITTER_CONSUMER_KEY;
  const appSecret = process.env.TWITTER_CONSUMER_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessSecret = process.env.TWITTER_ACCESS_SECRET;

  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    throw new Error('Twitter credentials are not fully defined in env');
  }

  const client = new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  });

  twitterInstance = client.readWrite;
  return twitterInstance;
}

export async function sendTweet(text: string) {
  try {
    const client = getTwitterClient();
    const tweet = await client.v2.tweet(text);
    console.log('Tweet enviado:', tweet.data.id);
    return tweet;
  } catch (error) {
    console.error('Erro ao enviar tweet:', error);
    throw error;
  }
}

export function generateMarketingCopy() {
  const copies = [
    "O corpo dos seus sonhos não é um milagre, é matemática. 🧪 Descubra o Método 30D e transforme-se. https://ebookgen-pro.vercel.app",
    "Cansado de dietas iô-iô? O segredo da elite fitness brasileira agora em suas mãos. 💎 Método 30D: https://ebookgen-pro.vercel.app",
    "Resultados reais exigem protocolos reais. ⏱️ 30 dias para a sua melhor versão. Saiba mais: https://ebookgen-pro.vercel.app",
    "Reset metabólico? Sim, é possível. Descubra como em nosso guia exclusivo. 🚀 https://ebookgen-pro.vercel.app",
  ];
  return copies[Math.floor(Math.random() * copies.length)];
}
