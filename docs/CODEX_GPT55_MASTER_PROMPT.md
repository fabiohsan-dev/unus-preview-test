# Prompt Mestre — GPT-5.5 / Codex para Revisão da Home UNUS

Este documento é a instrução principal para um agente de código aplicar a revisão da Home UNUS com segurança, qualidade visual e baixo risco técnico.

Ele foi escrito para uso com GPT-5.5 Thinking, Codex, Cursor, Claude Code ou qualquer agente de programação com acesso ao repositório.

> Nota honesta: nesta sessão, não houve acesso a web live. Portanto, a seção de boas práticas abaixo consolida práticas atuais conhecidas e a análise do próprio repositório. Se o agente que executar este prompt tiver web habilitada, ele deve validar rapidamente documentação atual de Next.js, React, Tailwind e GitHub Actions antes de implementar.

---

## 1. Contexto da entrega

Repositório: `fabiohsan-dev/unus-preview-test`

Produto: novo site premium da UNUS Núcleo Imobiliário.

Stack identificada no projeto:

- Next.js com App Router.
- React.
- TypeScript.
- Tailwind CSS 4.
- Design tokens em `src/styles/theme.css`.
- Rotas em `src/app`.
- Componentes globais em `src/components`.
- Integração de imóveis via Vista API.
- Índice Supabase para dados auxiliares/busca.
- Busca inteligente com IA já existente, mas considerada overdelivery.

Fonte de direção de produto/design:

- Revisão visual da Home UNUS, atualizada em 21/04.
- Plano operacional em `docs/UNUS_HOME_IMPLEMENTATION_PLAN.md`.

Decisão de escopo:

A busca inteligente com IA é um bônus. Ela deve permanecer funcional, mas não é prioridade. O foco desta entrega é melhorar o que o cliente e o usuário final percebem imediatamente: Home, direção visual, navegação, hero, busca visual inicial, cards, CTAs, footer e mobile.

---

## 2. Boas práticas consolidadas para GPT-5.5 / Codex em repositório real

Aplique estas práticas antes e durante qualquer alteração.

### 2.1. Práticas de agentic coding

1. Leia antes de editar. Nunca altere arquivo central sem entender imports, props, dados recebidos e uso em outras rotas.
2. Faça mudanças pequenas e reversíveis. Evite reescrita total quando uma refatoração incremental resolve.
3. Planeje por fases. Primeiro design system, depois estrutura da Home, depois componentes, depois QA.
4. Mantenha escopo rígido. Não refatore busca IA, autenticação IA, Vista API ou Supabase se a tarefa é Home.
5. Preserve comportamento existente. Alterar visual não pode quebrar rotas, filtros, páginas de imóvel ou dados reais.
6. Prefira edição localizada. Se uma mudança pertence ao design system, ajuste tokens globais em vez de espalhar classes e cores soltas.
7. Use critérios de aceite. Cada bloco deve ter resultado verificável.
8. Rode validações ao final. Build, typecheck e lint são parte da entrega, não um extra.
9. Documente pendências reais. Se faltam telefone, CRECI, imagem final ou texto aprovado, use TODO claro e não invente dado.
10. Entregue resumo objetivo. Liste arquivos alterados, decisões, comandos rodados e pendências.

### 2.2. Práticas para Next.js App Router

1. Mantenha Server Components por padrão em páginas e seções que apenas renderizam dados.
2. Use Client Components apenas onde houver estado, evento, browser API, animação interativa ou formulário client-side.
3. Evite transformar a Home inteira em client component.
4. Preserve `revalidate` e estratégias de cache existentes, salvo se houver motivo técnico claro.
5. Não quebre `src/app/imovel/[slug]` nem links antigos por código.
6. Use `next/image` para imagens reais quando possível e configure `sizes` adequados.
7. Evite import pesado acima da dobra. Componentes abaixo da dobra podem continuar com carregamento dinâmico quando fizer sentido.
8. Não adicione dependências novas para UI simples que pode ser resolvida com React/Tailwind.

### 2.3. Práticas para React e TypeScript

1. Preserve tipagem de props dos componentes.
2. Evite `any`, exceto quando já existir e a refatoração do tipo estiver fora do escopo.
3. Não altere contrato de componentes sem atualizar todos os usos.
4. Crie helpers pequenos para normalizar título, slug e dados de card.
5. Evite lógica de negócio complexa dentro do JSX.
6. Prefira dados derivados antes do `return` para deixar JSX limpo.
7. Não duplique lógica de card em vários componentes.

### 2.4. Práticas para Tailwind CSS 4 e design tokens

1. Centralize cores, sombras, fontes e semântica visual em `src/styles/theme.css`.
2. Use tokens semânticos: CTA primário, fundo off-white, texto de preço, texto de legenda, borda suave.
3. Evite hardcode repetido de hex em componentes.
4. Preserve estética premium: menos ruído, mais espaço, hierarquia forte e contraste controlado.
5. Use spacing consistente com a grade de 8pt já declarada no projeto.
6. Mantenha legibilidade no mobile: fonte de preço, labels e botões precisam funcionar em telas pequenas.

### 2.5. Práticas de UX para Home imobiliária premium

1. A Home não deve tentar contar tudo. Ela deve conduzir.
2. A sequência ideal é: impacto > busca > curadoria > imóveis > lançamentos > contato/anúncio > confiança > footer.
3. Cada seção precisa ter uma função clara: buscar, explorar, converter ou gerar confiança.
4. Mobile é prioridade de retenção. Menos seções, menos texto, CTAs mais próximos.
5. Header deve dar acesso rápido a: corretor, imóveis e favoritos.
6. Hero deve ter uma frase forte, não um bloco institucional longo.
7. Busca inicial deve parecer simples mesmo quando existirem filtros avançados.
8. Cards devem permitir leitura rápida: imagem, tipo, título limpo, localização, preço, atributos principais.
9. CTA consultivo é essencial para quem não quer buscar sozinho.
10. CTA de captação deve ser direto: anuncie seu imóvel.

### 2.6. Práticas para performance e imagem

1. A imagem do hero é crítica; otimize prioridade, dimensões e `sizes`.
2. Imagens abaixo da dobra devem carregar de forma preguiçosa quando possível.
3. Evite carrossel pesado sem necessidade.
4. Limitar vitrine para 6 imóveis melhora retenção e peso visual.
5. Não prometa impedir download de imagem. É possível dificultar, não bloquear 100%.
6. Se aplicar proteção leve em imagens, não prejudique acessibilidade nem mobile.

### 2.7. Práticas para SEO e imóveis

1. Use URLs amigáveis para imóveis quando houver slug disponível.
2. Mantenha fallback por código para compatibilidade.
3. Não remova metadata existente.
4. Evite títulos repetidos como “Apartamento — Apartamento em Campinas”.
5. Preço, localização e tipo precisam estar semanticamente claros.
6. Não invente schema ou dados estruturados sem validar os campos reais.

### 2.8. Práticas para CI e qualidade

1. O CI deve rodar em pull request e push.
2. Comandos mínimos: install, lint, typecheck e build.
3. Não use `ignoreDuringBuilds` como solução para esconder problema novo.
4. Se o projeto já usa alguma exceção, documente antes de alterar.
5. O build final precisa passar antes de considerar a entrega pronta.

---

## 3. Prompt mestre para execução

Copie e cole o bloco abaixo no GPT-5.5/Codex.

```text
Você é um engenheiro front-end sênior, designer de produto e arquiteto de interface trabalhando no repositório `fabiohsan-dev/unus-preview-test`.

Missão: aplicar a revisão da Home UNUS com alto padrão visual, segurança técnica e foco em conversão.

Você deve atuar como um agente de código cuidadoso: ler primeiro, planejar, alterar em blocos pequenos, preservar comportamento existente e validar no final.

CONTEXTO DO PRODUTO

O projeto é um site imobiliário premium da UNUS Núcleo Imobiliário. A Home atual precisa ficar mais curta, mais elegante, mais objetiva e mais bem conduzida, especialmente no mobile.

A revisão visual pede:
- Manter base UNUS: preto, branco e cinza.
- Trazer azul profundo e off-white como cores secundárias.
- Usar azul profundo em CTAs, botões e destaques.
- Usar off-white para fundos de transição.
- Melhorar hierarquia visual, legibilidade de preço e estética premium.
- Reduzir excesso institucional na Home.
- Criar melhor conexão entre seções.
- Melhorar retenção no mobile.

REGRA DE ESCOPO MAIS IMPORTANTE

A busca inteligente com IA é overdelivery. Ela deve continuar funcionando, mas NÃO é o foco desta entrega.

Não refatore agora:
- endpoint de IA
- autenticação da busca IA
- lógica OpenAI
- prompts de IA
- Supabase da busca IA

Só toque nessa área se alguma alteração visual da Home exigir um ajuste superficial ou se algo quebrar por import/rota.

ANTES DE ALTERAR CÓDIGO

1. Leia estes arquivos:
   - `docs/UNUS_HOME_IMPLEMENTATION_PLAN.md`
   - `docs/CODEX_GPT55_MASTER_PROMPT.md`
   - `README.md`
   - `package.json`
   - `next.config.ts`
   - `src/app/page.tsx`
   - `src/app/layout.tsx`
   - `src/styles/theme.css`
   - `src/components/Header.tsx`
   - `src/components/Footer.tsx`
   - `src/components/HeroSearch.tsx`
   - `src/components/CategoryStrip.tsx`
   - `src/components/FeaturedCards.tsx`
   - `src/components/PropertyCard.tsx`
   - `src/components/SalesOpportunities.tsx`
   - `src/components/AboutUs.tsx`
   - `src/components/VisitUs.tsx`
   - `src/components/NeighborhoodOpps.tsx`
   - `src/components/BlogSection.tsx`
   - `src/lib/server/vistaService.ts`
   - `src/lib/mappers/propertyMapper.ts`

2. Se algum arquivo não existir, encontre o equivalente mais próximo.

3. Gere um plano curto antes de codar, contendo:
   - arquivos que serão alterados
   - ordem das mudanças
   - riscos técnicos
   - como validar

4. Se você tiver acesso à web, valide rapidamente boas práticas atuais para:
   - Next.js App Router
   - React Server Components
   - Tailwind CSS 4
   - next/image e performance
   - GitHub Actions para CI
   - UX mobile de Home longa

5. Se não tiver acesso à web, declare isso e siga com a análise local do repositório.

OBJETIVO DE ARQUITETURA DA HOME

Reorganize a Home para uma estrutura mais curta e intencional:

1. Header revisado.
2. Hero com headline curta e busca inicial.
3. CTA de atendimento consultivo próximo à busca.
4. Coleções curadas.
5. Imóveis com alta procura.
6. Vitrine UNUS / Imóveis em destaque, limitada a 6 itens.
7. Lançamentos e em obra.
8. CTA “Anuncie seu imóvel”.
9. Prova social ou institucional curto.
10. Footer revisado.

CRITÉRIOS GERAIS DE QUALIDADE

- Não transformar a Home inteira em Client Component.
- Não quebrar integração Vista API.
- Não quebrar página `/imovel/[slug]`.
- Não quebrar cards com dados reais.
- Não inventar telefone, CRECI, endereço ou avaliação real.
- Não adicionar dependência sem necessidade.
- Não espalhar hex colors nos componentes sem motivo.
- Não apagar funcionalidade existente sem justificativa.
- Não usar busca IA como foco da entrega.

FASE 1 — BASE TÉCNICA

Objetivo: garantir que o projeto possa ser validado.

Tarefas:
- Verifique scripts em `package.json`.
- Adicione script `typecheck` se não existir.
- Corrija lint/build apenas se necessário.
- Se fizer sentido, crie workflow de CI em `.github/workflows/ci.yml` com install, lint, typecheck e build.

Critério de aceite:
- Comandos esperados existem ou são documentados.
- Build final pode ser executado.

FASE 2 — DESIGN SYSTEM

Objetivo: aplicar direção visual global antes de mexer seção por seção.

Tarefas:
- Atualize `src/styles/theme.css` quando fizer sentido.
- Defina/ajuste tokens para:
  - azul profundo
  - off-white
  - cinzas premium
  - CTA primário
  - CTA secundário
  - texto de preço
  - borda suave
- Preserve identidade premium e minimalista.

Critério de aceite:
- Botões e CTAs usam azul profundo.
- Fundos alternam branco/off-white com contraste claro.
- Preços ficam mais legíveis.
- Componentes não dependem de cores soltas repetidas.

FASE 3 — HEADER

Objetivo: revisar navegação superior.

Tarefas:
- Logo centralizada.
- Lado esquerdo: “Fale com um corretor”.
- Lado direito: “Ver imóveis” e “Favoritos”.
- Dropdown em “Ver imóveis” com:
  - Pronto para morar
  - Lançamentos e/ou em obra
  - Casas
  - Coberturas
- Mobile limpo e funcional.

Critério de aceite:
- Header desktop segue direção aprovada.
- Header mobile funciona sem quebrar layout.
- Links são estáveis e não quebram rotas.

FASE 4 — HERO E BUSCA VISUAL INICIAL

Objetivo: tornar a primeira dobra mais forte e objetiva.

Tarefas:
- Headline: “Onde você mora define como você vive!”
- Reduzir texto secundário.
- Usar imagem premium/fallback existente.
- Barra de busca sem contorno pesado.
- Campos visuais:
  - Tipo
  - Localização
  - Preço
  - Filtro avançado
  - Buscar imóvel
- Botão em azul profundo.

Critério de aceite:
- Hero fica mais minimalista.
- Busca inicial fica clara e premium.
- Mobile fica legível e sem excesso vertical.

FASE 5 — CTA DE ATENDIMENTO CONSULTIVO

Objetivo: capturar usuários que preferem falar com corretor.

Tarefas:
- Inserir CTA próximo à busca.
- Copy: “Prefere uma curadoria personalizada? Fale com um corretor.”
- Linkar para contato, WhatsApp ou rota existente.
- Não competir visualmente com o botão principal.

Critério de aceite:
- CTA é visível no desktop e mobile.
- Usuário entende que pode receber atendimento humano.

FASE 6 — COLEÇÕES CURADAS

Objetivo: transformar categorias em navegação premium.

Tarefas:
- Fundo branco.
- Título pequeno: “Coleções curadas”.
- Título principal/subtítulo: “Imóvel ideal para a sua vida”.
- Categorias:
  - Pronto para morar
  - Lançamentos e/ou em obra
  - Casas
  - Coberturas
- Links para filtros/listagens existentes ou URLs estáveis.

Critério de aceite:
- Seção limpa, curta e clicável.
- Não há texto institucional excessivo.

FASE 7 — IMÓVEIS COM ALTA PROCURA

Objetivo: refinar a curadoria principal.

Tarefas:
- Fundo off-white.
- Título pequeno: “Nossa curadoria”.
- Título principal: “Imóveis com alta procura”.
- Remover “a partir de” dos valores.
- CTA em azul profundo quando fizer sentido.

Critério de aceite:
- Valores aparecem de forma direta.
- Seção tem contraste com a anterior.
- Texto de apoio é curto e premium.

FASE 8 — CARDS DE IMÓVEIS

Objetivo: melhorar leitura, visual e evitar repetição.

Tarefas:
- Remover repetição entre label de tipo e título.
- Criar helper para limpar título quando começar com o tipo do imóvel, se necessário.
- Dar mais destaque ao preço.
- Mostrar atributos de forma minimalista:
  - dormitórios
  - vagas
  - m²
- Manter outros atributos se já forem relevantes, mas sem poluir.
- Preservar fallback de imagem.

Critério de aceite:
- Card não exibe “Apartamento” repetido no label e no título.
- Card fica mais limpo e próximo de referência premium.
- Dados reais não quebram layout.

FASE 9 — VITRINE UNUS

Objetivo: reduzir tamanho da vitrine e melhorar retenção.

Tarefas:
- Título pequeno: “Vitrine UNUS”.
- Título principal: “Imóveis em Destaque”.
- Limitar exibição a 6 imóveis.
- Desktop: 3 colunas x 2 linhas.
- Mobile: empilhado sem excesso visual.

Critério de aceite:
- A Home não fica longa por excesso de cards.
- A seção é clara e escaneável.

FASE 10 — LANÇAMENTOS E EM OBRA

Objetivo: criar bloco forte para oportunidades e investidores.

Tarefas:
- Título pequeno: “Para investidores”.
- Título principal: “Lançamentos e em obra”.
- Criar card/banner visualmente diferente da vitrine comum.
- CTA: “Ver lançamentos”.
- Linkar para listagem/filtro estável.

Critério de aceite:
- O usuário entende que há uma área específica para lançamentos.
- O bloco chama atenção sem parecer poluído.

FASE 11 — INSTITUCIONAL CURTO E PROVA SOCIAL

Objetivo: reduzir discurso institucional e gerar confiança.

Tarefas:
- Usar copy institucional curta:
  “Imóveis certos, decisões rápidas e inteligência de mercado.”
- Texto-base:
  “A UNUS é uma empresa moderna de inteligência imobiliária que atua com os melhores imóveis prontos, em construção ou em lançamento.”
- Manter números/indicadores se existirem.
- Adicionar bloco curto de prova social, avaliações ou credibilidade.
- Se não houver avaliações reais, usar estrutura editável com conteúdo neutro, sem inventar avaliações específicas.

Critério de aceite:
- Home fala menos sobre a empresa e conduz melhor o usuário.
- Credibilidade aparece sem alongar demais a página.

FASE 12 — CTA “ANUNCIE SEU IMÓVEL”

Objetivo: criar caminho claro para captação.

Tarefas:
- Trocar bloco de avaliação por captação.
- Copy: “O seu imóvel à venda em uma Boutique Imobiliária!”
- CTA: “Anuncie seu imóvel”.
- Linkar para contato/captação.

Critério de aceite:
- Proprietário entende o caminho para anunciar.
- CTA é visualmente forte e coerente com a marca.

FASE 13 — FOOTER

Objetivo: corrigir informações e navegação final.

Tarefas:
- Reforçar unidades:
  - Campinas / São José
  - Agronômica / Florianópolis
- Adicionar telefones fixos e CRECI de ambas as unidades apenas se os dados reais existirem.
- Se não houver dados reais, deixar TODO claro sem inventar.
- Menu “Ver imóveis”:
  - Pronto para morar
  - Lançamentos e/ou em obra
  - Casas
  - Coberturas
- Avaliar ícone UNUS no rodapé em vez da logo completa.

Critério de aceite:
- Footer fica útil, completo e limpo.
- Informações incertas não são inventadas.

FASE 14 — SEO, LINKS E IMAGENS

Objetivo: melhorar URLs e mídia sem quebrar o site.

Tarefas:
- Usar slug amigável nos cards quando disponível.
- Manter fallback por código.
- Não quebrar `/imovel/[slug]`.
- Não prometer bloqueio absoluto de download de imagens.
- Se aplicar proteção leve, garantir que não prejudique UX.

Critério de aceite:
- Links continuam abrindo imóveis.
- URLs ficam melhores quando houver slug.
- Imagens continuam acessíveis e performáticas.

FASE 15 — QA FINAL

Objetivo: validar entrega.

Tarefas:
- Testar desktop, tablet e mobile.
- Validar header, hero, busca, cards, CTAs e footer.
- Validar que a Home ficou menor e mais objetiva.
- Validar que dados reais não quebram cards.
- Rodar comandos finais.

Comandos esperados:
- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Se algum comando falhar:
- Corrija a causa real.
- Não esconda erro desligando validação.
- Se houver incompatibilidade estrutural pré-existente, documente claramente.

FORMATO DA RESPOSTA FINAL

Ao terminar, responda com:

1. Resumo do que foi alterado.
2. Arquivos alterados.
3. Comandos executados e resultado.
4. Pendências reais.
5. Pontos que precisam validação visual do cliente.
6. O que foi propositalmente deixado fora do escopo, incluindo busca IA.
```

---

## 4. Prompt curto para execução direta

Use este quando o contexto já estiver carregado.

```text
Leia `docs/UNUS_HOME_IMPLEMENTATION_PLAN.md` e `docs/CODEX_GPT55_MASTER_PROMPT.md`.

Aplique a revisão da Home UNUS com foco no que o cliente percebe: design system, header, hero, busca visual inicial, CTA consultivo, coleções, cards, vitrine limitada a 6 imóveis, lançamentos, CTA “Anuncie seu imóvel”, prova social, footer e QA mobile.

A busca IA é overdelivery. Não refatore agora.

Trabalhe em mudanças pequenas. Preserve rotas, Vista API, Supabase e páginas de imóvel. Use tokens visuais. Não invente telefone, CRECI, endereço ou avaliação real. Rode lint, typecheck e build no final.
```

---

## 5. Prompt para abrir uma primeira PR menor

Use este se quiser reduzir risco e fazer uma PR inicial só com base visual e estrutura.

```text
Faça apenas a primeira PR da revisão da Home UNUS.

Escopo desta PR:
1. Ajustar design tokens em `src/styles/theme.css` para azul profundo, off-white, CTAs e preço.
2. Revisar Header com logo centralizada, “Fale com um corretor”, “Ver imóveis”, “Favoritos” e dropdown de categorias.
3. Revisar Hero com headline “Onde você mora define como você vive!” e busca visual mais minimalista.
4. Adicionar CTA consultivo próximo à busca.

Fora de escopo:
- busca IA
- Supabase
- Vista API
- refatoração completa dos cards
- footer completo
- prova social

Preserve rotas existentes. Não invente dados. Rode build/typecheck/lint se possível e entregue resumo das mudanças.
```

---

## 6. Prompt para segunda PR

```text
Faça a segunda PR da revisão da Home UNUS.

Escopo desta PR:
1. Ajustar Coleções Curadas.
2. Ajustar Imóveis com Alta Procura.
3. Refatorar cards para visual mais minimalista.
4. Remover repetição de categoria no título dos imóveis.
5. Limitar Vitrine UNUS a 6 imóveis, 3 colunas x 2 linhas no desktop.
6. Criar bloco “Para investidores / Lançamentos e em obra”.

Fora de escopo:
- busca IA
- autenticação
- Supabase
- reescrita da integração Vista

Preserve dados reais e fallbacks de imagem. Rode validações ao final.
```

---

## 7. Prompt para terceira PR

```text
Faça a terceira PR da revisão da Home UNUS.

Escopo desta PR:
1. Reduzir seção institucional.
2. Adicionar prova social curta ou bloco de credibilidade editável.
3. Trocar CTA de avaliação por “Anuncie seu imóvel”.
4. Revisar footer com unidades, menu “Ver imóveis” e placeholders claros para telefone/CRECI caso os dados reais não estejam no repositório.
5. Revisar links amigáveis dos imóveis sem quebrar fallback por código.
6. QA mobile e performance visual.

Fora de escopo:
- busca IA
- mudanças profundas na API

Não invente telefone, CRECI, endereço ou depoimento real. Rode validações ao final.
```
