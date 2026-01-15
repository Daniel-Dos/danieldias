import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: ' ',
  tagline: ' ',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://daniel-dos.github.io',
  baseUrl: '/danieldias/',

  organizationName: 'daniel-dos',
  projectName: 'danieldias',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  /* =======================
     MERMAID (OFICIAL)
     ======================= */
  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 20,
          readingTime: ({content, locale, defaultReadingTime}) =>
            defaultReadingTime({
              content,
              locale,
              options: {wordsPerMinute: 300},
            }),
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content:
          'danieldiasjava, blog, programming, java, developer, coding, tech, software, tutorials, tips, web development, daniel dias, danieldias.dev, software engineer, software developer, software architect',
      },
    ],

    headTags: [
      {
        tagName: 'link',
        attributes: {
          rel: 'preconnect',
          href: 'https://daniel-dos.github.io/danieldias/',
        },
      },
      {
        tagName: 'script',
        attributes: {
          type: 'application/ld+json',
        },
        innerHTML: JSON.stringify({
          '@context': 'https://daniel-dos.github.io/danieldias/',
          '@type': 'personalWebsite',
          name: 'danieldias.dev',
          url: 'https://daniel-dos.github.io/danieldias/',
          logo: 'https://daniel-dos.github.io/danieldias/img/logo.svg',
        }),
      },
    ],

    image: 'img/docusaurus-social-card.jpg',

    /* =======================
       MERMAID THEME CONFIG
       ======================= */
    mermaid: {
      theme: {
        light: 'default',
        dark: 'dark',
      },
    },

    navbar: {
      title: 'danieldias.dev',
      logo: {
        alt: 'danieldias.dev Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'danielSidebar',
          position: 'left',
          label: 'About Me',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/Daniel-Dos/danieldias',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {label: 'Blog', to: '/blog'},
            {
              label: 'GitHub',
              href: 'https://github.com/daniel-dos',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} danieldias.dev. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['go', 'java', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
