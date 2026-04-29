# UNUS — Plano de Implementação da Revisão da Home

Este documento transforma a revisão visual/estratégica da home em um plano executável para implementação no repositório.

## Contexto

A busca inteligente com IA é um overdelivery e não faz parte do caminho crítico desta entrega. O foco principal é melhorar a home, a percepção premium, a navegação, a retenção no mobile, os CTAs e a consistência visual com a revisão aprovada.

Fonte de direção: revisão da home do novo site UNUS, atualizada em 21/04.

## Objetivo principal

Refatorar a home do site UNUS para ficar mais curta, elegante, objetiva, premium e orientada à conversão.

A entrega deve priorizar:

1. Estabilidade técnica.
2. Design system alinhado à marca.
3. Home com menos seções e melhor condução.
4. Header, hero, busca, cards, CTAs e footer revisados.
5. Mobile mais enxuto e com melhor retenção.

## Fora de escopo nesta fase

- Melhorias na busca inteligente com IA.
- Troca completa de stack.
- Reescrita total da integração Vista API.
- Implementação complexa de autenticação para a busca IA.
- Novas features não citadas na revisão.

A busca IA foi removida por overdelivery e não deve ser reintroduzida nesta entrega.

---

# Prompt mestre para aplicar a revisão

Use o prompt abaixo em um agente de código, Cursor, Codex, Claude Code ou ferramenta similar.

```text
Você está trabalhando no repositório Next.js `fabiohsan-dev/unus-preview-test`, um site imobiliário premium da UNUS Núcleo Imobiliário.

Objetivo: aplicar a revisão da home do novo site UNUS, priorizando layout, conteúdo, navegação, design system, conversão e responsividade mobile. A busca inteligente com IA é overdelivery e deve permanecer fora do produto.

Stack identificada:
- Next.js 15 com App Router
- React 18
- TypeScript
- Tailwind CSS 4
- Design tokens em `src/styles/theme.css`
- Componentes em `src/components`
- Rotas em `src/app`
- Dados de imóveis via Vista API

Direção visual:
- Manter base UNUS: preto, branco e cinza.
- Trazer cores secundárias: azul profundo e off-white.
- Usar azul profundo em botões, destaques e CTAs principais.
- Usar off-white como fundo de transição entre seções.
- Manter estética premium, minimalista, editorial e elegante.
- Melhorar legibilidade dos valores/preços.
- Evitar excesso de texto institucional na home.

Direção de UX:
- A home atual está longa demais. Reduzir e reorganizar a página para melhorar retenção, especialmente no mobile.
- Criar conexão entre as seções, conduzindo o usuário de busca > curadoria > imóveis > lançamentos > atendimento/anúncio > credibilidade > footer.
- Inserir CTA intermediário para quem não quer buscar manualmente: atendimento consultivo com corretor.
- Evitar seções redundantes e excesso de conteúdo sobre a empresa.

Nova estrutura sugerida da home:
1. Header revisado.
2. Hero com headline curta + busca inicial.
3. CTA de atendimento consultivo próximo à busca.
4. Coleções curadas.
5. Imóveis com alta procura.
6. Vitrine de imóveis em destaque, limitada a 6 itens.
7. Bloco de lançamentos e em obra.
8. CTA “Anuncie seu imóvel”.
9. Prova social ou institucional curto.
10. Footer revisado.

Regras de implementação:
- Não espalhe cores hardcoded sem necessidade. Priorize tokens em `src/styles/theme.css`.
- Não quebre as rotas existentes.
- Não quebre integração com Vista API.
- Não remova funcionalidades existentes sem necessidade.
- Mantenha componentes reutilizáveis.
- Garanta responsividade mobile.
- Ao alterar cards de imóveis, evite repetir categoria no título, como “Apartamento” no label e no título ao mesmo tempo.
- Limite a vitrine principal para 6 imóveis no desktop: 3 colunas x 2 linhas.
- Melhore hierarquia visual dos cards: imagem, tipo, título limpo, localização, preço, dormitórios/vagas/m².
- Mantenha fallback para imagens quando o imóvel não tiver foto.

Tarefas principais:

1. Estabilizar base técnica:
   - Corrigir scripts de lint/typecheck/build se necessário.
   - Garantir que `npm run build` funcione.
   - Adicionar workflow de CI para PR/push, com install, lint, typecheck e build.

2. Ajustar design system:
   - Revisar tokens de cor, principalmente azul profundo, off-white, cinza e botões.
   - Padronizar CTA primário e secundário.
   - Melhorar leitura de valores/preços.

3. Header:
   - Logo centralizada.
   - Lado esquerdo: “Fale com um corretor”.
   - Lado direito: “Ver imóveis” e “Favoritos”.
   - Criar dropdown em “Ver imóveis” com:
     - Pronto para morar
     - Lançamentos e/ou em obra
     - Casas
     - Coberturas

4. Hero:
   - Usar headline: “Onde você mora define como você vive!”
   - Remover excesso de copy.
   - Ajustar imagem principal.
   - Reformular barra de busca com: Tipo + Localização + Preço + Filtro avançado + Buscar imóvel.
   - Barra mais minimalista, sem contorno pesado.
   - Botão em azul profundo.

5. CTA atendimento consultivo:
   - Inserir próximo à busca.
   - Copy sugerida: “Prefere uma curadoria personalizada? Fale com um corretor.”
   - Levar para WhatsApp/formulário/contato existente.

6. Coleções curadas:
   - Fundo branco.
   - Título: “Coleções curadas”.
   - Subtítulo: “Imóvel ideal para a sua vida”.
   - Categorias: Pronto para morar, Lançamentos e/ou em obra, Casas, Coberturas.

7. Imóveis com alta procura:
   - Fundo off-white.
   - Título pequeno: “Nossa curadoria”.
   - Título principal: “Imóveis com alta procura”.
   - Remover “a partir de” dos valores.
   - Testar CTA em azul profundo.

8. Cards de imóveis:
   - Remover repetição de categoria no título.
   - Deixar visual mais minimalista.
   - Informações inferiores: dormitórios, vagas e m².
   - Melhorar leitura de preço.

9. Vitrine:
   - Alterar seção para “Vitrine UNUS” / “Imóveis em Destaque”.
   - Limitar a 6 imóveis.
   - Desktop: 3 colunas x 2 linhas.
   - Mobile: empilhamento limpo.

10. Lançamentos e em obra:
   - Criar bloco mais forte para levar o usuário à listagem/página de lançamentos.
   - Título pequeno: “Para investidores”.
   - Título principal: “Lançamentos e em obra”.
   - CTA claro para ver lançamentos.

11. Institucional:
   - Reduzir peso institucional da home.
   - Copy sugerida: “Imóveis certos, decisões rápidas e inteligência de mercado.”
   - Texto-base: “A UNUS é uma empresa moderna de inteligência imobiliária que atua com os melhores imóveis prontos, em construção ou em lançamento.”
   - Manter números abaixo, se já existirem.

12. CTA captação:
   - Trocar bloco de avaliação por “Anuncie seu imóvel”.
   - Copy: “O seu imóvel à venda em uma Boutique Imobiliária!”
   - CTA: “Anuncie seu imóvel”.

13. Prova social:
   - Inserir avaliações/depoimentos ou bloco curto de credibilidade no final da home.
   - Não transformar em uma seção longa.

14. Footer:
   - Reforçar duas unidades:
     - Campinas / São José
     - Agronômica / Florianópolis
   - Adicionar telefones fixos e CRECI de ambas as unidades quando os dados estiverem disponíveis.
   - Ajustar menu “Ver imóveis” com:
     - Pronto para morar
     - Lançamentos e/ou em obra
     - Casas
     - Coberturas
   - Avaliar uso do ícone UNUS no rodapé em vez da logo completa, se fizer sentido visualmente.

15. SEO e links:
   - Usar slug amigável nos cards de imóveis quando disponível.
   - Manter fallback por código.
   - Não quebrar rota `/imovel/[slug]`.

16. Imagens:
   - Não prometer bloqueio absoluto de download de imagens.
   - Pode dificultar com overlay, desabilitar menu de contexto ou watermark discreta, desde que não prejudique UX.

17. QA final:
   - Testar desktop, tablet e mobile.
   - Validar home mais curta e navegável.
   - Validar que CTAs funcionam.
   - Validar que cards não quebram com dados reais.
   - Validar que build passa.

Entregue em commits pequenos e organizados, preferencialmente por bloco: design system, header/hero, seções da home, cards, footer, QA.
```

---

# Issues sugeridas

## Milestone 1 — Base técnica e direção visual

### 1. chore: estabilizar lint, typecheck e build do projeto

Prioridade: P0  
Labels: `tech-debt`, `build`, `quality`

Objetivo: garantir que o projeto esteja seguro para receber alterações sem quebrar build.

Checklist:
- Ajustar script de lint.
- Alinhar versões de Next/ESLint, se necessário.
- Criar ou revisar configuração ESLint.
- Adicionar script `typecheck`.
- Rodar build de produção.

Critério de aceite:
- `npm ci` funcionando.
- `npm run lint` funcionando.
- `npm run typecheck` funcionando.
- `npm run build` funcionando.

### 2. ci: criar workflow de validação para pull requests

Prioridade: P0  
Labels: `ci`, `quality`

Objetivo: impedir merge de código quebrado.

Checklist:
- Criar GitHub Action para PR/push.
- Rodar install, lint, typecheck e build.
- Manter separado do workflow atual de sync dos imóveis.

Critério de aceite:
- Todo PR roda validação automática.
- PR com erro de build/lint fica bloqueado.

### 3. design-system: ajustar paleta, tipografia e tokens visuais da UNUS

Prioridade: P1  
Labels: `design-system`, `ui`

Objetivo: aplicar a base visual pedida na revisão.

Checklist:
- Revisar tokens globais de cor.
- Definir azul profundo para botões/CTAs.
- Definir off-white para fundos de transição.
- Ajustar fonte primária/secundária.
- Padronizar valores/preços com fonte mais legível.

Critério de aceite:
- Botões principais usam azul profundo.
- Fundos alternam branco/off-white com contraste real.
- Preços têm leitura melhor.
- Nenhum componente usa cor solta fora do design system sem necessidade.

---

## Milestone 2 — Nova estrutura da Home

### 4. ux: reduzir e reorganizar a home para melhorar retenção

Prioridade: P1  
Labels: `ux`, `home`, `conversion`

Objetivo: resolver a crítica de página longa e pouco conduzida.

Checklist:
- Reduzir número de seções principais.
- Reorganizar a sequência da página.
- Remover excesso institucional da home.
- Inserir CTA intermediário.
- Melhorar conexão entre blocos.

Critério de aceite:
- Home fica mais objetiva.
- Mobile não fica excessivamente longo.
- Cada seção tem uma função clara: buscar, explorar, converter ou gerar confiança.

### 5. header: implementar topo centralizado com navegação revisada

Prioridade: P1  
Labels: `ui`, `navigation`, `home`

Checklist:
- Logo centralizada.
- Lado esquerdo: “Fale com um corretor”.
- Lado direito: “Ver imóveis” e “Favoritos”.
- Dropdown em “Ver imóveis”.

Critério de aceite:
- Header desktop igual à direção aprovada.
- Header mobile funcional.
- Dropdown de imóveis funcionando.

### 6. hero: refatorar frase principal, imagem e busca inicial

Prioridade: P1  
Labels: `ui`, `hero`, `search`

Checklist:
- Headline: “Onde você mora define como você vive!”
- Remover excesso de texto.
- Alterar imagem principal.
- Ajustar barra de busca.
- Botão com azul profundo.

Critério de aceite:
- Hero mais limpo.
- Busca com aparência premium.
- Boa leitura em mobile.

### 7. home: adicionar CTA de atendimento consultivo próximo à busca

Prioridade: P1  
Labels: `conversion`, `ux`, `home`

Copy sugerida:
“Prefere uma curadoria personalizada? Fale com um corretor.”

Critério de aceite:
- Usuário tem alternativa clara além de buscar.
- CTA visível no desktop e mobile.
- Conversão para atendimento facilitada.

---

## Milestone 3 — Seções comerciais da Home

### 8. home: ajustar seção Coleções Curadas

Prioridade: P2  
Labels: `home`, `ui`, `content`

Checklist:
- Fundo branco.
- Título: “Coleções curadas”.
- Subtítulo: “Imóvel ideal para a sua vida”.
- Categorias: Pronto para morar, Lançamentos e/ou em obra, Casas, Coberturas.

Critério de aceite:
- Seção visualmente limpa.
- Categorias levam para filtros/listagens corretas.
- Texto sem excesso institucional.

### 9. home: ajustar seção Imóveis com Alta Procura

Prioridade: P2  
Labels: `home`, `property-card`, `ui`

Checklist:
- Fundo off-white.
- Título pequeno: “Nossa curadoria”.
- Título principal: “Imóveis com alta procura”.
- Remover “a partir de” dos valores.
- Testar CTA em azul profundo.

Critério de aceite:
- Preço aparece como “R$ X”, não “A partir de R$ X”.
- Fundo tem contraste claro com a seção anterior.
- CTA visualmente mais forte.

### 10. property-card: refinar cards e remover repetição de categoria no título

Prioridade: P1  
Labels: `property-card`, `ui`, `data-mapping`

Checklist:
- Evitar repetir tipo do imóvel no título.
- Exibir tipo em label separada.
- Melhorar hierarquia de preço.
- Mostrar ícones de dormitórios, vagas e m².
- Padronizar card grid/lista.

Critério de aceite:
- Card não repete categoria.
- Card fica mais próximo da referência minimalista.
- Informações principais são lidas rapidamente.

### 11. home: limitar vitrine de imóveis em destaque para 6 itens

Prioridade: P2  
Labels: `home`, `performance`, `ui`

Checklist:
- Desktop com 3 colunas.
- Apenas 2 linhas.
- Total: 6 imóveis em destaque.
- Responsivo em tablet/mobile.

Critério de aceite:
- Desktop: 3 colunas x 2 linhas.
- Mobile: cards empilhados sem excesso de altura.
- Seção não alonga demais a página.

### 12. home: criar bloco de Lançamentos e Em Obra com CTA forte

Prioridade: P2  
Labels: `home`, `conversion`, `launches`

Checklist:
- Título pequeno: “Para investidores”.
- Título principal: “Lançamentos e em obra”.
- Criar card/banner mais chamativo.
- Linkar para página/listagem de lançamentos.

Critério de aceite:
- Usuário entende que há uma página/listagem específica.
- CTA claro.
- Visual diferente dos cards comuns.

---

## Milestone 4 — Institucional, CTA e Footer

### 13. content: revisar seção institucional da UNUS

Prioridade: P2  
Labels: `content`, `home`, `branding`

Copy sugerida:
“Imóveis certos, decisões rápidas e inteligência de mercado.”

Texto-base:
“A UNUS é uma empresa moderna de inteligência imobiliária que atua com os melhores imóveis prontos, em construção ou em lançamento.”

Critério de aceite:
- Seção institucional curta.
- Tom premium e direto.
- Não interrompe o fluxo comercial da home.

### 14. home: adicionar prova social ou avaliações no final da página

Prioridade: P2  
Labels: `social-proof`, `conversion`, `home`

Critério de aceite:
- Home gera mais confiança antes do footer.
- Bloco curto e objetivo.
- Boa leitura mobile.

### 15. cta: trocar bloco de avaliação por Anuncie seu Imóvel

Prioridade: P1  
Labels: `conversion`, `seller-flow`, `content`

Copy:
“O seu imóvel à venda em uma Boutique Imobiliária!”

CTA:
“Anuncie seu imóvel”

Critério de aceite:
- CTA deixa claro que é para proprietários.
- Não parece apenas uma avaliação genérica.
- Gera caminho de conversão para captação.

### 16. footer: revisar rodapé com unidades, telefones, CRECI e categorias

Prioridade: P1  
Labels: `footer`, `content`, `navigation`

Checklist:
- Reforçar duas unidades: Campinas/São José e Agronômica/Florianópolis.
- Adicionar telefones fixos.
- Adicionar CRECI de ambas as unidades.
- Ajustar texto institucional curto.
- Menu “Ver imóveis”: Pronto para morar, Lançamentos e/ou em obra, Casas, Coberturas.
- Avaliar troca da logo por ícone da UNUS no rodapé.

Critério de aceite:
- Footer tem informações comerciais completas.
- Contato e CRECI ficam fáceis de encontrar.
- Links de navegação batem com header e coleções.

---

## Milestone 5 — SEO, mídia e QA

### 17. seo: usar slugs amigáveis nos links dos imóveis

Prioridade: P2  
Labels: `seo`, `routing`

Critério de aceite:
- Cards apontam para URLs amigáveis quando possível.
- Página de detalhe abre normalmente.
- Links antigos por código continuam funcionando.

### 18. media: aplicar proteção leve para imagens dos imóveis

Prioridade: P3  
Labels: `media`, `ux`, `security`

Observação: não existe bloqueio absoluto de download de imagem no navegador. Esta issue serve apenas para dificultar ações comuns.

Checklist:
- Avaliar desabilitar menu de contexto nas imagens.
- Avaliar overlay transparente.
- Avaliar watermark discreta.
- Não prejudicar mobile e acessibilidade.

Critério de aceite:
- Usuário comum tem mais dificuldade para salvar imagem.
- UX não fica ruim.
- Limitação documentada.

### 19. qa: revisão mobile completa da home

Prioridade: P0 no final do ciclo  
Labels: `qa`, `mobile`, `ux`

Checklist:
- Testar header mobile.
- Testar hero e busca.
- Testar cards.
- Testar CTA consultivo.
- Testar footer.
- Validar espaçamento vertical.
- Validar performance percebida.

Critério de aceite:
- Página mobile mais curta e navegável.
- Sem quebras de layout.
- CTAs visíveis.
- Cards legíveis.

### 20. perf: revisar imagens, lazy loading e peso da home

Prioridade: P2  
Labels: `performance`, `images`, `home`

Critério de aceite:
- Hero carrega rápido.
- Imagens não pesam excessivamente.
- Home mantém boa performance no mobile.

---

# Ordem recomendada de execução

1. Issues 1, 2 e 3.
2. Issues 4, 5, 6 e 7.
3. Issues 8, 9, 10, 11 e 12.
4. Issues 13, 14, 15 e 16.
5. Issues 17, 18, 19 e 20.

## Regra de prioridade

Se houver pouco tempo, execute primeiro:

1. Design system.
2. Header.
3. Hero.
4. Reorganização da home.
5. Cards de imóveis.
6. CTA de atendimento consultivo.
7. CTA “Anuncie seu imóvel”.
8. Footer.
9. QA mobile.

Esses blocos entregam o maior impacto perceptível para o cliente.
