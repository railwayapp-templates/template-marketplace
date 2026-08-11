# Deploy Evolution API | Open Source WhatsApp API on Railway

Self-hosted WhatsApp REST API with Postgres, Redis and webhooks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-whatsapp-api)

## About

Evolution API is an open-source REST API for WhatsApp. You link a number by scanning a QR code, then send and receive messages, media, groups and status updates over plain HTTP, with webhooks for everything that arrives. This template deploys it with PostgreSQL and Redis, fully configured.

Three services, all from official upstream images:

- **EvolutionAPI** — the REST API and the built-in web manager at `/manager`. Public domain, healthcheck, and a 64-character master key generated on deploy.
- **Postgres** — instances, session credentials, contacts, chats and message history, on a volume.
- **Redis** — cache, deliberately without a volume: a Redis container cannot write to a Railway volume, and the way it fails is to stop accepting writes altogether rather than to lose the disk quietly. Nothing here needs to survive a restart — the session credentials are in Postgres. Private network only; there is no public port pointed at it.

Every variable is filled in and described on the deploy screen. There is nothing you have to type to get a working instance.

Three things this template does that are worth knowing about:

**It waits for the database before migrating.** Evolution API runs Prisma migrations as the first thing it does, and exits if Postgres is not answering yet — and the script that runs them swallows the real error, so all you see is `Migration failed`. It is the most reported startup problem in the upstream project (issues #2529, #2605), and on a platform where services start in parallel it would hit the very first deploy. The start command here waits for the database first, and the service is allowed enough restarts to survive a database restart later on.

**It pins a released version.** The image is `v2.3.7`, the newest stable release. The `latest` tag is not that: it was rebuilt from an unreleased commit and matches no published version, and `2.4.0-rc1` / `rc2` are release candidates. A floating tag on a service holding live WhatsApp sessions is a re-scan of every QR code waiting to happen.

**It does not import your entire chat history.** Upstream defaults `DATABASE_SAVE_DATA_HISTORIC` to on, which pulls the full prior conversation history of every number that connects. On a metered volume that is the difference between a database that grows with your traffic and one that arrives full on day one. It is off here and documented, so turning it back on is one variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:18.4-alpine` | Database |
| EvolutionAPI | `evoapicloud/evolution-api:v2.3.7` | Web service |
| Redis | `redis:8.10.0-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Postgres | 5432 | Port Postgres listens on inside the private network. |
| `POSTGRES_DB` | Postgres | evolution | Database created on first boot. Must match the database name in DATABASE_CONNECTION_URI. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser role created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated once on deploy. Changing it here does not change it in the database. |
| `TZ` | EvolutionAPI | UTC | Container timezone. The image bakes in America/Sao_Paulo, which shifts every timestamp the API prints. |
| `PORT` | EvolutionAPI | 8080 | Port Railway routes public traffic and healthchecks to. Must match SERVER_PORT — the application itself never reads PORT. |
| `LANGUAGE` | EvolutionAPI | en | Language of API messages, for example en or pt-BR. |
| `LOG_COLOR` | EvolutionAPI | false | ANSI colours in the log. Off, because Railway's log viewer shows them as escape sequences. |
| `LOG_LEVEL` | EvolutionAPI | ERROR,WARN,INFO,LOG | Which log channels to print. Upstream turns on every one of them including VERBOSE and WEBSOCKET, which on Railway hits the per-deployment log rate limit and drops the lines that matter. Add DEBUG and VERBOSE while troubleshooting. |
| `S3_ENABLED` | EvolutionAPI | - | Set to true to store received media in S3-compatible storage instead of fetching it from WhatsApp on demand. Needs S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET and S3_ENDPOINT alongside it. |
| `SERVER_URL` | EvolutionAPI | - | Public URL of this API. It goes into every webhook payload and QR-code callback, so it has to be the address clients actually reach — with the scheme. |
| `LOG_BAILEYS` | EvolutionAPI | error | Log level of the WhatsApp library itself: fatal, error, warn, info, debug or trace. |
| `SERVER_PORT` | EvolutionAPI | 8080 | Port the API binds. Must match PORT. |
| `SERVER_TYPE` | EvolutionAPI | http | The API speaks plain HTTP; Railway terminates TLS in front of it. Setting this to https makes the app look for certificate files that are not there. |
| `DB_WAIT_HOST` | EvolutionAPI | - | Read by the start command, not by the application: the API runs database migrations on boot and exits if Postgres is not answering yet, so it waits for this host first. |
| `DB_WAIT_PORT` | EvolutionAPI | 5432 | Port checked by that same wait loop. |
| `DEL_INSTANCE` | EvolutionAPI | false | Minutes of inactivity after which a disconnected instance is dropped from memory, or false to never drop it. Off here — the alternative silently disconnects a number that simply had a quiet day. |
| `QRCODE_LIMIT` | EvolutionAPI | 30 | How many times a QR code is regenerated before the connection attempt gives up. |
| `CACHE_REDIS_TTL` | EvolutionAPI | 604800 | Cache lifetime in seconds (7 days). |
| `CACHE_REDIS_URI` | EvolutionAPI | - | Connection string for the Redis service on the private network. The trailing number is the Redis database index. |
| `DATABASE_PROVIDER` | EvolutionAPI | postgresql | Database engine. Changing it means changing the connection URI and the migration set with it. |
| `TELEMETRY_ENABLED` | EvolutionAPI | false | Send usage data to the upstream project. Off here; set to true to opt back in. |
| `WEBHOOK_GLOBAL_URL` | EvolutionAPI | - | The URL those global events are posted to. |
| `CACHE_LOCAL_ENABLED` | EvolutionAPI | false | In-process cache. Redundant while Redis is on, and it does not survive a deploy. |
| `CACHE_REDIS_ENABLED` | EvolutionAPI | true | Use Redis for caching. Turning this off makes the Redis service dead weight. |
| `AUTHENTICATION_API_KEY` | EvolutionAPI | (secret) | The master key for the whole API — it creates instances and reads every message. Sent as the `apikey` header. Generated once on deploy; treat it like a password. |
| `CACHE_REDIS_PREFIX_KEY` | EvolutionAPI | evolution | Key prefix, so two installations can share one Redis. |
| `SERVER_DISABLE_MANAGER` | EvolutionAPI | - | Set to true to switch off the built-in web manager at /manager and leave only the REST API. |
| `WEBHOOK_GLOBAL_ENABLED` | EvolutionAPI | - | Set to true to send every instance's events to one URL. Requires WEBHOOK_GLOBAL_URL. |
| `DATABASE_CONNECTION_URI` | EvolutionAPI | - | Postgres connection string. Prisma reads this variable directly, which is why no separate DATABASE_URL exists. Do not add a ?schema= parameter — that is what the open upstream migration reports have in common. |
| `DATABASE_DELETE_MESSAGE` | EvolutionAPI | true | Remove messages from the database when they are deleted on WhatsApp. |
| `DATABASE_SAVE_DATA_CHATS` | EvolutionAPI | true | Store the chat list of connected numbers. |
| `CONFIG_SESSION_PHONE_NAME` | EvolutionAPI | Chrome | Browser shown next to it: Chrome, Firefox, Edge, Opera or Safari. |
| `DATABASE_SAVE_DATA_LABELS` | EvolutionAPI | true | Store WhatsApp Business labels. |
| `CACHE_REDIS_SAVE_INSTANCES` | EvolutionAPI | false | Keeps session credentials in Postgres rather than Redis. Redis here is a cache by intent; Postgres is what gets backed up. |
| `CONFIG_SESSION_PHONE_CLIENT` | EvolutionAPI | Evolution API | Name shown on the phone under Linked Devices. |
| `DATABASE_SAVE_DATA_CONTACTS` | EvolutionAPI | true | Store the contact list of connected numbers. |
| `DATABASE_SAVE_DATA_HISTORIC` | EvolutionAPI | false | Import the entire past conversation history of every number that connects. Upstream ships this on; here it is off, because on a metered volume it is the difference between a database that grows with your traffic and one that arrives full the day someone links a busy account. |
| `DATABASE_SAVE_DATA_INSTANCE` | EvolutionAPI | true | Do not turn this off. Besides storing instances, this is the flag that puts WhatsApp session credentials in Postgres — with it off and no other store configured, no number can connect at all. |
| `DATABASE_SAVE_IS_ON_WHATSAPP` | EvolutionAPI | true | Cache which numbers are registered on WhatsApp, so repeat checks cost nothing. |
| `DATABASE_SAVE_MESSAGE_UPDATE` | EvolutionAPI | true | Store delivery and read receipts. |
| `DATABASE_SAVE_DATA_NEW_MESSAGE` | EvolutionAPI | true | Store incoming messages. Turn off if you only send. |
| `DATABASE_CONNECTION_CLIENT_NAME` | EvolutionAPI | evolution | Separates one installation from another when several share a database. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | EvolutionAPI | true | Required on Alpine-based images for *.railway.internal to resolve at all. |
| `DATABASE_SAVE_IS_ON_WHATSAPP_DAYS` | EvolutionAPI | 7 | How long that cache stays valid, in days. |
| `AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES` | EvolutionAPI | true | Include each instance's own token in fetchInstances responses. That endpoint already requires the master key. |
| `PORT` | Redis | 6379 | Port Redis listens on inside the private network. Reachable only from this project — there is no public proxy. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `bash -c 'for i in $(seq 1 90); do (echo > /dev/tcp/$DB_WAIT_HOST/$DB_WAIT_PORT) 2>/dev/null && break; echo "waiting for postgres ($i/90)"; sleep 2; done; . ./Docker/scripts/deploy_database.sh && exec npm run start:prod'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/evolution-whatsapp-api)
