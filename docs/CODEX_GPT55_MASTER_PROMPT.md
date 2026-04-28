# Prompt Mestre — GPT-5.5 / Codex para Revisão da Home UNUS

Este arquivo contém um prompt de alta precisão para usar com GPT-5.5 Thinking, Codex, Cursor, Claude Code ou outro agente de programação com acesso ao repositório.

Use este prompt quando quiser que o agente pesquise melhores práticas atualizadas, entenda o projeto, planeje a execução e implemente a revisão da home com segurança.

> Observação: se o agente tiver acesso à web, ele deve pesquisar documentação e melhores práticas atuais antes de alterar o código. Se não tiver acesso à web, ele deve declarar essa limitação e seguir apenas com análise local do repositório.

---

## Prompt recomendado

```text
Você é um engenheiro front-end sênior, designer de produto e revisor de arquitetura trabalhando no repositório `fabiohsan-dev/unus-preview-test`.

Seu objetivo é aplicar a revisão da Home do novo site UNUS com o máximo de qualidade possível, usando boas práticas atuais de desenvolvimento com Next.js, React, TypeScript, Tailwind CSS, GitHub Actions e fluxo agentic coding com Codex/GPT-5.5.

IMPORTANTE:
A busca inteligente com IA é overdelivery. Ela deve continuar funcionando, mas NÃO é o foco desta entrega. Não gaste tempo refatorando a busca IA, autenticação da busca IA ou lógica OpenAI agora, a menos que algo quebre diretamente a Home.

O foco desta entrega é:
1. Melhorar a Home.
2. Reduzir o tamanho e melhorar a retenção, principalmente no mobile.
3. Aplicar a direção visual aprovada.
4. Melhorar header, hero, busca visual inicial, cards, CTAs, footer e responsividade.
5. Preservar rotas, dados de imóveis, integração Vista API e páginas de imóvel.

ANTES DE CODAR, FAÇA ESTA ETAPA DE PESQUISA E LEITURA:

1. Pesquise na web, se houver acesso, as melhores práticas atuais para:
   - Codex/GPT-5.5 agentic coding em repositórios reais.
   - Como instruir agentes de código para fazer mudanças pequenas, testáveis e seguras.
   - Next.js 15 App Router.
   - React Server Components e Client Components.
   - Tailwind CSS 4 e design tokens.
   - GitHub Actions para CI de projetos Next.js.
   - Performance de imagens em Next.js.
   - SEO para páginas imobiliárias e URLs amigáveis.
   - UX de homepages longas no mobile.

2. Depois da pesquisa, resuma em no máximo 15 bullets quais práticas serão aplicadas neste projeto.

3. Leia os arquivos do repositório antes de alterar qualquer coisa:
   - `docs/UNUS_HOME_IMPLEMENTATION_PLAN.md`
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

4. Se algum desses arquivos não existir, procure o equivalente mais próximo antes de criar código novo.

CONTEXTO DA REVISÃO:

A revisão da Home pede uma página mais premium, minimalista e objetiva. A crítica principal é que a Home está longa demais, especialmente no mobile, e que falta conexão entre as seções. A página deve conduzir melhor o usuário para buscar imóvel, ver curadorias, ver lançamentos, falar com corretor, anunciar imóvel e chegar ao footer com informações claras.

Direção visual:
- Manter base UNUS: preto, branco e cinza.
- Trazer azul profundo e off-white como cores secundárias.
- Usar azul profundo em CTAs, botões e destaques.
- Usar off-white para transições de fundo.
- Manter aparência premium, editorial, limpa e sofisticada.
- Melhorar legibilidade de valores/preços.
- Evitar excesso de texto institucional na Home.

Nova estrutura desejada da Home:
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

REQUISITOS DETALHADOS:

A. Base técnica
- Corrija scripts de lint/typecheck/build se necessário.
- Não introduza dependências novas sem necessidade real.
- Se criar CI, faça workflow simples e confiável para install, lint, typecheck e build.
- Não desligue validações para esconder erro.

B. Design system
- Centralize mudanças visuais em `src/styles/theme.css` quando fizer sentido.
- Evite cores hardcoded repetidas.
- Defina tokens claros para:
  - azul profundo
  - off-white
  - cinzas
  - CTA primário
  - CTA secundário
  - textos de preço
- Preserve o tom premium da marca.

C. Header
- Logo centralizada.
- Lado esquerdo: “Fale com um corretor”.
- Lado direito: “Ver imóveis” e “Favoritos”.
- Dropdown em “Ver imóveis” com:
  - Pronto para morar
  - Lançamentos e/ou em obra
  - Casas
  - Coberturas
- Header mobile deve ser funcional e limpo.

D. Hero
- Headline principal: “Onde você mora define como você vive!”
- Reduzir texto secundário.
- Usar imagem principal mais adequada/premium, preservando fallback se necessário.
- Barra de busca mais minimalista, sem contorno pesado.
- Campos visuais esperados:
  - Tipo
  - Localização
  - Preço
  - Filtro avançado
  - Buscar imóvel
- Botão principal em azul profundo.
- Layout precisa funcionar bem em mobile.

E. Atendimento consultivo
- Inserir CTA próximo à busca:
  “Prefere uma curadoria personalizada? Fale com um corretor.”
- Linkar para contato, WhatsApp ou rota existente.
- Não competir demais com a busca principal.

F. Coleções curadas
- Fundo branco.
- Título pequeno: “Coleções curadas”.
- Título/subtítulo: “Imóvel ideal para a sua vida”.
- Categorias:
  - Pronto para morar
  - Lançamentos e/ou em obra
  - Casas
  - Coberturas
- Links devem apontar para filtros/listagens existentes ou URLs estáveis.

G. Imóveis com alta procura
- Fundo off-white.
- Título pequeno: “Nossa curadoria”.
- Título principal: “Imóveis com alta procura”.
- Remover texto “a partir de” dos valores.
- Testar botão/CTA em azul profundo.
- Melhorar texto final da seção.

H. Cards de imóveis
- Remover repetição de categoria no título.
  Exemplo ruim: label “Apartamento” + título “Apartamento em Campinas”.
- Exibir tipo do imóvel em label própria.
- Limpar título quando ele repetir o tipo.
- Dar mais destaque ao preço.
- Mostrar informações inferiores de forma minimalista:
  - dormitórios
  - vagas
  - m²
- Manter banheiros/suítes se já forem importantes, mas sem poluir visualmente.
- Preservar fallback para imagens.

I. Vitrine UNUS
- Título pequeno: “Vitrine UNUS”.
- Título principal: “Imóveis em Destaque”.
- Limitar a 6 imóveis.
- Desktop: 3 colunas x 2 linhas.
- Mobile: cards empilhados e página menos longa.

J. Lançamentos e em obra
- Criar bloco visualmente mais forte, diferente da vitrine comum.
- Título pequeno: “Para investidores”.
- Título principal: “Lançamentos e em obra”.
- CTA claro: “Ver lançamentos”.
- Levar para uma listagem/página/filtro estável.

K. Institucional curto
- Reduzir peso institucional da Home.
- Copy sugerida:
  “Imóveis certos, decisões rápidas e inteligência de mercado.”
- Texto-base:
  “A UNUS é uma empresa moderna de inteligência imobiliária que atua com os melhores imóveis prontos, em construção ou em lançamento.”
- Manter números/indicadores se já existirem, mas sem criar seção muito longa.

L. CTA de captação
- Trocar bloco de avaliação por “Anuncie seu imóvel”.
- Copy:
  “O seu imóvel à venda em uma Boutique Imobiliária!”
- CTA:
  “Anuncie seu imóvel”
- Linkar para contato/captação.

M. Prova social
- Inserir bloco curto de avaliações, depoimentos ou credibilidade antes do footer.
- Não transformar isso em uma seção longa.
- Se não houver dados reais, usar estrutura pronta com conteúdo neutro e facilmente editável.

N. Footer
- Reforçar duas unidades:
  - Campinas / São José
  - Agronômica / Florianópolis
- Adicionar telefones fixos e CRECI de ambas as unidades quando os dados estiverem disponíveis.
- Se os dados exatos não estiverem no repositório, deixar placeholders claros ou comentários `TODO` sem inventar informação.
- Menu “Ver imóveis”:
  - Pronto para morar
  - Lançamentos e/ou em obra
  - Casas
  - Coberturas
- Avaliar uso do ícone UNUS no rodapé em vez da logo completa.

O. SEO e links
- Usar slug amigável nos cards quando disponível.
- Manter fallback por código.
- Não quebrar `/imovel/[slug]`.
- Não quebrar links antigos.

P. Imagens
- Não prometa bloqueio absoluto de download de imagem.
- Se implementar proteção leve, use abordagem que não prejudique UX:
  - desabilitar context menu apenas em imagens de imóveis
  - overlay simples
  - watermark discreta se já houver direção visual
- Documente a limitação se criar essa feature.

Q. QA final
- Testar desktop, tablet e mobile.
- Verificar header, hero, busca, cards, CTAs e footer.
- Verificar que a Home ficou menor e mais objetiva.
- Verificar que os dados reais não quebram cards.
- Rodar build final.

FORMA DE TRABALHO:

1. Primeiro gere um plano curto de execução com os arquivos que serão alterados.
2. Depois implemente por blocos pequenos.
3. Após cada bloco, verifique rapidamente se não quebrou imports/tipos.
4. Não faça uma reescrita total se uma refatoração incremental resolver.
5. Preserve comportamento existente sempre que possível.
6. Não toque na busca IA, exceto para não quebrar a navegação.
7. Se encontrar ambiguidade de dados reais, use TODO claro em vez de inventar telefone, CRECI ou endereço.
8. No final, entregue um resumo com:
   - arquivos alterados
   - principais mudanças
   - comandos executados
   - pendências reais
   - pontos que precisam de validação visual pelo cliente

COMANDOS ESPERADOS:
- npm ci
- npm run lint
- npm run typecheck
- npm run build

Se algum comando falhar, corrija a causa real. Não oculte erro desativando validação, exceto se for uma incompatibilidade comprovada e documentada.
```

---

## Prompt curto para execução direta

Use este quando você já tiver o contexto carregado e quiser só mandar executar:

```text
Leia `docs/UNUS_HOME_IMPLEMENTATION_PLAN.md` e `docs/CODEX_GPT55_MASTER_PROMPT.md`. Aplique a revisão da Home UNUS focando no que o cliente percebe: design system, header, hero, busca visual, CTA consultivo, coleções, cards, vitrine limitada, lançamentos, CTA “Anuncie seu imóvel”, prova social, footer e QA mobile.

A busca IA é overdelivery. Não refatore agora.

Implemente em mudanças pequenas, preserve rotas/dados existentes, use tokens visuais, não invente telefone/CRECI, mantenha build estável e rode lint/typecheck/build no final.
```
