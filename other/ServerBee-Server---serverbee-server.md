# Deploy ServerBee Server on Railway

Self-hosted VPS monitoring with real-time dashboard, alerts & web terminal

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/serverbee-server)

## About

ServerBee is a lightweight, self-hosted VPS monitoring system built with Rust and React. It receives
real-time metrics from distributed agents over WebSocket, stores data in SQLite, and serves a modern
dashboard with alerts, web terminal, and Docker monitoring.

Hosting ServerBee Server on Railway requires minimal configuration. Deploy the template, set an admin
password, and attach a persistent volume at `/data` for SQLite storage. The server starts in seconds and
is ready to accept agent connections over WebSocket. Railway provides automatic HTTPS and port
assignment, so no TLS or reverse proxy setup is needed. Install lightweight agents on your VPS
instances, point them to the Railway URL with a discovery key, and start monitoring immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ServerBee | [ZingerLittleBee/ServerBee](https://github.com/ZingerLittleBee/ServerBee) (root: /deploy/railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SERVERBEE_LOG__LEVEL` | info | 日志级别（trace/debug/info/warn/error） |
| `SERVERBEE_ADMIN__PASSWORD` | (secret) | 管理员密码（未填写自动生成 admin 用户，可在日志中查看） |
| `SERVERBEE_ADMIN__USERNAME` | (secret) | 管理员用户名（未填写自动生成 admin 用户，可在日志中查看） |
| `SERVERBEE_OAUTH__BASE_URL` | - | OAuth 回调公网地址（如 https://xxx.up.railway.app） |
| `SERVERBEE_SCHEDULER__TIMEZONE` | UTC | 时区，影响流量按天聚合（如 Asia/Shanghai） |
| `SERVERBEE_RETENTION__RECORDS_DAYS` | 7 | 原始指标保留天数 |
| `SERVERBEE_AUTH__AUTO_DISCOVERY_KEY` | - | 自动发现密钥（未填写自动生成，可在日志中查看） |
| `SERVERBEE_OAUTH__GITHUB__CLIENT_ID` | - | GitHub OAuth Client ID |
| `SERVERBEE_OAUTH__ALLOW_REGISTRATION` | false | 首次登录自动创建账号（true=开放注册，false=仅已绑定用户可登录） |
| `SERVERBEE_RETENTION__AUDIT_LOGS_DAYS` | 180 | 审计日志保留天数 |
| `SERVERBEE_OAUTH__GITHUB__CLIENT_SECRET` | (secret) | GitHub OAuth Client Secret |
| `SERVERBEE_RETENTION__RECORDS_HOURLY_DAYS` | 90 | 小时聚合保留天数 |
| `SERVERBEE_RETENTION__SERVICE_MONITOR_DAYS` | 30 | 服务监控保留天数 |

**Category:** Other · **Languages:** Rust, TypeScript, MDX, CSS, Shell, Dockerfile, Makefile, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/serverbee-server)
