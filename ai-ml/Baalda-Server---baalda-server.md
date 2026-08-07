# Deploy Baalda Server on Railway

The local-first Markdown second brain.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baalda-server)

## About

Baalda is a local-first second brain: your notes are plain Markdown files on your
  own disk that an AI can edit directly and that teammates can edit together in real
  time. The Baalda Server is the sync backend that makes the second half possible —
  multi-device sync, team vaults, and live collaboration.

  ## About Hosting Baalda Server

  The server is a single Node process backed by Postgres. It terminates one HTTPS
  port that carries both the REST API and the CRDT WebSocket, so there is nothing
  else to route. It stores only opaque binary Yjs documents — your Markdown never
  travels the wire, and each client re-derives its own files and search index from
  the CRDT state. Deploying it means Postgres, a signing secret, and a public URL;
  this template wires all three automatically and applies database migrations before
  the service accepts traffic. After deploying, paste the generated URL into the
  desktop app's Server settings and create an account.

  ## Common Use Cases

  - Sync one person's vault across several machines without handing notes to a third party
  - Run a shared team vault with per-folder permissions, presence, and live editing
  - Give cloud AI agents an MCP endpoint into a vault, governed by the same permissions as people
- Run a shared team vault with per-folder permissions, presence, and live editing
- Give cloud AI agents an MCP endpoint into a vault, governed by the same permissions as people

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| baalda | [naveedharri/baalda](https://github.com/naveedharri/baalda) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `JWT_SECRET` | baalda | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Rust, CSS, Dockerfile, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/baalda-server)
