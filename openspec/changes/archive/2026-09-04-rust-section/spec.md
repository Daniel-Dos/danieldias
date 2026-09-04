# Spec: Seção Dedicada de Rust no Blog

## Visão Geral

Criar uma seção dedicada para artigos sobre Rust no blog do Daniel Dias, separando o conteúdo Rust do blog principal (que contém artigos sobre Java, Apache, Golang, etc.).

## Contexto

- **Framework:** Docusaurus v3.9.2
- **Deploy:** GitHub Pages
- **Posts Rust existentes:** 2 artigos
  - `2026-02-19-my-journey-learning-rust/`
  - `2026-02-25-testing-in-rust/`
- **Tag Rust já definida:** Sim, em `blog/tags.yml`

## Análise de Opções

### Opção 1: Blog Separado via Plugin (Recomendada)

Configurar uma segunda instância do plugin `@docusaurus/plugin-content-blog` para a seção Rust.

**URL:** `/rust/*`

**Prós:**
- Separação completa de conteúdo
- RSS/Atom dedicado para Rust
- Listing page própria com paginação
- Compatível com Docusaurus nativamente
- Manages tags e categorias independentemente

**Contras:**
- Mais configuração no `docusaurus.config.ts`
- Posts ficam em diretório separado

### Opção 2: Página Customizada com Listagem

Criar uma página React que filtra posts por tag `Rust`.

**URL:** `/rust`

**Prós:**
- Simples de implementar
- Usa conteúdo existente

**Contras:**
- Não tem RSS dedicado
- Não tem listing page com paginação
- Menos robusto

### Opção 3: Docs Section com Sidebar

Mover posts Rust para a seção `docs/` com sidebar dedicada.

**URL:** `/docs/rust/*`

**Prós:**
- Organização via sidebar
- Boa para documentação/tutorial

**Contras:**
- Não é blog (sem data, autor, etc.)
- Perde funcionalidades de blog

## Recomendação

**Opção 1: Blog Separado via Plugin** é a melhor escolha por:
1. Mantém a semântica de blog (posts com data, autor, tags)
2. Fornece listing page e RSS dedicados
3. Escala bem para mais conteúdo Rust no futuro
4. Separação limpa de concerns

## Estrutura de Arquivos Proposta

```
danieldias/
├── blog/                    # Blog principal (Java, Apache, etc.)
│   ├── 2019-10-05-knowing-apache-deltaspike...
│   ├── 2020-04-14-using-apache-openwebbeans...
│   └── ...
├── blog-rust/               # NOVO: Blog Rust
│   ├── 2026-02-19-my-journey-learning-rust/
│   │   ├── index.md
│   │   └── img/
│   └── 2026-02-25-testing-in-rust/
│       ├── test-in-rust.mdx
│       └── img/
├── openspec/
└── ...
```

## Configurações Necessárias

### 1. `docusaurus.config.ts`

Adicionar segunda instância do plugin blog:

```typescript
plugins: [
  // Plugin blog principal (existente)
  [
    '@docusaurus/plugin-content-blog',
    {
      id: 'blog-main',
      routeBasePath: 'blog',
      blogTitle: 'Blog',
      blogDescription: 'Artigos sobre desenvolvimento de software',
      // ... config existente
    },
  ],
  // NOVO: Plugin blog Rust
  [
    '@docusaurus/plugin-content-blog',
    {
      id: 'blog-rust',
      routeBasePath: 'rust',
      blogTitle: 'Rust',
      blogDescription: 'Artigos sobre linguagem Rust e ecossistema',
      path: './blog-rust',
      authorsMapPath: '../blog/authors.yml',
      tags: '../blog/tags.yml',
      blogSidebarCount: 'ALL',
      blogSidebarTitle: 'Todos os posts',
      postsPerPage: 10,
      showReadingTime: true,
      remarkPlugins: [],
      rehypePlugins: [],
    },
  ],
],
```

### 2. Navbar (`docusaurus.config.ts`)

Atualizar configuração do navbar:

```typescript
navbar: {
  items: [
    { to: '/blog', label: 'Blog', position: 'left' },
    { to: '/rust', label: 'Rust', position: 'left' },  // NOVO
    { to: '/docs/about-me', label: 'About', position: 'left' },
    // ...
  ],
},
```

### 3. Mover Posts Rust

Mover os seguintes diretórios de `blog/` para `blog-rust/`:

- `blog/2026-02-19-my-journey-learning-rust/` → `blog-rust/2026-02-19-my-journey-learning-rust/`
- `blog/2026-02-25-testing-in-rust/` → `blog-rust/2026-02-25-testing-in-rust/`

### 4. Atualizar Frontmatter (opcional)

Adicionar campos `description` e `keywords` para SEO nos posts Rust:

```yaml
---
title: My Journey Learning Rust
description: Relato da minha jornada aprendendo Rust como desenvolvedor Java
keywords:
  - Rust
  - Learning Journey
  - Backend
authors: [daniel]
tags: [Rust, Backend, Learning Journey]
---
```

### 5. Criar Página Rust (opcional)

Criar `src/pages/rust.tsx` como landing page personalizada para a seção Rust:

```tsx
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function RustHero() {
  return (
    <section style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🦀 Rust</h1>
      <p>Artigos sobre desenvolvimento com Rust</p>
    </section>
  );
}

export default function Rust(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Rust" description="Artigos sobre Rust">
      <RustHero />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <p>Em breve, mais artigos sobre Rust!</p>
        <Link to="/rust/blog" className="button button--primary">
          Ver todos os artigos
        </Link>
      </main>
    </Layout>
  );
}
```

## Critérios de Aceitação

- [ ] Seção Rust acessível em `/rust`
- [ ] Listing page com todos os posts Rust
- [ ] Posts individuais funcionais com URLs corretas
- [ ] RSS/Atom dedicado para Rust (`/rust/feed.xml`)
- [ ] Navbar atualizada com link "Rust"
- [ ] Posts Rust movidos para `blog-rust/`
- [ ] Tags e authors compartilhados com blog principal
- [ ] SEO funcional (meta tags, sitemap)
- [ ] Design consistente com o restante do site
- [ ] Sem quebrar links existentes

## Footer

- **Autor:** Daniel Dias
- **Data:** 2026-09-04
- **Status:** Proposta
