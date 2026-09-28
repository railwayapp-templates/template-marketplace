# Deploy Hocuspocus on Railway

Hocuspocus 4.7: Y.js collaboration backend with JWT auth and SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hocuspocus)

## About

Hocuspocus is a WebSocket backend for Y.js, the CRDT library behind many collaborative editors. It syncs shared documents between clients in real time, merges offline edits without conflicts and stores the result. It is made by the Tiptap team and works with Tiptap, BlockNote, Lexical, CodeMirror and any other Y.js binding.

This template deploys Hocuspocus 4.7.0 from a small public wrapper repository, because the official command-line server accepts every client. The wrapper verifies an HS256 JWT on every connection. Your backend signs it with `HOCUSPOCUS_JWT_SECRET`, and an optional `docs` claim limits which documents it opens. Documents are stored in SQLite on a Railway volume and survive redeploys. Clients connect over WSS to the public domain. If you set `WEBHOOK_URL`, the server posts document changes to your backend, signed with `WEBHOOK_SECRET`. The server runs as the unprivileged `node` user and fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hocuspocus | [aalfath/hocuspocus-railway-template](https://github.com/aalfath/hocuspocus-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 1234 |
| `WEBHOOK_SECRET` | (secret) |
| `HOCUSPOCUS_JWT_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hocuspocus)
