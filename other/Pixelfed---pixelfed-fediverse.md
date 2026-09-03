# Deploy Pixelfed on Railway

Photo sharing network that federates with Mastodon and the fediverse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pixelfed-fediverse)

## About

Pixelfed is an open-source, federated photo-sharing platform — an Instagram-shaped app you own, built on Laravel and speaking ActivityPub, so people on Mastodon, Misskey and any other fediverse server can follow your account and see your photos in their timeline. Photographers, camera clubs and communities self-host Pixelfed to publish images without an algorithmic feed, without advertising, and without a company deciding what happens to their archive. It ships a web client, albums, stories, collections, hashtags and a Mastodon-compatible API.

Deploy Pixelfed in its production shape rather than a single container. **pixelfed** serves the web app and API on FrankenPHP and runs Laravel Horizon and the scheduler beside it, because Pixelfed stages uploads on local disk before a queued job moves them. **MySQL** holds accounts, posts and sessions, **Redis** backs the cache and every queue, and a **pixelfed-media** bucket holds photos and videos so the disk is never the limit. The **media** service signs reads against that bucket and serves objects on their own domain, while **mailpit** captures confirmation and reset mail. Self-host Pixelfed on Railway with all six connected.

![Diagram of the Pixelfed app, media gateway, Mailpit, MySQL and Redis services](https://res.cloudinary.com/rroe4rtk/image/upload/v1788373505/pixelfed-architecture.png)

Pixelfed is a photo-sharing server, not a gallery script: every account is a real ActivityPub actor with a public key, an inbox and an outbox, and posts are delivered to followers on other servers as they are published.

- Photo and video posts with albums, alt text, content warnings and location tagging
- ActivityPub federation: remote follows, likes, replies and boosts across the fediverse
- Stories, collections, bookmarks, hashtag following and a chronological home feed
- A Mastodon-compatible REST API for official and third-party mobile clients
- Moderation: reports, autospam, per-domain blocks, suspension, an admin dashboard

**pixelfed** answers HTTP and runs Horizon, which works fifteen queues covering federation delivery, inbox handling, feed fan-out and media processing. **MySQL** is the system of record, **Redis** carries the queues and cache, the bucket stores every uploaded file, and the **media** gateway signs reads so images are fetchable without the bucket being open.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| pixelfed | [gridalpha/pixelfed-railway](https://github.com/gridalpha/pixelfed-railway) (root: app) | Web service |
| media | [gridalpha/pixelfed-railway](https://github.com/gridalpha/pixelfed-railway) (root: media-gateway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | pixelfed | 8080 | Port Railway health-checks |
| `APP_ENV` | pixelfed | production | Laravel environment |
| `APP_URL` | pixelfed | - | Public base URL |
| `AWS_URL` | pixelfed | - | Public base URL for media links |
| `DB_HOST` | pixelfed | - | Private MySQL hostname |
| `DB_PORT` | pixelfed | 3306 | MySQL port |
| `EXP_EMC` | pixelfed | true | Experimental media caching |
| `APP_NAME` | pixelfed | Pixelfed | Instance name shown in the UI |
| `AP_INBOX` | pixelfed | true | Accept federated deliveries |
| `SSL_MODE` | pixelfed | off | TLS terminates at Railway's edge |
| `APP_DEBUG` | pixelfed | false | Never enable on a public instance |
| `AP_OUTBOX` | pixelfed | true | Publish an outbox collection |
| `LOG_LEVEL` | pixelfed | info | Log verbosity |
| `MAIL_HOST` | pixelfed | - | SMTP hostname |
| `MAIL_PORT` | pixelfed | 1025 | SMTP port |
| `APP_DOMAIN` | pixelfed | - | Federation identity host |
| `AWS_BUCKET` | pixelfed | - | Object storage bucket name |
| `REDIS_HOST` | pixelfed | - | Private Redis hostname |
| `REDIS_PORT` | pixelfed | 6379 | Redis port |
| `CACHE_STORE` | pixelfed | redis | Application cache backend |
| `DB_DATABASE` | pixelfed | - | Database name |
| `DB_PASSWORD` | pixelfed | (secret) | Database password |
| `DB_USERNAME` | pixelfed | (secret) | Database user |
| `LOG_CHANNEL` | pixelfed | stderr | Send logs to the deploy log |
| `MAIL_DRIVER` | pixelfed | smtp | Mail transport |
| `MAIL_MAILER` | pixelfed | smtp | Mail transport, Laravel 9+ name |
| `ACTIVITY_PUB` | pixelfed | true | Federation master switch |
| `ADMIN_DOMAIN` | pixelfed | - | Admin panel host |
| `APP_TIMEZONE` | pixelfed | UTC | Default timezone |
| `AWS_ENDPOINT` | pixelfed | - | Object storage endpoint |
| `CACHE_DRIVER` | pixelfed | redis | Legacy alias for the cache backend |
| `IMAGE_DRIVER` | pixelfed | gd | Image processing library |
| `PF_MAX_USERS` | pixelfed | 1000 | Account cap for the instance |
| `QUEUE_DRIVER` | pixelfed | redis | Queue backend |
| `REDIS_CLIENT` | pixelfed | phpredis | PHP Redis extension |
| `REDIS_SCHEME` | pixelfed | tcp | Redis transport |
| `DB_CONNECTION` | pixelfed | mysql | Database driver |
| `IMAGE_QUALITY` | pixelfed | 80 | JPEG quality, 1-100 |
| `MAIL_AUTO_TLS` | pixelfed | false | Do not attempt STARTTLS |
| `MAIL_PASSWORD` | pixelfed | (secret) | SMTP password |
| `MAIL_USERNAME` | pixelfed | (secret) | SMTP username |
| `OAUTH_ENABLED` | pixelfed | true | Mobile and third-party app API |
| `TRUST_PROXIES` | pixelfed | 0.0.0.0/0,::/0 | Trust the edge, read leftmost XFF |
| `AP_SHAREDINBOX` | pixelfed | true | Accept shared-inbox deliveries |
| `HORIZON_PREFIX` | pixelfed | horizon- | Horizon key prefix in Redis |
| `MAIL_FROM_NAME` | pixelfed | Pixelfed | Sender display name |
| `MAX_PHOTO_SIZE` | pixelfed | 15000 | Per-file upload cap in KB |
| `REDIS_DATABASE` | pixelfed | 0 | Redis database index |
| `REDIS_PASSWORD` | pixelfed | (secret) | Redis auth password |
| `SESSION_DRIVER` | pixelfed | database | Sessions in MySQL, not Redis |
| `APP_SECRET_SEED` | pixelfed | (secret) | Seed the app key is derived from |
| `AUTORUN_ENABLED` | pixelfed | true | Run boot-time Laravel tasks |
| `CADDY_HTTP_PORT` | pixelfed | 8080 | Port FrankenPHP listens on |
| `MAIL_ENCRYPTION` | pixelfed | null | No TLS on the private listener |
| `PF_ENABLE_CLOUD` | pixelfed | true | Store media in object storage |
| `AP_REMOTE_FOLLOW` | pixelfed | true | Allow follows from remote servers |
| `BROADCAST_DRIVER` | pixelfed | log | No websocket broadcaster configured |
| `FILESYSTEM_CLOUD` | pixelfed | s3 | Cloud disk driver |
| `MAX_ALBUM_LENGTH` | pixelfed | 4 | Photos per post |
| `PHP_MEMORY_LIMIT` | pixelfed | 512M | PHP memory ceiling |
| `QUEUE_CONNECTION` | pixelfed | redis | Queue connection name |
| `AWS_ACCESS_KEY_ID` | pixelfed | - | Object storage access key |
| `MAIL_FROM_ADDRESS` | pixelfed | - | Envelope sender address |
| `OPEN_REGISTRATION` | pixelfed | false | Public sign-ups, toggled in the admin UI |
| `PHP_POST_MAX_SIZE` | pixelfed | 100M | PHP request body limit |
| `AWS_DEFAULT_REGION` | pixelfed | - | Object storage region |
| `MAX_CAPTION_LENGTH` | pixelfed | 500 | Caption character limit |
| `PF_OPTIMIZE_IMAGES` | pixelfed | true | Recompress uploads |
| `PHP_OPCACHE_ENABLE` | pixelfed | 1 | Enable the PHP opcode cache |
| `ENABLE_CONFIG_CACHE` | pixelfed | true | Let the admin UI override settings |
| `PIXELFED_ADMIN_NAME` | pixelfed | Administrator | First admin display name |
| `HORIZON_MEMORY_LIMIT` | pixelfed | 256 | Horizon master memory ceiling, MB |
| `PIXELFED_ADMIN_EMAIL` | pixelfed | - | First admin login email |
| `AWS_SECRET_ACCESS_KEY` | pixelfed | (secret) | Object storage secret key |
| `HORIZON_MAX_PROCESSES` | pixelfed | 8 | Maximum queue workers |
| `SESSION_SECURE_COOKIE` | pixelfed | true | Cookies only over HTTPS |
| `PHP_MAX_EXECUTION_TIME` | pixelfed | 300 | Request timeout in seconds |
| `PIXELFED_ADMIN_PASSWORD` | pixelfed | (secret) | First admin password |
| `PIXELFED_ADMIN_USERNAME` | pixelfed | (secret) | First admin username, not a reserved name |
| `AUTORUN_LARAVEL_OPTIMIZE` | pixelfed | true | Cache config, routes and views |
| `INSTANCE_DISCOVER_PUBLIC` | pixelfed | true | Show the public discover feed |
| `PHP_UPLOAD_MAX_FILE_SIZE` | pixelfed | 100M | PHP upload size limit |
| `AUTORUN_LARAVEL_MIGRATION` | pixelfed | true | Migrate on every deploy |
| `HORIZON_SUPERVISOR_MEMORY` | pixelfed | 256 | Per-worker memory ceiling, MB |
| `ENFORCE_EMAIL_VERIFICATION` | pixelfed | true | Require confirmed email addresses |
| `HORIZON_SUPERVISOR_TIMEOUT` | pixelfed | 600 | Job timeout in seconds |
| `AWS_USE_PATH_STYLE_ENDPOINT` | pixelfed | true | Path-style addressing |
| `AUTORUN_LARAVEL_STORAGE_LINK` | pixelfed | true | Link public storage at boot |
| `MEDIA_DELETE_LOCAL_AFTER_CLOUD` | pixelfed | true | Free the volume after upload |
| `AWS_REQUEST_CHECKSUM_CALCULATION` | pixelfed | WHEN_REQUIRED | Skip optional upload checksums |
| `AWS_RESPONSE_CHECKSUM_VALIDATION` | pixelfed | WHEN_REQUIRED | Skip optional download checksums |
| `AUTORUN_LARAVEL_MIGRATION_TIMEOUT` | pixelfed | 180 | Seconds to wait for MySQL |
| `AUTORUN_LARAVEL_MIGRATION_ISOLATION` | pixelfed | true | Lock migrations across containers |
| `PORT` | media | 3000 | HTTP listening port |
| `S3_BUCKET` | media | - | Object storage bucket name |
| `S3_REGION` | media | - | Object storage region |
| `S3_ENDPOINT` | media | - | Object storage endpoint |
| `PUBLIC_PREFIXES` | media | public/,cache/ | Key prefixes served publicly |
| `S3_ACCESS_KEY_ID` | media | - | Object storage access key |
| `S3_SECRET_ACCESS_KEY` | media | (secret) | Object storage secret key |
| `PORT` | mailpit | 8025 | Web inbox listening port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | SMTP credentials Pixelfed uses |
| `SMTP_PASSWORD` | mailpit | (secret) | Shared SMTP and inbox password |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow auth on the plaintext listener |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/instance`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/livez`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile, PHP

[View on Railway →](https://railway.com/deploy/pixelfed-fediverse)
