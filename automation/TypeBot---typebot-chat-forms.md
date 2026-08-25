# Deploy TypeBot on Railway

Open source conversational form builder, self-hosted on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typebot-chat-forms)

## About

Typebot is an open-source conversational form builder. Instead of a page of input boxes, you design a chat that asks one question at a time on a drag-and-drop canvas, then publish it as a hosted page, an embedded bubble, a popup or a React component. Every answer becomes a variable, so later steps can branch on earlier ones, call your API, write to Google Sheets or ask an LLM — which is what separates it from a static form tool.

Self-host Typebot on Railway and you get the whole product, with no response caps and no per-seat billing. This template runs both halves as upstream intends: the **builder** (`baptistearno/typebot-builder`) is the authenticated editor, API and results dashboard, and the **viewer** (`baptistearno/typebot-viewer`) is the public runtime your visitors chat with. Behind them sit **Postgres**, **Redis**, a **Mailpit** inbox so login codes work the moment the deploy finishes, a **storage bucket** for uploaded media, and a **files** gateway serving that bucket's public assets.

![Typebot builder, viewer, file gateway, Mailpit, Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787463100/typebot-architecture.png)

Typebot is two Next.js applications over one Postgres database, which is why the template runs them as separate services. The builder holds everything private — the canvas, your integration credentials, the results table and the API — and only signed-in users reach it. The viewer holds nothing private; it serves published bots and writes answers to the same database, so a bot on a busy site scales independently of your editor.

Key capabilities:

- **Input blocks** for text, email, phone, number, date, buttons, picture choice, rating, file upload and Stripe payments
- **Logic blocks** — conditions, variables, scripting, redirects, jumps — so a bot branches on any earlier answer
- **Integrations** with OpenAI and other LLM providers, Google Sheets, Zapier, Make and HTTP requests
- **Embeds** as container, bubble or popup, plus React, Next.js, WordPress, Webflow and Shopify
- **Theming** to fonts, colours, avatars and CSS, and **results** with completion rates and CSV export

Each supporting service does one job. Postgres stores bots, published versions, sessions and answers. Redis backs the per-IP throttle on sign-in requests; without it that throttle silently does not exist. Mailpit makes passwordless login work with no external setup. The bucket holds uploaded media, and the files service signs reads of it so browsers load public bot media without the bucket being open.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| viewer | `baptistearno/typebot-viewer:3.18.0` | Web service |
| builder | `baptistearno/typebot-builder:3.18.0` | Web service |
| Redis | `redis:8.2` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| files | [gridalpha/typebot-railway](https://github.com/gridalpha/typebot-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | viewer | 3000 | HTTP port Next.js listens on |
| `S3_SSL` | viewer | true | Use TLS to reach the bucket |
| `REDIS_URL` | viewer | - | Redis for rate limiting |
| `S3_BUCKET` | viewer | - | Bucket name |
| `S3_REGION` | viewer | us-east-1 | SigV4 signing region |
| `SMTP_HOST` | viewer | - | Mail server hostname |
| `SMTP_PORT` | viewer | 1025 | Mail server port |
| `S3_ENDPOINT` | viewer | - | Bucket endpoint, scheme stripped at boot |
| `SMTP_SECURE` | viewer | false | No implicit TLS on port 1025 |
| `DATABASE_URL` | viewer | - | Postgres connection with pool cap |
| `NEXTAUTH_URL` | viewer | - | Public builder base URL |
| `S3_ACCESS_KEY` | viewer | - | Bucket access key |
| `S3_SECRET_KEY` | viewer | (secret) | Bucket secret key |
| `SMTP_PASSWORD` | viewer | (secret) | Same SMTP password as the builder |
| `SMTP_USERNAME` | viewer | (secret) | SMTP account name |
| `SMTP_IGNORE_TLS` | viewer | true | Skip STARTTLS on the private listener |
| `ENCRYPTION_SECRET` | viewer | (secret) | Must match the builder exactly |
| `KEEP_ALIVE_TIMEOUT` | viewer | 65000 | Keep-alive above the edge idle timeout |
| `NEXT_PUBLIC_SMTP_FROM` | viewer | Typebot <notifications@example.dev> | From name and address |
| `NEXT_PUBLIC_VIEWER_URL` | viewer | - | Public viewer base URL |
| `S3_PUBLIC_CUSTOM_DOMAIN` | viewer | - | Origin serving public bot media |
| `NEXT_PUBLIC_BOT_FILE_UPLOAD_MAX_SIZE` | viewer | 20 | Max respondent upload size in MB |
| `PORT` | builder | 3000 | HTTP port Next.js listens on |
| `S3_SSL` | builder | true | Use TLS to reach the bucket |
| `REDIS_URL` | builder | - | Redis for sign-in rate limiting |
| `S3_BUCKET` | builder | - | Bucket name |
| `S3_REGION` | builder | us-east-1 | SigV4 signing region |
| `SMTP_HOST` | builder | - | Mail server hostname |
| `SMTP_PORT` | builder | 1025 | Mail server port |
| `ADMIN_EMAIL` | builder | admin@example.dev | Owner account; change to your address |
| `S3_ENDPOINT` | builder | - | Bucket endpoint, scheme stripped at boot |
| `SMTP_SECURE` | builder | false | No implicit TLS on port 1025 |
| `DATABASE_URL` | builder | - | Postgres connection with pool cap |
| `NEXTAUTH_URL` | builder | - | Public builder base URL |
| `S3_ACCESS_KEY` | builder | - | Bucket access key |
| `S3_SECRET_KEY` | builder | (secret) | Bucket secret key |
| `SMTP_PASSWORD` | builder | (secret) | SMTP password, shared with Mailpit |
| `SMTP_USERNAME` | builder | (secret) | SMTP account name |
| `DISABLE_SIGNUP` | builder | true | Close public registration |
| `SMTP_IGNORE_TLS` | builder | true | Skip STARTTLS on the private listener |
| `ENCRYPTION_SECRET` | builder | (secret) | 32-char key encrypting stored credentials |
| `KEEP_ALIVE_TIMEOUT` | builder | 65000 | Keep-alive above the edge idle timeout |
| `NEXT_PUBLIC_SMTP_FROM` | builder | Typebot <notifications@example.dev> | From name and address |
| `DEFAULT_WORKSPACE_PLAN` | builder | UNLIMITED | Plan for new workspaces |
| `NEXT_PUBLIC_VIEWER_URL` | builder | - | Public viewer base URL |
| `S3_PUBLIC_CUSTOM_DOMAIN` | builder | - | Origin serving public bot media |
| `NEXT_PUBLIC_BOT_FILE_UPLOAD_MAX_SIZE` | builder | 20 | Max respondent upload size in MB |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Inbox login credentials |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | SMTP credentials Typebot uses |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Bind the inbox on IPv6 |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Bind SMTP on IPv6 |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow auth on the plain listener |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `S3_BUCKET` | files | - | Bucket name |
| `S3_REGION` | files | us-east-1 | SigV4 signing region |
| `S3_ENDPOINT` | files | - | Bucket endpoint |
| `S3_ACCESS_KEY_ID` | files | - | Bucket access key |
| `S3_SECRET_ACCESS_KEY` | files | (secret) | Bucket secret key |

## Configuration

- **Start command:** `/bin/sh -c 'case "$S3_ENDPOINT" in https://*) S3_ENDPOINT="${S3_ENDPOINT#https://}"; S3_SSL=true;; http://*) S3_ENDPOINT="${S3_ENDPOINT#http://}"; S3_SSL=false;; esac; export S3_ENDPOINT S3_SSL; export HOSTNAME=0.0.0.0; exec ./viewer-entrypoint.sh'`
- **Healthcheck:** `/api/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'case "$S3_ENDPOINT" in https://*) S3_ENDPOINT="${S3_ENDPOINT#https://}"; S3_SSL=true;; http://*) S3_ENDPOINT="${S3_ENDPOINT#http://}"; S3_SSL=false;; esac; export S3_ENDPOINT S3_SSL; export HOSTNAME=0.0.0.0; exec ./builder-entrypoint.sh'`
- **Healthcheck:** `/signin`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`

**Category:** Automation · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/typebot-chat-forms)
