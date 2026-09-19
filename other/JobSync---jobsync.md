# Deploy JobSync on Railway

Self-hosted job-search tracker + AI assistant, behind a private front door

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jobsync)

## About

JobSync is an open-source, self-hosted job-search tracker with an AI assistant: track applications, companies and
contacts, store resumes, and optionally use your own AI provider to help draft and analyse. This template deploys
JobSync behind a private basic-auth front door with a generated password, so your instance is not open to the public.
It is a community-maintained template based on JobSync; it is not affiliated with, endorsed by, or an official
offering of the JobSync project, and it does not use the JobSync logo.

JobSync is a Next.js app that stores everything in SQLite and keeps uploaded resumes on disk, with its own next-auth
login. Its sign-up page, however, is open by default — on a public URL anyone who found it could create an account on
your instance. This template runs the official JobSync image unmodified but puts the whole app behind a Caddy HTTP
basic-auth front door: only holders of the generated front-door password can reach JobSync at all, including its
sign-up page, which closes that exposure. JobSync's own account login still applies inside.

This template runs JobSync on Railway with a generated front-door password, a generated session-signing key and
API-key encryption key, its data persisted on a volume, and the port and health check wired. The database migrates
automatically on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/youssefsiam38/jobsync-railway:1.0.0@sha256:d36be552ac5f183ac05ade2d04c3fd9cdc5f8dde798c1b8bba9e5c26668e6a42` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes traffic and health checks to (keep it 8080). |
| `AUTH_SECRET` | (secret) | Secret that signs next-auth sessions (generated; keep it stable). |
| `NEXTAUTH_URL` | - | The public URL of your instance; used for next-auth callbacks. Leave as the Railway domain. |
| `FORWARD_PROTO` | https | Scheme Caddy reports to JobSync (keep it https on Railway). |
| `ENCRYPTION_KEY` | - | Encrypts AI-provider keys you save in JobSync. Generated — never change it after saving keys. |
| `OWNER_PASSWORD` | (secret) | Front-door password, generated. Copy it from here — it is what keeps your instance private. |
| `OWNER_USERNAME` | (secret) | Front-door (basic auth) username you enter in the browser prompt. |
| `AUTH_TRUST_HOST` | true | Let next-auth trust the reverse-proxy host header (keep it true on Railway). |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/jobsync)
