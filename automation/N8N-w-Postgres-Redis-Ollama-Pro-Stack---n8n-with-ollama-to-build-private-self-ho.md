# Deploy N8N [w/ Postgres + Redis + Ollama] | Pro Stack on Railway

[Apr '26] Build Automation Workflows Using Self Hosted LLM Models

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-with-ollama-to-build-private-self-ho)

## About

N8N with Ollama lets you build powerful, private AI-powered automation workflows using locally deployed large language models. This template provisions n8n, Ollama, PostgreSQL, and Redis together so you can run LLM-driven workflows without relying on external AI APIs or exposing sensitive data.
![Chatting with self hosted LLM Model in N8N](https://res.cloudinary.com/asset-cloudinary/image/upload/v1768248230/chat_with_ollama_b3m1l9.png)

This template deploys a complete, production-ready automation stack using n8n and Ollama on Railway.

n8n handles workflow orchestration and automation, while Ollama runs local large language models such as DeepSeek or LLaMA variants. PostgreSQL is used for persistent workflow data, and Redis powers queue-based execution with scalable workers.

The result is a fully private, self-hosted AI automation platform where all inference stays inside your infrastructure. This setup is ideal for teams that need reliability, scalability, and data control without managing complex networking or orchestration manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | `n8nio/n8n` | Worker |
| Ollama | `ollama/ollama` | Web service |
| main | `n8nio/n8n` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | worker | 5678 | Port on which the n8n service listens (typically 5678). |
| `DB_TYPE` | worker | postgresdb | Specifies the type of database used by n8n — here it’s postgresdb. |
| `WEBHOOK_URL` | worker | - | Public URL endpoint for receiving external webhook triggers through Railway’s public domain. |
| `NODE_OPTIONS` | worker | --max_old_space_size=8192 | Configures Node.js memory usage. |
| `EXECUTIONS_MODE` | worker | queue | Determines how workflows are processed. queue enables distributed execution using Redis. |
| `OLLAMA_BASE_URL` | worker | - | Points N8N to the internal Ollama API endpoint for model access. |
| `DB_POSTGRESDB_HOST` | worker | - | Host address of the PostgreSQL database connected to n8n. |
| `DB_POSTGRESDB_PORT` | worker | - | Port number where PostgreSQL is running — usually 5432. |
| `DB_POSTGRESDB_USER` | worker | (secret) | Username used by n8n to authenticate with PostgreSQL. |
| `N8N_ENCRYPTION_KEY` | worker | - | Secret key used to encrypt sensitive credentials stored in the n8n database. |
| `N8N_LISTEN_ADDRESS` | worker | :: | Defines which network interfaces n8n binds to — :: allows both IPv4 and IPv6. |
| `N8N_RUNNERS_ENABLED` | worker | true | Enables “Runners,” allowing distributed workflow execution across multiple worker nodes. |
| `QUEUE_BULL_REDIS_HOST` | worker | - | Redis host address used by n8n for managing job queues in queue mode. |
| `QUEUE_BULL_REDIS_PORT` | worker | - | Redis port number — typically 6379. |
| `DB_POSTGRESDB_DATABASE` | worker | - | The name of the PostgreSQL database that stores n8n’s workflow and execution data. |
| `DB_POSTGRESDB_PASSWORD` | worker | (secret) | Password for authenticating the PostgreSQL connection. |
| `QUEUE_BULL_REDIS_PASSWORD` | worker | (secret) | Password used to connect securely to Redis. |
| `QUEUE_BULL_REDIS_USERNAME` | worker | (secret) | Username used for authenticating Redis connections (if required). |
| `QUEUE_BULL_REDIS_DUALSTACK` | worker | true | Enables dual IPv4 and IPv6 support for Redis connections. |
| `DB_POSTGRESDB_CONNECTION_TIMEOUT` | worker | 300000 | Time (ms) before timeout during db connection |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | worker | true | Enables private networking between services on Railway’s infrastructure for secure internal communication. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | worker | true | Runs manual (UI-triggered) executions on worker nodes instead of the main instance to improve performance. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | worker | true | Ensures configuration files have strict permissions for improved security in production environments. |
| `OLLAMA_HOST` | Ollama | :: | Allows Ollama to listen on all interfaces |
| `OLLAMA_ORIGINS` | Ollama | * | Comma-separated list of allowed origins for CORS. |
| `OLLAMA_DEFAULT_MODELS` | Ollama | deepseek-r1:1.5b | You can specify the model to download at boot time (comma separated, if multiple). This can be updated from UI later as well. By default it downloads the deepsek-r1:1.5b model(from https://ollama.com/library). Please make sure you have enough memory to download the specified model. |
| `PORT` | main | 5678 | Port on which the n8n service listens (typically 5678). |
| `DB_TYPE` | main | postgresdb | Specifies the type of database used by n8n — here it’s postgresdb. |
| `N8N_PORT` | main | 5678 | Internal port for n8n’s web interface and API (usually same as PORT). |
| `WEBHOOK_URL` | main | - | Public URL endpoint for receiving external webhook triggers through Railway’s public domain. |
| `NODE_OPTIONS` | main | --max_old_space_size=8192 | Configures Node.js memory usage — This config (8192) allows n8n to use up to 8 GB of memory. |
| `EXECUTIONS_MODE` | main | queue | Determines how workflows are processed. queue enables distributed execution using Redis. |
| `OLLAMA_BASE_URL` | main | - | Points N8N to the internal Ollama API endpoint for model access. |
| `DB_POSTGRESDB_HOST` | main | - | Host address of the PostgreSQL database connected to n8n. |
| `DB_POSTGRESDB_PORT` | main | - | Port number where PostgreSQL is running — usually 5432. |
| `DB_POSTGRESDB_USER` | main | (secret) | Username used by n8n to authenticate with PostgreSQL. |
| `N8N_ENCRYPTION_KEY` | main | {{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") }} | Secret key used to encrypt sensitive credentials stored in the n8n database. |
| `N8N_LISTEN_ADDRESS` | main | :: | Defines which network interfaces n8n binds to — :: allows both IPv4 and IPv6. |
| `N8N_EDITOR_BASE_URL` | main | - | Base URL where the n8n editor (web UI) is accessible. |
| `N8N_RUNNERS_ENABLED` | main | true | Enables “Runners,” allowing distributed workflow execution across multiple worker nodes. |
| `EXECUTIONS_DATA_PRUNE` | main | true | Automatically deletes old workflow execution logs to save storage space. |
| `QUEUE_BULL_REDIS_HOST` | main | - | Redis host address used by n8n for managing job queues in queue mode. |
| `QUEUE_BULL_REDIS_PORT` | main | - | Redis port number — typically 6379. |
| `DB_POSTGRESDB_DATABASE` | main | - | The name of the PostgreSQL database that stores n8n’s workflow and execution data. |
| `DB_POSTGRESDB_PASSWORD` | main | (secret) | Password for authenticating the PostgreSQL connection. |
| `QUEUE_BULL_REDIS_PASSWORD` | main | (secret) | Password used to connect securely to Redis. |
| `QUEUE_BULL_REDIS_USERNAME` | main | (secret) | Username used for authenticating Redis connections (if required). |
| `QUEUE_BULL_REDIS_DUALSTACK` | main | true | Enables dual IPv4 and IPv6 support for Redis connections. |
| `N8N_DEFAULT_BINARY_DATA_MODE` | main | filesystem | Defines where binary files (images, PDFs, etc.) are stored — filesystem saves them to attached storage. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | main | 100 | Maximum number of workflow execution records to retain before pruning older ones. |
| `DB_POSTGRESDB_CONNECTION_TIMEOUT` | main | 300000 | Time (ms) before timeout during db connection |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | main | true | Enables private networking between services on Railway’s infrastructure for secure internal communication. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | main | true | Runs manual (UI-triggered) executions on worker nodes instead of the main instance to improve performance. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | main | true | Ensures configuration files have strict permissions for improved security in production environments. |
| `POSTGRES_DB` | Postgres | railway | The name of the default database created during initialization |
| `DATABASE_URL` | Postgres | - | The full connection string to connect to Postgres |
| `POSTGRES_USER` | Postgres | (secret) | The username of the Postgres superuser account created when the container starts |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated secure 32-character password for the Postgres instance |
| `DATABASE_PUBLIC_URL` | Postgres | - | The publicly accessible connection string for external database access. |
| `REDISHOST` | Redis | - | The private domain address of your Redis instance — used for internal service communication within Railway. |
| `REDISPORT` | Redis | 6379 | The port on which Redis is running — typically 6379. |
| `REDISUSER` | Redis | default | The username used for authenticating connections to Redis. |
| `REDIS_URL` | Redis | - | The full connection URL for Redis, usually combining host, port, and authentication details. |
| `REDISPASSWORD` | Redis | (secret) | Alias for the Redis password. |
| `REDIS_PASSWORD` | Redis | (secret) | Securely generated password (using Railway’s secret() helper) used to authenticate Redis connections. |
| `REDIS_PUBLIC_URL` | Redis | - | The public URL for connecting to Redis externally. |

## Configuration

- **Start command:** `n8n worker`
- **Start command:** `bash -c "ollama serve & sleep 5 && ollama pull $OLLAMA_DEFAULT_MODELS && wait"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.ollama`
- **Start command:** `n8n start`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-with-ollama-to-build-private-self-ho)
