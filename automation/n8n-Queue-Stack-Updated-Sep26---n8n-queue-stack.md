# Deploy n8n Queue Stack [Updated Sep'26] on Railway

Queue-mode n8n: main, worker, Redis, Postgres. All images pinned.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-queue-stack)

## About

n8n is a fair-code workflow automation platform and the leading self-hosted alternative to Zapier — same visual canvas, 400+ integrations, no per-task billing, no data leaving your infrastructure. Most self-hosted n8n runs as one container serving the editor, webhooks and executions alike, which holds until a single slow run freezes the UI. This template wires n8n in queue mode across four services with generated secrets and private networking configured, so you get a production execution tier on your first deploy.

**The encryption key is the trap that bites everyone.** `N8N_ENCRYPTION_KEY` must be byte-identical across every n8n service. Get it wrong and nothing fails at deploy — the editor loads, workflows save, then executions fail at runtime with decryption errors that look like an API problem.

**Queue mode cannot run on SQLite.** Single-container guides call the database optional. Here it isn't — the main process and worker need a shared durable store, so Postgres is mandatory.

**Execution history grows without limit by default.** n8n keeps every run, binary payloads included, until told otherwise. A busy instance fills a volume in weeks, so set pruning early.

**Production webhooks break without an explicit public URL.** n8n builds webhook URLs from its host config. Left unset it hands out localhost addresses nothing external can reach, and the failure is silent — the workflow never fires.

**n8n is memory-bound before it is CPU-bound.** Four vCPU with 8 GB beats eight vCPU with 4 GB. Budget 512 MB–1 GB per worker and add RAM or replicas rather than cores.

**Typical cost: ~$15–25/month** at light traffic, on Railway's rates of $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. Cost scales with worker replicas, not workflow count.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| n8n | `ghcr.io/n8n-io/n8n` | Web service |
| Redis | `redis:8.2` | Database |
| n8n-runner | `ghcr.io/n8n-io/runners` | Worker |
| n8n-worker | `ghcr.io/n8n-io/n8n` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `TZ` | n8n | UTC | TZ |
| `PORT` | n8n | 5678 | HTTP listen port |
| `DB_TYPE` | n8n | postgresdb | Use Postgres backend |
| `N8N_HOST` | n8n | - | Public hostname |
| `N8N_PORT` | n8n | 5678 | n8n application port |
| `N8N_PROTOCOL` | n8n | https | Public URL scheme |
| `NODE_OPTIONS` | n8n | --max-old-space-size=2048 | V8 heap ceiling in MB |
| `N8N_PROXY_HOPS` | n8n | 1 | Trust Railway edge proxy |
| `EXECUTIONS_MODE` | n8n | queue | Enqueue executions to workers |
| `N8N_WEBHOOK_URL` | n8n | - | Webhook base URL |
| `GENERIC_TIMEZONE` | n8n | UTC | Timezone for cron triggers |
| `N8N_RUNNERS_MODE` | n8n | external | Code nodes run in sidecar |
| `N8N_SECURE_COOKIE` | n8n | true | Secure session cookies over HTTPS |
| `DB_POSTGRESDB_HOST` | n8n | - | Postgres private host |
| `DB_POSTGRESDB_PORT` | n8n | 5432 | DB_POSTGRESDB_PORT |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Postgres username |
| `N8N_ENCRYPTION_KEY` | n8n | - | Encrypts stored credentials |
| `N8N_LISTEN_ADDRESS` | n8n | :: | Dual-stack bind for private network |
| `N8N_EDITOR_BASE_URL` | n8n | - | Editor base URL |
| `QUEUE_BULL_REDIS_DB` | n8n | 0 | Redis database index |
| `DB_POSTGRESDB_SCHEMA` | n8n | public | Postgres schema |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | Auto-prune execution history |
| `QUEUE_BULL_REDIS_HOST` | n8n | - | Redis private host |
| `QUEUE_BULL_REDIS_PORT` | n8n | 6379 | Redis port |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Postgres database name |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Postgres password |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n | (secret) | Shared task runner token |
| `DB_POSTGRESDB_POOL_SIZE` | n8n | 4 | Max database connections |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | Disable telemetry |
| `N8N_RUNNERS_BROKER_PORT` | n8n | 5679 | Task broker port |
| `N8N_NATIVE_PYTHON_RUNNER` | n8n | true | Enable Python code runner |
| `N8N_RUNNERS_TASK_TIMEOUT` | n8n | 300 | Max code task seconds |
| `N8N_HIRING_BANNER_ENABLED` | n8n | false | Hide console hiring banner |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | n8n | (secret) | Redis ACL username |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n | true | Required for IPv6 private network |
| `N8N_SSRF_PROTECTION_ENABLED` | n8n | true | Block private-range HTTP targets |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n | true | Hide env vars from code nodes |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n | database | Store binary data in Postgres |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | n8n | 30 | Shutdown drain seconds |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n | true | Reinstall community nodes on boot |
| `N8N_GIT_NODE_DISABLE_BARE_REPOS` | n8n | true | Disallow bare repos in Git node |
| `N8N_UNVERIFIED_PACKAGES_ENABLED` | n8n | false | Block unverified community packages |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | n8n | :: | Dual-stack broker bind |
| `N8N_COMPRESSION_NODE_MAX_ZIP_ENTRIES` | n8n | 1000 | Max entries per archive |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n | true | Editor runs execute on workers |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | Harden settings file permissions |
| `N8N_BINARY_DATA_DATABASE_MAX_FILE_SIZE` | n8n | 256 | Max binary file size MiB |
| `N8N_COMPRESSION_NODE_MAX_DECOMPRESSED_SIZE_BYTES` | n8n | 268435456 | Decompression size ceiling |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `TZ` | n8n-runner | UTC | Container system timezone |
| `GENERIC_TIMEZONE` | n8n-runner | UTC | Timezone for code execution |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-runner | (secret) | Shared task runner token |
| `N8N_RUNNERS_MAX_CONCURRENCY` | n8n-runner | 5 | Concurrent code tasks per runner |
| `N8N_RUNNERS_TASK_BROKER_URI` | n8n-runner | - | Worker task broker endpoint |
| `N8N_RUNNERS_LAUNCHER_LOG_LEVEL` | n8n-runner | info | Launcher log verbosity |
| `N8N_RUNNERS_MAX_OLD_SPACE_SIZE` | n8n-runner | 1024 | Runner V8 heap ceiling in MB |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT` | n8n-runner | 0 | Never auto-shutdown the launcher |
| `N8N_RUNNERS_LAUNCHER_HEALTH_CHECK_PORT` | n8n-runner | 5680 | Launcher health check port |
| `TZ` | n8n-worker | UTC | Container system timezone |
| `PORT` | n8n-worker | 5678 | Health check listen port |
| `DB_TYPE` | n8n-worker | postgresdb | Use Postgres backend |
| `NODE_OPTIONS` | n8n-worker | --max-old-space-size=2048 | V8 heap ceiling in MB |
| `EXECUTIONS_MODE` | n8n-worker | queue | Consume executions from queue |
| `N8N_WEBHOOK_URL` | n8n-worker | - | Webhook base URL |
| `GENERIC_TIMEZONE` | n8n-worker | UTC | Timezone for cron triggers |
| `N8N_RUNNERS_MODE` | n8n-worker | external | Code nodes run in sidecar |
| `DB_POSTGRESDB_HOST` | n8n-worker | - | Postgres private host |
| `DB_POSTGRESDB_PORT` | n8n-worker | 5432 | Postgres port |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | Postgres username |
| `N8N_ENCRYPTION_KEY` | n8n-worker | - | Must match main instance |
| `N8N_LISTEN_ADDRESS` | n8n-worker | :: | Dual-stack bind for private network |
| `N8N_EDITOR_BASE_URL` | n8n-worker | - | Editor base URL |
| `QUEUE_BULL_REDIS_DB` | n8n-worker | 0 | Redis database index |
| `DB_POSTGRESDB_SCHEMA` | n8n-worker | public | Postgres schema |
| `EXECUTIONS_DATA_PRUNE` | n8n-worker | true | Auto-prune execution history |
| `QUEUE_BULL_REDIS_HOST` | n8n-worker | - | Redis private host |
| `QUEUE_BULL_REDIS_PORT` | n8n-worker | 6379 | Redis port |
| `DB_POSTGRESDB_DATABASE` | n8n-worker | - | Postgres database name |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | Postgres password |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-worker | (secret) | Shared task runner token |
| `DB_POSTGRESDB_POOL_SIZE` | n8n-worker | 4 | Max database connections |
| `N8N_DIAGNOSTICS_ENABLED` | n8n-worker | false | Disable telemetry |
| `N8N_RUNNERS_BROKER_PORT` | n8n-worker | 5679 | Task broker port |
| `QUEUE_HEALTH_CHECK_PORT` | n8n-worker | 5678 | Worker health check port |
| `N8N_NATIVE_PYTHON_RUNNER` | n8n-worker | true | Enable Python code runner |
| `N8N_RUNNERS_TASK_TIMEOUT` | n8n-worker | 300 | Max code task seconds |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) | Redis password |
| `QUEUE_BULL_REDIS_USERNAME` | n8n-worker | (secret) | Redis ACL username |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n-worker | true | Expose worker health endpoint |
| `QUEUE_BULL_REDIS_DUALSTACK` | n8n-worker | true | Required for IPv6 private network |
| `N8N_SSRF_PROTECTION_ENABLED` | n8n-worker | true | Block private-range HTTP targets |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n-worker | true | Hide env vars from code nodes |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n-worker | database | Store binary data in Postgres |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | n8n-worker | 30 | Shutdown drain seconds |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n-worker | true | Reinstall community nodes on boot |
| `N8N_GIT_NODE_DISABLE_BARE_REPOS` | n8n-worker | true | Disallow bare repos in Git node |
| `N8N_UNVERIFIED_PACKAGES_ENABLED` | n8n-worker | false | Block unverified community packages |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | n8n-worker | :: | Dual-stack broker bind |
| `N8N_COMPRESSION_NODE_MAX_ZIP_ENTRIES` | n8n-worker | 1000 | Max entries per archive |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n-worker | true | Accept editor test runs |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-worker | true | Harden settings file permissions |
| `N8N_BINARY_DATA_DATABASE_MAX_FILE_SIZE` | n8n-worker | 256 | Max binary file size MiB |
| `N8N_COMPRESSION_NODE_MAX_DECOMPRESSED_SIZE_BYTES` | n8n-worker | 268435456 | Decompression size ceiling |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-queue-stack)
