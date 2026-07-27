# Deploy LibreChat Multi Model AI on Railway

LibreChat v0.8.7 with MongoDB 8 and Meilisearch, all state on volumes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-multi-model-ai)

## About

LibreChat is the open-source, self-hosted ChatGPT alternative: one interface across OpenAI, Anthropic, Google, Azure, and any OpenAI-compatible endpoint, with multi-user accounts, conversation search, file uploads, and agents. This template deploys LibreChat v0.8.7 with MongoDB 8 for conversations and Meilisearch 1.50 for full-text search — each on its own persistent volume.

LibreChat is a three-part system and needs all three parts to behave. Conversations, users, presets, and agent definitions live in MongoDB. Message search is served by Meilisearch, which maintains its own index. Uploaded files land on the application's filesystem. A deployment that skips the volumes keeps none of it past a redeploy.

This template mounts all three: MongoDB at `/data/db`, Meilisearch at `/meili_data`, and LibreChat's uploads at `/app/uploads`. MongoDB runs with root authentication enabled rather than open on the internal network, and Meilisearch runs in production mode behind a generated master key. Neither datastore has a public domain — LibreChat reaches both over Railway's private network only.

Meilisearch binds to loopback by default, which makes it unreachable from a sibling container and is a common cause of a LibreChat deployment that starts but never returns search results; `MEILI_HTTP_ADDR` is set to `0.0.0.0:7700` here so the private-network connection works.

The four cryptographic secrets LibreChat requires — `CREDS_KEY`, `CREDS_IV`, `JWT_SECRET`, and `JWT_REFRESH_SECRET` — are generated at deploy as hex values of the exact lengths LibreChat expects. `CREDS_KEY` and `CREDS_IV` encrypt the provider API keys users store in the UI, so those two must never be rotated after people have saved keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.50.0` | Database |
| librechat | `librechat/librechat:v0.8.7` | Web service |
| mongo | `mongo:8.3.7-noble` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `JWT_SECRET` | librechat | (secret) |
| `ALLOW_EMAIL_LOGIN` | librechat | (secret) |
| `JWT_REFRESH_SECRET` | librechat | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) |

## Configuration

- **Volume:** `/meili_data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Volume:** `/data/db`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/librechat-multi-model-ai)
