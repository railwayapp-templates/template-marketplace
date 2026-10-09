# Deploy ai-front-desk-template on Railway

AI receptionist that answers, texts back, books and invoices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-front-desk-template)

## About

AI Front Desk is a self-hosted AI receptionist and front office for service businesses. Ava answers the phone, texts back missed calls, books appointments, sends review requests, runs follow-ups, and invoices through Stripe. It is multi-tenant, so one deployment can serve many businesses, and every outbound channel is off until you turn it on.

This template deploys four services: the `app` (API, owner dashboard, scheduler, and the SMS, call, follow-up, review, campaign, billing, and support desks), the `relay` (a Twilio ConversationRelay WebSocket bridge for live voice, built from the `voice-relay/` directory of the same repository), a Postgres database (Prisma migrations run automatically before each start), and Redis (BullMQ queues and rate limits). All internal secrets are generated at deploy time. The app boots with only an Anthropic key and keeps each desk dark with HTTP 503 until that desk's provider key is present, so nothing sends, calls, or charges by accident. Per-provider and per-tenant daily spend ceilings are enforced by the built-in model router.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [LeadGenius1/ai-offices-os](https://github.com/LeadGenius1/ai-offices-os) | Web service |
| Redis | `redis:8.2` | Database |
| relay | [LeadGenius1/ai-offices-os](https://github.com/LeadGenius1/ai-offices-os) (root: voice-relay) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `JWT_SECRET` | app | (secret) |
| `BREAKER_HOOK_SECRET` | app | (secret) |
| `AVA_VOICE_RELAY_TOKEN` | app | (secret) |
| `CAMPAIGN_UNSUB_SECRET` | app | (secret) |
| `ROUTER_INTERNAL_SECRET` | app | (secret) |
| `AIOFFICES_OVERSIGHT_TOKEN` | app | (secret) |
| `AIOFFICES_INTERNAL_OPS_TOKEN` | app | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `AVA_VOICE_RELAY_TOKEN` | relay | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** JavaScript, HTML, Shell, PLpgSQL

[View on Railway →](https://railway.com/deploy/ai-front-desk-template)
