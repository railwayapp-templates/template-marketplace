# Deploy NewsBlur on Railway

RSS reader that learns which stories you want to read

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/newsblur)

## About

NewsBlur is a personal news reader that learns what you want to read. It pulls your RSS and Atom subscriptions, shows each story in the original site's layout, and lets you train it on the authors, tags and titles you like or dislike. Developed in the open by Samuel Clay since 2009, it powers newsblur.com and its free mobile apps, and the server is MIT licensed. Self-host NewsBlur for unlimited feeds, a reading history nobody else mines, and a social layer inside your own account.

Deploy NewsBlur on Railway and you get the full production shape. The `newsblur` service is the public origin, splitting one hostname across three backends: `web` runs Django under gunicorn, `node` serves favicons, article extraction and the Socket.IO stream that pushes new stories into an open tab, and `imageproxy` resizes remote images behind an HMAC signature. `tasks` runs the Celery worker that fetches your feeds on a timer. Four data services hold the state: `Postgres` for accounts and subscriptions, `mongodb` for stories and read states, `redis` for unread counts, sessions and the queue, and `elasticsearch` for search.

![Diagram of the NewsBlur services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789254260/newsblur-architecture.webp)

Most feed readers give you headlines and stop there. NewsBlur's idea is training: a thumbs-up or thumbs-down on any author, tag or title teaches a per-feed classifier, and over a few weeks the intelligence slider becomes a real filter.

Key features:

- **Intelligence training** on titles, authors, tags and feeds
- **Original site view** rendering the publisher's page beside the text
- **Full-text search** across every story in every feed you subscribe to
- **Saved stories and tags**, plus saved searches that act like feeds
- **Shared stories and blurblogs** with per-story privacy
- **Story change tracking**, showing how a post was edited after publishing
- **Email newsletters and YouTube channels** as real subscriptions
- **A documented HTTP API** and free iOS, macOS and Android apps

The multi-service shape matters: feed fetching is expensive and runs on its own schedule, so it belongs on `tasks` rather than inside a request, and article extraction and favicons are Node programs upstream ships separately — a slow crawl never blocks a reader.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| newsblur | [gridalpha/newsblur-railway](https://github.com/gridalpha/newsblur-railway) | Web service |
| mongodb | `mongo:5.0` | Database |
| imageproxy | `ghcr.io/willnorris/imageproxy:latest` | Worker |
| tasks | [gridalpha/newsblur-railway](https://github.com/gridalpha/newsblur-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| elasticsearch | `elasticsearch:7.17.28` | Database |
| web | [gridalpha/newsblur-railway](https://github.com/gridalpha/newsblur-railway) | Worker |
| node | [gridalpha/newsblur-railway](https://github.com/gridalpha/newsblur-railway) | Worker |
| redis | `redis:8-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | newsblur | 8080 | Caddy listening port |
| `WEB_UPSTREAM` | newsblur | web.railway.internal:8000 | Django backend |
| `NODE_UPSTREAM` | newsblur | node.railway.internal:8008 | Node servers backend |
| `IMAGEPROXY_UPSTREAM` | newsblur | imageproxy.railway.internal:8088 | Image proxy backend |
| `MONGOHOST` | mongodb | - | Data panel alias, not read by the server |
| `MONGOPORT` | mongodb | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | mongodb | - | Data panel alias, not read by the server |
| `MONGO_URL` | mongodb | - | Private connection string |
| `MONGOPASSWORD` | mongodb | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | mongodb | (secret) | Root password, entrypoint contract |
| `MONGO_INITDB_ROOT_USERNAME` | mongodb | (secret) | Root user created while initializing |
| `PORT` | imageproxy | 8088 | Image proxy listening port |
| `IMAGEPROXY_ADDR` | imageproxy | [::]:8088 | Dual-stack bind address |
| `IMAGEPROXY_CACHE` | imageproxy | memory:128:24h | In-memory cache size and TTL |
| `IMAGEPROXY_TIMEOUT` | imageproxy | 20s | Upstream fetch timeout |
| `IMAGEPROXY_SIGNATUREKEY` | imageproxy | - | Rejects unsigned image URLs |
| `EMAIL_FROM` | tasks | newsblur@localhost | Envelope sender address |
| `EMAIL_HOST` | tasks | - | Optional SMTP relay hostname |
| `EMAIL_PORT` | tasks | 587 | SMTP port |
| `IMAGES_URL` | tasks | /imageproxy | Image proxy path prefix |
| `PYTHONPATH` | tasks | /srv/newsblur | Application import root |
| `REDIS_HOST` | tasks | - | Redis private hostname |
| `SECRET_KEY` | tasks | (secret) | Must match the web service |
| `DOCKERBUILD` | tasks | True | Loads upstream's self-hosted settings base |
| `POSTGRES_DB` | tasks | - | Postgres database name |
| `MONGODB_HOST` | tasks | - | MongoDB host and port |
| `MONGODB_NAME` | tasks | newsblur | Story database name |
| `NEWSBLUR_URL` | tasks | - | Public base URL |
| `POSTGRES_HOST` | tasks | - | Postgres private hostname |
| `POSTGRES_PORT` | tasks | - | Postgres port |
| `POSTGRES_USER` | tasks | (secret) | Postgres role |
| `OPENAI_API_KEY` | tasks | (secret) | Optional; related sites and AI summaries |
| `REDIS_PASSWORD` | tasks | (secret) | Redis password |
| `EMAIL_HOST_USER` | tasks | (secret) | SMTP username |
| `YOUTUBE_API_KEY` | tasks | (secret) | Optional; richer YouTube channel feeds |
| `MONGODB_PASSWORD` | tasks | (secret) | MongoDB password |
| `MONGODB_USERNAME` | tasks | (secret) | MongoDB user |
| `XAI_GROK_API_KEY` | tasks | (secret) | Optional; AI story features |
| `ANTHROPIC_API_KEY` | tasks | (secret) | Optional; AI story features |
| `IMAGES_SECRET_KEY` | tasks | (secret) | Must match the web service |
| `POSTGRES_PASSWORD` | tasks | (secret) | Postgres password |
| `ELASTICSEARCH_HOST` | tasks | - | Search cluster URL |
| `EMAIL_HOST_PASSWORD` | tasks | (secret) | SMTP password |
| `GOOGLE_GEMINI_API_KEY` | tasks | (secret) | Optional; AI story features |
| `NEWSBLUR_AUTO_PREMIUM` | tasks | true | false puts new accounts on the free tier |
| `DJANGO_SETTINGS_MODULE` | tasks | newsblur_web.settings | Django settings module |
| `NEWSBLUR_ADMIN_PASSWORD` | tasks | (secret) | First administrator password |
| `NEWSBLUR_ADMIN_USERNAME` | tasks | (secret) | First administrator username |
| `NEWSBLUR_DAYS_OF_UNREAD` | tasks | 30 | Unread retention for premium accounts |
| `NEWSBLUR_HOMEPAGE_USERNAME` | tasks | (secret) | Blurblog shown to logged-out visitors |
| `NEWSBLUR_DAYS_OF_UNREAD_FREE` | tasks | 14 | Unread retention for free accounts |
| `NEWSBLUR_AUTO_ENABLE_NEW_USERS` | tasks | true | false makes new signups inactive |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | elasticsearch | 9200 | HTTP port probed by the health check |
| `ES_JAVA_OPTS` | elasticsearch | -Xms512m -Xmx1024m | JVM heap bounds |
| `network.host` | elasticsearch | :: | Dual-stack bind for private peers |
| `discovery.type` | elasticsearch | single-node | Skips cluster formation and bootstrap checks |
| `TAKE_FILE_OWNERSHIP` | elasticsearch | true | Chowns the data volume at boot |
| `bootstrap.memory_lock` | elasticsearch | false | mlockall is unavailable in the container |
| `node.store.allow_mmap` | elasticsearch | false | vm.max_map_count is not settable here |
| `xpack.security.enabled` | elasticsearch | false | Private network only, no TLS or realm |
| `indices.breaker.total.use_real_memory` | elasticsearch | false | Circuit breaker off host RSS |
| `cluster.routing.allocation.disk.threshold_enabled` | elasticsearch | false | Small volume, no watermark |
| `PORT` | web | 8000 | Gunicorn listening port |
| `EMAIL_FROM` | web | newsblur@localhost | Envelope sender address |
| `EMAIL_HOST` | web | - | Optional SMTP relay hostname |
| `EMAIL_PORT` | web | 587 | SMTP port |
| `IMAGES_URL` | web | /imageproxy | Image proxy path prefix |
| `PYTHONPATH` | web | /srv/newsblur | Application import root |
| `REDIS_HOST` | web | - | Redis private hostname |
| `SECRET_KEY` | web | (secret) | Django signing key |
| `DOCKERBUILD` | web | True | Loads upstream's self-hosted settings base |
| `POSTGRES_DB` | web | - | Postgres database name |
| `MONGODB_HOST` | web | - | MongoDB host and port |
| `MONGODB_NAME` | web | newsblur | Story database name |
| `NEWSBLUR_URL` | web | - | Public base URL |
| `POSTGRES_HOST` | web | - | Postgres private hostname |
| `POSTGRES_PORT` | web | - | Postgres port |
| `POSTGRES_USER` | web | (secret) | Postgres role |
| `OPENAI_API_KEY` | web | (secret) | Optional; related sites and AI summaries |
| `REDIS_PASSWORD` | web | (secret) | Redis password |
| `EMAIL_HOST_USER` | web | (secret) | SMTP username |
| `YOUTUBE_API_KEY` | web | (secret) | Optional; richer YouTube channel feeds |
| `GUNICORN_WORKERS` | web | 3 | Web worker processes |
| `MONGODB_PASSWORD` | web | (secret) | MongoDB password |
| `MONGODB_USERNAME` | web | (secret) | MongoDB user |
| `XAI_GROK_API_KEY` | web | (secret) | Optional; AI story features |
| `ANTHROPIC_API_KEY` | web | (secret) | Optional; AI story features |
| `IMAGES_SECRET_KEY` | web | (secret) | HMAC key for proxied images |
| `POSTGRES_PASSWORD` | web | (secret) | Postgres password |
| `ELASTICSEARCH_HOST` | web | - | Search cluster URL |
| `EMAIL_HOST_PASSWORD` | web | (secret) | SMTP password |
| `NEWSBLUR_ADMIN_EMAIL` | web | - | Optional administrator email address |
| `GOOGLE_GEMINI_API_KEY` | web | (secret) | Optional; AI story features |
| `NEWSBLUR_AUTO_PREMIUM` | web | true | false puts new accounts on the free tier |
| `DJANGO_SETTINGS_MODULE` | web | newsblur_web.settings | Django settings module |
| `NEWSBLUR_ADMIN_PASSWORD` | web | (secret) | First administrator password |
| `NEWSBLUR_ADMIN_USERNAME` | web | (secret) | First administrator username |
| `NEWSBLUR_DAYS_OF_UNREAD` | web | 30 | Unread retention for premium accounts |
| `NEWSBLUR_HOMEPAGE_USERNAME` | web | (secret) | Blurblog shown to logged-out visitors |
| `NEWSBLUR_DAYS_OF_UNREAD_FREE` | web | 14 | Unread retention for free accounts |
| `NEWSBLUR_AUTO_ENABLE_NEW_USERS` | web | true | false makes new signups inactive |
| `PORT` | node | 8008 | Node listening port |
| `NODE_ENV` | node | docker | Selects the self-hosted code paths |
| `REDIS_PORT` | node | 6579 | Redis port |
| `MONGODB_URL` | node | - | Favicon store |
| `REDIS_SERVER` | node | - | Redis private hostname |
| `REDIS_PASSWORD` | node | (secret) | Redis password |
| `REDISHOST` | redis | - | Data panel alias, not read by the server |
| `REDISPORT` | redis | 6579 | Data panel alias, not read by the server |
| `REDISUSER` | redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | redis | - | Private connection string |
| `REDISPASSWORD` | redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/_proxychk`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'mkdir -p /data/db/mongo; exec docker-entrypoint.sh mongod --dbpath /data/db/mongo --ipv6 --bind_ip ::,0.0.0.0 --wiredTigerCacheSizeGB 1'`
- **Volume:** `/data/db`
- **Start command:** `/app/imageproxy`
- **Start command:** `/usr/bin/tini -s -- /usr/local/bin/newsblur-entrypoint tasks`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/usr/share/elasticsearch/data`
- **Healthcheck:** `/_haproxychk`
- **Healthcheck:** `/rss_feeds/original_text_fetcher`
- **Start command:** `/bin/sh -c 'rm -rf /data/lost+found; mkdir -p /data/redis; exec redis-server --port 6579 --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data/redis --save 900 1 --maxmemory-policy noeviction'`
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/newsblur)
