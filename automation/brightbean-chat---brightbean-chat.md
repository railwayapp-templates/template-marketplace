# Deploy brightbean-chat on Railway

Open-source ManyChat alternative. Self-hosted chat-marketing automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/brightbean-chat)

## About

BrightBean Chat is an open-source, self-hostable alternative to ManyChat. You
get a visual flow builder, a shared inbox, broadcasts, sequences and analytics
across Telegram, Instagram, Messenger, WhatsApp, SMS and email. It runs on
Django 5, HTMX and PostgreSQL. No Redis, no message broker, no aggregator
sitting between you and the platforms.

This template deploys the whole stack: A Postgres database, the web service,
and the background worker that runs everything time-based.

The app runs as two long-lived processes against one database. `web` serves
pages, the API and the webhook endpoints. `worker` claims and runs the queue:
Smart Delay steps, follow-up timers, send retries, sequences, broadcast fanout
and hourly housekeeping.

Both are required. With only `web` running, nothing errors. Inbound messages
still get answered inline. But every scheduled action sits in the queue with a
due time in the past, and you won't find out until someone asks why the
follow-up never went.

Postgres is the only datastore. It is also the task queue, the lock manager and
the rate limiter, so there is nothing else to run. Migrations are applied before
each deploy of `web`. Uploaded media and queued contact-import files go to
object storage, because the two services do not share a filesystem.

Webhooks are why the public domain matters. Telegram, Meta and Twilio all
deliver events by POSTing to an HTTPS URL you register with them. A deployment
that is not publicly reachable can send messages but will never receive one.

After the first deploy:

1. Create the first account at `/accounts/signup/`. Email verification is
   optional, so you can sign in straight away.
2. Connect a channel in Settings, then register the webhook URL with that
   platform.
3. Back up `SECRET_KEY` and `ENCRYPTION_KEY_SALT`. They are generated for you,
   and they decrypt the channel credentials in your database. A dump without
   them is unreadable.
4. If you attach a custom domain, update `ALLOWED_HOSTS` and `APP_URL`. Do it
   before inviting your team: The domain that appears in account emails is
   written once, on the first deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [brightbeanxyz/brightbean-chat](https://github.com/brightbeanxyz/brightbean-chat) | Web service |
| worker | [brightbeanxyz/brightbean-chat](https://github.com/brightbeanxyz/brightbean-chat) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_URL` | web | - | The public origin, with https://. Links in emails and media URLs are built from it. Update it when you attach a custom domain. |
| `SECRET_KEY` | web | (secret) | Generated for you. Signs sessions and derives the credential-encryption key. Back it up and never rotate it. |
| `DATABASE_URL` | web | - | Postgres connection string, referenced from the database in this template. Leave as-is. |
| `ALLOWED_HOSTS` | web | * | Hostnames the app answers on. Includes healthcheck.railway.app, which the deploy probe needs. Add custom domains here. |
| `S3_BUCKET_NAME` | web | - | Your private bucket for uploaded media and contact imports. The bucket name, not a URL. |
| `S3_REGION_NAME` | web | auto | auto for R2 and most S3-compatible providers. AWS S3 needs a real region. |
| `DJANGO_ENV_FILE` | web | /nonexistent | Points at a path that does not exist, so these variables are the only configuration. Leave as-is. |
| `S3_ENDPOINT_URL` | web | - | R2: https://<ACCOUNT_ID>.r2.cloudflarestorage.com, no bucket in the path. Empty for AWS S3. |
| `STORAGE_BACKEND` | web | S3 | Keep s3. Web and worker have separate filesystems, so local loses media and breaks imports. |
| `TRUSTED_PROXIES` | web | 127.0.0.1/32,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16 | Peers allowed to set X-Forwarded-For. Prefilled for Railway. Empty breaks per-caller rate limiting. |
| `S3_ACCESS_KEY_ID` | web | - | Access key for the bucket. |
| `ENCRYPTION_KEY_SALT` | web | - | Generated for you. You need it to decrypt a database backup, so store it with SECRET_KEY. |
| `S3_SECRET_ACCESS_KEY` | web | (secret) | Secret key for the bucket. |
| `DJANGO_SETTINGS_MODULE` | web | config.settings.production | Django settings module. Leave as-is. Other values turn off the production security settings. |
| `PLATFORM_WHATSAPP_CLIENT_ID` | web | - | WhatsApp Cloud API: the App ID of the Meta app with the WhatsApp product. |
| `PLATFORM_INSTAGRAM_CLIENT_ID` | web | - | Instagram: the Instagram app ID, from the Meta app's Instagram product — not the outer app's ID. |
| `PLATFORM_MESSENGER_CLIENT_ID` | web | - | Facebook Messenger: the Meta app's App ID. Leave blank if you are not connecting Facebook pages. |
| `PLATFORM_WHATSAPP_VERIFY_TOKEN` | web | (secret) | Any long random string. Paste it into the WhatsApp webhook's Verify token field. |
| `PLATFORM_INSTAGRAM_VERIFY_TOKEN` | web | (secret) | Any long random string. Paste it into Instagram → Webhooks → Verify token. |
| `PLATFORM_MESSENGER_VERIFY_TOKEN` | web | (secret) | Any long random string. Paste the same value into Messenger → Settings → Webhooks → Verify token. |
| `PLATFORM_WHATSAPP_CLIENT_SECRET` | web | (secret) | 	The same app's App Secret. Required alongside the App ID. |
| `PLATFORM_INSTAGRAM_CLIENT_SECRET` | web | (secret) | The matching Instagram app secret. Required alongside the ID. |
| `PLATFORM_MESSENGER_CLIENT_SECRET` | web | (secret) | The same app's App Secret. Required alongside the App ID — one without the other disables Messenger. |
| `APP_URL` | worker | - | Referenced from web. The origin for links in queued messages and emails. |
| `SECRET_KEY` | worker | (secret) | Referenced from web and must match it, or the worker cannot decrypt stored credentials. |
| `DATABASE_URL` | worker | - | Same database as web, referenced from the template. Leave as-is. |
| `ALLOWED_HOSTS` | worker | - | Referenced from web. The worker serves no HTTP, but Django needs it set. |
| `S3_BUCKET_NAME` | worker | - | Referenced from web. Must be the same bucket, or the worker cannot read its uploads. |
| `S3_REGION_NAME` | worker | - | Referenced from web. Leave as-is. |
| `DJANGO_ENV_FILE` | worker | /nonexistent | Keeps these variables the only configuration source. Leave as-is. |
| `S3_ENDPOINT_URL` | worker | - | Referenced from web. Leave as-is. |
| `STORAGE_BACKEND` | worker | s3 | Keep s3, matching web, or queued contact imports cannot find the uploaded file. |
| `S3_ACCESS_KEY_ID` | worker | - | Referenced from web. Leave as-is. |
| `ENCRYPTION_KEY_SALT` | worker | - | Referenced from web and must match it, or encrypted fields are unreadable here. |
| `S3_SECRET_ACCESS_KEY` | worker | (secret) | Referenced from web. Leave as-is. |
| `DJANGO_SETTINGS_MODULE` | worker | config.settings.production | Django settings module. Leave as-is. |
| `PLATFORM_WHATSAPP_CLIENT_ID` | worker | - | WhatsApp Cloud API: the App ID of the Meta app with the WhatsApp product. |
| `PLATFORM_INSTAGRAM_CLIENT_ID` | worker | - | Instagram: the Instagram app ID, from the Meta app's Instagram product — not the outer app's ID. |
| `PLATFORM_MESSENGER_CLIENT_ID` | worker | - | Facebook Messenger: the Meta app's App ID. Leave blank if you are not connecting Facebook pages. |
| `PLATFORM_WHATSAPP_CLIENT_SECRET` | worker | (secret) | The same app's App Secret. Required alongside the App ID. |
| `PLATFORM_INSTAGRAM_CLIENT_SECRET` | worker | (secret) | The matching Instagram app secret. Required alongside the ID. |
| `PLATFORM_MESSENGER_CLIENT_SECRET` | worker | (secret) | The same app's App Secret. Required alongside the App ID — one without the other disables Messenger. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `python manage.py process_tasks`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Python, HTML, TypeScript, CSS, Shell, Dockerfile, Makefile, JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/brightbean-chat)
