# Deploy Formbricks on Railway

Self-host Formbricks — surveys, NPS, CSAT, responses stay in your Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/formbricks-self-hosted)

## About

Formbricks is an open-source survey and experience management platform — a self-hosted alternative to Typeform, Qualtrics and SurveyMonkey. Build link surveys, in-app and website surveys, NPS and CSAT programmes, and read the results with no per-response ceiling. This template deploys the full v5 stack, Hub included, with every secret generated once and held stable, so the setup wizard is the first thing you see rather than a migration error.

Formbricks v5 is a materially different deployment from v4, and most self-hosting guidance online still describes v4. That gap is where the failures live.

**A three-service stack is a v4 stack.** Formbricks Hub became mandatory for self-hosted v5. Deploy the old app-plus-Postgres-plus-Redis shape, let it pull a `latest` tag that now resolves to v5, and the app starts but cannot do the work the Hub handles. Match architecture to version and pin the tag — Formbricks' own README template broke on this, with users hitting missing-tag errors on both the app and database image.

**Five secrets, all of which must survive redeploys.** `NEXTAUTH_SECRET`, `ENCRYPTION_KEY`, `CRON_SECRET`, `HUB_API_KEY` and `CUBEJS_API_SECRET` are each 32-byte hex, and they fail differently: a changed `ENCRYPTION_KEY` makes 2FA secrets and stored integration credentials undecryptable, while a changed `HUB_API_KEY` silently severs the app from the Hub.

**Without SMTP you have no way back into your own instance.** The setup wizard creates the first admin account without email, so the deploy looks complete. Password reset, verification, invitations and notifications all need SMTP, and you learn that the day someone is locked out. Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` and `MAIL_FROM` before inviting anyone.

**Behind Railway's proxy, every request looks like one IP.** Formbricks reads the client address from forwarded headers, and `TRUSTED_PROXY_HOP_COUNT` says how many proxies to trust. Leave it unset and rate limiting, audit logs and response de-duplication all attribute traffic to the proxy rather than real visitors — a correctness problem that never announces itself.

**File-upload answers need object storage.** Questions that accept files write to local storage by default, which on Railway means a container layer replaced on the next deploy. Configure object storage before publishing a survey with a file question, not after the uploads vanish.

Typical cost: **~$25–40/month** for the full six-service v5 stack at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. Formbricks itself is free and open source, with no cap on responses.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hub | `ghcr.io/formbricks/hub` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cube | [gridalpha/formbricks-railway](https://github.com/gridalpha/formbricks-railway) | Worker |
| Redis | `redis:8.2` | Database |
| hub-worker | `ghcr.io/formbricks/hub` | Worker |
| formbricks | `ghcr.io/formbricks/formbricks` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | hub | 8080 | HTTP listening port |
| `API_KEY` | hub | (secret) | Shared secret with the web app |
| `LOG_LEVEL` | hub | info | Log level |
| `LOG_FORMAT` | hub | json | Structured log output |
| `DATABASE_URL` | hub | - | Same database as Formbricks |
| `DATABASE_MAX_CONNS` | hub | 15 | Postgres connection pool size |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | cube | 4000 | HTTP listening port |
| `CUBEJS_DB_HOST` | cube | - | Postgres private hostname |
| `CUBEJS_DB_NAME` | cube | - | Database name |
| `CUBEJS_DB_PASS` | cube | - | Database password |
| `CUBEJS_DB_PORT` | cube | - | Postgres port |
| `CUBEJS_DB_TYPE` | cube | postgres | Upstream database driver |
| `CUBEJS_DB_USER` | cube | (secret) | Database user |
| `CUBEJS_API_SECRET` | cube | (secret) | Verifies JWTs from the web app |
| `CUBEJS_JWT_ISSUER` | cube | formbricks-web | Required JWT issuer claim |
| `CUBEJS_JWT_AUDIENCE` | cube | formbricks-cube | Required JWT audience claim |
| `CUBEJS_EXTERNAL_DEFAULT` | cube | false | No external pre-aggregations |
| `CUBEJS_DEFAULT_API_SCOPES` | cube | meta,data | Only meta and data endpoints |
| `CUBEJS_CACHE_AND_QUEUE_DRIVER` | cube | memory | Single-replica in-memory driver |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `API_KEY` | hub-worker | (secret) | Shared secret with the web app |
| `LOG_LEVEL` | hub-worker | info | Log level |
| `LOG_FORMAT` | hub-worker | json | Structured log output |
| `DATABASE_URL` | hub-worker | - | Same database as Formbricks |
| `PORT` | formbricks | 3000 | HTTP listening port |
| `LOG_LEVEL` | formbricks | info | Application log level |
| `REDIS_URL` | formbricks | - | Cache, rate limit, queue |
| `S3_REGION` | formbricks | - | Bucket region |
| `WEBAPP_URL` | formbricks | - | Public URL of the instance |
| `CRON_SECRET` | formbricks | (secret) | Authenticates scheduled job endpoints |
| `HUB_API_KEY` | formbricks | (secret) | Shared secret for the Hub API |
| `HUB_API_URL` | formbricks | http://hub.railway.internal:8080 | Private Hub endpoint |
| `DATABASE_URL` | formbricks | - | Postgres connection string |
| `NEXTAUTH_URL` | formbricks | - | Auth callback base, matches WEBAPP_URL |
| `NODE_OPTIONS` | formbricks | --max-old-space-size=2048 | Node heap ceiling |
| `S3_ACCESS_KEY` | formbricks | - | Object storage access key |
| `S3_SECRET_KEY` | formbricks | (secret) | Object storage secret key |
| `CUBEJS_API_URL` | formbricks | http://cube.railway.internal:4000 | Private Cube endpoint |
| `ENCRYPTION_KEY` | formbricks | - | Encrypts 2FA and single-use links |
| `S3_BUCKET_NAME` | formbricks | - | Upload bucket name |
| `NEXTAUTH_SECRET` | formbricks | (secret) | Session signing key |
| `S3_ENDPOINT_URL` | formbricks | - | S3-compatible endpoint |
| `SESSION_MAX_AGE` | formbricks | 604800 | Session lifetime in seconds |
| `AUDIT_LOG_ENABLED` | formbricks | 1 | Write audit log through Redis |
| `CUBEJS_API_SECRET` | formbricks | (secret) | Signs JWTs sent to Cube |
| `CUBEJS_JWT_ISSUER` | formbricks | formbricks-web | Expected JWT issuer claim |
| `CUBEJS_JWT_AUDIENCE` | formbricks | formbricks-cube | Expected JWT audience claim |
| `S3_FORCE_PATH_STYLE` | formbricks | 1 | Use path-style addressing |
| `PASSWORD_RESET_DISABLED` | formbricks | (secret) | Set 0 once SMTP is configured |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/formbricks-self-hosted)
