# UNUS Next.js

Site UNUS Nucleo Imobiliario, plataforma Next.js 15 com App Router para busca, listagem e detalhe de imoveis de alto padrao.

## Stack

- Next.js 15
- React 18
- TypeScript 5 strict
- Tailwind CSS 4
- Motion/Framer Motion
- Radix UI
- Lucide React
- Vista CRM API
- WordPress companion em `cms/`

## Rotas principais

- `/` - home com curadoria de imoveis e empreendimentos
- `/venda` - listagem com filtros canonicos e paginacao
- `/imovel/[slug]` - detalhe de imovel com slug `tipo-bairro-codigo`
- `/empreendimentos` e `/empreendimento/[slug]` - listagem e detalhe de empreendimentos
- `/favoritos` - favoritos v2 em `localStorage`
- `/anuncie`, `/contato`, `/o-nucleo`, `/parceiros-unus` - paginas institucionais
- `/blog` - placeholder ate a integracao WordPress completa

## Desenvolvimento

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
npm run start
```

## Variaveis de ambiente

```bash
VISTA_BASE_URL=https://[domain]-rest.vistahost.com.br
VISTA_KEY=[api-key-here]
NEXT_PUBLIC_SITE_URL=https://example.com
WORDPRESS_URL=https://[blog-domain]
```

`VISTA_KEY` deve permanecer server-only. Scripts em `tests/` e `scripts/vista-tools/` leem `VISTA_BASE_URL` e `VISTA_KEY` do ambiente.

## Contratos de hardening

Veja `docs/HARDENING_CONTRACTS.md` para:

- query string publica de `/venda`
- compatibilidade e redirect de aliases legados
- slugs canonicos
- favoritos v2
- helpers de WhatsApp
- politica de protecao leve de imagens
- nota de rotacao da chave Vista

## Dados Vista

Fluxo principal:

```text
Browser -> Next API/Server Component -> Vista CRM -> mapper -> UI
```

Arquivos chave:

- `src/lib/server/vistaConfig.ts`
- `src/lib/server/vistaService.ts`
- `src/lib/vistaApi.ts`
- `src/lib/mappers/propertyMapper.ts`
- `src/lib/slug.ts`
- `src/lib/vendaSearch.ts`
- `src/lib/favoriteIds.ts`
- `src/lib/whatsapp.ts`

## Design System

Grade 8pt, Cormorant Garamond para titulos e Barlow para corpo/labels. Tokens em `src/styles/theme.css`.
