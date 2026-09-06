# Deploy relaticle | AI-powered CRM on Railway

The open source CRM built for people and AI-powered work.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/relaticle)

## About

Relaticle is an open-source CRM built for people and AI-powered work: contacts, companies, opportunities, tasks, notes, custom fields, and an AI chat assistant that can read and update your CRM. This template deploys the full stack in one click.

The template provisions six services:

- **relaticle** — the web app (nginx + php-fpm). Runs migrations and caches on boot, healthcheck on `/up`.
- **horizon** — Laravel Horizon queue worker (chat, mail, imports).
- **scheduler** — Laravel scheduler.
- **reverb** — Laravel Reverb websocket server for realtime chat, on its own public domain.
- **Postgres** and **Redis** with volumes.

All secrets (`APP_KEY`, Reverb credentials) are generated at deploy time and shared to the workers by reference, so every service sees the same values.

The app runs `ghcr.io/tab58/relaticle-railway`, a thin layer over the official image that (a) injects the Reverb client config at boot instead of at build time and (b) trusts Railway's edge proxies so generated URLs are https. Source: https://github.com/tab58/relaticle-railway. Workers and Reverb run the official image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-relaticle | `redis:8.2` | Database |
| relaticle | `ghcr.io/tab58/relaticle-railway:3.5.6` | Web service |
| reverb | `ghcr.io/relaticle/relaticle:3.5.6` | Web service |
| horizon | `ghcr.io/relaticle/relaticle:3.5.6` | Worker |
| scheduler | `ghcr.io/relaticle/relaticle:3.5.6` | Worker |
| pg-relaticle | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | redis-relaticle | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | redis-relaticle | 6379 | Port that Redis listens on |
| `REDISUSER` | redis-relaticle | default | Username for authenticating with Redis |
| `REDIS_URL` | redis-relaticle | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | redis-relaticle | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | redis-relaticle | (secret) | Randomly generated password for authenticating with Redis |
| `APP_ENV` | relaticle | production | Laravel environment. Keep as production. |
| `APP_KEY` | relaticle | - | Laravel encryption key (auto-generated, 32 bytes). |
| `APP_URL` | relaticle | - | Public URL of the app. Defaults to the Railway-provided domain. |
| `DB_HOST` | relaticle | - | Postgres host, from the pg-relaticle service. |
| `DB_PORT` | relaticle | - | Postgres port, from the pg-relaticle service. |
| `APP_NAME` | relaticle | Relaticle | Application name shown in the UI and emails. |
| `APP_DEBUG` | relaticle | false | Enable Laravel debug mode. Keep false in production. |
| `LOG_LEVEL` | relaticle | warning | Minimum log level. |
| `MAIL_HOST` | relaticle | - | SMTP host. Only needed if MAIL_MAILER=smtp. |
| `MAIL_PORT` | relaticle | 587 | SMTP port. |
| `REDIS_HOST` | relaticle | - | Redis host, from the redis-relaticle service. |
| `REDIS_PORT` | relaticle | - | Redis port, from the redis-relaticle service. |
| `CACHE_STORE` | relaticle | redis | Cache backend. |
| `DB_DATABASE` | relaticle | - | Postgres database name, from the pg-relaticle service. |
| `DB_PASSWORD` | relaticle | (secret) | Postgres password, from the pg-relaticle service. |
| `DB_USERNAME` | relaticle | (secret) | Postgres user, from the pg-relaticle service. |
| `LOG_CHANNEL` | relaticle | stderr | Laravel log channel. stderr sends logs to Railway. |
| `MAIL_MAILER` | relaticle | log | Mail transport. log writes emails to the log. Set to smtp and fill MAIL_HOST/USERNAME/PASSWORD to send real email. |
| `REVERB_HOST` | relaticle | - | Public host of the reverb service. |
| `REVERB_PORT` | relaticle | 443 | Reverb public port (Railway terminates TLS). |
| `APP_TIMEZONE` | relaticle | UTC | Application timezone. |
| `OLLAMA_MODEL` | relaticle | - | Tool-capable Ollama model tag, e.g. glm-5.3-flash or gpt-oss:120b. Adds it to the chat model picker. |
| `DB_CONNECTION` | relaticle | pgsql | Database driver. Postgres. |
| `MAIL_PASSWORD` | relaticle | (secret) | SMTP password. Only needed if MAIL_MAILER=smtp. |
| `MAIL_USERNAME` | relaticle | (secret) | SMTP username. Only needed if MAIL_MAILER=smtp. |
| `REVERB_APP_ID` | relaticle | - | Reverb app id (auto-generated). |
| `REVERB_SCHEME` | relaticle | https | Reverb public scheme. |
| `MAIL_FROM_NAME` | relaticle | Relaticle | From name for outgoing email. |
| `OLLAMA_API_KEY` | relaticle | (secret) | Ollama cloud API key (https://ollama.com/settings/keys). Leave empty to skip. |
| `OPENAI_API_KEY` | relaticle | (secret) | OpenAI API key for chat models. Optional. |
| `REDIS_PASSWORD` | relaticle | (secret) | Redis password, from the redis-relaticle service. |
| `REVERB_APP_KEY` | relaticle | - | Reverb public key (auto-generated). Injected into the JS bundle at boot. |
| `SESSION_DRIVER` | relaticle | redis | Session backend. |
| `AUTORUN_ENABLED` | relaticle | true | Run serversideup/php Laravel automations on boot. |
| `MAIL_ENCRYPTION` | relaticle | tls | SMTP encryption. |
| `OLLAMA_BASE_URL` | relaticle | https://ollama.com | Ollama endpoint. Default is Ollama cloud. |
| `APP_PANEL_DOMAIN` | relaticle | - | Optional separate domain for the admin panel. Leave empty to serve on APP_URL. |
| `GOOGLE_CLIENT_ID` | relaticle | - | Google OAuth client id for 'Continue with Google'. Optional. |
| `QUEUE_CONNECTION` | relaticle | redis | Queue backend used by Horizon. |
| `ANTHROPIC_API_KEY` | relaticle | (secret) | Anthropic API key for Claude models. Optional. |
| `MAIL_FROM_ADDRESS` | relaticle | hello@example.com | From address for outgoing email. |
| `REVERB_APP_SECRET` | relaticle | (secret) | Reverb secret (auto-generated). |
| `GOOGLE_REDIRECT_URI` | relaticle | - | Register this as the authorized redirect URI in Google Cloud. |
| `BROADCAST_CONNECTION` | relaticle | reverb | Realtime broadcasting driver. |
| `GOOGLE_CLIENT_SECRET` | relaticle | (secret) | Google OAuth client secret. Optional. |
| `AUTORUN_LARAVEL_MIGRATION` | relaticle | true | Run database migrations automatically on deploy. |
| `REQUIRE_EMAIL_VERIFICATION` | relaticle | false | Require email verification on signup. Needs MAIL_* configured when true. |
| `AUTORUN_LARAVEL_MIGRATION_ISOLATION` | relaticle | true | Use migrate --isolated so only one instance migrates. |
| `APP_ENV` | reverb | - | Laravel environment. Keep as production. Shared from the relaticle service. |
| `APP_KEY` | reverb | - | Laravel encryption key (auto-generated, 32 bytes). Shared from the relaticle service. |
| `APP_URL` | reverb | - | Public URL of the app. Defaults to the Railway-provided domain. Shared from the relaticle service. |
| `DB_HOST` | reverb | - | Postgres host, from the pg-relaticle service. Shared from the relaticle service. |
| `DB_PORT` | reverb | - | Postgres port, from the pg-relaticle service. Shared from the relaticle service. |
| `REDIS_HOST` | reverb | - | Redis host, from the redis-relaticle service. Shared from the relaticle service. |
| `REDIS_PORT` | reverb | - | Redis port, from the redis-relaticle service. Shared from the relaticle service. |
| `CACHE_STORE` | reverb | - | Cache backend. Shared from the relaticle service. |
| `DB_DATABASE` | reverb | - | Postgres database name, from the pg-relaticle service. Shared from the relaticle service. |
| `DB_PASSWORD` | reverb | (secret) | Postgres password, from the pg-relaticle service. Shared from the relaticle service. |
| `DB_USERNAME` | reverb | (secret) | Postgres user, from the pg-relaticle service. Shared from the relaticle service. |
| `LOG_CHANNEL` | reverb | - | Laravel log channel. stderr sends logs to Railway. Shared from the relaticle service. |
| `REVERB_HOST` | reverb | - | This service's public host. |
| `REVERB_PORT` | reverb | - | Reverb public port (Railway terminates TLS). Shared from the relaticle service. |
| `DB_CONNECTION` | reverb | - | Database driver. Postgres. Shared from the relaticle service. |
| `REVERB_APP_ID` | reverb | - | Reverb app id (auto-generated). Shared from the relaticle service. |
| `REVERB_SCHEME` | reverb | - | Reverb public scheme. Shared from the relaticle service. |
| `REDIS_PASSWORD` | reverb | (secret) | Redis password, from the redis-relaticle service. Shared from the relaticle service. |
| `REVERB_APP_KEY` | reverb | - | Reverb public key (auto-generated). Injected into the JS bundle at boot. Shared from the relaticle service. |
| `AUTORUN_ENABLED` | reverb | false | No migrations/caches on the websocket server. |
| `REVERB_APP_SECRET` | reverb | (secret) | Reverb secret (auto-generated). Shared from the relaticle service. |
| `APP_ENV` | horizon | - | Laravel environment. Keep as production. Shared from the relaticle service. |
| `APP_KEY` | horizon | - | Laravel encryption key (auto-generated, 32 bytes). Shared from the relaticle service. |
| `APP_URL` | horizon | - | Public URL of the app. Defaults to the Railway-provided domain. Shared from the relaticle service. |
| `DB_HOST` | horizon | - | Postgres host, from the pg-relaticle service. Shared from the relaticle service. |
| `DB_PORT` | horizon | - | Postgres port, from the pg-relaticle service. Shared from the relaticle service. |
| `APP_NAME` | horizon | - | Application name shown in the UI and emails. Shared from the relaticle service. |
| `APP_DEBUG` | horizon | - | Enable Laravel debug mode. Keep false in production. Shared from the relaticle service. |
| `LOG_LEVEL` | horizon | - | Minimum log level. Shared from the relaticle service. |
| `MAIL_HOST` | horizon | - | SMTP host. Only needed if MAIL_MAILER=smtp. Shared from the relaticle service. |
| `MAIL_PORT` | horizon | - | SMTP port. Shared from the relaticle service. |
| `REDIS_HOST` | horizon | - | Redis host, from the redis-relaticle service. Shared from the relaticle service. |
| `REDIS_PORT` | horizon | - | Redis port, from the redis-relaticle service. Shared from the relaticle service. |
| `CACHE_STORE` | horizon | - | Cache backend. Shared from the relaticle service. |
| `DB_DATABASE` | horizon | - | Postgres database name, from the pg-relaticle service. Shared from the relaticle service. |
| `DB_PASSWORD` | horizon | (secret) | Postgres password, from the pg-relaticle service. Shared from the relaticle service. |
| `DB_USERNAME` | horizon | (secret) | Postgres user, from the pg-relaticle service. Shared from the relaticle service. |
| `LOG_CHANNEL` | horizon | - | Laravel log channel. stderr sends logs to Railway. Shared from the relaticle service. |
| `MAIL_MAILER` | horizon | - | Mail transport. log writes emails to the log. Set to smtp and fill MAIL_HOST/USERNAME/PASSWORD to send real email. Shared from the relaticle service. |
| `REVERB_HOST` | horizon | - | Public host of the reverb service. Shared from the relaticle service. |
| `REVERB_PORT` | horizon | - | Reverb public port (Railway terminates TLS). Shared from the relaticle service. |
| `OLLAMA_MODEL` | horizon | - | Tool-capable Ollama model tag, e.g. glm-5.3-flash or gpt-oss:120b. Adds it to the chat model picker. Shared from the relaticle service. |
| `DB_CONNECTION` | horizon | - | Database driver. Postgres. Shared from the relaticle service. |
| `MAIL_PASSWORD` | horizon | (secret) | SMTP password. Only needed if MAIL_MAILER=smtp. Shared from the relaticle service. |
| `MAIL_USERNAME` | horizon | (secret) | SMTP username. Only needed if MAIL_MAILER=smtp. Shared from the relaticle service. |
| `REVERB_APP_ID` | horizon | - | Reverb app id (auto-generated). Shared from the relaticle service. |
| `REVERB_SCHEME` | horizon | - | Reverb public scheme. Shared from the relaticle service. |
| `MAIL_FROM_NAME` | horizon | - | From name for outgoing email. Shared from the relaticle service. |
| `OLLAMA_API_KEY` | horizon | (secret) | Ollama cloud API key (https://ollama.com/settings/keys). Leave empty to skip. Shared from the relaticle service. |
| `OPENAI_API_KEY` | horizon | (secret) | OpenAI API key for chat models. Optional. Shared from the relaticle service. |
| `REDIS_PASSWORD` | horizon | (secret) | Redis password, from the redis-relaticle service. Shared from the relaticle service. |
| `REVERB_APP_KEY` | horizon | - | Reverb public key (auto-generated). Injected into the JS bundle at boot. Shared from the relaticle service. |
| `AUTORUN_ENABLED` | horizon | false | No migrations/caches on workers. |
| `MAIL_ENCRYPTION` | horizon | - | SMTP encryption. Shared from the relaticle service. |
| `OLLAMA_BASE_URL` | horizon | - | Ollama endpoint. Default is Ollama cloud. Shared from the relaticle service. |
| `APP_PANEL_DOMAIN` | horizon | - | Optional separate domain for the admin panel. Leave empty to serve on APP_URL. Shared from the relaticle service. |
| `QUEUE_CONNECTION` | horizon | - | Queue backend used by Horizon. Shared from the relaticle service. |
| `ANTHROPIC_API_KEY` | horizon | (secret) | Anthropic API key for Claude models. Optional. Shared from the relaticle service. |
| `MAIL_FROM_ADDRESS` | horizon | - | From address for outgoing email. Shared from the relaticle service. |
| `REVERB_APP_SECRET` | horizon | (secret) | Reverb secret (auto-generated). Shared from the relaticle service. |
| `BROADCAST_CONNECTION` | horizon | - | Realtime broadcasting driver. Shared from the relaticle service. |
| `REQUIRE_EMAIL_VERIFICATION` | horizon | - | Require email verification on signup. Needs MAIL_* configured when true. Shared from the relaticle service. |
| `APP_ENV` | scheduler | - | Laravel environment. Keep as production. Shared from the relaticle service. |
| `APP_KEY` | scheduler | - | Laravel encryption key (auto-generated, 32 bytes). Shared from the relaticle service. |
| `APP_URL` | scheduler | - | Public URL of the app. Defaults to the Railway-provided domain. Shared from the relaticle service. |
| `DB_HOST` | scheduler | - | Postgres host, from the pg-relaticle service. Shared from the relaticle service. |
| `DB_PORT` | scheduler | - | Postgres port, from the pg-relaticle service. Shared from the relaticle service. |
| `APP_NAME` | scheduler | - | Application name shown in the UI and emails. Shared from the relaticle service. |
| `APP_DEBUG` | scheduler | - | Enable Laravel debug mode. Keep false in production. Shared from the relaticle service. |
| `LOG_LEVEL` | scheduler | - | Minimum log level. Shared from the relaticle service. |
| `MAIL_HOST` | scheduler | - | SMTP host. Only needed if MAIL_MAILER=smtp. Shared from the relaticle service. |
| `MAIL_PORT` | scheduler | - | SMTP port. Shared from the relaticle service. |
| `REDIS_HOST` | scheduler | - | Redis host, from the redis-relaticle service. Shared from the relaticle service. |
| `REDIS_PORT` | scheduler | - | Redis port, from the redis-relaticle service. Shared from the relaticle service. |
| `CACHE_STORE` | scheduler | - | Cache backend. Shared from the relaticle service. |
| `DB_DATABASE` | scheduler | - | Postgres database name, from the pg-relaticle service. Shared from the relaticle service. |
| `DB_PASSWORD` | scheduler | (secret) | Postgres password, from the pg-relaticle service. Shared from the relaticle service. |
| `DB_USERNAME` | scheduler | (secret) | Postgres user, from the pg-relaticle service. Shared from the relaticle service. |
| `LOG_CHANNEL` | scheduler | - | Laravel log channel. stderr sends logs to Railway. Shared from the relaticle service. |
| `MAIL_MAILER` | scheduler | - | Mail transport. log writes emails to the log. Set to smtp and fill MAIL_HOST/USERNAME/PASSWORD to send real email. Shared from the relaticle service. |
| `REVERB_HOST` | scheduler | - | Public host of the reverb service. Shared from the relaticle service. |
| `REVERB_PORT` | scheduler | - | Reverb public port (Railway terminates TLS). Shared from the relaticle service. |
| `OLLAMA_MODEL` | scheduler | - | Tool-capable Ollama model tag, e.g. glm-5.3-flash or gpt-oss:120b. Adds it to the chat model picker. Shared from the relaticle service. |
| `DB_CONNECTION` | scheduler | - | Database driver. Postgres. Shared from the relaticle service. |
| `MAIL_PASSWORD` | scheduler | (secret) | SMTP password. Only needed if MAIL_MAILER=smtp. Shared from the relaticle service. |
| `MAIL_USERNAME` | scheduler | (secret) | SMTP username. Only needed if MAIL_MAILER=smtp. Shared from the relaticle service. |
| `REVERB_APP_ID` | scheduler | - | Reverb app id (auto-generated). Shared from the relaticle service. |
| `REVERB_SCHEME` | scheduler | - | Reverb public scheme. Shared from the relaticle service. |
| `MAIL_FROM_NAME` | scheduler | - | From name for outgoing email. Shared from the relaticle service. |
| `OLLAMA_API_KEY` | scheduler | (secret) | Ollama cloud API key (https://ollama.com/settings/keys). Leave empty to skip. Shared from the relaticle service. |
| `OPENAI_API_KEY` | scheduler | (secret) | OpenAI API key for chat models. Optional. Shared from the relaticle service. |
| `REDIS_PASSWORD` | scheduler | (secret) | Redis password, from the redis-relaticle service. Shared from the relaticle service. |
| `REVERB_APP_KEY` | scheduler | - | Reverb public key (auto-generated). Injected into the JS bundle at boot. Shared from the relaticle service. |
| `AUTORUN_ENABLED` | scheduler | false | No migrations/caches on workers. |
| `MAIL_ENCRYPTION` | scheduler | - | SMTP encryption. Shared from the relaticle service. |
| `OLLAMA_BASE_URL` | scheduler | - | Ollama endpoint. Default is Ollama cloud. Shared from the relaticle service. |
| `APP_PANEL_DOMAIN` | scheduler | - | Optional separate domain for the admin panel. Leave empty to serve on APP_URL. Shared from the relaticle service. |
| `QUEUE_CONNECTION` | scheduler | - | Queue backend used by Horizon. Shared from the relaticle service. |
| `ANTHROPIC_API_KEY` | scheduler | (secret) | Anthropic API key for Claude models. Optional. Shared from the relaticle service. |
| `MAIL_FROM_ADDRESS` | scheduler | - | From address for outgoing email. Shared from the relaticle service. |
| `REVERB_APP_SECRET` | scheduler | (secret) | Reverb secret (auto-generated). Shared from the relaticle service. |
| `BROADCAST_CONNECTION` | scheduler | - | Realtime broadcasting driver. Shared from the relaticle service. |
| `REQUIRE_EMAIL_VERIFICATION` | scheduler | - | Require email verification on signup. Needs MAIL_* configured when true. Shared from the relaticle service. |
| `POSTGRES_DB` | pg-relaticle | railway | Default database created when image is started. |
| `DATABASE_URL` | pg-relaticle | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | pg-relaticle | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | pg-relaticle | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/app`
- **Start command:** `php /var/www/html/artisan reverb:start`
- **Start command:** `php /var/www/html/artisan horizon`
- **Start command:** `php /var/www/html/artisan schedule:work`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/relaticle)
