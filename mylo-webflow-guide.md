# Guia de Adaptação MYLO para Webflow

## Estrutura Modular do Site

O site MYLO foi desenvolvido com estrutura modular específica para facilitar a reconstrução no Webflow. Cada seção pode ser criada como um bloco independente.

## Seções Principais

### 1. Header (Cabeçalho)
**Estrutura:**
- Container centralizado
- Logo MYLO centralizado
- Menu de navegação horizontal abaixo do logo
- Menu mobile com toggle (hamburger)

**Classes CSS principais:**
- `.header` - Container principal
- `.logo-container` - Wrapper do logo
- `.navigation` - Container da navegação
- `.nav-menu` - Lista do menu
- `.nav-link` - Links individuais

### 2. Hero Section (Seção Principal)
**Estrutura:**
- Grid 2 colunas (texto + imagem)
- Texto à esquerda com título, subtítulo e CTA
- Imagem à direita

**Classes CSS principais:**
- `.home-section` - Container da seção
- `.hero-banner` - Grid principal
- `.hero-content` - Conteúdo textual
- `.hero-image` - Container da imagem

### 3. Coleção (Produtos)
**Estrutura:**
- Header da seção (título + subtítulo)
- Filtros em linha horizontal
- Grid responsivo de produtos (auto-fit)

**Classes CSS principais:**
- `.colecao-section` - Container da seção
- `.filters` - Container dos filtros
- `.products-grid` - Grid de produtos
- `.product-card` - Card individual do produto

### 4. Sobre a MYLO
**Estrutura:**
- Grid 2 colunas (texto + imagem)
- Blocos de texto com efeitos hover
- Destaque especial para frase final

**Classes CSS principais:**
- `.sobre-section` - Container da seção
- `.sobre-content` - Grid principal
- `.story-block` - Blocos individuais de texto
- `.story-block.highlight` - Bloco destacado

### 5. Contato
**Estrutura:**
- Grid 2 colunas (formulário + links sociais)
- Formulário com 3 campos
- Links sociais estilizados

**Classes CSS principais:**
- `.contato-section` - Container da seção
- `.contato-content` - Grid principal
- `.form` - Formulário
- `.social-links` - Container dos links sociais

## Paleta de Cores para Webflow

```css
/* Variáveis CSS para usar no Webflow */
--bg-primary: #FAFAFA
--bg-secondary: #F9F9F9
--text-primary: #000000
--text-secondary: #4D4D4D
--accent-navy: #0A0D26
--accent-blue: #2358FF
--accent-cyan: #00CFFF
--white: #FFFFFF
```

## Tipografia

**Fonte Principal:** Inter (Google Fonts)
**Pesos utilizados:** 300, 400, 500, 600, 700, 800, 900

**Hierarquia:**
- H1: 2-3.5rem (clamp responsivo)
- H2: 1.75-2.5rem (clamp responsivo)
- H3: 1.25-1.75rem (clamp responsivo)
- Body: 1rem
- Small: 0.875-0.9rem

## Breakpoints Responsivos

- **Desktop:** 1200px+ (container max-width)
- **Tablet:** 768px-1023px
- **Mobile:** 320px-767px

## Componentes Reutilizáveis

### Botões
- `.btn` - Classe base
- `.btn-primary` - Botão principal (azul)
- `.btn-secondary` - Botão secundário (outline)

### Cards
- `.product-card` - Card de produto
- Estrutura: imagem + info + ações

### Formulários
- `.form-group` - Grupo de campo
- `.form-group input/textarea` - Campos de entrada

## Animações e Interações

### Hover Effects
- Botões: `transform: translateY(-2px)` + box-shadow
- Cards: `transform: translateY(-8px)` + box-shadow
- Links: mudança de cor + underline animado

### Scroll Animations
- Elementos aparecem com `fadeInUp`
- Parallax sutil na hero image
- Progress bar no topo da página

## Assets Incluídos

### Imagens
- `mylo-logo.png` - Logo da marca
- `home_banner_fitness.jpg` - Banner principal
- `home_banner_streetwear.jpeg` - Imagem da seção sobre
- `produto-1.jpg` a `produto-4.jpg` - Imagens dos produtos

### Funcionalidades JavaScript
- Menu mobile toggle
- Smooth scrolling
- Filtros de produtos
- Validação de formulário
- Notificações
- Scroll progress indicator

## Instruções de Implementação no Webflow

1. **Criar as seções** seguindo a estrutura modular
2. **Aplicar as classes CSS** conforme documentado
3. **Configurar responsividade** usando os breakpoints definidos
4. **Adicionar interações** baseadas nos hover effects
5. **Implementar formulário** com validação básica
6. **Configurar menu mobile** com toggle
7. **Adicionar smooth scrolling** entre seções

## Considerações Especiais

- **Mobile-first:** Sempre começar pelo design mobile
- **Performance:** Otimizar imagens antes do upload
- **SEO:** Usar estrutura semântica adequada
- **Acessibilidade:** Manter contraste e navegação por teclado

Este guia garante que a reconstrução no Webflow mantenha a fidelidade ao design original e todas as funcionalidades implementadas.

