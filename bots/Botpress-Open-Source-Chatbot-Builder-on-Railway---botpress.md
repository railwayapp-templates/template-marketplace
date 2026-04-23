# Deploy Botpress | Open-Source Chatbot Builder on Railway on Railway

Self Host Botpress. Visual chatbot builder with NLU, multi-channel & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/botpress)

## About

Deploy Botpress on Railway to self-host your own conversational AI platform with a visual flow editor, built-in NLU, and multi-channel messaging support. Self-host Botpress v12 and run Botpress on Railway with a pre-configured PostgreSQL database for production-ready persistence — no vendor lock-in, full data ownership.

This Railway template deploys two services: the Botpress application server (`botpress/server:v12_31_10`) and a Railway-managed PostgreSQL database for storing bot configurations, conversation data, and NLU models.

![Botpress Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776867189/9deb04dc-a01c-4d64-8e14-ca5f4344ce4b.png)

Botpress is an open-source chatbot and conversational AI platform often described as the "WordPress of chatbots." It provides a complete stack for building, deploying, and managing chatbots with natural language understanding, a visual conversation designer, and a modular architecture.

Key features of self-hosted Botpress include:

- **Visual Flow Editor** — drag-and-drop conversation builder with conditional branching, slot filling, and skills
- **Built-in NLU** — intent classification, entity extraction, and language detection without external services
- **Multi-Channel Support** — deploy bots to Messenger, WhatsApp, Slack, Microsoft Teams, Telegram, and custom web widgets
- **Content Management** — manage bot responses, media, and translations through a CMS interface
- **Analytics Dashboard** — track conversation metrics, user engagement, misunderstood messages, and NLU performance
- **Modular Architecture** — extend functionality through modules for broadcasting, human-in-the-loop handoff, and custom actions

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Botpress | `botpress/server:v12_31_10` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Botpress | 3000 | Internal HTTP listening port |
| `BP_HOST` | Botpress | 0.0.0.0 | HTTP bind address |
| `BPFS_STORAGE` | Botpress | database | Store bot files in PostgreSQL |
| `DATABASE_URL` | Botpress | - | PostgreSQL connection string |
| `EXTERNAL_URL` | Botpress | - | Public-facing app URL |
| `BP_PRODUCTION` | Botpress | true | Enable production mode |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/botpress/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/botpress)
