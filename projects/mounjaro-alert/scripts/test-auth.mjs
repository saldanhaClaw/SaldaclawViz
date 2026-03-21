import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config';

const clientId = process.env.TWITTER_CLIENT_ID;
const clientSecret = process.env.TWITTER_CLIENT_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;

if (!clientId || !clientSecret || !accessToken) {
  console.error('❌ Missing OAuth2 credentials (TWITTER_CLIENT_ID/SECRET/ACCESS_TOKEN)');
  process.exit(1);
}

const client = new TwitterApi({
  clientId,
  clientSecret,
  accessToken,
});

try {
  const user = await client.v2.me();
  console.log('✅ Connected to Twitter as @' + user.data.username);
  console.log('🔒 Auth method: OAuth 2.0 PKCE (User Context)');
  process.exit(0);
} catch (err) {
  console.error('❌ Authentication failed:', err.message);
  if (err.code === 'UNAUTHORIZED_CLIENT') {
    console.error('   → Check: TWITTER_CLIENT_ID and TWITTER_CLIENT_SECRET are correct');
  }
  if (err.code === 'INVALID_OR_EXPIRED_TOKEN') {
    console.error('   → Check: TWITTER_ACCESS_TOKEN is valid (may have expired)');
  }
  process.exit(1);
}
