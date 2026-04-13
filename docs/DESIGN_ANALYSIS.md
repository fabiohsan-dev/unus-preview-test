# Análise de Design e Viabilidade Técnica — UNUS

Este documento apresenta uma análise detalhada do Design System e Design Tokens do projeto UNUS, bem como a avaliação de viabilidade para replicação utilizando WordPress + Elementor.

---

## 1. Visão Geral do Design System

O projeto UNUS utiliza um Design System moderno, focado no segmento imobiliário de alto padrão. A identidade visual é caracterizada por:
- **Estética Minimalista e Sofisticada:** Grande uso de espaços em branco (negative space) e tipografia refinada.
- **Hierarquia Visual Clara:** Distinção bem definida entre títulos (Serif) e corpo de texto (Sans).
- **Componentização Robusta:** Elementos como cards de propriedades, barras de busca e seções de destaque são consistentes em toda a aplicação.

### Tipografia
- **Títulos (Headings):** Utiliza a fonte **Cormorant Garamond** (Serif), transmitindo luxo e exclusividade.
- **Corpo de Texto (Body):** Utiliza a fonte **Inter** (Sans-serif), focada em legibilidade e modernidade.
- **Labels e Botões:** Tipografia em caixa alta com espaçamento entre letras (letter-spacing) aumentado para reforçar o aspecto institucional.

### Cores (Paleta Cromática)
A paleta é baseada em tons de grafite, ciano (marca) e neutros quentes:
- **Primary (#07C2F2):** Utilizada para acentos, ícones funcionais e elementos de destaque.
- **Secondary/Graphite (#1A1A1C a #696A6C):** Cores principais para textos e superfícies escuras.
- **Neutrals (#F8F8F6):** Tons de "off-white" e cinzas muito claros para fundos, evitando o branco puro para um toque mais "premium".

---

## 2. Design Tokens

O projeto utiliza uma arquitetura de tokens bem definida em `theme.css`, o que facilita a manutenção e garante a consistência.

### Escala de Cores (Exemplos)
- `--primary-500`: `#07C2F2` (Base Cyan)
- `--secondary-900`: `#1A1A1C` (Deep Charcoal)
- `--neutral-100`: `#F2F1EE` (Ivory Linen)

### Tokens Semânticos
Os tokens mapeiam cores brutas para funções específicas:
- `--background`: `var(--neutral-50)`
- `--color-heading`: `var(--secondary-900)`
- `--color-action-whatsapp`: `#2D8B75`

### Sistema de Espaçamento (8pt Grid)
Baseado em múltiplos de 8, garantindo ritmo vertical:
- `--spacing-sm`: `16px`
- `--spacing-md`: `24px`
- `--spacing-lg`: `32px`

---

## 3. Viabilidade de Replicação (WordPress + Elementor)

**A resposta curta é: Sim, é altamente replicável.**

O design atual não utiliza formas complexas de difícil execução no Elementor. Abaixo, os detalhes de como cada parte pode ser transposta:

### Estratégia de Implementação no Elementor:

1.  **Configurações do Site (Global Styles):**
    - Configurar as Fontes Globais (Cormorant Garamond e Inter).
    - Configurar as Cores Globais no Elementor usando exatamente os códigos hexadecimais dos Design Tokens identificados.

2.  **Uso de Containers (Flexbox):**
    - A estrutura de grid do projeto (como o `PropertyCardGrid`) é facilmente recriada usando os Containers do Elementor com Flexbox ou Grid.

3.  **Componentes Dinâmicos (Loop Builder):**
    - O `PropertyCard` pode ser replicado usando o **Loop Grid** do Elementor Pro.
    - O design do card (imagem com badge sobreposto, ícones de amenities na base) é um padrão clássico do Elementor.

4.  **Complexidade da SearchBar:**
    - A `SearchBar` com filtros avançados e dropdowns personalizados é a parte mais complexa.
    - **Solução:** Utilizar plugins de filtro como **JetSmartFilters** (Crocoblock) ou **Search & Filter Pro**. Eles permitem criar exatamente a lógica de dropdowns para Cidade, Bairro e Preço com a mesma estética.

5.  **Animações (Motion):**
    - O projeto utiliza `framer-motion`. No Elementor, as "Entrada de Animação" nativas cobrem 80% do efeito. Para transições de slide como no `FeaturedCards`, o widget **Carousel** ou **Slides** do Elementor com CSS personalizado pode chegar no mesmo resultado.

### Desafios Técnicos:
- **Efeitos de "Glassmorphism":** O efeito de vidro (`backdrop-blur`) na barra de busca requer CSS personalizado simples no Elementor (propriedade `backdrop-filter: blur()`).
- **Performance:** Enquanto o projeto Next.js é extremamente rápido por natureza, a versão WordPress precisará de uma otimização rigorosa (WP Rocket, Perfmatters) para manter a mesma sensação de fluidez.

---

## 4. Conclusão

O projeto possui uma estrutura de design **limpa, lógica e baseada em padrões**, o que o torna um candidato ideal para ser transformado em um tema Elementor. A separação clara entre cores de marca, neutros e tipografia permite que o desenvolvedor WordPress configure o painel de "Estilos do Site" uma única vez e tenha o design replicado fielmente em todas as páginas.

**Recomendação:** Priorizar o uso do Elementor Pro e Containers para garantir que a responsividade e o espaçamento (baseado na grade de 8px) sejam mantidos com precisão.
