# Deploy LibreChat | Stable Release, Working Schedules, Uploads in a Bucket on Railway

Self-host LibreChat on Railway — stable release, uploads in a Bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-or-stable-release-working-sche)

## About

LibreChat, the open-source chat interface for OpenAI, Anthropic, Google and other models, self-hosted on its stable release with MongoDB, Meilisearch and a Railway Bucket for uploads. Every image is pinned.

Nothing to fill in. Open the domain, create the first account, and add your model keys in the chat settings.

Four pieces, wired the way LibreChat's own compose file does it, adapted for this platform:

- **LibreChat** `v0.8.7`, the stable release rather than the nightly `librechat-dev:latest` build (public)
- **MongoDB 8.0**: accounts, conversations and settings, on its own volume, with authentication
- **Meilisearch**: full-text search across your conversations, on its own volume
- **Bucket**: Railway object storage for avatars, images and files you upload

Model keys are entered per user in the chat, so one deployment can serve a team where everyone brings their own key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Meilisearch | `getmeili/meilisearch:v1.35.1` | Database |
| MongoDB | `mongo:8.0.20` | Database |
| LibreChat | `ghcr.io/danny-avila/librechat:v0.8.7` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MEILI_ENV` | Meilisearch | production |
| `MEILI_DB_PATH` | Meilisearch | /meili_data/data.ms |
| `MEILI_HTTP_ADDR` | Meilisearch | [::]:7700 |
| `MEILI_NO_ANALYTICS` | Meilisearch | true |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |
| `HOST` | LibreChat | 0.0.0.0 |
| `PORT` | LibreChat | 3080 |
| `SEARCH` | LibreChat | true |
| `NODE_ENV` | LibreChat | production |
| `ENDPOINTS` | LibreChat | openAI,anthropic,google,agents |
| `GOOGLE_KEY` | LibreChat | user_provided |
| `JWT_SECRET` | LibreChat | (secret) |
| `CONFIG_PATH` | LibreChat | https://raw.githubusercontent.com/ak40u/librechat-railway-starter/972b2f14e02fe328022ffdbb79970027bce88c88/librechat.yaml |
| `OPENAI_API_KEY` | LibreChat | (secret) |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) |
| `ALLOW_REGISTRATION` | LibreChat | true |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) |
| `MEILI_NO_ANALYTICS` | LibreChat | true |
| `AWS_SECRET_ACCESS_KEY` | LibreChat | (secret) |
| `SCHEDULES_SINGLE_PROCESS` | LibreChat | true |

## Configuration

- **Volume:** `/meili_data`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "until nc -z $MONGO_HOST 27017 && nc -z $MEILI_HOSTNAME 7700; do sleep 2; done; exec npm run backend"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/librechat-or-stable-release-working-sche)
