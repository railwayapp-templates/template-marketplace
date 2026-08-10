# Deploy Flowise | (Just Updated) Visual AI Agent Builder, Credentials Survive Redeploys on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-v314-or-visual-ai-agent-builder-)

## About

Flowise is the open-source visual builder for LLM applications: assemble chatflows, RAG
pipelines and multi-agent systems by dragging nodes on a canvas, then serve each one as a
REST endpoint or an embeddable chat widget. This template runs the pinned **3.1.4** release
with its own PostgreSQL 17 database, and it deploys with an **empty form** — every value is
filled in for you.

Two things it does that the other Flowise listings on this marketplace do not:

- **Your provider credentials still work after a redeploy.** Flowise encrypts every saved
  OpenAI / Anthropic / Pinecone key with an `encryption.key` file, and it keeps that file —
  along with the six auth secrets and your uploaded documents — in the data directory it
  resolves from `$HOME`. The upstream image runs as the `node` user, so that directory is
  `/home/node/.flowise`. Listings that mount their volume at `/data` or `/root/.flowise`
  are not persisting it, and nothing tells you: the credential row survives in Postgres,
  the UI still lists it, and the secret inside comes back **empty**. Measured against
  3.1.4 on 2026-08-02 — same Postgres, container replaced, `GET /api/v1/credentials/:id`
  returns `200` with `plainDataObj: {}`, and every previously issued session cookie returns
  `401`. This template persists the real directory and pins the encryption key to the
  project as well, so the same test comes back with the credential intact.
- **The version is pinned.** The listing holding the most recent deploys in this category
  ships the bare `flowiseai/flowise` tag. Flowise runs TypeORM migrations on boot, so a
  floating tag turns an ordinary redeploy into an unscheduled upgrade of your application
  database.

Flowise is a Node application that keeps state in two places, and self-hosting it goes
wrong when only one of them is looked after. The **database** holds flows, chat history,
users and the encrypted credential rows; by default that is a SQLite file on the container
disk, which on a platform that replaces containers every deploy means the flows are gone.
The **data directory** holds the encryption key those credential rows are encrypted with,
the auth secrets that sign sessions, and the blob storage behind document stores and chat
uploads.

This template gives Flowise a real PostgreSQL 17 database on a volume over Railway's
private network, and a second volume mounted at the data directory the application
actually reads, with the mount chowned to the `node` user before the server starts
(Railway mounts volumes owned by root; upstream runs as uid 1000, so without that step the
container crash-loops on its first write). Railway builds nothing — the image is prebuilt,
so a deploy is a pull and a boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowise | `ghcr.io/bon5co/flowise-railway:latest` | Web service |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DATABASE_PASSWORD` | flowise | (secret) |
| `FLOWISE_SECRETKEY_OVERWRITE` | flowise | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-v314-or-visual-ai-agent-builder-)
