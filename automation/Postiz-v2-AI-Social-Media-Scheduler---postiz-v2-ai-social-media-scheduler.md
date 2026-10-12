# Deploy Postiz v2 AI Social Media Scheduler on Railway

Schedule posts to X, LinkedIn, Instagram and more. Full Temporal stack.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-v2-ai-social-media-scheduler)

## About

Postiz is an open-source social media scheduler. It plans, schedules and publishes posts to X, LinkedIn, Instagram, Facebook, Threads, YouTube, TikTok, Bluesky, Mastodon and other networks, with optional AI writing help. This community template deploys Postiz v2 on Railway with the full stack it needs, including the Temporal workflow engine.

Postiz v2 is more than a web app with a database. Since v2.12.0 every scheduled post runs as a durable Temporal workflow, so a self-hosted install needs a Temporal server, its persistence, and a visibility store that Postiz queries when posts are edited or deleted. This template runs all of it: the Postiz container (frontend, API and Temporal workers), PostgreSQL, Redis, a single-node Temporal server, Elasticsearch for Temporal visibility, and the Temporal Web UI behind a password. Services talk over Railway's private network. Uploaded media is stored on a volume and served from your Postiz domain, so social networks can fetch it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Temporal | [baranberkay96/postiz-railway](https://github.com/baranberkay96/postiz-railway) (branch: main) (root: /services/temporal) | Worker |
| Temporal UI | [baranberkay96/postiz-railway](https://github.com/baranberkay96/postiz-railway) (branch: main) (root: /services/temporal-ui) | Web service |
| Redis | `redis:8.2` | Database |
| Postiz | `ghcr.io/gitroomhq/postiz-app:v2.25.0` | Web service |
| Elasticsearch | [baranberkay96/postiz-railway](https://github.com/baranberkay96/postiz-railway) (branch: main) (root: /services/elasticsearch) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DB` | Temporal | postgres12 | Temporal SQL plugin for PostgreSQL 12 and newer. |
| `PORT` | Temporal | 7243 | Temporal frontend HTTP API port; tells Railway where to run the healthcheck (gRPC stays on 7233). |
| `DBNAME` | Temporal | temporal | Database for Temporal persistence; created and migrated automatically on every boot. |
| `ES_PWD` | Temporal | - | Elasticsearch password. |
| `DB_PORT` | Temporal | - | Postgres port. |
| `ES_PORT` | Temporal | 9200 | Elasticsearch HTTP port. |
| `ES_USER` | Temporal | (secret) | Elasticsearch user. |
| `ES_SEEDS` | Temporal | - | Elasticsearch host on the private network. |
| `ENABLE_ES` | Temporal | true | Use Elasticsearch as the visibility store, as in the upstream Postiz compose file. |
| `ES_SCHEME` | Temporal | http | Elasticsearch scheme (private network, no TLS). |
| `LOG_LEVEL` | Temporal | info | Temporal server log level (debug, info, warn, error). |
| `BIND_ON_IP` | Temporal | :: | Listen on all IPv4 and IPv6 interfaces for Railway private networking. |
| `ES_VERSION` | Temporal | v8 | Elasticsearch major version expected by Temporal. |
| `ES_VIS_INDEX` | Temporal | temporal_visibility_v1 | Visibility index name; created and upgraded automatically on every boot. |
| `POSTGRES_PWD` | Temporal | - | Postgres password. |
| `POSTGRES_USER` | Temporal | (secret) | Postgres user Temporal connects as. |
| `SQL_MAX_CONNS` | Temporal | 20 | Maximum Postgres connections opened by Temporal. |
| `POSTGRES_SEEDS` | Temporal | - | Postgres host on the private network (shared with Postiz, separate database). |
| `DEFAULT_NAMESPACE` | Temporal | default | Namespace created on boot and used by Postiz. |
| `NUM_HISTORY_SHARDS` | Temporal | 4 | History shard count; fixed at first boot and cannot be changed later without a new database. |
| `TEMPORAL_ALLOW_NO_AUTH` | Temporal | true | No Temporal authorizer: the server has no public domain and is reachable only on the private network. |
| `TEMPORAL_BROADCAST_ADDRESS` | Temporal | 127.0.0.1 | Address this single-node cluster advertises to its own internal services. |
| `DEFAULT_NAMESPACE_RETENTION` | Temporal | 72h | How long closed workflow histories are kept (applies when the namespace is first created). |
| `PORT` | Temporal UI | 8080 | Public port served by Caddy with basic auth in front of the UI. |
| `TEMPORAL_ADDRESS` | Temporal UI | - | Temporal frontend (gRPC) on the private network. |
| `TEMPORAL_UI_PASSWORD` | Temporal UI | (secret) | Basic-auth password for the Temporal UI (generated; see this service's variables). |
| `TEMPORAL_UI_USERNAME` | Temporal UI | (secret) | Basic-auth username for the Temporal UI. |
| `TEMPORAL_CORS_ORIGINS` | Temporal UI | - | Origin allowed by the UI server; update if you add a custom domain. |
| `TEMPORAL_DEFAULT_NAMESPACE` | Temporal UI | - | Namespace opened by default (the one Postiz uses). |
| `TEMPORAL_DISABLE_WRITE_ACTIONS` | Temporal UI | false | Set true to make the UI read-only (no cancel, terminate, reset or signal). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | Postiz | 3000 | Port of the Postiz backend inside the container (nginx on 5000 proxies /api to it); Railway also runs the healthcheck on this port. |
| `MAIN_URL` | Postiz | - | Primary public URL of this Postiz instance (email links, metadata). Update if you add a custom domain. |
| `RUN_CRON` | Postiz | true | Runs scheduled background work (missed-post recovery) in this instance. |
| `API_LIMIT` | Postiz | 30 | Hourly limit of the public API post-creation endpoint (upstream compose value). |
| `REDIS_URL` | Postiz | - | Redis on the private network; family=0 lets ioredis resolve both IPv4 and IPv6. |
| `X_API_KEY` | Postiz | (secret) | Optional: X (Twitter) app API key, needed to connect X accounts. |
| `IS_GENERAL` | Postiz | true | Self-hosted product mode, as set in the upstream docker-compose. |
| `JWT_SECRET` | Postiz | (secret) | Signs session tokens; changing it logs every user out. |
| `DATABASE_URL` | Postiz | - | Postiz database (Prisma) on the private network. |
| `FRONTEND_URL` | Postiz | - | Browser-facing URL; used for OAuth redirect URIs, cookies and public upload links. Update if you add a custom domain. |
| `MASTODON_URL` | Postiz | https://mastodon.social | Optional: Mastodon instance used for the Mastodon provider. |
| `X_API_SECRET` | Postiz | (secret) | Optional: X (Twitter) app API secret. |
| `EMAIL_PROVIDER` | Postiz | - | Optional: resend or nodemailer. Leave empty to auto-activate new accounts without email; setting it turns on email activation. |
| `OPENAI_API_KEY` | Postiz | (secret) | Optional: enables the AI copilot and AI image generation. |
| `RESEND_API_KEY` | Postiz | (secret) | Optional: Resend API key, used when EMAIL_PROVIDER=resend. |
| `THREADS_APP_ID` | Postiz | - | Optional: Threads app ID. |
| `EMAIL_FROM_NAME` | Postiz | - | Optional: sender name for outgoing email. |
| `FACEBOOK_APP_ID` | Postiz | - | Optional: Meta app ID for Facebook pages and Instagram business accounts (via Facebook login). |
| `INSTAGRAM_APP_ID` | Postiz | - | Optional: Instagram app ID for the standalone Instagram login provider. |
| `REDDIT_CLIENT_ID` | Postiz | - | Optional: Reddit app client ID. |
| `STORAGE_PROVIDER` | Postiz | local | Media storage: local volume served at /uploads (Railway Buckets are private and Postiz has no generic S3 option). |
| `TEMPORAL_ADDRESS` | Postiz | - | Temporal frontend (gRPC) on the private network; required since Postiz v2.12.0. |
| `TIKTOK_CLIENT_ID` | Postiz | - | Optional: TikTok app client key. |
| `UPLOAD_DIRECTORY` | Postiz | /uploads | Filesystem path for uploaded media; must match the volume mount and the image's nginx /uploads alias. |
| `YOUTUBE_CLIENT_ID` | Postiz | - | Optional: Google OAuth client ID for YouTube. |
| `EMAIL_FROM_ADDRESS` | Postiz | - | Optional: sender address for outgoing email. |
| `LINKEDIN_CLIENT_ID` | Postiz | - | Optional: LinkedIn app client ID, needed to connect LinkedIn profiles and pages. |
| `MASTODON_CLIENT_ID` | Postiz | - | Optional: Mastodon application client key. |
| `TEMPORAL_NAMESPACE` | Postiz | - | Temporal namespace for Postiz workflows (created by the Temporal service). |
| `THREADS_APP_SECRET` | Postiz | (secret) | Optional: Threads app secret. |
| `FACEBOOK_APP_SECRET` | Postiz | (secret) | Optional: Meta app secret for Facebook and Instagram (via Facebook login). |
| `PINTEREST_CLIENT_ID` | Postiz | - | Optional: Pinterest app ID. |
| `BACKEND_INTERNAL_URL` | Postiz | http://localhost:3000 | URL the frontend server uses to reach the backend inside the same container. |
| `DISABLE_REGISTRATION` | Postiz | true | When true only the first account can sign up (no organization exists yet); set false temporarily to let invited teammates register. |
| `INSTAGRAM_APP_SECRET` | Postiz | (secret) | Optional: Instagram app secret for the standalone Instagram login provider. |
| `REDDIT_CLIENT_SECRET` | Postiz | (secret) | Optional: Reddit app client secret. |
| `TIKTOK_CLIENT_SECRET` | Postiz | (secret) | Optional: TikTok app client secret. |
| `YOUTUBE_CLIENT_SECRET` | Postiz | (secret) | Optional: Google OAuth client secret for YouTube. |
| `LINKEDIN_CLIENT_SECRET` | Postiz | (secret) | Optional: LinkedIn app client secret. |
| `MASTODON_CLIENT_SECRET` | Postiz | (secret) | Optional: Mastodon application client secret. |
| `NEXT_PUBLIC_BACKEND_URL` | Postiz | - | Browser-facing backend URL (served by the built-in nginx under /api). |
| `PINTEREST_CLIENT_SECRET` | Postiz | (secret) | Optional: Pinterest app secret. |
| `NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY` | Postiz | /uploads | Public URL prefix for uploaded media. |
| `PORT` | Elasticsearch | 9200 | Elasticsearch HTTP port; tells Railway where to run the healthcheck. |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms512m -Xmx512m | JVM heap; keep it explicit, otherwise Elasticsearch sizes the heap from the container limit. |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Password of the built-in elastic user (used by Temporal); set once, before the first deploy. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/system-info`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/auth/can-register`
- **Volume:** `/uploads`
- **Healthcheck:** `/_cluster/health?wait_for_status=yellow&timeout=5s`
- **Volume:** `/usr/share/elasticsearch/data`

**Category:** Automation · **Tags:** postiz, social-media, scheduler, marketing, temporal · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/postiz-v2-ai-social-media-scheduler)
