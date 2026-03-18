# Deploy Wechat2RSS on Railway

Wechat2RSS 提供长期稳定可用的微信公众号RSS服务

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/KIQWgJ)

## About

Wechat2RSS 提供长期稳定可用的微信公众号RSS服务

- 全功能本地实现，保护隐私
- 不限数量订阅
- 平均6小时，低时延订阅更新
- 适配多种文章格式的全文输出
- 支持图片、音频、视频代理
- 公众号迁移自动跟随
- 服务异常通知

参考文档 https://wechat2rss.xlab.app/deploy/

https://wechat2rss.xlab.app/deploy/
https://wechat2rss.xlab.app/deploy/
https://wechat2rss.xlab.app/deploy/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Wechat2RSS | [ttttmr/Wechat2RSS](https://github.com/ttttmr/Wechat2RSS) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Asia/Shanghai | - |
| `PORT` | 8080 | - |
| `LIC_CODE` | - | 激活码 |
| `LIC_EMAIL` | - | 激活邮箱 |
| `RSS_HTTPS` | 1 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/wechat2rss`

**Category:** Other · **Languages:** JavaScript, TypeScript, Shell

[View on Railway →](https://railway.com/template/KIQWgJ)
