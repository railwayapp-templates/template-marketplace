# Deploy LobeHub (Lobe Chat) | Team AI Chat with Postgres & File Storage on Railway

LobeHub server edition: team AI chat, files, knowledge base. Zero config.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobehub-chat)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/lobehub-chat?utm_medium=integration&utm_source=button&utm_campaign=lobehub-chat)

This template deploys the server edition of [LobeHub](https://lobehub.com) (formerly Lobe Chat): a multi-user AI workspace with chat, agents, file uploads, knowledge bases and image generation, talking to any model provider you configure. Everything it needs is provisioned for you: a ParadeDB Postgres with the `pgvector` and `pg_search` extensions LobeHub requires, and a Railway Storage Bucket for uploads. Open your domain, create the first account, and start chatting.

Three resources: the `lobehub` service (official `lobehub/lobehub` image, pinned), a `postgres` service (ParadeDB, pinned) with a volume, and a `storage` bucket. A small launcher in front of the stock image waits for Postgres, generates the RS256 `JWKS_KEY` LobeHub needs and keeps it on a volume so tokens survive redeploys, and sets the CORS rule on the bucket so browser uploads via presigned URLs work out of the box. Login is LobeHub's built-in email + password (Better Auth); SSO providers can be added with the usual `AUTH_*` variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lobehub | [nomideusz/lobe-chat-railway](https://github.com/nomideusz/lobe-chat-railway) | Web service |
| postgres | `paradedb/paradedb:0.25.6-pg17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | lobehub | 3210 | Port LobeHub listens on. Do not change. |
| `APP_URL` | lobehub | - | Public URL of this deployment. Used for auth callbacks, bucket CORS and links. |
| `JWKS_KEY` | lobehub | - | Optional. RS256 JWKS JSON for OIDC token signing. Leave empty: one is generated on first boot and kept on the volume. |
| `S3_BUCKET` | lobehub | - | Railway bucket name (auto-wired). |
| `S3_REGION` | lobehub | - | Railway bucket region (auto-wired). |
| `S3_SET_ACL` | lobehub | 0 | Railway buckets are private and do not support per-object ACLs. Keep 0. |
| `AUTH_SECRET` | lobehub | (secret) | Session encryption key for Better Auth. Auto-generated. |
| `S3_ENDPOINT` | lobehub | - | Railway bucket endpoint (auto-wired). |
| `DATABASE_URL` | lobehub | - | Postgres connection over the private network. |
| `OPENAI_API_KEY` | lobehub | (secret) | Optional. Server-side OpenAI key shared by all users. Users can also add their own keys in Settings; any provider works (see LobeHub docs for the ANTHROPIC_API_KEY, GOOGLE_API_KEY, OLLAMA_PROXY_URL... names). |
| `S3_ACCESS_KEY_ID` | lobehub | - | Railway bucket access key (auto-wired). |
| `KEY_VAULTS_SECRET` | lobehub | (secret) | Encrypts API keys users store in LobeHub. Auto-generated; changing it invalidates stored keys. |
| `AUTH_ALLOWED_EMAILS` | lobehub | - | Optional. Comma-separated emails or domains allowed to sign up (e.g. you@example.com,yourcompany.com). Empty = anyone with the URL can register - set this before sharing. |
| `S3_SECRET_ACCESS_KEY` | lobehub | (secret) | Railway bucket secret key (auto-wired). |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password. |

## Configuration

- **Healthcheck:** `/api/auth/ok`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/lobehub-chat)
