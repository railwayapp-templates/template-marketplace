# Deploy LibreChat | ChatGPT Alternative, Files + Search That Persist on Railway

Self-hosted ChatGPT alternative: file RAG with no API key, uploads persist

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-or-chatgpt-alternative-files-s)

## About

LibreChat is the open-source, self-hosted ChatGPT alternative: one interface across OpenAI,
Anthropic, Google, DeepSeek, xAI, Groq, Mistral, OpenRouter and any OpenAI-compatible endpoint,
with multi-user accounts, conversation search, agents, and chat-with-your-files. This template
deploys the pinned v0.8.7 release with MongoDB, Meilisearch, pgvector and a RAG API — five
services wired over the private network, with file search working on first boot and no API key of
any kind required to deploy.

LibreChat is not a single container. Conversations, users, presets and agent definitions live in
MongoDB. Message search is served by Meilisearch, which maintains its own index. Chatting with an
uploaded document needs a RAG API and a pgvector database to hold the embeddings. Uploaded files
and images produced by tools and agents are written to the application's own filesystem, in two
different directories.

Three details decide whether a LibreChat deployment on Railway actually works, and none of them
are visible on a deploy form:

**Every service has to be bound and wired for the private network.** Meilisearch binds loopback
unless `MEILI_HTTP_ADDR` says otherwise, which is a common cause of a deployment that starts fine
and never returns a search result. Here Mongo and Meilisearch listen on both address families, the
RAG API runs on a dual-stack socket, and the app's connection strings are generated from the
private domains — so nothing depends on which address family gets resolved.

**The application service needs a volume too, not just the datastores.** LibreChat writes user
uploads to `/app/uploads` and tool- or agent-generated images to `/app/client/public/images`.
Without a volume both are lost on every redeploy, while MongoDB keeps the message rows that point
at them. This template mounts a volume at `/app/uploads` and links the images directory into it,
so both survive.

**Embeddings normally cost an extra API key.** The RAG API image published for lightweight
deployments has no local embedding support, so file search stays dark until you supply an OpenAI
key. This template runs `sentence-transformers/all-MiniLM-L6-v2` on CPU, baked into the image at
build time, so document chat works out of the box, offline, with no third-party key and no
per-boot model download. Moving to a hosted embeddings provider later is a two-variable change.

Every image is pinned to an exact release rather than a rolling `latest` or `-dev` tag, so two
people deploying this a month apart get the same application. MongoDB and Meilisearch run
authenticated, and neither datastore, nor pgvector, nor the RAG API is given a public domain —
only the chat UI is reachable from the internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:0.8.6-pg17` | Database |
| mongo | `mongo:8.3.7-noble` | Database |
| rag | `ghcr.io/bon5co/librechat-rag-railway:latest` | Worker |
| librechat | `ghcr.io/bon5co/librechat-railway:latest` | Web service |
| meilisearch | `getmeili/meilisearch:v1.51.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | pgvector | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) |
| `JWT_SECRET` | rag | (secret) |
| `POSTGRES_PASSWORD` | rag | (secret) |
| `JWT_SECRET` | librechat | (secret) |
| `JWT_REFRESH_SECRET` | librechat | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'export MONGO_INITDB_ROOT_USERNAME=librechat && exec docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0'`
- **Volume:** `/data/db`
- **Start command:** `python /usr/local/bin/serve.py`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Start command:** `/bin/sh -c 'export MEILI_ENV=production MEILI_HTTP_ADDR="[::]:7700" MEILI_NO_ANALYTICS=true MEILI_DB_PATH=/meili_data/data.ms && exec /bin/meilisearch'`
- **Volume:** `/meili_data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/librechat-or-chatgpt-alternative-files-s)
