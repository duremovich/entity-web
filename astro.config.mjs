// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://entitymedia.art',
  trailingSlash: 'always',
  devToolbar: { enabled: false },

  integrations: [
    starlight({
      title: 'entity',
      description:
        'Frame-accurate playback and projection mapping. Open-core. Built for live shows.',
      logo: {
        src: './src/assets/mark.svg',
        replacesTitle: false,
        alt: 'entity mark',
      },
      favicon: '/brand/svg/mark.svg',
      // Show "Last updated" on docs pages — a low-effort "actively
      // maintained" signal. Reads each file's last git commit date.
      lastUpdated: true,
      head: [
        {
          tag: 'link',
          attrs: { rel: 'manifest', href: '/site.webmanifest' },
        },
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#1f0a35' },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://entitymedia.art/brand/png/social/og-1200x630.png',
          },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: 'https://entitymedia.art/brand/png/social/og-1200x630.png',
          },
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/duremovich/Entity',
        },
      ],
      customCss: ['./src/styles/global.css'],
      components: {
        // Force dark mode — brand canvas is #1f0a35; light mode is off-brand.
        ThemeSelect: './src/components/EmptyThemeSelect.astro',
        // Unity-docs-style sidebar — group labels are clickable links
        // to the section landing page; caret still toggles open/closed.
        // Sidebar wraps our custom SidebarSublist (Starlight only
        // exposes Sidebar, not the Sublist, as overridable).
        Sidebar: './src/components/Sidebar.astro',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [{ autogenerate: { directory: 'docs/getting-started' } }],
        },
        {
          label: 'Concepts',
          items: [{ autogenerate: { directory: 'docs/concepts' } }],
        },
        {
          label: 'Media',
          items: [{ autogenerate: { directory: 'docs/media' } }],
        },
        {
          label: 'Projection',
          items: [{ autogenerate: { directory: 'docs/projection' } }],
        },
        {
          label: 'Control',
          items: [{ autogenerate: { directory: 'docs/control' } }],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'docs/reference' } }],
        },
        {
          label: 'Troubleshooting',
          items: [{ autogenerate: { directory: 'docs/troubleshooting' } }],
        },
        {
          label: 'About',
          items: [
            { label: 'FAQ', link: '/docs/faq/' },
          ],
        },
      ],
    }),
    sitemap(),
  ],
});
