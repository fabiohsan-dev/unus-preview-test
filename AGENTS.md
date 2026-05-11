# UNUS - Guia do Projeto para Codex

## Visao geral

UNUS e uma plataforma imobiliaria de luxo em Next.js 15 para a UNUS Nucleo Imobiliario, em Santa Catarina.

- Status: producao ativa na Vercel
- Repositorio: https://github.com/fabiohsan-dev/unus-preview-test
- Producao: `main`
- Desenvolvimento: `dev`
- Nunca commitar direto em `main`

## Stack

- Next.js 15.2.0 App Router
- React 18
- TypeScript 5.7 strict
- Tailwind CSS 4
- Motion/Framer Motion
- Radix UI
- React Hook Form
- Lucide React
- Vista CRM API
- WordPress companion em `cms/`

## Rotas ativas

- `/`
- `/venda`
- `/imovel/[slug]`
- `/empreendimentos`
- `/empreendimento/[slug]`
- `/favoritos`
- `/anuncie`
- `/contato`
- `/o-nucleo`
- `/parceiros-unus`

`/blog` permanece placeholder ate a integracao WordPress final.

## Variaveis de ambiente

```bash
VISTA_BASE_URL=https://[domain]-rest.vistahost.com.br
VISTA_KEY=[api-key-here]
NEXT_PUBLIC_SITE_URL=https://example.com
WORDPRESS_URL=https://[blog-domain]
```

`VISTA_KEY` e server-only. Nunca importar `src/lib/server/*` em client components.

## Vista CRM

Fluxo:

```text
Browser -> /api/imoveis/* ou Server Component -> Vista CRM -> mapper -> UI
```

Arquivos principais:

- `src/lib/server/vistaConfig.ts`
- `src/lib/server/vistaService.ts`
- `src/lib/vistaApi.ts`
- `src/lib/mappers/propertyMapper.ts`
- `src/types/vista.ts`

## Contratos atuais

- `/venda` usa params canonicos: `tipo`, `finalidade`, `cidade`, `bairro`, `precoMin`, `precoMax`, `areaMin`, `areaMax`, `quartos`, `suites`, `vagas`, `banheiros`, `codigo`, `ordem`, `view`, `page`.
- Aliases legados aceitos apenas para redirect: `categoria -> tipo`, `negocio -> finalidade`.
- Slug de imovel: `tipo-bairro-codigo`.
- Slug de empreendimento: `bairro-cidade-codigo`.
- Favoritos v2: `imovel:CODIGO` e `empreendimento:CODIGO`.
- Leads passam por helpers em `src/lib/whatsapp.ts`.
- Protecao de imagens e deterrencia visual, nao DRM.

Mais detalhes em `docs/HARDENING_CONTRACTS.md`.

## Comandos

```bash
npm run dev
npm run lint
npm test
npm run build
npm audit --omit=dev
```

## Design

- Accent/CTA: `#07C2F2`
- Heading: `#1A1A1C`
- Body: `#696A6C`
- Background: `#F8F8F6`
- WhatsApp: `#2D8B75`
- Titulos: Cormorant Garamond
- Corpo/labels: Barlow
- Grid: 8pt

## Regras de trabalho

- Preservar mudancas nao rastreadas do usuario.
- Criar branches a partir de `dev`, preferindo prefixo `codex/`.
- Usar `rg` para buscas.
- Rodar lint/test/build quando possivel antes de finalizar.
- Nao adicionar features grandes sem pedido explicito: mapa real, blog completo, comparador, calculadora, backend de leads.
