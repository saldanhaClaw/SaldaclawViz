const fs = require('fs');
const path = require('path');
const { TwitterApi } = require('twitter-api-v2');
const nodemailer = require('nodemailer');

// Configurações de Caminho
const WORKSPACE = process.env.OPENCLAW_WORKSPACE || path.join(__dirname, '..', '..', '.openclaw', 'workspace');
const projectRoot = path.join(__dirname, '..');
const ENV_PATH = path.join(projectRoot, '.env');

function log(level, msg) {
  const ts = new Date().toLocaleTimeString('pt-BR', { hour12: false });
  console.log(`[${ts}] [GROWTH] [${level}] ${msg}`);
}

log('INFO', `Iniciando Growth Engine... Carregando: ${ENV_PATH}`);

// Carregar .env manualmente para garantir acesso
function loadEnv() {
  log('DEBUG', 'Entrando em loadEnv...');
  const env = {};
  if (fs.existsSync(ENV_PATH)) {
    log('DEBUG', '.env encontrado, lendo conteúdo...');
    const content = fs.readFileSync(ENV_PATH, 'utf-8');
    const lines = content.split(/\r?\n/);
    log('DEBUG', `Processando ${lines.length} linhas...`);
    lines.forEach((line, i) => {
      const match = line.match(/^([^#=]+)=["']?([^"'\r\n]+)["']?/);
      if (match) {
          const key = match[1].trim();
          const val = match[2].trim();
          env[key] = val;
      }
    });
    log('DEBUG', 'Variaveis de ambiente carregadas.');
  } else {
    log('WARN', '.env não encontrado no caminho relativo.');
  }
  return env;
}

log('DEBUG', 'Chamando loadEnv...');
const env = loadEnv();
log('DEBUG', 'loadEnv finalizado.');

// Cliente do Twitter (X)
log('DEBUG', 'Inicializando Cliente Twitter...');
const twitterConfig = {
  appKey: env.TWITTER_CONSUMER_KEY,
  appSecret: env.TWITTER_CONSUMER_SECRET,
  accessToken: env.TWITTER_ACCESS_TOKEN,
  accessSecret: env.TWITTER_ACCESS_TOKEN_SECRET,
};

// Se tiver Client ID/Secret, tenta OAuth 2.0 também
if (env.TWITTER_CLIENT_ID && env.TWITTER_CLIENT_SECRET) {
  log('INFO', 'OAuth 2.0 detectado. Adicionando credenciais de cliente...');
  twitterConfig.clientId = env.TWITTER_CLIENT_ID;
  twitterConfig.clientSecret = env.TWITTER_CLIENT_SECRET;
}

const twitterClient = new TwitterApi(twitterConfig);
log('DEBUG', 'Cliente Twitter OK.');

/**
 * Realiza uma postagem no Twitter (X)
 */
async function postTweet(text) {
  try {
    log('INFO', `Enviando tweet: "${text.substring(0, 40)}..."`);
    const tweet = await twitterClient.v2.tweet(text);
    // Tenta construir a URL se o ID existir
    const tweetUrl = tweet.data ? `https://x.com/i/status/${tweet.data.id}` : 'URL Indisponível';
    log('SUCCESS', `Tweet OK! URL: ${tweetUrl}`);
    return tweetUrl;
  } catch (e) {
    log('ERROR', `Erro X: ${e.message}`);
    throw e;
  }
}

/**
 * Envia um e-mail via Gmail
 */
async function sendEmail(to, subject, text) {
  try {
    log('INFO', `Enviando e-mail para ${to}...`);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${env.GMAIL_USER}@gmail.com`,
        pass: env.GMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `SaldaClawd Swarm <${env.GMAIL_USER}@gmail.com>`,
      to,
      subject,
      text,
    });

    log('SUCCESS', `E-mail enviado! ID: ${info.messageId}`);
    return info;
  } catch (e) {
    log('ERROR', `Erro Gmail: ${e.message}`);
    throw e;
  }
}

/**
 * Função principal para processar missões de growth detectadas pelo Swarm
 */
async function processGrowthTask(taskFile) {
  try {
    const content = fs.readFileSync(taskFile, 'utf-8');
    // Regex simples para extrair o texto do tweet se for do tipo marketing
    if (content.includes('type: marketing') || content.includes('tipo: marketing')) {
        // TWEET
        const tweetMatch = content.match(/tweet:\s*(.*)/i);
        if (tweetMatch && tweetMatch[1]) {
            await postTweet(tweetMatch[1]);
        }

        // EMAIL
        const emailMatch = content.match(/email_to:\s*(.*)/i);
        if (emailMatch && emailMatch[1]) {
            const subject = content.match(/subject:\s*(.*)/i)?.[1] || 'Novidades do Swarm SaldaCloud';
            const body = content.match(/body:\s*(.*)/i)?.[1] || 'Olá! Temos novidades no nosso ecossistema Micro-SaaS.';
            await sendEmail(emailMatch[1], subject, body);
        }

        // Mover para resultados
        const resultsDir = path.join(WORKSPACE, 'antigravity_results');
        if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);
        fs.renameSync(taskFile, path.join(resultsDir, path.basename(taskFile)));
        log('INFO', `Missão concluída.`);
    }
  } catch (e) {
    log('ERROR', `Erro na tarefa: ${e.message}`);
  }
}

// CLI
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args[0] === '--tweet') {
        postTweet(args[1]).then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
    } else if (args[0] === '--email') {
        sendEmail(args[1], args[2], args[3]).then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
    } else {
        log('INFO', 'Growth Engine v1.1 ONLINE');
    }
}

module.exports = { postTweet, sendEmail, processGrowthTask };
