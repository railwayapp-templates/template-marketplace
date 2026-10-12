# Deploy Dify v1 AI App Studio on Railway

Visual agent & RAG builder with plugins, sandbox, workers and a vector DB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-v1-ai-app-studio)

## About

Dify is an open-source platform for building LLM applications: chatbots, RAG knowledge bases, agents and multi-step workflows, designed in a visual editor and published as web apps or APIs. This community template runs the complete Dify 1.17 stack on Railway behind a single HTTPS URL.

Self-hosting Dify means running far more than one container. The console (Next.js) talks to a Flask API; Celery workers index documents and execute workflows; a beat scheduler fires timed jobs; a plugin daemon installs and runs model/tool plugins; a code sandbox executes user code; and the new Agent backend drives sandboxed agent shells. Postgres stores metadata, Redis carries queues and locks, Weaviate holds embeddings, and uploaded files need object storage. This template wires all of it with generated secrets, private networking, a Railway Bucket for files, persistent volumes for stateful services, and an nginx gateway that reproduces Dify's own routing on one domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API | `langgenius/dify-api:1.17.1` | Worker |
| Worker | `langgenius/dify-api:1.17.1` | Worker |
| SSRF Proxy | [baranberkay96/dify-railway](https://github.com/baranberkay96/dify-railway) (branch: main) (root: /services/ssrf-proxy) | Worker |
| Web | `langgenius/dify-web:1.17.1` | Worker |
| Agent SSRF Proxy | [baranberkay96/dify-railway](https://github.com/baranberkay96/dify-railway) (branch: main) (root: /services/ssrf-proxy) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| API WebSocket | `langgenius/dify-api:1.17.1` | Worker |
| Redis | `redis:8.2` | Database |
| Weaviate | `semitechnologies/weaviate:1.39.11` | Database |
| Sandbox | `langgenius/dify-sandbox:0.2.15` | Database |
| Worker Beat | `langgenius/dify-api:1.17.1` | Worker |
| Agent Sandbox | [baranberkay96/dify-railway](https://github.com/baranberkay96/dify-railway) (branch: main) (root: /services/agent-sandbox) | Database |
| Plugin Daemon | `langgenius/dify-plugin-daemon:0.6.10-local` | Database |
| Agent Backend | `langgenius/dify-agent-backend:1.17.1` | Worker |
| Gateway | [baranberkay96/dify-railway](https://github.com/baranberkay96/dify-railway) (branch: main) (root: /services/gateway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | API | api | dify-api run mode. |
| `PORT` | API | 5001 | Port Railway health-checks and routes to. |
| `DB_HOST` | API | - | Postgres private host. |
| `DB_PORT` | API | - | Postgres port. |
| `DB_TYPE` | API | postgresql | Metadata database type. |
| `REDIS_DB` | API | 0 | Redis DB index for cache/locks. |
| `DIFY_PORT` | API | 5001 | Gunicorn listen port. |
| `FILES_URL` | API | - | Public prefix for signed file preview/download links. |
| `LOG_LEVEL` | API | INFO | Log verbosity (DEBUG, INFO, WARNING, ERROR). |
| `S3_REGION` | API | - | Railway Bucket region. |
| `DEPLOY_ENV` | API | PRODUCTION | Deployment environment flag. |
| `REDIS_HOST` | API | - | Redis private host. |
| `REDIS_PORT` | API | - | Redis port. |
| `SECRET_KEY` | API | (secret) | Flask signing/encryption key. Shared by API, WebSocket, Worker and Beat. Never change after first boot. |
| `APP_API_URL` | API | - | Public URL of the web-app API. |
| `APP_WEB_URL` | API | - | Public URL of published web apps. |
| `DB_DATABASE` | API | - | Dify metadata database. |
| `DB_PASSWORD` | API | (secret) | Postgres password. |
| `DB_USERNAME` | API | (secret) | Postgres user. |
| `S3_ENDPOINT` | API | - | Railway Bucket S3 endpoint. |
| `TRIGGER_URL` | API | - | Public prefix for workflow trigger webhooks. |
| `STORAGE_TYPE` | API | s3 | File storage backend: Railway Bucket via the S3 API. |
| `VECTOR_STORE` | API | weaviate | Vector database used for knowledge bases. |
| `INIT_PASSWORD` | API | (secret) | Password required on /install before the first admin account can be created. Read it from this variable. |
| `S3_ACCESS_KEY` | API | - | Railway Bucket access key. |
| `S3_SECRET_KEY` | API | (secret) | Railway Bucket secret key. |
| `CELERY_BACKEND` | API | redis | Celery result backend. |
| `REDIS_PASSWORD` | API | (secret) | Redis password. |
| `REDIS_USERNAME` | API | (secret) | Redis user. |
| `S3_BUCKET_NAME` | API | - | Railway Bucket name (S3 API name). |
| `CONSOLE_API_URL` | API | - | Public URL of the console API (same origin via Gateway). |
| `CONSOLE_WEB_URL` | API | - | Public URL of the console web UI. |
| `DIFY_PUBLIC_URL` | API | - | Public base URL of this Dify instance (the Gateway). Change here when you add a custom domain. |
| `SERVICE_API_URL` | API | - | Base URL shown for the Service API (/v1). |
| `GUNICORN_TIMEOUT` | API | 360 | Request timeout in seconds (long streaming responses). |
| `S3_ADDRESS_STYLE` | API | virtual | S3 addressing style. Railway Buckets use virtual-hosted style; set 'path' only if the bucket's Credentials tab says so. |
| `WEAVIATE_API_KEY` | API | (secret) | Weaviate API key. |
| `CELERY_BROKER_URL` | API | - | Celery broker (Redis DB 1). |
| `DIFY_BIND_ADDRESS` | API | [::] | Bind on IPv4+IPv6 so the private network can reach it. |
| `MIGRATION_ENABLED` | API | true | Run database migrations on boot (only this service migrates). |
| `PLUGIN_DAEMON_KEY` | API | - | Key the API uses to call Plugin Daemon. |
| `PLUGIN_DAEMON_URL` | API | - | Plugin Daemon endpoint (private). |
| `WEAVIATE_ENDPOINT` | API | - | Weaviate REST endpoint (private). |
| `INTERNAL_FILES_URL` | API | - | Private URL used by Plugin Daemon and Agent services to fetch files. |
| `MARKETPLACE_API_URL` | API | https://marketplace.dify.ai | Plugin marketplace API. |
| `MARKETPLACE_ENABLED` | API | true | Enable the Dify plugin marketplace. |
| `SERVER_WORKER_CLASS` | API | gevent | Gunicorn worker class. |
| `SSRF_PROXY_HTTP_URL` | API | - | SSRF proxy for outbound HTTP from workflows/tools. |
| `SERVER_WORKER_AMOUNT` | API | 1 | Gunicorn worker processes (raise with more RAM/CPU). |
| `SQLALCHEMY_POOL_SIZE` | API | 10 | DB pool size per process (kept below Postgres' default 100 connections across all services). |
| `SSRF_PROXY_HTTPS_URL` | API | - | SSRF proxy for outbound HTTPS from workflows/tools. |
| `ENDPOINT_URL_TEMPLATE` | API | - | Public URL template for plugin endpoints (routed by the Gateway to Plugin Daemon). |
| `PLUGIN_DAEMON_TIMEOUT` | API | 600.0 | Timeout (s) for plugin invocations. |
| `AGENT_BACKEND_BASE_URL` | API | - | Dify Agent backend endpoint (private). |
| `CODE_EXECUTION_API_KEY` | API | (secret) | Code sandbox API key. |
| `S3_USE_AWS_MANAGED_IAM` | API | false | Use static keys, not AWS IAM roles. |
| `WEAVIATE_GRPC_ENDPOINT` | API | - | Weaviate gRPC endpoint (private). |
| `AGENT_BACKEND_API_TOKEN` | API | (secret) | Bearer token for the Agent backend control plane. |
| `CODE_EXECUTION_ENDPOINT` | API | - | Code sandbox endpoint (private). |
| `PLUGIN_MAX_PACKAGE_SIZE` | API | 52428800 | Max plugin package size in bytes. |
| `SQLALCHEMY_MAX_OVERFLOW` | API | 5 | Extra DB connections allowed above the pool size. |
| `SQLALCHEMY_POOL_RECYCLE` | API | 3600 | Recycle DB connections after N seconds. |
| `INNER_API_KEY_FOR_PLUGIN` | API | (secret) | Key Plugin Daemon / Agent Backend use to call the API's inner endpoints. |
| `SQLALCHEMY_POOL_PRE_PING` | API | true | Validate pooled connections before use (survives idle network resets). |
| `ENABLE_COLLABORATION_MODE` | API | true | Real-time collaborative workflow editing via the API WebSocket service. |
| `SERVER_WORKER_CONNECTIONS` | API | 10 | Concurrent connections per worker. |
| `CONSOLE_CORS_ALLOW_ORIGINS` | API | - | Allowed origins for the console API (same origin by default). |
| `WEB_API_CORS_ALLOW_ORIGINS` | API | * | Allowed origins for the public web-app API (embeds need *). |
| `MODE` | Worker | worker | dify-api run mode: Celery worker for all queues. |
| `DB_HOST` | Worker | - | Postgres private host. |
| `DB_PORT` | Worker | - | Postgres port. |
| `DB_TYPE` | Worker | - | Metadata database type. |
| `REDIS_DB` | Worker | - | Redis DB index for cache/locks. |
| `FILES_URL` | Worker | - | Public prefix for signed file preview/download links. |
| `LOG_LEVEL` | Worker | - | Log verbosity (DEBUG, INFO, WARNING, ERROR). |
| `S3_REGION` | Worker | - | Railway Bucket region. |
| `DEPLOY_ENV` | Worker | - | Deployment environment flag. |
| `REDIS_HOST` | Worker | - | Redis private host. |
| `REDIS_PORT` | Worker | - | Redis port. |
| `SECRET_KEY` | Worker | (secret) | Flask signing/encryption key. Shared by API, WebSocket, Worker and Beat. Never change after first boot. |
| `APP_API_URL` | Worker | - | Public URL of the web-app API. |
| `APP_WEB_URL` | Worker | - | Public URL of published web apps. |
| `DB_DATABASE` | Worker | - | Dify metadata database. |
| `DB_PASSWORD` | Worker | (secret) | Postgres password. |
| `DB_USERNAME` | Worker | (secret) | Postgres user. |
| `S3_ENDPOINT` | Worker | - | Railway Bucket S3 endpoint. |
| `TRIGGER_URL` | Worker | - | Public prefix for workflow trigger webhooks. |
| `STORAGE_TYPE` | Worker | - | File storage backend: Railway Bucket via the S3 API. |
| `VECTOR_STORE` | Worker | - | Vector database used for knowledge bases. |
| `S3_ACCESS_KEY` | Worker | - | Railway Bucket access key. |
| `S3_SECRET_KEY` | Worker | (secret) | Railway Bucket secret key. |
| `CELERY_BACKEND` | Worker | - | Celery result backend. |
| `REDIS_PASSWORD` | Worker | (secret) | Redis password. |
| `REDIS_USERNAME` | Worker | (secret) | Redis user. |
| `S3_BUCKET_NAME` | Worker | - | Railway Bucket name (S3 API name). |
| `CONSOLE_API_URL` | Worker | - | Public URL of the console API (same origin via Gateway). |
| `CONSOLE_WEB_URL` | Worker | - | Public URL of the console web UI. |
| `DIFY_PUBLIC_URL` | Worker | - | Public base URL of this Dify instance (the Gateway). Change here when you add a custom domain. |
| `SERVICE_API_URL` | Worker | - | Base URL shown for the Service API (/v1). |
| `S3_ADDRESS_STYLE` | Worker | - | S3 addressing style. Railway Buckets use virtual-hosted style; set 'path' only if the bucket's Credentials tab says so. |
| `WEAVIATE_API_KEY` | Worker | (secret) | Weaviate API key. |
| `CELERY_AUTO_SCALE` | Worker | false | Autoscale Celery concurrency by CPU count. |
| `CELERY_BROKER_URL` | Worker | - | Celery broker (Redis DB 1). |
| `MIGRATION_ENABLED` | Worker | false | Migrations are run by the API service only. |
| `PLUGIN_DAEMON_KEY` | Worker | - | Key the API uses to call Plugin Daemon. |
| `PLUGIN_DAEMON_URL` | Worker | - | Plugin Daemon endpoint (private). |
| `WEAVIATE_ENDPOINT` | Worker | - | Weaviate REST endpoint (private). |
| `INTERNAL_FILES_URL` | Worker | - | Private URL used by Plugin Daemon and Agent services to fetch files. |
| `MARKETPLACE_API_URL` | Worker | - | Plugin marketplace API. |
| `MARKETPLACE_ENABLED` | Worker | - | Enable the Dify plugin marketplace. |
| `SSRF_PROXY_HTTP_URL` | Worker | - | SSRF proxy for outbound HTTP from workflows/tools. |
| `CELERY_WORKER_AMOUNT` | Worker | 4 | Celery concurrency (gevent greenlets) per replica. |
| `SQLALCHEMY_POOL_SIZE` | Worker | - | DB pool size per process (kept below Postgres' default 100 connections across all services). |
| `SSRF_PROXY_HTTPS_URL` | Worker | - | SSRF proxy for outbound HTTPS from workflows/tools. |
| `ENDPOINT_URL_TEMPLATE` | Worker | - | Public URL template for plugin endpoints (routed by the Gateway to Plugin Daemon). |
| `PLUGIN_DAEMON_TIMEOUT` | Worker | - | Timeout (s) for plugin invocations. |
| `AGENT_BACKEND_BASE_URL` | Worker | - | Dify Agent backend endpoint (private). |
| `CODE_EXECUTION_API_KEY` | Worker | (secret) | Code sandbox API key. |
| `S3_USE_AWS_MANAGED_IAM` | Worker | - | Use static keys, not AWS IAM roles. |
| `WEAVIATE_GRPC_ENDPOINT` | Worker | - | Weaviate gRPC endpoint (private). |
| `AGENT_BACKEND_API_TOKEN` | Worker | (secret) | Bearer token for the Agent backend control plane. |
| `CODE_EXECUTION_ENDPOINT` | Worker | - | Code sandbox endpoint (private). |
| `PLUGIN_MAX_PACKAGE_SIZE` | Worker | - | Max plugin package size in bytes. |
| `SQLALCHEMY_MAX_OVERFLOW` | Worker | - | Extra DB connections allowed above the pool size. |
| `SQLALCHEMY_POOL_RECYCLE` | Worker | - | Recycle DB connections after N seconds. |
| `INNER_API_KEY_FOR_PLUGIN` | Worker | (secret) | Key Plugin Daemon / Agent Backend use to call the API's inner endpoints. |
| `SQLALCHEMY_POOL_PRE_PING` | Worker | - | Validate pooled connections before use (survives idle network resets). |
| `ENABLE_COLLABORATION_MODE` | Worker | - | Real-time collaborative workflow editing via the API WebSocket service. |
| `CONSOLE_CORS_ALLOW_ORIGINS` | Worker | - | Allowed origins for the console API (same origin by default). |
| `WEB_API_CORS_ALLOW_ORIGINS` | Worker | - | Allowed origins for the public web-app API (embeds need *). |
| `HTTP_PORT` | SSRF Proxy | 3128 | Squid listen port. |
| `SSRF_PROXY_MODE` | SSRF Proxy | default | Policy: default = Dify egress proxy. |
| `SSRF_PROXY_ALLOW_PRIVATE_IPS` | SSRF Proxy | - | Optional comma-separated CIDRs that workflows may reach despite the private-network block. |
| `SSRF_PROXY_ALLOW_PRIVATE_DOMAINS` | SSRF Proxy | - | Optional comma-separated domains (e.g. .railway.internal) that workflows may reach. |
| `PORT` | Web | 3000 | Next.js listen port. |
| `HOSTNAME` | Web | :: | Listen on IPv4+IPv6. |
| `DEPLOY_ENV` | Web | PRODUCTION | Deployment environment flag. |
| `ALLOW_EMBED` | Web | false | Allow embedding the console in iframes (published apps are always embeddable). |
| `MAX_TOOLS_NUM` | Web | 10 | Max tools per agent. |
| `MAX_TREE_DEPTH` | Web | 50 | Max workflow nesting depth. |
| `CONSOLE_WEB_URL` | Web | - | Public console URL (web prefix). |
| `MARKETPLACE_URL` | Web | https://marketplace.dify.ai | Plugin marketplace site. |
| `TOP_K_MAX_VALUE` | Web | 10 | Max retrieval top-k in the UI. |
| `MAX_ITERATIONS_NUM` | Web | 99 | Max iteration-node items. |
| `MAX_PARALLEL_LIMIT` | Web | 10 | Max parallel branches. |
| `LOOP_NODE_MAX_COUNT` | Web | 100 | Max loop iterations in workflows. |
| `MARKETPLACE_API_URL` | Web | https://marketplace.dify.ai | Plugin marketplace API. |
| `NEXT_PUBLIC_SOCKET_URL` | Web | - | Public WebSocket origin for collaboration (update with a custom domain). |
| `SERVER_CONSOLE_API_URL` | Web | - | Private API URL for server-side rendering requests. |
| `NEXT_TELEMETRY_DISABLED` | Web | 1 | Disable Next.js telemetry. |
| `TEXT_GENERATION_TIMEOUT_MS` | Web | 60000 | Client timeout for text generation (ms). |
| `NEXT_PUBLIC_ENABLE_AGENT_V2` | Web | true | Show the Agent (v2) builder, backed by Agent Backend + Agent Sandbox. |
| `INDEXING_MAX_SEGMENTATION_TOKENS_LENGTH` | Web | (secret) | Max chunk length for knowledge indexing. |
| `HTTP_PORT` | Agent SSRF Proxy | 3128 | Squid listen port. |
| `DIFY_API_HOST` | Agent SSRF Proxy | - | API private hostname (allowed for /files/). |
| `SSRF_PROXY_MODE` | Agent SSRF Proxy | agent | Policy: agent = only Agent Stub + API /files/* on the private network, internet otherwise. |
| `DIFY_AGENT_BACKEND_HOST` | Agent SSRF Proxy | - | Agent Backend private hostname (allowed for /agent-stub/). |
| `SSRF_PROXY_ALLOW_PRIVATE_IPS` | Agent SSRF Proxy | - | Optional extra private CIDRs the agent may reach. |
| `SSRF_PROXY_ALLOW_PRIVATE_DOMAINS` | Agent SSRF Proxy | - | Optional extra private domains the agent may reach. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `MODE` | API WebSocket | api | dify-api run mode. |
| `PORT` | API WebSocket | 5001 | Port Railway health-checks and routes to. |
| `DB_HOST` | API WebSocket | - | Postgres private host. |
| `DB_PORT` | API WebSocket | - | Postgres port. |
| `DB_TYPE` | API WebSocket | - | Metadata database type. |
| `REDIS_DB` | API WebSocket | - | Redis DB index for cache/locks. |
| `DIFY_PORT` | API WebSocket | 5001 | Gunicorn listen port. |
| `FILES_URL` | API WebSocket | - | Public prefix for signed file preview/download links. |
| `LOG_LEVEL` | API WebSocket | - | Log verbosity (DEBUG, INFO, WARNING, ERROR). |
| `S3_REGION` | API WebSocket | - | Railway Bucket region. |
| `DEPLOY_ENV` | API WebSocket | - | Deployment environment flag. |
| `REDIS_HOST` | API WebSocket | - | Redis private host. |
| `REDIS_PORT` | API WebSocket | - | Redis port. |
| `SECRET_KEY` | API WebSocket | (secret) | Flask signing/encryption key. Shared by API, WebSocket, Worker and Beat. Never change after first boot. |
| `APP_API_URL` | API WebSocket | - | Public URL of the web-app API. |
| `APP_WEB_URL` | API WebSocket | - | Public URL of published web apps. |
| `DB_DATABASE` | API WebSocket | - | Dify metadata database. |
| `DB_PASSWORD` | API WebSocket | (secret) | Postgres password. |
| `DB_USERNAME` | API WebSocket | (secret) | Postgres user. |
| `S3_ENDPOINT` | API WebSocket | - | Railway Bucket S3 endpoint. |
| `TRIGGER_URL` | API WebSocket | - | Public prefix for workflow trigger webhooks. |
| `STORAGE_TYPE` | API WebSocket | - | File storage backend: Railway Bucket via the S3 API. |
| `VECTOR_STORE` | API WebSocket | - | Vector database used for knowledge bases. |
| `S3_ACCESS_KEY` | API WebSocket | - | Railway Bucket access key. |
| `S3_SECRET_KEY` | API WebSocket | (secret) | Railway Bucket secret key. |
| `CELERY_BACKEND` | API WebSocket | - | Celery result backend. |
| `REDIS_PASSWORD` | API WebSocket | (secret) | Redis password. |
| `REDIS_USERNAME` | API WebSocket | (secret) | Redis user. |
| `S3_BUCKET_NAME` | API WebSocket | - | Railway Bucket name (S3 API name). |
| `CONSOLE_API_URL` | API WebSocket | - | Public URL of the console API (same origin via Gateway). |
| `CONSOLE_WEB_URL` | API WebSocket | - | Public URL of the console web UI. |
| `DIFY_PUBLIC_URL` | API WebSocket | - | Public base URL of this Dify instance (the Gateway). Change here when you add a custom domain. |
| `SERVICE_API_URL` | API WebSocket | - | Base URL shown for the Service API (/v1). |
| `GUNICORN_TIMEOUT` | API WebSocket | 360 | Request timeout in seconds (long streaming responses). |
| `S3_ADDRESS_STYLE` | API WebSocket | - | S3 addressing style. Railway Buckets use virtual-hosted style; set 'path' only if the bucket's Credentials tab says so. |
| `WEAVIATE_API_KEY` | API WebSocket | (secret) | Weaviate API key. |
| `CELERY_BROKER_URL` | API WebSocket | - | Celery broker (Redis DB 1). |
| `DIFY_BIND_ADDRESS` | API WebSocket | [::] | Bind on IPv4+IPv6 so the private network can reach it. |
| `MIGRATION_ENABLED` | API WebSocket | false | Migrations are run by the API service only. |
| `PLUGIN_DAEMON_KEY` | API WebSocket | - | Key the API uses to call Plugin Daemon. |
| `PLUGIN_DAEMON_URL` | API WebSocket | - | Plugin Daemon endpoint (private). |
| `WEAVIATE_ENDPOINT` | API WebSocket | - | Weaviate REST endpoint (private). |
| `INTERNAL_FILES_URL` | API WebSocket | - | Private URL used by Plugin Daemon and Agent services to fetch files. |
| `MARKETPLACE_API_URL` | API WebSocket | - | Plugin marketplace API. |
| `MARKETPLACE_ENABLED` | API WebSocket | - | Enable the Dify plugin marketplace. |
| `SERVER_WORKER_CLASS` | API WebSocket | geventwebsocket.gunicorn.workers.GeventWebSocketWorker | Gunicorn worker class. |
| `SSRF_PROXY_HTTP_URL` | API WebSocket | - | SSRF proxy for outbound HTTP from workflows/tools. |
| `SERVER_WORKER_AMOUNT` | API WebSocket | 1 | Gunicorn worker processes (raise with more RAM/CPU). |
| `SQLALCHEMY_POOL_SIZE` | API WebSocket | - | DB pool size per process (kept below Postgres' default 100 connections across all services). |
| `SSRF_PROXY_HTTPS_URL` | API WebSocket | - | SSRF proxy for outbound HTTPS from workflows/tools. |
| `ENDPOINT_URL_TEMPLATE` | API WebSocket | - | Public URL template for plugin endpoints (routed by the Gateway to Plugin Daemon). |
| `PLUGIN_DAEMON_TIMEOUT` | API WebSocket | - | Timeout (s) for plugin invocations. |
| `AGENT_BACKEND_BASE_URL` | API WebSocket | - | Dify Agent backend endpoint (private). |
| `CODE_EXECUTION_API_KEY` | API WebSocket | (secret) | Code sandbox API key. |
| `S3_USE_AWS_MANAGED_IAM` | API WebSocket | - | Use static keys, not AWS IAM roles. |
| `WEAVIATE_GRPC_ENDPOINT` | API WebSocket | - | Weaviate gRPC endpoint (private). |
| `AGENT_BACKEND_API_TOKEN` | API WebSocket | (secret) | Bearer token for the Agent backend control plane. |
| `CODE_EXECUTION_ENDPOINT` | API WebSocket | - | Code sandbox endpoint (private). |
| `PLUGIN_MAX_PACKAGE_SIZE` | API WebSocket | - | Max plugin package size in bytes. |
| `SQLALCHEMY_MAX_OVERFLOW` | API WebSocket | - | Extra DB connections allowed above the pool size. |
| `SQLALCHEMY_POOL_RECYCLE` | API WebSocket | - | Recycle DB connections after N seconds. |
| `INNER_API_KEY_FOR_PLUGIN` | API WebSocket | (secret) | Key Plugin Daemon / Agent Backend use to call the API's inner endpoints. |
| `SQLALCHEMY_POOL_PRE_PING` | API WebSocket | - | Validate pooled connections before use (survives idle network resets). |
| `ENABLE_COLLABORATION_MODE` | API WebSocket | - | Real-time collaborative workflow editing via the API WebSocket service. |
| `SERVER_WORKER_CONNECTIONS` | API WebSocket | 1000 | Concurrent connections per worker. |
| `CONSOLE_CORS_ALLOW_ORIGINS` | API WebSocket | - | Allowed origins for the console API (same origin by default). |
| `WEB_API_CORS_ALLOW_ORIGINS` | API WebSocket | - | Allowed origins for the public web-app API (embeds need *). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | Weaviate | 8080 | REST port (gRPC is 50051). |
| `CLUSTER_HOSTNAME` | Weaviate | node1 | Stable node name; do not change after first boot. |
| `DISABLE_TELEMETRY` | Weaviate | true | Disable Weaviate telemetry. |
| `QUERY_DEFAULTS_LIMIT` | Weaviate | 25 | Default query limit. |
| `PERSISTENCE_DATA_PATH` | Weaviate | /var/lib/weaviate | Data directory (the volume). |
| `DEFAULT_VECTORIZER_MODULE` | Weaviate | none | Dify sends its own embeddings. |
| `AUTHENTICATION_APIKEY_USERS` | Weaviate | dify | User mapped to the API key. |
| `AUTHENTICATION_APIKEY_ENABLED` | Weaviate | true | Enable API-key auth. |
| `AUTHORIZATION_ADMINLIST_USERS` | Weaviate | - | Admin users. |
| `AUTHORIZATION_ADMINLIST_ENABLED` | Weaviate | true | Admin-list authorization. |
| `AUTHENTICATION_APIKEY_ALLOWED_KEYS` | Weaviate | - | API key Dify uses. |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Weaviate | false | Require an API key. |
| `PORT` | Sandbox | 8194 | Port Railway health-checks. |
| `API_KEY` | Sandbox | (secret) | Key the API uses to call the code sandbox. |
| `GIN_MODE` | Sandbox | release | Go web framework mode. |
| `HTTP_PROXY` | Sandbox | - | Egress via SSRF proxy. |
| `HTTPS_PROXY` | Sandbox | - | Egress via SSRF proxy. |
| `SANDBOX_PORT` | Sandbox | 8194 | Sandbox listen port. |
| `ENABLE_NETWORK` | Sandbox | true | Allow sandboxed code to make network calls (through the SSRF proxy). |
| `PIP_MIRROR_URL` | Sandbox | - | Optional PyPI mirror for extra Python packages. |
| `WORKER_TIMEOUT` | Sandbox | 15 | Max code execution time (s). |
| `MODE` | Worker Beat | beat | dify-api run mode: Celery beat scheduler (run exactly one). |
| `DB_HOST` | Worker Beat | - | Postgres private host. |
| `DB_PORT` | Worker Beat | - | Postgres port. |
| `DB_TYPE` | Worker Beat | - | Metadata database type. |
| `REDIS_DB` | Worker Beat | - | Redis DB index for cache/locks. |
| `FILES_URL` | Worker Beat | - | Public prefix for signed file preview/download links. |
| `LOG_LEVEL` | Worker Beat | - | Log verbosity (DEBUG, INFO, WARNING, ERROR). |
| `S3_REGION` | Worker Beat | - | Railway Bucket region. |
| `DEPLOY_ENV` | Worker Beat | - | Deployment environment flag. |
| `REDIS_HOST` | Worker Beat | - | Redis private host. |
| `REDIS_PORT` | Worker Beat | - | Redis port. |
| `SECRET_KEY` | Worker Beat | (secret) | Flask signing/encryption key. Shared by API, WebSocket, Worker and Beat. Never change after first boot. |
| `APP_API_URL` | Worker Beat | - | Public URL of the web-app API. |
| `APP_WEB_URL` | Worker Beat | - | Public URL of published web apps. |
| `DB_DATABASE` | Worker Beat | - | Dify metadata database. |
| `DB_PASSWORD` | Worker Beat | (secret) | Postgres password. |
| `DB_USERNAME` | Worker Beat | (secret) | Postgres user. |
| `S3_ENDPOINT` | Worker Beat | - | Railway Bucket S3 endpoint. |
| `TRIGGER_URL` | Worker Beat | - | Public prefix for workflow trigger webhooks. |
| `STORAGE_TYPE` | Worker Beat | - | File storage backend: Railway Bucket via the S3 API. |
| `VECTOR_STORE` | Worker Beat | - | Vector database used for knowledge bases. |
| `S3_ACCESS_KEY` | Worker Beat | - | Railway Bucket access key. |
| `S3_SECRET_KEY` | Worker Beat | (secret) | Railway Bucket secret key. |
| `CELERY_BACKEND` | Worker Beat | - | Celery result backend. |
| `REDIS_PASSWORD` | Worker Beat | (secret) | Redis password. |
| `REDIS_USERNAME` | Worker Beat | (secret) | Redis user. |
| `S3_BUCKET_NAME` | Worker Beat | - | Railway Bucket name (S3 API name). |
| `CONSOLE_API_URL` | Worker Beat | - | Public URL of the console API (same origin via Gateway). |
| `CONSOLE_WEB_URL` | Worker Beat | - | Public URL of the console web UI. |
| `DIFY_PUBLIC_URL` | Worker Beat | - | Public base URL of this Dify instance (the Gateway). Change here when you add a custom domain. |
| `SERVICE_API_URL` | Worker Beat | - | Base URL shown for the Service API (/v1). |
| `S3_ADDRESS_STYLE` | Worker Beat | - | S3 addressing style. Railway Buckets use virtual-hosted style; set 'path' only if the bucket's Credentials tab says so. |
| `WEAVIATE_API_KEY` | Worker Beat | (secret) | Weaviate API key. |
| `CELERY_BROKER_URL` | Worker Beat | - | Celery broker (Redis DB 1). |
| `MIGRATION_ENABLED` | Worker Beat | false | Migrations are run by the API service only. |
| `PLUGIN_DAEMON_KEY` | Worker Beat | - | Key the API uses to call Plugin Daemon. |
| `PLUGIN_DAEMON_URL` | Worker Beat | - | Plugin Daemon endpoint (private). |
| `WEAVIATE_ENDPOINT` | Worker Beat | - | Weaviate REST endpoint (private). |
| `INTERNAL_FILES_URL` | Worker Beat | - | Private URL used by Plugin Daemon and Agent services to fetch files. |
| `MARKETPLACE_API_URL` | Worker Beat | - | Plugin marketplace API. |
| `MARKETPLACE_ENABLED` | Worker Beat | - | Enable the Dify plugin marketplace. |
| `SSRF_PROXY_HTTP_URL` | Worker Beat | - | SSRF proxy for outbound HTTP from workflows/tools. |
| `SQLALCHEMY_POOL_SIZE` | Worker Beat | - | DB pool size per process (kept below Postgres' default 100 connections across all services). |
| `SSRF_PROXY_HTTPS_URL` | Worker Beat | - | SSRF proxy for outbound HTTPS from workflows/tools. |
| `ENDPOINT_URL_TEMPLATE` | Worker Beat | - | Public URL template for plugin endpoints (routed by the Gateway to Plugin Daemon). |
| `PLUGIN_DAEMON_TIMEOUT` | Worker Beat | - | Timeout (s) for plugin invocations. |
| `AGENT_BACKEND_BASE_URL` | Worker Beat | - | Dify Agent backend endpoint (private). |
| `CODE_EXECUTION_API_KEY` | Worker Beat | (secret) | Code sandbox API key. |
| `S3_USE_AWS_MANAGED_IAM` | Worker Beat | - | Use static keys, not AWS IAM roles. |
| `WEAVIATE_GRPC_ENDPOINT` | Worker Beat | - | Weaviate gRPC endpoint (private). |
| `AGENT_BACKEND_API_TOKEN` | Worker Beat | (secret) | Bearer token for the Agent backend control plane. |
| `CODE_EXECUTION_ENDPOINT` | Worker Beat | - | Code sandbox endpoint (private). |
| `PLUGIN_MAX_PACKAGE_SIZE` | Worker Beat | - | Max plugin package size in bytes. |
| `SQLALCHEMY_MAX_OVERFLOW` | Worker Beat | - | Extra DB connections allowed above the pool size. |
| `SQLALCHEMY_POOL_RECYCLE` | Worker Beat | - | Recycle DB connections after N seconds. |
| `INNER_API_KEY_FOR_PLUGIN` | Worker Beat | (secret) | Key Plugin Daemon / Agent Backend use to call the API's inner endpoints. |
| `SQLALCHEMY_POOL_PRE_PING` | Worker Beat | - | Validate pooled connections before use (survives idle network resets). |
| `ENABLE_COLLABORATION_MODE` | Worker Beat | - | Real-time collaborative workflow editing via the API WebSocket service. |
| `CONSOLE_CORS_ALLOW_ORIGINS` | Worker Beat | - | Allowed origins for the console API (same origin by default). |
| `WEB_API_CORS_ALLOW_ORIGINS` | Worker Beat | - | Allowed origins for the public web-app API (embeds need *). |
| `PORT` | Agent Sandbox | 5004 | Port Railway health-checks. |
| `NO_PROXY` | Agent Sandbox | localhost,127.0.0.1 | Hosts that bypass the proxy. |
| `HTTP_PROXY` | Agent Sandbox | - | Egress via the agent SSRF proxy. |
| `HTTPS_PROXY` | Agent Sandbox | - | Egress via the agent SSRF proxy. |
| `SHELLCTL_AUTH_TOKEN` | Agent Sandbox | (secret) | Token the Agent Backend presents. |
| `SHELLCTL_ENABLE_PATH_ISOLATION` | Agent Sandbox | true | Landlock path isolation for agent shell jobs. Set false only if jobs fail with Landlock errors. |
| `PORT` | Plugin Daemon | 5002 | Port Railway health-checks. |
| `DB_HOST` | Plugin Daemon | - | Postgres private host. |
| `DB_PORT` | Plugin Daemon | - | Postgres port. |
| `DB_TYPE` | Plugin Daemon | postgresql | Database type. |
| `REDIS_DB` | Plugin Daemon | 0 | Redis DB index (keys are prefixed). |
| `REDIS_HOST` | Plugin Daemon | - | Redis private host. |
| `REDIS_PORT` | Plugin Daemon | - | Redis port. |
| `SERVER_KEY` | Plugin Daemon | - | Key the API presents to Plugin Daemon. |
| `DB_DATABASE` | Plugin Daemon | dify_plugin | Plugin database (created automatically on first boot). |
| `DB_PASSWORD` | Plugin Daemon | (secret) | Postgres password. |
| `DB_SSL_MODE` | Plugin Daemon | disable | Private network; TLS not required. |
| `DB_USERNAME` | Plugin Daemon | (secret) | Postgres user. |
| `SERVER_HOST` | Plugin Daemon | [::] | Listen on IPv4+IPv6. |
| `SERVER_PORT` | Plugin Daemon | 5002 | Plugin Daemon HTTP port. |
| `PPROF_ENABLED` | Plugin Daemon | false | Go profiler endpoint. |
| `PIP_MIRROR_URL` | Plugin Daemon | - | Optional PyPI mirror for plugin installs. |
| `REDIS_PASSWORD` | Plugin Daemon | (secret) | Redis password. |
| `REDIS_USERNAME` | Plugin Daemon | (secret) | Redis user. |
| `DB_MAX_IDLE_CONNS` | Plugin Daemon | 5 | Idle DB connections kept open. |
| `DB_MAX_OPEN_CONNS` | Plugin Daemon | 20 | Max DB connections. |
| `DIFY_INNER_API_KEY` | Plugin Daemon | (secret) | Key Plugin Daemon presents to the API inner endpoints. |
| `DIFY_INNER_API_URL` | Plugin Daemon | - | API inner endpoint (private). |
| `PLUGIN_STORAGE_TYPE` | Plugin Daemon | local | Plugin packages are kept on this service's volume. |
| `PLUGIN_WORKING_PATH` | Plugin Daemon | /app/storage/cwd | Where installed plugins run (Python envs). |
| `PLUGIN_INSTALLED_PATH` | Plugin Daemon | plugin | Installed plugins sub-directory. |
| `MAX_PLUGIN_PACKAGE_SIZE` | Plugin Daemon | 52428800 | Max plugin package size in bytes. |
| `PLUGIN_MEDIA_CACHE_PATH` | Plugin Daemon | assets | Plugin asset cache sub-directory. |
| `PYTHON_ENV_INIT_TIMEOUT` | Plugin Daemon | 120 | Timeout (s) to build a plugin's Python environment. |
| `FORCE_VERIFYING_SIGNATURE` | Plugin Daemon | true | Only allow signed marketplace plugins. |
| `PLUGIN_PACKAGE_CACHE_PATH` | Plugin Daemon | plugin_packages | Package cache sub-directory. |
| `PLUGIN_STORAGE_LOCAL_ROOT` | Plugin Daemon | /app/storage | Storage root (the volume). |
| `PLUGIN_MAX_EXECUTION_TIMEOUT` | Plugin Daemon | 600 | Max plugin execution time (s). |
| `PLUGIN_REMOTE_INSTALLING_HOST` | Plugin Daemon | 0.0.0.0 | Remote plugin-debugging listener (needs a TCP proxy on 5003 to be used). |
| `PLUGIN_REMOTE_INSTALLING_PORT` | Plugin Daemon | 5003 | Remote plugin-debugging port. |
| `PORT` | Agent Backend | 5050 | Port Railway health-checks. |
| `DIFY_AGENT_API_TOKEN` | Agent Backend | (secret) | Bearer token the API uses for the Agent control plane. |
| `DIFY_AGENT_REDIS_URL` | Agent Backend | - | Agent run store (Redis DB 2). |
| `DIFY_AGENT_INNER_API_KEY` | Agent Backend | (secret) | Must equal the API's INNER_API_KEY_FOR_PLUGIN. |
| `DIFY_AGENT_INNER_API_URL` | Agent Backend | - | API inner endpoint. |
| `DIFY_AGENT_RUNTIME_BACKEND` | Agent Backend | local | Sandbox backend: local (Agent Sandbox service) or e2b. |
| `DIFY_AGENT_PLUGIN_DAEMON_URL` | Agent Backend | - | Plugin Daemon endpoint. |
| `DIFY_AGENT_SERVER_SECRET_KEY` | Agent Backend | (secret) | Root secret (43-char base64url = 32 bytes) for Agent Stub token encryption. |
| `DIFY_AGENT_STUB_API_BASE_URL` | Agent Backend | - | Agent Stub URL the sandbox calls (through Agent SSRF Proxy). |
| `DIFY_AGENT_RUN_TIMEOUT_SECONDS` | Agent Backend | 3600 | Max agent run time (s). |
| `DIFY_AGENT_PLUGIN_DAEMON_API_KEY` | Agent Backend | (secret) | Plugin Daemon key. |
| `DIFY_AGENT_LOCAL_SANDBOX_ENDPOINT` | Agent Backend | - | Agent Sandbox (shellctl) endpoint. |
| `DIFY_AGENT_SANDBOX_FILES_BASE_URL` | Agent Backend | - | API base for sandbox file transfers (/files/*). |
| `DIFY_AGENT_LOCAL_SANDBOX_AUTH_TOKEN` | Agent Backend | (secret) | Token shared with the Agent Sandbox. |
| `PORT` | Gateway | 8080 | Port nginx listens on (public domain target). |
| `DIFY_API_UPSTREAM` | Gateway | - | API private address. |
| `DIFY_WEB_UPSTREAM` | Gateway | - | Web (Next.js) private address. |
| `NGINX_PROXY_TIMEOUT` | Gateway | 3600s | Proxy read/send timeout (long-running streams). |
| `DIFY_SOCKET_UPSTREAM` | Gateway | - | API WebSocket private address (/socket.io). |
| `NGINX_CLIENT_MAX_BODY_SIZE` | Gateway | 100M | Max upload size through the gateway. |
| `DIFY_PLUGIN_DAEMON_UPSTREAM` | Gateway | - | Plugin Daemon private address (/e/ plugin endpoints). |

## Configuration

- **Healthcheck:** `/health`
- **Healthcheck:** `/signin`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/weaviate --host :: --port 8080 --scheme http`
- **Healthcheck:** `/v1/.well-known/ready`
- **Volume:** `/var/lib/weaviate`
- **Volume:** `/dependencies`
- **Healthcheck:** `/healthz`
- **Volume:** `/home/dify`
- **Healthcheck:** `/health/check`
- **Volume:** `/app/storage`
- **Start command:** `uvicorn dify_agent.server.app:app --host 0.0.0.0 --port 5050`
- **Healthcheck:** `/docs`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Tags:** dify, llm, agents, rag, workflow · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/dify-v1-ai-app-studio)
