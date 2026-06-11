# Deploy EvoCRM on Railway

CRM to customer support, sales, AI agents, automations, contacts, and more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bold-high)

## About

EvoCRM is an open-source, self-hosted conversational CRM designed to work with Evolution API. It helps businesses manage WhatsApp conversations, customer support, sales workflows, contacts, team assignments, AI agents, and automations from a centralized platform.

Hosting EvoCRM involves deploying the application services required to run the CRM, connect it with Evolution API, and persist customer, conversation, user, and automation data. A typical deployment may include the EvoCRM application, a database, authentication configuration, environment variables, and an active Evolution API instance for WhatsApp connectivity. Depending on your setup, you may also need storage, background workers, Redis, or AI provider credentials for automation and agent features.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| evo-crm-community | [eduin1178/evo-crm-community](https://github.com/eduin1178/evo-crm-community) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | - |
| `PORT` | 8000 | - |
| `DEBUG` | false | Core microservice |
| `API_URL` | http://localhost:8000 | - |
| `APP_URL` | http://localhost:8000 | ============================================================================= |
| `DB_HOST` | postgres | - |
| `DB_NAME` | evo_community | - |
| `DB_PORT` | 5432 | - |
| `DB_USER` | (secret) | - |
| `LOG_SIZE` | 500 | Sign ups |
| `REDIS_DB` | 0 | - |
| `API_TITLE` | Agent Processor Community | - |
| `LOG_LEVEL` | info | - |
| `RAILS_ENV` | development | - |
| `REDIS_SSL` | false | - |
| `REDIS_TTL` | 3600 | Tool cache |
| `REDIS_URL` | redis://:evoai_redis_pass@redis:6379 | - |
| `SMTP_PORT` | 1025 | - |
| `DB_SSLMODE` | disable | Database connection pool |
| `MFA_ISSUER` | EvoAI | Email sender |
| `REDIS_HOST` | redis | - |
| `REDIS_PORT` | 6379 | - |
| `API_VERSION` | 1.0.0 | - |
| `BACKEND_URL` | http://localhost:3000 | - |
| `DB_PASSWORD` | (secret) | - |
| `LISTEN_ADDR` | 0.0.0.0:8080 | - |
| `SMTP_DOMAIN` | evoai-community.local | - |
| `CORS_ORIGINS` | http://localhost:3000,http://localhost:5173,http://127.0.0.1:5173 | Disable telemetry |
| `FRONTEND_URL` | http://localhost:5173 | Public URL of the auth service accessible from the browser (used for ActiveStorage avatar URLs) |
| `SMTP_ADDRESS` | mailhog | - |
| `VITE_API_URL` | http://localhost:3000 | - |
| `VITE_APP_ENV` | development | - |
| `JWT_ALGORITHM` | HS256 | Evolution integration URL (points to CRM service) |
| `POSTGRES_HOST` | postgres | - |
| `POSTGRES_PORT` | 5432 | - |
| `SMTP_PASSWORD` | (secret) | Storage — local filesystem in development |
| `SMTP_USERNAME` | (secret) | - |
| `ENCRYPTION_KEY` | XoQPOBw2FrzjQS11utERG9qO2MsAnXFxlhIns_uUxRk= | Used by: auth, crm, processor (service-to-service authentication) |
| `EVO_AI_CRM_URL` | http://evo-crm:3000 | Server |
| `JWT_SECRET_KEY` | (secret) | Used by: core-service, processor (API key encryption) |
| `REDIS_PASSWORD` | (secret) | ============================================================================= |
| `API_DESCRIPTION` | Agent Processor Community for Evo AI | - |
| `BOT_RUNTIME_URL` | http://evo-bot-runtime:8080 | - |
| `FB_VERIFY_TOKEN` | (secret) | - |
| `SECRET_KEY_BASE` | (secret) | - |
| `TOOLS_CACHE_TTL` | 3600 | CRM API URL (for CRM tools) |
| `AI_PROCESSOR_URL` | http://evo-processor:8000 | - |
| `AUTH_SERVICE_URL` | http://localhost:3001 | Doorkeeper JWT (OAuth2 tokens) |
| `CORE_SERVICE_URL` | http://evo-core:5555/api/v1 | App URL (public-facing) |
| `ORGANIZATION_URL` | https://evoai.evoapicloud.com | Database (Processor uses connection string format) |
| `REDIS_KEY_PREFIX` | a2a: | - |
| `DB_MAX_IDLE_CONNS` | 10 | - |
| `DB_MAX_OPEN_CONNS` | 100 | - |
| `DISABLE_TELEMETRY` | true | License — headless auto-activation by email |
| `EVO_AUTH_BASE_URL` | http://evo-auth:3001 | AI Processor URL |
| `ORGANIZATION_NAME` | Evo AI | - |
| `POSTGRES_DATABASE` | evo_community | ============================================================================= |
| `POSTGRES_PASSWORD` | (secret) | - |
| `POSTGRES_USERNAME` | (secret) | - |
| `RAILS_MAX_THREADS` | 5 | FRONTEND_URL - public URL of the CRM frontend. Used by the auth service for |
| `VITE_AUTH_API_URL` | http://localhost:3001 | - |
| `BOT_RUNTIME_SECRET` | (secret) | - |
| `DOORKEEPER_JWT_AUD` | [] | MFA issuer name shown in authenticator apps |
| `DOORKEEPER_JWT_ISS` | evo-auth-service | - |
| `EVOLUTION_BASE_URL` | http://evo-crm:3000 | EvoAuth integration |
| `VITE_EVOAI_API_URL` | http://localhost:5555 | - |
| `ENABLE_INBOX_EVENTS` | true | Facebook API version (if using Facebook channel) |
| `EVOAI_CRM_API_TOKEN` | (secret) | ============================================================================= |
| `MAILER_SENDER_EMAIL` | noreply@evoai-community.local | SMTP — uses Mailhog in development (no real emails sent) |
| `RAILS_LOG_TO_STDOUT` | true | - |
| `SIDEKIQ_CONCURRENCY` | 10 | ============================================================================= |
| `SMTP_AUTHENTICATION` | plain | - |
| `TOOLS_CACHE_ENABLED` | true | - |
| `AI_PROCESSOR_API_KEY` | (secret) | - |
| `AI_PROCESSOR_VERSION` | v1 | ============================================================================= |
| `DB_CONN_MAX_LIFETIME` | 1h | - |
| `EVO_AUTH_SERVICE_URL` | http://evo-auth:3001 | CORS — allow frontend and API origins |
| `FACEBOOK_API_VERSION` | v23.0 | ============================================================================= |
| `VITE_TINYMCE_API_KEY` | (secret) | ============================================================================= |
| `DB_CONN_MAX_IDLE_TIME` | 30m | JWT — must match SECRET_KEY_BASE |
| `ENABLE_ACCOUNT_SIGNUP` | true | Push notifications relay |
| `ACTIVE_STORAGE_SERVICE` | local | Sidekiq |
| `AI_CALL_TIMEOUT_SECONDS` | 30 | Bot Runtime integration (used by CRM service to connect to bot-runtime) |
| `EVO_AI_CORE_SERVICE_URL` | http://evo-core:5555 | - |
| `DOORKEEPER_JWT_ALGORITHM` | hs256 | - |
| `ENABLE_PUSH_RELAY_SERVER` | true | Inbox events |
| `VITE_AGENT_PROCESSOR_URL` | http://localhost:8000 | - |
| `DOORKEEPER_JWT_SECRET_KEY` | (secret) | - |
| `SMTP_ENABLE_STARTTLS_AUTO` | false | - |
| `POSTGRES_CONNECTION_STRING` | postgresql://postgres:evoai_dev_password@postgres:5432/evo_community | Redis (Processor uses individual vars) |
| `BOT_RUNTIME_POSTBACK_BASE_URL` | http://evo-crm:3000 | ============================================================================= |

**Category:** Automation · **Languages:** HTML, Shell, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/bold-high)
