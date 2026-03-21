import { NextResponse } from 'next/server';
import { sendTweet, generateMarketingCopy } from '../../../../lib/twitter';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const copy = generateMarketingCopy();
    await sendTweet(copy);
    return NextResponse.json({ ok: true, posted: copy });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
