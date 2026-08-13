# Deploy Typebot | (Just Updated) Chatbot Builder You Can Sign Into Without An SMTP Account on Railway

Visual chatbot builder with a sign-in that needs no SMTP account at all

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typebot-or-just-updated-chatbot-builder-)

## About

Typebot is an open-source chatbot and conversational-form builder: a visual drag-and-drop
editor with 30+ block types, conditional logic, variables, native OpenAI/LLM blocks, webhooks
and Google Sheets integrations, and an embed library that drops a bot into any website as a
container, popup or chat bubble. This template deploys Typebot 3.17.2 as five services — the
Builder (the editor), the Viewer (the runtime that serves published bots), PostgreSQL, Redis
and MinIO for uploads — and it is set up so that you can sign in the moment the deploy
finishes, without owning an SMTP account and without exposing registration to strangers.

Typebot's only first-party sign-in method is an emailed login code; everything else is OAuth
against GitHub, Google, GitLab, Azure AD, Keycloak or a custom OIDC issuer. Self-hosting it
therefore normally means supplying working SMTP credentials before you can open your own
instance for the first time, and transactional SMTP from a cloud host is exactly the thing
that tends not to work.

This deployment runs a mailbox inside the Builder container and points Typebot's SMTP at it,
so the login code is delivered locally and read at **`/inbox`** on the Builder URL, behind
HTTP basic auth. That mailbox is the credential surface of the whole instance, so the
container refuses to boot if its password is empty.

Registration is closed: `DISABLE_SIGNUP` is on and only the address in `ADMIN_EMAIL` can
create an account, so a public Builder URL is not an open sign-up page for whoever finds it.

Uploads go to a MinIO service on a volume, and the bucket is created and made publicly
readable on the Builder's first boot rather than by a one-shot container you have to
remember to delete afterwards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| viewer | `ghcr.io/bon5co/typebot-railway-viewer:3.17.2` | Web service |
| builder | `ghcr.io/bon5co/typebot-railway-builder:3.17.2` | Web service |
| redis | `redis:8.2.1-alpine` | Database |
| postgres | `postgres:17.6-alpine` | Database |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `S3_SECRET_KEY` | viewer | (secret) |
| `ENCRYPTION_SECRET` | viewer | (secret) |
| `S3_SECRET_KEY` | builder | (secret) |
| `INBOX_PASSWORD` | builder | (secret) |
| `ENCRYPTION_SECRET` | builder | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'exec minio server --address "[::]:$PORT" --console-address 127.0.0.1:9001 /data'`
- **Healthcheck:** `/minio/health/ready`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/typebot-or-just-updated-chatbot-builder-)
