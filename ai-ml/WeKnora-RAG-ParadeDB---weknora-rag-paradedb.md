# Deploy WeKnora RAG + ParadeDB on Railway

Tencent WeKnora RAG and agent platform with ParadeDB, signup closed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/weknora-rag-paradedb)

## About

WeKnora is Tencent's open source LLM knowledge platform. Upload PDFs, Office files, web pages and notes, and it parses them, builds a hybrid knowledge base (dense vectors plus BM25 keyword search), answers questions with citations back to the source, runs reasoning agents over your documents, and can keep a wiki up to date from them. Workspaces, a four level role model and API keys make it a team tool, and it can publish each knowledge base as an MCP server.

Self-hosting WeKnora means five containers: a web front door, the Go application, a document parsing service, Postgres and Redis. This template deploys all five from Tencent's official images pinned to v0.8.2, wires them over Railway's private network, generates every secret, and gives you one public URL for the UI and API.

Postgres is ParadeDB, which is what WeKnora's default retrieval engine needs: vectors (pgvector) and keyword indexes (pg_search BM25) live in the same database, so there is no separate vector store to run or pay for. Uploaded files are kept on a volume attached to the application.

The template closes public signup and creates your admin account on the first boot, on an instance that never listens beyond its own container. Upstream ships signup open with no default account, which on a public URL means the first stranger to register owns the instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WeKnora App | `wechatopenai/weknora-app:v0.8.2` | Database |
| Redis | `redis:7.2.4-alpine3.19` | Database |
| DocReader | `wechatopenai/weknora-docreader:v0.8.2` | Worker |
| Postgres | `paradedb/paradedb:v0.22.6-pg17` | Database |
| WeKnora | `wechatopenai/weknora-ui:v0.8.2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | WeKnora App | UTC | Timezone (upstream ships Asia/Shanghai). |
| `PORT` | WeKnora App | 8080 | Port the Go server listens on (config.yaml server.port). Railway's healthcheck probes $PORT, so keep it at 8080; the WeKnora front door reads it as APP_PORT. |
| `DB_HOST` | WeKnora App | - | ParadeDB Postgres private hostname. |
| `DB_NAME` | WeKnora App | - | Postgres database. |
| `DB_PORT` | WeKnora App | 5432 | Postgres port. |
| `DB_USER` | WeKnora App | (secret) | Postgres user. Must be able to CREATE EXTENSION (vector, pg_search, pg_trgm, uuid-ossp): migrations run on boot. |
| `GIN_MODE` | WeKnora App | release | release disables Swagger and debug routing output. |
| `REDIS_DB` | WeKnora App | 0 | Redis database index. |
| `DB_DRIVER` | WeKnora App | postgres | Metadata database driver. |
| `LOG_LEVEL` | WeKnora App | info | Log level (upstream compose defaults to debug). |
| `JWT_SECRET` | WeKnora App | (secret) | Signs login and refresh tokens. Without it every restart generates a new one and logs everyone out. |
| `REDIS_ADDR` | WeKnora App | - | Redis host:port for the asynq task queue, chat streams and settings pub/sub. |
| `DB_PASSWORD` | WeKnora App | (secret) | Postgres password. |
| `SERVER_HOST` | WeKnora App | [::] | Bind address, overrides config.yaml server.host (0.0.0.0). [::] is dual stack: the front door reaches the App over Railway's IPv6 private network and the healthcheck arrives over IPv4. Keep the brackets: the app joins host and port itself, so a bare :: is an invalid address. |
| `AUTO_MIGRATE` | WeKnora App | true | Run the database migrations on startup. |
| `REDIS_PREFIX` | WeKnora App | stream: | Key prefix for chat stream state (upstream default). |
| `STORAGE_TYPE` | WeKnora App | local | Where uploaded files and extracted images are stored. local = the /data/files volume on this service. minio, s3, cos, oss, obs and tos are also supported; configure them in the UI or with their env vars. |
| `DOCREADER_ADDR` | WeKnora App | - | DocReader gRPC host:port on the private network (PDF, Office, HTML and web page parsing). |
| `REDIS_PASSWORD` | WeKnora App | (secret) | Redis password. |
| `SSRF_WHITELIST` | WeKnora App | - | Optional. Comma separated hosts or CIDRs the App may call even though they are private, for example a model server on the Railway private network. Everything private is blocked by default. |
| `SYSTEM_AES_KEY` | WeKnora App | - | AES-256 key (exactly 32 bytes) that encrypts model API keys, vector store and storage credentials and workspace API keys in Postgres. Never change it after first boot or stored credentials become unreadable. |
| `OLLAMA_BASE_URL` | WeKnora App | - | Optional. URL of an Ollama server for local models, for example http://ollama.railway.internal:11434 (also add its host to SSRF_WHITELIST, private addresses are blocked by default). |
| `OLLAMA_OPTIONAL` | WeKnora App | true | Only warn, never block startup, when no Ollama server is reachable. |
| `RETRIEVE_DRIVER` | WeKnora App | postgres | Retrieval engine. postgres = pgvector (dense) plus ParadeDB pg_search (BM25) in the same Postgres, so no separate vector database is needed. |
| `APP_EXTERNAL_URL` | WeKnora App | - | Public URL used to rewrite knowledge base images as <url>/r/<token> for IM channels (Slack, Feishu, WeCom). Only matters if you connect an IM channel. |
| `MAX_FILE_SIZE_MB` | WeKnora App | 50 | Upload size cap in MB (the front door and DocReader follow this value). |
| `WEKNORA_LANGUAGE` | WeKnora App | - | Optional. Forces the language used for document summaries and generated questions (for example en-US). Empty follows each request's Accept-Language. |
| `FRONTEND_BASE_URL` | WeKnora App | - | Public origin of the web UI, used for absolute invite links (the way teammates join while signup is closed). |
| `SYSTEM_SIGNING_KEY` | WeKnora App | - | Signs presigned file links and embed sessions. Rotating it invalidates links already handed out. |
| `DOCREADER_TRANSPORT` | WeKnora App | grpc | DocReader transport. |
| `STREAM_MANAGER_TYPE` | WeKnora App | redis | Keep chat streams in Redis (upstream compose default) so they survive reconnects. |
| `WEKNORA_ADMIN_EMAIL` | WeKnora App | admin@weknora.local | Your first login. On the first boot the start script creates this account on a loopback only instance (public signup is never open) and the App promotes it to system administrator. Change it to your own email before deploying if you like. |
| `DISABLE_REGISTRATION` | WeKnora App | true | true closes public self registration (registration_mode=invite_only): teammates join through invite links or accounts a system administrator creates. Upstream defaults to false, which on a public URL lets anyone create an account and a workspace. |
| `LOCAL_STORAGE_BASE_DIR` | WeKnora App | /data/files | Local storage root. This is the service volume mount; keep them equal. |
| `WEKNORA_ADMIN_PASSWORD` | WeKnora App | (secret) | Generated password for WEKNORA_ADMIN_EMAIL, only used on the first boot. The Wk1 prefix guarantees the letter plus digit password policy. Change the password in the UI after logging in; editing this variable later has no effect. |
| `WEKNORA_SANDBOX_DOCKER_ENABLED` | WeKnora App | false | Docker sandbox backend for agent skills and shell_exec. Must stay false on Railway: there is no Docker socket. Knowledge base Q&A and agents without skills do not need a sandbox; E2B or Cube sandboxes can be configured per workspace instead. |
| `REDIS_URL` | Redis | - | Private-network connection string (IPv6, includes port, db 0). Convenience only: WeKnora reads REDIS_ADDR and REDIS_PASSWORD. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password (passed to redis-server --requirepass by the start command). |
| `TZ` | DocReader | UTC | Timezone. |
| `LOG_LEVEL` | DocReader | info | Log level. |
| `MAX_FILE_SIZE_MB` | DocReader | - | Largest file DocReader accepts over gRPC. Follows the App's value. |
| `DOCREADER_GRPC_PORT` | DocReader | 50051 | gRPC listen port. The server binds [::] (dual stack), which Railway's IPv6 private network needs. |
| `DOCREADER_GRPC_MAX_WORKERS` | DocReader | 4 | Concurrent parse requests (upstream default). |
| `POSTGRES_DB` | Postgres | weknora | Database name. The ParadeDB bootstrap installs pgvector and pg_search into it on first init. |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser (WeKnora's migrations create extensions). |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy (for psql / GUI clients). |
| `DATABASE_PRIVATE_URL` | Postgres | - | Same as DATABASE_URL: private-network connection string. |
| `PORT` | WeKnora | 80 | nginx listen port. The start script rewrites the image's hardcoded `listen 80;` to $PORT on IPv4 and IPv6. Railway's healthcheck and the public domain probe $PORT, so keep it equal to the domain target port. |
| `APP_HOST` | WeKnora | - | Private hostname of the WeKnora App (Go backend). The start script routes /api, /files, /r, /mcp and the embed policy check to it through a runtime DNS resolver, so App redeploys (new private IP) never leave nginx pointing at a dead address. |
| `APP_PORT` | WeKnora | - | WeKnora App listen port (8080). |
| `APP_SCHEME` | WeKnora | http | Protocol nginx uses to reach the App on the private network. |
| `DEFAULT_LOCALE` | WeKnora | en-US | Default UI language for users who have not picked one: en-US, zh-CN, ja-JP, ko-KR or ru-RU. Upstream falls back to zh-CN. |
| `MAX_FILE_SIZE_MB` | WeKnora | - | Upload size cap enforced by nginx (client_max_body_size) and shown in the UI. Follows the App's value. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | WeKnora | true | Alpine (musl) image: required for *.railway.internal DNS resolution from this container. |

## Configuration

- **Start command:** `sh -c 'echo IyEvYmluL2Jhc2gKIyBXZUtub3JhIEFwcCBsYXVuY2hlciBmb3IgUmFpbHdheSAoYmFzZTY0IGluIHRoZSAiV2VLbm9yYSBBcHAiIHN0YXJ0IGNvbW1hbmQpLgojIFdlS25vcmEgaGFzIG5vIGRlZmF1bHQgYWNjb3VudCwgYW5kIHVwc3RyZWFtJ3MgZmlyc3QgYWRtaW4gZmxvdyBuZWVkcyBwdWJsaWMKIyBzaWdudXAgb3Blbi4gU28gd2hpbGUgbm8gc3lzdGVtIGFkbWluIGV4aXN0cywgdGhpcyByZWdpc3RlcnMKIyBXRUtOT1JBX0FETUlOX0VNQUlMIG9uIGEgdGhyb3dhd2F5IGluc3RhbmNlIGJvdW5kIHRvIDEyNy4wLjAuMToxODA4MCBvbmx5LAojIHN0b3BzIGl0LCB0aGVuIHN0YXJ0cyB0aGUgcmVhbCBzZXJ2ZXIgKHNpZ251cCBjbG9zZWQgYnkgRElTQUJMRV9SRUdJU1RSQVRJT04pCiMgd2l0aCBXRUtOT1JBX0JPT1RTVFJBUF9TWVNURU1fQURNSU5fRU1BSUwgc2V0LCB3aGljaCBwcm9tb3RlcyB0aGF0IGFjY291bnQuCiMgQWxzbyB3YWl0cyBmb3IgUG9zdGdyZXMgYW5kIFJlZGlzICh0aGUgYXBwIGV4aXRzIG9uIGEgZmFpbGVkIGZpcnN0IGNvbm5lY3QpLgpzZXQgLWV1byBwaXBlZmFpbApjZCAvYXBwCmxvZygpIHsgZWNobyAid2Vrbm9yYS1yYWlsd2F5OiAkKiI7IH0KOiAiJHtEQl9IT1NUOj99IiAiJHtEQl9QT1JUOj99IiAiJHtEQl9VU0VSOj99IiAiJHtEQl9QQVNTV09SRDo/fSIgIiR7REJfTkFNRTo/fSIgIiR7UkVESVNfQUREUjo/fSIKCiMgMS4gd2FpdCBmb3IgUG9zdGdyZXMgYW5kIFJlZGlzICh1cCB0byAxMCBtaW51dGVzIGVhY2gpCmZvciBpIGluICQoc2VxIDEgMTIwKTsgZG8KICBpZiBwZ19pc3JlYWR5IC1xIC1oICIkREJfSE9TVCIgLXAgIiREQl9QT1JUIiAtVSAiJERCX1VTRVIiIC1kICIkREJfTkFNRSIgLXQgNTsgdGhlbiBicmVhazsgZmkKICBpZiBbICIkaSIgPSAxMjAgXTsgdGhlbiBsb2cgIlBvc3RncmVzICREQl9IT1NUOiREQl9QT1JUIG5vdCByZWFkeSI7IGV4aXQgMTsgZmkKICBzbGVlcCA1CmRvbmUKZm9yIGkgaW4gJChzZXEgMSAxMjApOyBkbwogIGlmIChleGVjIDM8PiIvZGV2L3RjcC8ke1JFRElTX0FERFIlOip9LyR7UkVESVNfQUREUiMjKjp9IikgMj4vZGV2L251bGw7IHRoZW4gYnJlYWs7IGZpCiAgaWYgWyAiJGkiID0gMTIwIF07IHRoZW4gbG9nICJSZWRpcyAkUkVESVNfQUREUiBub3QgcmVhY2hhYmxlIjsgZXhpdCAxOyBmaQogIHNsZWVwIDUKZG9uZQpsb2cgIlBvc3RncmVzIGFuZCBSZWRpcyByZWFjaGFibGUiCgojIDIuIG5vIHN5c3RlbSBhZG1pbiB5ZXQ6IGNyZWF0ZSBXRUtOT1JBX0FETUlOX0VNQUlMIG9uIGEgbG9vcGJhY2stb25seSBpbnN0YW5jZQpOPSIkKFBHUEFTU1dPUkQ9IiREQl9QQVNTV09SRCIgUEdDT05ORUNUX1RJTUVPVVQ9MTAgcHNxbCAtaCAiJERCX0hPU1QiIC1wICIkREJfUE9SVCIgLVUgIiREQl9VU0VSIiAtZCAiJERCX05BTUUiIC10QXEgXAogIC1jICJTRUxFQ1QgY291bnQoKikgRlJPTSB1c2VycyBXSEVSRSBpc19zeXN0ZW1fYWRtaW4gQU5EIGRlbGV0ZWRfYXQgSVMgTlVMTCIgMj4vZGV2L251bGwgfCB0ciAtZCAnWzpzcGFjZTpdJyB8fCB0cnVlKSIKaWYgWyAtbiAiJHtXRUtOT1JBX0FETUlOX0VNQUlMOi19IiBdICYmIFsgIiR7TjotMH0iID0gIjAiIF07IHRoZW4KICA6ICIke1dFS05PUkFfQURNSU5fUEFTU1dPUkQ6P1dFS05PUkFfQURNSU5fUEFTU1dPUkQgaXMgcmVxdWlyZWQgb24gZmlyc3QgYm9vdH0iCiAgbG9nICJubyBzeXN0ZW0gYWRtaW5pc3RyYXRvciB5ZXQ6IGNyZWF0aW5nICRXRUtOT1JBX0FETUlOX0VNQUlMIG9uIDEyNy4wLjAuMToxODA4MCIKICBlbnYgLXUgV0VLTk9SQV9CT09UU1RSQVBfU1lTVEVNX0FETUlOX0VNQUlMIC11IFdFS05PUkFfQURNSU5fUEFTU1dPUkQgXAogICAgU0VSVkVSX0hPU1Q9MTI3LjAuMC4xIFNFUlZFUl9QT1JUPTE4MDgwIERJU0FCTEVfUkVHSVNUUkFUSU9OPWZhbHNlIC4vc2NyaXB0cy9kb2NrZXItZW50cnlwb2ludC5zaCAuL1dlS25vcmEgJgogIFBJRD0kIQogIHVwPSIiCiAgZm9yIGkgaW4gJChzZXEgMSAzMDApOyBkbwogICAgaWYgY3VybCAtZnMgLW8gL2Rldi9udWxsIC0tbWF4LXRpbWUgNSBodHRwOi8vMTI3LjAuMC4xOjE4MDgwL2hlYWx0aDsgdGhlbiB1cD0xOyBicmVhazsgZmkKICAgIGlmICEga2lsbCAtMCAiJFBJRCIgMj4vZGV2L251bGw7IHRoZW4gYnJlYWs7IGZpCiAgICBzbGVlcCAyCiAgZG9uZQogIENPREU9MDAwCiAgaWYgWyAtbiAiJHVwIiBdOyB0aGVuCiAgICBDT0RFPSIkKHB5dGhvbjMgLWMgJ2ltcG9ydCBqc29uLG9zOyBwcmludChqc29uLmR1bXBzKHsidXNlcm5hbWUiOiBvcy5lbnZpcm9uLmdldCgiV0VLTk9SQV9BRE1JTl9VU0VSTkFNRSIpIG9yICJhZG1pbiIsICJlbWFpbCI6IG9zLmVudmlyb25bIldFS05PUkFfQURNSU5fRU1BSUwiXSwgInBhc3N3b3JkIjogb3MuZW52aXJvblsiV0VLTk9SQV9BRE1JTl9QQVNTV09SRCJdfSkpJyBcCiAgICAgIHwgY3VybCAtcyAtbyAvdG1wL3JlZ2lzdGVyLmpzb24gLXcgJyV7aHR0cF9jb2RlfScgLS1tYXgtdGltZSA2MCAtSCAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uJyBcCiAgICAgICAgICAtWCBQT1NUIGh0dHA6Ly8xMjcuMC4wLjE6MTgwODAvYXBpL3YxL2F1dGgvcmVnaXN0ZXIgLS1kYXRhLWJpbmFyeSBALSB8fCB0cnVlKSIKICBmaQogIGtpbGwgLVRFUk0gIiRQSUQiIDI+L2Rldi9udWxsIHx8IHRydWUKICB3YWl0ICIkUElEIiAyPi9kZXYvbnVsbCB8fCB0cnVlCiAgaWYgWyAiJENPREUiID0gMjAxIF07IHRoZW4KICAgIGxvZyAiYWRtaW4gYWNjb3VudCAkV0VLTk9SQV9BRE1JTl9FTUFJTCBjcmVhdGVkIgogIGVsaWYgZ3JlcCAtcWkgJ2VtYWlsIGFscmVhZHkgZXhpc3RzJyAvdG1wL3JlZ2lzdGVyLmpzb24gMj4vZGV2L251bGw7IHRoZW4KICAgIGxvZyAiYWRtaW4gYWNjb3VudCAkV0VLTk9SQV9BRE1JTl9FTUFJTCBhbHJlYWR5IGV4aXN0cyIKICBlbHNlCiAgICBsb2cgImNyZWF0aW5nICRXRUtOT1JBX0FETUlOX0VNQUlMIGZhaWxlZCAoSFRUUCAkQ09ERSk6ICQoaGVhZCAtYyAzMDAgL3RtcC9yZWdpc3Rlci5qc29uIDI+L2Rldi9udWxsIHx8IGVjaG8gJ2luc3RhbmNlIG5ldmVyIGJlY2FtZSBoZWFsdGh5LCBzZWUgYWJvdmUnKSIKICAgIGV4aXQgMQogIGZpCiAgcm0gLWYgL3RtcC9yZWdpc3Rlci5qc29uCmZpCgojIDMuIHRoZSByZWFsIHNlcnZlciAodGhlIGJvb3RzdHJhcCBlbWFpbCBvbmx5IHByb21vdGVzIHdoaWxlIG5vIGFkbWluIGV4aXN0cykKaWYgWyAtbiAiJHtXRUtOT1JBX0FETUlOX0VNQUlMOi19IiBdICYmIFsgLXogIiR7V0VLTk9SQV9CT09UU1RSQVBfU1lTVEVNX0FETUlOX0VNQUlMOi19IiBdOyB0aGVuCiAgZXhwb3J0IFdFS05PUkFfQk9PVFNUUkFQX1NZU1RFTV9BRE1JTl9FTUFJTD0iJFdFS05PUkFfQURNSU5fRU1BSUwiCmZpCnVuc2V0IFdFS05PUkFfQURNSU5fUEFTU1dPUkQKbG9nICJzdGFydGluZyBXZUtub3JhIG9uICR7U0VSVkVSX0hPU1Q6LTAuMC4wLjB9OiR7U0VSVkVSX1BPUlQ6LTgwODB9LCBESVNBQkxFX1JFR0lTVFJBVElPTj0ke0RJU0FCTEVfUkVHSVNUUkFUSU9OOi1mYWxzZX0iCmV4ZWMgLi9zY3JpcHRzL2RvY2tlci1lbnRyeXBvaW50LnNoIC4vV2VLbm9yYQo= | base64 -d > /tmp/railway-start.sh && exec bash /tmp/railway-start.sh'`
- **Healthcheck:** `/health`
- **Volume:** `/data/files`
- **Start command:** `sh -c 'docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --save 60 1 --dir /data --maxmemory-policy noeviction --bind :: 0.0.0.0'`
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'echo IyEvYmluL3NoCiMgV2VLbm9yYSB3ZWIgZnJvbnQgZG9vciAod2VjaGF0b3BlbmFpL3dla25vcmEtdWkgbmdpbngpIGZvciBSYWlsd2F5LgojIEVtYmVkZGVkIGJhc2U2NCBpbiB0aGUgIldlS25vcmEiIHN0YXJ0IGNvbW1hbmQuIFBhdGNoZXMgdGhlIGltYWdlJ3Mgb3duIG5naW54CiMgdGVtcGxhdGUgaW4gcGxhY2UsIHRoZW4gaGFuZHMgb3ZlciB0byB0aGUgaW1hZ2UgZW50cnlwb2ludCB1bmNoYW5nZWQKIyAoaXQgd3JpdGVzIGNvbmZpZy5qcywgcnVucyBlbnZzdWJzdCBhbmQgZXhlY3MgbmdpbngpLgojCiMgV2h5IGl0IGV4aXN0czoKIyAgICogVGhlIHRlbXBsYXRlIHByb3hpZXMgdG8gJHtBUFBfU0NIRU1FfTovLyR7QVBQX0hPU1R9OiR7QVBQX1BPUlR9IGFzIGEKIyAgICAgbGl0ZXJhbCBob3N0LCB3aGljaCBuZ2lueCByZXNvbHZlcyBvbmNlIGF0IHN0YXJ0dXAgYW5kIHRoZW4gcGlucy4gT24KIyAgICAgUmFpbHdheSB0aGUgV2VLbm9yYSBBcHAgcHJpdmF0ZSBJUCBjaGFuZ2VzIG9uIGV2ZXJ5IHJlZGVwbG95LCBhbmQgdGhlIG5hbWUKIyAgICAgZG9lcyBub3QgcmVzb2x2ZSBhdCBhbGwgdW50aWwgdGhlIEFwcCBoYXMgZGVwbG95ZWQsIHNvIG5naW54IHdvdWxkIGVpdGhlcgojICAgICByZWZ1c2UgdG8gc3RhcnQgb3Iga2VlcCBwcm94eWluZyB0byBhIGRlYWQgYWRkcmVzcy4gRXZlcnkgcHJveHlfcGFzcyBpcwojICAgICByZXdyaXR0ZW4gdG8gZ28gdGhyb3VnaCBhIHZhcmlhYmxlIHBsdXMgYSBydW50aW1lIGByZXNvbHZlcmAgKHJlYWQgZnJvbQojICAgICAvZXRjL3Jlc29sdi5jb25mKSwgd2hpY2ggcmUtcmVzb2x2ZXMgcGVyIHJlcXVlc3QuCiMgICAqIGBsaXN0ZW4gODA7YCBpcyBJUHY0IG9ubHkgYW5kIGhhcmRjb2RlZDsgaXQgYmVjb21lcyAkUE9SVCBvbiBJUHY0IGFuZCBJUHY2LgojICAgKiBSYWlsd2F5IHRlcm1pbmF0ZXMgVExTIGF0IHRoZSBlZGdlLCBzbyBuZ2lueCdzICRzY2hlbWUgaXMgaHR0cC4gVGhlIGFwcAojICAgICB1c2VzIFgtRm9yd2FyZGVkLVByb3RvIGZvciBPSURDIGNhbGxiYWNrIFVSTHMsIFNlY3VyZSBjb29raWVzIGFuZCB0aGUgZW1iZWQKIyAgICAgc2FtZS1vcmlnaW4gY2hlY2ssIHNvIHRoZSBlZGdlJ3MgdmFsdWUgaXMgZm9yd2FyZGVkIGluc3RlYWQuCnNldCAtZXUKClBPUlQ9IiR7UE9SVDotODB9IgpBUFBfSE9TVD0iJHtBUFBfSE9TVDo/QVBQX0hPU1QgbXVzdCBiZSB0aGUgcHJpdmF0ZSBkb21haW4gb2YgdGhlIFdlS25vcmEgQXBwIHNlcnZpY2V9IgpBUFBfUE9SVD0iJHtBUFBfUE9SVDotODA4MH0iCkFQUF9TQ0hFTUU9IiR7QVBQX1NDSEVNRTotaHR0cH0iClQ9L2V0Yy9uZ2lueC90ZW1wbGF0ZXMvZGVmYXVsdC5jb25mLnRlbXBsYXRlClA9L2V0Yy9uZ2lueC9hcGktcHJveHkuY29uZgoKTlM9IiQoYXdrICcvXm5hbWVzZXJ2ZXIvIHsgcHJpbnQgJDI7IGV4aXQgfScgL2V0Yy9yZXNvbHYuY29uZikiCmNhc2UgIiROUyIgaW4gKjoqKSBOUz0iWyROU10iIDs7IGVzYWMKaWYgWyAteiAiJE5TIiBdOyB0aGVuIGVjaG8gIndla25vcmEtd2ViOiBubyBuYW1lc2VydmVyIGluIC9ldGMvcmVzb2x2LmNvbmYiID4mMjsgZXhpdCAxOyBmaQoKIyBJUHY2IGxpc3RlbmVyIG9ubHkgd2hlbiB0aGUga2VybmVsIGhhcyBJUHY2IChhbHdheXMgb24gUmFpbHdheTsgb2Z0ZW4gb2ZmIGluIGxvY2FsIERvY2tlcikuCkxJU1RFTj0ibGlzdGVuICR7UE9SVH07IgppZiBbIC1mIC9wcm9jL25ldC9pZl9pbmV0NiBdOyB0aGVuIExJU1RFTj0iJExJU1RFTiBsaXN0ZW4gWzo6XToke1BPUlR9OyI7IGZpCgpzZWQgLWkgXAogIC1lICJzfF4gICAgbGlzdGVuIDgwO3wgICAgJHtMSVNURU59fCIgXAogIC1lICdzfHByb3h5X3Bhc3MgXCR7QVBQX1NDSEVNRX06Ly9cJHtBUFBfSE9TVH06XCR7QVBQX1BPUlR9L2FwaS92MS9lbWJlZC1mcmFtZS1wb2xpY3k7fHByb3h5X3Bhc3MgJHdla25vcmFfYXBwL2FwaS92MS9lbWJlZC1mcmFtZS1wb2xpY3k7fCcgXAogIC1lICdzfHByb3h5X3Bhc3MgXCR7QVBQX1NDSEVNRX06Ly9cJHtBUFBfSE9TVH06XCR7QVBQX1BPUlR9L2ZpbGVzO3xwcm94eV9wYXNzICR3ZWtub3JhX2FwcCRyZXF1ZXN0X3VyaTt8JyBcCiAgLWUgJ3N8cHJveHlfcGFzcyBcJHtBUFBfU0NIRU1FfTovL1wke0FQUF9IT1NUfTpcJHtBUFBfUE9SVH0vYXBpLzt8cHJveHlfcGFzcyAkd2Vrbm9yYV9hcHAkcmVxdWVzdF91cmk7fCcgXAogIC1lICdzfHByb3h5X3Bhc3MgXCR7QVBQX1NDSEVNRX06Ly9cJHtBUFBfSE9TVH06XCR7QVBQX1BPUlR9O3xwcm94eV9wYXNzICR3ZWtub3JhX2FwcDt8JyBcCiAgLWUgJ3N8WC1Gb3J3YXJkZWQtUHJvdG8gXCRzY2hlbWU7fFgtRm9yd2FyZGVkLVByb3RvICR3ZWtub3JhX3Byb3RvO3wnIFwKICAiJFQiCnNlZCAtaSAtZSAnc3xYLUZvcndhcmRlZC1Qcm90byBcJHNjaGVtZTt8WC1Gb3J3YXJkZWQtUHJvdG8gJHdla25vcmFfcHJvdG87fCcgIiRQIgoKY2F0ID4gL2V0Yy9uZ2lueC9jb25mLmQvMDEtcmFpbHdheS5jb25mIDw8RU9GCnJlc29sdmVyICROUyB2YWxpZD0xMHM7CnJlc29sdmVyX3RpbWVvdXQgNXM7Cm1hcCBcJGhvc3QgXCR3ZWtub3JhX2FwcCB7IGRlZmF1bHQgIiR7QVBQX1NDSEVNRX06Ly8ke0FQUF9IT1NUfToke0FQUF9QT1JUfSI7IH0KbWFwIFwkaHR0cF94X2ZvcndhcmRlZF9wcm90byBcJHdla25vcmFfcHJvdG8geyBkZWZhdWx0IFwkaHR0cF94X2ZvcndhcmRlZF9wcm90bzsgIiIgXCRzY2hlbWU7IH0KRU9GCgppZiBncmVwIC1xICdwcm94eV9wYXNzIFwke0FQUF8nICIkVCI7IHRoZW4KICBlY2hvICJ3ZWtub3JhLXdlYjogV0FSTklORyBhIHByb3h5X3Bhc3MgaW4gJFQgd2FzIG5vdCByZXdyaXR0ZW4gKGltYWdlIGNoYW5nZWQ/KTsgaXQgd2lsbCBwaW4gdGhlIEFwcCBJUCIgPiYyCmZpCmVjaG8gIndla25vcmEtd2ViOiAkTElTVEVOIGJhY2tlbmQgJHtBUFBfU0NIRU1FfTovLyR7QVBQX0hPU1R9OiR7QVBQX1BPUlR9IHZpYSByZXNvbHZlciAkTlMiCmV4ZWMgL2RvY2tlci1lbnRyeXBvaW50LnNoCg== | base64 -d > /tmp/railway-start.sh && exec sh /tmp/railway-start.sh'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/weknora-rag-paradedb)
