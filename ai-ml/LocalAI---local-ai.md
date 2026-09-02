# Deploy LocalAI on Railway

Run open-source AI models on your own server through one API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/local-ai)

## About

LocalAI is a drop-in replacement for the OpenAI API that runs open-weight models on hardware you control. It speaks the OpenAI, Anthropic and Ollama wire formats, so an app written against `openai` or `@ai-sdk` keeps working after one base-URL change — and it covers more than chat: embeddings, reranking, speech-to-text, text-to-speech and image generation sit behind the same endpoint. Teams reach for it when prompts contain data that must not leave their infrastructure, when per-token pricing stops making sense, or to pin a model version a provider is free to retire.

Deploy LocalAI on Railway and you get the project's own distributed topology rather than a single container. The `localai` service is the public API and web interface: it authenticates callers, holds the model catalogue and runs the SmartRouter that places each request. The `worker` service self-registers with the frontend, then downloads whichever inference engine a request needs and loads the model. `nats` carries control-plane events between the two, and managed PostgreSQL holds accounts, API keys, the node registry and the job store. Adding capacity means adding a worker service, not resizing one box.

![Diagram of the LocalAI frontend, worker, NATS and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788213755/localai-architecture.png)

LocalAI wraps inference engines — llama.cpp, vLLM, diffusers, whisper.cpp and others — behind one HTTP surface and one model catalogue. Nothing is compiled in: engines are pulled as backends only when a model needs them, which is why the base image is a few hundred megabytes.

Key features:

- OpenAI-, Anthropic- and Ollama-compatible endpoints, with streaming, function calling and structured output
- A 1,300-model gallery plus installs from Hugging Face, Ollama or any OCI registry
- Text, embeddings, reranking, transcription, speech synthesis and image generation from one server
- A web interface with chat, a model manager, agents, usage stats and tracing
- Scale-out through worker nodes with idle-first scheduling and LRU eviction

The frontend never runs a model itself. It stores state in PostgreSQL, publishes backend-install and file-staging events over NATS, and forwards each call to whichever worker holds the model — or to an idle one, which stages the files over HTTP.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nats | `nats:2-alpine` | Database |
| localai | `localai/localai:latest` | Web service |
| worker | `localai/localai:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | nats | 8222 | Monitoring port Railway probes |
| `PORT` | localai | 8080 | HTTP port Railway probes |
| `GODEBUG` | localai | netdns=go | Pure-Go DNS resolver |
| `LOCALAI_AUTH` | localai | true | Required by distributed mode |
| `LOCALAI_ADDRESS` | localai | :8080 | Server listen address |
| `LOCALAI_API_KEY` | localai | (secret) | Bearer token for API clients |
| `LOCALAI_THREADS` | localai | 8 | CPU threads per inference process |
| `LOCALAI_BASE_URL` | localai | - | Public URL for callbacks and links |
| `LOCALAI_NATS_URL` | localai | - | Control-plane message bus |
| `LOCALAI_DATA_PATH` | localai | /data/localai | Jobs, cache and agent state |
| `LOCALAI_CONFIG_DIR` | localai | /data/configuration | Dynamic config directory |
| `LOCALAI_DISTRIBUTED` | localai | true | Enable worker-based routing |
| `LOCALAI_MODELS_PATH` | localai | /data/models | Model files on the volume |
| `LOCALAI_UPLOAD_PATH` | localai | /data/uploads | Files API uploads |
| `LOCALAI_CONTEXT_SIZE` | localai | 4096 | Default context window |
| `LOCALAI_BACKENDS_PATH` | localai | /data/backends | Inference engines on the volume |
| `LOCALAI_WATCHDOG_IDLE` | localai | true | Unload idle backends |
| `LOCALAI_VRAM_WARM_LIMIT` | localai | 0 | Skip gallery metadata probing at boot |
| `LOCALAI_AUTH_HMAC_SECRET` | localai | (secret) | API key hashing secret |
| `LOCALAI_AUTH_DATABASE_URL` | localai | - | Auth and cluster state database |
| `LOCALAI_REGISTRATION_MODE` | localai | approval | New signups need admin approval |
| `LOCALAI_AUTO_APPROVE_NODES` | localai | true | Skip manual approval of workers |
| `LOCALAI_REGISTRATION_TOKEN` | localai | (secret) | Token workers present to join |
| `LOCALAI_WATCHDOG_IDLE_TIMEOUT` | localai | 15m | Idle window before unloading |
| `LOCALAI_GENERATED_CONTENT_PATH` | localai | /data/generated | Generated images, audio and video |
| `LOCALAI_AGENT_POOL_DATABASE_URL` | localai | - | Agent vector store database |
| `LOCALAI_AGENT_POOL_VECTOR_ENGINE` | localai | postgres | Agent vector store backend |
| `LOCALAI_REGISTRATION_REQUIRE_AUTH` | localai | true | Refuse to start without that token |
| `PORT` | worker | 50050 | File-transfer port Railway probes |
| `GODEBUG` | worker | netdns=go | Pure-Go DNS resolver |
| `LOCALAI_THREADS` | worker | 8 | CPU threads per inference process |
| `LOCALAI_NATS_URL` | worker | - | Control-plane message bus |
| `LOCALAI_DATA_PATH` | worker | /data/localai | Worker state directory |
| `LOCALAI_HTTP_ADDR` | worker | [::]:50050 | File-transfer listen address |
| `LOCALAI_NODE_NAME` | worker | railway-worker | Stable name in the node registry |
| `LOCALAI_SERVE_ADDR` | worker | [::]:50051 | gRPC listen address |
| `LOCALAI_MODELS_PATH` | worker | /data/models | Model files on the volume |
| `LOCALAI_REGISTER_TO` | worker | - | Frontend to register with |
| `LOCALAI_CONTEXT_SIZE` | worker | 4096 | Default context window |
| `LOCALAI_BACKENDS_PATH` | worker | /data/backends | Inference engines on the volume |
| `LOCALAI_ADVERTISE_ADDR` | worker | worker.railway.internal:50051 | gRPC address the frontend dials |
| `LOCALAI_HEARTBEAT_INTERVAL` | worker | 10s | Heartbeat to the frontend |
| `LOCALAI_REGISTRATION_TOKEN` | worker | (secret) | Must match the frontend token |
| `LOCALAI_ADVERTISE_HTTP_ADDR` | worker | worker.railway.internal:50050 | File-transfer address advertised |
| `LOCALAI_REGISTRATION_REQUIRE_AUTH` | worker | true | Refuse to start without that token |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Start command:** `docker-entrypoint.sh nats-server --addr :: --port 4222 --http_port 8222 --name localai-nats`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'mkdir -p /data/backends /data/models /data/localai && exec /entrypoint.sh worker'`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/local-ai)
