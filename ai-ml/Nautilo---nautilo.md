# Deploy Nautilo on Railway

Run a private workspace for people and AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nautilo)

## About

Nautilo is an open organization-level harness where people and machine people
work, co-create, and act together. This template creates a complete private
Nautilo server on Railway, with durable data, integrated identity, and a guided
administrator handoff through the signed Nautilo CLI.

Your Railway workspace owns and pays for the deployment. The template creates
five services, three persistent volumes, and two generated HTTPS domains, then
deliberately holds normal application startup until the Nautilo administrator
CLI verifies the topology and adopts it. Internal database passwords and setup
tokens are generated automatically; you do not copy credentials or Railway
resource IDs into Nautilo. After adoption, the same receipt-backed CLI provides
inspect, upgrade, interruption recovery, protected recovery points, and safe
teardown. Model-provider keys are optional during deployment and can be added
later from Nautilo's Server Guide.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| logto-seed | `ghcr.io/logto-io/logto@sha256:aa4c428b70d9dd8eac23b6eeb3826a02d5fe0283b5dd774589b9b9760e0c6e9f` | Worker |
| app-postgres | `pgvector/pgvector@sha256:7ae6051efd0e60444282c27c7e141af07f322ce033300e727a49c3dd11075e38` | Database |
| logto | `ghcr.io/logto-io/logto@sha256:aa4c428b70d9dd8eac23b6eeb3826a02d5fe0283b5dd774589b9b9760e0c6e9f` | Web service |
| logto-postgres | `postgres@sha256:95206741a5b214807675e14165369d05b93a9cf692223b616d07cca227e74b0b` | Database |
| nautilo-server | `ghcr.io/agentsea/nautilo-runtime@sha256:8b1b0c79b779da7dabe6ce8c508d2f97ca5a8e6bdbdfb66b4012db1a8029f461` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_USER` | app-postgres | (secret) | PostgreSQL administrator used during Nautilo setup. Keep the provided value. |
| `POSTGRES_PASSWORD` | app-postgres | (secret) | Generated automatically for this database. Do not replace or reuse it. |
| `NAUTILO_TEMPLATE_APP_DB_PASSWORD` | app-postgres | (secret) | Generated automatically for Nautilo's application database role. |
| `NAUTILO_TEMPLATE_AGENT_DB_PASSWORD` | app-postgres | (secret) | Generated automatically for Nautilo's agent database role. |
| `NAUTILO_TEMPLATE_CRYPTO_DB_PASSWORD` | app-postgres | (secret) | Generated automatically for Nautilo's encryption database role. |
| `NAUTILO_TEMPLATE_LOGTO_HANDOFF_TOKEN` | logto | (secret) | Generated automatically for the one-time Nautilo identity handoff. |
| `POSTGRES_USER` | logto-postgres | (secret) | PostgreSQL administrator used during identity setup. Keep the provided value. |
| `POSTGRES_PASSWORD` | logto-postgres | (secret) | Generated automatically for this database. Do not replace or reuse it. |
| `NAUTILO_TEMPLATE_LOGTO_DB_PASSWORD` | logto-postgres | (secret) | Generated automatically for the identity database role. |
| `PORT` | nautilo-server | 3001 | Internal Nautilo HTTP port. Keep the provided value. |
| `NAUTILO_BOOTSTRAP_TOKEN` | nautilo-server | (secret) | Generated automatically for first-owner setup and retired after use. |
| `NAUTILO_LOGTO_HTTP_EMAIL_WEBHOOK_SECRET` | nautilo-server | (secret) | Generated automatically to authenticate identity email webhooks. |

## Configuration

- **Start command:** `node -e "setInterval(() => {}, 2147483647)"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node -e "const http=require('http');http.createServer((_q,r)=>{r.writeHead(503,{'content-type':'text/plain; charset=utf-8'});r.end('Nautilo setup is waiting for the administrator CLI.');}).listen(4301,'::');setInterval(()=>{},2147483647)"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bun -e "Bun.serve({hostname:'::',port:3001,fetch(){return new Response('Finish setting up Nautilo with the administrator CLI.',{status:200,headers:{'content-type':'text/plain; charset=utf-8'}})}});await new Promise(()=>{})"`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/nautilo`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nautilo)
