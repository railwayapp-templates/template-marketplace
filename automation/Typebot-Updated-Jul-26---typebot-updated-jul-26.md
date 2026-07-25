# Deploy Typebot [Updated Jul '26] on Railway

Typebot [Jul '26] (Visual Chatbot Builder & Conversational AI) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typebot-updated-jul-26)

## About

Typebot is an open-source visual chatbot builder that lets you design conversational flows without writing code. It replaces Intercom, Drift, and Chatfuel with a self-hosted stack you fully own - your bot flows, your customer conversations, your data. This template deploys the whole thing on Railway: builder, viewer, database, and file storage, wired together and ready to use in a few minutes.

Here's the math that makes self-hosting worth it: Intercom's Advanced plan starts around $85/month per seat before you've sent a single conversation. Drift's pricing isn't even public - you have to talk to sales. Typebot self-hosted on Railway runs $5-15/month total, covering compute, database, and file storage, with no per-conversation fees and no seat limits. That's not a rounding error. For a small team running a handful of support and lead-gen bots, it's the difference between a real budget line item and something you have to justify every quarter.

Self-hosting also means your customer conversations never leave infrastructure you control. If your legal team has opinions about where support chat transcripts live, or you're in a regulated industry where "we store this on a third party's servers" isn't an acceptable answer, self-hosting solves that at the infrastructure level rather than the contract-negotiation level. Railway handles the parts you don't want to think about - provisioning PostgreSQL, wiring up MinIO for file storage, generating SSL certificates, keeping services on a private network so your database is never reachable from the public internet. You get the ownership of self-hosting without the weekend lost to Docker Compose debugging.

This template deploys six services automatically: the builder (where you design bots), the viewer (where published bots run), PostgreSQL (all persistent data), MinIO (S3-compatible storage for images and files uploaded mid-conversation), a one-time bucket-setup job, and Valkey (included for parity with the official reference template, though Typebot itself doesn't currently depend on it). The only manual step is creating a free GitHub OAuth App for login - Typebot has no default authentication, so this is unavoidable regardless of how you deploy it, and it takes about a minute.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| typebot-railway | [shruti060701/typebot-railway](https://github.com/shruti060701/typebot-railway) | Web service |
| minio-bucket-creator | `minio/mc:RELEASE.2025-08-13T08-35-41Z` | Database |
| fearless-balance | [shruti060701/typebot-railway](https://github.com/shruti060701/typebot-railway) | Web service |
| valkey | `valkey/valkey:9.1.1-alpine3.24` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | minio | 9000 | image-based services (no Dockerfile) have no way for Railway to know which port to route a public domain to without this being set explicitly. Without it, the public domain returns a `502` with an `x-railway-fallback: true` header, which looks like a generic platform error rather than an obvious missing-config problem. |
| `MINIO_ROOT_USER` | minio | (secret) | MinIO admin username. |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Password for the MinIO admin account. Auto-generated fresh for each deployment. |
| `PORT` | typebot-railway | 3000 | Must be pinned explicitly — Railway's own auto-injected `PORT` (commonly 8080) silently overrides the Docker image's internal default, causing a port mismatch if not set here. |
| `S3_SSL` | typebot-railway | true | Railway domains are HTTPS-only. |
| `HOSTNAME` | typebot-railway | 0.0.0.0 | without this, the app binds to loopback only and Railway's healthcheck can never reach it, even though the app logs "Ready." Found the hard way this session. |
| `S3_BUCKET` | typebot-railway | typebot | Bucket name created by `minio-bucket-creator` |
| `S3_ENDPOINT` | typebot-railway | - | Public MinIO domain for serving uploaded media. Must be MinIO's public domain, not the private/internal one — bots need to send uploaded media back to users outside Railway's network, not just reach it internally. |
| `DATABASE_URL` | typebot-railway | - | PostgreSQL connection string for bot data and user accounts |
| `NEXTAUTH_URL` | typebot-railway | - | Public URL of this service, used for auth callbacks. |
| `S3_ACCESS_KEY` | typebot-railway | - | MinIO access key for media uploads. Live reference, not a copied value — MinIO's credentials can be regenerated independently. |
| `S3_SECRET_KEY` | typebot-railway | (secret) | MinIO secret key. |
| `NEXTAUTH_SECRET` | typebot-railway | (secret) | Session encryption key for NextAuth |
| `GITHUB_CLIENT_ID` | typebot-railway | - | Required to log in — Typebot has no default login method.  Step 1: Go to github.com/settings/developers → click "New OAuth App" Step 2: Application name — put anything, e.g. "My Typebot" Step 3: Homepage URL — you won't have your Railway domain yet, so put a placeholder like https://example.com Step 4: Authorization callback URL — same placeholder + path: https://example.com/api/auth/callback/github Step 5: Click "Register application" — GitHub shows you the Client ID immediately. Paste it here. Step 6: After this deploys, come back to this OAuth App's settings and update the Homepage URL and callback URL to your real Railway domain. |
| `ENCRYPTION_SECRET` | typebot-railway | (secret) | Encrypts sensitive bot data. **Must be identical to the same variable on `fearless-balance`** — if they differ, bots and data become unreadable. |
| `GITHUB_CLIENT_SECRET` | typebot-railway | (secret) | Pairs with GITHUB_CLIENT_ID from the same OAuth App.  Step 1: On the same OAuth App page (right after registering it in the steps above), find "Client secrets" Step 2: Click "Generate a new client secret" Step 3: Copy the value immediately — GitHub only shows it once, you can't view it again later Step 4: Paste it here |
| `NEXT_PUBLIC_VIEWER_URL` | typebot-railway | - | Public URL of the Viewer service, where published bots are rendered. |
| `MINIO_ROOT_USER` | minio-bucket-creator | (secret) | Live reference to MinIO's credentials, not a copy. |
| `MINIO_ROOT_PASSWORD` | minio-bucket-creator | (secret) | Live reference to MinIO's credentials, not a copy. |
| `PORT` | fearless-balance | 3000 | The port the Typebot viewer listens on internally. |
| `S3_SSL` | fearless-balance | true | Railway domains are HTTPS-only. |
| `HOSTNAME` | fearless-balance | 0.0.0.0 | without this, the app binds to loopback only and Railway's healthcheck can never reach it, even though the app logs "Ready." Found the hard way this session. |
| `S3_BUCKET` | fearless-balance | typebot | Bucket name created by `minio-bucket-creator`. |
| `S3_ENDPOINT` | fearless-balance | - | Must be MinIO's **public** domain, not the private one — uploaded media needs to be servable back to end users chatting with the bot, not just reachable internally. |
| `DATABASE_URL` | fearless-balance | - | PostgreSQL connection string for bot data and user accounts. |
| `NEXTAUTH_URL` | fearless-balance | - | Public URL of this service, used for auth callbacks. |
| `S3_ACCESS_KEY` | fearless-balance | - | MinIO access key for media uploads. Live reference, not a copied value — MinIO's credentials can be regenerated independently. |
| `S3_SECRET_KEY` | fearless-balance | (secret) | MinIO secret key. |
| `ENCRYPTION_SECRET` | fearless-balance | (secret) | Session encryption key for NextAuth. |
| `NEXT_PUBLIC_VIEWER_URL` | fearless-balance | - | Public URL of this service, used for auth callbacks. |
| `POSTGRES_DB` | Postgres | railway | Default database name (Railway's own default, not `typebot` — the app doesn't care what it's named). |
| `DATABASE_URL` | Postgres | - | For external access outside Railway. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser username. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated superuser password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | For external access outside Railway. |

## Configuration

- **Start command:** `minio server /data --console-address ":9001"`
- **Healthcheck:** `/minio/health/live`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Start command:** `sh -c 'mc alias set myminio http://minio.railway.internal:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" && mc mb myminio/typebot --ignore-existing && mc anonymous set download myminio/typebot'`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Ruby

[View on Railway →](https://railway.com/deploy/typebot-updated-jul-26)
