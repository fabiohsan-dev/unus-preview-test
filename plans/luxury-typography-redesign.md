# Plano de Implementação: Nova Escala de Luxo e Tipografia UNUS 2026

## Objetivo
Implementar os princípios de "Quiet Luxury" e "Modern Heritage" identificados na pesquisa. O foco é criar um contraste dramático entre títulos massivos e micro-tipografia refinada, eliminando tamanhos médios e melhorando o respiro visual (white space).

## 1. Refatoração do Sistema (theme.css)
- **Escala Base:** Mudar a base do `html` de 15px para 16px.
- **Tokens de Texto:**
  - `text-xs`: 12px (Micro-labels com tracking 0.3em).
  - `text-sm`: 14px (Menus e metadados).
  - `text-base`: 16px (Corpo padrão).
  - `text-xl`: 24px (Títulos de Card - o mínimo para Cormorant brilhar).
  - `text-2xl`: 32px.
  - `text-3xl`: 48px.
  - `text-4xl`: 64px.
  - `text-5xl`: 80px (Hero Desktop).
  - `text-6xl`: 96px+ (Display Editorial).
- **Line-height:** Aumentar o padrão de corpo para 1.7 ou 1.8.

## 2. Ajuste de Fontes e Pesos
- **Cormorant Garamond:** Restringir o uso para tamanhos > 24px. Peso fixo em 300 ou 400.
- **DM Sans / Inter:** Padronizar como a fonte funcional para todo o corpo e labels, preferindo pesos 300 (Light) e 400 (Regular).
- **Tracking:** Aplicar `letter-spacing: 0.25em` a todos os elementos uppercase (eyebrows, menus, botões).

## 3. Rebalanceamento de Componentes Chave

### SectionHeader.tsx
- Atualizar o `clamp` do título para `clamp(40px, 5vw, 72px)`.
- Aumentar o espaçamento entre Eyebrow e Título.
- Melhorar a legibilidade do Subtitle (font-size 18px, line-height 1.8).

### Footer.tsx (Revisão 2)
- **Títulos das Colunas:** Subir para 14px (text-sm) com tracking 0.3em.
- **Links:** Subir para 16px (text-base) com opacidade 80%.
- **Endereços:** Aumentar para 16px e garantir que ícones (MapPin/Phone) acompanhem a escala.

### Home / Seções
- Aumentar paddings verticais de `py-20` para `py-32` ou `py-40` em seções principais para criar isolamento.

## 4. Verificação e Sincronização
- Garantir que as mudanças não quebrem o layout mobile (ajustar os breakpoints de escala).
- Commit e Push para `dev` -> `main`.
