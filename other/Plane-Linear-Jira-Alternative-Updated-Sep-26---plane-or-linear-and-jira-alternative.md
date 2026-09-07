# Deploy Plane | Linear & Jira Alternative [Updated Sep '26] on Railway

Plane [Sep '26] (Linear & Jira Alternative) Project Management Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plane-or-linear-and-jira-alternative)

## About

Plane is the open-source answer to Jira and Linear: issue tracking, cycles, and modules in a fast, modern interface, without a per-seat bill that climbs every time you add a teammate. This template deploys the real production architecture, five services wired together, verified live, not a stripped-down demo version.

Jira Premium runs $17 per user per month past the free tier. A 20-person engineering team pays roughly $340/month before add-ons, and that number only grows as the team does. Self-hosting Plane on Railway costs a flat infrastructure fee no matter how many teammates you add. The gap compounds the longer the team grows.

There's a second reason beyond price. Every issue, comment, and attachment your team creates lives on whoever hosts your tracker. On Jira or Linear's cloud, that's a third party. Self-hosting keeps it on infrastructure you control, which matters more the moment a client contract or compliance requirement asks where your data actually sits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| plane | `makeplane/plane-aio-community:v1.4.2` | Web service |
| minio | `minio/minio:latest` | Database |
| rabbitmq | `rabbitmq:3.13.6-management-alpine` | Database |
| redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | plane | Database name — must match the path segment in plane's DATABASE_URL. |
| `POSTGRES_USER` | postgres | (secret) | Must match the username used in plane's DATABASE_URL. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated Postgres password — referenced by plane's DATABASE_URL. |
| `WEB_URL` | plane | - | Belt-and-suspenders alongside APP_BASE_URL — start.sh sets this internally from DOMAIN_NAME+APP_PROTOCOL already, but setting it explicitly avoids relying on that derivation being correct. |
| `AMQP_URL` | plane | - | RabbitMQ connection string for background task processing (notifications, imports, exports). Vhost must be plane, matching RABBITMQ_DEFAULT_VHOST on the rabbitmq service. |
| `REDIS_URL` | plane | - | Redis connection string used for caching and session storage. Password must match redis's REDIS_PASSWORD. |
| `AWS_REGION` | plane | us-east-1 | Required by the S3 client even though MinIO ignores real AWS regions — any valid-looking region string works. |
| `SECRET_KEY` | plane | (secret) | Django cryptographic secret for sessions and tokens. Auto-generated per deployment if left as the shipped placeholder, but setting an explicit long random value here at publish time is safer than relying on first-boot autogeneration. |
| `DOMAIN_NAME` | plane | - | Bare hostname only, no https:// prefix. Confirmed live — a protocol prefix here breaks the container's own domain validation regex and the app refuses to boot. |
| `APP_BASE_URL` | plane | - | Main web app base URL. Same reasoning as ADMIN_BASE_URL. |
| `APP_PROTOCOL` | plane | https | Railway domains are always HTTPS; this must be https, not the container's internal default of http, or generated links/CORS will be wrong. |
| `DATABASE_URL` | plane | - | Full Postgres connection string. Must reference the postgres service's own generated password — never hardcode. |
| `ADMIN_BASE_URL` | plane | - | Required or the god-mode (instance admin setup) page hangs on an infinite loading spinner — confirmed live, this is not documented in the AIO README's env var list at all. Must include the https:// prefix (unlike DOMAIN_NAME). Same value as APP_BASE_URL/SPACE_BASE_URL for this single-domain all-in-one deploy. |
| `SPACE_BASE_URL` | plane | - | Public-project space frontend base URL. Same reasoning as ADMIN_BASE_URL — left unset, this and the other two base URLs come back null from /api/instances/ and break frontend routing. |
| `FILE_SIZE_LIMIT` | plane | 10485760 | Maximum file upload size in bytes (10MB). Image default is 5MB (5242880); doubled here for typical issue attachments. |
| `AWS_ACCESS_KEY_ID` | plane | - | Must match minio's MINIO_ROOT_USER — this is the object storage access key, not a real AWS credential. |
| `AWS_S3_BUCKET_NAME` | plane | uploads | Bucket name for file/attachment uploads. Plane's backend creates this bucket on first use if it doesn't exist — confirmed live, no manual mc mb step needed. |
| `AWS_S3_ENDPOINT_URL` | plane | - | Critical — without this, the app defaults to real s3.amazonaws.com and every upload silently fails auth against MinIO credentials. |
| `AWS_SECRET_ACCESS_KEY` | plane | (secret) | Must match minio's MINIO_ROOT_PASSWORD. |
| `LIVE_SERVER_SECRET_KEY` | plane | (secret) | Shared secret between the API and the real-time collaboration server. Same autogeneration caveat as SECRET_KEY. |
| `MINIO_ROOT_USER` | minio | (secret) | Object storage access key — referenced by plane's AWS_ACCESS_KEY_ID. |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Object storage secret key — referenced by plane's AWS_SECRET_ACCESS_KEY. |
| `RABBITMQ_DEFAULT_PASS` | rabbitmq | - | Referenced by plane's AMQP_URL. |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) | Must match the username in plane's AMQP_URL. |
| `RABBITMQ_DEFAULT_VHOST` | rabbitmq | plane | Must match the vhost path segment in plane's AMQP_URL. |
| `REDIS_PASSWORD` | redis | (secret) | Used by the custom start command's --requirepass flag and referenced in plane's REDIS_URL. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "echo cCA9ICcvYXBwL3Byb3h5L0NhZGR5ZmlsZScKcyA9IG9wZW4ocCkucmVhZCgpCm1hcmtlciA9ICdoYW5kbGVfcGF0aCAvZ29kLW1vZGUqIHsnCmlmIG1hcmtlciBpbiBzIGFuZCAnaGFuZGxlIC9nb2QtbW9kZSB7JyBub3QgaW4gczoKICAgIGluc2VydCA9ICdoYW5kbGUgL2dvZC1tb2RlIHtcbiAgICAgICAgcmVkaXIgKiAvZ29kLW1vZGUvIDMwMVxuICAgIH1cblxuICAgICcgKyBtYXJrZXIKICAgIHMgPSBzLnJlcGxhY2UobWFya2VyLCBpbnNlcnQsIDEpCiAgICBvcGVuKHAsICd3Jykud3JpdGUocykKICAgIHByaW50KCdQQVRDSEVEJykKZWxzZToKICAgIHByaW50KCdTS0lQUEVEIChhbHJlYWR5IHBhdGNoZWQgb3IgbWFya2VyIG5vdCBmb3VuZCknKQo= | base64 -d > /tmp/patch_caddy.py && python3 /tmp/patch_caddy.py; exec /app/start.sh"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `minio server /data --console-address :9001`
- **Volume:** `/data`
- **Start command:** `redis-server --requirepass c5d9e230174739f604636bc749f61e6c --appendonly yes`

**Category:** Other

[View on Railway →](https://railway.com/deploy/plane-or-linear-and-jira-alternative)
