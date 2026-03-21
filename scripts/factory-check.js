const axios = require('axios');

const SITES = [
  { name: 'EbookGen Pro', url: 'https://ebookgen-pro.vercel.app' },
  { name: 'Factory API', url: 'https://ebookgen-pro.vercel.app/api/checkout' }
];

async function checkHealth() {
  console.log('🚀 Iniciando Verificação de Saúde da Factory...');
  
  for (const site of SITES) {
    try {
      const start = Date.now();
      const res = await axios.get(site.url, { timeout: 10000 });
      const duration = Date.now() - start;
      
      if (res.status >= 200 && res.status < 400) {
        console.log(`✅ ${site.name}: ONLINE (${duration}ms)`);
      } else {
        console.log(`⚠️ ${site.name}: STATUS ${res.status}`);
      }
    } catch (err) {
      console.log(`❌ ${site.name}: DOWN - ${err.message}`);
    }
  }

  // Twitter Bot Check
  try {
     const resData = await axios.get('https://ebookgen-pro.vercel.app/api/cron/twitter-post', { timeout: 20000 });
     console.log('✅ Twitter Bot: ACCESSIBLE');
  } catch (err) {
     console.log('❌ Twitter Bot: ENDPOINT ERROR');
  }

  console.log('🏁 Verificação concluída.');
}

checkHealth();
