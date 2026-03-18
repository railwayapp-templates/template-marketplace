# Deploy bebuoc-n8n-unlock-full on Railway

N8N unlock full features by Bé Bước

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bebuoc-n8n-unlock-full)

## About

**What is bebuoc-n8n-unlock-full?**  
bebuoc-n8n-unlock-full is a Railway template designed to deploy n8n with all its features unlocked. n8n is an open-source automation tool that allows users to automate tasks across multiple services with ease. This template unlocks all premium features to ensure you have access to the full power of n8n, enabling efficient workflow automation and integration.

Hosting bebuoc-n8n-unlock-full on Railway offers a quick and easy way to set up n8n with full capabilities on a scalable platform. With Railway, you get an out-of-the-box solution that handles deployment, scalability, and infrastructure management, allowing you to focus on automating your workflows. Railway makes it easier to integrate external services, automate tasks, and manage workflows without worrying about server maintenance or scaling issues.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bebuoc-n8n | [minhkog/bebuoc-n8n](https://github.com/minhkog/bebuoc-n8n) (branch: main) (root: /) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| bebuoc-n8n-runner | [minhkog/bebuoc-n8n-runner](https://github.com/minhkog/bebuoc-n8n-runner) (branch: main) (root: /railway-deployment/runner) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_TYPE` | bebuoc-n8n | postgresdb | - |
| `N8N_PORT` | bebuoc-n8n | 5678 | - |
| `N8N_PROTOCOL` | bebuoc-n8n | https | - |
| `N8N_LOG_LEVEL` | bebuoc-n8n | info | - |
| `NODES_EXCLUDE` | bebuoc-n8n | [] | - |
| `N8N_RUNNERS_MODE` | bebuoc-n8n | external | - |
| `DB_POSTGRESDB_USER` | bebuoc-n8n | (secret) | - |
| `N8N_RUNNERS_ENABLED` | bebuoc-n8n | true | - |
| `EXECUTE_FILE_PACKAGES` | bebuoc-n8n | ffmpeg,curl | - |
| `DB_POSTGRESDB_PASSWORD` | bebuoc-n8n | (secret) | - |
| `N8N_RUNNERS_AUTH_TOKEN` | bebuoc-n8n | (secret) | - |
| `N8N_RUNNERS_BROKER_PORT` | bebuoc-n8n | 5679 | - |
| `N8N_NATIVE_PYTHON_RUNNER` | bebuoc-n8n | true | - |
| `QUEUE_BULL_REDIS_PASSWORD` | bebuoc-n8n | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | bebuoc-n8n | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | bebuoc-n8n | true | - |
| `N8N_RESTRICT_FILE_ACCESS_TO` | bebuoc-n8n | "" | - |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | bebuoc-n8n | :: | - |
| `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES` | bebuoc-n8n | false | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | bebuoc | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `JS_PACKAGES` | bebuoc-n8n-runner | moment@2.30.1,axios@^1.7.0,lodash@^4.17.21 | - |
| `N8N_VERSION` | bebuoc-n8n-runner | latest | - |
| `PY_PACKAGES` | bebuoc-n8n-runner | requests==2.31.0,numpy,pillow,ffmpeg-python | - |
| `JS_ALLOW_LIST` | bebuoc-n8n-runner | moment,axios,lodash | - |
| `PY_ALLOW_LIST` | bebuoc-n8n-runner | * | - |
| `PY_STDLIB_ALLOW` | bebuoc-n8n-runner | * | - |
| `N8N_RUNNERS_AUTH_TOKEN` | bebuoc-n8n-runner | (secret) | - |
| `N8N_RUNNERS_TASK_TIMEOUT` | bebuoc-n8n-runner | 300 | - |
| `N8N_RESTRICT_FILE_ACCESS_TO` | bebuoc-n8n-runner | "" | - |
| `N8N_RUNNERS_MAX_CONCURRENCY` | bebuoc-n8n-runner | 5 | - |
| `NODE_FUNCTION_ALLOW_BUILTIN` | bebuoc-n8n-runner | * | - |
| `N8N_RUNNERS_LAUNCHER_LOG_LEVEL` | bebuoc-n8n-runner | info | - |
| `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES` | bebuoc-n8n-runner | false | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/bebuoc-n8n-unlock-full)
