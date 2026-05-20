import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let token: string | undefined;
  try {
    const body = await req.json() as { token?: string };
    token = body.token;
  } catch {
    return NextResponse.json({ success: false, error: 'Requisição inválida' }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json({ success: false, error: 'Token ausente' }, { status: 400 });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Key not configured — allow in development/preview without Turnstile
    return NextResponse.json({ success: true });
  }

  try {
    const form = new URLSearchParams();
    form.append('secret', secret);
    form.append('response', token);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });

    const data = await res.json() as { success: boolean };

    if (!data.success) {
      return NextResponse.json({ success: false, error: 'Verificação falhou' }, { status: 422 });
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error('[verify-turnstile] Error calling Cloudflare API');
    return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 });
  }
}
