# Deploy Relaticle agent-native CRM on Railway

Relaticle agent-native CRM with PostgreSQL, Redis, and durable storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/relaticle-agent-native-crm)

## About

Relaticle is an open-source, self-hosted CRM built for people and AI agents. This Railway template deploys the CRM, its Horizon queue workers and scheduler, PostgreSQL, Redis, and durable storage with generated internal secrets.

Relaticle provides companies, people, opportunities, tasks, notes, customizable fields, multi-team isolation, a REST API, and an MCP server for AI-agent access. The template exposes only Relaticle publicly; PostgreSQL and Redis stay on Railway's private network. An initial system administrator is created automatically from the email you provide and a generated password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Relaticle | `ghcr.io/relaticle/relaticle@sha256:ded723fe642a8cb9ea711d523747da05fe9d2f42099150704ed1f5845a2020c9` | Web service |
| Relaticle Redis | `redis@sha256:e7723ff73d963f5cc6d9c4643ea3d989527a402a319239054e9472a7fb9219a2` | Database |
| Relaticle PostgreSQL | `postgres@sha256:742f40ea20b9ff2ff31db5458d127452988a2164df9e17441e191f3b72252193` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | Relaticle | production | - |
| `DB_PORT` | Relaticle | 5432 | - |
| `APP_NAME` | Relaticle | Relaticle | - |
| `APP_DEBUG` | Relaticle | false | - |
| `LOG_LEVEL` | Relaticle | warning | - |
| `MAIL_HOST` | Relaticle | - | Optional transactional SMTP hostname. |
| `MAIL_PORT` | Relaticle | 587 | - |
| `REDIS_PORT` | Relaticle | 6379 | - |
| `CACHE_STORE` | Relaticle | redis | - |
| `DB_PASSWORD` | Relaticle | (secret) | - |
| `DB_USERNAME` | Relaticle | (secret) | - |
| `LOG_CHANNEL` | Relaticle | stderr | - |
| `MAIL_MAILER` | Relaticle | log | - |
| `APP_TIMEZONE` | Relaticle | UTC | - |
| `DB_CONNECTION` | Relaticle | pgsql | - |
| `MAIL_PASSWORD` | Relaticle | (secret) | Optional transactional SMTP password or API token. |
| `MAIL_USERNAME` | Relaticle | (secret) | Optional transactional SMTP username. |
| `MAIL_FROM_NAME` | Relaticle | Relaticle | - |
| `OPENAI_API_KEY` | Relaticle | (secret) | Optional OpenAI API key for Relaticle's AI chat. |
| `REDIS_PASSWORD` | Relaticle | (secret) | - |
| `SESSION_DRIVER` | Relaticle | redis | - |
| `AUTORUN_ENABLED` | Relaticle | true | - |
| `MAIL_ENCRYPTION` | Relaticle | tls | - |
| `LOG_OUTPUT_LEVEL` | Relaticle | warn | - |
| `QUEUE_CONNECTION` | Relaticle | redis | - |
| `ANTHROPIC_API_KEY` | Relaticle | (secret) | Optional Anthropic API key for Claude models in Relaticle's AI chat. |
| `MAIL_FROM_ADDRESS` | Relaticle | - | Sender address used after changing MAIL_MAILER from log to smtp. |
| `INITIAL_ADMIN_NAME` | Relaticle | Railway Admin | - |
| `INITIAL_ADMIN_EMAIL` | Relaticle | - | Email address for the initial instance-wide system administrator. |
| `INITIAL_ADMIN_PASSWORD` | Relaticle | (secret) | Generated password for the initial system administrator. Change it after first sign-in. |
| `AUTORUN_LARAVEL_MIGRATION` | Relaticle | true | - |
| `REQUIRE_EMAIL_VERIFICATION` | Relaticle | false | - |
| `AUTORUN_LARAVEL_MIGRATION_ISOLATION` | Relaticle | true | - |
| `REDIS_PASSWORD` | Relaticle Redis | (secret) | - |
| `POSTGRES_DB` | Relaticle PostgreSQL | relaticle | - |
| `POSTGRES_USER` | Relaticle PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | Relaticle PostgreSQL | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -euc 'php /var/www/html/artisan config:clear; until php /var/www/html/artisan migrate --force; do sleep 3; done; php /var/www/html/artisan storage:link || true; php /var/www/html/artisan config:cache; php /var/www/html/artisan route:cache; php /var/www/html/artisan view:cache; php /var/www/html/artisan event:cache; if ! php -r '\''$pdo = new PDO("pgsql:host=".getenv("DB_HOST").";port=".getenv("DB_PORT").";dbname=".getenv("DB_DATABASE"), getenv("DB_USERNAME"), getenv("DB_PASSWORD")); $query = $pdo->prepare("select 1 from system_administrators where email = ? limit 1"); $query->execute([getenv("INITIAL_ADMIN_EMAIL")]); exit($query->fetchColumn() ? 0 : 1);'\''; then php /var/www/html/artisan sysadmin:create --name="$INITIAL_ADMIN_NAME" --email="$INITIAL_ADMIN_EMAIL" --password="$INITIAL_ADMIN_PASSWORD" --no-interaction; fi; mkdir -p /tmp/relaticle-nginx; envsubst "\${NGINX_ERROR_LOG} \${LOG_OUTPUT_LEVEL} \${NGINX_SERVER_TOKENS} \${HEALTHCHECK_PATH} \${NGINX_ACCESS_LOG} \${NGINX_CLIENT_MAX_BODY_SIZE}" < /etc/nginx/nginx.conf.template | sed "s#/var/run/nginx.pid#/tmp/relaticle-nginx/nginx.pid#; s#/etc/nginx/conf.d/\\*.conf#/tmp/relaticle-nginx/default.conf#" > /tmp/relaticle-nginx/nginx.conf; envsubst "\${NGINX_HTTP_PORT} \${NGINX_WEBROOT} \${NGINX_FASTCGI_BUFFERS} \${NGINX_FASTCGI_BUFFER_SIZE} \${PHP_MAX_EXECUTION_TIME}" < /etc/nginx/site-opts.d/http.conf.template | sed "s#include        fastcgi_params;#include /etc/nginx/fastcgi_params;\\n        fastcgi_param HTTP_X_FORWARDED_PROTO \$http_x_forwarded_proto;\\n        fastcgi_param HTTPS \$http_x_forwarded_proto;#g" > /tmp/relaticle-nginx/http.conf; sed "s#/etc/nginx/site-opts.d/http.conf#/tmp/relaticle-nginx/http.conf#" /etc/nginx/sites-available/ssl-off > /tmp/relaticle-nginx/default.conf; php /var/www/html/artisan horizon & horizon_pid=$!; php /var/www/html/artisan schedule:work & scheduler_pid=$!; php-fpm --nodaemonize & fpm_pid=$!; nginx -c /tmp/relaticle-nginx/nginx.conf & nginx_pid=$!; stop() { kill -TERM "$horizon_pid" "$scheduler_pid" "$fpm_pid" "$nginx_pid" 2>/dev/null || true; wait || true; }; trap stop TERM INT EXIT; while kill -0 "$horizon_pid" 2>/dev/null && kill -0 "$scheduler_pid" 2>/dev/null && kill -0 "$fpm_pid" 2>/dev/null && kill -0 "$nginx_pid" 2>/dev/null; do sleep 5; done; exit 1'`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/app`
- **Start command:** `/bin/sh -euc 'exec redis-server --appendonly yes --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/relaticle-agent-native-crm)
