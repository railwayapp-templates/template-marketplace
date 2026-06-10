# Deploy Pneumatic files on Railway

Open-source workflow management platform by Pneumatic

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pneumatic-files)

## About

Pneumatic is an open-source workflow management system that empowers teams to create, run, and optimize business processes collaboratively. It features reusable workflow templates, parallel multi-workflow execution, individual task buckets for staff, and automated stage tracking with real-time handoffs between teams.

Deploying Pneumatic involves running a multi-service architecture composed of a Django/Gunicorn backend (with ASGI via Uvicorn), a Next.js frontend served through PM2, Celery workers and Celery Beat for async task processing and scheduled jobs. The stack requires PostgreSQL for data persistence, Redis for caching, sessions, and WebSocket channels, and RabbitMQ as the Celery message broker. Railway simplifies this by managing each service as a separate component with shared networking and environment variables, eliminating the need to manually configure Docker Compose, SSL, and inter-service communication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: /backend) | Web service |
| chrislusf/seaweedfs:3.95-o24f | `chrislusf/seaweedfs:3.95` | Worker |
| Frontend | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: /frontend) | Web service |
| file-postgres | `postgres:15-bookworm` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| chrislusf/seaweedfs:3.95 | `chrislusf/seaweedfs:3.95` | Worker |
| celery-beat | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: /backend) | Worker |
| file-service | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: /storage) | Worker |
| rabbitmq | `rabbitmq:3.13-management` | Database |
| chrislusf/seaweedfs:3.95-0f0s | `chrislusf/seaweedfs:3.95` | Worker |
| Redis | `redis:8.2.1` | Database |
| celery-worker | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: /backend) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AI` | Backend | no | - |
| `PUSH` | Backend | no | - |
| `EMAIL` | Backend | no | - |
| `SIGNUP` | Backend | yes | - |
| `BILLING` | Backend | no | - |
| `CAPTCHA` | Backend | no | - |
| `MS_AUTH` | Backend | no | - |
| `STORAGE` | Backend | no | - |
| `SSO_AUTH` | Backend | no | - |
| `ANALYTICS` | Backend | no | - |
| `ADMIN_PATH` | Backend | admin | - |
| `ENVIRONMENT` | Backend | staging | - |
| `GOOGLE_AUTH` | Backend | no | - |
| `DJANGO_DEBUG` | Backend | no | - |
| `POSTGRES_USER` | Backend | (secret) | - |
| `ENABLE_LOGGING` | Backend | no | - |
| `DJANGO_SECRET_KEY` | Backend | (secret) | - |
| `POSTGRES_PASSWORD` | Backend | (secret) | - |
| `VERIFICATION_CHECK` | Backend | no | - |
| `CORS_ORIGIN_ALLOW_ALL` | Backend | no | - |
| `POSTGRES_REPLICA_USER` | Backend | (secret) | - |
| `CORS_ALLOW_CREDENTIALS` | Backend | (secret) | - |
| `DJANGO_SETTINGS_MODULE` | Backend | src.settings | - |
| `POSTGRES_REPLICA_PASSWORD` | Backend | (secret) | - |
| `AI` | Frontend | no | - |
| `PORT` | Frontend | 8000 | - |
| `PUSH` | Frontend | no | - |
| `SIGNUP` | Frontend | yes | - |
| `BILLING` | Frontend | no | - |
| `CAPTCHA` | Frontend | no | - |
| `MS_AUTH` | Frontend | no | - |
| `STORAGE` | Frontend | no | - |
| `SSO_AUTH` | Frontend | no | - |
| `ANALYTICS` | Frontend | no | - |
| `GOOGLE_AUTH` | Frontend | no | - |
| `MCS_RUN_ENV` | Frontend | prod | - |
| `DATABASE_URL` | Postgres | - | Full PostgreSQL connection string |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL connection string |
| `AI` | celery-beat | no | - |
| `PUSH` | celery-beat | no | - |
| `EMAIL` | celery-beat | no | - |
| `SIGNUP` | celery-beat | yes | - |
| `BILLING` | celery-beat | no | - |
| `CAPTCHA` | celery-beat | no | - |
| `MS_AUTH` | celery-beat | no | - |
| `STORAGE` | celery-beat | no | - |
| `SSO_AUTH` | celery-beat | no | - |
| `ANALYTICS` | celery-beat | no | - |
| `ADMIN_PATH` | celery-beat | admin | - |
| `ENVIRONMENT` | celery-beat | staging | - |
| `GOOGLE_AUTH` | celery-beat | no | - |
| `DJANGO_DEBUG` | celery-beat | no | - |
| `POSTGRES_USER` | celery-beat | (secret) | - |
| `ENABLE_LOGGING` | celery-beat | no | - |
| `DJANGO_SECRET_KEY` | celery-beat | (secret) | - |
| `POSTGRES_PASSWORD` | celery-beat | (secret) | - |
| `VERIFICATION_CHECK` | celery-beat | no | - |
| `CORS_ORIGIN_ALLOW_ALL` | celery-beat | no | - |
| `POSTGRES_REPLICA_USER` | celery-beat | (secret) | - |
| `CORS_ALLOW_CREDENTIALS` | celery-beat | (secret) | - |
| `DJANGO_SETTINGS_MODULE` | celery-beat | src.settings | - |
| `POSTGRES_REPLICA_PASSWORD` | celery-beat | (secret) | - |
| `RABBITMQ_DEFAULT_PASS` | rabbitmq | - | Default RabbitMQ password |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) | Default RabbitMQ username |
| `REDISHOST` | Redis | - | Redis server hostname |
| `REDIS_URL` | Redis | - | Redis private connection URL |
| `REDISPASSWORD` | Redis | (secret) | Redis authentication password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis authentication password |
| `REDIS_PUBLIC_URL` | Redis | - | Redis public connection URL |
| `AI` | celery-worker | no | - |
| `PUSH` | celery-worker | no | - |
| `EMAIL` | celery-worker | no | - |
| `SIGNUP` | celery-worker | yes | - |
| `BILLING` | celery-worker | no | - |
| `CAPTCHA` | celery-worker | no | - |
| `MS_AUTH` | celery-worker | no | - |
| `STORAGE` | celery-worker | no | - |
| `SSO_AUTH` | celery-worker | no | - |
| `ANALYTICS` | celery-worker | no | - |
| `ADMIN_PATH` | celery-worker | admin | - |
| `ENVIRONMENT` | celery-worker | staging | - |
| `GOOGLE_AUTH` | celery-worker | no | - |
| `DJANGO_DEBUG` | celery-worker | no | - |
| `POSTGRES_USER` | celery-worker | (secret) | - |
| `ENABLE_LOGGING` | celery-worker | no | - |
| `DJANGO_SECRET_KEY` | celery-worker | (secret) | - |
| `POSTGRES_PASSWORD` | celery-worker | (secret) | - |
| `VERIFICATION_CHECK` | celery-worker | no | - |
| `CORS_ORIGIN_ALLOW_ALL` | celery-worker | no | - |
| `POSTGRES_REPLICA_USER` | celery-worker | (secret) | - |
| `CORS_ALLOW_CREDENTIALS` | celery-worker | (secret) | - |
| `DJANGO_SETTINGS_MODULE` | celery-worker | src.settings | - |
| `POSTGRES_REPLICA_PASSWORD` | celery-worker | (secret) | - |

## Configuration

- **Start command:** `bash -c "python manage.py migrate && python manage.py collectstatic --no-input || true && python manage.py init_periodic_tasks || true && python manage.py compilemessages || true && exec gunicorn src.asgi:application --workers 1 -k uvicorn.workers.UvicornWorker --worker-tmp-dir /dev/shm --bind 0.0.0.0:${PORT:-8000} --timeout 200 --error-logfile - --access-logfile -"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `volume -mserver=seaweedfs-master:9333 -port=8080`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `master -ip=seaweedfs-master -port=9333`
- **Start command:** `celery --pidfile= --app src.celery_app:app beat -l warning -S django`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `celery --app src.celery_app:app worker -l warning`

**Category:** Automation · **Languages:** Python, TypeScript, CSS, HTML, SCSS, Shell, JavaScript, EJS, Dockerfile

[View on Railway →](https://railway.com/deploy/pneumatic-files)
