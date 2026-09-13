# Deploy wger on Railway

Workout, nutrition and body weight tracker with a REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wger-fitness)

## About

Self-host wger to keep your training log, nutrition diary and body measurements on infrastructure you control. wger is an AGPL fitness manager for lifters tracking their progression, coaches running a small gym, and anyone who would rather not hand a year of body-weight data to an app that might shut down. It ships a workout planner with 800+ exercises, a nutrition diary backed by Open Food Facts, measurement charts, gym management, a REST API, and official Android and iOS apps.

Deploy wger on Railway and this template builds the production shape upstream documents, not a single container. The **wger** service is the only public one: Django under gunicorn, with Caddy in front serving static files and routing media. **celery-worker** runs the background jobs and **celery-beat** schedules them. **Postgres** holds every workout, meal and measurement, **Redis** is Django's cache and the Celery broker, and the **wger-media** bucket holds photos, exercise images and videos so the web and worker tiers share one store.

![Diagram of the wger, Celery and datastore services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789279327/wger-architecture.webp)

wger is a Django application developed in the open since 2012. It covers the whole loop a lifter or a small gym needs: plan a routine, log what you lifted and ate, weigh in, watch the numbers move. Self-hosting wins when the data matters more than the convenience — your history stays in a database you can dump.

Key features:

- Routine builder with progression rules, supersets, rest days and per-iteration sets
- 800+ exercises with muscle diagrams, images and videos from a public instance
- Nutrition diary with a barcode scanner and Open Food Facts lookup
- Body weight and custom measurements with trend lines
- Gym management: members, trainers, per-member configuration
- REST API with JWT auth, used by the official mobile apps

The Railway topology separates the tiers so one never blocks the other. Django serves requests; Celery does the long work — the catalogue sync alone pulls hundreds of images — so it never stalls a page load. Media goes to object storage rather than a disk, which is what lets the web and worker services write to the same place.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wger | [gridalpha/wger-railway](https://github.com/gridalpha/wger-railway) | Web service |
| celery-worker | [gridalpha/wger-railway](https://github.com/gridalpha/wger-railway) | Worker |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| celery-beat | [gridalpha/wger-railway](https://github.com/gridalpha/wger-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | wger | UTC | Container timezone |
| `PORT` | wger | 8080 | Port Caddy listens on |
| `SITE_URL` | wger | - | Public base URL |
| `TIME_ZONE` | wger | UTC | Application timezone |
| `WGER_ROLE` | wger | web | Selects the web role from the shared image |
| `FROM_EMAIL` | wger | wger <wger@example.com> | Sender address for outgoing mail |
| `SECRET_KEY` | wger | (secret) | Django signing key, must stay stable |
| `USE_CELERY` | wger | True | Enable background jobs |
| `AXES_ENABLED` | wger | True | Brute-force login protection |
| `AXES_HANDLER` | wger | axes.handlers.cache.AxesCacheHandler | Store attempts in Redis |
| `DJANGO_DEBUG` | wger | False | Production mode |
| `AWS_S3_DOMAIN` | wger | storageapi.dev | Required by settings, unused here |
| `CELERY_BROKER` | wger | - | Celery broker URL |
| `USE_RECAPTCHA` | wger | False | reCAPTCHA on registration |
| `WGER_INSTANCE` | wger | https://wger.de | Source instance for catalogue syncs |
| `CELERY_BACKEND` | wger | - | Celery result backend URL |
| `DJANGO_DB_HOST` | wger | - | Private database host |
| `DJANGO_DB_PORT` | wger | 5432 | Database port |
| `DJANGO_DB_USER` | wger | (secret) | Database user |
| `JWT_PUBLIC_KEY` | wger | - | Optional override, generated at first boot |
| `JWT_PRIVATE_KEY` | wger | - | Optional override, generated at first boot |
| `DJANGO_DB_ENGINE` | wger | django.db.backends.postgresql | Database backend |
| `LOG_LEVEL_PYTHON` | wger | INFO | Application log level |
| `WGER_ADMIN_EMAIL` | wger | - | Optional email for the admin account |
| `ALLOW_GUEST_USERS` | wger | False | Auto-create anonymous accounts |
| `AWS_ACCESS_KEY_ID` | wger | - | Bucket access key |
| `AXES_COOLOFF_TIME` | wger | 30 | Lockout duration in minutes |
| `GUNICORN_CMD_ARGS` | wger | --workers 3 --threads 2 --worker-class gthread --timeout 240 | Web worker sizing |
| `NUMBER_OF_PROXIES` | wger | 1 | Proxy hops in front of Django |
| `ALLOW_REGISTRATION` | wger | False | Public sign-up switch |
| `AWS_S3_REGION_NAME` | wger | - | Bucket region |
| `AXES_FAILURE_LIMIT` | wger | 10 | Failed logins before lockout |
| `DJANGO_DB_DATABASE` | wger | - | Database name |
| `DJANGO_DB_PASSWORD` | wger | (secret) | Database password |
| `EXERCISE_CACHE_TTL` | wger | 2419200 | Exercise cache TTL in seconds |
| `USE_S3_MEDIA_FILES` | wger | True | Store uploads in object storage |
| `ALLOW_UPLOAD_VIDEOS` | wger | True | Permit exercise video uploads |
| `AWS_S3_ENDPOINT_URL` | wger | - | Bucket S3 endpoint |
| `USE_S3_STATIC_FILES` | wger | False | Static files served from the image |
| `WGER_ADMIN_PASSWORD` | wger | (secret) | Password for the admin account |
| `AWS_S3_CUSTOM_DOMAIN` | wger | - | Media URLs route through the app |
| `CSRF_TRUSTED_ORIGINS` | wger | - | Django CSRF origin allow-list |
| `DJANGO_CACHE_BACKEND` | wger | django_redis.cache.RedisCache | Cache backend class |
| `DJANGO_CACHE_TIMEOUT` | wger | 1296000 | Cache TTL in seconds |
| `USE_S3_URL_FOR_MEDIA` | wger | True | Build media URLs from the custom domain |
| `AWS_SECRET_ACCESS_KEY` | wger | (secret) | Bucket secret key |
| `DJANGO_CACHE_LOCATION` | wger | - | Redis database for the cache |
| `SYNC_EXERCISES_CELERY` | wger | True | Weekly exercise catalogue sync |
| `AWS_STORAGE_BUCKET_NAME` | wger | - | Bucket name |
| `AXES_IPWARE_PROXY_COUNT` | wger | 1 | Proxy hops for client IP detection |
| `AXES_LOCKOUT_PARAMETERS` | wger | ip_address | Lock out by client IP |
| `S3_MEDIA_FILES_LOCATION` | wger | media | Key prefix for media objects |
| `SYNC_INGREDIENTS_CELERY` | wger | False | Bulk ingredient dump, needs a large database |
| `MIN_ACCOUNT_AGE_TO_TRUST` | wger | 21 | Days before a user may edit exercises |
| `CELERY_WORKER_CONCURRENCY` | wger | 4 | Greenlets per worker |
| `DJANGO_CACHE_CLIENT_CLASS` | wger | django_redis.client.DefaultClient | Redis client class |
| `DOWNLOAD_INGREDIENTS_FROM` | wger | WGER | On-demand ingredient lookups |
| `CACHE_API_EXERCISES_CELERY` | wger | True | Keep the exercise API cache warm |
| `SYNC_EXERCISE_IMAGES_CELERY` | wger | True | Weekly exercise image sync |
| `SYNC_EXERCISE_VIDEOS_CELERY` | wger | True | Weekly exercise video sync |
| `X_FORWARDED_PROTO_HEADER_SET` | wger | True | Trust the edge's forwarded scheme |
| `AXES_IPWARE_META_PRECEDENCE_ORDER` | wger | HTTP_X_FORWARDED_FOR,REMOTE_ADDR | Client IP header order |
| `CACHE_API_EXERCISES_CELERY_FORCE_UPDATE` | wger | True | Rebuild that cache each run |
| `TZ` | celery-worker | UTC | Container timezone |
| `PORT` | celery-worker | 8080 | Port the liveness probe listens on |
| `SITE_URL` | celery-worker | - | Public base URL |
| `TIME_ZONE` | celery-worker | UTC | Application timezone |
| `WGER_ROLE` | celery-worker | worker | Selects the Celery worker role |
| `FROM_EMAIL` | celery-worker | wger <wger@example.com> | Sender address for outgoing mail |
| `SECRET_KEY` | celery-worker | (secret) | Must match the web service |
| `USE_CELERY` | celery-worker | True | Enable background jobs |
| `AXES_ENABLED` | celery-worker | True | Brute-force login protection |
| `AXES_HANDLER` | celery-worker | axes.handlers.cache.AxesCacheHandler | Store attempts in Redis |
| `DJANGO_DEBUG` | celery-worker | False | Production mode |
| `AWS_S3_DOMAIN` | celery-worker | storageapi.dev | Required by settings, unused here |
| `CELERY_BROKER` | celery-worker | - | Celery broker URL |
| `USE_RECAPTCHA` | celery-worker | False | reCAPTCHA on registration |
| `WGER_INSTANCE` | celery-worker | https://wger.de | Source instance for catalogue syncs |
| `CELERY_BACKEND` | celery-worker | - | Celery result backend URL |
| `DJANGO_DB_HOST` | celery-worker | - | Private database host |
| `DJANGO_DB_PORT` | celery-worker | 5432 | Database port |
| `DJANGO_DB_USER` | celery-worker | (secret) | Database user |
| `JWT_PUBLIC_KEY` | celery-worker | - | Optional override, read from the database |
| `JWT_PRIVATE_KEY` | celery-worker | - | Optional override, read from the database |
| `DJANGO_DB_ENGINE` | celery-worker | django.db.backends.postgresql | Database backend |
| `LOG_LEVEL_PYTHON` | celery-worker | INFO | Application log level |
| `ALLOW_GUEST_USERS` | celery-worker | False | Auto-create anonymous accounts |
| `AWS_ACCESS_KEY_ID` | celery-worker | - | Bucket access key |
| `AXES_COOLOFF_TIME` | celery-worker | 30 | Lockout duration in minutes |
| `NUMBER_OF_PROXIES` | celery-worker | 1 | Proxy hops in front of Django |
| `ALLOW_REGISTRATION` | celery-worker | False | Public sign-up switch |
| `AWS_S3_REGION_NAME` | celery-worker | - | Bucket region |
| `AXES_FAILURE_LIMIT` | celery-worker | 10 | Failed logins before lockout |
| `DJANGO_DB_DATABASE` | celery-worker | - | Database name |
| `DJANGO_DB_PASSWORD` | celery-worker | (secret) | Database password |
| `EXERCISE_CACHE_TTL` | celery-worker | 2419200 | Exercise cache TTL in seconds |
| `USE_S3_MEDIA_FILES` | celery-worker | True | Store downloads in object storage |
| `ALLOW_UPLOAD_VIDEOS` | celery-worker | True | Permit exercise video uploads |
| `AWS_S3_ENDPOINT_URL` | celery-worker | - | Bucket S3 endpoint |
| `USE_S3_STATIC_FILES` | celery-worker | False | Static files served from the image |
| `WGER_ADMIN_PASSWORD` | celery-worker | (secret) | Must match the web service |
| `AWS_S3_CUSTOM_DOMAIN` | celery-worker | - | Media URLs route through the app |
| `DJANGO_CACHE_BACKEND` | celery-worker | django_redis.cache.RedisCache | Cache backend class |
| `DJANGO_CACHE_TIMEOUT` | celery-worker | 1296000 | Cache TTL in seconds |
| `USE_S3_URL_FOR_MEDIA` | celery-worker | True | Build media URLs from the custom domain |
| `AWS_SECRET_ACCESS_KEY` | celery-worker | (secret) | Bucket secret key |
| `DJANGO_CACHE_LOCATION` | celery-worker | - | Redis database for the cache |
| `SYNC_EXERCISES_CELERY` | celery-worker | True | Weekly exercise catalogue sync |
| `AWS_STORAGE_BUCKET_NAME` | celery-worker | - | Bucket name |
| `AXES_IPWARE_PROXY_COUNT` | celery-worker | 1 | Proxy hops for client IP detection |
| `AXES_LOCKOUT_PARAMETERS` | celery-worker | ip_address | Lock out by client IP |
| `S3_MEDIA_FILES_LOCATION` | celery-worker | media | Key prefix for media objects |
| `SYNC_INGREDIENTS_CELERY` | celery-worker | False | Bulk ingredient dump, needs a large database |
| `MIN_ACCOUNT_AGE_TO_TRUST` | celery-worker | 21 | Days before a user may edit exercises |
| `CELERY_WORKER_CONCURRENCY` | celery-worker | 4 | Greenlets per worker |
| `DJANGO_CACHE_CLIENT_CLASS` | celery-worker | django_redis.client.DefaultClient | Redis client class |
| `DOWNLOAD_INGREDIENTS_FROM` | celery-worker | WGER | On-demand ingredient lookups |
| `CACHE_API_EXERCISES_CELERY` | celery-worker | True | Keep the exercise API cache warm |
| `SYNC_EXERCISE_IMAGES_CELERY` | celery-worker | True | Weekly exercise image sync |
| `SYNC_EXERCISE_VIDEOS_CELERY` | celery-worker | True | Weekly exercise video sync |
| `X_FORWARDED_PROTO_HEADER_SET` | celery-worker | True | Trust the edge's forwarded scheme |
| `AXES_IPWARE_META_PRECEDENCE_ORDER` | celery-worker | HTTP_X_FORWARDED_FOR,REMOTE_ADDR | Client IP header order |
| `CACHE_API_EXERCISES_CELERY_FORCE_UPDATE` | celery-worker | True | Rebuild that cache each run |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `TZ` | celery-beat | UTC | Container timezone |
| `PORT` | celery-beat | 8080 | Port the liveness probe listens on |
| `SITE_URL` | celery-beat | - | Public base URL |
| `TIME_ZONE` | celery-beat | UTC | Application timezone |
| `WGER_ROLE` | celery-beat | beat | Selects the Celery scheduler role |
| `FROM_EMAIL` | celery-beat | wger <wger@example.com> | Sender address for outgoing mail |
| `SECRET_KEY` | celery-beat | (secret) | Must match the web service |
| `USE_CELERY` | celery-beat | True | Enable background jobs |
| `AXES_ENABLED` | celery-beat | True | Brute-force login protection |
| `AXES_HANDLER` | celery-beat | axes.handlers.cache.AxesCacheHandler | Store attempts in Redis |
| `DJANGO_DEBUG` | celery-beat | False | Production mode |
| `AWS_S3_DOMAIN` | celery-beat | storageapi.dev | Required by settings, unused here |
| `CELERY_BROKER` | celery-beat | - | Celery broker URL |
| `USE_RECAPTCHA` | celery-beat | False | reCAPTCHA on registration |
| `WGER_INSTANCE` | celery-beat | https://wger.de | Source instance for catalogue syncs |
| `CELERY_BACKEND` | celery-beat | - | Celery result backend URL |
| `DJANGO_DB_HOST` | celery-beat | - | Private database host |
| `DJANGO_DB_PORT` | celery-beat | 5432 | Database port |
| `DJANGO_DB_USER` | celery-beat | (secret) | Database user |
| `JWT_PUBLIC_KEY` | celery-beat | - | Optional override, read from the database |
| `JWT_PRIVATE_KEY` | celery-beat | - | Optional override, read from the database |
| `DJANGO_DB_ENGINE` | celery-beat | django.db.backends.postgresql | Database backend |
| `LOG_LEVEL_PYTHON` | celery-beat | INFO | Application log level |
| `ALLOW_GUEST_USERS` | celery-beat | False | Auto-create anonymous accounts |
| `AWS_ACCESS_KEY_ID` | celery-beat | - | Bucket access key |
| `AXES_COOLOFF_TIME` | celery-beat | 30 | Lockout duration in minutes |
| `NUMBER_OF_PROXIES` | celery-beat | 1 | Proxy hops in front of Django |
| `ALLOW_REGISTRATION` | celery-beat | False | Public sign-up switch |
| `AWS_S3_REGION_NAME` | celery-beat | - | Bucket region |
| `AXES_FAILURE_LIMIT` | celery-beat | 10 | Failed logins before lockout |
| `DJANGO_DB_DATABASE` | celery-beat | - | Database name |
| `DJANGO_DB_PASSWORD` | celery-beat | (secret) | Database password |
| `EXERCISE_CACHE_TTL` | celery-beat | 2419200 | Exercise cache TTL in seconds |
| `USE_S3_MEDIA_FILES` | celery-beat | True | Store downloads in object storage |
| `ALLOW_UPLOAD_VIDEOS` | celery-beat | True | Permit exercise video uploads |
| `AWS_S3_ENDPOINT_URL` | celery-beat | - | Bucket S3 endpoint |
| `USE_S3_STATIC_FILES` | celery-beat | False | Static files served from the image |
| `WGER_ADMIN_PASSWORD` | celery-beat | (secret) | Must match the web service |
| `AWS_S3_CUSTOM_DOMAIN` | celery-beat | - | Media URLs route through the app |
| `DJANGO_CACHE_BACKEND` | celery-beat | django_redis.cache.RedisCache | Cache backend class |
| `DJANGO_CACHE_TIMEOUT` | celery-beat | 1296000 | Cache TTL in seconds |
| `USE_S3_URL_FOR_MEDIA` | celery-beat | True | Build media URLs from the custom domain |
| `AWS_SECRET_ACCESS_KEY` | celery-beat | (secret) | Bucket secret key |
| `DJANGO_CACHE_LOCATION` | celery-beat | - | Redis database for the cache |
| `SYNC_EXERCISES_CELERY` | celery-beat | True | Weekly exercise catalogue sync |
| `AWS_STORAGE_BUCKET_NAME` | celery-beat | - | Bucket name |
| `AXES_IPWARE_PROXY_COUNT` | celery-beat | 1 | Proxy hops for client IP detection |
| `AXES_LOCKOUT_PARAMETERS` | celery-beat | ip_address | Lock out by client IP |
| `S3_MEDIA_FILES_LOCATION` | celery-beat | media | Key prefix for media objects |
| `SYNC_INGREDIENTS_CELERY` | celery-beat | False | Bulk ingredient dump, needs a large database |
| `MIN_ACCOUNT_AGE_TO_TRUST` | celery-beat | 21 | Days before a user may edit exercises |
| `CELERY_WORKER_CONCURRENCY` | celery-beat | 4 | Greenlets per worker |
| `DJANGO_CACHE_CLIENT_CLASS` | celery-beat | django_redis.client.DefaultClient | Redis client class |
| `DOWNLOAD_INGREDIENTS_FROM` | celery-beat | WGER | On-demand ingredient lookups |
| `CACHE_API_EXERCISES_CELERY` | celery-beat | True | Keep the exercise API cache warm |
| `SYNC_EXERCISE_IMAGES_CELERY` | celery-beat | True | Weekly exercise image sync |
| `SYNC_EXERCISE_VIDEOS_CELERY` | celery-beat | True | Weekly exercise video sync |
| `X_FORWARDED_PROTO_HEADER_SET` | celery-beat | True | Trust the edge's forwarded scheme |
| `AXES_IPWARE_META_PRECEDENCE_ORDER` | celery-beat | HTTP_X_FORWARDED_FOR,REMOTE_ADDR | Client IP header order |
| `CACHE_API_EXERCISES_CELERY_FORCE_UPDATE` | celery-beat | True | Rebuild that cache each run |

## Configuration

- **Healthcheck:** `/api/v2/version/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/wger-fitness)
