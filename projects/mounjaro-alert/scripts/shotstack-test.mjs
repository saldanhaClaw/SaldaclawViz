import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });

const SHOTSTACK_API_KEY = process.env.SHOTSTACK_API_KEY;
const BASE_URL = 'https://api.shotstack.io/edit/v1';
const HEADERS = { 'Content-Type': 'application/json', 'x-api-key': SHOTSTACK_API_KEY };

const testPayload = {
  timeline: {
    background: "#000000",
    tracks: [
      {
        clips: [
          {
            asset: { type: "text", text: "TESTE SHOTSTACK", font: { family: "Arial", size: 40, color: "#ffffff" } },
            start: 0, length: 5, position: "center"
          }
        ]
      }
    ]
  },
  output: { format: "mp4", size: { width: 720, height: 1280 }, fps: 25 }
};

console.log('🧪 Testing Shotstack...');
fetch(`${BASE_URL}/render`, {
  method: 'POST',
  headers: HEADERS,
  body: JSON.stringify(testPayload)
})
.then(res => res.json())
.then(data => console.log('✅ Response:', JSON.stringify(data, null, 2)))
.catch(e => console.error('❌ Error:', e.message));
