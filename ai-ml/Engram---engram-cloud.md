# Deploy Engram on Railway

Persistent, searchable memory that AI coding agents read and write

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/engram-cloud)

## About

Engram is an open-source persistent memory system for AI coding agents. Your agent forgets everything when a session ends, so every new conversation re-explains the same decisions and the same bug you already fixed. Engram gives it searchable, structured memory instead: a single Go binary with SQLite and FTS5 that any MCP-compatible agent — Claude Code, Gemini CLI, OpenCode, Cursor, Windsurf, VS Code Copilot — reads and writes through a fixed set of tools. Engram Cloud is the server half, and the part you self-host: a project-scoped replication endpoint that keeps a developer's memory in step across machines and gives a team one shared index.

Deploy Engram Cloud on Railway and the runtime arrives pre-configured. The template provisions two services: **engram**, the `engram cloud serve` runtime from the official `ghcr.io/gentleman-programming/engram` image, and **Postgres**, Railway's managed PostgreSQL, holding every replicated chunk, session, observation and audit event. Only engram gets a public domain; Postgres stays private. Each machine's local SQLite database stays authoritative — nothing is uploaded until someone runs an explicit `engram sync --cloud --project ` — so self-host Engram on Railway when you want shared memory and browser visibility without handing your engineering context to a third party.

![Diagram of the Engram Cloud and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789373018/engram-architecture.webp)

Engram stores structured observations — bug fixes, decisions, discoveries, conventions, constraints — rather than raw transcripts, and keys evolving topics so an agent updates a decision instead of stacking contradictory copies of it. Engram Cloud adds replication and human visibility without changing where the truth lives.

- **Local-first** — the endpoint holds compressed, project-scoped chunks; local SQLite is authoritative.
- **Explicit sync** — every push and pull names one project. There is no implicit "sync all" mode.
- **Browser dashboard** — projects, sessions, observations, prompts, contributors, stats, audit log.
- **Bearer-token API** — `/sync/push`, `/sync/pull` and `/admin/*` reject unauthenticated requests; per-person tokens are granted project by project.
- **Deterministic failure reasons** — `blocked_unenrolled`, `policy_forbidden`, `auth_required`, not silent drift.

The engram service is a stateless Go HTTP server, so it needs no volume and can be redeployed freely; all durable state sits in Postgres, on a Railway volume with managed backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| engram | `ghcr.io/gentleman-programming/engram:1.20` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | engram | 18080 | Port Railway health-checks |
| `ENGRAM_PORT` | engram | 18080 | Port the cloud runtime listens on |
| `ENGRAM_CLOUD_HOST` | engram | 0.0.0.0 | Bind address, image default is loopback |
| `ENGRAM_JWT_SECRET` | engram | (secret) | Signs dashboard session cookies |
| `ENGRAM_CLOUD_ADMIN` | engram | - | Admin token for dashboard and /admin |
| `ENGRAM_CLOUD_TOKEN` | engram | (secret) | Bearer token for CLI sync clients |
| `ENGRAM_DATABASE_URL` | engram | - | Postgres connection string |
| `ENGRAM_CLOUD_TOKEN_PEPPER` | engram | (secret) | Hashes managed per-user tokens |
| `ENGRAM_CLOUD_MAX_PUSH_BYTES` | engram | 8388608 | Max chunk push size in bytes |
| `ENGRAM_CLOUD_ALLOWED_PROJECTS` | engram | * | Server-side project allow-list |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/engram-cloud)
