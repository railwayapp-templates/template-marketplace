# Deploy Evo CRM | Open-Source AI Customer Service with WhatsApp on Railway

AI agents, WhatsApp and omnichannel inbox on your own Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evo-crm)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/evo-crm?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=evo-crm)

[Evo CRM Community](https://github.com/evolution-foundation/evo-crm-community) is the open-source customer service platform from the team behind Evolution API: an omnichannel inbox (WhatsApp, Instagram, Facebook, Telegram, email, SMS, website widget, API), AI agents that answer customers, contacts, pipelines, products, automations, journeys and campaigns. This template runs the full Community stack, release 1.1.0, from the official images, with a bundled Evolution API for WhatsApp and uploads in a Railway bucket.

This is an unofficial template. It is not made, endorsed or supported by Evolution Foundation. "Evo CRM" and "Evolution API" are their trademarks and are used here only to name the software.

Evo CRM is a set of microservices behind an nginx gateway. This template runs fifteen services and a bucket:

- **Frontend**: the official `evoapicloud/evo-ai-frontend-community:1.1.0` image, the web app you log in to.
- **Gateway**: the official `evo-crm-gateway:1.1.0` image with a small patch: it resolves service names on Railway's private network, sees real client IPs for its rate limits, and adds a `/evoflow` route so the Campaigns page can reach EvoFlow from the browser.
- **Auth** and **Auth-Worker**: users, roles, sessions, OAuth and MFA (Rails + Sidekiq).
- **CRM** and **CRM-Worker**: conversations, contacts, channels, pipelines, automations (Rails + Sidekiq).
- **Core**: AI agents, folders, API keys and MCP servers (Go).
- **Processor**: runs the AI agents (Python, Google ADK + LiteLLM).
- **Bot-Runtime**: the bot pipeline between the inbox and the agents (Go).
- **EvoFlow**: segments, journeys and campaigns (NestJS), with **ClickHouse** for contact events and **RabbitMQ** as its broker.
- **Evolution-API**: the official `evoapicloud/evolution-api:v2.3.7` image, pre-wired so a new WhatsApp channel connects to it without any URL or key to copy.
- **Postgres 16 with pgvector** and **Redis 7**, each with its own volume.
- **A Railway bucket** for attachments, avatars and chat media.

Migrations run on boot: Auth first, then the CRM waits for Auth's health check before running its own. Every secret (Rails keys, JWT keys, the Fernet key that encrypts AI provider credentials, internal tokens, database, Redis, ClickHouse and RabbitMQ passwords, the Evolution API key) is generated per deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | [two-workspaces/evo-crm](https://github.com/two-workspaces/evo-crm) (root: /clickhouse) | Database |
| Gateway | [two-workspaces/evo-crm](https://github.com/two-workspaces/evo-crm) (root: /gateway) | Web service |
| Frontend | `evoapicloud/evo-ai-frontend-community:1.1.0` | Web service |
| Bot-Runtime | `evoapicloud/evo-bot-runtime:1.1.0` | Worker |
| Auth-Worker | `evoapicloud/evo-auth-service-community:1.1.0` | Worker |
| Core | `evoapicloud/evo-ai-core-service-community:1.1.0` | Worker |
| RabbitMQ | `rabbitmq:4.1.8-alpine` | Database |
| Postgres | `pgvector/pgvector:0.8.7-pg16` | Database |
| CRM-Worker | `evoapicloud/evo-ai-crm-community:1.1.0` | Worker |
| EvoFlow | [two-workspaces/evo-crm](https://github.com/two-workspaces/evo-crm) (root: /evoflow) | Worker |
| Redis | `redis:7.4.11-alpine` | Database |
| Auth | `evoapicloud/evo-auth-service-community:1.1.0` | Worker |
| Processor | `evoapicloud/evo-ai-processor-community:1.1.0` | Worker |
| CRM | `evoapicloud/evo-ai-crm-community:1.1.0` | Worker |
| Evolution-API | `evoapicloud/evolution-api:v2.3.7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | ClickHouse password for EvoFlow |
| `PORT` | Gateway | 3030 | nginx port - leave as is |
| `CRM_UPSTREAM` | Gateway | - | CRM upstream |
| `AUTH_UPSTREAM` | Gateway | - | Auth upstream |
| `CORE_UPSTREAM` | Gateway | - | Core upstream |
| `EVOFLOW_UPSTREAM` | Gateway | - | EvoFlow upstream |
| `PROCESSOR_UPSTREAM` | Gateway | - | Processor upstream |
| `BOT_RUNTIME_UPSTREAM` | Gateway | - | Bot runtime upstream |
| `PORT` | Frontend | 80 | nginx port - leave as is |
| `VITE_WS_URL` | Frontend | - | Public API URL (Gateway) |
| `VITE_API_URL` | Frontend | - | Public API URL (Gateway) |
| `VITE_APP_ENV` | Frontend | production | Production CSP |
| `VITE_AUTH_API_URL` | Frontend | - | Public API URL (Gateway) |
| `VITE_EVOAI_API_URL` | Frontend | - | Public API URL (Gateway) |
| `VITE_EVOFLOW_API_URL` | Frontend | - | EvoFlow through the Gateway (Campaigns) |
| `VITE_AGENT_PROCESSOR_URL` | Frontend | - | Public API URL (Gateway) |
| `PORT` | Bot-Runtime | 8080 | Port the bot runtime listens on - leave as is |
| `REDIS_URL` | Bot-Runtime | - | Redis on the private network |
| `LISTEN_ADDR` | Bot-Runtime | 0.0.0.0:8080 | Listen address |
| `AI_PROCESSOR_URL` | Bot-Runtime | - | Processor on the private network |
| `BOT_RUNTIME_SECRET` | Bot-Runtime | (secret) | Shared secret between the CRM and the bot runtime |
| `MEDIA_HOST_ALLOWLIST` | Bot-Runtime | - | Hosts the agent may fetch incoming media from (API domain + Railway bucket). Add your custom API domain here |
| `AI_CALL_TIMEOUT_SECONDS` | Bot-Runtime | 90 | Per-turn AI timeout |
| `RAILS_ENV` | Auth-Worker | production | Rails environment |
| `REDIS_URL` | Auth-Worker | - | Redis on the private network |
| `SMTP_PORT` | Auth-Worker | - | SMTP_PORT from the Auth service |
| `MFA_ISSUER` | Auth-Worker | EvoCRM | Name shown in authenticator apps |
| `BACKEND_URL` | Auth-Worker | - | Public URL of the API (the Gateway service) |
| `SMTP_DOMAIN` | Auth-Worker | - | SMTP_DOMAIN from the Auth service |
| `CORS_ORIGINS` | Auth-Worker | - | Origins allowed to call the API |
| `FRONTEND_URL` | Auth-Worker | - | Public URL of the Evo CRM app (the Frontend service) |
| `SMTP_ADDRESS` | Auth-Worker | - | SMTP_ADDRESS from the Auth service |
| `POSTGRES_HOST` | Auth-Worker | - | Postgres on the private network |
| `POSTGRES_PORT` | Auth-Worker | 5432 | Postgres port |
| `SMTP_PASSWORD` | Auth-Worker | (secret) | SMTP_PASSWORD from the Auth service |
| `SMTP_USERNAME` | Auth-Worker | (secret) | SMTP_USERNAME from the Auth service |
| `JWT_SECRET_KEY` | Auth-Worker | (secret) | JWT_SECRET_KEY from the Auth service |
| `RUN_MIGRATIONS` | Auth-Worker | false | The Auth service runs the migrations |
| `STORAGE_REGION` | Auth-Worker | - | Railway bucket region |
| `SECRET_KEY_BASE` | Auth-Worker | (secret) | SECRET_KEY_BASE from the Auth service |
| `POSTGRES_SSLMODE` | Auth-Worker | disable | Plain connection - traffic stays on Railway's private network |
| `STORAGE_ENDPOINT` | Auth-Worker | - | Railway bucket S3 endpoint |
| `PGCONNECT_TIMEOUT` | Auth-Worker | 5 | libpq connect timeout in seconds, so Rails recovers quickly after a Postgres redeploy |
| `POSTGRES_DATABASE` | Auth-Worker | - | Shared Evo CRM database |
| `POSTGRES_PASSWORD` | Auth-Worker | (secret) | Postgres password |
| `POSTGRES_USERNAME` | Auth-Worker | (secret) | Postgres user |
| `DOORKEEPER_JWT_ISS` | Auth-Worker | evo-auth-service | OAuth token issuer |
| `EVOAI_CRM_API_TOKEN` | Auth-Worker | (secret) | EVOAI_CRM_API_TOKEN from the Auth service |
| `MAILER_SENDER_EMAIL` | Auth-Worker | - | MAILER_SENDER_EMAIL from the Auth service |
| `SIDEKIQ_CONCURRENCY` | Auth-Worker | 10 | Background job threads |
| `SMTP_AUTHENTICATION` | Auth-Worker | plain | SMTP auth method |
| `STORAGE_BUCKET_NAME` | Auth-Worker | - | Railway bucket name |
| `STORAGE_ACCESS_KEY_ID` | Auth-Worker | - | Railway bucket access key |
| `ACTIVE_STORAGE_SERVICE` | Auth-Worker | s3_compatible | Uploads and chat media go to the Railway bucket |
| `OAUTH_TOKEN_EXPIRES_IN` | Auth-Worker | (secret) | Session token lifetime in seconds (8 h) |
| `DOORKEEPER_JWT_ALGORITHM` | Auth-Worker | hs256 | OAuth token algorithm |
| `DOORKEEPER_JWT_SECRET_KEY` | Auth-Worker | (secret) | DOORKEEPER_JWT_SECRET_KEY from the Auth service |
| `SMTP_ENABLE_STARTTLS_AUTO` | Auth-Worker | true | Use STARTTLS |
| `STORAGE_SECRET_ACCESS_KEY` | Auth-Worker | (secret) | Railway bucket secret key |
| `PORT` | Core | 5555 | Port Core listens on - leave as is |
| `DB_HOST` | Core | - | Postgres on the private network |
| `DB_NAME` | Core | - | Shared Evo CRM database |
| `DB_PORT` | Core | 5432 | Postgres port |
| `DB_USER` | Core | (secret) | Postgres user |
| `DB_SSLMODE` | Core | disable | Private network |
| `DB_PASSWORD` | Core | (secret) | Postgres password |
| `JWT_ALGORITHM` | Core | HS256 | JWT algorithm |
| `ENCRYPTION_KEY` | Core | - | Fernet key that encrypts AI provider keys and API keys. BACK IT UP - changing it makes stored credentials unreadable |
| `JWT_SECRET_KEY` | Core | (secret) | JWT_SECRET_KEY from the Auth service |
| `SECRET_KEY_BASE` | Core | (secret) | SECRET_KEY_BASE from the Auth service |
| `AI_PROCESSOR_URL` | Core | - | Processor on the private network |
| `DB_MAX_IDLE_CONNS` | Core | 10 | Pool |
| `DB_MAX_OPEN_CONNS` | Core | 100 | Pool |
| `EVO_AUTH_BASE_URL` | Core | - | Auth on the private network |
| `EVOLUTION_BASE_URL` | Core | - | CRM on the private network |
| `AI_PROCESSOR_VERSION` | Core | v1 | Processor API version |
| `DB_CONN_MAX_LIFETIME` | Core | 1h | Pool |
| `DB_CONN_MAX_IDLE_TIME` | Core | 30m | Pool |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | RabbitMQ password |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | RabbitMQ user |
| `POSTGRES_DB` | Postgres | evo_community | Evo CRM database |
| `POSTGRES_USER` | Postgres | (secret) | Superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres password |
| `LOG_LEVEL` | CRM-Worker | - | LOG_LEVEL from the CRM service |
| `RAILS_ENV` | CRM-Worker | - | RAILS_ENV from the CRM service |
| `REDIS_URL` | CRM-Worker | - | REDIS_URL from the CRM service |
| `SMTP_PORT` | CRM-Worker | - | SMTP_PORT from the CRM service |
| `BACKEND_URL` | CRM-Worker | - | BACKEND_URL from the CRM service |
| `SMTP_DOMAIN` | CRM-Worker | - | SMTP_DOMAIN from the CRM service |
| `CORS_ORIGINS` | CRM-Worker | - | CORS_ORIGINS from the CRM service |
| `FRONTEND_URL` | CRM-Worker | - | FRONTEND_URL from the CRM service |
| `SMTP_ADDRESS` | CRM-Worker | - | SMTP_ADDRESS from the CRM service |
| `POSTGRES_HOST` | CRM-Worker | - | POSTGRES_HOST from the CRM service |
| `POSTGRES_PORT` | CRM-Worker | - | POSTGRES_PORT from the CRM service |
| `SMTP_PASSWORD` | CRM-Worker | (secret) | SMTP_PASSWORD from the CRM service |
| `SMTP_USERNAME` | CRM-Worker | (secret) | SMTP_USERNAME from the CRM service |
| `JWT_SECRET_KEY` | CRM-Worker | (secret) | JWT_SECRET_KEY from the CRM service |
| `RUN_MIGRATIONS` | CRM-Worker | false | The CRM service runs the migrations |
| `STORAGE_REGION` | CRM-Worker | - | STORAGE_REGION from the CRM service |
| `BOT_RUNTIME_URL` | CRM-Worker | - | BOT_RUNTIME_URL from the CRM service |
| `SECRET_KEY_BASE` | CRM-Worker | (secret) | SECRET_KEY_BASE from the CRM service |
| `EVO_FLOW_API_URL` | CRM-Worker | - | EVO_FLOW_API_URL from the CRM service |
| `EVO_FLOW_ENABLED` | CRM-Worker | - | EVO_FLOW_ENABLED from the CRM service |
| `POSTGRES_SSLMODE` | CRM-Worker | - | POSTGRES_SSLMODE from the CRM service |
| `STORAGE_ENDPOINT` | CRM-Worker | - | STORAGE_ENDPOINT from the CRM service |
| `DISABLE_TELEMETRY` | CRM-Worker | - | DISABLE_TELEMETRY from the CRM service |
| `EVOLUTION_API_URL` | CRM-Worker | - | EVOLUTION_API_URL from the CRM service |
| `PGCONNECT_TIMEOUT` | CRM-Worker | - | PGCONNECT_TIMEOUT from the CRM service |
| `POSTGRES_DATABASE` | CRM-Worker | - | POSTGRES_DATABASE from the CRM service |
| `POSTGRES_PASSWORD` | CRM-Worker | (secret) | POSTGRES_PASSWORD from the CRM service |
| `POSTGRES_USERNAME` | CRM-Worker | (secret) | POSTGRES_USERNAME from the CRM service |
| `BOT_RUNTIME_SECRET` | CRM-Worker | (secret) | BOT_RUNTIME_SECRET from the CRM service |
| `ENABLE_INBOX_EVENTS` | CRM-Worker | - | ENABLE_INBOX_EVENTS from the CRM service |
| `EVOAI_CRM_API_TOKEN` | CRM-Worker | (secret) | EVOAI_CRM_API_TOKEN from the CRM service |
| `MAILER_SENDER_EMAIL` | CRM-Worker | - | MAILER_SENDER_EMAIL from the CRM service |
| `RAILS_LOG_TO_STDOUT` | CRM-Worker | - | RAILS_LOG_TO_STDOUT from the CRM service |
| `SMTP_AUTHENTICATION` | CRM-Worker | - | SMTP_AUTHENTICATION from the CRM service |
| `STORAGE_BUCKET_NAME` | CRM-Worker | - | STORAGE_BUCKET_NAME from the CRM service |
| `EVO_AUTH_SERVICE_URL` | CRM-Worker | - | EVO_AUTH_SERVICE_URL from the CRM service |
| `ENABLE_ACCOUNT_SIGNUP` | CRM-Worker | - | ENABLE_ACCOUNT_SIGNUP from the CRM service |
| `EVO_AI_ENCRYPTION_KEY` | CRM-Worker | - | EVO_AI_ENCRYPTION_KEY from the CRM service |
| `STORAGE_ACCESS_KEY_ID` | CRM-Worker | - | STORAGE_ACCESS_KEY_ID from the CRM service |
| `ACTIVE_STORAGE_SERVICE` | CRM-Worker | - | ACTIVE_STORAGE_SERVICE from the CRM service |
| `EVOLUTION_ADMIN_SECRET` | CRM-Worker | (secret) | EVOLUTION_ADMIN_SECRET from the CRM service |
| `EVO_AI_CORE_SERVICE_URL` | CRM-Worker | - | EVO_AI_CORE_SERVICE_URL from the CRM service |
| `EVO_FLOW_ALLOW_INSECURE` | CRM-Worker | - | EVO_FLOW_ALLOW_INSECURE from the CRM service |
| `ENABLE_PUSH_RELAY_SERVER` | CRM-Worker | - | ENABLE_PUSH_RELAY_SERVER from the CRM service |
| `SMTP_ENABLE_STARTTLS_AUTO` | CRM-Worker | - | SMTP_ENABLE_STARTTLS_AUTO from the CRM service |
| `STORAGE_SECRET_ACCESS_KEY` | CRM-Worker | (secret) | STORAGE_SECRET_ACCESS_KEY from the CRM service |
| `AUTH_APIKEY_INTEGRATION_LOCAL` | CRM-Worker | - | AUTH_APIKEY_INTEGRATION_LOCAL from the CRM service |
| `BOT_RUNTIME_POSTBACK_BASE_URL` | CRM-Worker | - | Where the bot runtime posts replies back |
| `PORT` | EvoFlow | 3334 | Port EvoFlow listens on - leave as is |
| `REDIS_DB` | EvoFlow | 4 | Redis database |
| `REDIS_HOST` | EvoFlow | - | Redis on the private network |
| `REDIS_PORT` | EvoFlow | 6379 | Redis port |
| `RABBITMQ_URL` | EvoFlow | - | RabbitMQ on the private network |
| `REDIS_PASSWORD` | EvoFlow | (secret) | Redis password |
| `CLICKHOUSE_HOST` | EvoFlow | - | ClickHouse on the private network |
| `CLICKHOUSE_PORT` | EvoFlow | 8123 | ClickHouse HTTP port |
| `CLICKHOUSE_TABLE` | EvoFlow | contact_events | Event table |
| `POSTGRES_DB_HOST` | EvoFlow | - | Postgres on the private network |
| `POSTGRES_DB_PORT` | EvoFlow | 5432 | Postgres port |
| `EVOAI_CRM_BASE_URL` | EvoFlow | - | CRM on the private network |
| `CLICKHOUSE_DATABASE` | EvoFlow | evo_campaign | ClickHouse database (created by EvoFlow) |
| `CLICKHOUSE_PASSWORD` | EvoFlow | (secret) | ClickHouse password |
| `CLICKHOUSE_USERNAME` | EvoFlow | (secret) | ClickHouse user |
| `EVOAI_CRM_API_TOKEN` | EvoFlow | (secret) | EVOAI_CRM_API_TOKEN from the Auth service |
| `EVO_AUTH_SERVICE_URL` | EvoFlow | - | Auth on the private network |
| `POSTGRES_DB_DATABASE` | EvoFlow | evo_campaign | EvoFlow's own database (created on first boot) |
| `POSTGRES_DB_PASSWORD` | EvoFlow | (secret) | Postgres password |
| `POSTGRES_DB_USERNAME` | EvoFlow | (secret) | Postgres user |
| `AUTH_APIKEY_INTEGRATION_LOCAL` | EvoFlow | - | Shared key between the CRM and EvoFlow |
| `EVO_AUTH_VALIDATE_TOKEN_ENDPOINT` | EvoFlow | (secret) | Token validation path |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password |
| `PORT` | Auth | 3001 | Port the Auth service listens on - leave as is |
| `RAILS_ENV` | Auth | production | Rails environment |
| `REDIS_URL` | Auth | - | Redis on the private network |
| `SMTP_PORT` | Auth | - | Optional SMTP port, e.g. 587 |
| `MFA_ISSUER` | Auth | EvoCRM | Name shown in authenticator apps |
| `BACKEND_URL` | Auth | - | Public URL of the API (the Gateway service) |
| `SMTP_DOMAIN` | Auth | - | Optional SMTP HELO domain, e.g. yourdomain.com |
| `CORS_ORIGINS` | Auth | - | Origins allowed to call the API |
| `FRONTEND_URL` | Auth | - | Public URL of the Evo CRM app (the Frontend service) |
| `SMTP_ADDRESS` | Auth | - | Optional SMTP host (e.g. smtp.resend.com) for password resets and notifications. Railway blocks outbound SMTP on Free/Trial/Hobby |
| `POSTGRES_HOST` | Auth | - | Postgres on the private network |
| `POSTGRES_PORT` | Auth | 5432 | Postgres port |
| `SMTP_PASSWORD` | Auth | (secret) | Optional SMTP password |
| `SMTP_USERNAME` | Auth | (secret) | Optional SMTP username |
| `JWT_SECRET_KEY` | Auth | (secret) | Signs the JWTs every service verifies |
| `STORAGE_REGION` | Auth | - | Railway bucket region |
| `SECRET_KEY_BASE` | Auth | (secret) | Rails secret shared by Auth, CRM, Core and Processor. Changing it logs everyone out |
| `POSTGRES_SSLMODE` | Auth | disable | Plain connection - traffic stays on Railway's private network |
| `STORAGE_ENDPOINT` | Auth | - | Railway bucket S3 endpoint |
| `PGCONNECT_TIMEOUT` | Auth | 5 | libpq connect timeout in seconds, so Rails recovers quickly after a Postgres redeploy |
| `POSTGRES_DATABASE` | Auth | - | Shared Evo CRM database |
| `POSTGRES_PASSWORD` | Auth | (secret) | Postgres password |
| `POSTGRES_USERNAME` | Auth | (secret) | Postgres user |
| `RAILS_MAX_THREADS` | Auth | 5 | Puma threads |
| `DOORKEEPER_JWT_ISS` | Auth | evo-auth-service | OAuth token issuer |
| `EVOAI_CRM_API_TOKEN` | Auth | (secret) | Internal service-to-service token |
| `MAILER_SENDER_EMAIL` | Auth | - | Optional From address, e.g. Evo CRM <crm@yourdomain.com> |
| `SIDEKIQ_CONCURRENCY` | Auth | 10 | Background job threads |
| `SMTP_AUTHENTICATION` | Auth | plain | SMTP auth method |
| `STORAGE_BUCKET_NAME` | Auth | - | Railway bucket name |
| `STORAGE_ACCESS_KEY_ID` | Auth | - | Railway bucket access key |
| `ACTIVE_STORAGE_SERVICE` | Auth | s3_compatible | Uploads and chat media go to the Railway bucket |
| `OAUTH_TOKEN_EXPIRES_IN` | Auth | (secret) | Session token lifetime in seconds (8 h) |
| `DOORKEEPER_JWT_ALGORITHM` | Auth | hs256 | OAuth token algorithm |
| `DOORKEEPER_JWT_SECRET_KEY` | Auth | (secret) | Signs OAuth access tokens |
| `SMTP_ENABLE_STARTTLS_AUTO` | Auth | true | Use STARTTLS |
| `STORAGE_SECRET_ACCESS_KEY` | Auth | (secret) | Railway bucket secret key |
| `HOST` | Processor | 0.0.0.0 | Listen address |
| `PORT` | Processor | 8000 | Port the Processor listens on - leave as is |
| `DEBUG` | Processor | false | Debug mode |
| `API_URL` | Processor | - | Public API URL |
| `APP_URL` | Processor | - | Public API URL |
| `REDIS_DB` | Processor | 1 | Redis database |
| `API_TITLE` | Processor | Agent Processor Community | OpenAPI title |
| `REDIS_SSL` | Processor | false | Private network |
| `REDIS_TTL` | Processor | 3600 | Cache TTL |
| `REDIS_HOST` | Processor | - | Redis on the private network |
| `REDIS_PORT` | Processor | 6379 | Redis port |
| `API_VERSION` | Processor | 1.0.0 | OpenAPI version |
| `ENCRYPTION_KEY` | Processor | - | Fernet key shared with Core |
| `EVO_AI_CRM_URL` | Processor | - | CRM on the private network |
| `REDIS_PASSWORD` | Processor | (secret) | Redis password |
| `API_DESCRIPTION` | Processor | Agent Processor Community for Evo AI | OpenAPI description |
| `SECRET_KEY_BASE` | Processor | (secret) | SECRET_KEY_BASE from the Auth service |
| `TOOLS_CACHE_TTL` | Processor | 3600 | Tool cache TTL |
| `CORE_SERVICE_URL` | Processor | - | Core on the private network |
| `REDIS_KEY_PREFIX` | Processor | a2a_ | Key prefix |
| `EVO_AUTH_BASE_URL` | Processor | - | Auth on the private network |
| `ORGANIZATION_NAME` | Processor | Evo CRM | OpenAPI org |
| `EVOAI_CRM_API_TOKEN` | Processor | (secret) | EVOAI_CRM_API_TOKEN from the Auth service |
| `TOOLS_CACHE_ENABLED` | Processor | true | Cache tool lists |
| `POSTGRES_CONNECTION_STRING` | Processor | - | Shared Evo CRM database |
| `PORT` | CRM | 3000 | Port the CRM listens on - leave as is |
| `LOG_LEVEL` | CRM | info | Log level |
| `RAILS_ENV` | CRM | production | Rails environment |
| `REDIS_URL` | CRM | - | Redis on the private network |
| `SMTP_PORT` | CRM | - | SMTP_PORT from the Auth service |
| `BACKEND_URL` | CRM | - | Public URL of the API (the Gateway service) |
| `SMTP_DOMAIN` | CRM | - | SMTP_DOMAIN from the Auth service |
| `CORS_ORIGINS` | CRM | - | Origins allowed to call the API |
| `FRONTEND_URL` | CRM | - | Public URL of the Evo CRM app (the Frontend service) |
| `SMTP_ADDRESS` | CRM | - | SMTP_ADDRESS from the Auth service |
| `POSTGRES_HOST` | CRM | - | Postgres on the private network |
| `POSTGRES_PORT` | CRM | 5432 | Postgres port |
| `SMTP_PASSWORD` | CRM | (secret) | SMTP_PASSWORD from the Auth service |
| `SMTP_USERNAME` | CRM | (secret) | SMTP_USERNAME from the Auth service |
| `JWT_SECRET_KEY` | CRM | (secret) | JWT_SECRET_KEY from the Auth service |
| `STORAGE_REGION` | CRM | - | Railway bucket region |
| `AUTH_HEALTH_URL` | CRM | - | The CRM waits for Auth's migrations before its own |
| `BOT_RUNTIME_URL` | CRM | - | Bot runtime on the private network |
| `SECRET_KEY_BASE` | CRM | (secret) | SECRET_KEY_BASE from the Auth service |
| `EVO_FLOW_API_URL` | CRM | - | EvoFlow on the private network |
| `EVO_FLOW_ENABLED` | CRM | true | Segments, journeys and campaigns (EvoFlow) |
| `POSTGRES_SSLMODE` | CRM | disable | Plain connection - traffic stays on Railway's private network |
| `STORAGE_ENDPOINT` | CRM | - | Railway bucket S3 endpoint |
| `DISABLE_TELEMETRY` | CRM | true | No usage telemetry |
| `EVOLUTION_API_URL` | CRM | - | Bundled Evolution API (WhatsApp) - pre-filled for new WhatsApp inboxes |
| `PGCONNECT_TIMEOUT` | CRM | 5 | libpq connect timeout in seconds, so Rails recovers quickly after a Postgres redeploy |
| `POSTGRES_DATABASE` | CRM | - | Shared Evo CRM database |
| `POSTGRES_PASSWORD` | CRM | (secret) | Postgres password |
| `POSTGRES_USERNAME` | CRM | (secret) | Postgres user |
| `BOT_RUNTIME_SECRET` | CRM | (secret) | Shared secret with the bot runtime |
| `ENABLE_INBOX_EVENTS` | CRM | true | Inbox event stream |
| `EVOAI_CRM_API_TOKEN` | CRM | (secret) | EVOAI_CRM_API_TOKEN from the Auth service |
| `MAILER_SENDER_EMAIL` | CRM | - | MAILER_SENDER_EMAIL from the Auth service |
| `RAILS_LOG_TO_STDOUT` | CRM | true | Logs to Railway |
| `SMTP_AUTHENTICATION` | CRM | plain | SMTP auth method |
| `STORAGE_BUCKET_NAME` | CRM | - | Railway bucket name |
| `EVO_AUTH_SERVICE_URL` | CRM | - | Auth service on the private network |
| `ENABLE_ACCOUNT_SIGNUP` | CRM | false | Single-tenant install: users are added by the admin |
| `EVO_AI_ENCRYPTION_KEY` | CRM | - | Fernet key that encrypts AI provider credentials (from Core) |
| `STORAGE_ACCESS_KEY_ID` | CRM | - | Railway bucket access key |
| `ACTIVE_STORAGE_SERVICE` | CRM | s3_compatible | Uploads and chat media go to the Railway bucket |
| `EVOLUTION_ADMIN_SECRET` | CRM | (secret) | Evolution API global key |
| `EVO_AI_CORE_SERVICE_URL` | CRM | - | Core service on the private network |
| `EVO_FLOW_ALLOW_INSECURE` | CRM | true | Plain http to EvoFlow - private network only |
| `ENABLE_PUSH_RELAY_SERVER` | CRM | true | Mobile push notifications through Evolution's relay |
| `RAILS_SERVE_STATIC_FILES` | CRM | true | Serve compiled assets from Rails |
| `SMTP_ENABLE_STARTTLS_AUTO` | CRM | true | Use STARTTLS |
| `STORAGE_SECRET_ACCESS_KEY` | CRM | (secret) | Railway bucket secret key |
| `AUTH_APIKEY_INTEGRATION_LOCAL` | CRM | - | Shared key between CRM and EvoFlow |
| `BOT_RUNTIME_POSTBACK_BASE_URL` | CRM | - | Where the bot runtime posts replies back |
| `PORT` | Evolution-API | 8080 | Same as SERVER_PORT |
| `LANGUAGE` | Evolution-API | en | Language |
| `S3_ENABLED` | Evolution-API | false | Evolution's S3 client can't use bucket-scoped credentials; media stays in Postgres |
| `SERVER_URL` | Evolution-API | - | Base URL Evolution reports (private - only the CRM talks to it) |
| `SERVER_PORT` | Evolution-API | 8080 | Port Evolution API listens on - leave as is |
| `SERVER_TYPE` | Evolution-API | http | Plain http behind Railway |
| `DEL_INSTANCE` | Evolution-API | false | Keep disconnected instances |
| `CACHE_REDIS_URI` | Evolution-API | - | Redis (family=0 lets ioredis use IPv6) |
| `DATABASE_ENABLED` | Evolution-API | true | Persist in Postgres |
| `DATABASE_PROVIDER` | Evolution-API | postgresql | Database |
| `CACHE_LOCAL_ENABLED` | Evolution-API | false | Local cache off |
| `CACHE_REDIS_ENABLED` | Evolution-API | true | Redis cache |
| `AUTHENTICATION_API_KEY` | Evolution-API | (secret) | Evolution API global key (the CRM reads it) |
| `CACHE_REDIS_PREFIX_KEY` | Evolution-API | evolution | Key prefix |
| `DATABASE_CONNECTION_URI` | Evolution-API | - | Evolution's own database (created on first Postgres boot) |
| `DATABASE_SAVE_DATA_CHATS` | Evolution-API | true | Persist |
| `DATABASE_SAVE_DATA_LABELS` | Evolution-API | true | Persist |
| `CACHE_REDIS_SAVE_INSTANCES` | Evolution-API | false | Sessions stay on the volume |
| `DATABASE_SAVE_DATA_CONTACTS` | Evolution-API | true | Persist |
| `DATABASE_SAVE_DATA_HISTORIC` | Evolution-API | true | Persist |
| `DATABASE_SAVE_DATA_INSTANCE` | Evolution-API | true | Persist |
| `DATABASE_SAVE_MESSAGE_UPDATE` | Evolution-API | true | Persist |
| `DATABASE_SAVE_DATA_NEW_MESSAGE` | Evolution-API | true | Persist |
| `DATABASE_CONNECTION_CLIENT_NAME` | Evolution-API | evolution | Client name |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bundle exec sidekiq -C config/sidekiq.yml`
- **Start command:** `/bin/sh -c "echo 'CREATE DATABASE evolution;' > /docker-entrypoint-initdb.d/10-evolution.sql && exec docker-entrypoint.sh postgres"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `docker/entrypoints/rails.sh bundle exec sidekiq -C config/sidekiq.yml`
- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes --maxmemory-policy noeviction"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "until wget -q -O /dev/null $AUTH_HEALTH_URL; do echo Waiting for Auth migrations; sleep 5; done && exec docker/entrypoints/rails.sh bundle exec rails server -b 0.0.0.0 -p 3000"`
- **Healthcheck:** `/health/live`
- **Healthcheck:** `/`
- **Volume:** `/evolution/instances`

**Category:** Bots · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/evo-crm)
