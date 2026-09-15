import { NextResponse } from 'next/server';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  subject?: string;
  message?: string;
  locale?: string;
  consent?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const subject = (body.subject ?? '').trim();
  const message = (body.message ?? '').trim();
  const phone = (body.phone ?? '').trim();

  const errors: string[] = [];
  if (name.length < 2) errors.push('name');
  if (!EMAIL_RE.test(email)) errors.push('email');
  if (phone && !/^[+()\d\s.-]{8,20}$/.test(phone)) errors.push('phone');
  if (!subject) errors.push('subject');
  if (message.length < 20) errors.push('message');
  if (body.consent !== true) errors.push('consent');

  if (errors.length) {
    return NextResponse.json({ ok: false, error: 'validation', fields: errors }, { status: 422 });
  }

  const record = {
    receivedAt: new Date().toISOString(),
    locale: body.locale === 'fr' ? 'fr' : 'ar',
    name,
    email,
    phone,
    city: (body.city ?? '').trim(),
    subject,
    message,
    userAgent: request.headers.get('user-agent') ?? '',
  };

  // Persist submissions to a local, git-ignored sink and log them so the
  // operator can see incoming leads. Swap this for an SMTP/CRM call in production.
  try {
    const dir = path.join(process.cwd(), '.data');
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, 'leads.ndjson'), JSON.stringify(record) + '\n', 'utf8');
  } catch (error) {
    console.error('[contact] could not persist lead:', error);
  }

  console.info(
    `[contact] new lead — ${record.name} <${record.email}> · ${record.subject} · ${record.locale}`,
  );

  return NextResponse.json({ ok: true });
}
