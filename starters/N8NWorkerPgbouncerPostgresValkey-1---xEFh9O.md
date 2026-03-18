# Deploy N8N+Worker+Pgbouncer+Postgres+Valkey : 1$ on Railway

Enterprise n8n Workflow Automation Stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/xEFh9O)

## About

# Enterprise n8n Workflow Automation Stack

## What You Get
A complete production-ready n8n deployment with distributed architecture, optimized databases, and high-performance caching - all pre-configured for maximum performance and reliability.

### Components:
- **n8n Main**: Primary workflow editor and API service
- **n8n Worker**: Dedicated execution engine for intensive workflows
- **PostgreSQL**: Enterprise-grade database with optimized settings
- **PgBouncer**: Advanced connection pooling for better database performance
- **Valkey**: High-performance Redis-compatible caching layer

## Key Features
- ✅ **Distributed Architecture**: Separate worker processes for handling high-volume executions
- ✅ **High Concurrency**: Optimized for 500+ simultaneous workflow executions
- ✅ **Enterprise-Ready**: Full redundancy with separated services
- ✅ **Performance Tuned**: Memory allocation and database parameters pre-optimized
- ✅ **Secure**: SSL/TLS enabled by default with proper authentication
- ✅ **IPv6 Compatible**: Full support for Railway's advanced networking

## Usage Instructions
1. **Deploy Template**: One-click deployment sets up the complete stack
2. **Important**: Configure the n8n-main service to expose port 5678 in Railway settings
3. **Access n8n**: Use the public URL to access your workflow editor
4. **Create Workflows**: Build your automations with confidence in the infrastructure

## Environment Variables
- n8n Editor URL: `https://${{n8n-main.RAILWAY_PUBLIC_DOMAIN}}`
- Database configuration: Pre-connected via internal service discovery
- Worker scaling: Adjustable through environment variables

## Technical Specifications
- n8n Main & Worker nodes with optimized memory allocation (port 5678)
- PostgreSQL with connection pooling via PgBouncer
- Valkey (Redis-compatible) for queue management and caching
- Pre-configured for high-throughput AI agent workloads
- Advanced logging configuration with minimal noise

## Important Note
**If you cannot access the n8n interface after deployment**, ensure that the n8n-main service has its port explicitly set to 5678 in the Railway service settings.

## Important: Configuring Public Access

After deploying the template, you MUST configure the port for n8n-main service:

1. In your Railway project, select the **n8n-main** service
2. Navigate to the **Settings** tab
3. Under **Public Networking**, click to expand
4. You will see a dropdown for port selection - choose **5678**
5. Click **Update** to save your port configuration

Without this port configuration, the n8n interface will not be accessible from the public URL.

Your n8n instance will then be accessible at the URL shown in the Public Networking section.

Support me if you think this is good, one dollar is also very valuable to me, I'm really broke man. https://linktr.ee/givemesomehope

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgbouncer | [antisofisme/railway](https://github.com/antisofisme/railway) (root: n8n/pgbouncer) | Worker |
| valkey | [antisofisme/railway](https://github.com/antisofisme/railway) (root: n8n/valkey) | Database |
| n8n-worker | [antisofisme/railway](https://github.com/antisofisme/railway) (root: n8n/n8n-worker) | Worker |
| n8n-main | [antisofisme/railway](https://github.com/antisofisme/railway) (root: n8n/n8n-main) | Web service |
| postgres | [antisofisme/railway](https://github.com/antisofisme/railway) (root: n8n/postgres) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `TZ` | pgbouncer | Asia/Jakarta |
| `PGBOUNCER_SSL` | pgbouncer | true |
| `PGBOUNCER_DEBUG` | pgbouncer | 1 |
| `PGBOUNCER_PKT_BUF` | pgbouncer | 32768 |
| `PGBOUNCER_VERBOSE` | pgbouncer | 1 |
| `PGBOUNCER_AUTH_TYPE` | pgbouncer | md5 |
| `PGBOUNCER_LOG_STATS` | pgbouncer | 1 |
| `PGBOUNCER_POOL_MODE` | pgbouncer | transaction |
| `PGBOUNCER_SO_RCVBUF` | pgbouncer | 262144 |
| `PGBOUNCER_SO_SNDBUF` | pgbouncer | 262144 |
| `PGBOUNCER_ADMIN_USERS` | pgbouncer | n8n,postgres |
| `PGBOUNCER_DNS_MAX_TTL` | pgbouncer | 30 |
| `PGBOUNCER_LISTEN_ADDR` | pgbouncer | * |
| `PGBOUNCER_LISTEN_PORT` | pgbouncer | 6432 |
| `PGBOUNCER_TCP_KEEPCNT` | pgbouncer | 3 |
| `PGBOUNCER_TLS_ENABLED` | pgbouncer | true |
| `PGBOUNCER_SBUF_LOOPCNT` | pgbouncer | 50 |
| `PGBOUNCER_SO_REUSEPORT` | pgbouncer | 1 |
| `PGBOUNCER_STATS_PERIOD` | pgbouncer | 600 |
| `PGBOUNCER_TCP_KEEPIDLE` | pgbouncer | 30 |
| `PGBOUNCER_MIN_POOL_SIZE` | pgbouncer | 10 |
| `PGBOUNCER_QUERY_TIMEOUT` | pgbouncer | 60 |
| `PGBOUNCER_TCP_KEEPALIVE` | pgbouncer | 1 |
| `PGBOUNCER_TCP_KEEPINTVL` | pgbouncer | 15 |
| `PGBOUNCER_DISABLE_PQEXEC` | pgbouncer | 1 |
| `PGBOUNCER_LISTEN_BACKLOG` | pgbouncer | 4096 |
| `PGBOUNCER_LOG_CONNECTIONS` | pgbouncer | 1 |
| `PGBOUNCER_MAX_CLIENT_CONN` | pgbouncer | 10000 |
| `PGBOUNCER_MAX_PACKET_SIZE` | pgbouncer | 65536000 |
| `PGBOUNCER_SERVER_LIFETIME` | pgbouncer | 3600 |
| `PGBOUNCER_SUSPEND_TIMEOUT` | pgbouncer | 5 |
| `PGBOUNCER_DNS_NXDOMAIN_TTL` | pgbouncer | 5 |
| `PGBOUNCER_TCP_DEFER_ACCEPT` | pgbouncer | 1 |
| `PGBOUNCER_DEFAULT_POOL_SIZE` | pgbouncer | 100 |
| `PGBOUNCER_LOG_POOLER_ERRORS` | pgbouncer | 1 |
| `PGBOUNCER_RESERVE_POOL_SIZE` | pgbouncer | 100 |
| `PGBOUNCER_CLIENT_TLS_SSLMODE` | pgbouncer | require |
| `PGBOUNCER_LOG_DISCONNECTIONS` | pgbouncer | 1 |
| `PGBOUNCER_MAX_DB_CONNECTIONS` | pgbouncer | 0 |
| `PGBOUNCER_QUERY_WAIT_TIMEOUT` | pgbouncer | 60 |
| `PGBOUNCER_SERVER_LOGIN_RETRY` | pgbouncer | (secret) |
| `PGBOUNCER_SERVER_ROUND_ROBIN` | pgbouncer | 1 |
| `PGBOUNCER_SERVER_TLS_SSLMODE` | pgbouncer | require |
| `PGBOUNCER_SERVER_IDLE_TIMEOUT` | pgbouncer | 60 |
| `PGBOUNCER_CLIENT_LOGIN_TIMEOUT` | pgbouncer | (secret) |
| `PGBOUNCER_MAX_USER_CONNECTIONS` | pgbouncer | 0 |
| `PGBOUNCER_RESERVE_POOL_TIMEOUT` | pgbouncer | 10 |
| `PGBOUNCER_SERVER_CONNECT_TIMEOUT` | pgbouncer | 15 |
| `PGBOUNCER_IDLE_TRANSACTION_TIMEOUT` | pgbouncer | 60 |
| `TZ` | valkey | Asia/Jakarta |
| `VALKEY_HZ` | valkey | 10 |
| `REDIS_PORT` | valkey | 6379 |
| `VALKEY_SAVE` | valkey | 3600 1 1800 100 900 1000 300 10000 |
| `VALKEY_MAX_HZ` | valkey | 200 |
| `REDIS_PASSWORD` | valkey | (secret) |
| `REDIS_USERNAME` | valkey | (secret) |
| `VALKEY_TIMEOUT` | valkey | 0 |
| `VALKEY_LOGLEVEL` | valkey | warning |
| `VALKEY_APPENDONLY` | valkey | yes |
| `VALKEY_DYNAMIC_HZ` | valkey | yes |
| `VALKEY_IO_THREADS` | valkey | 8 |
| `VALKEY_MAXCLIENTS` | valkey | 15000 |
| `VALKEY_SUPERVISED` | valkey | auto |
| `VALKEY_APPENDFSYNC` | valkey | no |
| `VALKEY_TCP_BACKLOG` | valkey | 2048 |
| `VALKEY_TCP_KEEPCNT` | valkey | 5 |
| `VALKEY_TCP_NODELAY` | valkey | yes |
| `VALKEY_ACTIVEDEFRAG` | valkey | yes |
| `VALKEY_BIND_ADDRESS` | valkey | 0.0.0.0 :: |
| `VALKEY_IPV6_ENABLED` | valkey | yes |
| `VALKEY_OOM_SCORE_ADJ` | valkey | yes |
| `VALKEY_RESP3_ENABLED` | valkey | yes |
| `VALKEY_TCP_KEEPALIVE` | valkey | 60 |
| `VALKEY_TCP_KEEPINTVL` | valkey | 10 |
| `VALKEY_DISABLE_THPOOL` | valkey | no |
| `VALKEY_LFU_DECAY_TIME` | valkey | 1 |
| `VALKEY_LFU_LOG_FACTOR` | valkey | 10 |
| `VALKEY_SYSLOG_ENABLED` | valkey | no |
| `VALKEY_CLUSTER_ENABLED` | valkey | no |
| `VALKEY_IGNORE_WARNINGS` | valkey | all |
| `VALKEY_SLOWLOG_MAX_LEN` | valkey | 1000 |
| `VALKEY_WATCHDOG_PERIOD` | valkey | 500 |
| `VALKEY_ACTIVE_REHASHING` | valkey | yes |
| `VALKEY_ALWAYS_SHOW_LOGO` | valkey | yes |
| `VALKEY_LATENCY_TRACKING` | valkey | yes |
| `VALKEY_MAXMEMORY_POLICY` | valkey | allkeys-lfu |
| `VALKEY_MAXMEMORY_SAMPLES` | valkey | 20 |
| `VALKEY_PROTO_MAX_BULK_LEN` | valkey | 2048mb |
| `VALKEY_REPLICA_LAZY_FLUSH` | valkey | yes |
| `VALKEY_THPOOL_THREADS_MAX` | valkey | 32 |
| `VALKEY_IO_THREADS_DO_READS` | valkey | yes |
| `VALKEY_ACTIVE_EXPIRE_EFFORT` | valkey | 7 |
| `VALKEY_AOF_USE_RDB_PREAMBLE` | valkey | yes |
| `VALKEY_IO_THREADS_DO_WRITES` | valkey | yes |
| `VALKEY_LAZYFREE_LAZY_EXPIRE` | valkey | yes |
| `VALKEY_AOF_TIMESTAMP_ENABLED` | valkey | no |
| `VALKEY_STREAM_NODE_MAX_BYTES` | valkey | 4096 |
| `VALKEY_BUSY_REPLICA_THRESHOLD` | valkey | 25000 |
| `VALKEY_HASH_MAX_ZIPLIST_VALUE` | valkey | 128 |
| `VALKEY_LAZYFREE_LAZY_EVICTION` | valkey | yes |
| `VALKEY_LAZYFREE_LAZY_USER_DEL` | valkey | yes |
| `VALKEY_NOTIFY_KEYSPACE_EVENTS` | valkey | Egx |
| `VALKEY_ACTIVE_DEFRAG_CYCLE_MAX` | valkey | 25 |
| `VALKEY_ACTIVE_DEFRAG_CYCLE_MIN` | valkey | 5 |
| `VALKEY_SLOWLOG_LOG_SLOWER_THAN` | valkey | 10000 |
| `VALKEY_STREAM_NODE_MAX_ENTRIES` | valkey | 256 |
| `VALKEY_HASH_MAX_ZIPLIST_ENTRIES` | valkey | 512 |
| `VALKEY_LAZYFREE_LAZY_SERVER_DEL` | valkey | yes |
| `VALKEY_LAZYFREE_LAZY_USER_FLUSH` | valkey | yes |
| `VALKEY_AUTO_AOF_REWRITE_MIN_SIZE` | valkey | 256mb |
| `VALKEY_CLIENT_QUERY_BUFFER_LIMIT` | valkey | 2gb |
| `VALKEY_LATENCY_MONITOR_THRESHOLD` | valkey | 5 |
| `VALKEY_NO_APPENDFSYNC_ON_REWRITE` | valkey | yes |
| `VALKEY_ACTIVE_DEFRAG_IGNORE_BYTES` | valkey | 100mb |
| `VALKEY_CLIENT_OUTPUT_BUFFER_LIMIT` | valkey | normal 0 0 0 pubsub 128mb 32mb 60 slave 1024mb 256mb 60 |
| `VALKEY_AUTO_AOF_REWRITE_PERCENTAGE` | valkey | 200 |
| `VALKEY_STOP_WRITES_ON_BGSAVE_ERROR` | valkey | no |
| `VALKEY_ACTIVE_DEFRAG_THRESHOLD_LOWER` | valkey | 10 |
| `VALKEY_ACTIVE_DEFRAG_THRESHOLD_UPPER` | valkey | 100 |
| `VALKEY_AOF_REWRITE_INCREMENTAL_FSYNC` | valkey | yes |
| `VALKEY_SLAVE_CLIENT_OUTPUT_BUFFER_LIMIT` | valkey | 2gb |
| `VALKEY_NORMAL_CLIENT_OUTPUT_BUFFER_LIMIT` | valkey | 0 |
| `TZ` | n8n-worker | Asia/Jakarta |
| `DB_SSL` | n8n-worker | true |
| `DB_TYPE` | n8n-worker | postgresdb |
| `DB_USER` | n8n-worker | (secret) |
| `N8N_HOST` | n8n-worker | 0.0.0.0 |
| `N8N_PORT` | n8n-worker | 5678 |
| `PGSSLMODE` | n8n-worker | prefer |
| `DB_PASSWORD` | n8n-worker | (secret) |
| `DB_POOL_MAX` | n8n-worker | 180 |
| `DB_POOL_MIN` | n8n-worker | 40 |
| `N8N_METRICS` | n8n-worker | true |
| `N8N_PROTOCOL` | n8n-worker | https |
| `NODE_OPTIONS` | n8n-worker | --no-warnings --dns-result-order=ipv4first |
| `REDIS_FAMILY` | n8n-worker | 6 |
| `N8N_LOG_LEVEL` | n8n-worker | info |
| `DB_SSL_ENABLED` | n8n-worker | true |
| `N8N_AI_ENABLED` | n8n-worker | true |
| `N8N_AI_LOGGING` | n8n-worker | false |
| `N8N_AI_TRACING` | n8n-worker | false |
| `N8N_LOG_CALLER` | n8n-worker | true |
| `N8N_LOG_OUTPUT` | n8n-worker | console |
| `REDIS_PASSWORD` | n8n-worker | (secret) |
| `REDIS_USERNAME` | n8n-worker | (secret) |
| `EXECUTIONS_MODE` | n8n-worker | queue |
| `N8N_LOG_METRICS` | n8n-worker | true |
| `N8N_TRUST_PROXY` | n8n-worker | true |
| `N8N_AI_TELEMETRY` | n8n-worker | false |
| `N8N_LOG_TRACE_ID` | n8n-worker | true |
| `N8N_PUSH_BACKEND` | n8n-worker | websocket |
| `QUEUE_BULL_CACHE` | n8n-worker | true |
| `REDIS_KEEP_ALIVE` | n8n-worker | true |
| `N8N_LOG_TIMESTAMP` | n8n-worker | true |
| `QUEUE_BULL_ACTIVE` | n8n-worker | true |
| `QUEUE_BULL_PREFIX` | n8n-worker | n8n-bull |
| `DB_LOGGING_ENABLED` | n8n-worker | true |
| `DB_LOGGING_OPTIONS` | n8n-worker | error |
| `N8N_LISTEN_ADDRESS` | n8n-worker | 0.0.0.0 |
| `N8N_LOG_CONTEXT_ID` | n8n-worker | true |
| `N8N_METRICS_PREFIX` | n8n-worker | n8n_worker_ |
| `N8N_SOCKET_TIMEOUT` | n8n-worker | 600000 |
| `N8N_WEBHOOK_TUNNEL` | n8n-worker | true |
| `QUEUE_BULL_USESCAN` | n8n-worker | true |
| `N8N_PROCESS_TIMEOUT` | n8n-worker | 1800 |
| `N8N_RUNNERS_ENABLED` | n8n-worker | true |
| `PGSTATEMENT_TIMEOUT` | n8n-worker | 30000 |
| `QUEUE_BULL_REDIS_DB` | n8n-worker | 0 |
| `DB_POSTGRESDB_SCHEMA` | n8n-worker | public |
| `N8N_AI_CACHE_ENABLED` | n8n-worker | false |
| `N8N_PAYLOAD_SIZE_MAX` | n8n-worker | 16 |
| `N8N_SOCKET_KEEPALIVE` | n8n-worker | true |
| `DB_POSTGRESDB_USE_SSL` | n8n-worker | true |
| `N8N_EXECUTION_TIMEOUT` | n8n-worker | 900000 |
| `N8N_REDIS_MAX_RETRIES` | n8n-worker | 8 |
| `N8N_REDIS_PREFER_IPV6` | n8n-worker | true |
| `N8N_REDIS_SSL_ENABLED` | n8n-worker | false |
| `N8N_WEBHOOK_TEST_MODE` | n8n-worker | true |
| `N8N_LOG_EXECUTION_DATA` | n8n-worker | true |
| `N8N_DIAGNOSTICS_ENABLED` | n8n-worker | false |
| `N8N_LOG_EXECUTION_ERROR` | n8n-worker | true |
| `QUEUE_BULL_REDIS_FAMILY` | n8n-worker | 6 |
| `N8N_LOG_EXECUTION_STATUS` | n8n-worker | true |
| `N8N_LOG_EXECUTION_TIMING` | n8n-worker | true |
| `QUEUE_BULL_QOS_THRESHOLD` | n8n-worker | 15 |
| `QUEUE_BULL_REDIS_USE_TLS` | n8n-worker | false |
| `REDIS_RECONNECT_INTERVAL` | n8n-worker | 2000 |
| `DB_POSTGRESDB_SSL_ENABLED` | n8n-worker | true |
| `N8N_AI_COMPLETION_TIMEOUT` | n8n-worker | 600000 |
| `N8N_MAX_EXECUTION_TIMEOUT` | n8n-worker | 14400000 |
| `N8N_REDIS_CONNECT_TIMEOUT` | n8n-worker | 5000 |
| `N8N_REDIS_RECONNECT_DELAY` | n8n-worker | 1000 |
| `QUEUE_BULL_MAX_RETRY_TIME` | n8n-worker | 3600000 |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-worker | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true |
| `DB_SSL_REJECT_UNAUTHORIZED` | n8n-worker | false |
| `N8N_EXECUTION_PROCESS_MODE` | n8n-worker | worker |
| `N8N_SOCKET_RECONNECT_DELAY` | n8n-worker | 1500 |
| `N8N_SOCKET_TIMEOUT_CONNECT` | n8n-worker | 60000 |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-worker | true |
| `QUEUE_WORKER_LOCK_DURATION` | n8n-worker | 60000 |
| `N8N_REDIS_OPTIONS_IP_FAMILY` | n8n-worker | 6 |
| `N8N_RETRY_FAILED_EXECUTIONS` | n8n-worker | true |
| `QUEUE_BULL_MAX_STALLEDCHECK` | n8n-worker | 0 |
| `QUEUE_BULL_REDIS_SCAN_COUNT` | n8n-worker | 5000 |
| `N8N_NODES_DEFAULT_BASE_NAMES` | n8n-worker | true |
| `N8N_REDIS_RECONNECT_ATTEMPTS` | n8n-worker | 8 |
| `QUEUE_BULL_QUEUE_CONCURRENCY` | n8n-worker | 100 |
| `QUEUE_BULL_REDIS_PREFER_IPV6` | n8n-worker | true |
| `QUEUE_WORKER_LOCK_RENEW_TIME` | n8n-worker | 30000 |
| `DB_POSTGRESDB_ACQUIRE_TIMEOUT` | n8n-worker | 5000 |
| `DB_POSTGRESDB_MAX_CONNECTIONS` | n8n-worker | 200 |
| `N8N_SOCKET_RECONNECT_ATTEMPTS` | n8n-worker | 5 |
| `QUEUE_BULL_WORKER_CONCURRENCY` | n8n-worker | 200 |
| `QUEUE_WORKER_STALLED_INTERVAL` | n8n-worker | 60000 |
| `KAFKAJS_NO_PARTITIONER_WARNING` | n8n-worker | 1 |
| `N8N_DIAGNOSTICS_CONFIG_BACKEND` | n8n-worker | false |
| `N8N_DIAGNOSTICS_CONFIG_ENABLED` | n8n-worker | false |
| `N8N_DISABLE_WEBHOOK_THROTTLING` | n8n-worker | true |
| `N8N_WORKFLOW_EXECUTION_TIMEOUT` | n8n-worker | 3600 |
| `QUEUE_BULL_SETTINGS_DRAINDELAY` | n8n-worker | 5 |
| `QUEUE_WORKER_MAX_STALLED_COUNT` | n8n-worker | 5 |
| `QUEUE_BULL_SETTINGS_LIMITER_MAX` | n8n-worker | 1000 |
| `DB_POSTGRESDB_CONNECTION_TIMEOUT` | n8n-worker | 10000 |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n-worker | true |
| `QUEUE_BULL_SETTINGS_LOCKDURATION` | n8n-worker | 30000 |
| `QUEUE_BULL_SETTINGS_LOCKRENEWTIME` | n8n-worker | 15000 |
| `QUEUE_BULL_SETTINGS_MAXSTALLEDCOUNT` | n8n-worker | 3 |
| `QUEUE_BULL_SETTINGS_STALLEDINTERVAL` | n8n-worker | 30000 |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-worker | true |
| `QUEUE_BULL_SETTINGS_LIMITER_DURATION` | n8n-worker | 5000 |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | n8n-worker | false |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-worker | true |
| `N8N_WORKFLOW_EXECUTION_ERROR_WORKFLOW` | n8n-worker | error-workflow |
| `N8N_NODES_INCLUDE_OTHER_VERSION_INPUTS` | n8n-worker | true |
| `N8N_NODES_EXCLUDE_FIELDS_BY_NODE_VERSION` | n8n-worker | false |
| `QUEUE_BULL_REDIS_TLS_REJECT_UNAUTHORIZED` | n8n-worker | false |
| `N8N_DISABLE_PRODUCTION_WEBHOOK_ONBOARDING` | n8n-worker | false |
| `QUEUE_BULL_SETTINGS_DEFAULTJOBPTIONS_ATTEMPTS` | n8n-worker | 10 |
| `QUEUE_BULL_SETTINGS_DEFAULTJOBPTIONS_BACKOFF_TYPE` | n8n-worker | exponential |
| `QUEUE_BULL_SETTINGS_DEFAULTJOBPTIONS_BACKOFF_DELAY` | n8n-worker | 1000 |
| `TZ` | n8n-main | Asia/Jakarta |
| `DB_SSL` | n8n-main | true |
| `DB_TYPE` | n8n-main | postgresdb |
| `DB_USER` | n8n-main | (secret) |
| `N8N_HOST` | n8n-main | 0.0.0.0 |
| `N8N_PORT` | n8n-main | 5678 |
| `PGSSLMODE` | n8n-main | prefer |
| `DB_PASSWORD` | n8n-main | (secret) |
| `DB_POOL_MAX` | n8n-main | 150 |
| `DB_POOL_MIN` | n8n-main | 30 |
| `DATABASE_URL` | n8n-main | postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?sslmode=prefer&application_name=n8n_main&connection_limit=150&pool_timeout=10&idle_timeout=30000&connect_timeout=10&target_session_attrs=read-write&keepalives=1&keepalives_idle=30&tcp_user_timeout=3000 |
| `N8N_PROTOCOL` | n8n-main | https |
| `NODE_OPTIONS` | n8n-main | --no-warnings --dns-result-order=ipv4first |
| `REDIS_FAMILY` | n8n-main | 0 |
| `N8N_LOG_LEVEL` | n8n-main | info |
| `DB_SSL_ENABLED` | n8n-main | true |
| `N8N_AI_ENABLED` | n8n-main | true |
| `N8N_LOG_CALLER` | n8n-main | true |
| `N8N_LOG_OUTPUT` | n8n-main | console |
| `REDIS_PASSWORD` | n8n-main | (secret) |
| `REDIS_USERNAME` | n8n-main | (secret) |
| `EXECUTIONS_MODE` | n8n-main | queue |
| `N8N_LOG_METRICS` | n8n-main | true |
| `N8N_TRUST_PROXY` | n8n-main | true |
| `N8N_LOG_TRACE_ID` | n8n-main | true |
| `N8N_PUSH_BACKEND` | n8n-main | websocket |
| `QUEUE_BULL_CACHE` | n8n-main | true |
| `N8N_HTTP2_ENABLED` | n8n-main | true |
| `N8N_LOG_TIMESTAMP` | n8n-main | true |
| `N8N_SECURE_COOKIE` | n8n-main | true |
| `QUEUE_BULL_ACTIVE` | n8n-main | true |
| `QUEUE_BULL_PREFIX` | n8n-main | n8n-bull |
| `DB_LOGGING_ENABLED` | n8n-main | true |
| `DB_LOGGING_OPTIONS` | n8n-main | error |
| `N8N_COMPRESS_LEVEL` | n8n-main | 6 |
| `N8N_ENCRYPTION_KEY` | n8n-main | 6Vb5AqZKVF8H2P7fJ9tLwS3xY4nR7mD1cE2gB5hK9pT4 |
| `N8N_LISTEN_ADDRESS` | n8n-main | 0.0.0.0 |
| `N8N_LOG_CONTEXT_ID` | n8n-main | true |
| `N8N_METRICS_PREFIX` | n8n-main | n8n_main_ |
| `N8N_SOCKET_TIMEOUT` | n8n-main | 600000 |
| `N8N_TEMPLATES_HOST` | n8n-main | https://api.n8n.io/api/ |
| `N8N_WEBHOOK_TUNNEL` | n8n-main | true |
| `N8N_JWT_AUTH_ACTIVE` | n8n-main | true |
| `N8N_JWT_AUTH_HEADER` | n8n-main | Authorization |
| `N8N_METRICS_ENABLED` | n8n-main | true |
| `N8N_PROCESS_TIMEOUT` | n8n-main | 1800 |
| `N8N_RUNNERS_ENABLED` | n8n-main | true |
| `PGSTATEMENT_TIMEOUT` | n8n-main | 60000 |
| `QUEUE_BULL_REDIS_DB` | n8n-main | 0 |
| `DB_POSTGRESDB_SCHEMA` | n8n-main | public |
| `N8N_AI_CACHE_ENABLED` | n8n-main | true |
| `N8N_PAYLOAD_SIZE_MAX` | n8n-main | 16 |
| `N8N_REDIS_KEY_PREFIX` | n8n-main | n8n:main: |
| `N8N_SOCKET_KEEPALIVE` | n8n-main | true |
| `N8N_WEBHOOKS_TIMEOUT` | n8n-main | 120000 |
| `DB_POSTGRESDB_USE_SSL` | n8n-main | true |
| `N8N_BASIC_AUTH_ACTIVE` | n8n-main | false |
| `N8N_REDIS_MAX_RETRIES` | n8n-main | 10 |
| `N8N_REDIS_PREFER_IPV6` | n8n-main | true |
| `N8N_REDIS_SSL_ENABLED` | n8n-main | false |
| `N8N_TEMPLATES_ENABLED` | n8n-main | true |
| `N8N_WEBHOOK_TEST_MODE` | n8n-main | true |
| `N8N_WEBSOCKET_TIMEOUT` | n8n-main | 300000 |
| `VERIFY_PGBOUNCER_ONLY` | n8n-main | true |
| `N8N_COMPRESS_RESPONSES` | n8n-main | true |
| `N8N_COMPRESS_THRESHOLD` | n8n-main | 1kb |
| `N8N_LOG_EXECUTION_DATA` | n8n-main | true |
| `N8N_SERVE_STATIC_CACHE` | n8n-main | true |
| `QUEUE_BULL_CONCURRENCY` | n8n-main | 30 |
| `N8N_DIAGNOSTICS_ENABLED` | n8n-main | false |
| `N8N_LOG_EXECUTION_ERROR` | n8n-main | true |
| `N8N_WEBSOCKET_KEEPALIVE` | n8n-main | 30000 |
| `QUEUE_BULL_REDIS_FAMILY` | n8n-main | 0 |
| `N8N_LOG_EXECUTION_STATUS` | n8n-main | true |
| `N8N_LOG_EXECUTION_TIMING` | n8n-main | true |
| `N8N_PUSH_CONNECTION_MODE` | n8n-main | websocket |
| `N8N_REDIS_RETRY_STRATEGY` | n8n-main | function(times) { return Math.min(times * 100, 3000); } |
| `QUEUE_BULL_QOS_THRESHOLD` | n8n-main | 10 |
| `QUEUE_BULL_REDIS_USE_TLS` | n8n-main | false |
| `DB_POSTGRESDB_SSL_ENABLED` | n8n-main | true |
| `N8N_AI_COMPLETION_TIMEOUT` | n8n-main | 600000 |
| `N8N_EDITOR_TUNNEL_ENABLED` | n8n-main | false |
| `N8N_REDIS_CONNECT_TIMEOUT` | n8n-main | 5000 |
| `QUEUE_BULL_MAX_RETRY_TIME` | n8n-main | 3600000 |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-main | (secret) |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-main | (secret) |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-main | true |
| `DB_SSL_REJECT_UNAUTHORIZED` | n8n-main | false |
| `N8N_EXECUTION_PROCESS_MODE` | n8n-main | main |
| `N8N_SOCKET_RECONNECT_DELAY` | n8n-main | 1500 |
| `N8N_SOCKET_TIMEOUT_CONNECT` | n8n-main | 60000 |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-main | true |
| `QUEUE_WORKER_LOCK_DURATION` | n8n-main | 60000 |
| `N8N_PERSONALIZATION_ENABLED` | n8n-main | true |
| `N8N_REDIS_OPTIONS_IP_FAMILY` | n8n-main | 6 |
| `N8N_WEBHOOKS_RETRY_ATTEMPTS` | n8n-main | 5 |
| `QUEUE_BULL_REDIS_SCAN_COUNT` | n8n-main | 5000 |
| `N8N_NODES_DEFAULT_BASE_NAMES` | n8n-main | true |
| `N8N_USER_MANAGEMENT_DISABLED` | n8n-main | false |
| `QUEUE_BULL_REDIS_PREFER_IPV6` | n8n-main | true |
| `QUEUE_WORKER_LOCK_RENEW_TIME` | n8n-main | 30000 |
| `DB_POSTGRESDB_ACQUIRE_TIMEOUT` | n8n-main | 10000 |
| `DB_POSTGRESDB_MAX_CONNECTIONS` | n8n-main | 200 |
| `N8N_SOCKET_RECONNECT_ATTEMPTS` | n8n-main | 5 |
| `N8N_WEBHOOKS_BACKOFF_STRATEGY` | n8n-main | exponential |
| `QUEUE_BULL_GLOBAL_CONCURRENCY` | n8n-main | 50 |
| `QUEUE_WORKER_STALLED_INTERVAL` | n8n-main | 60000 |
| `N8N_DIAGNOSTICS_CONFIG_BACKEND` | n8n-main | false |
| `N8N_DIAGNOSTICS_CONFIG_ENABLED` | n8n-main | false |
| `N8N_DISABLE_WEBHOOK_THROTTLING` | n8n-main | true |
| `N8N_SERVE_STATIC_CACHE_MAX_AGE` | n8n-main | 86400000 |
| `N8N_WORKFLOW_EXECUTION_TIMEOUT` | n8n-main | 3600 |
| `QUEUE_BULL_SETTINGS_DRAINDELAY` | n8n-main | 5 |
| `QUEUE_WORKER_MAX_STALLED_COUNT` | n8n-main | 5 |
| `QUEUE_BULL_SETTINGS_LIMITER_MAX` | n8n-main | 1000 |
| `DB_POSTGRESDB_CONNECTION_TIMEOUT` | n8n-main | 10000 |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n-main | true |
| `N8N_PUSH_NOTIFICATION_BATCH_SIZE` | n8n-main | 100 |
| `N8N_SERVE_STATIC_CACHE_IMMUTABLE` | n8n-main | true |
| `QUEUE_BULL_SETTINGS_LOCKDURATION` | n8n-main | 30000 |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | n8n-main | true |
| `QUEUE_BULL_SETTINGS_LOCKRENEWTIME` | n8n-main | 15000 |
| `QUEUE_BULL_SETTINGS_MAXSTALLEDCOUNT` | n8n-main | 3 |
| `QUEUE_BULL_SETTINGS_STALLEDINTERVAL` | n8n-main | 30000 |
| `N8N_PUSH_NOTIFICATION_BATCH_INTERVAL` | n8n-main | 250 |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-main | true |
| `QUEUE_BULL_SETTINGS_LIMITER_DURATION` | n8n-main | 5000 |
| `DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED` | n8n-main | false |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-main | true |
| `N8N_METRICS_INCLUDE_INVALID_API_CALLS` | n8n-main | true |
| `N8N_NODES_INCLUDE_OTHER_VERSION_INPUTS` | n8n-main | true |
| `N8N_EDITOR_SKIP_WEBHOOK_INSTALL_BLOCKING` | n8n-main | true |
| `N8N_NODES_EXCLUDE_FIELDS_BY_NODE_VERSION` | n8n-main | false |
| `QUEUE_BULL_REDIS_TLS_REJECT_UNAUTHORIZED` | n8n-main | false |
| `N8N_DISABLE_PRODUCTION_WEBHOOK_ONBOARDING` | n8n-main | false |
| `N8N_EDITOR_DISABLE_PRODUCTION_MAIN_PACKAGE` | n8n-main | false |
| `QUEUE_BULL_SETTINGS_DEFAULTJOBPTIONS_ATTEMPTS` | n8n-main | 10 |
| `QUEUE_BULL_SETTINGS_DEFAULTJOBPTIONS_BACKOFF_TYPE` | n8n-main | exponential |
| `QUEUE_BULL_SETTINGS_DEFAULTJOBPTIONS_BACKOFF_DELAY` | n8n-main | 1000 |
| `TZ` | postgres | Asia/Jakarta |
| `PGSSLMODE` | postgres | prefer |
| `POSTGRES_DB` | postgres | n8n |
| `POSTGRES_JIT` | postgres | on |
| `POSTGRES_SSL` | postgres | true |
| `POSTGRES_IPV6` | postgres | true |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `POSTGRES_WORK_MEM` | postgres | 64MB |
| `POSTGRES_WAL_LEVEL` | postgres | replica |
| `POSTGRES_AUTOVACUUM` | postgres | on |
| `POSTGRES_LOG_DURATION` | postgres | on |
| `POSTGRES_MAX_WAL_SIZE` | postgres | 4GB |
| `POSTGRES_MIN_WAL_SIZE` | postgres | 1GB |
| `POSTGRES_TEMP_BUFFERS` | postgres | 64MB |
| `POSTGRES_LOG_STATEMENT` | postgres | all |
| `POSTGRES_JIT_ABOVE_COST` | postgres | 100000 |
| `POSTGRES_LOG_LOCK_WAITS` | postgres | on |
| `POSTGRES_LOG_TEMP_FILES` | postgres | 0 |
| `POSTGRES_SHARED_BUFFERS` | postgres | 4GB |
| `POSTGRES_LOG_CHECKPOINTS` | postgres | on |
| `POSTGRES_LOG_CONNECTIONS` | postgres | on |
| `POSTGRES_LOG_MIN_MESSAGES` | postgres | info |
| `POSTGRES_RANDOM_PAGE_COST` | postgres | 1.1 |
| `POSTGRES_WAL_KEEP_SEGMENTS` | postgres | 32 |
| `POSTGRES_AUTOVACUUM_NAPTIME` | postgres | 5min |
| `POSTGRES_LOG_DISCONNECTIONS` | postgres | on |
| `POSTGRES_PARALLEL_SETUP_COST` | postgres | 10 |
| `POSTGRES_PARALLEL_TUPLE_COST` | postgres | 0.01 |
| `POSTGRES_EFFECTIVE_CACHE_SIZE` | postgres | 8GB |
| `POSTGRES_MAINTENANCE_WORK_MEM` | postgres | 1GB |
| `POSTGRES_MAX_PARALLEL_WORKERS` | postgres | 8 |
| `POSTGRES_MAX_WORKER_PROCESSES` | postgres | 8 |
| `POSTGRES_AUTOVACUUM_MAX_WORKERS` | postgres | 3 |
| `POSTGRES_LOG_MIN_ERROR_STATEMENT` | postgres | debug1 |
| `POSTGRES_EFFECTIVE_IO_CONCURRENCY` | postgres | 300 |
| `RESTRICT_CONNECTIONS_TO_PGBOUNCER` | postgres | true |
| `POSTGRES_LOG_MIN_DURATION_STATEMENT` | postgres | 500 |
| `POSTGRES_LOG_AUTOVACUUM_MIN_DURATION` | postgres | 0 |
| `POSTGRES_AUTOVACUUM_VACUUM_SCALE_FACTOR` | postgres | 0.1 |
| `POSTGRES_AUTOVACUUM_ANALYZE_SCALE_FACTOR` | postgres | 0.05 |
| `POSTGRES_MAX_PARALLEL_WORKERS_PER_GATHER` | postgres | 4 |

## Configuration

- **Volume:** `/data`
- **Start command:** `n8n worker`
- **Start command:** `n8n start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/template/xEFh9O)
