# Deploy Saleor on Railway

Saleor 3.23: headless GraphQL commerce API with the admin dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/saleor-1)

## About

Saleor is a headless, GraphQL-first commerce platform written in Python. It handles products, variants, multiple channels, currencies and warehouses, checkout, orders, promotions, gift cards and payments through apps and webhooks, and comes with a React admin dashboard. It is a composable alternative to Shopify Plus and Medusa.

This template runs the official `ghcr.io/saleor/saleor:3.23.36` API and `saleor-dashboard:3.23.34` with Railway Postgres and Redis. The API service also runs the Celery worker and scheduler, because Saleor signs tokens and webhooks with an RSA key that both must share; the key is generated on first boot and kept on the API's volume with media uploads. Migrations run on every start, and a staff admin is created from `DJANGO_SUPERUSER_EMAIL` and a generated password. CORS allows the dashboard's domain. The stack needs roughly 1 GB of RAM. Connect a storefront, such as Saleor's Next.js starter, to the GraphQL endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashboard | `ghcr.io/saleor/saleor-dashboard:3.23.34` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| api | `ghcr.io/saleor/saleor:3.23.36` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | dashboard | 80 |
| `APP_MOUNT_URI` | dashboard | /dashboard/ |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | api | 8000 |
| `SECRET_KEY` | api | (secret) |
| `SALEOR_BOOT` | api | # Saleor API + Celery worker in one container, so both use the RSA key kept on the volume.
set -e
KEY=/app/media/.rsa_private_key.pem
if [ ! -s $KEY ]; then
  python3 -c 'import sys
from cryptography.hazmat.primitives import serialization as s
from cryptography.hazmat.primitives.asymmetric import rsa
k = rsa.generate_private_key(public_exponent=65537, key_size=2048)
sys.stdout.buffer.write(k.private_bytes(s.Encoding.PEM, s.PrivateFormat.PKCS8, s.NoEncryption()))' > $KEY
  chmod 600 $KEY
  echo 'boot: generated a new RSA signing key'
fi
export RSA_PRIVATE_KEY=$(cat $KEY)
python3 manage.py migrate --no-input
python3 manage.py createsuperuser --no-input 2>/dev/null && echo 'boot: superuser created' || echo 'boot: superuser already exists'
celery --app saleor.celeryconf:app worker -B -E --loglevel=info --concurrency=${CELERY_CONCURRENCY:-2} &
cpid=$!
uvicorn saleor.asgi:application --host=0.0.0.0 --port=${PORT:-8000} --workers=${UVICORN_WORKERS:-2} --lifespan=auto --ws=none --no-server-header --no-access-log --timeout-keep-alive=35 --timeout-graceful-shutdown=30 --limit-max-requests=10000 &
upid=$!
trap 'kill -TERM $upid $cpid; wait $upid $cpid; exit 0' TERM INT
wait $upid |
| `DEFAULT_FROM_EMAIL` | api | noreply@example.com |
| `DJANGO_SUPERUSER_EMAIL` | api | admin@example.com |
| `DJANGO_SUPERUSER_PASSWORD` | api | (secret) |

## Configuration

- **Healthcheck:** `/dashboard/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'printf "%s\n" "$SALEOR_BOOT" > /tmp/boot.sh && exec sh /tmp/boot.sh'`
- **Healthcheck:** `/health/`
- **Volume:** `/app/media`

**Category:** Other

[View on Railway →](https://railway.com/deploy/saleor-1)
