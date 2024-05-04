# 今日超能力

## 介绍

每日刷新不同的超能力以及副作用并统计数据

## 指令

| 指令       | 用途             | 示例       | 备注             |
| ---------- | ---------------- | ---------- | ---------------- |
| 今日超能力 | 查看今日的超能力 | 今日超能力 | 可查看昨日和明日 |
| 按下       | 选择按下         | 按下       |                  |
| 不按       | 选择不按         | 不按       |                  |
| 评论       | 进行评论         | 评论 123   |                  |
| 查看评论   | 查看评论         | 查看评论   |                  |
| 点赞评论   | 点赞评论         | 点赞评论 1 |                  |
| 点踩评论   | 点踩评论         | 点踩评论 1 |                  |
| 通过评论   | 对评论进行审核   | 通过评论 1 |                  |
| 删除评论   | 对评论进行删除   | 删除评论 1 |                  |

## 注意事项

- 如果要审核评论需要有其他可以发主动消息的 Bot

## 配置文件

### config/todaySuperPower.yaml

```yaml
# 是否启用本功能
enable: false

# 可以发送主动消息的Bot信息,用于审核评论以及推送明日超能力
otherBotInfo:
  # 可以发送主动消息的Bot的QQ号,没有可以填false
  QQ: false
  # 可以发送主动消息的Bot和QQbot需要在一个群里
  group: 1234556
  # 建议将野生Bot设置为master,或者配置此项,可以发送主动消息的bot在QQBot的id
  QQBotID: 38890001385C0739E3009010448273A26F09967EB5

# 官方Bot信息,用于审核评论以及推送明日超能力
QQBotInfo:
  # 官方Bot的QQ号
  QQ: 3889000138

# 审核评论 需要可以发送主动消息的Bot
examineReviewInfo:
  # 是否启用审核评论功能
  enable: false

# 明日超能力 需要可以发送主动消息的Bot
TomorrowSuperPowerInfo:
  # 是否启用明日超能力推送功能
  enable: true
  # 什么时候进行推送
  cron: "0 30 23 * * ?"

# 启用此功能的适配器,达成条件才会开启
adapter:
  - key: "e.adapter_name"
    value: "QQBot"
  - key: "e.bot.config.markdown"
    value: true

```

## 鸣谢

- [https://willyoupressthebutton.com/](https://willyoupressthebutton.com/) 数据来源

## 效果图

### 今日超能力

![今日超能力](./image/start.png)

### 选择按下

![选择按下](./image/select.png)

### 评论

![评论](./image/review.png)

### 查看评论

![查看评论](./image/lookReview.png)

### 点赞

![点赞评论](./image/like.png)
