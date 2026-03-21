const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000'; // Assume-se que o user rodará local

async function testBackend() {
  console.log('--- TESTE BACKEND ADCOPY ---');
  
  try {
    // 1. Registro
    console.log('1. Registrando usuário...');
    const reg = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ email: 'test@saldacloud.com', password: 'password123' }),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Registro:', reg.status);

    // 2. Login
    console.log('2. Fazendo login...');
    const login = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email: 'test@saldacloud.com', password: 'password123' }),
      headers: { 'Content-Type': 'application/json' }
    });
    const { token } = await login.json();
    console.log('Login OK. Token:', token ? 'RECEBIDO' : 'FALHA');

    // 3. Criar Ad
    console.log('3. Criando anúncio...');
    const ad = await fetch(`${BASE_URL}/api/ads`, {
      method: 'POST',
      body: JSON.stringify({ originalText: 'Curso de Automação com Agentes AI para empresas.' }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const adData = await ad.json();
    console.log('Ad Criado:', adData.id);

  } catch (e) {
    console.error('ERRO NO TESTE:', e.message);
  }
}

testBackend();
