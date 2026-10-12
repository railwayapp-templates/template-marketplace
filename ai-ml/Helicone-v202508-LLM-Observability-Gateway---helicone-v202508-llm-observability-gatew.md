# Deploy Helicone v2025.08 LLM Observability Gateway on Railway

Proxy, log and monitor every LLM request. Self-hosted with ClickHouse.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/helicone-v202508-llm-observability-gatew)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/helicone-v202508-llm-observability-gatew?referralCode=20H68q)

Helicone is an open-source LLM observability platform. Point your OpenAI or Anthropic client at Helicone's proxy and every request is logged with cost, latency, tokens and the full prompt and response. This community template deploys Helicone's self-hosted stack on Railway with ClickHouse, Postgres and S3 storage, and creates your admin account automatically.

Self-hosted Helicone consists of a Next.js dashboard, the Jawn API server (which also proxies LLM calls), Postgres for accounts, organizations and API keys, ClickHouse for request analytics, and S3-compatible storage for request and response bodies. Helicone's own Docker guide runs everything in one container and has you fix the first account with SQL. This template splits the services the way Helicone's Helm chart does, puts them behind one HTTPS domain with path routing, runs the database migrations as a job, creates a verified admin account and organization, closes public sign-up, and generates every secret, so you can log in and send your first request a few minutes after deploying.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `helicone/web:v2025.08.21` | Worker |
| clickhouse | [baranberkay96/helicone-railway](https://github.com/baranberkay96/helicone-railway) (branch: main) (root: /services/clickhouse) | Database |
| proxy | [baranberkay96/helicone-railway](https://github.com/baranberkay96/helicone-railway) (branch: main) (root: /services/proxy) | Web service |
| jawn | `helicone/jawn:v2025.08.21` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| seaweedfs | [baranberkay96/helicone-railway](https://github.com/baranberkay96/helicone-railway) (branch: main) (root: /services/seaweedfs) | Database |
| migrations | [baranberkay96/helicone-railway](https://github.com/baranberkay96/helicone-railway) (branch: main) (root: /services/migrations) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENV` | web | development | Environment label (Helm value). |
| `PORT` | web | 3000 | Next.js port; Railway healthcheck probes it (/api/hello). |
| `DB_SSL` | web | disable | Plain connection on the private network. |
| `DB_HOST` | web | - | Postgres host. |
| `DB_NAME` | web | - | Postgres database (reference). |
| `DB_PORT` | web | 5432 | Postgres port. |
| `DB_USER` | web | (secret) | Postgres user (reference). |
| `SITE_URL` | web | - | Public dashboard URL. |
| `DB_DRIVER` | web | postgres | Database driver (Helm value). |
| `SMTP_HOST` | web | - | Optional SMTP server for verification and invite emails (outbound SMTP needs Railway Pro). |
| `SMTP_PASS` | web | - | SMTP password. |
| `SMTP_PORT` | web | 587 | SMTP port. |
| `SMTP_USER` | web | (secret) | SMTP username. |
| `VERCEL_ENV` | web | development | Must stay development for self-hosting (other values require Supabase TLS certificates). |
| `DB_PASSWORD` | web | (secret) | Postgres password (reference). |
| `S3_ENDPOINT` | web | - | SeaweedFS S3 endpoint (private network). |
| `SMTP_SECURE` | web | false | true for implicit TLS (port 465). |
| `DATABASE_URL` | web | - | Postgres (Better Auth and app data). |
| `AZURE_API_KEY` | web | (secret) | Placeholder Helicone's Helm chart sets (Azure helper is unused). |
| `S3_ACCESS_KEY` | web | - | S3 access key (reference). |
| `S3_SECRET_KEY` | web | (secret) | S3 secret key (reference). |
| `AZURE_BASE_URL` | web | anything | Placeholder Helicone's Helm chart sets. |
| `OPENAI_API_KEY` | web | (secret) | Placeholder Helicone's Helm chart sets; set a real key only if you want Helicone's own AI helpers. Your apps send their provider keys through the proxy. |
| `S3_BUCKET_NAME` | web | request-response-storage | Bucket for request/response bodies. |
| `BETTER_AUTH_URL` | web | - | Better Auth base URL (must equal the public URL). |
| `CLICKHOUSE_HOST` | web | - | ClickHouse HTTP endpoint. |
| `CLICKHOUSE_USER` | web | (secret) | ClickHouse user. |
| `ENABLE_CRON_JOB` | web | true | Background loops (alerts, reports) - Helm default. |
| `AZURE_API_VERSION` | web | anything | Placeholder Helicone's Helm chart sets. |
| `STRIPE_SECRET_KEY` | web | (secret) | Placeholder only: billing is not used on a self-hosted instance, but the Stripe client is created at start-up and needs a value (Helm/all-in-one images ship a dummy as well). |
| `BETTER_AUTH_SECRET` | web | (secret) | Signs session tokens. Generated once. |
| `CLICKHOUSE_PASSWORD` | web | (secret) | ClickHouse password (reference). |
| `NEXT_PUBLIC_APP_URL` | web | - | Public URL of Helicone (the proxy domain). Change it when you add a custom domain to the proxy. |
| `S3_FORCE_PATH_STYLE` | web | true | SeaweedFS needs path-style requests. |
| `AZURE_DEPLOYMENT_NAME` | web | anything | Placeholder Helicone's Helm chart sets. |
| `NEXT_PUBLIC_BASE_PATH` | web | - | OpenAI-compatible proxy base URL shown in the onboarding snippets. |
| `SUPABASE_DATABASE_URL` | web | - | Postgres for Helicone's data access layer. |
| `ENABLE_PROMPT_SECURITY` | web | false | Prompt-injection model service is not deployed (Helm default). |
| `NEXT_PUBLIC_IS_ON_PREM` | web | true | Self-hosted mode (required off localhost). |
| `NEXT_PUBLIC_BETTER_AUTH` | web | true | Use Better Auth (self-hosted auth) instead of Supabase auth. |
| `NEXT_PUBLIC_API_BASE_PATH` | web | - | Helicone API base shown in the UI snippets. |
| `BETTER_AUTH_TRUSTED_ORIGINS` | web | - | Origins allowed to call the auth endpoints. |
| `NEXT_PUBLIC_HELICONE_JAWN_SERVICE` | web | - | Jawn URL the browser uses (proxied under /jawn). |
| `PORT` | clickhouse | 8123 | HTTP port; /ping is the healthcheck. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password of the default (admin) user. |
| `PORT` | proxy | 8080 | Caddy listen port (public domain target). |
| `S3_UPSTREAM` | proxy | - | SeaweedFS S3 (presigned body downloads). |
| `WEB_UPSTREAM` | proxy | - | Helicone dashboard (Next.js). |
| `JAWN_UPSTREAM` | proxy | - | Jawn API and LLM proxy. |
| `HELICONE_ALLOW_SIGNUP` | proxy | false | Set true to let new users sign up on /signup (they get their own organization). The admin account is created by the migrations service. |
| `ENV` | jawn | development | Environment label (Helm value). |
| `PORT` | jawn | 8585 | Jawn HTTP port; /healthcheck is the healthcheck. |
| `DB_HOST` | jawn | - | Postgres host. |
| `DB_NAME` | jawn | - | Postgres database (reference). |
| `DB_PORT` | jawn | 5432 | Postgres port. |
| `DB_USER` | jawn | (secret) | Postgres user (reference). |
| `VERCEL_ENV` | jawn | development | Must stay development for self-hosting (other values require Supabase TLS certificates). |
| `DB_PASSWORD` | jawn | (secret) | Postgres password (reference). |
| `S3_ENDPOINT` | jawn | - | SeaweedFS S3 endpoint for writes (private network). |
| `AZURE_API_KEY` | jawn | (secret) | Placeholder Helicone's Helm chart sets (Azure helper is unused). |
| `S3_ACCESS_KEY` | jawn | - | S3 access key (reference). |
| `S3_SECRET_KEY` | jawn | (secret) | S3 secret key (reference). |
| `AZURE_BASE_URL` | jawn | anything | Placeholder Helicone's Helm chart sets. |
| `OPENAI_API_KEY` | jawn | (secret) | Placeholder Helicone's Helm chart sets; set a real key only if you want Helicone's own AI helpers. Your apps send their provider keys through the proxy. |
| `S3_BUCKET_NAME` | jawn | request-response-storage | Bucket for request/response bodies. |
| `BETTER_AUTH_URL` | jawn | - | Better Auth base URL. |
| `CLICKHOUSE_HOST` | jawn | - | ClickHouse HTTP endpoint. |
| `CLICKHOUSE_USER` | jawn | (secret) | ClickHouse user. |
| `ENABLE_CRON_JOB` | jawn | true | Run Jawn's background loops (alerts, cleanups). |
| `HQL_STORE_BUCKET` | jawn | hql-store | Bucket for HQL result exports. |
| `AZURE_API_VERSION` | jawn | anything | Placeholder Helicone's Helm chart sets. |
| `IS_HELICONE_CLOUD` | jawn | false | Self-hosted mode (CORS for the dashboard, no cloud features). |
| `STRIPE_SECRET_KEY` | jawn | (secret) | Placeholder only: billing is not used on a self-hosted instance, but the Stripe client is created at start-up and needs a value (Helm/all-in-one images ship a dummy as well). |
| `BETTER_AUTH_SECRET` | jawn | (secret) | Must match web (validates sessions). |
| `S3_ENDPOINT_PUBLIC` | jawn | - | Base for presigned URLs given to browsers; the proxy forwards bucket paths to SeaweedFS. |
| `CLICKHOUSE_HQL_USER` | jawn | (secret) | Restricted ClickHouse user for HQL (SQL) queries from the UI. |
| `CLICKHOUSE_PASSWORD` | jawn | (secret) | ClickHouse password (reference). |
| `HELICONE_WORKER_URL` | jawn | http://localhost:8585/v1/gateway/oai | Jawn's own OpenAI proxy route, used by the playground and experiments (all-in-one image value). |
| `NEXT_PUBLIC_APP_URL` | jawn | - | Dashboard URL (CORS and links). |
| `AZURE_DEPLOYMENT_NAME` | jawn | anything | Placeholder Helicone's Helm chart sets. |
| `S3_PROMPT_BUCKET_NAME` | jawn | prompt-body-storage | Bucket for prompt bodies. |
| `SUPABASE_DATABASE_URL` | jawn | - | Postgres connection string. |
| `ENABLE_PROMPT_SECURITY` | jawn | false | Prompt-security model is not started (Helm default). |
| `CLICKHOUSE_HQL_PASSWORD` | jawn | (secret) | Password the migrations service assigns to hql_user (reference). |
| `NEXT_PUBLIC_BETTER_AUTH` | jawn | true | Better Auth mode. |
| `BETTER_AUTH_TRUSTED_ORIGINS` | jawn | - | Trusted origin for auth calls. |
| `POSTGRES_DB` | Postgres | helicone | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | seaweedfs | 8333 | S3 port; /healthz is the healthcheck. |
| `S3_PORT` | seaweedfs | 8333 | S3 gateway port. |
| `S3_BUCKETS` | seaweedfs | request-response-storage,prompt-body-storage,hql-store | Buckets created at start (idempotent). |
| `AWS_ACCESS_KEY_ID` | seaweedfs | - | S3 access key (admin identity). |
| `AWS_SECRET_ACCESS_KEY` | seaweedfs | (secret) | S3 secret key. |
| `FLYWAY_URL` | migrations | - | JDBC URL for Flyway (Helm chart format). |
| `FLYWAY_USER` | migrations | (secret) | Postgres user (reference). |
| `DATABASE_URL` | migrations | - | Postgres connection string for the admin bootstrap. |
| `CLICKHOUSE_HOST` | migrations | - | ClickHouse HTTP endpoint. |
| `CLICKHOUSE_USER` | migrations | (secret) | ClickHouse user. |
| `FLYWAY_PASSWORD` | migrations | (secret) | Postgres password (reference). |
| `HELICONE_ORG_NAME` | migrations | My Organization | Name of the admin's organization. |
| `CLICKHOUSE_PASSWORD` | migrations | (secret) | ClickHouse password (reference). |
| `HELICONE_ADMIN_NAME` | migrations | Admin | Display name of the first admin. |
| `HELICONE_ADMIN_EMAIL` | migrations | - | Email of the first admin account (created once, email pre-verified). |
| `CLICKHOUSE_HQL_PASSWORD` | migrations | (secret) | Password set on the restricted hql_user (Helicone's migrations create it without one). |
| `HELICONE_ADMIN_PASSWORD` | migrations | (secret) | Password of the first admin account. Generated; read it here and change it after first login. |

## Configuration

- **Healthcheck:** `/api/hello`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/_proxy/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `yarn serve`
- **Healthcheck:** `/healthcheck`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Volume:** `/data`

**Category:** AI/ML · **Tags:** helicone, llm, observability, ai-gateway, openai · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/helicone-v202508-llm-observability-gatew)
