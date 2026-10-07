# Deploy perplexity-ai on Railway

用你的 Perplexity 订阅额度，自建 OpenAI 兼容 API + MCP 服务，自带号池管理面板与中英文界面。

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/perplexity-ai)

## About

用你自己的 Perplexity 订阅额度，自建一套 **OpenAI 兼容 API + MCP 服务**，并自带号池管理面板。

> Self-host an OpenAI-compatible API and MCP server on top of your own Perplexity
> subscription, with a built-in multi-account pool dashboard.

本项目是 [escapeWu/perplexity-ai](https://github.com/escapeWu/perplexity-ai) 的 fork，
已针对 Railway 适配：Dockerfile 构建、`/ready` 健康检查、失败自动重启、管理面板中英文切换、
`reasoning_effort` 兼容。

部署后你会得到一个单容器服务：

- 对外提供 `/v1/models`、`/v1/chat/completions`（OpenAI 兼容）与 `/mcp`（MCP 协议）
- 浏览器打开 `/admin/` 是号池管理面板（支持中英文切换），`/playground/` 是在线调试台
- 服务监听 **8000** 端口，健康检查路径 `/ready`
- 模版已创建持久卷挂载到 `/app/data`，用于保存账号配置、日志、模型缓存与会话数据库

它不做模型推理，而是复用你浏览器登录 Perplexity 的会话 cookie，把网页版内部接口翻译成标准协议。
消耗的是订阅里的网页版额度（Pro Search、Deep Research），不是官方 API 额度。

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| perplexity-mcp | [wsbjj/perplexity-ai-railway](https://github.com/wsbjj/perplexity-ai-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MCP_TOKEN` | (secret) |
| `PPLX_ADMIN_TOKEN` | (secret) |
| `PPLX_TOKEN_POOL_CONFIG` | (secret) |
| `PPLX_LEGACY_TOKEN_POOL_CONFIG` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Python, TypeScript, Shell, Dockerfile, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/perplexity-ai)
