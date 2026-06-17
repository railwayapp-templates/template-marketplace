# Deploy 设备事件记录 Device Event Logger on Railway

记录用户设备事件的 API 端点，支持通过 MCP 查询。

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clone)

## About

记录用户设备事件的 API 端点，支持通过 MCP 查询，可接入 Claude.ai / Claude Code / 任意支持 MCP 的平台。一次配置后台运行，个人使用免费额度足够。支持自定义事件类型，自定义程度高。

> 部署后请在环境变量处设置 API_KEY！这将作为你上传事件的鉴权字段。

GitHub 开源仓库：https://github.com/Tosd0/device-event-logger

教程见小红书：@o.ot

点击部署即可

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| device-event-logger | [tosd0/device-event-logger](https://github.com/tosd0/device-event-logger) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `API_KEY` | device-event-logger | (secret) | 必填，相当于密码，请设置为随机字符串并记下 |
| `TZ_OFFSET` | device-event-logger | 480 | 通常不用改，时区偏移，默认480（UTC+8时区），单位分钟 |
| `DATABASE_URL` | device-event-logger | - | 不用外部数据库的话不用改 |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `deno task start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/clone)
