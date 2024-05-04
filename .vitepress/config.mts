import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shiranai-Plugin",
  description: "希腊奶文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: 'https://github.com/XasYer/Shiranai-Plugin/tree/docs/:path',
      text: '编辑此页面'
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '简介', link: '/intro/start/' },
      { text: '功能', link: '/feature/linkGame/' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: '简介',
        items: [
          { text: '快速开始', link: '/intro/start/' },
          { text: '关于插件', link: '/intro/about/' }
        ]
      },
      {
        text: '功能',
        items: [
          { text: '连连看', link: '/feature/linkGame/' },
          { text: '扫雷', link: '/feature/minesweeper/' },
          { text: '消灭星星', link: '/feature/popstar/' },
          { text: '人生重开', link: '/feature/remake/' },
          { text: '今日超能力', link: '/feature/todaySuperPower/' },
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
