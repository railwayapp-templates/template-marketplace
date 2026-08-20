# Deploy Cap on Railway

Screen recorder that turns recordings into shareable video links

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cap-screen-recording)

## About

Cap is an open-source screen recorder and video-sharing platform — the self-hostable answer to Loom. You record a walkthrough with the Cap desktop app or browser extension, it uploads to your own server, and anyone with the link watches it in a player with comments, reactions, and analytics. Teams use it for async standups, bug reports, and support replies. Self-host Cap when recordings show customer data or unreleased work that should not sit on a vendor's servers: the videos stay in your own database and object storage, and share links point at your own domain.

Deploy Cap on Railway and the stack is wired up before you open it: the **cap-web** app (Next.js) serves the dashboard, share pages, and API on a public URL; a private **cap-media-server** (Bun + FFmpeg) transcodes each upload into a streamable MP4 with thumbnails and previews; **MySQL** holds accounts, organizations, video metadata, and comments; and a **managed object storage bucket** holds the media. A private **cap-scheduler** calls Cap's recovery endpoints every 15 minutes, so a stalled upload is retried rather than left broken. Uploads and playback use presigned URLs straight to the bucket, so the app never proxies video.

![Diagram of Cap web, media server, scheduler and MySQL on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787160258/cap-architecture.png)

Cap Web is the server half of Cap: the desktop and mobile apps record locally, then hand the file to this service, which stores it, processes it, and hosts the share page. Self-hosting matters more here than for most tools, since a screen recording is often the most sensitive artifact a team produces.

Key features:

- Share pages with threaded comments, emoji reactions, and timestamped replies
- Organizations, spaces, and folders for grouping recordings
- Custom domains for share links, and Loom import for an existing library
- Optional transcription and AI summaries with a provider key

The architecture splits the work: **cap-web** handles requests and signs storage URLs; the **media server** does the CPU-heavy FFmpeg work in its own container, so a long transcode never blocks the app; **MySQL** is the source of truth for everything but the media; the **bucket** holds raw uploads, transcoded MP4s, thumbnails, and previews; the **scheduler** re-runs Cap's recovery jobs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cap-web | `ghcr.io/capsoftware/cap-web:latest` | Web service |
| cap-scheduler | `curlimages/curl:latest` | Worker |
| MySQL | `mysql:9.4` | Database |
| cap-media-server | `ghcr.io/capsoftware/cap-media-server:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | cap-web | 3000 | HTTP port the app listens on |
| `WEB_URL` | cap-web | - | Public base URL for share links |
| `CRON_SECRET` | cap-web | (secret) | Bearer token for recovery endpoints |
| `DATABASE_URL` | cap-web | - | MySQL connection string |
| `NEXTAUTH_URL` | cap-web | - | Auth callback base URL |
| `S3_PATH_STYLE` | cap-web | true | Use path-style bucket addressing |
| `CAP_AWS_BUCKET` | cap-web | - | Object storage bucket name |
| `CAP_AWS_REGION` | cap-web | - | Bucket region |
| `NEXTAUTH_SECRET` | cap-web | (secret) | Session token signing key |
| `MEDIA_SERVER_URL` | cap-web | - | Private transcoder address |
| `CAP_AWS_ACCESS_KEY` | cap-web | - | Bucket access key |
| `CAP_AWS_SECRET_KEY` | cap-web | (secret) | Bucket secret key |
| `S3_PUBLIC_ENDPOINT` | cap-web | - | Endpoint used for presigned URLs |
| `S3_INTERNAL_ENDPOINT` | cap-web | - | Endpoint used for server-side reads |
| `DATABASE_ENCRYPTION_KEY` | cap-web | - | 32-byte hex field encryption key |
| `MEDIA_SERVER_WEBHOOK_URL` | cap-web | - | Callback base for the transcoder |
| `CAP_VIDEOS_DEFAULT_PUBLIC` | cap-web | true | New recordings shareable by link |
| `MEDIA_SERVER_WEBHOOK_SECRET` | cap-web | (secret) | Shared transcoder secret |
| `CRON_JOBS` | cap-scheduler | finalize-stale-desktop-segments recover-failed-video-processing | Recovery routes to call |
| `CAP_WEB_URL` | cap-scheduler | - | Private address of the app |
| `CRON_SECRET` | cap-scheduler | (secret) | Bearer token sent to recovery endpoints |
| `SCHEDULER_INTERVAL_SECONDS` | cap-scheduler | 900 | Seconds between recovery runs |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |
| `PORT` | cap-media-server | 3456 | HTTP port the transcoder listens on |
| `MEDIA_SERVER_WEBHOOK_SECRET` | cap-media-server | (secret) | Shared secret required on every request |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'echo "[scheduler] jobs=${CRON_JOBS} interval=${SCHEDULER_INTERVAL_SECONDS}s"; while true; do for job in $CRON_JOBS; do code=$(curl -s -o /dev/null -w "%{http_code}" -m 600 -H "Authorization: Bearer $CRON_SECRET" "$CAP_WEB_URL/api/cron/$job"); echo "[scheduler] $job -> $code"; done; sleep "$SCHEDULER_INTERVAL_SECONDS"; done'`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/health`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cap-screen-recording)
