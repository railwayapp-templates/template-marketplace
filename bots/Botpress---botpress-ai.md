# Deploy Botpress on Railway

Build chatbots with a visual flow editor and built-in NLU

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/botpress-ai)

## About

Botpress is an open-source platform for building and running chatbots. A visual flow editor, a natural language understanding engine, a content manager and a webchat widget ship in one server, so a designer can draw a dialogue while a developer drops into JavaScript where it is needed. This is Botpress v12, the AGPL-licensed self-hostable server — your intents, conversations and transcripts stay in a database you own.

Deploy Botpress on Railway and the stack arrives wired together: the Botpress Server with the Duckling entity extractor beside it, a private Language Server holding the word embeddings the NLU engine needs, and PostgreSQL. Browser traffic reaches only the Botpress Server, which talks to the Language Server privately and writes every bot, conversation and message to Postgres. Nothing calls out to a hosted service, so you can self-host Botpress without chat data leaving the project.

![Botpress, its language server and Postgres on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787699990/botpress-architecture.png)

Most chatbot builders are hosted products: training data, transcripts and customer messages live on someone else's infrastructure, and pricing scales with volume. Botpress v12 inverts that — models, flows and message history run in containers you control. Teams reach for it when conversations carry personal data or when per-message pricing stops making sense.

Key capabilities:

- **Visual flow editor** with nodes, transitions, skills and sub-flows
- **On-premise NLU** — intents, entities, slot filling and spell-checking, with no external API call per message
- **Content management** for text, images, cards and carousels, separate from flow logic
- **Channels** for webchat, Messenger, Slack, Teams, Telegram and Twilio SMS, plus human handoff and analytics

This template runs the shape Botpress documents for production. The **Botpress Server** serves the admin panel, the Studio, the webchat and the messaging API, with **Duckling** — which extracts dates, amounts, emails and phone numbers — beside it. The **Language Server** is separate because it is the memory-hungry part: it holds the word embeddings and serves vectors privately. **PostgreSQL** stores bots, users, conversations, messages and trained models.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| botpress | [gridalpha/botpress-railway](https://github.com/gridalpha/botpress-railway) | Web service |
| botpress-lang | [gridalpha/botpress-railway](https://github.com/gridalpha/botpress-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | botpress | 3000 | HTTP port Botpress listens on |
| `AUTO_MIGRATE` | botpress | true | Auto-apply data migrations on upgrade |
| `BPFS_STORAGE` | botpress | database | Store bot files in Postgres |
| `DATABASE_URL` | botpress | - | Postgres connection string |
| `EXTERNAL_URL` | botpress | - | Public base URL |
| `BP_PRODUCTION` | botpress | true | Production mode |
| `REVERSE_PROXY` | botpress | 0.0.0.0/1,128.0.0.0/1,::/1,8000::/1 | Trusted proxies, never "true" |
| `BP_ADMIN_EMAIL` | botpress | admin@example.com | First super admin, change before deploying |
| `BP_LANG_ENDPOINT` | botpress | - | Language server address |
| `BP_ADMIN_PASSWORD` | botpress | (secret) | First super admin password |
| `BP_CONFIG_SENDUSAGESTATS` | botpress | false | Opt out of upstream telemetry |
| `PORT` | botpress-lang | 3100 | HTTP port the language server listens on |
| `BP_LANG_DIM` | botpress-lang | 100 | Embedding dimensions: 25, 100 or 300 |
| `BP_LANG_DIR` | botpress-lang | /botpress/lang | Volume path for embeddings |
| `BP_LANG_PRELOAD` | botpress-lang | en | Languages downloaded at first boot |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/botpress/data`
- **Healthcheck:** `/info`
- **Volume:** `/botpress/lang`

**Category:** Bots · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/botpress-ai)
