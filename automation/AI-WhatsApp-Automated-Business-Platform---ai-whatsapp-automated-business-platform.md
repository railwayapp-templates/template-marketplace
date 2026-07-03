# Deploy AI WhatsApp Automated Business Platform on Railway

AI WhatsApp CRM , Grok or OpenAI Based Templates , Faster approval 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-whatsapp-automated-business-platform)

## About

Self-hosted AI WhatsApp platform for cab rental, fleet owners, and small businesses. Send campaigns, manage a two-way inbox, run RAG smart replies from your PDF rate card, and automate fare quotes with Google Maps — all from a React dashboard. **No manual URL wiring:** Postgres, Redis, backend API URL, and dashboard are connected automatically.

**Demo:** [YouTube — Auto Quote Bot in 35 seconds](https://www.youtube.com/shorts/rQkfJ3N8zoc)

This template deploys four services: **Postgres**, **Redis**, **backend** (Node.js API + Twilio webhooks), and **dashboard** (React UI). Secrets (`JWT_SECRET`, `ADMIN_PASSWORD`) are auto-generated. You only need to set your **admin email** at deploy time — everything else can be configured in-app.

Twilio credentials, Grok/OpenAI keys, and Google Maps are optional at deploy and can be added later in **Settings** without redeploying.

**Estimated Railway cost:** ~$12–20/month for a 24/7 production stack (Postgres + Redis + 2 app services).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| whatsapp-business-deploy | [Ankitgelda8/whatsapp-business-deploy](https://github.com/Ankitgelda8/whatsapp-business-deploy) (root: backend) | Worker |
| whatsapp-business-deploy-7i7a | [Ankitgelda8/whatsapp-business-deploy](https://github.com/Ankitgelda8/whatsapp-business-deploy) (root: dashboard) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `JWT_SECRET` | whatsapp-business-deploy | (secret) |
| `ADMIN_EMAIL` | whatsapp-business-deploy | admin123@admin.com |
| `ADMIN_PASSWORD` | whatsapp-business-deploy | (secret) |
| `JWT_SECRET` | whatsapp-business-deploy-7i7a | (secret) |
| `ADMIN_EMAIL` | whatsapp-business-deploy-7i7a | admin123@admin.com |
| `ADMIN_PASSWORD` | whatsapp-business-deploy-7i7a | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ai-whatsapp-automated-business-platform)
