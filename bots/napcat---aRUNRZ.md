# Deploy napcat on Railway

基于 PC NTQQ 的 QQ Bot 协议端实现

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/aRUNRZ)

## About

<h4>NapCatQQ (aka 猫猫框架) 是现代化的基于 NTQQ 的 Bot 协议端实现。</h4>

<h4>猫猫框架通过魔法的手段获得了 QQ 的发送消息、接收消息等接口，为了方便使用，猫猫框架将通过一种名为 OneBot 的约定将你的 HTTP / WebSocket 请求按照规范读取，再去调用猫猫框架所获得的QQ发送接口之类的接口。</h4>
<h5>猫猫技能</h5>
- 多种启动方式：支持以无头、LiteLoader 插件、仅 QQ GUI 三种方式启动
- 低占用：无头模式占用资源极低，适合在服务器上运行
- 超多接口：在实现大部分Onebot接口上扩展了一套私有API
- WebUI：自带 WebUI 支持，远程管理更加便捷

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mlikiowa/napcat-docker | `mlikiowa/napcat-docker:v4.7.76` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/template/aRUNRZ)
