# Deploy Dify on Railway

Dify workflows & RAG, chatbots, plugins, Qdrant and S3. Dify AI (DifyAI).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-ai-with-qdrant-and-s3)

## About

Dify is an open-source platform for building AI chatbots, visual workflows, knowledge bases and retrieval-augmented generation (RAG). This template deploys Dify AI 1.17.1 with background workers, signed plugins, a Python/JavaScript code sandbox, Qdrant and persistent S3 storage. The dashboard, app APIs and file URLs share one Railway HTTPS domain.

This stack runs the official Dify API, Web, Celery Worker and Beat images with a Plugin daemon, PostgreSQL, Redis, Qdrant, Dify Sandbox, an SSRF proxy and a small Nginx gateway. Railway creates the private networking, four persistent volumes and native S3 Bucket automatically. You do not need custom domains, a GitHub repository, SMTP or a model API key to deploy and create your first workflow.

The template pins Dify API/Web/Worker/Beat to 1.17.1, Plugin daemon to 0.6.10-local, Sandbox to 0.2.15, Qdrant to 1.19.2, PostgreSQL to 17.11 and Redis to 7.2.16. Nginx and Squid images are pinned to immutable digests. Only the Dify gateway has a public HTTP domain; internal databases and runtime services stay private.

### First login

1. Click **Deploy**. Wait for all 11 services, including API, Worker and Plugin, to finish starting. On a fresh database, migrations and image pulls can take several minutes.
2. Open the public domain of the **Dify** service.
3. Dify asks for an initialization key. Open **API → Variables**, copy the generated `INIT_PASSWORD` value and paste it into the initialization page. This guards the first owner setup. It is different from the account password you create next.
4. Enter your email, name and a new account password to create the first owner and workspace. Log in with that account. The official signed OpenAI provider is installed automatically after workspace creation.
5. To use LLMs or high-quality vector indexing, add a supported provider and its credentials in **Settings → Model Provider**. Provider API charges belong to the provider account and are separate from Railway hosting. A simple Python code workflow and economy keyword Knowledge indexing work without a paid model key.

Generated values and reference variables are supplied automatically, so there are no required blank values before deployment. `INIT_PASSWORD` is the first-run setup gate, not an automatic admin account or a password-reset mechanism. It does not update existing users when changed after setup. Keep `SECRET_KEY` and the data stores stable across redeploys.

### One public domain

Nginx routes the dashboard to Web, `/console/api`, `/api`, `/v1`, `/files`, `/mcp` and trigger callbacks to API, and `/e/` to Plugin. It preserves Railway HTTPS forwarding headers, allows uploads up to 100 MB at the proxy, and streams chat/workflow responses without proxy buffering. Dify's own smaller upload limits still apply.

The URL variables follow the Dify service's generated Railway domain. If you add a custom domain later, choose it as the public domain and set the public URL/CORS variables in API and Web to that same HTTPS origin. Worker and Beat inherit API settings. The default setup uses host-only secure authentication cookies and does not require `COOKIE_DOMAIN` or a second custom domain.

### Durable data

- **Postgres volume:** accounts, workflows, knowledge metadata, encrypted provider credentials, and the separate `dify_plugin` database created by Plugin.
- **Redis volume:** persistent Celery broker data and application state, with authentication and AOF enabled.
- **Qdrant volume:** knowledge vectors and collections.
- **Plugin volume:** installed signed packages, assets and Python execution environments.
- **Native Railway Bucket:** uploaded documents, files and workspace RSA private keys. API and workers share this object store directly, so no shared local filesystem is required.

Back up PostgreSQL, the Bucket, Plugin storage, Qdrant and the stable application secrets together. PostgreSQL alone cannot restore encrypted provider credentials: default workspace private keys are stored under `privkeys/WORKSPACE_ID/private.pem` in the Bucket. Keep the Bucket private. Do not delete persistent volumes or regenerate secrets as part of an ordinary redeploy.

### What has been verified

The acceptance checks use a fresh deployment of this exact configuration:

- First-run initialization, owner creation, login and authenticated console access on one HTTPS domain.
- A real Python Code node computes 42 from input 21 inside Dify Sandbox.
- The same published workflow executes through `/v1/workflows/run` with an app API key; requests without an API key are rejected.
- Text upload to the native Bucket, subsequent file read, completed Celery indexing and economy keyword retrieval.
- Installation with signature verification enabled and execution of the official JSON Process plugin inside a workflow.
- High-quality indexing and vector retrieval through Qdrant and the signed OpenAI-compatible provider, using a temporary private deterministic embedding fixture. This verifies the vector pipeline and credential handling; it does not measure an AI model's semantic quality. The fixture is not part of this template.
- Public HTTP workflow requests succeed; private destination requests are blocked by Dify's SSRF guard.
- Persistence after restart: the same owner, workflows, uploaded document, indexed Knowledge, vectors, encrypted provider credentials and signed plugin continue to work.

### Included scope

Classic visual workflows, Chatflow, chatbot apps, Knowledge/RAG, standard plugin tools, the existing agent nodes and Python/JavaScript Code nodes are included. Model-dependent features need the appropriate provider configuration.

The new experimental **Agent V2 local shell runtime** and realtime collaborative workflow editing are disabled. They require additional backend/sandbox or websocket services beyond this template. Railway private networking does not reproduce Docker Compose's isolated per-service networks, so this template does not provide mutually hostile-tenant sandbox isolation. Use it for a workspace of trusted users and keep administrative access private. Standard code and plugin runtimes also execute within the same Railway project network.

Email delivery is optional for initial owner creation and email/password login. Configure SMTP or a supported mail provider for invitations, password-reset emails and verified email changes. The Dify self-hosted license and upstream branding requirements still apply.

### Resource use

This is a complete multi-service stack. A brief acceptance run measured about **3.9 GB of combined memory** across the 11 included services after startup, with very low average CPU use. Using Railway's published resource rates, that snapshot is approximately **$40/month of compute if maintained continuously**, excluding persistent storage, Bucket usage, egress and model-provider charges. Any resource usage included in your Railway plan applies to the bill. This is an illustrative snapshot, not a guaranteed bill; document size, concurrent tasks, installed plugins and model traffic can change consumption.

Worker concurrency defaults to two and API to one process. Measure sustained memory and task latency before increasing concurrency. Disable unused services only if you understand which capabilities they supply; Beat supports scheduled workflows and periodic maintenance, while Plugin supplies model providers and tools.

### Upgrade and troubleshooting

Upgrade API, Web, Worker and Beat together using the same Dify release. Read that release's compatibility notes for Plugin and Sandbox images and back up persistent stores first. API runs database migrations; Worker and Beat do not run competing migrations. Shared PostgreSQL timeouts and TCP keepalives allow recovery when containers and private IPs change after a restart. The initial startup queue can wait for dependencies and fresh migrations to complete. Web uses `/signin` as its stable public readiness page, while the gateway probes `/health` on API. Using `/` for Web readiness would break redeploys after owner setup because the root page then redirects to sign-in.

If the dashboard loads but operations fail, inspect API and Worker logs first, then Plugin, Qdrant and the code Sandbox. A healthy dashboard alone does not establish that a Knowledge document finished indexing. Keep all private database/API keys generated by the template and do not expose database or runtime services through public domains.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7.2.16-bookworm` | Database |
| Postgres | `postgres:17.11-bookworm` | Database |
| Worker | `langgenius/dify-api:1.17.1` | Worker |
| Plugin | `langgenius/dify-plugin-daemon:0.6.10-local` | Database |
| Sandbox | `langgenius/dify-sandbox:0.2.15` | Worker |
| Web | `langgenius/dify-web:1.17.1` | Worker |
| Qdrant | `qdrant/qdrant:v1.19.2` | Database |
| Dify | `nginx:1.28.0-alpine@sha256:30f1c0d78e0ad60901648be663a710bdadf19e4c10ac6782c235200619158284` | Web service |
| Beat | `langgenius/dify-api:1.17.1` | Worker |
| API | `langgenius/dify-api:1.17.1` | Worker |
| SSRF-Proxy | `ubuntu/squid@sha256:6a097f68bae708cedbabd6188d68c7e2e7a38cedd05a176e1cc0ba29e3bbe029` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis authentication password shared with API, workers and Plugin. |
| `TZ` | Postgres | UTC | Tz default for the official Dify Postgres service. |
| `POSTGRES_DB` | Postgres | dify | Primary Dify database; Plugin automatically creates its separate dify_plugin database. |
| `POSTGRES_USER` | Postgres | (secret) | Database administrator username used by the Dify stack. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. Referenced by Dify and Plugin automatically. |
| `TZ` | Worker | - | Inherits TZ from API so background processes use the same configuration. |
| `LANG` | Worker | - | Inherits LANG from API so background processes use the same configuration. |
| `MODE` | Worker | worker | Selects the official Dify API image process: api, worker or beat. |
| `PORT` | Worker | - | Inherits PORT from API so background processes use the same configuration. |
| `LC_ALL` | Worker | - | Inherits LC_ALL from API so background processes use the same configuration. |
| `DB_HOST` | Worker | - | Inherits DB_HOST from API so background processes use the same configuration. |
| `DB_PORT` | Worker | - | Inherits DB_PORT from API so background processes use the same configuration. |
| `DB_TYPE` | Worker | - | Inherits DB_TYPE from API so background processes use the same configuration. |
| `REDIS_DB` | Worker | - | Inherits REDIS_DB from API so background processes use the same configuration. |
| `DB_EXTRAS` | Worker | - | Share API PostgreSQL timeout and TCP keepalive settings for worker recovery after database restart. |
| `DIFY_PORT` | Worker | - | Inherits DIFY_PORT from API so background processes use the same configuration. |
| `FILES_URL` | Worker | - | Signed file downloads URL follows the single public Dify domain automatically. |
| `LOG_LEVEL` | Worker | - | Inherits LOG_LEVEL from API so background processes use the same configuration. |
| `S3_REGION` | Worker | - | Region of the native Railway Bucket. |
| `DEPLOY_ENV` | Worker | - | Inherits DEPLOY_ENV from API so background processes use the same configuration. |
| `QDRANT_URL` | Worker | - | Inherits QDRANT_URL from API so background processes use the same configuration. |
| `REDIS_HOST` | Worker | - | Inherits REDIS_HOST from API so background processes use the same configuration. |
| `REDIS_PORT` | Worker | - | Inherits REDIS_PORT from API so background processes use the same configuration. |
| `SECRET_KEY` | Worker | (secret) | Generated application signing/encryption secret shared by API and workers. Keep stable across redeploys and backups. |
| `APP_API_URL` | Worker | - | Published application API URL follows the single public Dify domain automatically. |
| `APP_WEB_URL` | Worker | - | Published application web URL follows the single public Dify domain automatically. |
| `DB_DATABASE` | Worker | - | Inherits DB_DATABASE from API so background processes use the same configuration. |
| `DB_PASSWORD` | Worker | (secret) | Inherits DB_PASSWORD from API so background processes use the same configuration. |
| `DB_SSL_MODE` | Worker | - | Inherits DB_SSL_MODE from API so background processes use the same configuration. |
| `DB_USERNAME` | Worker | (secret) | Inherits DB_USERNAME from API so background processes use the same configuration. |
| `S3_ENDPOINT` | Worker | - | S3-compatible endpoint of the native Railway Bucket. |
| `TRIGGER_URL` | Worker | - | Public trigger callbacks URL follows the single public Dify domain automatically. |
| `STORAGE_TYPE` | Worker | - | S3 lets API and Worker share durable files without shared filesystem volumes. |
| `VECTOR_STORE` | Worker | - | Qdrant stores embeddings for Knowledge and RAG retrieval. |
| `INIT_PASSWORD` | Worker | (secret) | Generated first-run setup key. Copy from API variables to unlock the initial setup page. This is not your future account password. |
| `S3_ACCESS_KEY` | Worker | - | Native Railway Bucket access key. Required for uploads and per-workspace credential encryption keys. |
| `S3_SECRET_KEY` | Worker | (secret) | Native Railway Bucket secret key. Shared automatically with API and workers. |
| `ALLOW_REGISTER` | Worker | - | False prevents unrestricted public account registration after first setup. |
| `QDRANT_API_KEY` | Worker | (secret) | Reference to the generated Qdrant API key. |
| `REDIS_PASSWORD` | Worker | (secret) | Generated Redis authentication password shared with API, workers and Plugin. |
| `S3_BUCKET_NAME` | Worker | - | Native Railway Bucket for uploaded files and Dify workspace keys. |
| `CONSOLE_API_URL` | Worker | - | Console API URL follows the single public Dify domain automatically. |
| `CONSOLE_WEB_URL` | Worker | - | Browser dashboard URL follows the single public Dify domain automatically. |
| `SERVICE_API_URL` | Worker | - | Public service API URL follows the single public Dify domain automatically. |
| `S3_ADDRESS_STYLE` | Worker | - | Virtual-host S3 addressing required by Railway native Buckets. |
| `CELERY_AUTO_SCALE` | Worker | - | Inherits CELERY_AUTO_SCALE from API so background processes use the same configuration. |
| `CELERY_BROKER_URL` | Worker | - | Inherits CELERY_BROKER_URL from API so background processes use the same configuration. |
| `DIFY_BIND_ADDRESS` | Worker | - | Inherits DIFY_BIND_ADDRESS from API so background processes use the same configuration. |
| `MIGRATION_ENABLED` | Worker | false | Only API runs database migrations. Workers wait for API-created tables; never enable parallel migrations. |
| `PLUGIN_DAEMON_KEY` | Worker | - | Reference to the generated plugin daemon API key. |
| `PLUGIN_DAEMON_URL` | Worker | - | Inherits PLUGIN_DAEMON_URL from API so background processes use the same configuration. |
| `DEPLOYMENT_EDITION` | Worker | - | Inherits DEPLOYMENT_EDITION from API so background processes use the same configuration. |
| `INTERNAL_FILES_URL` | Worker | - | Inherits INTERNAL_FILES_URL from API so background processes use the same configuration. |
| `SCARF_NO_ANALYTICS` | Worker | - | Disables Scarf analytics. |
| `CELERY_WORKER_CLASS` | Worker | - | Inherits CELERY_WORKER_CLASS from API so background processes use the same configuration. |
| `ENABLE_CHANGE_EMAIL` | Worker | - | Enables the supported change-email flow; email verification needs configured mail delivery. |
| `MARKETPLACE_ENABLED` | Worker | - | Inherits MARKETPLACE_ENABLED from API so background processes use the same configuration. |
| `QDRANT_GRPC_ENABLED` | Worker | - | Inherits QDRANT_GRPC_ENABLED from API so background processes use the same configuration. |
| `SERVER_WORKER_CLASS` | Worker | - | Inherits SERVER_WORKER_CLASS from API so background processes use the same configuration. |
| `SSRF_PROXY_HTTP_URL` | Worker | - | Inherits SSRF_PROXY_HTTP_URL from API so background processes use the same configuration. |
| `CELERY_WORKER_AMOUNT` | Worker | - | Two background-task concurrency slots by default. |
| `SERVER_WORKER_AMOUNT` | Worker | - | One API process by default; increase only after measuring available memory. |
| `SQLALCHEMY_POOL_SIZE` | Worker | - | Small per-process PostgreSQL connection pool sized for this stack. |
| `SSRF_PROXY_HTTPS_URL` | Worker | - | Inherits SSRF_PROXY_HTTPS_URL from API so background processes use the same configuration. |
| `ENDPOINT_URL_TEMPLATE` | Worker | - | Inherits ENDPOINT_URL_TEMPLATE from API so background processes use the same configuration. |
| `PLUGIN_DAEMON_TIMEOUT` | Worker | - | Inherits PLUGIN_DAEMON_TIMEOUT from API so background processes use the same configuration. |
| `ALLOW_CREATE_WORKSPACE` | Worker | - | False prevents unrestricted workspace creation. |
| `CODE_EXECUTION_API_KEY` | Worker | (secret) | Reference to the private Sandbox key used for Python/JavaScript code nodes. |
| `S3_USE_AWS_MANAGED_IAM` | Worker | - | False: authenticate to the Railway Bucket using generated bucket credentials. |
| `CODE_EXECUTION_ENDPOINT` | Worker | - | Inherits CODE_EXECUTION_ENDPOINT from API so background processes use the same configuration. |
| `ENABLE_EMAIL_CODE_LOGIN` | Worker | (secret) | Disabled until SMTP/email delivery is configured. |
| `SQLALCHEMY_MAX_OVERFLOW` | Worker | - | Maximum extra PostgreSQL connections per process. |
| `INNER_API_KEY_FOR_PLUGIN` | Worker | (secret) | Generated internal API key that authorizes Plugin callbacks into Dify. |
| `SQLALCHEMY_POOL_PRE_PING` | Worker | - | Inherits SQLALCHEMY_POOL_PRE_PING from API so background processes use the same configuration. |
| `ENABLE_COLLABORATION_MODE` | Worker | - | False: realtime workflow co-editing requires a separate websocket service and is not included. |
| `SERVER_WORKER_CONNECTIONS` | Worker | - | Inherits SERVER_WORKER_CONNECTIONS from API so background processes use the same configuration. |
| `CONSOLE_CORS_ALLOW_ORIGINS` | Worker | - | Inherits CONSOLE_CORS_ALLOW_ORIGINS from API so background processes use the same configuration. |
| `PLUGIN_REMOTE_INSTALL_HOST` | Worker | - | Inherits PLUGIN_REMOTE_INSTALL_HOST from API so background processes use the same configuration. |
| `PLUGIN_REMOTE_INSTALL_PORT` | Worker | - | Inherits PLUGIN_REMOTE_INSTALL_PORT from API so background processes use the same configuration. |
| `WEB_API_CORS_ALLOW_ORIGINS` | Worker | - | Inherits WEB_API_CORS_ALLOW_ORIGINS from API so background processes use the same configuration. |
| `ENABLE_EMAIL_PASSWORD_LOGIN` | Worker | (secret) | Enables normal email/password login without SMTP. |
| `NEW_USER_DEFAULT_PLUGIN_IDS` | Worker | - | Installs the signed official OpenAI provider after first workspace setup. A provider API key is still required for paid models. |
| `RESPECT_XFORWARD_HEADERS_ENABLED` | Worker | - | Trusts the HTTPS forwarding headers set by the Railway edge and public Nginx proxy. |
| `TZ` | Plugin | UTC | Tz default for the official Dify Plugin service. |
| `PORT` | Plugin | 5002 | Container HTTP port. Only the Dify proxy receives a public domain. |
| `DB_HOST` | Plugin | - | Private db hostname inside the Railway project. |
| `DB_PORT` | Plugin | 5432 | Db port default for the official Dify Plugin service. |
| `DB_TYPE` | Plugin | postgresql | Db type default for the official Dify Plugin service. |
| `REDIS_DB` | Plugin | 3 | Redis db default for the official Dify Plugin service. |
| `REDIS_HOST` | Plugin | - | Private redis hostname inside the Railway project. |
| `REDIS_PORT` | Plugin | 6379 | Redis port default for the official Dify Plugin service. |
| `SERVER_KEY` | Plugin | - | Generated plugin daemon API key. Keep Plugin private. |
| `DB_DATABASE` | Plugin | dify_plugin | Db database default for the official Dify Plugin service. |
| `DB_PASSWORD` | Plugin | (secret) | Db password default for the official Dify Plugin service. |
| `DB_SSL_MODE` | Plugin | disable | Db ssl mode default for the official Dify Plugin service. |
| `DB_USERNAME` | Plugin | (secret) | Db username default for the official Dify Plugin service. |
| `SERVER_PORT` | Plugin | 5002 | Server port default for the official Dify Plugin service. |
| `PPROF_ENABLED` | Plugin | false | Pprof enabled default for the official Dify Plugin service. |
| `REDIS_PASSWORD` | Plugin | (secret) | Generated Redis authentication password shared with API, workers and Plugin. |
| `SENTRY_ENABLED` | Plugin | false | Sentry enabled default for the official Dify Plugin service. |
| `DIFY_INNER_API_KEY` | Plugin | (secret) | Reference to the shared internal API key for plugin callbacks. |
| `DIFY_INNER_API_URL` | Plugin | - | Dify inner api url configured for this stack. |
| `PLUGIN_STORAGE_TYPE` | Plugin | local | Local plugin runtime storage uses the attached persistent Plugin volume. |
| `PLUGIN_WORKING_PATH` | Plugin | /app/storage/cwd | Plugin execution environments persist within the Plugin volume. |
| `PLUGIN_INSTALLED_PATH` | Plugin | plugin | Plugin installed path default for the official Dify Plugin service. |
| `MAX_PLUGIN_PACKAGE_SIZE` | Plugin | 52428800 | Max plugin package size default for the official Dify Plugin service. |
| `PLUGIN_MEDIA_CACHE_PATH` | Plugin | assets | Plugin media cache path default for the official Dify Plugin service. |
| `PYTHON_ENV_INIT_TIMEOUT` | Plugin | 240 | Python env init timeout default for the official Dify Plugin service. |
| `FORCE_VERIFYING_SIGNATURE` | Plugin | true | True verifies plugin signatures; keep enabled for marketplace installation. |
| `PLUGIN_PACKAGE_CACHE_PATH` | Plugin | plugin_packages | Plugin package cache path default for the official Dify Plugin service. |
| `PLUGIN_STORAGE_LOCAL_ROOT` | Plugin | /app/storage | Plugin packages, assets and runtime environments persist on this mounted directory. |
| `PLUGIN_MAX_EXECUTION_TIMEOUT` | Plugin | 600 | Plugin max execution timeout default for the official Dify Plugin service. |
| `PLUGIN_REMOTE_INSTALLING_HOST` | Plugin | 127.0.0.1 | Private plugin remote installing hostname inside the Railway project. |
| `PLUGIN_REMOTE_INSTALLING_PORT` | Plugin | 5003 | Plugin remote installing port default for the official Dify Plugin service. |
| `PORT` | Sandbox | 8194 | Container HTTP port. Only the Dify proxy receives a public domain. |
| `API_KEY` | Sandbox | (secret) | Generated private code Sandbox API key. |
| `GIN_MODE` | Sandbox | release | Gin mode default for the official Dify Sandbox service. |
| `HTTP_PROXY` | Sandbox | - | Http proxy default for the official Dify Sandbox service. |
| `HTTPS_PROXY` | Sandbox | - | Https proxy default for the official Dify Sandbox service. |
| `SANDBOX_PORT` | Sandbox | 8194 | Sandbox port default for the official Dify Sandbox service. |
| `ENABLE_NETWORK` | Sandbox | true | Enable network default for the official Dify Sandbox service. |
| `WORKER_TIMEOUT` | Sandbox | 15 | Worker timeout default for the official Dify Sandbox service. |
| `PORT` | Web | 3000 | Container HTTP port. Only the Dify proxy receives a public domain. |
| `HOSTNAME` | Web | 0.0.0.0 | Hostname default for the official Dify Web service. |
| `APP_API_URL` | Web | - | Published application API URL follows the single public Dify domain automatically. |
| `CONSOLE_API_URL` | Web | - | Console API URL follows the single public Dify domain automatically. |
| `MARKETPLACE_URL` | Web | https://marketplace.dify.ai | Marketplace url configured for this stack. |
| `MARKETPLACE_API_URL` | Web | https://marketplace.dify.ai | Marketplace api url configured for this stack. |
| `SERVER_CONSOLE_API_URL` | Web | - | Server console api url configured for this stack. |
| `NEXT_TELEMETRY_DISABLED` | Web | 1 | Disables Next.js telemetry. |
| `EXPERIMENTAL_ENABLE_VINEXT` | Web | false | Experimental enable vinext default for the official Dify Web service. |
| `TEXT_GENERATION_TIMEOUT_MS` | Web | 60000 | Text generation timeout ms default for the official Dify Web service. |
| `NEXT_PUBLIC_ENABLE_AGENT_V2` | Web | false | False: experimental Agent V2 local shell runtime is not included in this template. |
| `NEXT_PUBLIC_ENABLE_FEATURE_PREVIEW` | Web | false | Disables experimental previews in this production-oriented template. |
| `NEXT_PUBLIC_ENABLE_AGENT_V2_IN_CHATFLOW` | Web | false | False: experimental Agent V2 inside Chatflow is not included. |
| `PORT` | Qdrant | 6333 | Container HTTP port. Only the Dify proxy receives a public domain. |
| `QDRANT__SERVICE__HOST` | Qdrant | 0.0.0.0 | Private qdrant  service  hostname inside the Railway project. |
| `QDRANT__SERVICE__API_KEY` | Qdrant | (secret) | Generated vector database authentication key. Keep Qdrant private. |
| `QDRANT__SERVICE__HTTP_PORT` | Qdrant | 6333 | Qdrant  service  http port default for the official Dify Qdrant service. |
| `QDRANT__TELEMETRY_DISABLED` | Qdrant | true | Qdrant  telemetry disabled default for the official Dify Qdrant service. |
| `PORT` | Dify | 8080 | Container HTTP port. Only the Dify proxy receives a public domain. |
| `API_HOST` | Dify | - | Private Dify API hostname used by the public proxy. |
| `WEB_HOST` | Dify | - | Private Dify Web hostname used by the public proxy. |
| `PLUGIN_HOST` | Dify | - | Private Plugin hostname used only for explicitly published endpoint hooks. |
| `NGINX_TEMPLATE_B64` | Dify | d29ya2VyX3Byb2Nlc3NlcyAxOwpldmVudHMgeyB3b3JrZXJfY29ubmVjdGlvbnMgMTAyNDsgfQpodHRwIHsKIGluY2x1ZGUgL2V0Yy9uZ2lueC9taW1lLnR5cGVzOwogZGVmYXVsdF90eXBlIGFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTsKIGFjY2Vzc19sb2cgL2Rldi9zdGRvdXQ7CiBlcnJvcl9sb2cgL2Rldi9zdGRlcnIgd2FybjsKIHJlc29sdmVyIFJFU09MVkVSIHZhbGlkPTMwcyBpcHY2PW9mZjsKIGNsaWVudF9tYXhfYm9keV9zaXplIDEwMG07CiBtYXAgJGh0dHBfeF9mb3J3YXJkZWRfcHJvdG8gJGZvcndhcmRlZF9zY2hlbWUgeyBkZWZhdWx0ICRodHRwX3hfZm9yd2FyZGVkX3Byb3RvOyAiIiAkc2NoZW1lOyB9CiBzZXJ2ZXIgewogIGxpc3RlbiA4MDgwOwogIHNlcnZlcl9uYW1lIF87CiAgcHJveHlfaHR0cF92ZXJzaW9uIDEuMTsKICBwcm94eV9zZXRfaGVhZGVyIEhvc3QgJGhvc3Q7CiAgcHJveHlfc2V0X2hlYWRlciBYLVJlYWwtSVAgJHJlbW90ZV9hZGRyOwogIHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtRm9yICRwcm94eV9hZGRfeF9mb3J3YXJkZWRfZm9yOwogIHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtUHJvdG8gJGZvcndhcmRlZF9zY2hlbWU7CiAgcHJveHlfc2V0X2hlYWRlciBDb25uZWN0aW9uICIiOwogIHByb3h5X3JlYWRfdGltZW91dCAzNjAwczsKICBwcm94eV9zZW5kX3RpbWVvdXQgMzYwMHM7CiAgcHJveHlfYnVmZmVyaW5nIG9mZjsKICBsb2NhdGlvbiB+IF4vKGNvbnNvbGUvYXBpfGFwaXx2MXxvcGVuYXBpfGZpbGVzfG1jcHx0cmlnZ2Vyc3xoZWFsdGgpKC98JCkgeyBzZXQgJHVwc3RyZWFtICR7QVBJX0hPU1R9OjUwMDE7IHByb3h5X3Bhc3MgaHR0cDovLyR1cHN0cmVhbTsgfQogIGxvY2F0aW9uIC9lLyB7IHNldCAkdXBzdHJlYW0gJHtQTFVHSU5fSE9TVH06NTAwMjsgcHJveHlfcGFzcyBodHRwOi8vJHVwc3RyZWFtOyBwcm94eV9zZXRfaGVhZGVyIERpZnktSG9vay1VcmwgJGZvcndhcmRlZF9zY2hlbWU6Ly8kaG9zdCRyZXF1ZXN0X3VyaTsgfQogIGxvY2F0aW9uIC8geyBzZXQgJHVwc3RyZWFtICR7V0VCX0hPU1R9OjMwMDA7IHByb3h5X3Bhc3MgaHR0cDovLyR1cHN0cmVhbTsgfQogfQp9Cg== | Base64-encoded single-domain Nginx routing configuration. Preserves HTTPS headers and streams workflow/chat events. |
| `TZ` | Beat | - | Inherits TZ from API so background processes use the same configuration. |
| `LANG` | Beat | - | Inherits LANG from API so background processes use the same configuration. |
| `MODE` | Beat | beat | Selects the official Dify API image process: api, worker or beat. |
| `PORT` | Beat | - | Inherits PORT from API so background processes use the same configuration. |
| `LC_ALL` | Beat | - | Inherits LC_ALL from API so background processes use the same configuration. |
| `DB_HOST` | Beat | - | Inherits DB_HOST from API so background processes use the same configuration. |
| `DB_PORT` | Beat | - | Inherits DB_PORT from API so background processes use the same configuration. |
| `DB_TYPE` | Beat | - | Inherits DB_TYPE from API so background processes use the same configuration. |
| `REDIS_DB` | Beat | - | Inherits REDIS_DB from API so background processes use the same configuration. |
| `DB_EXTRAS` | Beat | - | Share API PostgreSQL timeout and TCP keepalive settings for scheduler recovery after database restart. |
| `DIFY_PORT` | Beat | - | Inherits DIFY_PORT from API so background processes use the same configuration. |
| `FILES_URL` | Beat | - | Signed file downloads URL follows the single public Dify domain automatically. |
| `LOG_LEVEL` | Beat | - | Inherits LOG_LEVEL from API so background processes use the same configuration. |
| `S3_REGION` | Beat | - | Region of the native Railway Bucket. |
| `DEPLOY_ENV` | Beat | - | Inherits DEPLOY_ENV from API so background processes use the same configuration. |
| `QDRANT_URL` | Beat | - | Inherits QDRANT_URL from API so background processes use the same configuration. |
| `REDIS_HOST` | Beat | - | Inherits REDIS_HOST from API so background processes use the same configuration. |
| `REDIS_PORT` | Beat | - | Inherits REDIS_PORT from API so background processes use the same configuration. |
| `SECRET_KEY` | Beat | (secret) | Generated application signing/encryption secret shared by API and workers. Keep stable across redeploys and backups. |
| `APP_API_URL` | Beat | - | Published application API URL follows the single public Dify domain automatically. |
| `APP_WEB_URL` | Beat | - | Published application web URL follows the single public Dify domain automatically. |
| `DB_DATABASE` | Beat | - | Inherits DB_DATABASE from API so background processes use the same configuration. |
| `DB_PASSWORD` | Beat | (secret) | Inherits DB_PASSWORD from API so background processes use the same configuration. |
| `DB_SSL_MODE` | Beat | - | Inherits DB_SSL_MODE from API so background processes use the same configuration. |
| `DB_USERNAME` | Beat | (secret) | Inherits DB_USERNAME from API so background processes use the same configuration. |
| `S3_ENDPOINT` | Beat | - | S3-compatible endpoint of the native Railway Bucket. |
| `TRIGGER_URL` | Beat | - | Public trigger callbacks URL follows the single public Dify domain automatically. |
| `STORAGE_TYPE` | Beat | - | S3 lets API and Worker share durable files without shared filesystem volumes. |
| `VECTOR_STORE` | Beat | - | Qdrant stores embeddings for Knowledge and RAG retrieval. |
| `INIT_PASSWORD` | Beat | (secret) | Generated first-run setup key. Copy from API variables to unlock the initial setup page. This is not your future account password. |
| `S3_ACCESS_KEY` | Beat | - | Native Railway Bucket access key. Required for uploads and per-workspace credential encryption keys. |
| `S3_SECRET_KEY` | Beat | (secret) | Native Railway Bucket secret key. Shared automatically with API and workers. |
| `ALLOW_REGISTER` | Beat | - | False prevents unrestricted public account registration after first setup. |
| `QDRANT_API_KEY` | Beat | (secret) | Reference to the generated Qdrant API key. |
| `REDIS_PASSWORD` | Beat | (secret) | Generated Redis authentication password shared with API, workers and Plugin. |
| `S3_BUCKET_NAME` | Beat | - | Native Railway Bucket for uploaded files and Dify workspace keys. |
| `CONSOLE_API_URL` | Beat | - | Console API URL follows the single public Dify domain automatically. |
| `CONSOLE_WEB_URL` | Beat | - | Browser dashboard URL follows the single public Dify domain automatically. |
| `SERVICE_API_URL` | Beat | - | Public service API URL follows the single public Dify domain automatically. |
| `S3_ADDRESS_STYLE` | Beat | - | Virtual-host S3 addressing required by Railway native Buckets. |
| `CELERY_AUTO_SCALE` | Beat | - | Inherits CELERY_AUTO_SCALE from API so background processes use the same configuration. |
| `CELERY_BROKER_URL` | Beat | - | Inherits CELERY_BROKER_URL from API so background processes use the same configuration. |
| `DIFY_BIND_ADDRESS` | Beat | - | Inherits DIFY_BIND_ADDRESS from API so background processes use the same configuration. |
| `MIGRATION_ENABLED` | Beat | false | Only API runs database migrations. Workers wait for API-created tables; never enable parallel migrations. |
| `PLUGIN_DAEMON_KEY` | Beat | - | Reference to the generated plugin daemon API key. |
| `PLUGIN_DAEMON_URL` | Beat | - | Inherits PLUGIN_DAEMON_URL from API so background processes use the same configuration. |
| `DEPLOYMENT_EDITION` | Beat | - | Inherits DEPLOYMENT_EDITION from API so background processes use the same configuration. |
| `INTERNAL_FILES_URL` | Beat | - | Inherits INTERNAL_FILES_URL from API so background processes use the same configuration. |
| `SCARF_NO_ANALYTICS` | Beat | - | Disables Scarf analytics. |
| `CELERY_WORKER_CLASS` | Beat | - | Inherits CELERY_WORKER_CLASS from API so background processes use the same configuration. |
| `ENABLE_CHANGE_EMAIL` | Beat | - | Enables the supported change-email flow; email verification needs configured mail delivery. |
| `MARKETPLACE_ENABLED` | Beat | - | Inherits MARKETPLACE_ENABLED from API so background processes use the same configuration. |
| `QDRANT_GRPC_ENABLED` | Beat | - | Inherits QDRANT_GRPC_ENABLED from API so background processes use the same configuration. |
| `SERVER_WORKER_CLASS` | Beat | - | Inherits SERVER_WORKER_CLASS from API so background processes use the same configuration. |
| `SSRF_PROXY_HTTP_URL` | Beat | - | Inherits SSRF_PROXY_HTTP_URL from API so background processes use the same configuration. |
| `CELERY_WORKER_AMOUNT` | Beat | - | Two background-task concurrency slots by default. |
| `SERVER_WORKER_AMOUNT` | Beat | - | One API process by default; increase only after measuring available memory. |
| `SQLALCHEMY_POOL_SIZE` | Beat | - | Small per-process PostgreSQL connection pool sized for this stack. |
| `SSRF_PROXY_HTTPS_URL` | Beat | - | Inherits SSRF_PROXY_HTTPS_URL from API so background processes use the same configuration. |
| `ENDPOINT_URL_TEMPLATE` | Beat | - | Inherits ENDPOINT_URL_TEMPLATE from API so background processes use the same configuration. |
| `PLUGIN_DAEMON_TIMEOUT` | Beat | - | Inherits PLUGIN_DAEMON_TIMEOUT from API so background processes use the same configuration. |
| `ALLOW_CREATE_WORKSPACE` | Beat | - | False prevents unrestricted workspace creation. |
| `CODE_EXECUTION_API_KEY` | Beat | (secret) | Reference to the private Sandbox key used for Python/JavaScript code nodes. |
| `S3_USE_AWS_MANAGED_IAM` | Beat | - | False: authenticate to the Railway Bucket using generated bucket credentials. |
| `CODE_EXECUTION_ENDPOINT` | Beat | - | Inherits CODE_EXECUTION_ENDPOINT from API so background processes use the same configuration. |
| `ENABLE_EMAIL_CODE_LOGIN` | Beat | (secret) | Disabled until SMTP/email delivery is configured. |
| `SQLALCHEMY_MAX_OVERFLOW` | Beat | - | Maximum extra PostgreSQL connections per process. |
| `INNER_API_KEY_FOR_PLUGIN` | Beat | (secret) | Generated internal API key that authorizes Plugin callbacks into Dify. |
| `SQLALCHEMY_POOL_PRE_PING` | Beat | - | Inherits SQLALCHEMY_POOL_PRE_PING from API so background processes use the same configuration. |
| `ENABLE_COLLABORATION_MODE` | Beat | - | False: realtime workflow co-editing requires a separate websocket service and is not included. |
| `SERVER_WORKER_CONNECTIONS` | Beat | - | Inherits SERVER_WORKER_CONNECTIONS from API so background processes use the same configuration. |
| `CONSOLE_CORS_ALLOW_ORIGINS` | Beat | - | Inherits CONSOLE_CORS_ALLOW_ORIGINS from API so background processes use the same configuration. |
| `PLUGIN_REMOTE_INSTALL_HOST` | Beat | - | Inherits PLUGIN_REMOTE_INSTALL_HOST from API so background processes use the same configuration. |
| `PLUGIN_REMOTE_INSTALL_PORT` | Beat | - | Inherits PLUGIN_REMOTE_INSTALL_PORT from API so background processes use the same configuration. |
| `WEB_API_CORS_ALLOW_ORIGINS` | Beat | - | Inherits WEB_API_CORS_ALLOW_ORIGINS from API so background processes use the same configuration. |
| `ENABLE_EMAIL_PASSWORD_LOGIN` | Beat | (secret) | Enables normal email/password login without SMTP. |
| `NEW_USER_DEFAULT_PLUGIN_IDS` | Beat | - | Installs the signed official OpenAI provider after first workspace setup. A provider API key is still required for paid models. |
| `RESPECT_XFORWARD_HEADERS_ENABLED` | Beat | - | Trusts the HTTPS forwarding headers set by the Railway edge and public Nginx proxy. |
| `TZ` | API | UTC | Tz default for the official Dify API service. |
| `LANG` | API | C.UTF-8 | Lang default for the official Dify API service. |
| `MODE` | API | api | Selects the official Dify API image process: api, worker or beat. |
| `PORT` | API | 5001 | Container HTTP port. Only the Dify proxy receives a public domain. |
| `LC_ALL` | API | C.UTF-8 | Lc all default for the official Dify API service. |
| `DB_HOST` | API | - | Private db hostname inside the Railway project. |
| `DB_PORT` | API | 5432 | Db port default for the official Dify API service. |
| `DB_TYPE` | API | postgresql | Db type default for the official Dify API service. |
| `REDIS_DB` | API | 0 | Redis db default for the official Dify API service. |
| `DB_EXTRAS` | API | connect_timeout=10&keepalives=1&keepalives_idle=10&keepalives_interval=5&keepalives_count=3 | PostgreSQL connection timeout and TCP keepalives. Fast recovery when PostgreSQL containers or private IPs change; preserves stable application data. |
| `DIFY_PORT` | API | 5001 | Dify port default for the official Dify API service. |
| `FILES_URL` | API | - | Signed file downloads URL follows the single public Dify domain automatically. |
| `LOG_LEVEL` | API | INFO | Log level default for the official Dify API service. |
| `S3_REGION` | API | - | Region of the native Railway Bucket. |
| `DEPLOY_ENV` | API | PRODUCTION | Deploy env default for the official Dify API service. |
| `QDRANT_URL` | API | - | Qdrant url configured for this stack. |
| `REDIS_HOST` | API | - | Private redis hostname inside the Railway project. |
| `REDIS_PORT` | API | 6379 | Redis port default for the official Dify API service. |
| `SECRET_KEY` | API | (secret) | Generated application signing/encryption secret shared by API and workers. Keep stable across redeploys and backups. |
| `APP_API_URL` | API | - | Published application API URL follows the single public Dify domain automatically. |
| `APP_WEB_URL` | API | - | Published application web URL follows the single public Dify domain automatically. |
| `DB_DATABASE` | API | - | Db database default for the official Dify API service. |
| `DB_PASSWORD` | API | (secret) | Db password default for the official Dify API service. |
| `DB_SSL_MODE` | API | disable | Db ssl mode default for the official Dify API service. |
| `DB_USERNAME` | API | (secret) | Db username default for the official Dify API service. |
| `S3_ENDPOINT` | API | - | S3-compatible endpoint of the native Railway Bucket. |
| `TRIGGER_URL` | API | - | Public trigger callbacks URL follows the single public Dify domain automatically. |
| `STORAGE_TYPE` | API | s3 | S3 lets API and Worker share durable files without shared filesystem volumes. |
| `VECTOR_STORE` | API | qdrant | Qdrant stores embeddings for Knowledge and RAG retrieval. |
| `INIT_PASSWORD` | API | (secret) | Generated first-run setup key. Copy from API variables to unlock the initial setup page. This is not your future account password. |
| `S3_ACCESS_KEY` | API | - | Native Railway Bucket access key. Required for uploads and per-workspace credential encryption keys. |
| `S3_SECRET_KEY` | API | (secret) | Native Railway Bucket secret key. Shared automatically with API and workers. |
| `ALLOW_REGISTER` | API | false | False prevents unrestricted public account registration after first setup. |
| `QDRANT_API_KEY` | API | (secret) | Reference to the generated Qdrant API key. |
| `REDIS_PASSWORD` | API | (secret) | Generated Redis authentication password shared with API, workers and Plugin. |
| `S3_BUCKET_NAME` | API | - | Native Railway Bucket for uploaded files and Dify workspace keys. |
| `CONSOLE_API_URL` | API | - | Console API URL follows the single public Dify domain automatically. |
| `CONSOLE_WEB_URL` | API | - | Browser dashboard URL follows the single public Dify domain automatically. |
| `SERVICE_API_URL` | API | - | Public service API URL follows the single public Dify domain automatically. |
| `S3_ADDRESS_STYLE` | API | virtual | Virtual-host S3 addressing required by Railway native Buckets. |
| `CELERY_AUTO_SCALE` | API | false | Celery auto scale default for the official Dify API service. |
| `CELERY_BROKER_URL` | API | - | Celery broker url configured for this stack. |
| `DIFY_BIND_ADDRESS` | API | 0.0.0.0 | Dify bind address default for the official Dify API service. |
| `MIGRATION_ENABLED` | API | true | Only API runs database migrations. Workers wait for API-created tables; never enable parallel migrations. |
| `PLUGIN_DAEMON_KEY` | API | - | Reference to the generated plugin daemon API key. |
| `PLUGIN_DAEMON_URL` | API | - | Plugin daemon url configured for this stack. |
| `DEPLOYMENT_EDITION` | API | COMMUNITY | Deployment edition default for the official Dify API service. |
| `INTERNAL_FILES_URL` | API | - | Internal files url configured for this stack. |
| `SCARF_NO_ANALYTICS` | API | true | Disables Scarf analytics. |
| `CELERY_WORKER_CLASS` | API | gevent | Celery worker class default for the official Dify API service. |
| `ENABLE_CHANGE_EMAIL` | API | true | Enables the supported change-email flow; email verification needs configured mail delivery. |
| `MARKETPLACE_ENABLED` | API | true | Marketplace enabled default for the official Dify API service. |
| `QDRANT_GRPC_ENABLED` | API | false | Qdrant grpc enabled default for the official Dify API service. |
| `SERVER_WORKER_CLASS` | API | gevent | Server worker class default for the official Dify API service. |
| `SSRF_PROXY_HTTP_URL` | API | - | Ssrf proxy http url configured for this stack. |
| `CELERY_WORKER_AMOUNT` | API | 2 | Two background-task concurrency slots by default. |
| `SERVER_WORKER_AMOUNT` | API | 1 | One API process by default; increase only after measuring available memory. |
| `SQLALCHEMY_POOL_SIZE` | API | 5 | Small per-process PostgreSQL connection pool sized for this stack. |
| `SSRF_PROXY_HTTPS_URL` | API | - | Ssrf proxy https url configured for this stack. |
| `ENDPOINT_URL_TEMPLATE` | API | - | Endpoint url template default for the official Dify API service. |
| `PLUGIN_DAEMON_TIMEOUT` | API | 600.0 | Plugin daemon timeout default for the official Dify API service. |
| `ALLOW_CREATE_WORKSPACE` | API | false | False prevents unrestricted workspace creation. |
| `CODE_EXECUTION_API_KEY` | API | (secret) | Reference to the private Sandbox key used for Python/JavaScript code nodes. |
| `S3_USE_AWS_MANAGED_IAM` | API | false | False: authenticate to the Railway Bucket using generated bucket credentials. |
| `CODE_EXECUTION_ENDPOINT` | API | - | Code execution endpoint default for the official Dify API service. |
| `ENABLE_EMAIL_CODE_LOGIN` | API | (secret) | Disabled until SMTP/email delivery is configured. |
| `SQLALCHEMY_MAX_OVERFLOW` | API | 5 | Maximum extra PostgreSQL connections per process. |
| `INNER_API_KEY_FOR_PLUGIN` | API | (secret) | Generated internal API key that authorizes Plugin callbacks into Dify. |
| `SQLALCHEMY_POOL_PRE_PING` | API | true | Sqlalchemy pool pre ping default for the official Dify API service. |
| `ENABLE_COLLABORATION_MODE` | API | false | False: realtime workflow co-editing requires a separate websocket service and is not included. |
| `SERVER_WORKER_CONNECTIONS` | API | 100 | Server worker connections default for the official Dify API service. |
| `CONSOLE_CORS_ALLOW_ORIGINS` | API | - | Console cors allow origins default for the official Dify API service. |
| `PLUGIN_REMOTE_INSTALL_HOST` | API | 127.0.0.1 | Private plugin remote install hostname inside the Railway project. |
| `PLUGIN_REMOTE_INSTALL_PORT` | API | 5003 | Plugin remote install port default for the official Dify API service. |
| `WEB_API_CORS_ALLOW_ORIGINS` | API | - | Web api cors allow origins default for the official Dify API service. |
| `ENABLE_EMAIL_PASSWORD_LOGIN` | API | (secret) | Enables normal email/password login without SMTP. |
| `NEW_USER_DEFAULT_PLUGIN_IDS` | API | langgenius/openai | Installs the signed official OpenAI provider after first workspace setup. A provider API key is still required for paid models. |
| `RESPECT_XFORWARD_HEADERS_ENABLED` | API | true | Trusts the HTTPS forwarding headers set by the Railway edge and public Nginx proxy. |
| `SQUID_CONFIG_B64` | SSRF-Proxy | aHR0cF9wb3J0IDMxMjgKYWNsIGxvY2FsbmV0IHNyYyAxMC4wLjAuMC84IDEwMC42NC4wLjAvMTAgMTcyLjE2LjAuMC8xMiAxOTIuMTY4LjAuMC8xNiBmYzAwOjovNyBmZTgwOjovMTAKYWNsIGxvY2FsaG9zdCBzcmMgMTI3LjAuMC4xLzMyIDo6MQphY2wgcHJpdmF0ZSBkc3QgMC4wLjAuMC84IDEwLjAuMC4wLzggMTAwLjY0LjAuMC8xMCAxMjcuMC4wLjAvOCAxNjkuMjU0LjAuMC8xNiAxNzIuMTYuMC4wLzEyIDE5Mi4xNjguMC4wLzE2IDIyNC4wLjAuMC80IDI0MC4wLjAuMC80IDo6LzEyOCA6OjEvMTI4IDo6ZmZmZjowOjAvOTYgOjovOTYgZmMwMDo6LzcgZmU4MDo6LzEwCmFjbCBTU0xfcG9ydHMgcG9ydCA0NDMKYWNsIFNhZmVfcG9ydHMgcG9ydCA4MCA0NDMgMTAyNS02NTUzNQphY2wgQ09OTkVDVCBtZXRob2QgQ09OTkVDVApodHRwX2FjY2VzcyBkZW55ICFTYWZlX3BvcnRzCmh0dHBfYWNjZXNzIGRlbnkgQ09OTkVDVCAhU1NMX3BvcnRzCmh0dHBfYWNjZXNzIGRlbnkgcHJpdmF0ZQpodHRwX2FjY2VzcyBhbGxvdyBsb2NhbG5ldApodHRwX2FjY2VzcyBhbGxvdyBsb2NhbGhvc3QKaHR0cF9hY2Nlc3MgZGVueSBhbGwKY2FjaGUgZGVueSBhbGwKY2FjaGVfbWVtIDE2IE1CCmFjY2Vzc19sb2cgc3RkaW86L2Rldi9zdGRvdXQKY2FjaGVfbG9nIC9kZXYvc3RkZXJyCnBpZF9maWxlbmFtZSAvdG1wL3NxdWlkLnBpZApjb3JlZHVtcF9kaXIgL3RtcApzaHV0ZG93bl9saWZldGltZSAzIHNlY29uZHMK | Base64-encoded SSRF proxy configuration. Blocks private destination addresses and allows authenticated stack services to access public URLs. |

## Configuration

- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --protected-mode yes --requirepass "$REDIS_PASSWORD" --appendonly yes --maxmemory-policy noeviction'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/check`
- **Volume:** `/app/storage`
- **Healthcheck:** `/health`
- **Healthcheck:** `/signin`
- **Healthcheck:** `/healthz`
- **Volume:** `/qdrant/storage`
- **Start command:** `sh -c 'printf %s "$NGINX_TEMPLATE_B64" | base64 -d > /tmp/nginx.template; resolver=$(sed -n "s/^nameserver //p" /etc/resolv.conf | head -n 1); case "$resolver" in *:*) resolver="[$resolver]";; esac; sed "s/RESOLVER/$resolver/" /tmp/nginx.template | envsubst "\$API_HOST \$WEB_HOST \$PLUGIN_HOST" > /etc/nginx/nginx.conf; exec nginx -g "daemon off;"'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'printf %s "$SQUID_CONFIG_B64" | base64 -d > /etc/squid/squid.conf; exec /usr/sbin/squid -f /etc/squid/squid.conf -NYC'`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/dify-ai-with-qdrant-and-s3)
