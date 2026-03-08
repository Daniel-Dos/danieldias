import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Daniel Dias',
  tagline: 'Java · Go · Rust · Distributed Systems · Open Source',
  favicon: 'img/favicon.ico',

  url: 'https://daniel-dos.github.io',
  baseUrl: '/danieldias/',

  organizationName: 'daniel-dos',
  projectName: 'danieldias',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  /* ── Google Fonts loaded via <head> tags ── */
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Nunito:wght@400;700;800&family=Fira+Code:wght@400;500&display=swap',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/daniel-dos/danieldias/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          editUrl: 'https://github.com/daniel-dos/danieldias/tree/main/',
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
    image: 'img/social-card.jpg',

    navbar: {
      title: 'Daniel Dias',
      logo: { alt: 'Daniel Dias Logo', src: 'img/logo.svg' },
      items: [
        { to: '/blog',                          label: 'Blog',     position: 'left' },
        { type: 'docSidebar', sidebarId: 'danielSidebar', label: 'About', position: 'left' },
        { href: 'https://github.com/daniel-dos', label: 'GitHub', position: 'right' },
      ],
      hideOnScroll: false,
      style: 'dark',
    },

    /* footer is fully swizzled — themeConfig footer kept minimal */
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} Daniel Dias`,
    },

    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['java', 'rust', 'go', 'bash', 'toml', 'yaml'],
    },

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
