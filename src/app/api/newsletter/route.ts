import { NextResponse } from 'next/server';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: string; locale?: string };
  try {
    body = (await request.json()) as { email?: string; locale?: string };
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }

  const record = {
    receivedAt: new Date().toISOString(),
    email,
    locale: body.locale === 'fr' ? 'fr' : 'ar',
  };

  try {
    const dir = path.join(process.cwd(), '.data');
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, 'newsletter.ndjson'),
      JSON.stringify(record) + '\n',
      'utf8',
    );
  } catch (error) {
    console.error('[newsletter] could not persist subscription:', error);
  }

  return NextResponse.json({ ok: true });
}
