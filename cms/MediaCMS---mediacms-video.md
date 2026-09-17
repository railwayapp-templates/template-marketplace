# Deploy MediaCMS on Railway

Video and media portal for uploading, encoding and streaming

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mediacms-video)

## About

MediaCMS is an open source video and media content management system built with Django and React. It gives an organisation its own YouTube-style portal: members upload video, audio, images and PDFs, the server transcodes each upload into several resolutions and HLS streams, and viewers browse channels, playlists, categories and tags with comments, likes and a REST API underneath. Universities, broadcasters and training teams use it when they need media hosting they control — no third-party terms, no ads, no data leaving their infrastructure.

Deploy MediaCMS on Railway and the whole stack comes up configured. The **mediacms** service runs the web tier, the encoding workers and the scheduler together so they share one media store; **Postgres** holds media records, accounts, comments and permissions; **Redis** is the Celery broker and Django cache; **mailpit** captures outgoing mail so password resets and admin notices work immediately. Viewer traffic reaches nginx inside the mediacms container, which serves finished video directly and proxies the rest to Django. Uploads land on a persistent volume and reappear as adaptive streams.

![Diagram of the MediaCMS, Postgres, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789504093/mediacms-architecture.webp)

Self-hosting video is mostly about the encoding pipeline: uploads are large, browsers want several bitrates, and the work is CPU-heavy and bursty. MediaCMS packages that pipeline — ffmpeg for transcoding, Bento4 for HLS packaging, Celery for queueing — behind an interface that looks like a consumer video site. Teams reach for it when a shared drive is not enough and a commercial platform is not an option.

Key features:

- Transcoding to 144p–2160p plus adaptive HLS, with posters, thumbnails and sprites
- Video, audio, image and PDF media, with chapters, subtitles and trimming
- Channels, playlists, categories, tags, search, comments, likes and view counts
- Public, unlisted and private workflows with per-media and role-based permissions
- A documented REST API, SAML and LTI integration, an RSS feed

The Railway deployment keeps the roles that must share a filesystem together: the web tier, the short-task workers (thumbnails, notifications, mail), the encoding workers and the scheduler all read and write the same media directory, so they run under one supervisor inside the mediacms service with the volume mounted beneath them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| mediacms | [gridalpha/mediacms-railway](https://github.com/gridalpha/mediacms-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Port the inbox web UI listens on |
| `MP_UI_AUTH` | mailpit | - | Username and password for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web UI |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per SMTP message |
| `PORT` | mediacms | 8080 | Port nginx serves the portal on |
| `LOG_LEVEL` | mediacms | INFO | Application log verbosity |
| `TIME_ZONE` | mediacms | UTC | Timezone for dates and scheduling |
| `ADMIN_USER` | mediacms | (secret) | First administrator username |
| `EMAIL_HOST` | mediacms | - | SMTP host for outgoing mail |
| `EMAIL_PORT` | mediacms | 1025 | SMTP port |
| `SECRET_KEY` | mediacms | (secret) | Django signing key, must stay stable |
| `ADMIN_EMAIL` | mediacms | admin@example.com | First administrator email address |
| `CAN_COMMENT` | mediacms | all | Who may post comments |
| `PORTAL_NAME` | mediacms | MediaCMS | Portal title and email prefix |
| `ENABLE_NGINX` | mediacms | yes | Run nginx as proxy and media server |
| `ENABLE_UWSGI` | mediacms | yes | Run the gunicorn application server |
| `CAN_ADD_MEDIA` | mediacms | all | Who may upload media |
| `DEFAULT_THEME` | mediacms | light | light or dark interface |
| `EMAIL_USE_TLS` | mediacms | false | STARTTLS on the SMTP connection |
| `FRONTEND_HOST` | mediacms | - | Public URL used in links and email |
| `POSTGRES_HOST` | mediacms | - | Private Postgres hostname |
| `POSTGRES_NAME` | mediacms | - | Postgres database name |
| `POSTGRES_PORT` | mediacms | - | Postgres port |
| `POSTGRES_USER` | mediacms | (secret) | Postgres role |
| `ADMIN_PASSWORD` | mediacms | (secret) | First administrator password |
| `REDIS_LOCATION` | mediacms | - | Celery broker and Django cache |
| `EMAIL_HOST_USER` | mediacms | (secret) | SMTP username, blank for Mailpit |
| `PORTAL_WORKFLOW` | mediacms | public | Default visibility of new uploads |
| `ADMIN_EMAIL_LIST` | mediacms | admin@example.com | Recipients of admin notifications |
| `GENERATE_SITEMAP` | mediacms | false | Publish a sitemap.xml |
| `ENABLE_MIGRATIONS` | mediacms | yes | Run migrations and first-admin setup |
| `POSTGRES_PASSWORD` | mediacms | (secret) | Postgres password |
| `DEFAULT_FROM_EMAIL` | mediacms | mediacms@example.com | From address on outgoing mail |
| `ENABLE_CELERY_BEAT` | mediacms | yes | Run the periodic task scheduler |
| `ENABLE_CELERY_LONG` | mediacms | yes | Run the encoding worker pool |
| `PORTAL_DESCRIPTION` | mediacms | - | Short tagline for listings |
| `EMAIL_HOST_PASSWORD` | mediacms | (secret) | SMTP password, blank for Mailpit |
| `ENABLE_CELERY_SHORT` | mediacms | yes | Run the short-task worker pool |
| `SECURE_HSTS_SECONDS` | mediacms | 31536000 | HSTS max-age on secure requests |
| `GLOBAL_LOGIN_REQUIRED` | mediacms | (secret) | Make the whole portal private |
| `NGINX_WORKER_PROCESSES` | mediacms | 2 | nginx workers, sized to the container |
| `CELERY_LONG_CONCURRENCY` | mediacms | 2 | Concurrent video transcodes |
| `USERS_CAN_SELF_REGISTER` | mediacms | true | Allow public account signup |
| `CELERY_SHORT_CONCURRENCY` | mediacms | 4 | Thumbnail and notification workers |
| `USER_CAN_TRANSCRIBE_VIDEO` | mediacms | false | Whisper subtitles, needs the full image |
| `EXTRA_CSRF_TRUSTED_ORIGINS` | mediacms | - | Extra origins for a custom domain |
| `USERS_NEEDS_TO_BE_APPROVED` | mediacms | false | Require admin approval per account |
| `ALLOWED_DOMAINS_FOR_USER_REGISTRATION` | mediacms | - | Comma-separated signup allow-list |
| `RESTRICTED_DOMAINS_FOR_USER_REGISTRATION` | mediacms | - | Comma-separated signup deny-list |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/media`
- **Volume:** `/home/mediacms.io/mediacms/media_files`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** CMS · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/mediacms-video)
