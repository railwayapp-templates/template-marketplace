# Deploy Appwrite | Open Source Firebase Alternative on Railway

Self Host Appwrite: auth, DB, storage, realtime, functions & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appwrite)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appwrite?utm_medium=integration&utm_source=template&utm_campaign=generic)

Self-host Appwrite on Railway for a complete open-source Backend-as-a-Service with authentication, databases, file storage, serverless functions, and real-time WebSocket subscriptions — no vendor lock-in, no per-API-call fees.

This Railway template pre-configures Appwrite 1.9.0 with MariaDB, a Railway-managed Redis, three Swoole workers, the Appwrite Console, and an Nginx reverse proxy that unifies the API, Console, and WebSocket under a single public domain.

![Appwrite Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776609067/appwrite_railway_arch_rdx9sd.png)

Appwrite is an open-source BaaS (55,000+ GitHub stars, BSD 3-Clause) that replaces Firebase, Supabase, or custom backend stacks.

- **Auth** — email, phone, magic URLs, 30+ OAuth2 providers
- **Databases** — document collections with schemas, indexes, queries
- **Storage** — uploads with transforms, compression, encryption
- **Functions** — serverless execution across 30+ runtimes
- **Messaging** — email, SMS, push via provider integrations
- **Realtime** — WebSocket subscriptions for live events

The template runs the same `appwrite/appwrite:1.9.0` image as API, Realtime, and workers with different start commands — matching Appwrite's docker-compose architecture.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:10.11` | Database |
| Worker-Deletions | `appwrite/appwrite:1.9.0` | Worker |
| Appwrite-Console | `appwrite/console:7.8.26` | Worker |
| Worker-Databases | `appwrite/appwrite:1.9.0` | Worker |
| Nginx | `nginx:alpine` | Web service |
| Appwrite | `appwrite/appwrite:1.9.0` | Database |
| Redis-zZ2r | `redis:8.2.1` | Database |
| Appwrite-Realtime | `appwrite/appwrite:1.9.0` | Worker |
| Worker-Mails | `appwrite/appwrite:1.9.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_USER` | MariaDB | (secret) | Database user for Appwrite |
| `MYSQL_DATABASE` | MariaDB | appwrite | Default database name |
| `MYSQL_PASSWORD` | MariaDB | (secret) | Appwrite user password |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) | MariaDB root password |
| `_APP_ENV` | Worker-Deletions | production | Appwrite runtime environment |
| `_APP_DOMAIN` | Worker-Deletions | - | Public domain |
| `_APP_CPU_NUM` | Worker-Deletions | 1 | Swoole CPU override |
| `_APP_DB_HOST` | Worker-Deletions | - | MariaDB internal hostname |
| `_APP_DB_PASS` | Worker-Deletions | - | MariaDB user password |
| `_APP_DB_PORT` | Worker-Deletions | 3306 | MariaDB port |
| `_APP_DB_USER` | Worker-Deletions | (secret) | MariaDB user |
| `_APP_WORKERS` | Worker-Deletions | 4 | Legacy worker count |
| `_APP_DB_SCHEMA` | Worker-Deletions | appwrite | Appwrite database name |
| `_APP_DB_ADAPTER` | Worker-Deletions | mariadb | Database adapter |
| `_APP_REDIS_HOST` | Worker-Deletions | - | Redis internal hostname |
| `_APP_REDIS_PASS` | Worker-Deletions | - | Redis password |
| `_APP_REDIS_PORT` | Worker-Deletions | 6379 | Redis port |
| `_APP_REDIS_USER` | Worker-Deletions | (secret) | Redis username |
| `_APP_USAGE_STATS` | Worker-Deletions | enabled | Usage stats toggle |
| `_APP_DB_ROOT_PASS` | Worker-Deletions | - | MariaDB root password |
| `_APP_STORAGE_LIMIT` | Worker-Deletions | 30000000 | Upload size limit |
| `_APP_OPENSSL_KEY_V1` | Worker-Deletions | - | Shared encryption key |
| `_APP_DOMAIN_TARGET_A` | Worker-Deletions | unset | Disables custom domain A record feature |
| `_APP_EXECUTOR_SECRET` | Worker-Deletions | (secret) | Executor secret |
| `_APP_WORKER_PER_CORE` | Worker-Deletions | 4 | Swoole workers per CPU |
| `_APP_DOMAIN_TARGET_AAAA` | Worker-Deletions | unset | Disables custom domain AAAA record feature |
| `_APP_DOMAIN_TARGET_CNAME` | Worker-Deletions | cname.invalid | Disables custom domain CNAME feature |
| `_APP_OPTIONS_ROUTER_PROTECTION` | Worker-Deletions | disabled | Router protection off |
| `_APP_ENV` | Worker-Databases | production | Appwrite runtime environment |
| `_APP_DOMAIN` | Worker-Databases | - | Public domain |
| `_APP_CPU_NUM` | Worker-Databases | 1 | Swoole CPU override |
| `_APP_DB_HOST` | Worker-Databases | - | MariaDB internal hostname |
| `_APP_DB_PASS` | Worker-Databases | - | MariaDB user password |
| `_APP_DB_PORT` | Worker-Databases | 3306 | MariaDB port |
| `_APP_DB_USER` | Worker-Databases | (secret) | MariaDB user |
| `_APP_WORKERS` | Worker-Databases | 4 | Legacy worker count |
| `_APP_DB_SCHEMA` | Worker-Databases | appwrite | Appwrite database name |
| `_APP_DB_ADAPTER` | Worker-Databases | mariadb | Database adapter |
| `_APP_REDIS_HOST` | Worker-Databases | - | Redis internal hostname |
| `_APP_REDIS_PASS` | Worker-Databases | - | Redis password |
| `_APP_REDIS_PORT` | Worker-Databases | 6379 | Redis port |
| `_APP_REDIS_USER` | Worker-Databases | (secret) | Redis username |
| `_APP_USAGE_STATS` | Worker-Databases | enabled | Usage stats toggle |
| `_APP_DB_ROOT_PASS` | Worker-Databases | - | MariaDB root password |
| `_APP_STORAGE_LIMIT` | Worker-Databases | 30000000 | Upload size limit |
| `_APP_OPENSSL_KEY_V1` | Worker-Databases | - | Shared encryption key |
| `_APP_DOMAIN_TARGET_A` | Worker-Databases | unset | Disables custom domain A record feature |
| `_APP_EXECUTOR_SECRET` | Worker-Databases | (secret) | Executor secret |
| `_APP_WORKER_PER_CORE` | Worker-Databases | 4 | Swoole workers per CPU |
| `_APP_DOMAIN_TARGET_AAAA` | Worker-Databases | unset | Disables custom domain AAAA record feature |
| `_APP_DOMAIN_TARGET_CNAME` | Worker-Databases | cname.invalid | Disables custom domain CNAME feature |
| `_APP_OPTIONS_ROUTER_PROTECTION` | Worker-Databases | disabled | Router protection off |
| `PORT` | Nginx | 80 | Nginx listening port |
| `NGINX_CONF_B64` | Nginx | c2VydmVyIHsKICAgIGxpc3RlbiA4MDsKICAgIHNlcnZlcl9uYW1lIF87CgogICAgY2xpZW50X21heF9ib2R5X3NpemUgMzBNOwoKICAgIHJlc29sdmVyIF9fUkVTT0xWRVJfXyB2YWxpZD0xMHMgaXB2Nj1vZmY7CgogICAgc2V0ICRhcHB3cml0ZV9hcGkgQXBwd3JpdGUucmFpbHdheS5pbnRlcm5hbDo4MDsKICAgIHNldCAkYXBwd3JpdGVfY29uc29sZSBBcHB3cml0ZS1Db25zb2xlLnJhaWx3YXkuaW50ZXJuYWw6ODA7CiAgICBzZXQgJGFwcHdyaXRlX3JlYWx0aW1lIEFwcHdyaXRlLVJlYWx0aW1lLnJhaWx3YXkuaW50ZXJuYWw6ODA7CgogICAgbG9jYXRpb24gL3YxL3JlYWx0aW1lIHsKICAgICAgICBwcm94eV9wYXNzIGh0dHA6Ly8kYXBwd3JpdGVfcmVhbHRpbWU7CiAgICAgICAgcHJveHlfaHR0cF92ZXJzaW9uIDEuMTsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFVwZ3JhZGUgJGh0dHBfdXBncmFkZTsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIENvbm5lY3Rpb24gInVwZ3JhZGUiOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgSG9zdCAkaG9zdDsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtUmVhbC1JUCAkcmVtb3RlX2FkZHI7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Gb3IgJHByb3h5X2FkZF94X2ZvcndhcmRlZF9mb3I7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Qcm90byBodHRwczsKICAgICAgICBwcm94eV9yZWFkX3RpbWVvdXQgMzYwMHM7CiAgICAgICAgcHJveHlfc2VuZF90aW1lb3V0IDM2MDBzOwogICAgfQoKICAgIGxvY2F0aW9uIC92MSB7CiAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vJGFwcHdyaXRlX2FwaTsKICAgICAgICBwcm94eV9odHRwX3ZlcnNpb24gMS4xOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgSG9zdCAkaG9zdDsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtUmVhbC1JUCAkcmVtb3RlX2FkZHI7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Gb3IgJHByb3h5X2FkZF94X2ZvcndhcmRlZF9mb3I7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Qcm90byBodHRwczsKICAgICAgICBwcm94eV9yZWFkX3RpbWVvdXQgMzAwczsKICAgIH0KCiAgICBsb2NhdGlvbiAvIHsKICAgICAgICBwcm94eV9wYXNzIGh0dHA6Ly8kYXBwd3JpdGVfY29uc29sZTsKICAgICAgICBwcm94eV9odHRwX3ZlcnNpb24gMS4xOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgSG9zdCAkaG9zdDsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtUmVhbC1JUCAkcmVtb3RlX2FkZHI7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Gb3IgJHByb3h5X2FkZF94X2ZvcndhcmRlZF9mb3I7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Qcm90byBodHRwczsKICAgIH0KfQo= | Base64-encoded Nginx reverse proxy config |
| `PORT` | Appwrite | 80 | HTTP server listening port |
| `_APP_ENV` | Appwrite | production | Appwrite runtime environment |
| `_APP_DOMAIN` | Appwrite | - | Public-facing domain |
| `_APP_LOCALE` | Appwrite | en | Default locale |
| `_APP_CPU_NUM` | Appwrite | 1 | Swoole CPU count override |
| `_APP_DB_HOST` | Appwrite | - | MariaDB internal hostname |
| `_APP_DB_PASS` | Appwrite | - | MariaDB user password |
| `_APP_DB_PORT` | Appwrite | 3306 | MariaDB port |
| `_APP_DB_USER` | Appwrite | (secret) | MariaDB user |
| `_APP_WORKERS` | Appwrite | 4 | Legacy worker count |
| `_APP_DB_SCHEMA` | Appwrite | appwrite | Appwrite database name |
| `_APP_DB_ADAPTER` | Appwrite | mariadb | Must be mariadb (default is mongodb) |
| `_APP_REDIS_HOST` | Appwrite | - | Redis internal hostname |
| `_APP_REDIS_PASS` | Appwrite | - | Redis password |
| `_APP_REDIS_PORT` | Appwrite | 6379 | Redis port |
| `_APP_REDIS_USER` | Appwrite | (secret) | Redis username |
| `_APP_USAGE_STATS` | Appwrite | enabled | Collect anonymous usage stats |
| `_APP_DB_ROOT_PASS` | Appwrite | - | MariaDB root password |
| `_APP_DOMAIN_TARGET` | Appwrite | - | Domain target for SSL |
| `_APP_OPTIONS_ABUSE` | Appwrite | enabled | Rate-limiting and abuse protection |
| `_APP_STORAGE_LIMIT` | Appwrite | 30000000 | Max upload size in bytes (30MB) |
| `_APP_OPENSSL_KEY_V1` | Appwrite | - | Server-side data encryption key |
| `_APP_CONNECTIONS_MAX` | Appwrite | 100 | Max concurrent DB/Redis connections |
| `_APP_DOMAIN_TARGET_A` | Appwrite | unset | Disables custom domain A record feature |
| `_APP_EXECUTOR_SECRET` | Appwrite | (secret) | Functions executor shared secret |
| `_APP_WORKER_PER_CORE` | Appwrite | 4 | Swoole workers per CPU |
| `_APP_FUNCTIONS_TIMEOUT` | Appwrite | 900 | Function max execution seconds |
| `_APP_STORAGE_ANTIVIRUS` | Appwrite | disabled | ClamAV antivirus (not deployed) |
| `_APP_DOMAIN_TARGET_AAAA` | Appwrite | unset | Disables custom domain AAAA record feature |
| `_APP_DOMAIN_TARGET_CNAME` | Appwrite | cname.invalid | Disables custom domain CNAME feature |
| `_APP_OPTIONS_FORCE_HTTPS` | Appwrite | disabled | Railway terminates TLS externally |
| `_APP_STORAGE_PREVIEW_LIMIT` | Appwrite | 20000000 | Image preview max size (20MB) |
| `_APP_CONSOLE_WHITELIST_ROOT` | Appwrite | enabled | Lock signups after first admin |
| `_APP_OPTIONS_ROUTER_PROTECTION` | Appwrite | disabled | Required when using reverse proxy |
| `REDISHOST` | Redis-zZ2r | - | Internal Redis service hostname |
| `REDISPORT` | Redis-zZ2r | 6379 | Redis server listening port |
| `REDISUSER` | Redis-zZ2r | default | Redis default authentication user |
| `REDIS_URL` | Redis-zZ2r | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis-zZ2r | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis-zZ2r | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis-zZ2r | - | Public Redis connection URL |
| `PORT` | Appwrite-Realtime | 80 | Swoole WebSocket listening port |
| `_APP_ENV` | Appwrite-Realtime | production | Appwrite runtime environment |
| `_APP_DOMAIN` | Appwrite-Realtime | - | Public-facing domain |
| `_APP_CPU_NUM` | Appwrite-Realtime | 1 | Swoole CPU override (fixes thread limit) |
| `_APP_DB_HOST` | Appwrite-Realtime | - | MariaDB internal hostname |
| `_APP_DB_PASS` | Appwrite-Realtime | - | MariaDB user password |
| `_APP_DB_PORT` | Appwrite-Realtime | 3306 | MariaDB port |
| `_APP_DB_USER` | Appwrite-Realtime | (secret) | MariaDB user |
| `_APP_WORKERS` | Appwrite-Realtime | 4 | Legacy worker count |
| `_APP_DB_SCHEMA` | Appwrite-Realtime | appwrite | Appwrite database name |
| `_APP_DB_ADAPTER` | Appwrite-Realtime | mariadb | Database adapter |
| `_APP_REDIS_HOST` | Appwrite-Realtime | - | Redis internal hostname |
| `_APP_REDIS_PASS` | Appwrite-Realtime | - | Redis password |
| `_APP_REDIS_PORT` | Appwrite-Realtime | 6379 | Redis port |
| `_APP_REDIS_USER` | Appwrite-Realtime | (secret) | Redis username |
| `_APP_USAGE_STATS` | Appwrite-Realtime | enabled | Usage stats toggle |
| `_APP_DB_ROOT_PASS` | Appwrite-Realtime | - | MariaDB root password |
| `_APP_STORAGE_LIMIT` | Appwrite-Realtime | 30000000 | Upload size limit |
| `_APP_OPENSSL_KEY_V1` | Appwrite-Realtime | - | Shared encryption key |
| `_APP_CONNECTIONS_MAX` | Appwrite-Realtime | 100 | Max concurrent connections |
| `_APP_DOMAIN_TARGET_A` | Appwrite-Realtime | unset | Disables custom domain A record feature |
| `_APP_EXECUTOR_SECRET` | Appwrite-Realtime | (secret) | Executor shared secret |
| `_APP_WORKER_PER_CORE` | Appwrite-Realtime | 4 | Swoole workers per CPU (caps thread usage) |
| `_APP_DOMAIN_TARGET_AAAA` | Appwrite-Realtime | unset | Disables custom domain AAAA record feature |
| `_APP_DOMAIN_TARGET_CNAME` | Appwrite-Realtime | cname.invalid | Disables custom domain CNAME feature |
| `_APP_OPTIONS_ROUTER_PROTECTION` | Appwrite-Realtime | disabled | Required for reverse proxy |
| `OPEN_RUNTIMES_EXECUTOR_SWOOLE_WORKER_NUM` | Appwrite-Realtime | 2 | Swoole executor workers |
| `_APP_ENV` | Worker-Mails | production | Appwrite runtime environment |
| `_APP_DOMAIN` | Worker-Mails | - | Public domain |
| `_APP_CPU_NUM` | Worker-Mails | 1 | Swoole CPU override |
| `_APP_DB_HOST` | Worker-Mails | - | MariaDB internal hostname |
| `_APP_DB_PASS` | Worker-Mails | - | MariaDB user password |
| `_APP_DB_PORT` | Worker-Mails | 3306 | MariaDB port |
| `_APP_DB_USER` | Worker-Mails | (secret) | MariaDB user |
| `_APP_WORKERS` | Worker-Mails | 4 | Legacy worker count |
| `_APP_DB_SCHEMA` | Worker-Mails | appwrite | Appwrite database name |
| `_APP_DB_ADAPTER` | Worker-Mails | mariadb | Database adapter |
| `_APP_REDIS_HOST` | Worker-Mails | - | Redis internal hostname |
| `_APP_REDIS_PASS` | Worker-Mails | - | Redis password |
| `_APP_REDIS_PORT` | Worker-Mails | 6379 | Redis port |
| `_APP_REDIS_USER` | Worker-Mails | (secret) | Redis username |
| `_APP_USAGE_STATS` | Worker-Mails | enabled | Usage stats toggle |
| `_APP_DB_ROOT_PASS` | Worker-Mails | - | MariaDB root password |
| `_APP_STORAGE_LIMIT` | Worker-Mails | 30000000 | Upload size limit |
| `_APP_OPENSSL_KEY_V1` | Worker-Mails | - | Shared encryption key |
| `_APP_DOMAIN_TARGET_A` | Worker-Mails | unset | Disables custom domain A record feature |
| `_APP_EXECUTOR_SECRET` | Worker-Mails | (secret) | Executor secret |
| `_APP_WORKER_PER_CORE` | Worker-Mails | 4 | Swoole workers per CPU |
| `_APP_DOMAIN_TARGET_AAAA` | Worker-Mails | unset | Disables custom domain AAAA record feature |
| `_APP_DOMAIN_TARGET_CNAME` | Worker-Mails | cname.invalid | Disables custom domain CNAME feature |
| `_APP_OPTIONS_ROUTER_PROTECTION` | Worker-Mails | disabled | Router protection off |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `worker-deletes`
- **Start command:** `worker-databases`
- **Start command:** `/bin/sh -c 'echo "Starting custom config..." && echo "$NGINX_CONF_B64" | base64 -d > /etc/nginx/conf.d/appwrite.conf && : > /etc/nginx/conf.d/default.conf && RESOLVER=$(awk "/^nameserver/ {print \$2; exit}" /etc/resolv.conf) && case $RESOLVER in *:*) RESOLVER=[$RESOLVER] ;; esac && sed -i "s|__RESOLVER__|$RESOLVER|g" /etc/nginx/conf.d/appwrite.conf && echo "Config applied, starting nginx..." && exec nginx -g "daemon off;"'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/storage`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `realtime`
- **Start command:** `worker-mails`

**Category:** Other

[View on Railway →](https://railway.com/deploy/appwrite)
