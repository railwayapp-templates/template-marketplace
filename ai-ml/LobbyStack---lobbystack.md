# Deploy LobbyStack on Railway

Open-source AI receptionist that answers calls and books appointments.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobbystack)

## About

LobbyStack answers your business calls with an AI voice agent and books appointments while the caller is still on the line. Transcripts, recordings and follow-up texts land in a dashboard your team can check later. The code is MIT licensed, so you can rebrand it and sell it to your own clients.

The template deploys these services:

- **admin**: dashboard and API, on a public domain
- **voice-gateway**: connects Twilio calls to OpenAI Realtime, on a public domain
- **worker**: follow-ups and scheduled jobs
- **migrate**: updates the database on each deploy, then exits
- **Postgres** with pgvector and **Redis**, each on a volume, plus a bucket for recordings

Railway generates every password and secret at deploy. You enter an OpenAI API key and your Twilio credentials. Then open the admin domain, create your account and pick a phone number. LobbyStack buys the number on your Twilio account and points its webhooks at the voice gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | [lobbystack/lobbystack](https://github.com/lobbystack/lobbystack) | Worker |
| admin | [lobbystack/lobbystack](https://github.com/lobbystack/lobbystack) | Web service |
| voice-gateway | [lobbystack/lobbystack](https://github.com/lobbystack/lobbystack) | Web service |
| migrate | [lobbystack/lobbystack](https://github.com/lobbystack/lobbystack) | Worker |
| Redis | `redis:7-alpine` | Database |
| Postgres | `pgvector/pgvector:pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | worker | 3002 | Port the service listens on. |
| `NODE_ENV` | worker | production | Node.js environment. Keep as production. |
| `REDIS_URL` | worker | - | Redis connection for queues and realtime events. |
| `S3_BUCKET` | worker | - | Bucket name for recordings and uploads. |
| `S3_REGION` | worker | - | Bucket region. |
| `S3_ENDPOINT` | worker | - | Bucket S3 endpoint. |
| `APP_BASE_URL` | worker | - | Public URL of the dashboard. |
| `DATABASE_URL` | worker | - | PostgreSQL connection for this service's main role. |
| `REDIS_PREFIX` | worker | lobbystack | Prefix for Redis keys. |
| `ENCRYPTION_KEY` | worker | - | Encrypts stored credentials. Generated at deploy. |
| `OPENAI_API_KEY` | worker | (secret) | OpenAI API key for voice calls and chat. Create one at platform.openai.com/api-keys. |
| `DEPLOYMENT_MODE` | worker | self_hosted_standard | LobbyStack deployment mode. Keep as self_hosted_standard. |
| `OTP_HASH_SECRET` | worker | (secret) | Hashes one-time codes. Generated at deploy. |
| `S3_ACCESS_KEY_ID` | worker | - | Bucket access key. |
| `STORAGE_PROVIDER` | worker | s3 | File storage backend. Uses the Railway bucket. |
| `TWILIO_AUTH_TOKEN` | worker | (secret) | Your Twilio Auth Token, from the Twilio Console home page. |
| `TWILIO_ACCOUNT_SID` | worker | - | Your Twilio Account SID, from the Twilio Console home page. |
| `S3_FORCE_PATH_STYLE` | worker | false | Use path-style bucket URLs. |
| `S3_SECRET_ACCESS_KEY` | worker | (secret) | Bucket secret key. |
| `INTERNAL_SERVICE_TOKEN` | worker | (secret) | Authenticates internal routes. Generated at deploy. |
| `INTERNAL_SERVICE_SECRET` | worker | (secret) | Signs requests between services. Generated at deploy. |
| `TWILIO_STATUS_CALLBACK_URL` | worker | - | Twilio webhook for call and message status. |
| `LOBBYSTACK_DISPATCHER_PASSWORD` | worker | (secret) | Password for the lobbystack_dispatcher database role. |
| `PORT` | admin | 3000 | Port the service listens on. |
| `HOSTNAME` | admin | :: | Address the server binds to. :: accepts IPv4 and IPv6. |
| `NODE_ENV` | admin | production | Node.js environment. Keep as production. |
| `SITE_URL` | admin | - | Public URL used in links and emails. |
| `REDIS_URL` | admin | - | Redis connection for queues and realtime events. |
| `S3_BUCKET` | admin | - | Bucket name for recordings and uploads. |
| `S3_REGION` | admin | - | Bucket region. |
| `S3_ENDPOINT` | admin | - | Bucket S3 endpoint. |
| `APP_BASE_URL` | admin | - | Public URL of the dashboard. |
| `DATABASE_URL` | admin | - | PostgreSQL connection for this service's main role. |
| `REDIS_PREFIX` | admin | lobbystack | Prefix for Redis keys. |
| `ENCRYPTION_KEY` | admin | - | Encrypts stored credentials. Generated at deploy. |
| `OPENAI_API_KEY` | admin | (secret) | OpenAI API key for voice calls and chat. Create one at platform.openai.com/api-keys. |
| `DEPLOYMENT_MODE` | admin | self_hosted_standard | LobbyStack deployment mode. Keep as self_hosted_standard. |
| `OTP_HASH_SECRET` | admin | (secret) | Hashes one-time codes. Generated at deploy. |
| `S3_ACCESS_KEY_ID` | admin | - | Bucket access key. |
| `STORAGE_PROVIDER` | admin | s3 | File storage backend. Uses the Railway bucket. |
| `TWILIO_AUTH_TOKEN` | admin | (secret) | Your Twilio Auth Token, from the Twilio Console home page. |
| `BETTER_AUTH_SECRET` | admin | (secret) | Signs sessions. Generated at deploy. |
| `TWILIO_ACCOUNT_SID` | admin | - | Your Twilio Account SID, from the Twilio Console home page. |
| `S3_FORCE_PATH_STYLE` | admin | false | Use path-style bucket URLs. |
| `AUTH_TRUSTED_ORIGINS` | admin | - | Origins allowed to sign in. |
| `S3_SECRET_ACCESS_KEY` | admin | (secret) | Bucket secret key. |
| `WIDGET_SESSION_SECRET` | admin | (secret) | Signs website widget sessions. Generated at deploy. |
| `INTERNAL_SERVICE_TOKEN` | admin | (secret) | Authenticates internal routes. Generated at deploy. |
| `TWILIO_SMS_WEBHOOK_URL` | admin | - | Twilio webhook for incoming texts. |
| `INTERNAL_SERVICE_SECRET` | admin | (secret) | Signs requests between services. Generated at deploy. |
| `LOBBYSTACK_AUTH_PASSWORD` | admin | (secret) | Password for the lobbystack_auth database role. |
| `NUMBER_CLAIM_TOKEN_SECRET` | admin | (secret) | Signs phone number claim links. Generated at deploy. |
| `LOBBYSTACK_WORKER_PASSWORD` | admin | (secret) | Password for the lobbystack_worker database role. |
| `REQUIRE_EMAIL_VERIFICATION` | admin | false | Require email verification before sign-in. Needs SMTP. |
| `TWILIO_STATUS_CALLBACK_URL` | admin | - | Twilio webhook for call and message status. |
| `NEXT_PUBLIC_WEB_CALL_ENDPOINT` | admin | - | Browser endpoint for website voice calls. |
| `BETTER_AUTH_USE_SECURE_COOKIES` | admin | true | Use secure cookies over HTTPS. |
| `LOBBYSTACK_DISPATCHER_PASSWORD` | admin | (secret) | Password for the lobbystack_dispatcher database role. |
| `SEND_VERIFICATION_EMAIL_ON_SIGNUP` | admin | false | Send a verification email at sign-up. Needs SMTP. |
| `PORT` | voice-gateway | 3001 | Port the service listens on. |
| `NODE_ENV` | voice-gateway | production | Node.js environment. Keep as production. |
| `REDIS_URL` | voice-gateway | - | Redis connection for queues and realtime events. |
| `APP_BASE_URL` | voice-gateway | - | Public URL of the dashboard. |
| `REDIS_PREFIX` | voice-gateway | lobbystack | Prefix for Redis keys. |
| `OPENAI_API_KEY` | voice-gateway | (secret) | OpenAI API key for voice calls and chat. Create one at platform.openai.com/api-keys. |
| `DEPLOYMENT_MODE` | voice-gateway | self_hosted_standard | LobbyStack deployment mode. Keep as self_hosted_standard. |
| `TWILIO_AUTH_TOKEN` | voice-gateway | (secret) | Your Twilio Auth Token, from the Twilio Console home page. |
| `TWILIO_ACCOUNT_SID` | voice-gateway | - | Your Twilio Account SID, from the Twilio Console home page. |
| `BACKEND_INTERNAL_URL` | voice-gateway | - | Private URL of the admin service. |
| `INTERNAL_SERVICE_TOKEN` | voice-gateway | (secret) | Authenticates internal routes. Generated at deploy. |
| `VOICE_GATEWAY_BASE_URL` | voice-gateway | - | Public URL of the voice gateway, used by Twilio. |
| `INTERNAL_SERVICE_SECRET` | voice-gateway | (secret) | Signs requests between services. Generated at deploy. |
| `WEB_CALL_ALLOWED_ORIGINS` | voice-gateway | - | Extra browser origins allowed to start web calls. |
| `VOICE_GATEWAY_TRUST_PROXY` | voice-gateway | true | Trust Railway's proxy headers. |
| `NODE_ENV` | migrate | production | Node.js environment. Keep as production. |
| `DATABASE_URL` | migrate | - | Superuser connection that runs migrations. |
| `LOBBYSTACK_APP_PASSWORD` | migrate | (secret) | Password for the lobbystack_app database role. |
| `LOBBYSTACK_AUTH_PASSWORD` | migrate | (secret) | Password for the lobbystack_auth database role. |
| `LOBBYSTACK_WORKER_PASSWORD` | migrate | (secret) | Password for the lobbystack_worker database role. |
| `LOBBYSTACK_MIGRATOR_PASSWORD` | migrate | (secret) | Password for the lobbystack_migrator database role. |
| `LOBBYSTACK_READONLY_PASSWORD` | migrate | (secret) | Password for the lobbystack_readonly database role. |
| `LOBBYSTACK_DISPATCHER_PASSWORD` | migrate | (secret) | Password for the lobbystack_dispatcher database role. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password. Generated at deploy. |
| `POSTGRES_DB` | Postgres | lobbystack | Database name. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL superuser password. Generated at deploy. |
| `LOBBYSTACK_APP_PASSWORD` | Postgres | (secret) | Password for the lobbystack_app database role. |
| `LOBBYSTACK_AUTH_PASSWORD` | Postgres | (secret) | Password for the lobbystack_auth database role. |
| `LOBBYSTACK_WORKER_PASSWORD` | Postgres | (secret) | Password for the lobbystack_worker database role. |
| `LOBBYSTACK_MIGRATOR_PASSWORD` | Postgres | (secret) | Password for the lobbystack_migrator database role. |
| `LOBBYSTACK_READONLY_PASSWORD` | Postgres | (secret) | Password for the lobbystack_readonly database role. |
| `LOBBYSTACK_DISPATCHER_PASSWORD` | Postgres | (secret) | Password for the lobbystack_dispatcher database role. |

## Configuration

- **Healthcheck:** `/health/ready`
- **Healthcheck:** `/api/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'node_modules/.bin/tsx dist/cli.js migrate && node_modules/.bin/tsx dist/cli.js bootstrap && node_modules/.bin/tsx dist/cli.js check && VERIFY_RLS_BEHAVIOR=true node_modules/.bin/tsx dist/cli.js verify-rls'`
- **Start command:** `sh -c 'exec redis-server --bind :: 0.0.0.0 --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, Astro, MDX, JavaScript, PLpgSQL, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/lobbystack)
