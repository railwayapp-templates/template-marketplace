# Deploy Cognee Graph Memory API + pgvector on Railway

Cognee graph memory API for agents, pgvector Postgres and auth gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cognee-graph-memory-api-pgvector)

## About

Cognee is an open source memory engine for AI agents. It turns documents, chats and application data into a knowledge graph plus vector embeddings, then lets agents remember, recall and forget through a REST API, the Python SDK or an MCP client. This template deploys the official Cognee API with PostgreSQL and pgvector, protected by a small gateway so the instance cannot be claimed by strangers.

Hosting Cognee means running the FastAPI server next to three kinds of storage: a relational database for users, API keys and datasets, a vector store for embeddings, and a graph store for entities and relationships. This template follows the production layout from the Cognee deployment docs: PostgreSQL holds the relational tables and pgvector embeddings (one database per dataset), while the embedded Ladybug (Kuzu) graph and your original documents live on a persistent volume attached to the Cognee service. Multi user mode is on, so every endpoint needs a login token or an API key and each user's datasets stay isolated. Cognee cannot switch off its open signup endpoint, so the API has no public domain: a Caddy gateway is the public entrypoint and answers signup requests with 403.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| Cognee | `cognee/cognee:1.6.2` | Database |
| Cognee Gateway | `caddy:2.11-alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | cognee | Database name (relational tables plus the base pgvector database). |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser (Cognee creates one database per dataset). |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy (for psql / GUI clients). |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private-network connection string (same as DATABASE_URL). |
| `ENV` | Cognee | prod | Runs the production gunicorn command (no --reload, no debugger). The values local and dev switch the entrypoint to auto reload. |
| `PORT` | Cognee | 8000 | Port Railway's healthcheck probes. Must equal HTTP_PORT (8000), the port gunicorn binds. |
| `DB_HOST` | Cognee | - | Private hostname of the Postgres service. |
| `DB_NAME` | Cognee | - | Relational database name. |
| `DB_PORT` | Cognee | - | Postgres port (5432). |
| `HTTP_PORT` | Cognee | 8000 | Port the image entrypoint passes to gunicorn (--bind=$BIND_ADDRESS:$HTTP_PORT). Keep equal to PORT. |
| `LLM_MODEL` | Cognee | openai/gpt-5.6-luna | LiteLLM model id with provider prefix. Upstream default. |
| `LOG_LEVEL` | Cognee | INFO | Application log level: DEBUG, INFO, WARNING, ERROR. |
| `DB_PASSWORD` | Cognee | (secret) | Postgres password, generated on the Postgres service. |
| `DB_PROVIDER` | Cognee | postgres | Relational store for users, API keys, datasets and pipeline state. |
| `DB_USERNAME` | Cognee | (secret) | Postgres superuser. Superuser is required: in multi user mode Cognee runs CREATE DATABASE and CREATE EXTENSION vector for every dataset. |
| `LLM_API_KEY` | Cognee | (secret) | Key Cognee sends to the LLM provider. References OPENAI_API_KEY by default; replace it with another provider's key when you change LLM_PROVIDER. |
| `BIND_ADDRESS` | Cognee | [::] | gunicorn bind host. The bracketed [::] opens a dual stack socket: IPv6 for the gateway over private networking (cognee.railway.internal) and IPv4 for Railway's healthcheck. A bare :: breaks gunicorn's host:port parsing; 0.0.0.0 is unreachable from *.railway.internal. |
| `HASH_API_KEY` | Cognee | (secret) | Store API keys as PBKDF2 hashes (upstream recommended). Keys are shown once at creation. Flipping this after keys exist invalidates them. Each API key request costs one PBKDF2 hash (API_KEY_HASH_ITERATIONS, default 600000). |
| `LLM_PROVIDER` | Cognee | openai | LLM provider (openai, anthropic, gemini, ollama, custom, ...). Upstream default. |
| `OPENAI_API_KEY` | Cognee | (secret) | REQUIRED. Your OpenAI API key. Cognee uses it for entity extraction, summaries and answers (LLM) and for embeddings (text-embedding-3-large). The server boots without a key, but then falls back to local demo models and switching to OpenAI later changes the vector width of existing data. To use Anthropic, Gemini or OpenRouter for the LLM, change LLM_PROVIDER, LLM_MODEL and LLM_API_KEY after deploy; embeddings keep using this key. |
| `VECTOR_DB_HOST` | Cognee | - | pgvector host. Must be set explicitly: with access control on, Cognee raises 'Missing required pgvector credentials' instead of falling back to DB_*. |
| `VECTOR_DB_NAME` | Cognee | - | Base pgvector database. Each dataset gets its own database named by the dataset UUID. |
| `VECTOR_DB_PORT` | Cognee | - | pgvector port (5432). |
| `EMBEDDING_MODEL` | Cognee | openai/text-embedding-3-large | Embedding model (3072 dimensions, derived automatically). Choose before the first ingest. |
| `EMBEDDING_API_KEY` | Cognee | (secret) | Key used for embeddings. Kept separate from LLM_API_KEY so switching the LLM provider never sends a non OpenAI key to the OpenAI embeddings endpoint. |
| `ALLOW_CYPHER_QUERY` | Cognee | false | Disable raw Cypher search against the embedded graph (upstream production recommendation). Set true if you need CYPHER search types. |
| `DEFAULT_USER_EMAIL` | Cognee | default_user@example.com | Login email of the built in superuser. Only takes effect before the first boot; changing it later does not rename the account. Avoid .test and .local domains (rejected by the email validator). |
| `EMBEDDING_PROVIDER` | Cognee | openai | Embedding provider. Choose before the first ingest: changing provider or model later leaves existing vectors at the old width. |
| `TELEMETRY_DISABLED` | Cognee | - | Set to 1 to stop Cognee's anonymous usage telemetry (on by default upstream). |
| `VECTOR_DB_PASSWORD` | Cognee | (secret) | pgvector password. |
| `VECTOR_DB_PROVIDER` | Cognee | pgvector | Vector store. pgvector keeps embeddings in the same Postgres service. |
| `VECTOR_DB_USERNAME` | Cognee | (secret) | pgvector user (the Postgres superuser). |
| `DATA_ROOT_DIRECTORY` | Cognee | /cognee-storage/data | Raw ingested files (every document you add is stored here before processing). Must live under the /cognee-storage volume. |
| `CORS_ALLOWED_ORIGINS` | Cognee | - | Comma separated browser origins allowed to call the API. Unset allows only http://localhost:3000. API key clients (SDK, MCP, curl) are not affected. |
| `DEFAULT_USER_PASSWORD` | Cognee | (secret) | Password of the built in superuser, applied once on first boot. Log in with it at POST /api/v1/auth/login, then create API keys. Changing this variable later does NOT change the stored password; use PATCH /api/v1/users/me. |
| `SYSTEM_ROOT_DIRECTORY` | Cognee | /cognee-storage/system | Embedded graph database files (Ladybug, one per dataset) and caches. Must live under the /cognee-storage volume. |
| `ACCEPT_LOCAL_FILE_PATH` | Cognee | true | Must stay true: Cognee stores every input on local disk and reads it back by path, so false blocks all ingestion. Safe because COGNEE_ALLOWED_LOCAL_FILE_ROOTS confines paths. |
| `REQUIRE_AUTHENTICATION` | Cognee | true | Explicitly require authentication (upstream recommended production setting). |
| `FASTAPI_USERS_JWT_SECRET` | Cognee | (secret) | Signs login tokens. Without it Cognee generates a random secret per process and every token dies on restart. |
| `ENABLE_BACKEND_ACCESS_CONTROL` | Cognee | true | Multi user mode: every HTTP endpoint requires a logged in user or API key, and each user's datasets are isolated. Do not set false on a public deployment; false turns authentication off. |
| `COGNEE_ALLOWED_LOCAL_FILE_ROOTS` | Cognee | /cognee-storage/imports | Local paths callers may ingest. Cognee's own storage directories are always added. Without it, any signed-in user could ingest /proc/self/environ and read every secret in the container, which is why upstream says exposed deployments should set it. |
| `FASTAPI_USERS_VERIFICATION_TOKEN_SECRET` | Cognee | (secret) | Signs email verification tokens. |
| `FASTAPI_USERS_RESET_PASSWORD_TOKEN_SECRET` | Cognee | (secret) | Signs password reset tokens. |
| `PORT` | Cognee Gateway | 8080 | Port the gateway listens on and Railway's healthcheck probes. Equals the public domain target port. |
| `UPSTREAM` | Cognee Gateway | - | Private address of the Cognee API (cognee.railway.internal:8000, IPv6). |
| `ALLOW_SIGNUP` | Cognee Gateway | false | Cognee has no switch to turn off POST /api/v1/auth/register, so the gateway answers it with 403. Set true only while teammates create their accounts, then set it back to false. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Cognee Gateway | true | Lets the Alpine based Caddy image resolve *.railway.internal names. |

## Configuration

- **Start command:** `docker-entrypoint.sh postgres -c "listen_addresses=*"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bash -c 'for i in $(seq 1 90); do (exec 3<>/dev/tcp/$DB_HOST/$DB_PORT) 2>/dev/null && break; echo "waiting for Postgres at $DB_HOST:$DB_PORT"; sleep 2; done; exec /app/entrypoint.sh'`
- **Healthcheck:** `/health`
- **Volume:** `/cognee-storage`
- **Start command:** `sh -c 'echo IyEvYmluL3NoCiMgQ29nbmVlIEdhdGV3YXkgc3RhcnQgc2NyaXB0IChjYWRkeToyLjExLWFscGluZSkuCiMgUHVibGljIGVudHJ5cG9pbnQgaW4gZnJvbnQgb2YgdGhlIHByaXZhdGUgQ29nbmVlIEFQSS4gRXZlcnl0aGluZyBpcyBwcm94aWVkCiMgZXhjZXB0IG9wZW4gc2VsZiByZWdpc3RyYXRpb24gKFBPU1QgL2FwaS92MS9hdXRoL3JlZ2lzdGVyKSwgd2hpY2ggQ29nbmVlCiMgY2Fubm90IHN3aXRjaCBvZmYgaXRzZWxmLiBTZXQgQUxMT1dfU0lHTlVQPXRydWUgdG8gcGFzcyBpdCB0aHJvdWdoLgojIHNlcmlhbGl6ZWQtY29uZmlnLmpzb24gZW1iZWRzIHRoaXMgZmlsZSBiYXNlNjQgZW5jb2RlZDsgcmVnZW5lcmF0ZSB3aXRoOgojICAgYmFzZTY0IDwgZ2F0ZXdheS9zdGFydC5zaCB8IHRyIC1kICdcbicKc2V0IC1lCjogIiR7UE9SVDo/UE9SVCBpcyByZXF1aXJlZH0iCjogIiR7VVBTVFJFQU06P1VQU1RSRUFNIGlzIHJlcXVpcmVkIChob3N0OnBvcnQgb2YgdGhlIHByaXZhdGUgQ29nbmVlIEFQSSl9IgoKaWYgWyAiJHtBTExPV19TSUdOVVA6LWZhbHNlfSIgPSAidHJ1ZSIgXTsgdGhlbgogIFNJR05VUF9SVUxFPScjIEFMTE9XX1NJR05VUD10cnVlOiBzZWxmIHJlZ2lzdHJhdGlvbiBpcyBwYXNzZWQgdGhyb3VnaCB0byBDb2duZWUnCmVsc2UKICBTSUdOVVBfUlVMRT0nQHNpZ251cCBwYXRoIC9hcGkvdjEvYXV0aC9yZWdpc3RlciAvYXBpL3YxL2F1dGgvcmVnaXN0ZXIvKgoJaGFuZGxlIEBzaWdudXAgewoJCXJlc3BvbmQgIlNlbGYgcmVnaXN0cmF0aW9uIGlzIGRpc2FibGVkIG9uIHRoaXMgQ29nbmVlIGluc3RhbmNlLiBTZXQgQUxMT1dfU0lHTlVQPXRydWUgb24gdGhlIENvZ25lZSBHYXRld2F5IHNlcnZpY2UgdG8gb3BlbiBpdC4iIDQwMwoJfScKZmkKCmNhdCA+IC9ldGMvY2FkZHkvQ2FkZHlmaWxlIDw8RU9GCnsKCWF1dG9faHR0cHMgb2ZmCglhZG1pbiBvZmYKCXNlcnZlcnMgewoJCXByb3RvY29scyBoMSBoMmMKCX0KfQoKOiR7UE9SVH0gewoJaGFuZGxlIC9nYXRld2F5LWhlYWx0aCB7CgkJcmVzcG9uZCAib2siIDIwMAoJfQoKCSR7U0lHTlVQX1JVTEV9CgoJaGFuZGxlIHsKCQlyZXZlcnNlX3Byb3h5ICR7VVBTVFJFQU19IHsKCQkJZmx1c2hfaW50ZXJ2YWwgLTEKCQl9Cgl9Cn0KRU9GCgplY2hvICJjb2duZWUtZ2F0ZXdheTogbGlzdGVuaW5nIG9uIDoke1BPUlR9LCB1cHN0cmVhbSAke1VQU1RSRUFNfSwgQUxMT1dfU0lHTlVQPSR7QUxMT1dfU0lHTlVQOi1mYWxzZX0iCmV4ZWMgY2FkZHkgcnVuIC0tY29uZmlnIC9ldGMvY2FkZHkvQ2FkZHlmaWxlIC0tYWRhcHRlciBjYWRkeWZpbGUK | base64 -d > /tmp/start.sh && exec sh /tmp/start.sh'`
- **Healthcheck:** `/gateway-health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/cognee-graph-memory-api-pgvector)
