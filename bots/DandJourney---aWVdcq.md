# Deploy DandJourney on Railway

A MidJourney Wrapper named DandJourney!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aWVdcq)

## About

## 机器人创建

### 注册一个机器人

> 进入[Discord开发者平台](https://discord.com/developers/applications)
>
> 点击注册组件
> ![image](https://user-images.githubusercontent.com/56034408/234901003-c8090666-871c-4fc3-abb6-84f39b372bdb.png)

> 点击注册组件并填写信息
> 
> ![image](https://user-images.githubusercontent.com/56034408/234901557-2241bca0-2e13-4055-9e76-7c609620c69a.png)

> 点击Bot进入机器人设置页面
>
> ![image](https://user-images.githubusercontent.com/56034408/234902683-50689294-0284-4f50-a6f1-b2ba778e9245.png)

> 勾选下方的三个选项(是否允许机器人收发消息等)并获得变量 **BOT_TOKEN(String)**
>
> ![image](https://user-images.githubusercontent.com/56034408/234903012-1613a505-ddb0-47ff-a008-65cf38b339ff.png)
> ![image](https://user-images.githubusercontent.com/56034408/234903351-1cfeed6a-0fd4-44c9-b0bf-591d041f97a6.png)

> 点击OAuth2 -> URL Generator，调整设置生成链接
> 
> ![image](https://user-images.githubusercontent.com/56034408/234903554-10d48c0c-899d-4e67-adbe-540b51a756b8.png)
> ![image](https://user-images.githubusercontent.com/56034408/234918620-01c989a3-0a5f-4bb0-89f4-4f3c18cc9f25.png)

> 访问生成的链接，选择服务器，任务完成🎉

### 获得频道信息

> 进入你所需要的频道
>
> 此时url的内容为 https://discord.com/channels/ **SERVER_ID(Integer)** /  **CHANNEL_ID(Integer)**

### 氪金玩家的代号

> 使用氪金账号随便执行一条指令
>
> 在开发者工具 -> 网络 中找到最近的 **interactions** 请求，在请求标头中找到 **authorization: VIP_TOKEN(String)** 

### 自此，关于DandJourney宏观配置的**四个变量**已经收集完毕

> Tips: 需要将机器人的配置设置为如图所示，以免自带参数影响图片生成
> ![image](https://github-production-user-asset-6210df.s3.amazonaws.com/56034408/239992841-5fa33f9a-a278-4284-894b-7e173290376f.png)
---
## 机器人部署

### 部署前的准备

目前还缺失两个参数：**BOT_NAME** 和 **CHANNEL_SIGN**

> BOT_NAME ☞ 机器人的名称
>
> CHANNEL_SIGN ☞ 是否需要适应不同频道(默认为True)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DandJourney | [yuexdang/DandJourney](https://github.com/yuexdang/DandJourney) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BOT_NAME` | - | 机器人名称 |
| `BOT_TOKEN` | (secret) | 机器人的Token |
| `SERVER_ID` | - | Discord 服务器ID |
| `VIP_TOKEN` | (secret) | 具有MJ使用权限的账号Token |
| `CHANNEL_ID` | - | Discord 初始频道ID |
| `CHANNEL_SIGN` | True | 是否需要MJ跟随用户 |
| `AGENT_CHANNEL` | - | MJ消息汇总频道 |

**Category:** Bots · **Languages:** Python

[View on Railway →](https://railway.com/deploy/aWVdcq)
