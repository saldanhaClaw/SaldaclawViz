import { config } from 'dotenv';
import { join } from 'path';
import { fileURLToPath } from 'url';

config({ path: join(process.cwd(), '.env') });

const SHOTSTACK_API_KEY = process.env.SHOTSTACK_API_KEY;
const BASE_URL = 'https://api.shotstack.io/edit/v1';
const HEADERS = { 'Content-Type': 'application/json', 'x-api-key': SHOTSTACK_API_KEY };

fetch(`${BASE_URL}/templates`, { headers: HEADERS })
  .then(res => res.json())
  .then(data => {
    console.log('📋 Templates in account:');
    let templates = [];
    if (data?.data?.templates) templates = data.data.templates;
    else if (data?.templates) templates = data.templates;
    templates.forEach(t => console.log(`- ${t.name} (ID: ${t.id})`));
  })
  .catch(e => console.error('❌ Error:', e.message));
