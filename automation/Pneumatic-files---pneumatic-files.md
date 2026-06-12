# Deploy Pneumatic files on Railway

Open-source workflow management platform by Pneumatic

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pneumatic-files)

## About

Pneumatic is an open-source workflow management system that empowers teams to create, run, and optimize business processes collaboratively. It features reusable workflow templates, parallel multi-workflow execution, individual task buckets for staff, and automated stage tracking with real-time handoffs between teams.

Deploying Pneumatic involves running a multi-service architecture composed of a Django/Gunicorn backend (with ASGI via Uvicorn), a Next.js frontend served through PM2, Celery workers and Celery Beat for async task processing and scheduled jobs. The stack requires PostgreSQL for data persistence, Redis for caching, sessions, and WebSocket channels, and RabbitMQ as the Celery message broker. Railway simplifies this by managing each service as a separate component with shared networking and environment variables, eliminating the need to manually configure Docker Compose, SSL, and inter-service communication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nginx | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: nginx/railway) | Worker |
| Backend | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: /backend) | Worker |
| SeaweedFS Filer | `chrislusf/seaweedfs:3.95` | Database |
| Frontend | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: /frontend) | Web service |
| file-postgres | `postgres:15-bookworm` | Database |
| Postgres | `postgres:15-bookworm` | Database |
| SeaweedFS Volume | `chrislusf/seaweedfs:3.95` | Database |
| celery-beat | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: /backend) | Worker |
| file-service | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: /storage) | Worker |
| rabbitmq | `rabbitmq:3.13-management` | Database |
| SeaweedFS Master | `chrislusf/seaweedfs:3.95` | Database |
| Redis | `redis:6.2.6` | Database |
| celery-worker | [pneumaticapp/pneumaticworkflow](https://github.com/pneumaticapp/pneumaticworkflow) (root: /backend) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | nginx | 8080 | Port nginx listens on (Railway requirement) |
| `BACKEND_HOST` | nginx | - | Backend upstream host |
| `FRONTEND_HOST` | nginx | - | Frontend upstream host |
| `FILE_SERVICE_HOST` | nginx | - | File service upstream host |
| `AI` | Backend | no | Enable AI features |
| `PORT` | Backend | 8000 | Gunicorn listen port — Railway may auto-inject 8080, override to 8000 |
| `PUSH` | Backend | no | Enable push notifications |
| `EMAIL` | Backend | no | Enable email sending |
| `SIGNUP` | Backend | yes | Allow user registration |
| `BILLING` | Backend | no | Enable billing/payments |
| `CAPTCHA` | Backend | no | Enable reCAPTCHA verification |
| `MS_AUTH` | Backend | no | Enable Microsoft OAuth |
| `RELEASE` | Backend | 1.0.0 | Application version |
| `WSS_URL` | Backend | - | WebSocket URL |
| `SSO_AUTH` | Backend | no | Enable SSO authentication |
| `ANALYTICS` | Backend | no | Enable analytics tracking |
| `FORMS_URL` | Backend | - | Public forms URL |
| `ADMIN_PATH` | Backend | admin | Django admin URL path |
| `BACKEND_URL` | Backend | - | Public backend URL (via nginx) |
| `ENVIRONMENT` | Backend | Production | Runtime environment name |
| `GOOGLE_AUTH` | Backend | no | Enable Google OAuth |
| `POSTGRES_DB` | Backend | - | PostgreSQL database name |
| `DJANGO_DEBUG` | Backend | no | Django debug mode |
| `FRONTEND_URL` | Backend | - | Public frontend URL (via nginx) |
| `ALLOWED_HOSTS` | Backend | * | Allowed HTTP hosts |
| `LANGUAGE_CODE` | Backend | en | Default language |
| `POSTGRES_HOST` | Backend | - | PostgreSQL host |
| `POSTGRES_USER` | Backend | (secret) | PostgreSQL username |
| `WORKERS_COUNT` | Backend | 2 | Gunicorn worker count |
| `AUTH_REDIS_URL` | Backend | - | Redis auth tokens (db1) |
| `ENABLE_LOGGING` | Backend | yes | Enable application logging |
| `CACHE_REDIS_URL` | Backend | - | Redis cache (db0) |
| `FILE_POSTGRES_DB` | Backend | - | File service PostgreSQL database name |
| `FILE_SERVICE_URL` | Backend | - | Public file service URL |
| `CELERY_BROKER_URL` | Backend | - | Celery message broker |
| `DJANGO_SECRET_KEY` | Backend | (secret) | Django secret key — shared across Backend, file-service, celery-worker, celery-beat. Must be identical! |
| `POSTGRES_PASSWORD` | Backend | (secret) | PostgreSQL password |
| `SESSION_REDIS_URL` | Backend | - | Redis sessions (db3) |
| `CHANNELS_REDIS_URL` | Backend | - | Django Channels WebSocket (db2) |
| `FILE_POSTGRES_HOST` | Backend | - | File service PostgreSQL host |
| `FILE_POSTGRES_PORT` | Backend | 5432 | File service PostgreSQL port |
| `FILE_POSTGRES_USER` | Backend | (secret) | File service PostgreSQL username |
| `VERIFICATION_CHECK` | Backend | no | Enable email verification |
| `POSTGRES_REPLICA_DB` | Backend | - | Read-replica database name |
| `CORS_ORIGIN_ALLOW_ALL` | Backend | no | Allow all CORS origins |
| `CORS_ORIGIN_WHITELIST` | Backend | - | CORS allowed origin |
| `POSTGRES_REPLICA_HOST` | Backend | - | Read-replica host (same as primary if no replica) |
| `POSTGRES_REPLICA_USER` | Backend | (secret) | Read-replica username |
| `CORS_ALLOW_CREDENTIALS` | Backend | (secret) | Allow credentials in CORS requests |
| `DJANGO_SETTINGS_MODULE` | Backend | src.settings | Django settings module path |
| `FILE_POSTGRES_PASSWORD` | Backend | (secret) | File service PostgreSQL password |
| `POSTGRES_REPLICA_PASSWORD` | Backend | (secret) | Read-replica password |
| `SEAWEED_MASTER` | SeaweedFS Filer | seaweedfs-master.railway.internal:9333 | SeaweedFS master address for filer operations |
| `AI` | Frontend | no | Enable AI features in UI |
| `PUSH` | Frontend | no | Enable push notifications UI |
| `SIGNUP` | Frontend | yes | Show registration form |
| `BILLING` | Frontend | no | Enable billing UI |
| `CAPTCHA` | Frontend | no | Enable reCAPTCHA in forms |
| `MS_AUTH` | Frontend | no | Show Microsoft login button |
| `RELEASE` | Frontend | 1.0.0 | Application version |
| `WSS_URL` | Frontend | - | WebSocket connection URL |
| `SSO_AUTH` | Frontend | no | Enable SSO login |
| `ANALYTICS` | Frontend | no | Enable analytics tracking |
| `BACKEND_URL` | Frontend | - | Public backend URL (via nginx) |
| `GOOGLE_AUTH` | Frontend | no | Show Google login button |
| `MCS_RUN_ENV` | Frontend | prod | Runtime environment (prod/dev) |
| `FRONTEND_URL` | Frontend | - | Public frontend URL |
| `NODE_OPTIONS` | Frontend | --max-old-space-size=3072 | Node.js memory limit |
| `LANGUAGE_CODE` | Frontend | en | Default UI language |
| `FILE_SERVICE_URL` | Frontend | - | Public file service URL |
| `BACKEND_PRIVATE_URL` | Frontend | - | Private backend URL for SSR |
| `POSTGRES_DB` | file-postgres | pneumatic | Database name |
| `DATABASE_URL` | file-postgres | - | Internal connection string |
| `POSTGRES_USER` | file-postgres | (secret) | PostgreSQL superuser name |
| `POSTGRES_PASSWORD` | file-postgres | (secret) | PostgreSQL password (auto-generated) |
| `DATABASE_PUBLIC_URL` | file-postgres | - | External connection string (TCP proxy) |
| `POSTGRES_DB` | Postgres | pneumatic | Database name |
| `DATABASE_URL` | Postgres | - | Internal connection string |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL password (auto-generated) |
| `DATABASE_PUBLIC_URL` | Postgres | - | External connection string (TCP proxy) |
| `SEAWEED_MASTER` | SeaweedFS Volume | seaweedfs-master.railway.internal:9333 | SeaweedFS master address for volume registration |
| `AI` | celery-beat | no | Enable AI features |
| `PUSH` | celery-beat | no | Enable push notifications |
| `EMAIL` | celery-beat | no | Enable email sending |
| `SIGNUP` | celery-beat | yes | Allow user registration |
| `BILLING` | celery-beat | no | Enable billing/payments |
| `CAPTCHA` | celery-beat | no | Enable reCAPTCHA verification |
| `MS_AUTH` | celery-beat | no | Enable Microsoft OAuth |
| `RELEASE` | celery-beat | 1.0.0 | Application version |
| `WSS_URL` | celery-beat | - | WebSocket URL |
| `SSO_AUTH` | celery-beat | no | Enable SSO authentication |
| `ANALYTICS` | celery-beat | no | Enable analytics tracking |
| `FORMS_URL` | celery-beat | - | Public forms URL |
| `ADMIN_PATH` | celery-beat | admin | Django admin URL path |
| `BACKEND_URL` | celery-beat | - | Public backend URL (via nginx) |
| `ENVIRONMENT` | celery-beat | Production | Runtime environment name |
| `GOOGLE_AUTH` | celery-beat | no | Enable Google OAuth |
| `POSTGRES_DB` | celery-beat | - | PostgreSQL database name |
| `DJANGO_DEBUG` | celery-beat | no | Django debug mode |
| `FRONTEND_URL` | celery-beat | - | Public frontend URL (via nginx) |
| `ALLOWED_HOSTS` | celery-beat | * | Allowed HTTP hosts |
| `LANGUAGE_CODE` | celery-beat | en | Default language |
| `POSTGRES_HOST` | celery-beat | - | PostgreSQL host |
| `POSTGRES_USER` | celery-beat | (secret) | PostgreSQL username |
| `AUTH_REDIS_URL` | celery-beat | - | Redis auth tokens (db1) |
| `ENABLE_LOGGING` | celery-beat | yes | Enable application logging |
| `CACHE_REDIS_URL` | celery-beat | - | Redis cache (db0) |
| `FILE_POSTGRES_DB` | celery-beat | - | File service PostgreSQL database name |
| `FILE_SERVICE_URL` | celery-beat | - | Public file service URL |
| `CELERY_BROKER_URL` | celery-beat | - | Celery message broker |
| `DJANGO_SECRET_KEY` | celery-beat | (secret) | Django secret key — shared across Backend, file-service, celery-worker, celery-beat. Must be identical! |
| `POSTGRES_PASSWORD` | celery-beat | (secret) | PostgreSQL password |
| `SESSION_REDIS_URL` | celery-beat | - | Redis sessions (db3) |
| `CHANNELS_REDIS_URL` | celery-beat | - | Django Channels WebSocket (db2) |
| `FILE_POSTGRES_HOST` | celery-beat | - | File service PostgreSQL host |
| `FILE_POSTGRES_PORT` | celery-beat | 5432 | File service PostgreSQL port |
| `FILE_POSTGRES_USER` | celery-beat | (secret) | File service PostgreSQL username |
| `VERIFICATION_CHECK` | celery-beat | no | Enable email verification |
| `POSTGRES_REPLICA_DB` | celery-beat | - | Read-replica database name |
| `CORS_ORIGIN_ALLOW_ALL` | celery-beat | no | Allow all CORS origins |
| `CORS_ORIGIN_WHITELIST` | celery-beat | - | CORS allowed origin |
| `POSTGRES_REPLICA_HOST` | celery-beat | - | Read-replica host (same as primary if no replica) |
| `POSTGRES_REPLICA_USER` | celery-beat | (secret) | Read-replica username |
| `CORS_ALLOW_CREDENTIALS` | celery-beat | (secret) | Allow credentials in CORS requests |
| `DJANGO_SETTINGS_MODULE` | celery-beat | src.settings | Django settings module path |
| `FILE_POSTGRES_PASSWORD` | celery-beat | (secret) | File service PostgreSQL password |
| `POSTGRES_REPLICA_PASSWORD` | celery-beat | (secret) | Read-replica password |
| `PORT` | file-service | 8000 | Application port |
| `DEBUG` | file-service | false | Debug mode |
| `CONFIG` | file-service | Production | Configuration profile |
| `WORKERS` | file-service | 1 | Uvicorn worker count |
| `FORMS_URL` | file-service | - | Public forms URL |
| `CHUNK_SIZE` | file-service | 1048576 | File chunk size in bytes (1MB) |
| `POSTGRES_DB` | file-service | - | File-postgres database name |
| `FRONTEND_URL` | file-service | - | Public frontend URL |
| `STORAGE_TYPE` | file-service | local | Storage type (local = SeaweedFS) |
| `BUCKET_PREFIX` | file-service | pneumatic | S3 bucket prefix for file storage |
| `MAX_FILE_SIZE` | file-service | 104857600 | Maximum file size in bytes (100MB) |
| `POSTGRES_HOST` | file-service | - | File-postgres host |
| `POSTGRES_PORT` | file-service | 5432 | File-postgres port |
| `POSTGRES_USER` | file-service | (secret) | File-postgres username |
| `AUTH_REDIS_URL` | file-service | - | Redis auth tokens (db1, same as Backend) |
| `FASTAPI_BASE_URL` | file-service | - | Public file service base URL |
| `KEY_PREFIX_REDIS` | file-service | :1: | Redis key prefix for auth token lookup |
| `DJANGO_SECRET_KEY` | file-service | (secret) | Must match Backend's secret key for auth token verification |
| `POSTGRES_PASSWORD` | file-service | (secret) | File-postgres password |
| `BACKEND_PRIVATE_URL` | file-service | - | Private backend URL for internal API calls |
| `SEAWEEDFS_S3_REGION` | file-service | us-east-1 | SeaweedFS S3 region (required by boto3) |
| `SEAWEEDFS_S3_USE_SSL` | file-service | false | Use SSL for SeaweedFS connection |
| `AUTH_TOKEN_ITERATIONS` | file-service | (secret) | Auth token hashing iterations |
| `SEAWEEDFS_S3_ENDPOINT` | file-service | http://seaweedfs-filer.railway.internal:8333 | SeaweedFS S3-compatible endpoint |
| `SEAWEEDFS_S3_ACCESS_KEY` | file-service | any-secret-key-will-work | SeaweedFS S3 access key |
| `SEAWEEDFS_S3_SECRET_KEY` | file-service | (secret) | SeaweedFS S3 secret key |
| `RABBITMQ_DEFAULT_PASS` | rabbitmq | - | Default RabbitMQ password (auto-generated) |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) | Default RabbitMQ username |
| `REDISHOST` | Redis | - | Redis server hostname |
| `REDISPORT` | Redis | 6379 | Redis server port |
| `REDISUSER` | Redis | default | Redis username |
| `REDIS_URL` | Redis | - | Internal connection URL |
| `REDISPASSWORD` | Redis | (secret) | Redis password (alias reference) |
| `REDIS_PASSWORD` | Redis | (secret) | Redis authentication password (auto-generated) |
| `REDIS_PUBLIC_URL` | Redis | - | External connection URL (TCP proxy) |
| `AI` | celery-worker | no | Enable AI features |
| `PUSH` | celery-worker | no | Enable push notifications |
| `EMAIL` | celery-worker | no | Enable email sending |
| `SIGNUP` | celery-worker | yes | Allow user registration |
| `BILLING` | celery-worker | no | Enable billing/payments |
| `CAPTCHA` | celery-worker | no | Enable reCAPTCHA verification |
| `MS_AUTH` | celery-worker | no | Enable Microsoft OAuth |
| `RELEASE` | celery-worker | 1.0.0 | Application version |
| `WSS_URL` | celery-worker | - | WebSocket URL |
| `SSO_AUTH` | celery-worker | no | Enable SSO authentication |
| `ANALYTICS` | celery-worker | no | Enable analytics tracking |
| `FORMS_URL` | celery-worker | - | Public forms URL |
| `ADMIN_PATH` | celery-worker | admin | Django admin URL path |
| `BACKEND_URL` | celery-worker | - | Public backend URL (via nginx) |
| `ENVIRONMENT` | celery-worker | Production | Runtime environment name |
| `GOOGLE_AUTH` | celery-worker | no | Enable Google OAuth |
| `POSTGRES_DB` | celery-worker | - | PostgreSQL database name |
| `DJANGO_DEBUG` | celery-worker | no | Django debug mode |
| `FRONTEND_URL` | celery-worker | - | Public frontend URL (via nginx) |
| `ALLOWED_HOSTS` | celery-worker | * | Allowed HTTP hosts |
| `LANGUAGE_CODE` | celery-worker | en | Default language |
| `POSTGRES_HOST` | celery-worker | - | PostgreSQL host |
| `POSTGRES_USER` | celery-worker | (secret) | PostgreSQL username |
| `AUTH_REDIS_URL` | celery-worker | - | Redis auth tokens (db1) |
| `ENABLE_LOGGING` | celery-worker | yes | Enable application logging |
| `CACHE_REDIS_URL` | celery-worker | - | Redis cache (db0) |
| `FILE_POSTGRES_DB` | celery-worker | - | File service PostgreSQL database name |
| `FILE_SERVICE_URL` | celery-worker | - | Public file service URL |
| `CELERY_BROKER_URL` | celery-worker | - | Celery message broker |
| `DJANGO_SECRET_KEY` | celery-worker | (secret) | Django secret key — shared across Backend, file-service, celery-worker, celery-beat. Must be identical! |
| `POSTGRES_PASSWORD` | celery-worker | (secret) | PostgreSQL password |
| `SESSION_REDIS_URL` | celery-worker | - | Redis sessions (db3) |
| `CHANNELS_REDIS_URL` | celery-worker | - | Django Channels WebSocket (db2) |
| `FILE_POSTGRES_HOST` | celery-worker | - | File service PostgreSQL host |
| `FILE_POSTGRES_PORT` | celery-worker | 5432 | File service PostgreSQL port |
| `FILE_POSTGRES_USER` | celery-worker | (secret) | File service PostgreSQL username |
| `VERIFICATION_CHECK` | celery-worker | no | Enable email verification |
| `POSTGRES_REPLICA_DB` | celery-worker | - | Read-replica database name |
| `CORS_ORIGIN_ALLOW_ALL` | celery-worker | no | Allow all CORS origins |
| `CORS_ORIGIN_WHITELIST` | celery-worker | - | CORS allowed origin |
| `POSTGRES_REPLICA_HOST` | celery-worker | - | Read-replica host (same as primary if no replica) |
| `POSTGRES_REPLICA_USER` | celery-worker | (secret) | Read-replica username |
| `CORS_ALLOW_CREDENTIALS` | celery-worker | (secret) | Allow credentials in CORS requests |
| `DJANGO_SETTINGS_MODULE` | celery-worker | src.settings | Django settings module path |
| `FILE_POSTGRES_PASSWORD` | celery-worker | (secret) | File service PostgreSQL password |
| `POSTGRES_REPLICA_PASSWORD` | celery-worker | (secret) | Read-replica password |

## Configuration

- **Start command:** `sh -c "python manage.py migrate && python manage.py collectstatic --no-input && python manage.py init_periodic_tasks && python manage.py compilemessages && gunicorn src.asgi:application --workers ${WORKERS_COUNT:-2} -k uvicorn.workers.UvicornWorker --worker-tmp-dir /dev/shm --bind [::]:8000 --timeout 200"`
- **Start command:** `sh -c "weed filer -master=$SEAWEED_MASTER -ip=$RAILWAY_PRIVATE_DOMAIN -port=8888 -s3 -s3.port=8333"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "weed volume -mserver=$SEAWEED_MASTER -ip=$RAILWAY_PRIVATE_DOMAIN -port=8080 -dir=/data"`
- **Start command:** `celery --pidfile= --app src.celery_app:app beat -l warning -S django`
- **Start command:** `sh -c "weed master -ip=$RAILWAY_PRIVATE_DOMAIN -port=9333 -mdir=/data"`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Start command:** `celery --app src.celery_app:app worker -l warning`

**Category:** Automation · **Languages:** Python, TypeScript, CSS, HTML, SCSS, Shell, JavaScript, EJS, Dockerfile

[View on Railway →](https://railway.com/deploy/pneumatic-files)
