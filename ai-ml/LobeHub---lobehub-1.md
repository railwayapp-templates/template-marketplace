# Deploy LobeHub on Railway

LobeHub, formerly LobeChat: AI chat and agents with Postgres and storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobehub-1)

## About

[LobeHub](https://github.com/lobehub/lobehub) is an open-source AI chat and agent workspace: one interface for OpenAI, Anthropic, Google, OpenRouter, Ollama and many other providers, with agents, knowledge bases and file uploads. This template runs the server-database edition, where your chats, agents and settings live in your own Postgres and sync across devices.

The deploy form asks for one thing: your email address. Only that address, or the addresses and domains you list there separated by commas, can create an account, so a stranger who finds your URL can't sign up. When the deploy finishes, open `LOBEHUB_URL` from the Variables tab of the lobehub service, sign up with that email and add your provider keys in LobeHub's settings. Keys saved there are encrypted with `KEY_VAULTS_SECRET`.

The template has three services: LobeHub itself on the official image, Postgres on ParadeDB (Postgres 17 with pgvector and pg_search, the image LobeHub's own compose file uses) and RustFS for uploaded files.

I started with a Railway Bucket for the files. LobeHub uploads from the browser straight to storage through signed links, which needs a CORS rule on the bucket, and Railway Buckets don't keep one: the API accepts the rule and stores nothing. RustFS does keep it, so this template uses RustFS, as LobeHub's compose file does. The bucket stays private. LobeHub shows files through signed links that expire, and anonymous requests get a 403.

LobeHub signs its internal service calls, file parsing for example, with an RSA key in `JWKS_KEY`, and those calls fail without it. A Railway template can't generate an RSA key, so a small start script creates one on first boot, stores it in the private bucket and reads it back on every restart. If you set `JWKS_KEY` yourself, yours is used.

Before publishing I ran the template end to end. Signing up with a different email was refused with `EMAIL_NOT_ALLOWED` and signing up with the allowed one worked. An upload through a signed link passed the browser's CORS check and landed in the bucket, and LobeHub parsed the file into chunks, which is the path that needs `JWKS_KEY`. A chat through OpenRouter answered. After a restart the account and the file were still there and the same signing key was reused.

The logs warn that `QSTASH_TOKEN` isn't set. That's Upstash's hosted queue, which LobeHub uses to create scheduled jobs; without it those are skipped, and chat, uploads and file parsing all worked in my test.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `paradedb/paradedb:latest-pg17` | Database |
| rustfs | `rustfs/rustfs:latest` | Web service |
| lobehub | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /lobehub) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | lobehub | Database name |
| `DATABASE_URL` | Postgres | - | Private connection string used by LobeHub |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |
| `PORT` | rustfs | 9000 | S3 API port (browsers upload here through signed links) |
| `RUSTFS_ADDRESS` | rustfs | [::]:9000 | Listen on IPv6 too, for Railway's private network |
| `RUSTFS_ACCESS_KEY` | rustfs | - | S3 access key (generated) |
| `RUSTFS_SECRET_KEY` | rustfs | (secret) | S3 secret key (generated) |
| `RUSTFS_CONSOLE_ENABLE` | rustfs | false | Admin console off |
| `PORT` | lobehub | 3210 | Port of the LobeHub web app |
| `APP_URL` | lobehub | - | Public URL LobeHub uses for logins and links |
| `S3_BUCKET` | lobehub | lobehub | Bucket for uploaded files (created on first start) |
| `S3_REGION` | lobehub | us-east-1 | Region name used for request signing |
| `S3_SET_ACL` | lobehub | 0 | The bucket is private; files are shown through short-lived signed links |
| `AUTH_SECRET` | lobehub | (secret) | Signs login sessions (generated) |
| `LOBEHUB_URL` | lobehub | - | Open this and sign up with the email address above |
| `S3_ENDPOINT` | lobehub | - | Public RustFS address; browsers upload and load files here with signed links |
| `DATABASE_URL` | lobehub | - | ParadeDB Postgres over the private network |
| `INTERNAL_APP_URL` | lobehub | http://localhost:3210 | How LobeHub calls itself inside the container |
| `S3_ACCESS_KEY_ID` | lobehub | - | RustFS access key |
| `KEY_VAULTS_SECRET` | lobehub | (secret) | Encrypts the API keys users save in LobeHub (generated). Keep it |
| `AUTH_ALLOWED_EMAILS` | lobehub | - | Your email address. Only the addresses or domains listed here (comma-separated) can create an account |
| `S3_ENABLE_PATH_STYLE` | lobehub | 1 | RustFS uses path-style URLs |
| `S3_INTERNAL_ENDPOINT` | lobehub | - | LobeHub's own S3 calls stay on the private network |
| `S3_SECRET_ACCESS_KEY` | lobehub | (secret) | RustFS secret key |
| `LLM_VISION_IMAGE_USE_BASE64` | lobehub | 1 | Send images to models as data, not as links |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'mkdir -p /data && exec rustfs /data'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/signin`

**Category:** AI/ML · **Tags:** lobehub, lobechat, ai-chat, chatgpt, agents, postgres · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/lobehub-1)
