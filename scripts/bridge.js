const fs = require('fs');
const path = require('path');

const WORKSPACE = process.env.OPENCLAW_WORKSPACE || path.resolve(__dirname);
const TASKS_DIR = path.join(WORKSPACE, 'antigravity_tasks');
const RESULTS_DIR = path.join(WORKSPACE, 'antigravity_results');
const VIZ_FILE = path.join(WORKSPACE, '_ag_viz.json');
const POLL_INTERVAL_MS = 5000;

function log(level, msg) {
  const ts = new Date().toLocaleTimeString('pt-BR', { hour12: false });
  console.log(`[${ts}] [${level}] ${msg}`);
}

process.on('uncaughtException', (err) => {
  log('CRITICAL', `Uncaught Exception: ${err.message}`);
  console.error(err.stack);
});

function getVizPublicPath() {
  const explicit = "C:\\Users\\vinib\\Downloads\\SaldaclawViz-main (1)\\SaldaclawViz-main\\.env";
  try {
    if (fs.existsSync(explicit)) {
      const env = fs.readFileSync(explicit, 'utf-8');
      const match = env.match(/^VIZ_PUBLIC_PATH=["']?([^"'\r\n]+)["']?/m);
      if (match) return match[1];
    }
  } catch (e) {}
  return null;
}
const VIZ_PUBLIC_FILE = getVizPublicPath();

function readViz() {
  try {
    if (fs.existsSync(VIZ_FILE)) {
      const content = fs.readFileSync(VIZ_FILE, 'utf-8');
      if (content.trim()) return JSON.parse(content);
    }
  } catch (e) {
    log('WARN', `Erro no parse do viz_file: ${e.message}`);
  }
  return { agents: {}, logs: [], projects_portfolio: [] };
}

function writeViz(data) {
  try {
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(VIZ_FILE, content, 'utf-8');
    if (VIZ_PUBLIC_FILE) {
        fs.writeFileSync(VIZ_PUBLIC_FILE, content, 'utf-8');
    }
  } catch (e) {
    log('ERROR', `Erro ao salvar viz_file: ${e.message}`);
  }
}

function parseContent(content) {
  if (Array.isArray(content)) {
    // 1. Join all text parts, ignoring purely whitespace ones if others exist
    const textParts = content.filter(c => c.type === 'text' && c.text && c.text.trim().length > 0);
    if (textParts.length > 0) return textParts.map(p => p.text.trim()).join(' ');

    // 2. If no meaningful text, try thinking part
    const thinkPart = content.find(c => c.type === 'thinking');
    if (thinkPart && (thinkPart.thinking || thinkPart.text)) return `[Pensando] ${thinkPart.thinking || thinkPart.text}`;

    // 3. Fallback
    const firstPart = content[0];
    if (firstPart && firstPart.text) return firstPart.text.trim();
    
    return 'Conteúdo Complexo (Escaneando)';
  }
  return content || 'Aguardando...';
}

function scanAgentSessions() {
  const AGENTS_DIR = path.join(WORKSPACE, '..', 'agents');
  if (!fs.existsSync(AGENTS_DIR)) return;

  const viz = readViz();
  if (!viz.agents || Array.isArray(viz.agents)) viz.agents = {};
  if (!viz.logs) viz.logs = [];

  try {
    const agentDirs = fs.readdirSync(AGENTS_DIR);
    agentDirs.forEach(agentId => {
      const sessionsPath = path.join(AGENTS_DIR, agentId, 'sessions');
      if (!fs.existsSync(sessionsPath)) return;
      
      const sessionFiles = fs.readdirSync(sessionsPath)
        .filter(f => f.endsWith('.jsonl'))
        .sort((a, b) => fs.statSync(path.join(sessionsPath, b)).mtime - fs.statSync(path.join(sessionsPath, a)).mtime);
      
      if (sessionFiles.length === 0) return;

      const latestFile = path.join(sessionsPath, sessionFiles[0]);
      let lines = [];
      try {
          lines = fs.readFileSync(latestFile, 'utf-8').trim().split('\n');
      } catch (fe) { return; }
      
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (!line) continue;
        try {
          const entry = JSON.parse(line);
          if (entry.type === 'message' && entry.message && entry.message.role === 'assistant') {
            const rawText = parseContent(entry.message.content);
            const cleanText = rawText.replace(/\n/g, ' ').substring(0, 150);
            const agentName = agentId === 'main' ? 'SaldaClawd' : agentId;
            const timestamp = entry.timestamp || new Date().toISOString();

            viz.agents[agentName] = { 
              model: entry.model || 'hunter-alpha', 
              status: 'Executando', 
              lastAction: cleanText
            };

            if (!viz.logs.some(l => l.timestamp === timestamp)) {
              viz.logs.unshift({ agent: agentName, message: cleanText, timestamp });
              if (viz.logs.length > 50) viz.logs.pop();
            }
            break;
          }
        } catch (e) {}
      }
    });
    writeViz(viz);
  } catch (e) {
    log('ERROR', `Erro ao escanear sessões: ${e.message}`);
  }
}

function scanProjects() {
  const PROJECTS_DIR = path.join(WORKSPACE, 'projects');
  if (!fs.existsSync(PROJECTS_DIR)) return;

  const viz = readViz();
  if (!viz.projects_portfolio) viz.projects_portfolio = [];

  try {
    const dirs = fs.readdirSync(PROJECTS_DIR);
    dirs.forEach(dir => {
      const p = path.join(PROJECTS_DIR, dir);
      if (fs.statSync(p).isDirectory()) {
        const pkgPath = path.join(p, 'package.json');
        if (fs.existsSync(pkgPath)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
            const existing = viz.projects_portfolio.find(prj => prj.id === dir);
            
            const projectData = {
              id: dir,
              name: (pkg.name && pkg.name !== 'undefined') ? pkg.name : dir,
              status: 'concluído',
              completion: 100,
              tech_stack: Object.keys(pkg.dependencies || {}).slice(0, 4),
              description: pkg.description || 'Micro-SaaS Gerado autonomamente.',
              last_update: new Date(fs.statSync(p).mtime).toISOString().split('T')[0]
            };

            if (existing) {
              Object.assign(existing, projectData);
            } else {
              viz.projects_portfolio.push(projectData);
            }
          } catch (je) {}
        }
      }
    });
    writeViz(viz);
  } catch (e) {
    log('ERROR', `Erro ao escanear projetos: ${e.message}`);
  }
}

function main() {
  log('INFO', 'SaldaCloud Bridge v1.2.4 ONLINE');
  
  if (!fs.existsSync(TASKS_DIR)) fs.mkdirSync(TASKS_DIR, { recursive: true });
  if (!fs.existsSync(RESULTS_DIR)) fs.mkdirSync(RESULTS_DIR, { recursive: true });

  setInterval(() => {
    scanAgentSessions();
    scanProjects();
  }, POLL_INTERVAL_MS);

  scanAgentSessions();
  scanProjects();
}

main();
