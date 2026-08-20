# Deploy Dify on Railway

Visual builder for AI apps, chatbots and document workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-ai)

## About

Dify is an open-source platform for building applications on top of large language models. Instead of wiring prompts, retrieval and tool calls together in code, you compose them on a visual canvas: a workflow node graph, a chatflow for conversational products, agents that pick their own tools, and knowledge bases that answer from your documents. Every app is also an API, so a browser-designed prototype becomes a production endpoint without a rewrite. Dify is model-agnostic: you bring your own provider keys — OpenAI, Anthropic, Gemini, Bedrock, or a local OpenAI-compatible endpoint — and switch per node.

Self-host Dify on Railway and you get the full production topology, not a single container. A Caddy router is the one public service, forwarding the console, the console and service APIs, file endpoints, the collaboration websocket and plugin webhooks to the right backend on one origin. Behind it sit the Next.js frontend, the API server, a websocket service for multi-user editing, a Celery worker, a beat scheduler, the plugin daemon running model providers and tools, a code sandbox, and a Squid egress proxy blocking requests to private addresses. PostgreSQL stores apps, conversations and vectors via pgvector, Redis carries the queue and pub/sub, and a managed bucket holds uploads.

![Diagram of eleven Dify services and three volumes on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787149685/dify-architecture.png)

Dify sits between a prompt playground and a full application framework, handling what every LLM product needs — prompt versioning, retrieval, tool calling, conversation state and observability — so your team writes product logic instead of plumbing. Self-hosting matters when prompts, documents or conversation logs cannot leave your infrastructure, or when per-seat pricing stops making sense.

Key capabilities:

- Visual workflow and chatflow builder with branching, loops and human-in-the-loop nodes
- Knowledge bases with configurable chunking, hybrid search and reranking
- Agents that select tools autonomously, plus a marketplace of models, tools and data sources
- Every app published as a REST API with its own keys, plus embeddable web apps
- Logs, annotations and evaluation over conversations

The multi-service shape is what makes it production-grade. The API server handles requests; the Celery worker runs indexing and scheduled triggers off the request path; the beat scheduler enqueues periodic work; the websocket service keeps canvas editing in sync; the plugin daemon isolates third-party code; and the sandbox runs code nodes away from your application. The Squid proxy in front of every outbound fetch is a real security control — it stops a workflow HTTP node being pointed at internal infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | `langgenius/dify-api:1.16.1` | Worker |
| Redis | `redis:8.2` | Database |
| sandbox | `langgenius/dify-sandbox:0.2.15` | Worker |
| worker | `langgenius/dify-api:1.16.1` | Worker |
| proxy | [gridalpha/dify-railway](https://github.com/gridalpha/dify-railway) (root: proxy) | Web service |
| worker-beat | `langgenius/dify-api:1.16.1` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | `langgenius/dify-web:1.16.1` | Worker |
| api-websocket | `langgenius/dify-api:1.16.1` | Worker |
| ssrf-proxy | [gridalpha/dify-railway](https://github.com/gridalpha/dify-railway) (root: ssrf-proxy) | Worker |
| plugin-daemon | `langgenius/dify-plugin-daemon:0.6.3-local` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LANG` | api | C.UTF-8 | Locale |
| `MODE` | api | api | Run as the API server |
| `PORT` | api | 5001 | Health check port |
| `DEBUG` | api | false | Debug mode off |
| `LC_ALL` | api | C.UTF-8 | Locale |
| `LOG_TZ` | api | UTC | Log timestamp timezone |
| `DB_HOST` | api | - | Postgres host |
| `DB_PORT` | api | - | Postgres port |
| `DB_TYPE` | api | postgresql | Database engine |
| `EDITION` | api | SELF_HOSTED | Community edition feature set |
| `REDIS_DB` | api | 0 | Redis database index |
| `DIFY_PORT` | api | 5001 | Application listening port |
| `FILES_URL` | api | - | Public file endpoint base |
| `LOG_LEVEL` | api | INFO | Application log level |
| `S3_REGION` | api | - | Bucket region |
| `DEPLOY_ENV` | api | PRODUCTION | Production behaviour |
| `REDIS_HOST` | api | - | Redis host |
| `REDIS_PORT` | api | - | Redis port |
| `SECRET_KEY` | api | (secret) | Signs sessions, encrypts provider keys |
| `APP_API_URL` | api | - | Web app API base URL |
| `APP_WEB_URL` | api | - | Web app base URL |
| `DB_DATABASE` | api | - | Application database |
| `DB_PASSWORD` | api | (secret) | Postgres password |
| `DB_USERNAME` | api | (secret) | Postgres user |
| `FLASK_DEBUG` | api | false | Flask debug off |
| `S3_ENDPOINT` | api | - | Bucket endpoint |
| `TRIGGER_URL` | api | - | Workflow trigger base URL |
| `STORAGE_TYPE` | api | s3 | Object storage for uploads |
| `UV_CACHE_DIR` | api | /tmp/.uv-cache | Writable dependency cache |
| `VECTOR_STORE` | api | pgvector | Vectors stored in Postgres |
| `INIT_PASSWORD` | api | (secret) | Gates the first-run setup screen |
| `PGVECTOR_HOST` | api | - | pgvector host |
| `PGVECTOR_PORT` | api | - | pgvector port |
| `PGVECTOR_USER` | api | (secret) | pgvector user |
| `S3_ACCESS_KEY` | api | - | Bucket access key |
| `S3_SECRET_KEY` | api | (secret) | Bucket secret key |
| `ALLOW_REGISTER` | api | false | Public sign-up disabled |
| `CELERY_BACKEND` | api | redis | Celery result backend |
| `REDIS_PASSWORD` | api | (secret) | Redis password |
| `REDIS_USERNAME` | api | (secret) | Redis user |
| `S3_BUCKET_NAME` | api | - | Bucket name |
| `CONSOLE_API_URL` | api | - | Console API base URL |
| `CONSOLE_WEB_URL` | api | - | Console base URL |
| `ENABLE_AGENT_V2` | api | false | Agent v2 backend not deployed |
| `MARKETPLACE_URL` | api | https://marketplace.dify.ai | Marketplace site |
| `SERVICE_API_URL` | api | - | Published app API base URL |
| `CHECK_UPDATE_URL` | api | https://updates.dify.ai | Update check endpoint |
| `GUNICORN_TIMEOUT` | api | 360 | Request timeout for long generations |
| `PYTHONIOENCODING` | api | utf-8 | Python IO encoding |
| `S3_ADDRESS_STYLE` | api | auto | Bucket addressing style |
| `CELERY_BROKER_URL` | api | - | Task queue |
| `DIFY_BIND_ADDRESS` | api | 0.0.0.0 | Listen on all interfaces |
| `MIGRATION_ENABLED` | api | true | Run schema migrations at boot |
| `PGVECTOR_DATABASE` | api | - | pgvector database |
| `PGVECTOR_PASSWORD` | api | (secret) | pgvector password |
| `PLUGIN_DAEMON_KEY` | api | - | Plugin daemon auth |
| `PLUGIN_DAEMON_URL` | api | - | Plugin daemon URL |
| `INTERNAL_FILES_URL` | api | - | Private file endpoint base |
| `SCARF_NO_ANALYTICS` | api | true | Disable package analytics |
| `EVENT_BUS_REDIS_URL` | api | - | Pub/sub channel |
| `MARKETPLACE_API_URL` | api | https://marketplace.dify.ai | Marketplace API |
| `MARKETPLACE_ENABLED` | api | true | Plugin marketplace enabled |
| `SERVER_WORKER_CLASS` | api | gevent | Gunicorn worker class |
| `SSRF_PROXY_HTTP_URL` | api | - | Outbound HTTP proxy |
| `REDIS_SOCKET_TIMEOUT` | api | 300 | High, or the collaboration socket drops events |
| `SERVER_WORKER_AMOUNT` | api | 2 | Gunicorn worker processes |
| `SQLALCHEMY_POOL_SIZE` | api | 20 | Connection pool size |
| `SSRF_PROXY_HTTPS_URL` | api | - | Outbound HTTPS proxy |
| `ENDPOINT_URL_TEMPLATE` | api | - | Plugin webhook URL shape |
| `ALLOW_CREATE_WORKSPACE` | api | false | Workspace self-creation disabled |
| `CODE_EXECUTION_API_KEY` | api | (secret) | Code sandbox auth |
| `CODE_EXECUTION_ENDPOINT` | api | - | Code sandbox URL |
| `ENABLE_EMAIL_CODE_LOGIN` | api | (secret) | Emailed code sign-in off |
| `PGVECTOR_MAX_CONNECTION` | api | 5 | Max vector pool connections |
| `PGVECTOR_MIN_CONNECTION` | api | 1 | Min vector pool connections |
| `PLUGIN_MAX_PACKAGE_SIZE` | api | 52428800 | Max plugin package bytes |
| `SQLALCHEMY_MAX_OVERFLOW` | api | 10 | Pool overflow allowance |
| `SQLALCHEMY_POOL_RECYCLE` | api | 3600 | Recycle connections after an hour |
| `INNER_API_KEY_FOR_PLUGIN` | api | (secret) | Auth for plugin daemon callbacks |
| `SQLALCHEMY_POOL_PRE_PING` | api | true | Validate connections before use |
| `ENABLE_COLLABORATION_MODE` | api | true | Multi-user canvas editing |
| `ENABLE_SOCIAL_OAUTH_LOGIN` | api | (secret) | OAuth sign-in off |
| `FORCE_VERIFYING_SIGNATURE` | api | true | Only signed plugins install |
| `SERVER_WORKER_CONNECTIONS` | api | 100 | Connections per worker |
| `ENABLE_EMAIL_PASSWORD_LOGIN` | api | (secret) | Email and password sign-in |
| `EVENT_BUS_REDIS_CHANNEL_TYPE` | api | pubsub | Event transport mode |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | sandbox | 8194 | Health check port |
| `API_KEY` | sandbox | (secret) | Auth for API to sandbox calls |
| `GIN_MODE` | sandbox | release | Production HTTP server mode |
| `HTTP_PROXY` | sandbox | - | Forced egress proxy |
| `HTTPS_PROXY` | sandbox | - | Forced egress proxy |
| `SANDBOX_PORT` | sandbox | 8194 | Sandbox listening port |
| `ENABLE_NETWORK` | sandbox | true | Allow network from code nodes |
| `WORKER_TIMEOUT` | sandbox | 15 | Max code execution seconds |
| `LANG` | worker | C.UTF-8 | Locale |
| `MODE` | worker | worker | Run as the Celery worker |
| `DEBUG` | worker | false | Debug mode off |
| `LC_ALL` | worker | C.UTF-8 | Locale |
| `LOG_TZ` | worker | UTC | Log timestamp timezone |
| `DB_HOST` | worker | - | Postgres host |
| `DB_PORT` | worker | - | Postgres port |
| `DB_TYPE` | worker | postgresql | Database engine |
| `EDITION` | worker | SELF_HOSTED | Community edition feature set |
| `REDIS_DB` | worker | 0 | Redis database index |
| `FILES_URL` | worker | - | Public file endpoint base |
| `LOG_LEVEL` | worker | INFO | Application log level |
| `S3_REGION` | worker | - | Bucket region |
| `DEPLOY_ENV` | worker | PRODUCTION | Production behaviour |
| `REDIS_HOST` | worker | - | Redis host |
| `REDIS_PORT` | worker | - | Redis port |
| `SECRET_KEY` | worker | (secret) | Shared session signing key |
| `APP_API_URL` | worker | - | Web app API base URL |
| `APP_WEB_URL` | worker | - | Web app base URL |
| `DB_DATABASE` | worker | - | Application database |
| `DB_PASSWORD` | worker | (secret) | Postgres password |
| `DB_USERNAME` | worker | (secret) | Postgres user |
| `S3_ENDPOINT` | worker | - | Bucket endpoint |
| `TRIGGER_URL` | worker | - | Workflow trigger base URL |
| `STORAGE_TYPE` | worker | s3 | Object storage for uploads |
| `UV_CACHE_DIR` | worker | /tmp/.uv-cache | Writable dependency cache |
| `VECTOR_STORE` | worker | pgvector | Vectors stored in Postgres |
| `PGVECTOR_HOST` | worker | - | pgvector host |
| `PGVECTOR_PORT` | worker | - | pgvector port |
| `PGVECTOR_USER` | worker | (secret) | pgvector user |
| `S3_ACCESS_KEY` | worker | - | Bucket access key |
| `S3_SECRET_KEY` | worker | (secret) | Bucket secret key |
| `CELERY_BACKEND` | worker | redis | Celery result backend |
| `REDIS_PASSWORD` | worker | (secret) | Redis password |
| `REDIS_USERNAME` | worker | (secret) | Redis user |
| `S3_BUCKET_NAME` | worker | - | Bucket name |
| `CONSOLE_API_URL` | worker | - | Console API base URL |
| `CONSOLE_WEB_URL` | worker | - | Console base URL |
| `MARKETPLACE_URL` | worker | https://marketplace.dify.ai | Marketplace site |
| `SERVICE_API_URL` | worker | - | Published app API base URL |
| `PYTHONIOENCODING` | worker | utf-8 | Python IO encoding |
| `S3_ADDRESS_STYLE` | worker | auto | Bucket addressing style |
| `CELERY_AUTO_SCALE` | worker | false | Autoscale sizes from host cores, keep off |
| `CELERY_BROKER_URL` | worker | - | Task queue |
| `MIGRATION_ENABLED` | worker | false | Migrations run on the API only |
| `PGVECTOR_DATABASE` | worker | - | pgvector database |
| `PGVECTOR_PASSWORD` | worker | (secret) | pgvector password |
| `PLUGIN_DAEMON_KEY` | worker | - | Plugin daemon auth |
| `PLUGIN_DAEMON_URL` | worker | - | Plugin daemon URL |
| `INTERNAL_FILES_URL` | worker | - | Private file endpoint base |
| `SCARF_NO_ANALYTICS` | worker | true | Disable package analytics |
| `CELERY_WORKER_CLASS` | worker | gevent | Celery pool implementation |
| `EVENT_BUS_REDIS_URL` | worker | - | Pub/sub channel |
| `MARKETPLACE_API_URL` | worker | https://marketplace.dify.ai | Marketplace API |
| `MARKETPLACE_ENABLED` | worker | true | Plugin marketplace enabled |
| `SSRF_PROXY_HTTP_URL` | worker | - | Outbound HTTP proxy |
| `CELERY_WORKER_AMOUNT` | worker | 4 | Worker concurrency |
| `SQLALCHEMY_POOL_SIZE` | worker | 20 | Connection pool size |
| `SSRF_PROXY_HTTPS_URL` | worker | - | Outbound HTTPS proxy |
| `ENDPOINT_URL_TEMPLATE` | worker | - | Plugin webhook URL shape |
| `CODE_EXECUTION_API_KEY` | worker | (secret) | Code sandbox auth |
| `CODE_EXECUTION_ENDPOINT` | worker | - | Code sandbox URL |
| `PGVECTOR_MAX_CONNECTION` | worker | 5 | Max vector pool connections |
| `PGVECTOR_MIN_CONNECTION` | worker | 1 | Min vector pool connections |
| `SQLALCHEMY_POOL_RECYCLE` | worker | 3600 | Recycle connections after an hour |
| `INNER_API_KEY_FOR_PLUGIN` | worker | (secret) | Shared plugin callback auth |
| `SQLALCHEMY_POOL_PRE_PING` | worker | true | Validate connections before use |
| `FORCE_VERIFYING_SIGNATURE` | worker | true | Only signed plugins install |
| `EVENT_BUS_REDIS_CHANNEL_TYPE` | worker | pubsub | Event transport mode |
| `PORT` | proxy | 8080 | Caddy listening port |
| `DIFY_API_UPSTREAM` | proxy | - | Console and service API backend |
| `DIFY_WEB_UPSTREAM` | proxy | - | Frontend backend |
| `DIFY_API_WEBSOCKET_UPSTREAM` | proxy | - | Collaboration socket backend |
| `DIFY_PLUGIN_DAEMON_UPSTREAM` | proxy | - | Plugin webhook backend |
| `LANG` | worker-beat | C.UTF-8 | Locale |
| `MODE` | worker-beat | beat | Run as the Celery scheduler |
| `DEBUG` | worker-beat | false | Debug mode off |
| `LC_ALL` | worker-beat | C.UTF-8 | Locale |
| `LOG_TZ` | worker-beat | UTC | Log timestamp timezone |
| `DB_HOST` | worker-beat | - | Postgres host |
| `DB_PORT` | worker-beat | - | Postgres port |
| `DB_TYPE` | worker-beat | postgresql | Database engine |
| `EDITION` | worker-beat | SELF_HOSTED | Community edition feature set |
| `REDIS_DB` | worker-beat | 0 | Redis database index |
| `FILES_URL` | worker-beat | - | Public file endpoint base |
| `LOG_LEVEL` | worker-beat | INFO | Application log level |
| `S3_REGION` | worker-beat | - | Bucket region |
| `DEPLOY_ENV` | worker-beat | PRODUCTION | Production behaviour |
| `REDIS_HOST` | worker-beat | - | Redis host |
| `REDIS_PORT` | worker-beat | - | Redis port |
| `SECRET_KEY` | worker-beat | (secret) | Shared session signing key |
| `APP_API_URL` | worker-beat | - | Web app API base URL |
| `APP_WEB_URL` | worker-beat | - | Web app base URL |
| `DB_DATABASE` | worker-beat | - | Application database |
| `DB_PASSWORD` | worker-beat | (secret) | Postgres password |
| `DB_USERNAME` | worker-beat | (secret) | Postgres user |
| `S3_ENDPOINT` | worker-beat | - | Bucket endpoint |
| `STORAGE_TYPE` | worker-beat | s3 | Object storage for uploads |
| `UV_CACHE_DIR` | worker-beat | /tmp/.uv-cache | Writable dependency cache |
| `VECTOR_STORE` | worker-beat | pgvector | Vectors stored in Postgres |
| `PGVECTOR_HOST` | worker-beat | - | pgvector host |
| `PGVECTOR_PORT` | worker-beat | - | pgvector port |
| `PGVECTOR_USER` | worker-beat | (secret) | pgvector user |
| `S3_ACCESS_KEY` | worker-beat | - | Bucket access key |
| `S3_SECRET_KEY` | worker-beat | (secret) | Bucket secret key |
| `CELERY_BACKEND` | worker-beat | redis | Celery result backend |
| `REDIS_PASSWORD` | worker-beat | (secret) | Redis password |
| `REDIS_USERNAME` | worker-beat | (secret) | Redis user |
| `S3_BUCKET_NAME` | worker-beat | - | Bucket name |
| `CONSOLE_API_URL` | worker-beat | - | Console API base URL |
| `CONSOLE_WEB_URL` | worker-beat | - | Console base URL |
| `SERVICE_API_URL` | worker-beat | - | Published app API base URL |
| `PYTHONIOENCODING` | worker-beat | utf-8 | Python IO encoding |
| `S3_ADDRESS_STYLE` | worker-beat | auto | Bucket addressing style |
| `CELERY_BROKER_URL` | worker-beat | - | Task queue |
| `MIGRATION_ENABLED` | worker-beat | false | Migrations run on the API only |
| `PGVECTOR_DATABASE` | worker-beat | - | pgvector database |
| `PGVECTOR_PASSWORD` | worker-beat | (secret) | pgvector password |
| `PLUGIN_DAEMON_KEY` | worker-beat | - | Plugin daemon auth |
| `PLUGIN_DAEMON_URL` | worker-beat | - | Plugin daemon URL |
| `SCARF_NO_ANALYTICS` | worker-beat | true | Disable package analytics |
| `SSRF_PROXY_HTTP_URL` | worker-beat | - | Outbound HTTP proxy |
| `SQLALCHEMY_POOL_SIZE` | worker-beat | 5 | Connection pool size |
| `SSRF_PROXY_HTTPS_URL` | worker-beat | - | Outbound HTTPS proxy |
| `SQLALCHEMY_POOL_RECYCLE` | worker-beat | 3600 | Recycle connections after an hour |
| `INNER_API_KEY_FOR_PLUGIN` | worker-beat | (secret) | Shared plugin callback auth |
| `SQLALCHEMY_POOL_PRE_PING` | worker-beat | true | Validate connections before use |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | web | 3000 | Next.js listening port |
| `DEPLOY_ENV` | web | PRODUCTION | Disables development behaviour |
| `ALLOW_EMBED` | web | false | Disallow embedding the console in iframes |
| `APP_API_URL` | web | - | Published app API base URL |
| `MAX_TOOLS_NUM` | web | 10 | Tools per agent ceiling |
| `MAX_TREE_DEPTH` | web | 50 | Workflow depth ceiling |
| `CONSOLE_API_URL` | web | - | Console API base URL |
| `CONSOLE_WEB_URL` | web | - | Console base URL |
| `MARKETPLACE_URL` | web | https://marketplace.dify.ai | Plugin marketplace site |
| `TOP_K_MAX_VALUE` | web | 10 | Retrieval top-k ceiling |
| `MAX_ITERATIONS_NUM` | web | 99 | Iteration node ceiling |
| `MAX_PARALLEL_LIMIT` | web | 10 | Parallel branch ceiling |
| `LOOP_NODE_MAX_COUNT` | web | 100 | Loop node iteration ceiling |
| `MARKETPLACE_API_URL` | web | https://marketplace.dify.ai | Plugin marketplace API |
| `NEXT_PUBLIC_SOCKET_URL` | web | - | Collaboration websocket URL |
| `SERVER_CONSOLE_API_URL` | web | - | Server-side API calls |
| `NEXT_TELEMETRY_DISABLED` | web | 1 | Turns off Next.js telemetry |
| `ALLOW_UNSAFE_DATA_SCHEME` | web | false | Block data: URLs in rendered output |
| `ENABLE_WEBSITE_FIRECRAWL` | web | true | Firecrawl web import |
| `ENABLE_WEBSITE_JINAREADER` | web | true | Jina Reader web import |
| `ENABLE_WEBSITE_WATERCRAWL` | web | true | Watercrawl web import |
| `EXPERIMENTAL_ENABLE_VINEXT` | web | false | Experimental frontend runtime off |
| `TEXT_GENERATION_TIMEOUT_MS` | web | 60000 | Client generation timeout |
| `NEXT_PUBLIC_ENABLE_AGENT_V2` | web | false | Agent v2 surface off; backend not deployed |
| `WORKFLOW_GENERATION_TIMEOUT_MS` | web | 180000 | Client workflow timeout |
| `INDEXING_MAX_SEGMENTATION_TOKENS_LENGTH` | web | (secret) | Max chunk size when indexing |
| `LANG` | api-websocket | C.UTF-8 | Locale |
| `MODE` | api-websocket | api | Same image, websocket role |
| `PORT` | api-websocket | 5001 | Health check port |
| `DEBUG` | api-websocket | false | Debug mode off |
| `LC_ALL` | api-websocket | C.UTF-8 | Locale |
| `LOG_TZ` | api-websocket | UTC | Log timestamp timezone |
| `DB_HOST` | api-websocket | - | Postgres host |
| `DB_PORT` | api-websocket | - | Postgres port |
| `DB_TYPE` | api-websocket | postgresql | Database engine |
| `EDITION` | api-websocket | SELF_HOSTED | Community edition feature set |
| `REDIS_DB` | api-websocket | 0 | Redis database index |
| `DIFY_PORT` | api-websocket | 5001 | Application listening port |
| `FILES_URL` | api-websocket | - | Public file endpoint base |
| `LOG_LEVEL` | api-websocket | INFO | Application log level |
| `S3_REGION` | api-websocket | - | Bucket region |
| `DEPLOY_ENV` | api-websocket | PRODUCTION | Production behaviour |
| `REDIS_HOST` | api-websocket | - | Redis host |
| `REDIS_PORT` | api-websocket | - | Redis port |
| `SECRET_KEY` | api-websocket | (secret) | Shared session signing key |
| `APP_API_URL` | api-websocket | - | Web app API base URL |
| `APP_WEB_URL` | api-websocket | - | Web app base URL |
| `DB_DATABASE` | api-websocket | - | Application database |
| `DB_PASSWORD` | api-websocket | (secret) | Postgres password |
| `DB_USERNAME` | api-websocket | (secret) | Postgres user |
| `FLASK_DEBUG` | api-websocket | false | Flask debug off |
| `S3_ENDPOINT` | api-websocket | - | Bucket endpoint |
| `STORAGE_TYPE` | api-websocket | s3 | Object storage for uploads |
| `UV_CACHE_DIR` | api-websocket | /tmp/.uv-cache | Writable dependency cache |
| `VECTOR_STORE` | api-websocket | pgvector | Vectors stored in Postgres |
| `PGVECTOR_HOST` | api-websocket | - | pgvector host |
| `PGVECTOR_PORT` | api-websocket | - | pgvector port |
| `PGVECTOR_USER` | api-websocket | (secret) | pgvector user |
| `S3_ACCESS_KEY` | api-websocket | - | Bucket access key |
| `S3_SECRET_KEY` | api-websocket | (secret) | Bucket secret key |
| `ALLOW_REGISTER` | api-websocket | false | Public sign-up disabled |
| `CELERY_BACKEND` | api-websocket | redis | Celery result backend |
| `REDIS_PASSWORD` | api-websocket | (secret) | Redis password |
| `REDIS_USERNAME` | api-websocket | (secret) | Redis user |
| `S3_BUCKET_NAME` | api-websocket | - | Bucket name |
| `CONSOLE_API_URL` | api-websocket | - | Console API base URL |
| `CONSOLE_WEB_URL` | api-websocket | - | Console base URL |
| `SERVICE_API_URL` | api-websocket | - | Published app API base URL |
| `GUNICORN_TIMEOUT` | api-websocket | 360 | Request timeout |
| `PYTHONIOENCODING` | api-websocket | utf-8 | Python IO encoding |
| `S3_ADDRESS_STYLE` | api-websocket | auto | Bucket addressing style |
| `CELERY_BROKER_URL` | api-websocket | - | Task queue |
| `DIFY_BIND_ADDRESS` | api-websocket | 0.0.0.0 | Listen on all interfaces |
| `MIGRATION_ENABLED` | api-websocket | false | Migrations run on the API only |
| `PGVECTOR_DATABASE` | api-websocket | - | pgvector database |
| `PGVECTOR_PASSWORD` | api-websocket | (secret) | pgvector password |
| `PLUGIN_DAEMON_KEY` | api-websocket | - | Plugin daemon auth |
| `PLUGIN_DAEMON_URL` | api-websocket | - | Plugin daemon URL |
| `INTERNAL_FILES_URL` | api-websocket | - | Private file endpoint base |
| `SCARF_NO_ANALYTICS` | api-websocket | true | Disable package analytics |
| `EVENT_BUS_REDIS_URL` | api-websocket | - | Pub/sub channel |
| `SERVER_WORKER_CLASS` | api-websocket | geventwebsocket.gunicorn.workers.GeventWebSocketWorker | Websocket worker class |
| `SSRF_PROXY_HTTP_URL` | api-websocket | - | Outbound HTTP proxy |
| `REDIS_SOCKET_TIMEOUT` | api-websocket | 300 | High, or the collaboration socket drops events |
| `SERVER_WORKER_AMOUNT` | api-websocket | 1 | Gunicorn worker processes |
| `SQLALCHEMY_POOL_SIZE` | api-websocket | 10 | Connection pool size |
| `SSRF_PROXY_HTTPS_URL` | api-websocket | - | Outbound HTTPS proxy |
| `ALLOW_CREATE_WORKSPACE` | api-websocket | false | Workspace self-creation disabled |
| `SQLALCHEMY_POOL_RECYCLE` | api-websocket | 3600 | Recycle connections after an hour |
| `INNER_API_KEY_FOR_PLUGIN` | api-websocket | (secret) | Shared plugin callback auth |
| `SQLALCHEMY_POOL_PRE_PING` | api-websocket | true | Validate connections before use |
| `ENABLE_COLLABORATION_MODE` | api-websocket | true | Multi-user canvas editing |
| `SERVER_WORKER_CONNECTIONS` | api-websocket | 1000 | Concurrent websocket connections |
| `EVENT_BUS_REDIS_CHANNEL_TYPE` | api-websocket | pubsub | Event transport mode |
| `HTTP_PORT` | ssrf-proxy | 3128 | Squid listening port |
| `COREDUMP_DIR` | ssrf-proxy | /var/spool/squid | Squid coredump directory |
| `PORT` | plugin-daemon | 5002 | Health check port |
| `DB_HOST` | plugin-daemon | - | Postgres host |
| `DB_PORT` | plugin-daemon | - | Postgres port |
| `DB_TYPE` | plugin-daemon | postgresql | Database engine |
| `PLATFORM` | plugin-daemon | local | Run plugins in-process |
| `REDIS_DB` | plugin-daemon | 0 | Redis database index |
| `REDIS_HOST` | plugin-daemon | - | Redis host |
| `REDIS_PORT` | plugin-daemon | - | Redis port |
| `SERVER_KEY` | plugin-daemon | - | Auth for API to daemon calls |
| `DB_DATABASE` | plugin-daemon | dify_plugin | Created by the daemon on first boot |
| `DB_PASSWORD` | plugin-daemon | (secret) | Postgres password |
| `DB_SSL_MODE` | plugin-daemon | disable | Private network, no TLS needed |
| `DB_USERNAME` | plugin-daemon | (secret) | Postgres user |
| `SERVER_PORT` | plugin-daemon | 5002 | Daemon listening port |
| `PPROF_ENABLED` | plugin-daemon | false | Profiling endpoint off |
| `REDIS_PASSWORD` | plugin-daemon | (secret) | Redis password |
| `REDIS_USERNAME` | plugin-daemon | (secret) | Redis user |
| `ROUTINE_POOL_SIZE` | plugin-daemon | 10000 | Goroutine pool size |
| `DIFY_INNER_API_KEY` | plugin-daemon | (secret) | API callback auth |
| `DIFY_INNER_API_URL` | plugin-daemon | - | API callback URL |
| `DB_DEFAULT_DATABASE` | plugin-daemon | postgres | Required; used to create the above |
| `PLUGIN_STORAGE_TYPE` | plugin-daemon | local | Plugins stored on the volume |
| `PLUGIN_WORKING_PATH` | plugin-daemon | /app/storage/cwd | Plugin runtime working directory |
| `PLUGIN_INSTALLED_PATH` | plugin-daemon | plugin | Installed plugin subdirectory |
| `PIP_MIRROR_AUTO_DETECT` | plugin-daemon | false | Use the default package index |
| `MAX_PLUGIN_PACKAGE_SIZE` | plugin-daemon | 52428800 | Max plugin package bytes |
| `PLUGIN_MEDIA_CACHE_PATH` | plugin-daemon | assets | Media cache subdirectory |
| `PYTHON_ENV_INIT_TIMEOUT` | plugin-daemon | 120 | Plugin environment build timeout |
| `FORCE_VERIFYING_SIGNATURE` | plugin-daemon | true | Only signed plugins install |
| `PLUGIN_PACKAGE_CACHE_PATH` | plugin-daemon | plugin_packages | Package cache subdirectory |
| `PLUGIN_STORAGE_LOCAL_ROOT` | plugin-daemon | /app/storage | Volume mount path |
| `LIFETIME_STATE_GC_INTERVAL` | plugin-daemon | 300 | State GC seconds |
| `PLUGIN_MAX_EXECUTION_TIMEOUT` | plugin-daemon | 600 | Max plugin execution seconds |
| `PLUGIN_REMOTE_INSTALLING_HOST` | plugin-daemon | 0.0.0.0 | Remote plugin debug bind address |
| `PLUGIN_REMOTE_INSTALLING_PORT` | plugin-daemon | 5003 | Remote plugin debug port |
| `LIFETIME_COLLECTION_GC_INTERVAL` | plugin-daemon | 60 | Cluster GC seconds |
| `LIFETIME_COLLECTION_HEARTBEAT_INTERVAL` | plugin-daemon | 5 | Cluster heartbeat seconds |
| `DIFY_INVOCATION_CONNECTION_IDLE_TIMEOUT` | plugin-daemon | 120 | Idle invocation timeout |

## Configuration

- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/signin`
- **Healthcheck:** `/health/check`
- **Volume:** `/app/storage`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/dify-ai)
