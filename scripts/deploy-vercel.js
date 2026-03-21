const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurações de Caminho
const projectRoot = path.join(__dirname, '..');
const ENV_PATH = path.join(projectRoot, '.env');

function log(level, msg) {
  const ts = new Date().toLocaleTimeString('pt-BR', { hour12: false });
  console.log(`[${ts}] [DEPLOY] [${level}] ${msg}`);
}

function loadEnv() {
  const env = {};
  if (fs.existsSync(ENV_PATH)) {
    const content = fs.readFileSync(ENV_PATH, 'utf-8');
    content.split(/\r?\n/).forEach(line => {
      const match = line.match(/^([^#=]+)=["']?([^"'\r\n]+)["']?/);
      if (match) env[match[1].trim()] = match[2].trim();
    });
  }
  return env;
}

const env = loadEnv();

/**
 * Realiza o deploy de um projeto na Vercel
 * @param {string} projectName Nome da pasta em /projects
 */
async function deployProject(projectName) {
    const workspacePath = env.OPENCLAW_WORKSPACE || "C:\\Users\\vinib\\.openclaw\\workspace";
    const projectPath = path.join(workspacePath, 'projects', projectName);
    
    if (!fs.existsSync(projectPath)) {
        log('ERROR', `Projeto não encontrado em: ${projectPath}`);
        return;
    }

    log('INFO', `Iniciando deploy de ${projectName} na Vercel...`);

    try {
        // 1. Instalar dependências se necessário
        log('INFO', 'Instalando dependências (npm install)...');
        execSync('npm install', { cwd: projectPath, stdio: 'inherit' });

        // 2. Vincular projeto à conta (Link)
        log('INFO', 'Vinculando projeto à Vercel (link)...');
        const token = env.VERCEL_ACCESS_TOKEN;
        const linkCmd = `npx vercel link --token ${token} --yes --cwd "${projectPath}"`;
        execSync(linkCmd, { cwd: projectPath, stdio: 'inherit' });

        // 3. Rodar Deploy via Vercel CLI
        log('INFO', 'Executando npx vercel deploy --prod...');
        const deployCmd = `npx vercel --token ${token} --prod --yes --cwd "${projectPath}"`;
        
        const output = execSync(deployCmd, { encoding: 'utf-8' });
        
        // 3. Extrair URL de produção
        const urlMatch = output.match(/https:\/\/[a-z0-9-]+\.vercel\.app/i);
        const prodUrl = urlMatch ? urlMatch[0] : 'URL não capturada';

        log('SUCCESS', `Deploy concluído! URL: ${prodUrl}`);

        // 4. Atualizar _ag_viz.json (opcional, o bridge.js já escaneia)
        // Mas podemos forçar uma entrada aqui.

        return prodUrl;
    } catch (e) {
        log('ERROR', `Falha no deploy: ${e.message}`);
        throw e;
    }
}

// CLI
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args[0]) {
        deployProject(args[0]).catch(console.error);
    } else {
        log('WARN', 'Uso: node deploy-vercel.js <nome-do-projeto>');
    }
}

module.exports = { deployProject };
