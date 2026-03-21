import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config';

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;

if (!TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_TOKEN_SECRET) {
  console.error('❌ Missing OAuth 1.0a credentials (TWITTER_CONSUMER_KEY/SECRET/ACCESS_TOKEN/ACCESS_SECRET)');
  process.exit(1);
}

const client = new TwitterApi({
  appKey: TWITTER_CONSUMER_KEY,
  appSecret: TWITTER_CONSUMER_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
});

try {
  const user = await client.v2.me();
  console.log('✅ Connected to Twitter as @' + user.data.username);
  console.log('🔒 Auth method: OAuth 1.0a (User Context) — FULL WRITE ACCESS');
  process.exit(0);
} catch (err) {
  console.error('❌ Authentication failed:', err.message);
  if (err.statusCode === 401) {
    console.error('   → Credentials invalid or expired. Regenerate Twitter Access Token/Secret.');
  }
  process.exit(1);
}
