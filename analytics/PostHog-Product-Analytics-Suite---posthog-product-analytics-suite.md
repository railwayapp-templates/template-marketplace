# Deploy PostHog Product Analytics Suite on Railway

Self-hosted product analytics, session replay, feature flags and A/B tests.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/posthog-product-analytics-suite)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/posthog-product-analytics-suite?referralCode=20H68q)

PostHog is an open-source product platform: product analytics, web analytics, session replay, feature flags, experiments, surveys and error tracking in one tool. This community template deploys PostHog's full self-hosted ("hobby") stack on Railway, built from PostHog's own images and compose files, with every secret generated for you.

Self-hosted PostHog is a distributed system, not a single container. Rust capture services receive events from the SDKs and write them to Kafka. Node.js ingestion services enrich them (persons, groups, GeoIP, transformations) and feed ClickHouse, where every chart and query runs. Django serves the app and API, Celery and Temporal run background jobs and exports, and SeaweedFS stores session recordings and exports. This template runs every process of PostHog's hobby stack in 23 Railway services (related processes share a service to stay within Railway's 25-service template limit), wired together over the private network behind one public router. It runs database migrations before the app starts, creates the Kafka topics, bakes in the GeoIP database and keeps ClickHouse tuned for a container. You open one URL and create your account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| temporal | `temporalio/auto-setup:1.29.7` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| seaweedfs | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/seaweedfs) | Database |
| proxy | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/proxy) | Web service |
| browserless | `ghcr.io/browserless/chromium:v2.57.0` | Worker |
| plugins | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/posthog-node) | Worker |
| kafka | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/kafka) | Database |
| zookeeper | `zookeeper:3.9.6` | Database |
| property-defs | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/property-defs) | Worker |
| capture-logs | `ghcr.io/posthog/posthog/capture-logs:sha-04cdf1c` | Worker |
| hypercache-server | `ghcr.io/posthog/posthog/hypercache-server:sha-14bcc04` | Worker |
| Redis | `redis:7.2.16-alpine` | Database |
| capture | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/capture) | Worker |
| temporal-django-worker | `posthog/posthog:sha-716405ddea318758493221f26e844512757c7927` | Worker |
| feature-flags | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/feature-flags) | Worker |
| worker | `posthog/posthog:sha-716405ddea318758493221f26e844512757c7927` | Worker |
| personhog | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/personhog) | Worker |
| recordings | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/posthog-node) | Worker |
| clickhouse | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/clickhouse) | Database |
| livestream | `ghcr.io/posthog/posthog/livestream:397fc8862e1ca5121a8679f0f686afde88d70b14` | Worker |
| cymbal | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/cymbal) | Worker |
| ingestion | [baranberkay96/posthog-railway](https://github.com/baranberkay96/posthog-railway) (branch: main) (root: /services/posthog-node) | Worker |
| web | `posthog/posthog:sha-716405ddea318758493221f26e844512757c7927` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB` | temporal | postgres12 | Postgres persistence plugin. |
| `PORT` | temporal | 7243 | Frontend HTTP API port; /api/v1/system-info is the healthcheck. |
| `DB_PORT` | temporal | 5432 | Postgres port. |
| `ENABLE_ES` | temporal | false | SQL visibility store (upstream hobby setting). |
| `BIND_ON_IP` | temporal | ::0 | Listen on all interfaces (dual-stack). |
| `POSTGRES_PWD` | temporal | - | Postgres password (reference). |
| `POSTGRES_USER` | temporal | (secret) | Postgres user (needs CREATE DATABASE). |
| `POSTGRES_SEEDS` | temporal | - | Postgres host. |
| `TEMPORAL_ADDRESS` | temporal | 127.0.0.1:7233 | Address the setup script uses to create the namespace. |
| `DYNAMIC_CONFIG_FILE_PATH` | temporal | config/dynamicconfig/docker.yaml | Dynamic config shipped in the image. |
| `TEMPORAL_BROADCAST_ADDRESS` | temporal | 127.0.0.1 | Single-node membership address. |
| `POSTGRES_DB` | Postgres | posthog | Default database created when image is started (PostHog's database name). |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | seaweedfs | 8333 | S3 port; /healthz is the healthcheck. |
| `S3_PORT` | seaweedfs | 8333 | S3 gateway port. |
| `S3_BUCKETS` | seaweedfs | posthog,ai-blobs | Buckets created at start (idempotent). |
| `AWS_ACCESS_KEY_ID` | seaweedfs | - | S3 access key (admin identity). |
| `AWS_SECRET_ACCESS_KEY` | seaweedfs | (secret) | S3 secret key. |
| `PORT` | proxy | 8080 | Caddy listen port (public domain target). |
| `WEB_UPSTREAM` | proxy | - | Django web app. |
| `CAPTURE_UPSTREAM` | proxy | - | Event capture (/e, /i/v0, /batch, /capture). |
| `PLUGINS_UPSTREAM` | proxy | - | Webhook sources (/public/webhooks, /public/m). |
| `CAPTURE_AI_UPSTREAM` | proxy | - | LLM analytics capture (/i/v0/ai; ai process of the capture service). |
| `HYPERCACHE_UPSTREAM` | proxy | - | Surveys and remote config (/surveys, /array). |
| `LIVESTREAM_UPSTREAM` | proxy | - | Live events stream (/livestream). |
| `CAPTURE_LOGS_UPSTREAM` | proxy | - | OTLP logs/traces/metrics capture (/i/v1/logs, /i/v1/traces, /i/v1/metrics). |
| `FEATURE_FLAGS_UPSTREAM` | proxy | - | Feature flags (/flags, local evaluation). |
| `OBJECTSTORAGE_UPSTREAM` | proxy | - | Presigned object downloads (/posthog/*). |
| `REPLAY_CAPTURE_UPSTREAM` | proxy | - | Session replay capture (/s; recordings process of the capture service). |
| `HOST` | browserless | :: | Listen on all interfaces (dual-stack). |
| `PORT` | browserless | 3000 | HTTP/WebSocket port. |
| `DEBUG` | browserless | -* | Silence debug namespaces (upstream hobby value). |
| `TOKEN` | browserless | (secret) | Browserless API token (separate from Django's SECRET_KEY). |
| `LOG_LEVEL` | browserless | warn | Log level (upstream hobby value). |
| `PORT` | plugins | 6738 | Node HTTP server port (HTTP_SERVER_PORT default); /_health is the healthcheck. |
| `SITE_URL` | plugins | - | Public URL of PostHog. |
| `REDIS_URL` | plugins | - | Redis connection string. |
| `SECRET_KEY` | plugins | (secret) | Must match web. |
| `KAFKA_HOSTS` | plugins | - | Kafka (Redpanda) bootstrap server. |
| `DATABASE_URL` | plugins | - | Postgres connection string. |
| `CDP_REDIS_HOST` | plugins | - | Redis host for CDP state (function health, rate limits). |
| `CDP_REDIS_PORT` | plugins | 6379 | Redis port. |
| `LOGS_REDIS_TLS` | plugins | false | No TLS on the private network. |
| `CDP_VALKEY_HOST` | plugins | - | Not read by the pinned node build. Newer builds dual-write CDP state to a Valkey host and refuse to start without one; it points at Redis so an upgrade keeps working (the hobby compose runs a separate Valkey). |
| `CDP_VALKEY_PORT` | plugins | 6379 | Port for CDP_VALKEY_HOST. |
| `CLICKHOUSE_HOST` | plugins | - | ClickHouse host. |
| `CLICKHOUSE_USER` | plugins | (secret) | ClickHouse user. |
| `LOGS_REDIS_HOST` | plugins | - | Redis for logs-product state. The pinned node build does not pass LOGS_REDIS_PASSWORD to this pool, so the full URL (with password) goes here; ioredis accepts it. |
| `LOGS_REDIS_PORT` | plugins | 6379 | Redis port. |
| `TRACES_REDIS_TLS` | plugins | false | No TLS on the private network. |
| `CLICKHOUSE_SECURE` | plugins | false | Plain TCP inside the private network. |
| `CLICKHOUSE_VERIFY` | plugins | false | No TLS verification. |
| `TRACES_REDIS_HOST` | plugins | - | Redis for traces-product state. Full URL with password, as for LOGS_REDIS_HOST. |
| `TRACES_REDIS_PORT` | plugins | 6379 | Redis port. |
| `CDP_REDIS_PASSWORD` | plugins | (secret) | Redis password (reference). |
| `CDP_VALKEY_PASSWORD` | plugins | (secret) | Password for CDP_VALKEY_HOST (reference). |
| `CLICKHOUSE_DATABASE` | plugins | posthog | ClickHouse database. |
| `CLICKHOUSE_PASSWORD` | plugins | (secret) | ClickHouse password (reference). |
| `LOGS_REDIS_PASSWORD` | plugins | (secret) | Redis password (reference). |
| `ENCRYPTION_SALT_KEYS` | plugins | - | Must match web (decrypts encrypted function inputs). |
| `PERSONS_DATABASE_URL` | plugins | - | Persons live in the main database (hobby layout). |
| `TRACES_REDIS_PASSWORD` | plugins | (secret) | Redis password (reference). |
| `OBJECT_STORAGE_ENABLED` | plugins | true | Use object storage. |
| `OBJECT_STORAGE_ENDPOINT` | plugins | - | SeaweedFS S3 endpoint. |
| `NODEJS_CAPABILITY_GROUPS` | plugins | cdp_workflows,realtime_cohorts,logs,traces,feature_flags | Capabilities of this process: the default plugin-server set plus traces ingestion (replaces upstream's ingestion-logs and ingestion-traces services). |
| `OBJECT_STORAGE_ACCESS_KEY_ID` | plugins | - | Object storage access key (reference). |
| `OBJECT_STORAGE_PUBLIC_ENDPOINT` | plugins | - | Public base URL for presigned links. |
| `BEHAVIORAL_COHORTS_DATABASE_URL` | plugins | - | Behavioral cohorts live in the main database (hobby layout). |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | plugins | (secret) | Object storage secret key (reference). |
| `PORT` | kafka | 9644 | Admin API port; /v1/status/ready is the healthcheck. |
| `REDPANDA_SMP` | kafka | 1 | CPU cores Redpanda uses. |
| `REDPANDA_MEMORY` | kafka | 1G | Memory Redpanda allocates (upstream hobby uses 3G). |
| `KAFKA_LOG_RETENTION_MS` | kafka | 86400000 | Topic retention (24 h). Kafka is a buffer here; ClickHouse holds the data. |
| `PORT` | zookeeper | 8080 | ZooKeeper AdminServer port; /commands/ruok is the healthcheck. |
| `ZK_SERVER_HEAP` | zookeeper | 256 | JVM heap in MB (image default 1000); ClickHouse's coordination data is small. |
| `ZOO_DATA_LOG_DIR` | zookeeper | /data/datalog | Transaction log on the volume (Railway allows one volume per service). |
| `ZOO_AUTOPURGE_PURGEINTERVAL` | zookeeper | 1 | Purge old snapshots hourly (upstream hobby value). |
| `ZOO_AUTOPURGE_SNAPRETAINCOUNT` | zookeeper | 3 | Snapshots to keep (upstream hobby value). |
| `PORT` | property-defs | 3301 | HTTP port of the events process (/_readiness). |
| `SKIP_READS` | property-defs | false | Read existing definitions. |
| `FILTER_MODE` | property-defs | opt-out | Process all teams unless opted out. |
| `KAFKA_HOSTS` | property-defs | - | Kafka bootstrap server. |
| `SKIP_WRITES` | property-defs | false | Write definitions. |
| `DATABASE_URL` | property-defs | - | Postgres connection string. |
| `PORT` | capture-logs | 8080 | Management port (/_readiness, /_liveness, metrics); Railway healthcheck target. |
| `RUST_LOG` | capture-logs | info,rdkafka=warn | Log level. |
| `BIND_HOST` | capture-logs | :: | OTLP listen address (dual-stack). |
| `BIND_PORT` | capture-logs | 4318 | OTLP HTTP port. |
| `JWT_SECRET` | capture-logs | (secret) | Secret for capture-logs JWT handling (upstream compose ships a placeholder string). |
| `KAFKA_HOSTS` | capture-logs | - | Kafka bootstrap server. |
| `KAFKA_TOPIC` | capture-logs | logs_ingestion | Logs topic. |
| `RUST_BACKTRACE` | capture-logs | 1 | Backtraces on panic. |
| `KAFKA_METRICS_TOPIC` | capture-logs | metrics_ingestion | Metrics topic. |
| `MANAGEMENT_BIND_PORT` | capture-logs | 8080 | Management port. |
| `PORT` | hypercache-server | 3002 | HTTP port; /_readiness is the healthcheck. |
| `ADDRESS` | hypercache-server | [::]:3002 | Bind address (dual-stack). |
| `RUST_LOG` | hypercache-server | info | Log level. |
| `REDIS_URL` | hypercache-server | - | Redis connection string. |
| `AWS_ACCESS_KEY_ID` | hypercache-server | - | Object storage access key (reference). |
| `AWS_SECRET_ACCESS_KEY` | hypercache-server | (secret) | Object storage secret key (reference). |
| `OBJECT_STORAGE_ENDPOINT` | hypercache-server | - | HyperCache S3 tier endpoint (SeaweedFS). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `REDIS_MAXMEMORY` | Redis | 512mb | Memory cap with LRU eviction (hobby compose uses 200mb). |
| `PORT` | capture | 3000 | Events capture port; /_readiness is the healthcheck. |
| `RUST_LOG` | capture | info,rdkafka=warn | Log level. |
| `REDIS_URL` | capture | - | Redis (quota limits, event restrictions). |
| `KAFKA_HOSTS` | capture | - | Kafka bootstrap server. |
| `CAPTURE_AI_PORT` | capture | 3001 | Port of the LLM analytics (ai) process. |
| `CAPTURE_EVENTS_PORT` | capture | 3000 | Port of the events process. |
| `CAPTURE_REPLAY_PORT` | capture | 3002 | Port of the session replay (recordings) process. |
| `CAPTURE_AI_LANE_TOPIC` | capture | events_plugin_ingestion | Topic for LLM analytics events. The main topic, because the pinned Node build does not consume PostHog's separate AI lane (events_plugin_ingestion_ai); change only together with a Node image that does. |
| `KAFKA_INGESTION_PRODUCER_METADATA_BROKER_LIST` | capture | - | Kafka metadata broker list for the producer. |
| `SITE_URL` | temporal-django-worker | - | Same as web: Public URL of PostHog (the proxy domain). |
| `REDIS_URL` | temporal-django-worker | - | Same as web: Redis for cache, Celery broker and locks. |
| `DEPLOYMENT` | temporal-django-worker | - | Same as web: Deployment type; hobby keeps persons in the main database. |
| `SECRET_KEY` | temporal-django-worker | (secret) | Same as web: Django secret key; signs sessions and tokens. |
| `CDP_API_URL` | temporal-django-worker | - | Same as web: Internal URL of the plugins (CDP) service. |
| `KAFKA_HOSTS` | temporal-django-worker | - | Same as web: Kafka (Redpanda) bootstrap server. |
| `DATABASE_URL` | temporal-django-worker | - | Same as web: Postgres connection string. |
| `OPENAI_MODEL` | temporal-django-worker | - | Same as web: Model used for OpenAI-backed assists. |
| `TEMPORAL_HOST` | temporal-django-worker | - | Same as web: Temporal frontend host (batch exports, data warehouse, workflows). |
| `OPENAI_API_KEY` | temporal-django-worker | (secret) | Same as web: Optional OpenAI key for SQL/regex assist. |
| `PERSONHOG_ADDR` | temporal-django-worker | - | Same as web: gRPC address of the personhog router. |
| `CLICKHOUSE_HOST` | temporal-django-worker | - | Same as web: ClickHouse host (private network). |
| `CLICKHOUSE_USER` | temporal-django-worker | (secret) | Same as web: ClickHouse admin user used for queries and migrations. |
| `IS_BEHIND_PROXY` | temporal-django-worker | - | Same as web: Trust X-Forwarded-* from the Caddy proxy / Railway edge. |
| `OPENAI_BASE_URL` | temporal-django-worker | - | Same as web: OpenAI-compatible API base URL. |
| `ANTHROPIC_API_KEY` | temporal-django-worker | (secret) | Same as web: Optional Anthropic key for PostHog AI. |
| `BROWSERLESS_TOKEN` | temporal-django-worker | (secret) | Browserless token (reference). |
| `CLICKHOUSE_SECURE` | temporal-django-worker | - | Same as web: Plain TCP inside the private network. |
| `CLICKHOUSE_VERIFY` | temporal-django-worker | - | Same as web: No TLS verification (no TLS on the private network). |
| `OTEL_SDK_DISABLED` | temporal-django-worker | - | Same as web: No OpenTelemetry export from Django. |
| `PERSONHOG_ENABLED` | temporal-django-worker | - | Same as web: Read persons through personhog, as upstream hobby does. |
| `RECORDING_API_URL` | temporal-django-worker | - | Same as web: Internal URL of the recording API (replay playback). |
| `BROWSERLESS_CDP_URL` | temporal-django-worker | - | Browserless CDP endpoint for image exports. |
| `CLICKHOUSE_API_USER` | temporal-django-worker | (secret) | Same as web: ClickHouse user for API queries. |
| `CLICKHOUSE_APP_USER` | temporal-django-worker | (secret) | Same as web: ClickHouse user for app queries. |
| `CLICKHOUSE_DATABASE` | temporal-django-worker | - | Same as web: ClickHouse database PostHog uses. |
| `CLICKHOUSE_PASSWORD` | temporal-django-worker | (secret) | Same as web: ClickHouse default-user password. |
| `INTERNAL_API_SECRET` | temporal-django-worker | (secret) | Same as web: Shared secret for internal service-to-service calls. |
| `API_QUERIES_PER_TEAM` | temporal-django-worker | - | Same as web: Concurrent API query limit per team (upstream hobby value). |
| `ENCRYPTION_SALT_KEYS` | temporal-django-worker | - | Same as web: Salt for encrypted fields (integration secrets). |
| `PERSONS_DB_READER_URL` | temporal-django-worker | - | Same as web: Persons database reader (same Postgres database). |
| `PERSONS_DB_WRITER_URL` | temporal-django-worker | - | Same as web: Persons database (same Postgres database in this stack). |
| `INTERNAL_REQUEST_TOKEN` | temporal-django-worker | (secret) | Same as web: Token for Django to feature-flags calls. |
| `OBJECT_STORAGE_ENABLED` | temporal-django-worker | - | Same as web: Use S3 object storage for exports and media. |
| `CLICKHOUSE_API_PASSWORD` | temporal-django-worker | (secret) | Same as web: Password of the api user. |
| `CLICKHOUSE_APP_PASSWORD` | temporal-django-worker | (secret) | Same as web: Password of the app user. |
| `HEATMAP_BROWSERLESS_URL` | temporal-django-worker | - | Browserless HTTP endpoint for heatmap screenshots. |
| `OBJECT_STORAGE_ENDPOINT` | temporal-django-worker | - | Same as web: SeaweedFS S3 endpoint for exports, media and AI blobs. |
| `FEATURE_FLAGS_SERVICE_URL` | temporal-django-worker | - | Same as web: Internal URL of the Rust feature-flags service. |
| `HEATMAP_BROWSERLESS_TOKEN` | temporal-django-worker | (secret) | Browserless token (reference). |
| `CLICKHOUSE_DICT_READER_USER` | temporal-django-worker | (secret) | Same as web: Read-only user ClickHouse dictionaries authenticate as. |
| `DISABLE_SECURE_SSL_REDIRECT` | temporal-django-worker | - | Same as web: TLS is terminated by Railway; no redirect loop. |
| `CLICKHOUSE_LOGS_CLUSTER_HOST` | temporal-django-worker | - | Same as web: ClickHouse host for the logs product (same server). |
| `OBJECT_STORAGE_ACCESS_KEY_ID` | temporal-django-worker | - | Same as web: Object storage access key. |
| `CLICKHOUSE_LOGS_CLUSTER_SECURE` | temporal-django-worker | - | Same as web: Plain TCP for the logs cluster connection. |
| `OBJECT_STORAGE_PUBLIC_ENDPOINT` | temporal-django-worker | - | Same as web: Base URL for presigned downloads (proxied under /posthog). |
| `CLICKHOUSE_DICT_READER_PASSWORD` | temporal-django-worker | (secret) | Same as web: Password of the dict_reader user. |
| `OBJECT_STORAGE_FORCE_PATH_STYLE` | temporal-django-worker | - | Same as web: SeaweedFS needs path-style requests. |
| `CLICKHOUSE_LOGS_CLUSTER_PASSWORD` | temporal-django-worker | (secret) | Same as web: Password for the logs cluster connection (default user). |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | temporal-django-worker | (secret) | Same as web: Object storage secret key. |
| `SESSION_RECORDING_V2_S3_ENDPOINT` | temporal-django-worker | - | Same as web: SeaweedFS S3 endpoint for session recordings. |
| `SESSION_RECORDING_V2_S3_ACCESS_KEY_ID` | temporal-django-worker | - | Same as web: Recording store access key. |
| `SESSION_RECORDING_V2_S3_SECRET_ACCESS_KEY` | temporal-django-worker | (secret) | Same as web: Recording store secret key. |
| `HEATMAP_BROWSERLESS_SCREENSHOT_COOKIES_ENABLED` | temporal-django-worker | false | Do not forward cookies to heatmap screenshots (upstream default). |
| `PORT` | feature-flags | 3001 | HTTP port; /_readiness is the healthcheck. |
| `ADDRESS` | feature-flags | [::]:3001 | Bind address (dual-stack). |
| `RUST_LOG` | feature-flags | info | Log level. |
| `REDIS_URL` | feature-flags | - | Redis for team and flag caches. |
| `AWS_ACCESS_KEY_ID` | feature-flags | - | Object storage access key (reference). |
| `READ_DATABASE_URL` | feature-flags | - | Postgres (reader). |
| `WRITE_DATABASE_URL` | feature-flags | - | Postgres (writer). |
| `AWS_SECRET_ACCESS_KEY` | feature-flags | (secret) | Object storage secret key (reference). |
| `COOKIELESS_REDIS_HOST` | feature-flags | - | Cookieless-mode Redis. The service builds redis://HOST:PORT from this value, so the credentials are embedded in the host part. |
| `COOKIELESS_REDIS_PORT` | feature-flags | 6379 | Redis port. |
| `INTERNAL_REQUEST_TOKEN` | feature-flags | (secret) | Must match web (flag test evaluation). |
| `OBJECT_STORAGE_ENDPOINT` | feature-flags | - | HyperCache S3 tier endpoint (SeaweedFS). |
| `PERSONS_READ_DATABASE_URL` | feature-flags | - | Persons database reader. |
| `PERSONS_WRITE_DATABASE_URL` | feature-flags | - | Persons database (main database in the hobby layout). |
| `SITE_URL` | worker | - | Same as web: Public URL of PostHog (the proxy domain). |
| `REDIS_URL` | worker | - | Same as web: Redis for cache, Celery broker and locks. |
| `DEPLOYMENT` | worker | - | Same as web: Deployment type; hobby keeps persons in the main database. |
| `SECRET_KEY` | worker | (secret) | Same as web: Django secret key; signs sessions and tokens. |
| `CDP_API_URL` | worker | - | Same as web: Internal URL of the plugins (CDP) service. |
| `KAFKA_HOSTS` | worker | - | Same as web: Kafka (Redpanda) bootstrap server. |
| `DATABASE_URL` | worker | - | Same as web: Postgres connection string. |
| `OPENAI_MODEL` | worker | - | Same as web: Model used for OpenAI-backed assists. |
| `TEMPORAL_HOST` | worker | - | Same as web: Temporal frontend host (batch exports, data warehouse, workflows). |
| `OPENAI_API_KEY` | worker | (secret) | Same as web: Optional OpenAI key for SQL/regex assist. |
| `PERSONHOG_ADDR` | worker | - | Same as web: gRPC address of the personhog router. |
| `CLICKHOUSE_HOST` | worker | - | Same as web: ClickHouse host (private network). |
| `CLICKHOUSE_USER` | worker | (secret) | Same as web: ClickHouse admin user used for queries and migrations. |
| `IS_BEHIND_PROXY` | worker | - | Same as web: Trust X-Forwarded-* from the Caddy proxy / Railway edge. |
| `OPENAI_BASE_URL` | worker | - | Same as web: OpenAI-compatible API base URL. |
| `WEB_CONCURRENCY` | worker | 2 | Celery worker processes. Upstream default is one per CPU, which on Railway means the host's CPU count. |
| `ANTHROPIC_API_KEY` | worker | (secret) | Same as web: Optional Anthropic key for PostHog AI. |
| `BROWSERLESS_TOKEN` | worker | (secret) | Browserless token (reference). |
| `CLICKHOUSE_SECURE` | worker | - | Same as web: Plain TCP inside the private network. |
| `CLICKHOUSE_VERIFY` | worker | - | Same as web: No TLS verification (no TLS on the private network). |
| `OTEL_SDK_DISABLED` | worker | - | Same as web: No OpenTelemetry export from Django. |
| `PERSONHOG_ENABLED` | worker | - | Same as web: Read persons through personhog, as upstream hobby does. |
| `RECORDING_API_URL` | worker | - | Same as web: Internal URL of the recording API (replay playback). |
| `BROWSERLESS_CDP_URL` | worker | - | Browserless CDP endpoint for image exports. |
| `CLICKHOUSE_API_USER` | worker | (secret) | Same as web: ClickHouse user for API queries. |
| `CLICKHOUSE_APP_USER` | worker | (secret) | Same as web: ClickHouse user for app queries. |
| `CLICKHOUSE_DATABASE` | worker | - | Same as web: ClickHouse database PostHog uses. |
| `CLICKHOUSE_PASSWORD` | worker | (secret) | Same as web: ClickHouse default-user password. |
| `INTERNAL_API_SECRET` | worker | (secret) | Same as web: Shared secret for internal service-to-service calls. |
| `API_QUERIES_PER_TEAM` | worker | - | Same as web: Concurrent API query limit per team (upstream hobby value). |
| `ENCRYPTION_SALT_KEYS` | worker | - | Same as web: Salt for encrypted fields (integration secrets). |
| `PERSONS_DB_READER_URL` | worker | - | Same as web: Persons database reader (same Postgres database). |
| `PERSONS_DB_WRITER_URL` | worker | - | Same as web: Persons database (same Postgres database in this stack). |
| `INTERNAL_REQUEST_TOKEN` | worker | (secret) | Same as web: Token for Django to feature-flags calls. |
| `OBJECT_STORAGE_ENABLED` | worker | - | Same as web: Use S3 object storage for exports and media. |
| `CLICKHOUSE_API_PASSWORD` | worker | (secret) | Same as web: Password of the api user. |
| `CLICKHOUSE_APP_PASSWORD` | worker | (secret) | Same as web: Password of the app user. |
| `HEATMAP_BROWSERLESS_URL` | worker | - | Browserless HTTP endpoint for heatmap screenshots. |
| `OBJECT_STORAGE_ENDPOINT` | worker | - | Same as web: SeaweedFS S3 endpoint for exports, media and AI blobs. |
| `FEATURE_FLAGS_SERVICE_URL` | worker | - | Same as web: Internal URL of the Rust feature-flags service. |
| `HEATMAP_BROWSERLESS_TOKEN` | worker | (secret) | Browserless token (reference). |
| `CLICKHOUSE_DICT_READER_USER` | worker | (secret) | Same as web: Read-only user ClickHouse dictionaries authenticate as. |
| `DISABLE_SECURE_SSL_REDIRECT` | worker | - | Same as web: TLS is terminated by Railway; no redirect loop. |
| `CLICKHOUSE_LOGS_CLUSTER_HOST` | worker | - | Same as web: ClickHouse host for the logs product (same server). |
| `OBJECT_STORAGE_ACCESS_KEY_ID` | worker | - | Same as web: Object storage access key. |
| `POSTHOG_SKIP_MIGRATION_CHECKS` | worker | 1 | Migrations run in web's pre-deploy step; do not block on them here (upstream hobby setting). |
| `CLICKHOUSE_LOGS_CLUSTER_SECURE` | worker | - | Same as web: Plain TCP for the logs cluster connection. |
| `OBJECT_STORAGE_PUBLIC_ENDPOINT` | worker | - | Same as web: Base URL for presigned downloads (proxied under /posthog). |
| `CLICKHOUSE_DICT_READER_PASSWORD` | worker | (secret) | Same as web: Password of the dict_reader user. |
| `OBJECT_STORAGE_FORCE_PATH_STYLE` | worker | - | Same as web: SeaweedFS needs path-style requests. |
| `CLICKHOUSE_LOGS_CLUSTER_PASSWORD` | worker | (secret) | Same as web: Password for the logs cluster connection (default user). |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | worker | (secret) | Same as web: Object storage secret key. |
| `SESSION_RECORDING_V2_S3_ENDPOINT` | worker | - | Same as web: SeaweedFS S3 endpoint for session recordings. |
| `SESSION_RECORDING_V2_S3_ACCESS_KEY_ID` | worker | - | Same as web: Recording store access key. |
| `SESSION_RECORDING_V2_S3_SECRET_ACCESS_KEY` | worker | (secret) | Same as web: Recording store secret key. |
| `HEATMAP_BROWSERLESS_SCREENSHOT_COOKIES_ENABLED` | worker | false | Do not forward cookies to heatmap screenshots (upstream default). |
| `PORT` | personhog | 9101 | Router metrics/health port; /_readiness is the healthcheck. |
| `RUST_LOG` | personhog | info | Log level. |
| `BACKEND_TIMEOUT_MS` | personhog | 5000 | Router-to-replica call timeout. |
| `PRIMARY_DATABASE_URL` | personhog | - | Persons database (main database in the hobby layout). |
| `PORT` | recordings | 6738 | Node HTTP server port (HTTP_SERVER_PORT default); /_health is the healthcheck. |
| `REDIS_URL` | recordings | - | Redis connection string. |
| `KAFKA_HOSTS` | recordings | - | Kafka (Redpanda) bootstrap server. |
| `DATABASE_URL` | recordings | - | Postgres connection string. |
| `NODE_PROCESSES` | recordings | recordings-blob-ingestion-v2:6738 recording-api:6739 | Node processes in this service (mode:port). web calls the recording API on 6739. |
| `CLICKHOUSE_HOST` | recordings | - | ClickHouse host. |
| `CLICKHOUSE_USER` | recordings | (secret) | ClickHouse user. |
| `CLICKHOUSE_SECURE` | recordings | false | Plain TCP inside the private network. |
| `CLICKHOUSE_VERIFY` | recordings | false | No TLS verification. |
| `CLICKHOUSE_DATABASE` | recordings | posthog | ClickHouse database. |
| `CLICKHOUSE_PASSWORD` | recordings | (secret) | ClickHouse password (reference). |
| `INTERNAL_API_SECRET` | recordings | (secret) | Must match web (X-Internal-Api-Secret on recording API calls). |
| `ENCRYPTION_SALT_KEYS` | recordings | - | Must match web (decrypts encrypted function inputs). |
| `SESSION_RECORDING_API_REDIS_HOST` | recordings | - | Redis for the recording API. This setting has no password field; ioredis accepts the full URL (with password) here. |
| `SESSION_RECORDING_API_REDIS_PORT` | recordings | 6379 | Redis port. |
| `SESSION_RECORDING_V2_S3_ENDPOINT` | recordings | - | SeaweedFS S3 endpoint for recordings. |
| `SESSION_RECORDING_V2_S3_TIMEOUT_MS` | recordings | 120000 | S3 request timeout (upstream hobby value). |
| `SESSION_RECORDING_V2_S3_ACCESS_KEY_ID` | recordings | - | Recording store access key (reference). |
| `SESSION_RECORDING_V2_S3_SECRET_ACCESS_KEY` | recordings | (secret) | Recording store secret key (reference). |
| `PORT` | clickhouse | 8123 | HTTP port; /ping is the healthcheck. |
| `KAFKA_HOSTS` | clickhouse | - | Brokers for PostHog's Kafka engine tables (named collections). |
| `ZOOKEEPER_HOST` | clickhouse | - | ZooKeeper host for ON CLUSTER DDL and replicated tables. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password of the default (admin) user. Alphanumeric: PostHog embeds it in SQL. |
| `CLICKHOUSE_API_PASSWORD` | clickhouse | (secret) | Password of the api user. |
| `CLICKHOUSE_APP_PASSWORD` | clickhouse | (secret) | Password of the app user. |
| `CLICKHOUSE_DICT_READER_PASSWORD` | clickhouse | (secret) | Password of the read-only dict_reader user. |
| `PORT` | livestream | 8080 | HTTP port. |
| `LIVESTREAM_MMDB_PATH` | livestream | /GeoLite2-City.mmdb | GeoLite2 database shipped in the image. |
| `LIVESTREAM_JWT_SECRET` | livestream | (secret) | Must equal web's SECRET_KEY (signs live-events tokens). |
| `LIVESTREAM_CONSUMERS_EVENT_TOPIC` | livestream | events_plugin_ingestion | Events topic. |
| `LIVESTREAM_CONSUMERS_EVENT_BROKERS` | livestream | - | Kafka bootstrap server (events). |
| `LIVESTREAM_CONSUMERS_EVENT_GROUP_ID` | livestream | livestream | Consumer group. |
| `LIVESTREAM_CONSUMERS_EVENT_SECURITY_PROTOCOL` | livestream | PLAINTEXT | Kafka protocol. |
| `LIVESTREAM_CONSUMERS_SESSION_RECORDING_TOPIC` | livestream | session_recording_snapshot_item_events | Recording snapshots topic. |
| `LIVESTREAM_CONSUMERS_SESSION_RECORDING_BROKERS` | livestream | - | Kafka bootstrap server (recordings). |
| `LIVESTREAM_CONSUMERS_SESSION_RECORDING_GROUP_ID` | livestream | livestream-session-recordings | Consumer group. |
| `LIVESTREAM_CONSUMERS_SESSION_RECORDING_SECURITY_PROTOCOL` | livestream | PLAINTEXT | Kafka protocol. |
| `PORT` | cymbal | 3302 | HTTP port of the processing process; /_readiness is the healthcheck. |
| `RUST_LOG` | cymbal | info | Log level. |
| `BIND_HOST` | cymbal | :: | Bind address (dual-stack). |
| `BIND_PORT` | cymbal | 3302 | HTTP port. |
| `REDIS_URL` | cymbal | - | Redis connection string. |
| `KAFKA_HOSTS` | cymbal | - | Kafka bootstrap server. |
| `PERSONS_URL` | cymbal | - | Persons database (main database). |
| `DATABASE_URL` | cymbal | - | Postgres connection string. |
| `INTERNAL_API_SECRET` | cymbal | (secret) | Must match web. |
| `OBJECT_STORAGE_BUCKET` | cymbal | posthog | Bucket for symbol sets. |
| `ISSUE_BUCKETS_REDIS_URL` | cymbal | - | Redis for issue rate buckets. |
| `OBJECT_STORAGE_ENDPOINT` | cymbal | - | SeaweedFS S3 endpoint. |
| `OBJECT_STORAGE_ACCESS_KEY_ID` | cymbal | - | Access key (reference). |
| `OBJECT_STORAGE_FORCE_PATH_STYLE` | cymbal | true | SeaweedFS needs path-style requests. |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | cymbal | (secret) | Secret key (reference). |
| `PORT` | ingestion | 6738 | Node HTTP server port (HTTP_SERVER_PORT default); /_health is the healthcheck. |
| `REDIS_URL` | ingestion | - | Redis connection string. |
| `KAFKA_HOSTS` | ingestion | - | Kafka (Redpanda) bootstrap server. |
| `DATABASE_URL` | ingestion | - | Postgres connection string. |
| `CDP_REDIS_HOST` | ingestion | - | Redis host for CDP state (function health, rate limits). |
| `CDP_REDIS_PORT` | ingestion | 6379 | Redis port. |
| `NODE_PROCESSES` | ingestion | ingestion-v2-combined:6738 ingestion-errortracking:6739 | Node processes in this service (mode:port). A process that exits restarts the service. |
| `PERSONHOG_ADDR` | ingestion | - | personhog router (gRPC). |
| `CLICKHOUSE_HOST` | ingestion | - | ClickHouse host. |
| `CLICKHOUSE_USER` | ingestion | (secret) | ClickHouse user. |
| `AI_BLOB_S3_BUCKET` | ingestion | ai-blobs | Bucket for offloaded multimodal AI payloads. |
| `AI_BLOB_S3_PREFIX` | ingestion | aio/ | Key prefix for AI blobs. |
| `AI_BLOB_S3_REGION` | ingestion | us-east-1 | Region string for the S3 client. |
| `CLICKHOUSE_SECURE` | ingestion | false | Plain TCP inside the private network. |
| `CLICKHOUSE_VERIFY` | ingestion | false | No TLS verification. |
| `PERSONHOG_ENABLED` | ingestion | true | Read persons through personhog for the AI consumer. |
| `CDP_REDIS_PASSWORD` | ingestion | (secret) | Redis password (reference). |
| `AI_BLOB_S3_ENDPOINT` | ingestion | - | SeaweedFS S3 endpoint. |
| `CLICKHOUSE_DATABASE` | ingestion | posthog | ClickHouse database. |
| `CLICKHOUSE_PASSWORD` | ingestion | (secret) | ClickHouse password (reference). |
| `ENCRYPTION_SALT_KEYS` | ingestion | - | Must match web (decrypts encrypted function inputs). |
| `PERSONS_DATABASE_URL` | ingestion | - | Persons live in the main database (hobby layout). |
| `AI_BLOB_OFFLOAD_TEAMS` | ingestion | * | Offload AI blobs for all teams. |
| `AI_BLOB_S3_ACCESS_KEY_ID` | ingestion | - | Object storage access key (reference). |
| `AI_BLOB_S3_SECRET_ACCESS_KEY` | ingestion | (secret) | Object storage secret key (reference). |
| `ERROR_TRACKING_CYMBAL_BASE_URL` | ingestion | - | cymbal processing service (error tracking process). |
| `BEHAVIORAL_COHORTS_DATABASE_URL` | ingestion | - | Behavioral cohorts live in the main database (hobby layout). |
| `INGESTION_AI_EVENT_SPLITTING_TEAMS` | ingestion | * | Teams to split AI events for (all). |
| `INGESTION_AI_EVENT_SPLITTING_ENABLED` | ingestion | true | Write the full LLM analytics events (prompts, outputs) to the ai_events table and keep them out of the events table, as PostHog's AI lane does. |
| `PORT` | web | 8000 | Granian HTTP port; Railway healthcheck probes it. |
| `SITE_URL` | web | - | Public URL of PostHog (the proxy domain). Change it when you add a custom domain to the proxy. |
| `REDIS_URL` | web | - | Redis for cache, Celery broker and locks. |
| `DEPLOYMENT` | web | hobby | Deployment type; hobby keeps persons in the main database and runs persons migrations. |
| `SECRET_KEY` | web | (secret) | Django secret key (hobby installer format). Generated once; changing it logs everyone out. |
| `CDP_API_URL` | web | - | Internal URL of the plugins (CDP) service. |
| `KAFKA_HOSTS` | web | - | Kafka (Redpanda) bootstrap server. |
| `DATABASE_URL` | web | - | Postgres connection string (private network). |
| `OPENAI_MODEL` | web | gpt-4.1-mini | Model used for OpenAI-backed assists (upstream default). |
| `TEMPORAL_HOST` | web | - | Temporal frontend host (batch exports, data warehouse, workflows). |
| `OPENAI_API_KEY` | web | (secret) | Optional: OpenAI API key for SQL and regex assist. |
| `PERSONHOG_ADDR` | web | - | gRPC address of the personhog router. |
| `CLICKHOUSE_HOST` | web | - | ClickHouse host (private network). |
| `CLICKHOUSE_USER` | web | (secret) | ClickHouse admin user used for queries and migrations. |
| `GRANIAN_WORKERS` | web | 2 | Web worker processes (~1.1 GB RAM each). Upstream default is 4; raise it for more concurrent API/UI requests. |
| `IS_BEHIND_PROXY` | web | true | Trust X-Forwarded-* from the Caddy proxy / Railway edge. |
| `LIVESTREAM_HOST` | web | - | Public URL of the live events stream (proxied to livestream). |
| `OPENAI_BASE_URL` | web | https://api.openai.com/v1 | OpenAI-compatible API base URL. |
| `OPT_OUT_CAPTURE` | web | false | Anonymous usage reporting to PostHog Inc. (upstream default). Set true to opt out. |
| `MIGRATE_WAIT_FOR` | web | - | host:port list the pre-deploy step waits for before running migrations. |
| `ANTHROPIC_API_KEY` | web | (secret) | Optional: Anthropic API key to enable PostHog AI. Leave empty to keep AI features off. |
| `CLICKHOUSE_SECURE` | web | false | Plain TCP inside the private network. |
| `CLICKHOUSE_VERIFY` | web | false | No TLS verification (no TLS on the private network). |
| `OTEL_SDK_DISABLED` | web | true | No OpenTelemetry export from Django. |
| `OTEL_SERVICE_NAME` | web | posthog | Service name if OpenTelemetry is enabled later. |
| `PERSONHOG_ENABLED` | web | true | Read persons through personhog, as the upstream hobby stack does. |
| `RECORDING_API_URL` | web | - | Internal URL of the recording API (replay playback; second process of the recordings service). |
| `CLICKHOUSE_API_USER` | web | (secret) | ClickHouse user for API queries. |
| `CLICKHOUSE_APP_USER` | web | (secret) | ClickHouse user for app queries. |
| `CLICKHOUSE_DATABASE` | web | posthog | ClickHouse database PostHog uses. |
| `CLICKHOUSE_PASSWORD` | web | (secret) | ClickHouse default-user password (reference). |
| `INTERNAL_API_SECRET` | web | (secret) | Shared secret for internal calls (web/worker to recording-api, cymbal). |
| `API_QUERIES_PER_TEAM` | web | {"1": 100} | Concurrent API query limit per team (upstream hobby value). |
| `ENCRYPTION_SALT_KEYS` | web | - | Salt for encrypted fields. Generated once; never change after first deploy. |
| `PERSONS_DB_READER_URL` | web | - | Persons database reader (same Postgres database). |
| `PERSONS_DB_WRITER_URL` | web | - | Persons database (same Postgres database in the hobby layout). |
| `INTERNAL_REQUEST_TOKEN` | web | (secret) | Token for Django to feature-flags calls (flag test evaluation). |
| `OBJECT_STORAGE_ENABLED` | web | true | Use S3 object storage for exports and media. |
| `CLICKHOUSE_API_PASSWORD` | web | (secret) | Password of the api user (reference). |
| `CLICKHOUSE_APP_PASSWORD` | web | (secret) | Password of the app user (reference). |
| `OBJECT_STORAGE_ENDPOINT` | web | - | SeaweedFS S3 endpoint for exports, media and AI blobs (private network). |
| `FEATURE_FLAGS_SERVICE_URL` | web | - | Internal URL of the Rust feature-flags service. |
| `CLICKHOUSE_DICT_READER_USER` | web | (secret) | Read-only user ClickHouse dictionaries authenticate as. |
| `DISABLE_SECURE_SSL_REDIRECT` | web | true | TLS is terminated by Railway; avoids a redirect loop. |
| `CLICKHOUSE_LOGS_CLUSTER_HOST` | web | - | ClickHouse host for the logs product (same server; upstream default is localhost). |
| `OBJECT_STORAGE_ACCESS_KEY_ID` | web | - | Object storage access key (reference). |
| `CLICKHOUSE_LOGS_CLUSTER_SECURE` | web | false | Plain TCP for the logs cluster connection. |
| `OBJECT_STORAGE_PUBLIC_ENDPOINT` | web | - | Base URL for presigned downloads; the proxy forwards /posthog/* to seaweedfs. |
| `CLICKHOUSE_DICT_READER_PASSWORD` | web | (secret) | Password of the dict_reader user (reference). |
| `OBJECT_STORAGE_FORCE_PATH_STYLE` | web | true | SeaweedFS needs path-style requests. |
| `CLICKHOUSE_LOGS_CLUSTER_PASSWORD` | web | (secret) | Password for the logs cluster connection (default user). |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | web | (secret) | Object storage secret key (reference). |
| `SESSION_RECORDING_V2_S3_ENDPOINT` | web | - | SeaweedFS S3 endpoint for session recordings. |
| `SESSION_RECORDING_V2_S3_ACCESS_KEY_ID` | web | - | Recording store access key (reference). |
| `SESSION_RECORDING_V2_S3_SECRET_ACCESS_KEY` | web | (secret) | Recording store secret key (reference). |

## Configuration

- **Healthcheck:** `/api/v1/system-info`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Volume:** `/data`
- **Healthcheck:** `/_proxy/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/_health`
- **Healthcheck:** `/v1/status/ready`
- **Volume:** `/var/lib/redpanda/data`
- **Start command:** `/bin/bash -c "mkdir -p /data/datalog && exec /docker-entrypoint.sh zkServer.sh start-foreground"`
- **Healthcheck:** `/commands/ruok`
- **Healthcheck:** `/_readiness`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH --maxmemory $REDIS_MAXMEMORY --maxmemory-policy allkeys-lru"`
- **Start command:** `./bin/temporal-django-worker`
- **Start command:** `./bin/docker-worker-celery --with-scheduler`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/`
- **Start command:** `./bin/docker-server`

**Category:** Analytics · **Tags:** posthog, analytics, product-analytics, session-replay, feature-flags · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/posthog-product-analytics-suite)
