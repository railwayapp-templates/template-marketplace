# Deploy Grep Knowledge Agent on Railway

Self-hosted AI knowledge agent — grep, not vector embeddings

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grep-knowledge-agent)

## About

A self-hosted AI knowledge agent that replaces vector embeddings with `grep`, `find`, and `cat`. Give the LLM a filesystem and `bash` — it searches your docs deterministically, explains every step, and costs ~75% less than vector RAG. No vector database, no Vercel lock-in.

```
┌─────────────┐   ┌──────────────────────────────────────────┐   ┌──────────────┐
│  Chat UI    │──▶│  Web (Nuxt 4 + Nitro)                    │──▶│  Sandbox      │
│  /settings  │   │  · AI SDK agent loop + complexity router │   │  (gVisor)     │
│  /login     │   │  · Postgres (chats, sources, users)      │   │  grep/cat/    │
│             │   │  · Redis (sessions, rate limits)         │   │  find (RO)    │
└─────────────┘   │  · GitHub sync → snapshot volume         │   └──────────────┘
                  └──────────────────────────────────────────┘
```

The agent clones your GitHub repos into a snapshot volume, then uses a sandboxed shell to run read-only `grep`/`find`/`cat` commands against them. A complexity router classifies each question and routes to the right model — `gemini-2.0-flash` for trivial questions, `claude-sonnet-4` for moderate, `claude-opus-4` for complex. Every answer cites the files it read. Deploying on Railway gives you Postgres, Redis, persistent volumes, and private networking — all provisioned automatically with one click.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [jesseoue/grep-knowledge-agent](https://github.com/jesseoue/grep-knowledge-agent) | Web service |
| sandbox | [jesseoue/grep-knowledge-agent](https://github.com/jesseoue/grep-knowledge-agent) | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `BETTER_AUTH_SECRET` | web | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/snapshot`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Vue, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/grep-knowledge-agent)
