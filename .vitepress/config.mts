import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shiranai-Plugin",
  description: "希腊奶文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: 'https://github.com/XasYer/ws-plugin-docs/tree/docs/:path',
      text: '编辑此页面'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '快速开始', link: '/start' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/XasYer/Shiranai-Plugin' }
    ],
  },
  cleanUrls: true,
  base: '/Shiranai-Plugin/'
})
