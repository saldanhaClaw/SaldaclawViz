const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Load .env from Dashboard folder (where Saldanha updated it)
const dashboardEnv = "C:\\Users\\vinib\\Downloads\\SaldaclawViz-main (1)\\SaldaclawViz-main\\.env";
const env = {};
if (fs.existsSync(dashboardEnv)) {
  const content = fs.readFileSync(dashboardEnv, 'utf-8');
  content.split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val) env[key.trim()] = val.join('=').trim().replace(/"/g, '');
  });
}

const GITHUB_TOKEN = env.GITHUB_TOKEN;
const VERCEL_TOKEN = env.VERCEL_ACCESS_TOKEN;

async function apiCall(host, path, method, token, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'SaldaCloud-Bridge',
        'Content-Type': 'application/json'
      }
    };
    if (host.includes('github')) {
        options.headers['Accept'] = 'application/vnd.github.v3+json';
        options.headers['Authorization'] = `token ${token}`;
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '{}'));
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function publish(projectName) {
  console.log(`🚀 Iniciando publicação do projeto: ${projectName}`);
  
  const projectPath = path.join(__dirname, '..', 'projects', projectName);
  if (!fs.existsSync(projectPath)) {
    console.error(`❌ Erro: Pasta do projeto não existe em ${projectPath}`);
    return;
  }

  try {
    // 1. Get GitHub Username
    console.log("🔍 Detectando usuário GitHub...");
    const user = await apiCall('api.github.com', '/user', 'GET', GITHUB_TOKEN);
    const githubUser = user.login;
    console.log(`✅ Usuário: ${githubUser}`);

    // 2. Create GitHub Repo
    console.log(`📁 Criando repositório GitHub: ${projectName}...`);
    try {
      await apiCall('api.github.com', '/user/repos', 'POST', GITHUB_TOKEN, {
        name: projectName,
        private: false, // Default to public for portfolio sharing
        auto_init: false
      });
      console.log("✅ Repositório criado.");
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log("ℹ️ Repositório já existe, pulando criação.");
      } else {
        throw e;
      }
    }

    // 3. Git Init & Push
    console.log("📦 Inicializando Git e fazendo Push...");
    const gitCmds = [
      `git init`,
      `git add .`,
      `git commit -m "🚀 Initial deploy via SaldaCloud Gestão"`,
      `git branch -M main`,
      `git remote remove origin || true`,
      `git remote add origin https://${githubUser}:${GITHUB_TOKEN}@github.com/${githubUser}/${projectName}.git`,
      `git push -u origin main`
    ];

    gitCmds.forEach(cmd => {
      try {
        execSync(cmd, { cwd: projectPath, stdio: 'inherit' });
      } catch (e) {
        console.warn(`⚠️ Aviso no comando [${cmd}]: ${e.message}`);
      }
    });

    // 4. Vercel Deployment (Simplified: Link GitHub to Vercel)
    console.log("🏗️ Conectando à Vercel...");
    // Nota: Deploys na Vercel funcionam melhor via Dashboard se o GitHub já estiver linkado.
    // Mas podemos tentar criar um projeto via API se necessário.
    console.log(`✅ Projeto publicado! Acesse: https://github.com/${githubUser}/${projectName}`);
    console.log(`🔗 Próximo passo: Linkar este repo na sua Vercel (Token já configurado).`);

  } catch (err) {
    console.error(`❌ Falha na publicação: ${err.message}`);
  }
}

const args = process.argv.slice(2);
if (args[0]) {
  publish(args[0]);
} else {
  console.log("Uso: node publish.js <nome-do-projeto>");
}
