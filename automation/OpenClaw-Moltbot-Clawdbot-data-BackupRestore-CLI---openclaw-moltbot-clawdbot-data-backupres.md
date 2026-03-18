# Deploy OpenClaw (Moltbot, Clawdbot) + data Backup/Restore + CLI on Railway

OpenClaw (Moltbot, Clawdbot) + data Backup/Restore with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-moltbot-clawdbot-data-backupres)

## About

OpenClaw is an open-source personal AI assistant platform that runs on your own infrastructure. It supports multi-channel chat (WhatsApp, Telegram, Slack, Discord, and more), 50+ built-in agent skills, persistent memory with embeddings, and extensible plugin architecture. This template deploys a durable instance with automatic S3-backed backup and disaster recovery.

This template deploys OpenClaw as a single service with:

- **AI Gateway**: Multi-channel agent runtime with Control UI
- **50+ Skills**: Built-in agent skills for GitHub, Slack, coding, and more
- **Memory Plugin**: Persistent memory with search and embeddings (SQLite-backed)
- **S3 Backup**: Automatic state sync to a Railway Bucket every 5 minutes
- **Disaster Recovery**: Fresh deploys auto-restore from the last backup
- **Local Sync**: Download your backup locally with any S3-compatible CLI

Railway volumes persist your state across redeployments. The attached Railway Bucket provides an additional layer of durability — if the volume is ever lost, the service auto-restores from the bucket on next boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [nick0lay/openclaw](https://github.com/nick0lay/openclaw) (branch: railway-deployment) (root: /railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BUCKET` | - | Backup bucket. |
| `REGION` | - | Backup bucket region. |
| `ENDPOINT` | - | Backup bucket endpoint. |
| `ACCESS_KEY_ID` | - | Backup bucket access key. |
| `BACKUP_ENABLED` | true | Enable automatic state backup to Railway Bucket (true/false, default: true). |
| `OPENAI_API_KEY` | (secret) | API key from https://platform.openai.com. Enables memory embeddings (vector search over past conversations). Also allows using OpenAI models as an alternative AI provider. |
| `BACKUP_S3_PREFIX` | - | Key prefix inside the bucket (default: openclaw-state). |
| `ANTHROPIC_API_KEY` | (secret) | API key from https://console.anthropic.com. Required for the agent to respond to messages. |
| `SECRET_ACCESS_KEY` | (secret) | Backup bucket secret access key. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | - |
| `BACKUP_INTERVAL_SEC` | 300 | Seconds between backup cycles (default: 300). |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Random 64-char string, clients send it in connection handshake. |
| `OPENCLAW_GATEWAY_PASSWORD` | (secret) | Human-memorable password, entered in Control UI login. |
| `OPENCLAW_GATEWAY_ALLOW_REMOTE_CONTROL_UI` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, Swift, Kotlin, Shell, CSS, JavaScript, Go, Python, HTML, Dockerfile, Ruby

[View on Railway →](https://railway.com/deploy/openclaw-moltbot-clawdbot-data-backupres)
