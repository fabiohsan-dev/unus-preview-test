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

## Sync agendada

O agendamento da sincronização Vista -> Supabase é feito por `GitHub Actions`.

Configuração necessária:

- `GitHub > Settings > Secrets and variables > Actions`
  - `CRON_SECRET`
  - `DEPLOY_URL`
- `Vercel > Project > Settings > Environment Variables`
  - `CRON_SECRET` com o mesmo valor do secret no GitHub

Para apontar o workflow para outro projeto Vercel, basta:

1. atualizar `DEPLOY_URL` no GitHub com a URL base do outro deploy;
2. criar ou atualizar `CRON_SECRET` nesse outro projeto Vercel;
3. redeployar o projeto alvo.

O repositório não depende de `.vercel/project.json` para o cron funcionar. O link local com a Vercel CLI só é necessário para operações manuais de deploy ou inspeção.

## Inteligência de Dados

O projeto segue uma abordagem *Data-Driven*. Para mais detalhes sobre a estratégia de dados e maturidade do ecossistema, consulte:
`docs/README_INTELLIGENCE.md`

## Design System

Baseado em uma grade de 8pt, com tipografia de luxo (**Cormorant Garamond** para títulos e **Inter** para corpo). As definições estão centralizadas em `src/styles/theme.css`.
