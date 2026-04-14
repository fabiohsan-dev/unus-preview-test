import 'server-only';

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { SearchFilters, ImovelCard } from '@/types/imovel';

// ---------------------------------------------------------------------------
// OpenAI client
// ---------------------------------------------------------------------------

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? '' });

// ---------------------------------------------------------------------------
// Turnstile verification
// ---------------------------------------------------------------------------

async function verifyTurnstile(token: string): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') return true;

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
      }
    );

    const data = await res.json();
    return data.success === true;
  } catch {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[search] Turnstile verification error');
    }
    return false;
  }
}

// ---------------------------------------------------------------------------
// Extract filters from natural language query via GPT-4.1 Nano
// ---------------------------------------------------------------------------

async function extractFilters(query: string): Promise<SearchFilters> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente de busca imobiliária. Extraia os filtros da query ' +
            'do usuário em JSON. Campos disponíveis: tipo, quartos (mínimo), banheiros ' +
            '(mínimo), vagas (mínimo), preco_min, preco_max (em reais), area_min (m²), ' +
            'bairro, cidade, finalidade, caracteristicas (array com [\'piscina\', ' +
            '\'varanda\', \'gourmet\', \'vista mar\', etc]). Retorne APENAS o JSON, ' +
            'sem explicação.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return {};

    return JSON.parse(content) as SearchFilters;
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[search] OpenAI filter extraction error:', err);
    }
    return {};
  }
}

// ---------------------------------------------------------------------------
// POST /api/search
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, turnstileToken } = body as {
      query?: string;
      turnstileToken?: string;
    };

    // Validate input
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query é obrigatória' },
        { status: 400 }
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        { error: 'Query muito longa (máx. 500 caracteres)' },
        { status: 400 }
      );
    }

    // Turnstile verification (skip in development)
    if (process.env.NODE_ENV !== 'development') {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: 'Token Turnstile ausente' },
          { status: 400 }
        );
      }
      const valid = await verifyTurnstile(turnstileToken);
      if (!valid) {
        return NextResponse.json(
          { error: 'Verificação anti-bot falhou' },
          { status: 403 }
        );
      }
    }

    // Extract filters with AI
    const filters = await extractFilters(query.trim());

    // Query Supabase — apply filters inline to preserve proper typing
    const supabase = createServerSupabaseClient();

    const selectFields =
      'id, titulo, url, preco, area_m2, quartos, banheiros, vagas, tipo, finalidade, bairro, cidade, foto_capa, destaque';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dbQuery: any = supabase
      .from('imoveis_index')
      .select(selectFields);

    if (filters.tipo) {
      dbQuery = dbQuery.eq('tipo', filters.tipo);
    }
    if (filters.finalidade) {
      dbQuery = dbQuery.eq('finalidade', filters.finalidade);
    }
    if (filters.quartos && filters.quartos > 0) {
      dbQuery = dbQuery.gte('quartos', filters.quartos);
    }
    if (filters.banheiros && filters.banheiros > 0) {
      dbQuery = dbQuery.gte('banheiros', filters.banheiros);
    }
    if (filters.vagas && filters.vagas > 0) {
      dbQuery = dbQuery.gte('vagas', filters.vagas);
    }
    if (filters.preco_min && filters.preco_min > 0) {
      dbQuery = dbQuery.gte('preco', filters.preco_min);
    }
    if (filters.preco_max && filters.preco_max > 0) {
      dbQuery = dbQuery.lte('preco', filters.preco_max);
    }
    if (filters.area_min && filters.area_min > 0) {
      dbQuery = dbQuery.gte('area_m2', filters.area_min);
    }
    if (filters.bairro) {
      dbQuery = dbQuery.ilike('bairro', `%${filters.bairro}%`);
    }
    if (filters.cidade) {
      dbQuery = dbQuery.ilike('cidade', `%${filters.cidade}%`);
    }
    if (filters.caracteristicas && filters.caracteristicas.length > 0) {
      dbQuery = dbQuery.contains('caracteristicas', filters.caracteristicas);
    }

    dbQuery = dbQuery.order('destaque', { ascending: false }).limit(20);

    const { data, error } = await dbQuery;

    if (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[search] Supabase query error:', error);
      }
      return NextResponse.json(
        { error: 'Erro ao buscar imóveis' },
        { status: 500 }
      );
    }

    const results: ImovelCard[] = (data as ImovelCard[]) ?? [];

    return NextResponse.json({ results, filters });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[search] Unexpected error:', err);
    }
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
