# Deploy Blinko on Railway

AI note app for quick capture, markdown notes and todos

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/blinko-notes)

## About

Blinko is an open-source, self-hosted note tool built on one idea: capture first, organise later. A thought typed into a single box lands as a timestamped card, and tags, markdown and todo checkboxes turn it into something durable when you are ready. It also indexes everything into a vector store, so a question asked in plain language returns the notes that answer it. People reach for it when Notion feels heavy, Obsidian's folder discipline gets in the way, and a hosted service is not where they want private notes.

Self-host Blinko on Railway and this template wires it together. Two services deploy: `blinko`, the Node application serving the web UI, the REST API and its background jobs, and `Postgres`, Railway's managed database holding every note, tag, attachment and scheduled job. A volume at `/app/.blinko` keeps uploads, the vector index and database dumps across redeploys. The administrator account is created at boot from a variable, so the public URL never sits open waiting for whoever finds it first.

![Diagram of the Blinko and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788966344/blinko-architecture.png)

Blinko splits writing into three shapes so one tool covers the range: a *Blinko* is a fleeting thought, a *Note* a considered markdown document, a *Todo* a checklist. They share one timeline, one tag namespace and one search index, so a scratch idea is promoted without moving anywhere.

Key features:

- Markdown editor with tables, code blocks, checklists and inline tag autocomplete
- Retrieval-augmented search over your notes, using any OpenAI-compatible provider
- Attachments on disk or in S3-compatible object storage
- Tag hierarchy, archive, recycle bin, daily review and note-to-note references
- REST API with an OpenAPI document, and an MCP endpoint for AI clients
- Share links, plugins, and desktop and mobile builds that sync to your server

The Railway architecture is deliberately small. The `blinko` service is one Node process serving the compiled front end, the API and its own scheduler. That scheduler is pg-boss, whose queue lives in the same Postgres database, so archiving, backups and embedding rebuilds need no separate worker and no Redis. The volume holds what Postgres does not: uploads, the libSQL vector index, database dumps and plugins.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| blinko | [gridalpha/blinko-railway](https://github.com/gridalpha/blinko-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | blinko | 1111 | Port Railway health-checks; app is fixed at 1111 |
| `DATABASE_URL` | blinko | - | Postgres connection string |
| `NODE_OPTIONS` | blinko | --max-old-space-size=3072 | Cap Node heap to the container |
| `BLINKO_ADMIN_PASSWORD` | blinko | (secret) | First superadmin's password, first boot only |
| `BLINKO_ADMIN_USERNAME` | blinko | (secret) | First superadmin's username |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.blinko`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/blinko-notes)
