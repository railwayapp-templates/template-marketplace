# Deploy Hi.Events | Open Source Event Management, Eventbrite Alternative on Railway

Self host Hi.events. Ticketing platform with QR check-in and analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hi-events)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hi-events?referralCode=QXdhdr)

Deploy Hi.Events on Railway to run a complete event management and ticketing platform you own entirely. Self-host Hi.Events to eliminate per-ticket platform fees, process payments through your own Stripe account, and keep full control of attendee data. This template pre-configures the all-in-one container with PostgreSQL and Redis.

Hi.Events is an open-source Eventbrite alternative built with Laravel and React. Run Hi.Events on Railway and get conversion-optimized checkout, QR check-in, promo codes, analytics, and webhooks — all behind your own domain with automatic HTTPS.

![Hi.Events Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777643804/2512d7bf-1fcb-4842-bec9-0aba45943b71.png)

Hi.Events is an open-source event management platform (AGPL-3.0) for organizers who want full control over events and revenue.

- **Stripe Connect payments** — instant payouts to your bank account
- **Flexible ticket types** — paid, free, donation, tiered pricing, capacity limits
- **QR code check-in** — mobile scanning with real-time attendance tracking
- **Drag-and-drop event pages** — branded homepages without coding
- **Embeddable widget** — ticket widget for WordPress, Wix, or any HTML page
- **Real-time analytics** — sales dashboards, affiliate tracking, webhooks
- **Multi-language** — 12+ languages with full localization

The all-in-one image bundles nginx, PHP-FPM, Node.js SSR, queue worker, and scheduler under supervisord.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Hi-Events | `daveearley/hi.events-all-in-one:v1.9.0-beta` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Hi-Events | 80 | HTTP server listening port |
| `APP_ENV` | Hi-Events | production | Application environment |
| `APP_KEY` | Hi-Events | - | Laravel encryption key (base64-prefixed) |
| `APP_DEBUG` | Hi-Events | false | Disable debug mode |
| `APP_LOCALE` | Hi-Events | en | Application locale |
| `JWT_SECRET` | Hi-Events | (secret) | JWT token signing secret |
| `REDIS_HOST` | Hi-Events | - | Redis host |
| `REDIS_PORT` | Hi-Events | - | Redis port |
| `APP_CDN_URL` | Hi-Events | - | URL for uploaded assets |
| `LOG_CHANNEL` | Hi-Events | stderr | Log to Railway log viewer |
| `MAIL_MAILER` | Hi-Events | log | Mail driver (smtp for real email) |
| `CACHE_DRIVER` | Hi-Events | redis | Cache storage driver |
| `DATABASE_URL` | Hi-Events | - | PostgreSQL connection string |
| `DB_CONNECTION` | Hi-Events | pgsql | Database driver |
| `MAIL_FROM_NAME` | Hi-Events | Hi.Events | Sender display name |
| `REDIS_PASSWORD` | Hi-Events | (secret) | Redis password |
| `SESSION_DRIVER` | Hi-Events | redis | Session storage driver |
| `APP_FRONTEND_URL` | Hi-Events | - | Backend reference to frontend |
| `QUEUE_CONNECTION` | Hi-Events | redis | Async job processing driver |
| `MAIL_FROM_ADDRESS` | Hi-Events | noreply@hi.events | Sender email address |
| `VITE_FRONTEND_URL` | Hi-Events | - | Public URL for frontend |
| `VITE_API_URL_CLIENT` | Hi-Events | - | API URL for browser requests |
| `VITE_API_URL_SERVER` | Hi-Events | http://localhost:80/api | API URL for SSR (internal) |
| `CORS_ALLOWED_ORIGINS` | Hi-Events | * | CORS allowed origins |
| `APP_SAAS_MODE_ENABLED` | Hi-Events | false | Multi-tenant SaaS mode |
| `FILESYSTEM_PUBLIC_DISK` | Hi-Events | public | Public file storage disk |
| `FILESYSTEM_PRIVATE_DISK` | Hi-Events | local | Private file storage disk |
| `APP_DISABLE_REGISTRATION` | Hi-Events | false | Disable public sign-ups |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Hi-Events | - | Stripe publishable key (optional) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'mkdir -p /app/backend/storage/framework/views /app/backend/storage/framework/cache/data /app/backend/storage/framework/sessions /app/backend/storage/logs /app/backend/storage/app/public /app/backend/storage/app/private && exec /startup.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/hi-events)
