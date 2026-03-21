import { config } from 'dotenv';
import { join } from 'path';
import { createWriteStream, mkdirSync } from 'fs';
import https from 'https';
import http from 'http';

config({ path: join(process.cwd(), '.env') });

const SHOTSTACK_API_KEY = process.env.SHOTSTACK_API_KEY;
if (!SHOTSTACK_API_KEY) {
  console.error('❌ ERROR: SHOTSTACK_API_KEY is not set.');
  process.exit(1);
}

const BASE_URL = 'https://api.shotstack.io/edit/v1';
const HEADERS = {
  'Content-Type': 'application/json',
  'x-api-key': SHOTSTACK_API_KEY,
};

const videosDir = join(process.cwd(), 'public', 'videos');
mkdirSync(videosDir, { recursive: true });

const baseTimelineStr = `{
  "timeline": {
    "background": "#000000",
    "tracks": [
      {
        "clips": [
          {
            "asset": { "type": "text", "text": "{{ HEADLINE }}", "alignment": { "horizontal": "center", "vertical": "center" }, "font": { "family": "Montserrat ExtraBold", "size": 60, "color": "#ffffff" }, "width": 463, "height": 200 },
            "start": 0, "length": "auto", "offset": { "x": 0, "y": 0.309 }, "position": "center", "fit": "none", "scale": 1
          }
        ]
      },
      {
        "clips": [
          {
            "length": "auto",
            "asset": {
              "type": "image",
              "src": "https://templates.shotstack.io/automated-tiktok-video-historical-facts/9bdcce84-a00f-46e5-af9c-5b1e2163fdec.png"
            },
            "start": 0,
            "scale": 0.2,
            "offset": { "x": 0, "y": 0.308 },
            "position": "center"
          }
        ]
      },
      {
        "clips": [
          {
            "length": "auto",
            "asset": {
              "type": "caption",
              "src": "alias://VOICEOVER",
              "background": { "color": "#0091ff", "padding": 25, "borderRadius": 9 },
              "font": { "size": 32 }
            },
            "start": 0
          }
        ]
      },
      {
        "clips": [
          {
            "fit": "none", "scale": 1, "length": 5,
            "asset": { "width": "768", "height": "1280", "type": "text-to-image", "prompt": "{{ IMAGE_2_PROMPT }}" },
            "start": 4, "transition": { "out": "fade", "in": "fade" }, "effect": "zoomOut"
          },
          {
            "fit": "none", "scale": 1, "length": 5,
            "asset": { "width": "768", "height": "1280", "type": "text-to-image", "prompt": "{{ IMAGE_4_PROMPT }}" },
            "start": 12, "transition": { "out": "fade", "in": "fade" }, "effect": "slideRight"
          }
        ]
      },
      {
        "clips": [
          {
            "length": 5, "asset": { "width": "768", "height": "1280", "type": "text-to-image", "prompt": "{{ IMAGE_1_PROMPT }}" },
            "start": 0, "transition": { "out": "fade" }, "effect": "zoomIn", "position": "center"
          },
          {
            "fit": "none", "scale": 1, "length": 5,
            "asset": { "width": "768", "height": "1280", "type": "text-to-image", "prompt": "{{ IMAGE_3_PROMPT }}" },
            "start": 8, "transition": { "out": "fade", "in": "fade" }, "effect": "slideLeft", "offset": { "x": 0.021, "y": 0 }, "position": "center"
          },
          {
            "fit": "none", "scale": 1, "length": 5,
            "asset": { "width": "768", "height": "1280", "type": "text-to-image", "prompt": "{{ IMAGE_5_PROMPT }}" },
            "start": 16, "transition": { "out": "fade", "in": "fade" }, "effect": "slideUp"
          }
        ]
      },
      {
        "clips": [
          {
            "length": "auto",
            "asset": { "voice": "Camila", "text": "{{VOICEOVER}}", "type": "text-to-speech" },
            "start": 0, "alias": "VOICEOVER"
          }
        ]
      },
      {
        "clips": [
          {
            "length": "end",
            "asset": {
              "type": "audio",
              "src": "https://cdn.shotstack.io/stock-music/upbeat-positive.mp3",
              "volume": 0.3
            },
            "start": 0
          }
        ]
      }
    ]
  },
  "output": {
    "format": "mp4",
    "fps": 25,
    "size": { "width": 720, "height": 1280 }
  }
}`;

function replacePlaceholders(str, map) {
  let res = str;
  for (const [key, val] of Object.entries(map)) {
    res = res.split(`{{ ${key} }}`).join(val);
  }
  return res;
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`Download ${url}: ${res.statusCode}`));
      const fileStream = createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

function renderVideo(hook, idx) {
  return new Promise(async (resolve, reject) => {
    const voiceover = `O que você precisa saber sobre ${hook}. Veja os detalhes agora.`;
    const imagePrompts = [
      `Health and wellness for ${hook}, photorealistic, bright colors`,
      `Supplement bottle and healthy food on table, professional lighting`,
      `Woman 40+ exercising or looking healthy, cinematic`,
      `Medical doctor explaining a chart, trustworthy`,
      `Natural products like herbs and fruits, vibrant`
    ];

    const payloadStr = replacePlaceholders(baseTimelineStr, {
      HEADLINE: hook,
      VOICEOVER: voiceover,
      IMAGE_1_PROMPT: imagePrompts[0],
      IMAGE_2_PROMPT: imagePrompts[1],
      IMAGE_3_PROMPT: imagePrompts[2],
      IMAGE_4_PROMPT: imagePrompts[3],
      IMAGE_5_PROMPT: imagePrompts[4]
    });

    let payload;
    try {
      payload = JSON.parse(payloadStr);
    } catch (e) {
      return reject(new Error(`JSON parse error: ${e.message}`));
    }

    console.log(`🎬 Rendering video ${idx+1}: ${hook}`);
    const startRes = await fetch(`${BASE_URL}/render`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(payload)
    });
    if (!startRes.ok) {
      const err = await startRes.text();
      return reject(new Error(`Render start failed ${idx+1}: ${startRes.status} ${err}`));
    }
    const startJson = await startRes.json();
    const renderId = startJson.response?.id || startJson.id;
    if (!renderId) {
      console.error('Unexpected response:', JSON.stringify(startJson, null, 2));
      return reject(new Error(`No render ID for video ${idx+1}`));
    }
    console.log(`   Render ID: ${renderId}`);

    // Poll
    let status = 'pending', videoUrl, duration;
    let attempts = 0;
    while (status === 'pending' || status === 'processing') {
      await new Promise(r => setTimeout(r, 10000));
      attempts++;
      const statRes = await fetch(`${BASE_URL}/render/${renderId}`, { headers: HEADERS });
      if (!statRes.ok) {
        const err = await statRes.text();
        return reject(new Error(`Status check failed ${idx+1}: ${statRes.status} ${err}`));
      }
      const statJson = await statRes.json();
      status = statJson.response?.status;
      if (status === 'done') {
        videoUrl = statJson.response.url;
        duration = statJson.response.duration;
        console.log(`✅ Video ${idx+1} done: ${videoUrl} (${duration}s)`);
      } else if (status === 'failed') {
        return reject(new Error(`Render ${renderId} failed: ${statJson.response?.error || 'unknown'}`));
      } else {
        console.log(`⏳ Video ${idx+1} status: ${status} (attempt ${attempts})`);
      }
      if (attempts > 36) return reject(new Error(`Timeout for render ${renderId}`));
    }

    if (!videoUrl) return reject(new Error('No video URL'));

    const filename = `mounjaro-hook-${idx+1}.mp4`;
    const savePath = join(process.cwd(), 'public', 'videos', filename);
    await downloadFile(videoUrl, savePath);
    console.log(`💾 Saved: ${savePath}`);
    resolve({ filename, videoUrl, duration });
  });
}

async function main() {
  try {
    const hooks = [
      "O que ninguém te conta sobre Mounjaro",
      "Mounjaro: a droga que está revolucionando a perda de peso",
      "Cuidado: efeitos colaterais do Mounjaro que você precisa saber",
      "Mounjaro funciona? Depoimento real após 30 dias",
      "Alternativas ao Mounjaro que são mais seguras"
    ];
    const results = [];
    for (let i = 0; i < hooks.length; i++) {
      results.push(await renderVideo(hooks[i], i));
    }
    console.log('\n📊 All videos:', results);
    console.log('\n🎉 Videos generated and saved to public/videos/');
  } catch (e) {
    console.error('❌', e.message);
    process.exit(1);
  }
}

main();
