# UNUS Next.js

Site UNUS Núcleo Imobiliário — versão Next.js 15 com App Router.

## Stack

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (animações)
- **Lucide React** (ícones)

## Estrutura do Projeto (Enterprise Architecture)

```text
├── cms/                        # Temas e recursos WordPress
├── docs/                       # Documentação técnica e estratégica
├── public/                     # Ativos estáticos acessíveis via URL
├── scripts/                    # Automações e ferramentas de dados
├── src/
│   ├── app/                    # Rotas, Layouts e Páginas (Next.js)
│   ├── assets/                 # Imagens e ativos importados via código
│   ├── components/             # UI Components globais e reutilizáveis
│   ├── hooks/                  # Lógica de estado personalizada
│   ├── lib/                    # Serviços, APIs e Mappers
│   ├── styles/                 # Design Tokens e CSS Global
│   └── types/                  # Definições TypeScript
├── tests/                      # Scripts de teste e validação
└── README.md
```

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar dev server
npm run dev

# Build produção
npm run build

# Start produção
npm run start
```

## Dados de imoveis

Os imoveis sao carregados diretamente da Vista API pelas rotas server-side em `src/app/api/imoveis/*` e pelos Server Components que usam `src/lib/server/vistaService.ts`.

Configuracao necessaria:

- `VISTA_BASE_URL`
- `VISTA_KEY`

Nao ha sync agendada nem busca por IA no fluxo atual de producao.

## Inteligência de Dados

O projeto segue uma abordagem *Data-Driven*. Para mais detalhes sobre a estratégia de dados e maturidade do ecossistema, consulte:
`docs/README_INTELLIGENCE.md`

## Design System

Baseado em uma grade de 8pt, com tipografia de luxo (**Cormorant Garamond** para títulos e **Inter** para corpo). As definições estão centralizadas em `src/styles/theme.css`.
