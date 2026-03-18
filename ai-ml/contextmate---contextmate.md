# Deploy contextmate on Railway

Zero-knowledge encrypted sync server for AI agent context

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/contextmate)

## About

ContextMate is a zero-knowledge encrypted sync service for AI agent context —
  memories, skills, rules, and identity files. Your passphrase never leaves your
   device; the server only stores encrypted blobs.

  ## About Hosting ContextMate

  This template deploys the ContextMate server with persistent storage.
  Everything works out of the box — no configuration required. A JWT signing
  secret is auto-generated on first boot and persisted to disk.

  After deploying, point your CLI at your new server:

  ```bash
  npm i -g contextmate
  contextmate setup
```
Enter your Railway server URL when prompted

  ## Why Deploy

  - Own your data — Run the sync server on your own infrastructure instead of
  relying on a shared hosted service.
  - Zero-knowledge encryption — AES-256-GCM with Argon2id key derivation. The
  server never sees your plaintext data.
  - Zero config — JWT secret auto-generates, SQLite database initializes on
  first request. Just deploy and go.
  - Earn from Railway — Template creators earn a share of usage revenue from
  deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| contextmate | [contextmate/contextmate](https://github.com/contextmate/contextmate) (root: /server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `JWT_SECRET` | (secret) | Auto-generated on first boot.    Set explicitly for multi-instance. |
| `CORS_ORIGINS` | - | Comma-separated allowed   origins for the web dashboard. Leave blank to allow all. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Astro, CSS, Shell, JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/template/contextmate)
