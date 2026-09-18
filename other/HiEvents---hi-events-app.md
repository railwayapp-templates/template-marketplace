# Deploy Hi.Events on Railway

Event ticketing platform for selling tickets and checking guests in

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hi-events-app)

## About

Hi.Events is an open-source event ticketing platform — the self-hosted answer to Eventbrite, Tickettailor and Dice. Organizers build an event page, sell tickets in any currency, ask custom checkout questions, email PDF tickets and scan attendees in at the door. Promoters, conference hosts and venues run it when they want their own branding on the checkout, no per-ticket fee, and ownership of their attendee data. Self-host Hi.Events and every order lives in a database you control.

This template deploys the production shape, not a single container. **hi-events** serves the public event pages, the checkout and the organizer dashboard on one origin. **hi-events-worker** runs the Laravel queue worker and scheduler, so ticket emails, webhooks and exports stay off the request path. **Postgres** holds orders and attendees, **Redis** carries the job queue, **mailpit** captures outbound mail so ticket delivery works immediately, and a bucket holds generated exports.

![Diagram of the Hi.Events services, Postgres, Redis and Mailpit on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789651548/hi-events-architecture.webp)

Commercial ticketing platforms charge a fee on every ticket and keep the buyer list. Over a season that adds up, and the list stays in someone else's product. Hi.Events moves the whole flow onto infrastructure you own — page, checkout, emails and door scanner.

Key features:

- Free, paid, donation and tiered tickets, plus add-ons like merchandise
- Promo codes, pre-sale access, hidden tickets and shared capacity limits
- Drag-and-drop page builder, custom PDF ticket designs, embeddable widget
- Custom checkout questions with CSV and XLSX export
- QR check-in lists, shareable with staff who have no account
- Refunds, automatic invoicing, affiliate tracking and webhooks

The Railway architecture separates the roles the application actually has. **hi-events** runs nginx, PHP-FPM and the server-rendered React frontend behind one hostname, so the dashboard and the public checkout share an origin and a session. **hi-events-worker** runs `queue:work` plus the scheduler: email delivery, webhook dispatch, waitlist expiry and exports. **Postgres** is the system of record, **Redis** the queue transport between them, **mailpit** a working SMTP endpoint on the private network from first boot, and the bucket holds exports served as short-lived signed URLs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| hi-events | [gridalpha/hi-events-railway](https://github.com/gridalpha/hi-events-railway) | Web service |
| hi-events-worker | [gridalpha/hi-events-railway](https://github.com/gridalpha/hi-events-railway) | Worker |
| mailpit | `axllent/mailpit:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | hi-events | 8080 | Port nginx binds inside the container |
| `APP_ENV` | hi-events | production | Laravel environment |
| `APP_KEY` | hi-events | - | Laravel encryption key, must stay stable |
| `APP_URL` | hi-events | - | Public API base URL |
| `APP_NAME` | hi-events | Hi.Events | Application display name |
| `JWT_ALGO` | hi-events | HS256 | JWT signing algorithm |
| `APP_DEBUG` | hi-events | false | Never expose stack traces publicly |
| `LOG_LEVEL` | hi-events | info | Log verbosity |
| `MAIL_HOST` | hi-events | - | Bundled inbox on the private network |
| `MAIL_PORT` | hi-events | 1025 | Mailpit SMTP port |
| `REDIS_URL` | hi-events | - | Redis connection string |
| `JWT_SECRET` | hi-events | (secret) | Signs dashboard session tokens |
| `ADMIN_EMAIL` | hi-events | admin@example.com | Owner account created on first boot |
| `APP_CDN_URL` | hi-events | - | Uploaded image base URL |
| `LOG_CHANNEL` | hi-events | stderr | Send logs to the deploy log |
| `MAIL_MAILER` | hi-events | smtp | Send mail over SMTP |
| `AWS_ENDPOINT` | hi-events | - | Bucket S3 endpoint |
| `CACHE_DRIVER` | hi-events | file | Boot-time cache clear must not flush Redis |
| `DATABASE_URL` | hi-events | - | Postgres connection string |
| `MAIL_AUTO_TLS` | hi-events | false | Bundled listener advertises no STARTTLS |
| `MAIL_PASSWORD` | hi-events | (secret) | No SMTP auth on the bundled inbox |
| `MAIL_USERNAME` | hi-events | (secret) | No SMTP auth on the bundled inbox |
| `VITE_APP_NAME` | hi-events | Hi.Events | Name shown in the browser UI |
| `ADMIN_PASSWORD` | hi-events | (secret) | Owner password, change after first login |
| `MAIL_FROM_NAME` | hi-events | Hi.Events | From name on ticket emails |
| `SESSION_DRIVER` | hi-events | file | Sessions on the attached volume |
| `ADMIN_LAST_NAME` | hi-events | User | Owner last name |
| `MAIL_ENCRYPTION` | hi-events | null | Plain SMTP on the private network |
| `ADMIN_FIRST_NAME` | hi-events | Admin | Owner first name |
| `APP_FRONTEND_URL` | hi-events | - | Public site URL in emails |
| `BROADCAST_DRIVER` | hi-events | log | No websocket broadcaster in use |
| `MAIL_VERIFY_PEER` | hi-events | false | No certificate to verify |
| `PHP_MEMORY_LIMIT` | hi-events | 512M | Headroom for PDF and export generation |
| `QUEUE_CONNECTION` | hi-events | redis | Background jobs go to Redis |
| `AWS_ACCESS_KEY_ID` | hi-events | - | Bucket access key |
| `AWS_PUBLIC_BUCKET` | hi-events | - | Same bucket, unused by default |
| `MAIL_FROM_ADDRESS` | hi-events | tickets@example.com | From address on ticket emails |
| `VITE_FRONTEND_URL` | hi-events | - | Frontend base URL |
| `AWS_DEFAULT_REGION` | hi-events | - | Bucket region |
| `AWS_PRIVATE_BUCKET` | hi-events | - | Bucket holding exports |
| `VITE_API_URL_CLIENT` | hi-events | - | API URL used by the browser |
| `CORS_ALLOWED_ORIGINS` | hi-events | * | Allows the embeddable checkout widget |
| `APP_SAAS_MODE_ENABLED` | hi-events | false | Single-tenant self-hosted mode |
| `AWS_SECRET_ACCESS_KEY` | hi-events | (secret) | Bucket secret key |
| `FILESYSTEM_PUBLIC_DISK` | hi-events | public | Uploaded images stay on the volume |
| `FILESYSTEM_PRIVATE_DISK` | hi-events | s3-private | Exports go to object storage |
| `APP_DISABLE_REGISTRATION` | hi-events | true | Closes public sign-up |
| `APP_PLATFORM_SUPPORT_EMAIL` | hi-events | support@example.com | Shown in support links |
| `AWS_USE_PATH_STYLE_ENDPOINT` | hi-events | true | Required for browser-facing signed URLs |
| `APP_STRIPE_CONNECT_ACCOUNT_TYPE` | hi-events | express | Stripe Connect onboarding type |
| `AWS_RESPONSE_CHECKSUM_VALIDATION` | hi-events | when_required | Allows streamed downloads |
| `PORT` | hi-events-worker | 8080 | Liveness server port, no public domain |
| `APP_ENV` | hi-events-worker | production | Laravel environment |
| `APP_KEY` | hi-events-worker | - | Must match the web service exactly |
| `APP_URL` | hi-events-worker | - | Public API base URL |
| `APP_NAME` | hi-events-worker | Hi.Events | Application display name |
| `JWT_ALGO` | hi-events-worker | HS256 | JWT signing algorithm |
| `APP_DEBUG` | hi-events-worker | false | Never expose stack traces publicly |
| `LOG_LEVEL` | hi-events-worker | info | Log verbosity |
| `MAIL_HOST` | hi-events-worker | - | Bundled inbox on the private network |
| `MAIL_PORT` | hi-events-worker | 1025 | Mailpit SMTP port |
| `REDIS_URL` | hi-events-worker | - | Redis connection string |
| `JWT_SECRET` | hi-events-worker | (secret) | Must match the web service exactly |
| `APP_CDN_URL` | hi-events-worker | - | Images in queued emails |
| `LOG_CHANNEL` | hi-events-worker | stderr | Send logs to the deploy log |
| `MAIL_MAILER` | hi-events-worker | smtp | Send mail over SMTP |
| `AWS_ENDPOINT` | hi-events-worker | - | Bucket S3 endpoint |
| `CACHE_DRIVER` | hi-events-worker | file | Boot-time cache clear must not flush Redis |
| `DATABASE_URL` | hi-events-worker | - | Postgres connection string |
| `MAIL_AUTO_TLS` | hi-events-worker | false | Bundled listener advertises no STARTTLS |
| `MAIL_PASSWORD` | hi-events-worker | (secret) | No SMTP auth on the bundled inbox |
| `MAIL_USERNAME` | hi-events-worker | (secret) | No SMTP auth on the bundled inbox |
| `MAIL_FROM_NAME` | hi-events-worker | Hi.Events | From name on ticket emails |
| `SESSION_DRIVER` | hi-events-worker | file | Unused by the worker |
| `MAIL_ENCRYPTION` | hi-events-worker | null | Plain SMTP on the private network |
| `APP_FRONTEND_URL` | hi-events-worker | - | Links in queued emails |
| `BROADCAST_DRIVER` | hi-events-worker | log | No websocket broadcaster in use |
| `MAIL_VERIFY_PEER` | hi-events-worker | false | No certificate to verify |
| `PHP_MEMORY_LIMIT` | hi-events-worker | 512M | Headroom for export generation |
| `QUEUE_CONNECTION` | hi-events-worker | redis | Consumes jobs from Redis |
| `AWS_ACCESS_KEY_ID` | hi-events-worker | - | Bucket access key |
| `AWS_PUBLIC_BUCKET` | hi-events-worker | - | Same bucket, unused by default |
| `MAIL_FROM_ADDRESS` | hi-events-worker | tickets@example.com | From address on ticket emails |
| `AWS_DEFAULT_REGION` | hi-events-worker | - | Bucket region |
| `AWS_PRIVATE_BUCKET` | hi-events-worker | - | Bucket exports are written to |
| `CORS_ALLOWED_ORIGINS` | hi-events-worker | * | Unused by the worker, kept in step |
| `APP_SAAS_MODE_ENABLED` | hi-events-worker | false | Single-tenant self-hosted mode |
| `AWS_SECRET_ACCESS_KEY` | hi-events-worker | (secret) | Bucket secret key |
| `FILESYSTEM_PUBLIC_DISK` | hi-events-worker | public | Matches the web service |
| `FILESYSTEM_PRIVATE_DISK` | hi-events-worker | s3-private | Exports go to object storage |
| `APP_DISABLE_REGISTRATION` | hi-events-worker | true | Closes public sign-up |
| `HIEVENTS_DB_WAIT_SECONDS` | hi-events-worker | 600 | Wait for the web service's migrations |
| `APP_PLATFORM_SUPPORT_EMAIL` | hi-events-worker | support@example.com | Shown in support links |
| `AWS_USE_PATH_STYLE_ENDPOINT` | hi-events-worker | true | Required for browser-facing signed URLs |
| `APP_STRIPE_CONNECT_ACCOUNT_TYPE` | hi-events-worker | express | Stripe Connect onboarding type |
| `AWS_RESPONSE_CHECKSUM_VALIDATION` | hi-events-worker | when_required | Allows streamed downloads |
| `PORT` | mailpit | 8025 | Web inbox port, published |
| `MP_UI_AUTH` | mailpit | - | Basic auth on the public inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Ring buffer size |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/storage`
- **Start command:** `/railway/entrypoint.sh worker`
- **Healthcheck:** `/livez`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hi-events-app)
