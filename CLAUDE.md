# UNUS — Núcleo Imobiliário | Guia do Projeto para Claude Code

## Visão Geral

**UNUS** é uma plataforma imobiliária de luxo em Next.js 15 para a UNUS Núcleo Imobiliário, corretora de alto padrão em Santa Catarina, Brasil. O site serve compradores/locatários (busca e listagem de imóveis) e vendedores (avaliação e anúncio de imóveis).

- **Status:** Produção ativa (Vercel)
- **Repositório:** https://github.com/fabiohsan-dev/unus-preview-test
- **Branch de produção:** `main`
- **Branch de desenvolvimento:** `dev`
- **URL de produção:** deploy via Vercel (branch `main`)

## Stack Técnico

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15.2.0 (App Router, SSR/ISR) |
| Linguagem | TypeScript 5.7.0 (strict mode) |
| Estilização | Tailwind CSS 4.0.0 + tokens customizados |
| Animações | Framer Motion 12.23.24 |
| UI Primitives | Radix UI (28 pacotes) |
| Formulários | React Hook Form 7.55.0 |
| Ícones | Lucide React 0.487.0 |
| CMS Companion | WordPress (tema customizado em `cms/`) |
| Deploy | Vercel (serverless) |

## Estrutura de Diretórios

```
UNUS-PREVIEW-V01/
├── src/
│   ├── app/                    # Rotas Next.js App Router
│   │   ├── page.tsx            # Home (ISR 3600s)
│   │   ├── venda/page.tsx      # Listagem com filtros (ISR 300s)
│   │   ├── imovel/[slug]/      # Detalhe do imóvel (ISR 300s)
│   │   ├── api/imoveis/        # API Routes (proxy para Vista CRM)
│   │   │   ├── metadata/       # Opções de filtro (cache 1h)
│   │   │   ├── listar/         # Lista paginada (cache 2min)
│   │   │   └── [codigo]/       # Detalhe por código (cache 5min)
│   │   ├── blog/               # ComingSoon
│   │   ├── anuncie/            # ComingSoon
│   │   ├── o-nucleo/           # ComingSoon
│   │   ├── favoritos/          # ComingSoon
│   │   └── contato/            # ComingSoon
│   ├── components/             # Componentes React
│   ├── lib/
│   │   ├── vistaApi.ts         # Client-side API (nunca expõe key)
│   │   ├── server/
│   │   │   ├── vistaConfig.ts  # Config e URL builder (server-only)
│   │   │   └── vistaService.ts # Lógica de negócio Vista CRM
│   │   └── mappers/
│   │       └── propertyMapper.ts  # Transforma dados Vista → UI
│   ├── styles/                 # CSS, tokens de design, Tailwind
│   └── types/                  # Interfaces TypeScript
├── cms/unus-blog-theme/        # Tema WordPress companion
├── docs/                       # Documentação técnica e estratégica
├── scripts/                    # Ferramentas de automação e diagnóstico
├── tests/                      # Testes de integração da API
├── public/                     # Assets estáticos
├── CLAUDE.md                   # Este arquivo
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

## Variáveis de Ambiente

```bash
# Obrigatórias (produção e dev)
VISTA_BASE_URL=https://[domain]-rest.vistahost.com.br
VISTA_KEY=[api-key-here]

# Opcionais
WORDPRESS_URL=https://[blog-domain]
```

**Segurança:** `VISTA_KEY` é server-only. Nunca exposta ao browser. Todo acesso à Vista API ocorre via `/api/imoveis/*`.

## Integração Vista CRM

A fonte de dados é a API Vista CRM (imóveis em tempo real).

**Fluxo de dados:**
```
Browser → /api/imoveis/* (Next.js API Route) → Vista CRM API → mapper → componente
```

**Arquivos chave:**
- `src/lib/server/vistaConfig.ts` — Valida config, constrói URL autenticada
- `src/lib/server/vistaService.ts` — `getMetadataServer()`, `getListarImoveisServer()`, `getDetalheImovelServer()`
- `src/lib/vistaApi.ts` — Client-side: chama `/api/imoveis/*` (nunca Vista diretamente)
- `src/lib/mappers/propertyMapper.ts` — `mapToFeaturedProperty()`, `mapToOpportunity()`, `mapToGridProperty()`

**Slug de imóvel:** formato `tipo-bairro-codigo` (ex: `casa-campinas-74383`)

## Design System

**Cores principais:**
- Accent/CTA: `#07C2F2` (cyan)
- Heading: `#1A1A1C` (grafite escuro)
- Body: `#696A6C` (grafite médio)
- Background: `#F8F8F6` (off-white)
- WhatsApp: `#2D8B75`

**Tipografia:**
- Títulos: Cormorant Garamond (serif), 400–600
- Corpo/Labels: Inter (sans), 300–500

**Grid:** sistema 8pt (4, 8, 16, 24, 32, 48, 64, 96, 128px)

**Tokens CSS:** definidos como `--primary-500`, `--secondary-900`, `--neutral-50`, etc.

## Componentes Principais

### Client Components (`'use client'`)
- `Header.tsx` — Navegação fixa, toggle mobile
- `Footer.tsx` — Footer escuro, links, CRECI
- `HeroSearch.tsx` — Hero fullscreen + SearchBar
- `SearchBar.tsx` — Filtros interativos (variante: hero, page)
- `PropertyFilters.tsx` — Barra de filtros na página de venda
- `FeaturedCards.tsx` — Carrossel auto-rotativo (6s)
- `PropertyCard.tsx` — Card de imóvel (variantes: grid, list)
- `SalesOpportunities.tsx` — Grid de oportunidades de investimento
- `ComingSoon.tsx` — Placeholder para páginas em construção
- `FixedButtons.tsx` — WhatsApp + cookies (fixed)

### Server Components (default)
- `app/page.tsx` — Home, ISR 3600s
- `app/venda/page.tsx` — Listagem com filtros
- `app/imovel/[slug]/page.tsx` — Detalhe do imóvel

## Workflow de Desenvolvimento

### Regra fundamental
**Nunca commitar diretamente na `main`.** A `main` é produção.

### Branches
```
main        ← produção (Vercel deploy automático)
dev         ← desenvolvimento e integração
feature/*   ← features individuais, ramificam de dev
fix/*       ← bugfixes, ramificam de dev
```

### Fluxo padrão
```bash
git checkout dev
git checkout -b feature/nome-da-feature
# ... trabalho ...
git push origin feature/nome-da-feature
# PR: feature/* → dev
# PR: dev → main (apenas quando pronto para produção)
```

### Comandos úteis
```bash
npm run dev          # Servidor de desenvolvimento (localhost:3000)
npm run build        # Build de produção
npm run lint         # ESLint
npm run type-check   # TypeScript check (se configurado)
```

## ISR (Incremental Static Regeneration)

| Página | Revalidação |
|--------|-------------|
| Home (`/`) | 3600s (1 hora) |
| Venda (`/venda`) | 300s (5 min) |
| Detalhe (`/imovel/[slug]`) | 300s (5 min) |
| API metadata | 3600s (1 hora) |
| API listar | 120s (2 min) |
| API detalhe | 300s (5 min) |

## Estado Atual do Projeto

### Páginas ativas (funcionando)
- `/` — Home completa
- `/venda` — Listagem com filtros e paginação
- `/imovel/[slug]` — Detalhe do imóvel

### Páginas placeholder (ComingSoon)
- `/blog`, `/anuncie`, `/o-nucleo`, `/favoritos`, `/contato`

### Maturidade por dimensão
| Dimensão | Score |
|----------|-------|
| UI/UX | 4.5/5 |
| Performance | 4.8/5 |
| Inteligência de dados | 2.5/5 |
| SEO | 3.0/5 |
| Escalabilidade | 4.0/5 |
| Mobile | 4.2/5 |
| Acessibilidade | 3.8/5 |
| Qualidade de código | 4.0/5 |

## Convenções de Código

- **TypeScript strict:** sempre tipado, sem `any`
- **Server-only:** módulos em `src/lib/server/` nunca importados no cliente
- **Alias de path:** `@/*` → `src/*`
- **Comentários:** apenas quando o "por quê" não é óbvio
- **Componentes client:** arquivo começa com `'use client'`
- **ISR:** exportar `revalidate` nos page.tsx server components

## Contexto de Delegação

Para tarefas que consomem muito contexto (exploração ampla, geração de arquivos longos), usar:
1. **Gemini CLI** em modo não interativo: `gemini -p "..."`
2. **Conector Codex** disponível no ambiente

## Próximas Oportunidades (Roadmap)

1. Calculadora de ROI para investidores
2. Filtros de estilo de vida (orla, marina, caminhabilidade)
3. Prova social em tempo real ("3 pessoas viram este imóvel hoje")
4. Integração completa do blog WordPress
5. Conteúdo SEO hiperlocal por bairro
6. Ray-X de bairros (tendências de preço, índice de liquidez)
