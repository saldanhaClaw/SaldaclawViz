import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config';

const bearer = process.env.TWITTER_BEARER_TOKEN;

if (!bearer) {
  console.error('❌ Missing TWITTER_BEARER_TOKEN');
  process.exit(1);
}

const client = new TwitterApi(bearer);

try {
  const user = await client.v2.me();
  console.log('✅ Bearer token valid! Connected as @' + user.data.username);
  process.exit(0);
} catch (err) {
  console.error('❌ Bearer token invalid:', err.message);
  if (err.code === 'UNAUTHORIZED_CLIENT') {
    console.error('   → App permissions insufficient or token expired');
  }
  process.exit(1);
}
