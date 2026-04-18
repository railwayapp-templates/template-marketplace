# Deploy LobeChat | Multi-Model AI/LLM Support on Railway

Self Host Lobechat. Private AI chat with 40+ providers, RAG, plugins & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobechat)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobechat?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Deploy LobeChat on Railway to run your own private AI chat platform with multi-model support, knowledge bases, and plugin extensibility. Self-host LobeChat with full control over your data and AI provider keys — no vendor lock-in.

This Railway template deploys a production-ready LobeChat stack with PostgreSQL (via ParadeDB with pgvector), Redis for caching and sessions, and RustFS for S3-compatible file storage. All services are pre-configured with secure inter-service networking and persistent volumes.

LobeChat is an open-source AI chat framework with 70,000+ GitHub stars, built with Next.js. It serves as a private alternative to ChatGPT with full multi-model support.

- **Multi-Provider AI**: Connect 40+ providers — OpenAI, Claude, Gemini, DeepSeek, Ollama, AWS Bedrock, Azure, Mistral, Groq, and more
- **Knowledge Base (RAG)**: Upload documents, build searchable knowledge bases with pgvector-powered retrieval
- **Plugin Ecosystem**: 10,000+ skills via Function Calling, MCP marketplace integration
- **Multi-Modal**: Vision (image recognition), text-to-speech, speech-to-text, image generation
- **Better Auth**: Built-in authentication with email/password, OAuth, SSO support
- **Artifacts & Thinking**: Advanced reasoning visualization and interactive code artifacts

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostgreSQL | `paradedb/paradedb:latest-pg17` | Database |
| RustFS Init | `alpine:latest` | Worker |
| RustFS | `rustfs/rustfs:latest` | Web service |
| LobeChat | `lobehub/lobehub` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | PostgreSQL | lobechat | Default database name |
| `POSTGRES_PASSWORD` | PostgreSQL | (secret) | Database password |
| `RUSTFS_ACCESS_KEY` | RustFS Init | - | S3 access key (matches RustFS) |
| `RUSTFS_SECRET_KEY` | RustFS Init | (secret) | S3 secret key (matches RustFS) |
| `RUSTFS_ACCESS_KEY` | RustFS | admin | S3 access key |
| `RUSTFS_SECRET_KEY` | RustFS | (secret) | S3 secret key |
| `RUSTFS_CONSOLE_ENABLE` | RustFS | true | Enable admin console |
| `APP_URL` | LobeChat | - | Public-facing application URL |
| `REDIS_TLS` | LobeChat | 0 | Disable Redis TLS (internal network) |
| `REDIS_URL` | LobeChat | - | Redis connection string |
| `S3_BUCKET` | LobeChat | lobe | S3 bucket name |
| `S3_SET_ACL` | LobeChat | 0 | Disable S3 ACL setting |
| `AUTH_SECRET` | LobeChat | (secret) | Session token signing secret |
| `S3_ENDPOINT` | LobeChat | - | RustFS public URL for file storage |
| `DATABASE_URL` | LobeChat | - | PostgreSQL connection string |
| `REDIS_PREFIX` | LobeChat | lobechat | Redis key prefix |
| `S3_ACCESS_KEY` | LobeChat | admin | S3 access key ID |
| `INTERNAL_APP_URL` | LobeChat | http://localhost:3210 | Internal server-to-server URL |
| `S3_ACCESS_KEY_ID` | LobeChat | admin | S3 access key ID (alias) |
| `KEY_VAULTS_SECRET` | LobeChat | (secret) | Encryption key for user API vaults |
| `S3_ENABLE_PATH_STYLE` | LobeChat | 1 | Use path-style S3 URLs |
| `S3_SECRET_ACCESS_KEY` | LobeChat | (secret) | S3 secret access key |
| `LLM_VISION_IMAGE_USE_BASE64` | LobeChat | 1 | Send images as base64 to LLMs |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'wget -q https://dl.min.io/client/mc/release/linux-amd64/mc -O /tmp/mc && chmod +x /tmp/mc && for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do /tmp/mc alias set rustfs http://RustFS.railway.internal:9000 $RUSTFS_ACCESS_KEY $RUSTFS_SECRET_KEY 2>/dev/null && break; sleep 5; done && /tmp/mc mb rustfs/lobe --ignore-existing && printf "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"AWS\":[\"*\"]},\"Action\":[\"s3:GetObject\"],\"Resource\":[\"arn:aws:s3:::lobe/*\"]}],\"Version\":\"2012-10-17\"}" > /tmp/bp.json && /tmp/mc anonymous set-json /tmp/bp.json rustfs/lobe && echo Init done && sleep infinity'`
- **Start command:** `/bin/sh -c 'mkdir -p /data/lobe && exec rustfs --access-key $RUSTFS_ACCESS_KEY --secret-key $RUSTFS_SECRET_KEY /data'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/lobechat)
