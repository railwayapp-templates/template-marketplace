# Deploy mystock-cralwer-project on Railway

An intelligent Product Crawler for MyStock

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mystock-cralwer-pr-1)

## About

mystock-cralwer-project is a Laravel 12 + Filament v4 web dashboard that schedules and tracks competitor product-price scrapes. It manages products, competitors, brand strategies, scrape jobs and result logs through an admin UI, with queued workers and a per-minute scheduler for automated crawling.

Hosting mystock-cralwer-project means running three coordinated services from one codebase: a web container serving the Laravel/Filament app via PHP-FPM and Nginx, a worker container executing php artisan queue:work for scrape jobs, and a cron container looping schedule:run every minute. You also need a persistent database (MySQL or PostgreSQL) for the app's tables, sessions, cache and queue, plus env vars for APP_KEY, APP_URL, and DB credentials. Frontend assets are bundled with Vite during deploy and storage/config are cached for performance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| price_crawler Beat | [jawadashraf/price_crawler](https://github.com/jawadashraf/price_crawler) | Worker |
| price_crawler | [jawadashraf/price_crawler](https://github.com/jawadashraf/price_crawler) | Worker |
| laravel worker | [jawadashraf/crawler_dashboard](https://github.com/jawadashraf/crawler_dashboard) | Worker |
| Redis | `redis:8.2.1` | Database |
| crawler_dashboard | [jawadashraf/crawler_dashboard](https://github.com/jawadashraf/crawler_dashboard) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| crawler_api | [jawadashraf/price_crawler](https://github.com/jawadashraf/price_crawler) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | price_crawler Beat | - | REDIS_URL |
| `USE_PROXY` | price_crawler Beat | - | USE_PROXY |
| `PROXY_URLS` | price_crawler Beat | - | PROXY_URLS |
| `BROKER_TYPE` | price_crawler Beat | - | BROKER_TYPE |
| `DATABASE_URL` | price_crawler Beat | - | DATABASE_URL |
| `SERVICE_TYPE` | price_crawler Beat | - | SERVICE_TYPE |
| `LARAVEL_API_URL` | price_crawler Beat | - | LARAVEL_API_URL |
| `MAX_REQUEST_DELAY` | price_crawler Beat | - | MAX_REQUEST_DELAY |
| `MIN_REQUEST_DELAY` | price_crawler Beat | - | MIN_REQUEST_DELAY |
| `CELERY_CONCURRENCY` | price_crawler Beat | - | CELERY_CONCURRENCY |
| `SCRAPE_TASK_TIMEOUT` | price_crawler Beat | - | SCRAPE_TASK_TIMEOUT |
| `CONFIDENCE_THRESHOLD` | price_crawler Beat | - | CONFIDENCE_THRESHOLD |
| `ENABLE_GOOGLE_FALLBACK` | price_crawler Beat | - | ENABLE_GOOGLE_FALLBACK |
| `LARAVEL_WEBHOOK_SECRET` | price_crawler Beat | (secret) | LARAVEL_WEBHOOK_SECRET |
| `MAX_MATCHES_PER_PRODUCT` | price_crawler Beat | - | MAX_MATCHES_PER_PRODUCT |
| `MAX_REQUESTS_PER_PRODUCT` | price_crawler Beat | - | MAX_REQUESTS_PER_PRODUCT |
| `SCRAPE_TASK_SOFT_TIMEOUT` | price_crawler Beat | - | SCRAPE_TASK_SOFT_TIMEOUT |
| `REDIS_URL` | price_crawler | - | REDIS_URL |
| `USE_PROXY` | price_crawler | - | USE_PROXY |
| `PROXY_URLS` | price_crawler | - | PROXY_URLS |
| `BROKER_TYPE` | price_crawler | - | BROKER_TYPE |
| `DATABASE_URL` | price_crawler | - | DATABASE_URL |
| `SERVICE_TYPE` | price_crawler | - | SERVICE_TYPE |
| `LARAVEL_API_URL` | price_crawler | - | LARAVEL_API_URL |
| `MAX_REQUEST_DELAY` | price_crawler | - | MAX_REQUEST_DELAY |
| `MIN_REQUEST_DELAY` | price_crawler | - | MIN_REQUEST_DELAY |
| `CELERY_CONCURRENCY` | price_crawler | - | CELERY_CONCURRENCY |
| `SCRAPE_TASK_TIMEOUT` | price_crawler | - | SCRAPE_TASK_TIMEOUT |
| `CONFIDENCE_THRESHOLD` | price_crawler | - | CONFIDENCE_THRESHOLD |
| `ENABLE_GOOGLE_FALLBACK` | price_crawler | - | ENABLE_GOOGLE_FALLBACK |
| `LARAVEL_WEBHOOK_SECRET` | price_crawler | (secret) | LARAVEL_WEBHOOK_SECRET |
| `MAX_MATCHES_PER_PRODUCT` | price_crawler | - | MAX_MATCHES_PER_PRODUCT |
| `MAX_REQUESTS_PER_PRODUCT` | price_crawler | - | MAX_REQUESTS_PER_PRODUCT |
| `SCRAPE_TASK_SOFT_TIMEOUT` | price_crawler | - | SCRAPE_TASK_SOFT_TIMEOUT |
| `MATCHING_BRAND_PREFIX_STRIP_ENABLED` | price_crawler | - | MATCHING_BRAND_PREFIX_STRIP_ENABLED |
| `APP_ENV` | laravel worker | - | APP_ENV |
| `APP_KEY` | laravel worker | - | APP_KEY |
| `APP_URL` | laravel worker | - | APP_URL |
| `DB_HOST` | laravel worker | - | DB_HOST |
| `DB_PORT` | laravel worker | - | DB_PORT |
| `APP_NAME` | laravel worker | - | APP_NAME |
| `APP_DEBUG` | laravel worker | - | APP_DEBUG |
| `LOG_LEVEL` | laravel worker | - | LOG_LEVEL |
| `LOG_STACK` | laravel worker | - | LOG_STACK |
| `MAIL_HOST` | laravel worker | - | MAIL_HOST |
| `MAIL_PORT` | laravel worker | - | MAIL_PORT |
| `APP_LOCALE` | laravel worker | - | APP_LOCALE |
| `AWS_BUCKET` | laravel worker | - | AWS_BUCKET |
| `REDIS_HOST` | laravel worker | - | REDIS_HOST |
| `REDIS_PORT` | laravel worker | - | REDIS_PORT |
| `CACHE_STORE` | laravel worker | - | CACHE_STORE |
| `DB_DATABASE` | laravel worker | - | DB_DATABASE |
| `DB_PASSWORD` | laravel worker | (secret) | DB_PASSWORD |
| `DB_USERNAME` | laravel worker | (secret) | DB_USERNAME |
| `LOG_CHANNEL` | laravel worker | - | LOG_CHANNEL |
| `MAIL_MAILER` | laravel worker | - | MAIL_MAILER |
| `MAIL_SCHEME` | laravel worker | - | MAIL_SCHEME |
| `DATABASE_URL` | laravel worker | - | DATABASE_URL |
| `REDIS_CLIENT` | laravel worker | - | REDIS_CLIENT |
| `SESSION_PATH` | laravel worker | - | SESSION_PATH |
| `BCRYPT_ROUNDS` | laravel worker | - | BCRYPT_ROUNDS |
| `COMPOSER_AUTH` | laravel worker | - | COMPOSER_AUTH |
| `DB_CONNECTION` | laravel worker | - | DB_CONNECTION |
| `MAIL_PASSWORD` | laravel worker | (secret) | MAIL_PASSWORD |
| `MAIL_USERNAME` | laravel worker | (secret) | MAIL_USERNAME |
| `VITE_APP_NAME` | laravel worker | - | VITE_APP_NAME |
| `MAIL_FROM_NAME` | laravel worker | - | MAIL_FROM_NAME |
| `MEMCACHED_HOST` | laravel worker | - | MEMCACHED_HOST |
| `REDIS_PASSWORD` | laravel worker | (secret) | REDIS_PASSWORD |
| `SESSION_DOMAIN` | laravel worker | - | SESSION_DOMAIN |
| `SESSION_DRIVER` | laravel worker | - | SESSION_DRIVER |
| `CRAWLER_API_URL` | laravel worker | - | CRAWLER_API_URL |
| `FILESYSTEM_DISK` | laravel worker | - | FILESYSTEM_DISK |
| `SESSION_ENCRYPT` | laravel worker | - | SESSION_ENCRYPT |
| `APP_FAKER_LOCALE` | laravel worker | - | APP_FAKER_LOCALE |
| `QUEUE_CONNECTION` | laravel worker | - | QUEUE_CONNECTION |
| `SESSION_LIFETIME` | laravel worker | - | SESSION_LIFETIME |
| `AWS_ACCESS_KEY_ID` | laravel worker | - | AWS_ACCESS_KEY_ID |
| `MAIL_FROM_ADDRESS` | laravel worker | - | MAIL_FROM_ADDRESS |
| `AWS_DEFAULT_REGION` | laravel worker | - | AWS_DEFAULT_REGION |
| `APP_FALLBACK_LOCALE` | laravel worker | - | APP_FALLBACK_LOCALE |
| `BROADCAST_CONNECTION` | laravel worker | - | BROADCAST_CONNECTION |
| `AWS_SECRET_ACCESS_KEY` | laravel worker | (secret) | AWS_SECRET_ACCESS_KEY |
| `APP_MAINTENANCE_DRIVER` | laravel worker | - | APP_MAINTENANCE_DRIVER |
| `LOG_DEPRECATIONS_CHANNEL` | laravel worker | - | LOG_DEPRECATIONS_CHANNEL |
| `AWS_USE_PATH_STYLE_ENDPOINT` | laravel worker | - | AWS_USE_PATH_STYLE_ENDPOINT |
| `REDISHOST` | Redis | - | REDISHOST |
| `REDISPORT` | Redis | - | REDISPORT |
| `REDISUSER` | Redis | - | REDISUSER |
| `REDIS_URL` | Redis | - | REDIS_URL |
| `REDISPASSWORD` | Redis | (secret) | REDISPASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | REDIS_PASSWORD |
| `REDIS_PUBLIC_URL` | Redis | - | REDIS_PUBLIC_URL |
| `APP_ENV` | crawler_dashboard | - | APP_ENV |
| `APP_KEY` | crawler_dashboard | - | APP_KEY |
| `APP_URL` | crawler_dashboard | - | APP_URL |
| `DB_HOST` | crawler_dashboard | - | DB_HOST |
| `DB_PORT` | crawler_dashboard | - | DB_PORT |
| `APP_NAME` | crawler_dashboard | - | APP_NAME |
| `APP_DEBUG` | crawler_dashboard | - | APP_DEBUG |
| `LOG_LEVEL` | crawler_dashboard | - | LOG_LEVEL |
| `LOG_STACK` | crawler_dashboard | - | LOG_STACK |
| `MAIL_HOST` | crawler_dashboard | - | MAIL_HOST |
| `MAIL_PORT` | crawler_dashboard | - | MAIL_PORT |
| `APP_LOCALE` | crawler_dashboard | - | APP_LOCALE |
| `AWS_BUCKET` | crawler_dashboard | - | AWS_BUCKET |
| `REDIS_HOST` | crawler_dashboard | - | REDIS_HOST |
| `REDIS_PORT` | crawler_dashboard | - | REDIS_PORT |
| `CACHE_STORE` | crawler_dashboard | - | CACHE_STORE |
| `DB_DATABASE` | crawler_dashboard | - | DB_DATABASE |
| `DB_PASSWORD` | crawler_dashboard | (secret) | DB_PASSWORD |
| `DB_USERNAME` | crawler_dashboard | (secret) | DB_USERNAME |
| `LOG_CHANNEL` | crawler_dashboard | - | LOG_CHANNEL |
| `MAIL_MAILER` | crawler_dashboard | - | MAIL_MAILER |
| `MAIL_SCHEME` | crawler_dashboard | - | MAIL_SCHEME |
| `DATABASE_URL` | crawler_dashboard | - | DATABASE_URL |
| `REDIS_CLIENT` | crawler_dashboard | - | REDIS_CLIENT |
| `SESSION_PATH` | crawler_dashboard | - | SESSION_PATH |
| `BCRYPT_ROUNDS` | crawler_dashboard | - | BCRYPT_ROUNDS |
| `COMPOSER_AUTH` | crawler_dashboard | - | COMPOSER_AUTH |
| `DB_CONNECTION` | crawler_dashboard | - | DB_CONNECTION |
| `MAIL_PASSWORD` | crawler_dashboard | (secret) | MAIL_PASSWORD |
| `MAIL_USERNAME` | crawler_dashboard | (secret) | MAIL_USERNAME |
| `VITE_APP_NAME` | crawler_dashboard | - | VITE_APP_NAME |
| `MAIL_FROM_NAME` | crawler_dashboard | - | MAIL_FROM_NAME |
| `MEMCACHED_HOST` | crawler_dashboard | - | MEMCACHED_HOST |
| `REDIS_PASSWORD` | crawler_dashboard | (secret) | REDIS_PASSWORD |
| `SESSION_DOMAIN` | crawler_dashboard | - | SESSION_DOMAIN |
| `SESSION_DRIVER` | crawler_dashboard | - | SESSION_DRIVER |
| `CRAWLER_API_URL` | crawler_dashboard | - | CRAWLER_API_URL |
| `FILESYSTEM_DISK` | crawler_dashboard | - | FILESYSTEM_DISK |
| `SESSION_ENCRYPT` | crawler_dashboard | - | SESSION_ENCRYPT |
| `APP_FAKER_LOCALE` | crawler_dashboard | - | APP_FAKER_LOCALE |
| `QUEUE_CONNECTION` | crawler_dashboard | - | QUEUE_CONNECTION |
| `SESSION_LIFETIME` | crawler_dashboard | - | SESSION_LIFETIME |
| `AWS_ACCESS_KEY_ID` | crawler_dashboard | - | AWS_ACCESS_KEY_ID |
| `MAIL_FROM_ADDRESS` | crawler_dashboard | - | MAIL_FROM_ADDRESS |
| `AWS_DEFAULT_REGION` | crawler_dashboard | - | AWS_DEFAULT_REGION |
| `APP_FALLBACK_LOCALE` | crawler_dashboard | - | APP_FALLBACK_LOCALE |
| `BROADCAST_CONNECTION` | crawler_dashboard | - | BROADCAST_CONNECTION |
| `AWS_SECRET_ACCESS_KEY` | crawler_dashboard | (secret) | AWS_SECRET_ACCESS_KEY |
| `APP_MAINTENANCE_DRIVER` | crawler_dashboard | - | APP_MAINTENANCE_DRIVER |
| `CRAWLER_WEBHOOK_SECRET` | crawler_dashboard | (secret) | CRAWLER_WEBHOOK_SECRET |
| `LOG_DEPRECATIONS_CHANNEL` | crawler_dashboard | - | LOG_DEPRECATIONS_CHANNEL |
| `AWS_USE_PATH_STYLE_ENDPOINT` | crawler_dashboard | - | AWS_USE_PATH_STYLE_ENDPOINT |
| `POSTGRES_DB` | Postgres | - | POSTGRES_DB |
| `DATABASE_URL` | Postgres | - | DATABASE_URL |
| `POSTGRES_USER` | Postgres | (secret) | POSTGRES_USER |
| `POSTGRES_PASSWORD` | Postgres | (secret) | POSTGRES_PASSWORD |
| `DATABASE_PUBLIC_URL` | Postgres | - | DATABASE_PUBLIC_URL |
| `REDIS_URL` | crawler_api | - | REDIS_URL |
| `USE_PROXY` | crawler_api | - | USE_PROXY |
| `PROXY_URLS` | crawler_api | - | PROXY_URLS |
| `BROKER_TYPE` | crawler_api | - | BROKER_TYPE |
| `DATABASE_URL` | crawler_api | - | DATABASE_URL |
| `SERVICE_TYPE` | crawler_api | - | SERVICE_TYPE |
| `MAX_REQUEST_DELAY` | crawler_api | - | MAX_REQUEST_DELAY |
| `MIN_REQUEST_DELAY` | crawler_api | - | MIN_REQUEST_DELAY |
| `CONFIDENCE_THRESHOLD` | crawler_api | - | CONFIDENCE_THRESHOLD |
| `ENABLE_GOOGLE_FALLBACK` | crawler_api | - | ENABLE_GOOGLE_FALLBACK |
| `MAX_MATCHES_PER_PRODUCT` | crawler_api | - | MAX_MATCHES_PER_PRODUCT |
| `MAX_REQUESTS_PER_PRODUCT` | crawler_api | - | MAX_REQUESTS_PER_PRODUCT |
| `MATCHING_BRAND_PREFIX_STRIP_ENABLED` | crawler_api | - | MATCHING_BRAND_PREFIX_STRIP_ENABLED |

## Configuration

- **Start command:** `chmod +x ./railway/run-worker.sh && sh ./railway/run-worker.sh`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** HTML, Python, Dockerfile, Shell, Mako, PHP, Blade, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/mystock-cralwer-pr-1)
