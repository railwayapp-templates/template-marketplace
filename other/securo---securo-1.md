# Deploy securo on Railway

Privacy-first personal finance with budgets, investments and invoices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/securo-1)

## About

Securo is an open-source, privacy-first personal finance manager for tracking accounts, transactions, budgets, investments, invoices, and household financial goals. It keeps data under your control while providing a polished browser interface, multi-user workspaces, bank integrations, reports, imports, and secure local authentication for self-hosted financial organization.

Railway runs the pinned official GHCR frontend and backend images alongside pgvector PostgreSQL and Redis. The frontend receives the public domain and proxies API requests over Railway private networking, while volumes preserve the database and uploaded attachments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.10.1` | Database |
| postgres | `pgvector/pgvector:0.8.6-pg16` | Database |
| backend | `ghcr.io/securo-finance/securo-backend:0.15.1` | Database |
| frontend | `ghcr.io/securo-finance/securo-frontend:0.15.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | postgres | securo |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PORT` | backend | 8000 |
| `DEBUG` | backend | false |
| `APP_NAME` | backend | Securo |
| `ALGORITHM` | backend | HS256 |
| `LOGO_SIZE` | backend | 128 |
| `SECRET_KEY` | backend | (secret) |
| `OIDC_SCOPES` | backend | openid email profile |
| `FX_SYNC_MODE` | backend | on_demand |
| `OIDC_ENABLED` | backend | false |
| `AGENTS_ENABLED` | backend | false |
| `OIDC_SYNC_ROLES` | backend | false |
| `DEFAULT_CURRENCY` | backend | USD |
| `OIDC_ROLES_CLAIM` | backend | groups |
| `STORAGE_PROVIDER` | backend | local |
| `WEBAUTHN_RP_NAME` | backend | Securo |
| `SIMPLEFIN_API_URL` | backend | https://beta-bridge.simplefin.org |
| `SIMPLEFIN_ENABLED` | backend | false |
| `LOCAL_AUTH_ENABLED` | backend | true |
| `OIDC_AUTO_REGISTER` | backend | true |
| `OIDC_CLIENT_SECRET` | backend | (secret) |
| `OIDC_PROVIDER_NAME` | backend | OIDC |
| `STORAGE_LOCAL_PATH` | backend | /app/data/attachments |
| `TRUSTED_PROXY_HOPS` | backend | 1 |
| `PLUGGY_CLIENT_SECRET` | backend | (secret) |
| `REGISTRATION_ENABLED` | backend | true |
| `SUPPORTED_CURRENCIES` | backend | USD,EUR,GBP,BRL,CAD,AUD,CHF,ARS,JPY,MXN,INR,SEK,DKK,NOK,PLN,CZK,HUF,RON,CRC,IDR,COP,CLP,DOP,RUB,GTQ,PHP,UAH,NZD,VND,SGD,AZN,TRY,PKR |
| `AGENTS_MCP_JWT_SECRET` | backend | (secret) |
| `AGENTS_OPENAI_API_KEY` | backend | (secret) |
| `STORAGE_S3_SECRET_KEY` | backend | (secret) |
| `AGENTS_EMBEDDING_MODEL` | backend | sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2 |
| `AGENTS_OLLAMA_BASE_URL` | backend | http://ollama:11434 |
| `ENABLE_BANKING_API_URL` | backend | https://api.enablebanking.com |
| `TESOURO_DIRETO_ENABLED` | backend | true |
| `AGENTS_DEFAULT_PROVIDER` | backend | ollama |
| `AGENTS_ANTHROPIC_API_KEY` | backend | (secret) |
| `STORAGE_MAX_FILE_SIZE_MB` | backend | 10 |
| `AGENTS_EMBEDDING_PROVIDER` | backend | native |
| `STORAGE_ALLOWED_EXTENSIONS` | backend | jpg,jpeg,png,webp,gif,heic,pdf |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | backend | (secret) |
| `OIDC_REQUIRE_VERIFIED_EMAIL` | backend | true |
| `AGENTS_MCP_EXTERNAL_TTL_DAYS` | backend | 90 |
| `AGENTS_OPENAI_COMPAT_API_KEY` | backend | (secret) |
| `OIDC_EXISTING_USER_LINK_MODE` | backend | disabled |
| `AGENTS_KNOWLEDGE_STORAGE_PATH` | backend | /app/data/agent_knowledge |
| `WEBAUTHN_CHALLENGE_TTL_SECONDS` | backend | 300 |
| `STORAGE_MAX_ATTACHMENTS_PER_INVOICE` | backend | 20 |
| `STORAGE_MAX_ATTACHMENTS_PER_TRANSACTION` | backend | 10 |
| `PORT` | frontend | 8080 |
| `NGINX_ENTRYPOINT_LOCAL_RESOLVERS` | frontend | 1 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'alembic upgrade head && exec uvicorn app.main:app --host 0.0.0.0 --port 8000'`
- **Volume:** `/app/data/attachments`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/securo-1)
