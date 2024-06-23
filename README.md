# Shiranai-Plugin

🦄 **_Shiranai-Plugin是一个[Miao-Yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)&[Trss-Yunzai](https://gitee.com/TimeRainStarSky/Yunzai)&[Karin](https://github.com/KarinJS/Karin)的扩展插件，提供对Bot的一些娱乐功能，更多信息请移步[文档](https://gh.xasyer.icu/Shiranai-Plugin)。_**<img src="https://media.giphy.com/media/mGcNjsfWAjY5AEZNw6/giphy.gif" width="50">

![Nodejs](https://img.shields.io/badge/-Node.js-3C873A?style=flat&logo=Node.js&logoColor=white) 
![JavaScript](https://img.shields.io/badge/-JavaScript-eed718?style=flat&logo=javascript&logoColor=ffffff)
[![YunzaiBot](https://img.shields.io/badge/Yunzai-V3.0.0-black?style=flat&logo=dependabot)](https://gitee.com/Le-niao/Yunzai-Bot) 
[![Karin](https://img.shields.io/badge/Karin-V0.0.3-black?style=flat&logo=dependabot)](https://github.com/KarinJS/Karin) 
<div>

[![GitHub stars](https://img.shields.io/github/stars/XasYer/Shiranai-Plugin)](https://github.com/XasYer/Shiranai-Plugin/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/XasYer/Shiranai-Plugin)](https://github.com/XasYer/Shiranai-Plugin/network)
[![GitHub issues](https://img.shields.io/github/issues/XasYer/Shiranai-Plugin)](https://github.com/XasYer/Shiranai-Plugin/issues)
<div>

[![Star History Chart](https://api.star-history.com/svg?repos=XasYer/Shiranai-Plugin&type=Date)](https://star-history.com/#XasYer/Shiranai-Plugin&Date)

## [Karin](https://github.com/KarinJS/Karin)适配进度

- [x] shindan占卜
- [x] 圈小猫
- [x] 人生重开
- [x] 淫语翻译

## 安装教程 💡

请将Shiranai-Plugin放置在[Miao-Yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)或[Trss-Yunzai](https://gitee.com/TimeRainStarSky/Yunzai)的plugins目录下，重启Bot后即可使用。

1. 推荐使用git进行安装，以方便后续升级。在Yunzai目录打开终端，运行

- [Miao-Yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)&[Trss-Yunzai](https://gitee.com/TimeRainStarSky/Yunzai)使用
```sh
git clone  --depth=1 https://github.com/XasYer/Shiranai-Plugin.git ./plugins/Shiranai-Plugin
```

> <svg t="1719156492195" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8591" width="30" height="30"><path d="M512 189.44a322.56 322.56 0 1 0 0 645.12 322.56 322.56 0 0 0 0-645.12zM117.76 512a394.24 394.24 0 1 1 788.48 0 394.24 394.24 0 0 1-788.48 0z" fill="#1296db" p-id="8592"></path><path d="M476.16 574.72v-286.72h71.68v286.72H476.16zM476.16 718.08v-71.68h71.68v71.68H476.16z" fill="#1296db" p-id="8593"></path></svg>
> 如果你的网络环境较差，无法连接到 Github，可以使用 [GitHub Proxy](https://moeyy.cn/gh-proxy/) 提供的文件代理加速下载服务
>
> ```
> git clone  --depth=1 https://github.moeyy.xyz/https://github.com/XasYer/Shiranai-Plugin.git ./plugins/Shiranai-Plugin
> ```

- Karin使用
```sh
git clone  --depth=1 https://github.com/XasYer/Shiranai-Plugin.git ./plugins/karin-plugin-Shiranai
```

> <svg t="1719156492195" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8591" width="30" height="30"><path d="M512 189.44a322.56 322.56 0 1 0 0 645.12 322.56 322.56 0 0 0 0-645.12zM117.76 512a394.24 394.24 0 1 1 788.48 0 394.24 394.24 0 0 1-788.48 0z" fill="#1296db" p-id="8592"></path><path d="M476.16 574.72v-286.72h71.68v286.72H476.16zM476.16 718.08v-71.68h71.68v71.68H476.16z" fill="#1296db" p-id="8593"></path></svg>
> 如果你的网络环境较差，无法连接到 Github，可以使用 [GitHub Proxy](https://moeyy.cn/gh-proxy/) 提供的文件代理加速下载服务
>
> ```
> git clone  --depth=1 https://github.moeyy.xyz/https://github.com/XasYer/Shiranai-Plugin.git ./plugins/karin-plugin-Shiranai
> ```

2. 安装依赖(可选：不安装依赖将无法使用一些功能)

```sh
pnpm install --filter=Shiranai-Plugin
```

## 功能介绍 📖

> Shiranai-Plugin为您提供以下功能，较为刷屏建议单独创群游玩
> 
> Tip：以下只是简单描述功能具体指令请使用 **#希腊奶帮助**查看

| 命令 | 功能 | 指令&说明 |
| ----------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| 扫雷             | 顾名思义                                                                                                                  |   #扫雷 #结束扫雷                                                                              |
| 圈小猫         | 圈住小猫获得游戏胜利                                                                                        |  #圈小猫  #重置&回退抓小猫                                                          |
| 连连看         | 顾名思义                                                                                                                 |   #连连看 #结束连连看                                                                      |
| 数字游戏     | 24点  60点 72点算术                                                                                          |   #数字游戏 #24点 #60点 #72点  #算数对战                              |
| 消灭星星     | 点击图案消灭星星                                                                                                |   #消灭星星 #结束消灭星星                                                             |
| remake      | 人生重开模拟器                                                                                                    |   #remake                                                                                           |
| 占卜             | 占卜 详情id和指令可自行查看👉[url](https://shindanmaker.com)  |     #添加占卜 556031 饲养我的方法   #添加占卜 id 指令         |
| 井字棋         | 顾名思义                                                                                                                 |    #井字棋 #结束井字棋                                                                     |    
| 今日超能力 | 顾名思义                                                                                                                 |    #今日超能力 #查看评论  #点赞评论 ...                                       |
| 金币小游戏 | 顾名思义                                                                                                                 |    #金币小游戏                                                                                     |
| 淫语？？？ | 把语句变得瑟瑟                                                                                                    |    #淫语？？                                                                                          |

## 免责声明 ❗

1. 功能仅限内部交流与小范围使用，请勿将Yunzai-Bot及Shiranai-Plugin用于任何以盈利为目的的场景.
2. 图片与其他素材均来自于网络，仅供交流学习使用，如有侵权请联系，会立即删除.

### 贡献者

> 🌟星光闪烁，你们的智慧如同璀璨的夜空。感谢所有为 **Shiranai-Plugin** 做出贡献的人！

[![贡献者](https://contributors-img.web.app/image?repo=XasYer/Shiranai-Plugin)](https://github.com/XasYer/Shiranai-Plugin/graphs/contributors)

![Alt](https://repobeats.axiom.co/api/embed/3cfc3b885bc68d9a97572cafc918986e32dfde80.svg "Repobeats analytics image")

## 友情链接  Ps:  友情链接不分先后顺序 😊 ![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)
- [Karin](https://github.com/KarinJS/Karin)
- [TRSS-Yunzai](https://gitee.com/TimeRainStarSky/Yunzai)
- [Miao-Yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)
- [Yunzai-Bot插件索引](https://gitee.com/Hikari666/Yunzai-Bot-plugins-index)
- [leeenx/popstar](https://github.com/leeenx/popstar) H5小游戏100例：消灭星星
- [zhanyuzhang/link-game](https://github.com/zhanyuzhang/link-game) H5消消乐（连连看）小游戏
- [noneplugin/nonebot-plugin-shindan](https://github.com/noneplugin/nonebot-plugin-shindan) Nonebot2 趣味占卜插件
- [noneplugin/nonebot-plugin-minesweeper](https://github.com/noneplugin/nonebot-plugin-minesweeper) Nonebot2 扫雷插件
- [VickScarlet/lifeRestart](https://github.com/VickScarlet/lifeRestart) やり直すんだ。そして、次はうまくやる。
- [https://willyoupressthebutton.com/](https://willyoupressthebutton.com/) WILL YOU PRESSTHE BUTTON?
- [noneplugin/nonebot-plugin-remake](https://github.com/noneplugin/nonebot-plugin-remake) 适用于 Nonebot2 的人生重开模拟器
- [ganlvtech/phaser-catch-the-cat](https://github.com/ganlvtech/phaser-catch-the-cat) An HTML5 game 'Catch The Cat' powered by Phaser 3
- [https://shindanmaker.com/](https://shindanmaker.com/) 診断メーカーは、みんなの作った面白い診断・占いを無料であそべるサイトです。