# Deploy soothing-eagerness on Railway

Deploy Hermes Agent on Railway with Dashboard and messaging bots.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/soothing-eagerness)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/soothing-eagerness?utm_medium=integration&utm_source=template&utm_campaign=generic)

把 [Hermes Agent](https://github.com/NousResearch/hermes-agent) 部署到 Railway 的一键模板。当前模板默认使用 `Hermes Agent v0.18.0 / v2026.7.1`，适合把 Hermes 作为长期在线的聊天机器人、Web Dashboard 或轻量工作台运行。

这个模板使用 Dockerfile 从指定 Hermes Agent tag 构建镜像，在 Railway 上运行 gateway、Dashboard 代理和状态页。模板会把 `/data/.hermes` 作为 Hermes home，建议挂载 Railway Volume 到 `/data`，这样配置、会话、技能和工作区不会在重启后丢失。模型配置通过 Railway Variables 注入，支持自定义 OpenAI 兼容接口、OpenRouter、Anthropic 和 MiniMax。

核心能力：

- Railway 一键部署，使用 Dockerfile 构建 Hermes Agent。
- 持久化 `/data/.hermes`，重启后保留 Hermes 配置、会话和运行时数据。
- 内置 Web Dashboard 代理、登录页和状态页。
- 预构建 Hermes Web UI、TUI 和浏览器终端依赖，减少冷启动时的构建工作。
- 支持 QQ Bot、企业微信 WeCom、个人微信 Weixin、Telegram、Discord、Slack 等 Hermes gateway 平台。

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-railway-template | [wsbjj/hermes-railway-template](https://github.com/wsbjj/hermes-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |
| `QQ_CLIENT_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/soothing-eagerness)
