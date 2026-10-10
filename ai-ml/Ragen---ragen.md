# Deploy Ragen on Railway

Self-hosted RAG chat with cited answers, Ragen Brain, MCP and admin panel.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ragen)

## About

Ragen is a self-hosted AI assistant that answers from your own documents, with citations to the passages it used. Upload PDFs, Word files and spreadsheets to a knowledge base and ask questions in chat. Ragen Brain turns those documents into reviewed knowledge pages, and an MCP server brings your assistants into Claude Desktop and Cursor.

The template deploys the whole stack into one project, and the only value you enter is an OpenRouter API key. Chat runs on Claude Sonnet 5.5, Claude Haiku 5.5 rephrases questions and summarises documents, and OpenAI text-embedding-3-small embeds them, all through that one key. Every secret is generated for you. After the first deploy, open the `web` service's domain and create your account: the first account becomes the platform administrator, and the template ships no demo credentials. Back up `ENCRYPTION_MASTER_KEY` from the `web` variables: chat messages are encrypted under it and cannot be recovered without it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | `ghcr.io/webamigos/ragen-worker:2.52.1` | Worker |
| vault | `ghcr.io/webamigos/ragen-token-vault:latest` | Worker |
| admin | `ghcr.io/webamigos/ragen-admin:2.52.1` | Web service |
| web | `ghcr.io/webamigos/ragen-web:2.52.1` | Web service |
| mcp | `ghcr.io/webamigos/ragen-mcp:2.52.1` | Web service |
| docling | [webamigos/RagenAI](https://github.com/webamigos/RagenAI) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| Postgres-TokenVault | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| api | `ghcr.io/webamigos/ragen-api:2.52.1` | Worker |
| qdrant | `qdrant/qdrant` | Database |
| migrate | `ghcr.io/webamigos/ragen-migrate:2.52.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | worker | - | Redis connection string for the job queue, a Railway reference. Leave as is. |
| `S3_REGION` | worker | - | Reference to web's S3_REGION. Leave as is. |
| `QDRANT_URL` | worker | - | Qdrant vector store on the private network. Leave as is. |
| `SECRET_KEY` | worker | (secret) | Reference to web's SECRET_KEY. Leave as is. |
| `TARGET_ENV` | worker | production | Runtime environment name. Leave as production. |
| `DOCLING_URL` | worker | - | Docling document parser on the private network. Leave as is. |
| `VECTOR_SIZE` | worker | - | Reference to web's VECTOR_SIZE. Leave as is. |
| `DATABASE_URL` | worker | - | Connection string of this app's Postgres, a Railway reference. Leave as is. |
| `DEFAULT_MODEL` | worker | - | Reference to web's DEFAULT_MODEL. Leave as is. |
| `RAGEN_APP_URL` | worker | - | Web app on the private network. Leave as is. |
| `SCORING_MODEL` | worker | - | Reference to web's SCORING_MODEL. Leave as is. |
| `SUMMARY_MODEL` | worker | - | Reference to web's SUMMARY_MODEL. Leave as is. |
| `REPHRASE_MODEL` | worker | - | Reference to web's REPHRASE_MODEL. Leave as is. |
| `S3_BUCKET_NAME` | worker | - | Reference to web's S3_BUCKET_NAME. Leave as is. |
| `DOCUMENT_PARSER` | worker | docling | Document parser. 'docling' uses the Docling service in this template. |
| `S3_ENDPOINT_URL` | worker | - | Reference to web's S3_ENDPOINT_URL. Leave as is. |
| `EMBEDDINGS_MODEL` | worker | - | Reference to web's EMBEDDINGS_MODEL. Leave as is. |
| `S3_ACCESS_KEY_ID` | worker | - | Reference to web's S3_ACCESS_KEY_ID. Leave as is. |
| `STORAGE_PROVIDER` | worker | - | Reference to web's STORAGE_PROVIDER. Leave as is. |
| `WORKER_SECRET_KEY` | worker | (secret) | Reference to web's WORKER_SECRET_KEY. Leave as is. |
| `OPENROUTER_API_KEY` | worker | (secret) | Reference to web's OPENROUTER_API_KEY; enter the key on web. |
| `ENCRYPTION_PROVIDER` | worker | - | Reference to web's ENCRYPTION_PROVIDER. Leave as is. |
| `S3_SECRET_ACCESS_KEY` | worker | (secret) | Reference to web's S3_SECRET_ACCESS_KEY. Leave as is. |
| `ENCRYPTION_MASTER_KEY` | worker | - | Reference to web's ENCRYPTION_MASTER_KEY. Leave as is. |
| `DEFAULT_MODEL_PROVIDER` | worker | - | Reference to web's DEFAULT_MODEL_PROVIDER. Leave as is. |
| `HOST` | vault | :: | Address the service binds to; '::' listens on Railway's IPv6 private network. Leave as is. |
| `PORT` | vault | 3100 | Port the service listens on. Leave as is. |
| `NODE_ENV` | vault | production | Node.js environment. Leave as production. |
| `TARGET_ENV` | vault | production | Runtime environment name. Leave as production. |
| `DATABASE_URL` | vault | - | Connection string of this app's Postgres, a Railway reference. Leave as is. |
| `ENCRYPTION_KEY` | vault | - | Generated at deploy. Leave as is. |
| `RAGEN_TOKEN_VAULT_SERVICE_SECRET` | vault | (secret) | Generated at deploy. Leave as is. |
| `PORT` | admin | 3200 | Port the service listens on. Leave as is. |
| `TARGET_ENV` | admin | production | Runtime environment name. Leave as production. |
| `DATABASE_URL` | admin | - | Connection string of this app's Postgres, a Railway reference. Leave as is. |
| `RAGEN_APP_URL` | admin | - | Web app on the private network. Leave as is. |
| `BETTER_AUTH_URL` | admin | - | Public URL that sign-in runs on, from the Railway domain. Change it with a custom domain. |
| `BETTER_AUTH_SECRET` | admin | (secret) | Generated at deploy. Leave as is. |
| `OPENROUTER_API_KEY` | admin | (secret) | Reference to web's OPENROUTER_API_KEY; enter the key on web. |
| `INTERNAL_API_SECRET` | admin | (secret) | Reference to web's INTERNAL_API_SECRET. Leave as is. |
| `RAGEN_TOKEN_VAULT_URL` | admin | (secret) | Token vault on the private network. Leave as is. |
| `RAGEN_TOKEN_VAULT_SERVICE_SECRET` | admin | (secret) | Shared secret of the token vault, a Railway reference. Leave as is. |
| `PORT` | web | 3000 | Port the service listens on. Leave as is. |
| `APP_URL` | web | - | Public URL of the web app, from its Railway domain. Change it if you add a custom domain. |
| `REDIS_URL` | web | - | Redis connection string for the job queue, a Railway reference. Leave as is. |
| `S3_REGION` | web | - | Bucket region, from the Railway bucket. Leave as is. |
| `QDRANT_URL` | web | - | Qdrant vector store on the private network. Leave as is. |
| `SECRET_KEY` | web | (secret) | Generated at deploy. Leave as is. |
| `TARGET_ENV` | web | production | Runtime environment name. Leave as production. |
| `VECTOR_SIZE` | web | 1536 | Embedding dimension; must match EMBEDDINGS_MODEL (1536 for text-embedding-3-small). |
| `DATABASE_URL` | web | - | Connection string of this app's Postgres, a Railway reference. Leave as is. |
| `DEFAULT_MODEL` | web | claude-sonnet-5-5-openrouter | Model for chat answers, a route name from the gateway route table. Default: Claude Sonnet 5.5 via OpenRouter. |
| `SCORING_MODEL` | web | claude-haiku-5-5-openrouter | Model that scores documents for RAG readiness. Default: Claude Haiku 5.5 via OpenRouter. |
| `SUMMARY_MODEL` | web | claude-haiku-5-5-openrouter | Model that summarises documents at upload. Default: Claude Haiku 5.5 via OpenRouter. |
| `REPHRASE_MODEL` | web | claude-haiku-5-5-openrouter | Model that rewrites each question before search. Default: Claude Haiku 5.5 via OpenRouter. |
| `S3_BUCKET_NAME` | web | - | Bucket name, from the Railway bucket. Leave as is. |
| `BETTER_AUTH_URL` | web | - | Public URL that sign-in runs on, from the Railway domain. Change it with a custom domain. |
| `S3_ENDPOINT_URL` | web | - | Bucket endpoint, from the Railway bucket. Leave as is. |
| `EMBEDDINGS_MODEL` | web | text-embedding-3-small-openrouter | Embedding model for documents and questions. Changing it later requires re-indexing every document. |
| `S3_ACCESS_KEY_ID` | web | - | Bucket credentials, from the Railway bucket. Leave as is. |
| `STORAGE_PROVIDER` | web | s3 | Where uploaded files are stored. 's3' uses the Railway bucket in this template. |
| `WORKER_SECRET_KEY` | web | (secret) | Generated at deploy. Leave as is. |
| `BETTER_AUTH_SECRET` | web | (secret) | Generated at deploy. Leave as is. |
| `MCP_SERVICE_SECRET` | web | (secret) | Generated at deploy. Leave as is. |
| `OPENROUTER_API_KEY` | web | (secret) | Your OpenRouter API key (openrouter.ai/keys). The one value you must enter: it serves chat, document summaries and embeddings. |
| `ENCRYPTION_PROVIDER` | web | local | Where the encryption key lives. 'local' keeps it in ENCRYPTION_MASTER_KEY; use a KMS for production. |
| `INTERNAL_API_SECRET` | web | (secret) | Generated at deploy. Leave as is. |
| `SESSION_AUTH_SECRET` | web | (secret) | Generated at deploy. Leave as is. |
| `RAGEN_MCP_PUBLIC_URL` | web | - | Public URL of the MCP server, shown to users who connect Claude Desktop or Cursor. |
| `S3_SECRET_ACCESS_KEY` | web | (secret) | Bucket credentials, from the Railway bucket. Leave as is. |
| `ENCRYPTION_MASTER_KEY` | web | - | Generated key that encrypts chat messages. Back it up after the first deploy: if it is lost, encrypted messages cannot be recovered. |
| `RAGEN_TOKEN_VAULT_URL` | web | (secret) | Token vault on the private network. Leave as is. |
| `DEFAULT_MODEL_PROVIDER` | web | litellm | Pricing namespace for usage accounting, not a gateway. Leave as litellm. |
| `RAGEN_API_INTERNAL_URL` | web | - | Ragen API on the private network. Leave as is. |
| `PUBLIC_LINK_TOKEN_SECRET` | web | (secret) | Generated at deploy. Leave as is. |
| `RAGEN_TOKEN_VAULT_SERVICE_SECRET` | web | (secret) | Shared secret of the token vault, a Railway reference. Leave as is. |
| `PORT` | mcp | 3300 | Port the service listens on. Leave as is. |
| `TARGET_ENV` | mcp | production | Runtime environment name. Leave as production. |
| `RAGEN_API_URL` | mcp | - | Ragen API on the private network, which the MCP server calls. Leave as is. |
| `MCP_OAUTH_ENABLED` | mcp | false | OAuth for MCP clients. Off: clients authenticate with a Ragen API key. |
| `PORT` | docling | 5001 | Port the service listens on. Leave as is. |
| `DOCLING_SERVE_ENABLE_UI` | docling | false | Docling's built-in web UI. Off, since the service is private. |
| `POSTGRES_DB` | Postgres | railway | Postgres database name. Leave as is. |
| `DATABASE_URL` | Postgres | - | Connection string of this app's Postgres, a Railway reference. Leave as is. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres user. Leave as is. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres password, generated at deploy. Leave as is. |
| `REDISHOST` | Redis | - | Redis host on the private network. Leave as is. |
| `REDISPORT` | Redis | 6379 | Redis port. Leave as is. |
| `REDISUSER` | Redis | default | Redis user. Leave as is. |
| `REDIS_URL` | Redis | - | Redis connection string for the job queue, a Railway reference. Leave as is. |
| `REDISPASSWORD` | Redis | (secret) | Redis password, generated. Leave as is. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated at deploy. Leave as is. |
| `POSTGRES_DB` | Postgres-TokenVault | railway | Postgres database name. Leave as is. |
| `DATABASE_URL` | Postgres-TokenVault | - | Connection string of this app's Postgres, a Railway reference. Leave as is. |
| `POSTGRES_USER` | Postgres-TokenVault | (secret) | Postgres user. Leave as is. |
| `POSTGRES_PASSWORD` | Postgres-TokenVault | (secret) | Postgres password, generated at deploy. Leave as is. |
| `PORT` | api | 3001 | Port the service listens on. Leave as is. |
| `REDIS_URL` | api | - | Redis connection string for the job queue, a Railway reference. Leave as is. |
| `S3_REGION` | api | - | Reference to web's S3_REGION. Leave as is. |
| `QDRANT_URL` | api | - | Qdrant vector store on the private network. Leave as is. |
| `SECRET_KEY` | api | (secret) | Reference to web's SECRET_KEY. Leave as is. |
| `TARGET_ENV` | api | production | Runtime environment name. Leave as production. |
| `VECTOR_SIZE` | api | - | Reference to web's VECTOR_SIZE. Leave as is. |
| `DATABASE_URL` | api | - | Connection string of this app's Postgres, a Railway reference. Leave as is. |
| `DEFAULT_MODEL` | api | - | Reference to web's DEFAULT_MODEL. Leave as is. |
| `SCORING_MODEL` | api | - | Reference to web's SCORING_MODEL. Leave as is. |
| `SUMMARY_MODEL` | api | - | Reference to web's SUMMARY_MODEL. Leave as is. |
| `REPHRASE_MODEL` | api | - | Reference to web's REPHRASE_MODEL. Leave as is. |
| `S3_BUCKET_NAME` | api | - | Reference to web's S3_BUCKET_NAME. Leave as is. |
| `S3_ENDPOINT_URL` | api | - | Reference to web's S3_ENDPOINT_URL. Leave as is. |
| `EMBEDDINGS_MODEL` | api | - | Reference to web's EMBEDDINGS_MODEL. Leave as is. |
| `S3_ACCESS_KEY_ID` | api | - | Reference to web's S3_ACCESS_KEY_ID. Leave as is. |
| `STORAGE_PROVIDER` | api | - | Reference to web's STORAGE_PROVIDER. Leave as is. |
| `WORKER_SECRET_KEY` | api | (secret) | Reference to web's WORKER_SECRET_KEY. Leave as is. |
| `MCP_SERVICE_SECRET` | api | (secret) | Reference to web's MCP_SERVICE_SECRET. Leave as is. |
| `OPENROUTER_API_KEY` | api | (secret) | Reference to web's OPENROUTER_API_KEY; enter the key on web. |
| `ENCRYPTION_PROVIDER` | api | - | Reference to web's ENCRYPTION_PROVIDER. Leave as is. |
| `INTERNAL_API_SECRET` | api | (secret) | Reference to web's INTERNAL_API_SECRET. Leave as is. |
| `SESSION_AUTH_SECRET` | api | (secret) | Reference to web's SESSION_AUTH_SECRET. Leave as is. |
| `S3_SECRET_ACCESS_KEY` | api | (secret) | Reference to web's S3_SECRET_ACCESS_KEY. Leave as is. |
| `ENCRYPTION_MASTER_KEY` | api | - | Reference to web's ENCRYPTION_MASTER_KEY. Leave as is. |
| `RAGEN_TOKEN_VAULT_URL` | api | (secret) | Token vault on the private network. Leave as is. |
| `DEFAULT_MODEL_PROVIDER` | api | - | Reference to web's DEFAULT_MODEL_PROVIDER. Leave as is. |
| `RAGEN_APP_INTERNAL_URL` | api | - | Web app on the private network. Leave as is. |
| `RAGEN_TOKEN_VAULT_SERVICE_SECRET` | api | (secret) | Shared secret of the token vault, a Railway reference. Leave as is. |
| `PORT` | qdrant | 6333 | Qdrant's HTTP port; Railway's healthcheck probes PORT. |
| `TARGET_ENV` | migrate | production | Runtime environment name. Leave as production. |
| `DATABASE_URL` | migrate | - | Connection string of this app's Postgres, a Railway reference. Leave as is. |
| `RAGEN_DEFAULT_FEATURES` | migrate | brain | Feature keys switched on at first install, comma-separated. 'brain' enables Ragen Brain. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/healthcheck`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/readyz`
- **Volume:** `/qdrant/storage`

**Category:** AI/ML · **Languages:** TypeScript, HTML, JavaScript, CSS, PLpgSQL, Dockerfile, Python, Shell, HCL, Go Template

[View on Railway →](https://railway.com/deploy/ragen)
