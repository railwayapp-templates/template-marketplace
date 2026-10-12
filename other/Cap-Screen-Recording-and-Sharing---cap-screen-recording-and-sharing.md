# Deploy Cap Screen Recording and Sharing on Railway

Record and share screen videos with links and comments. Loom alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cap-screen-recording-and-sharing)

## About

Cap is an open-source screen recorder: record your screen and camera, get a shareable link right away, and collect comments on the video. This community template runs Cap's web app and ffmpeg media server on Railway with MySQL and a Railway Bucket for the recordings, so your videos stay in your own project.

Cap is a Next.js web app that hosts the dashboard, share pages and the API used by Cap Desktop, plus a media server that runs ffmpeg for transcoding, thumbnails and previews. It needs MySQL for accounts and video metadata and S3-compatible storage for the files, which browsers and the desktop app upload to directly. This template uses Cap's official images pinned by digest, a Railway Bucket with the CORS rule browser uploads need, a private media server with a generated callback secret, a database wait so first boot does not race MySQL, and a small cron job that retries failed video processing. All secrets are generated at deploy time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cap Media Server | `ghcr.io/capsoftware/cap-media-server@sha256:2dc90e055447026d7ff70656344cde74ec91b9d458a6050d9be6040a7074b62b` | Worker |
| Bucket CORS | `amazon/aws-cli:2.37.12` | Worker |
| Cap Maintenance | `curlimages/curl:8.22.0` | Worker |
| MySQL | `mysql:9.7.2` | Database |
| Cap | `ghcr.io/capsoftware/cap-web@sha256:8ee4cbd3fd87f88f538831aed06c954c525db9c2426a62abeaf0ca307c5e1ce9` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Cap Media Server | 3456 | Port the media server listens on (Bun binds [::], dual-stack); used for the healthcheck. |
| `MEDIA_SERVER_WEB_ORIGIN` | Cap Media Server | - | Cap's public origin; lets the media server fetch media through Cap's storage proxy with the shared secret. |
| `MEDIA_SERVER_WEBHOOK_SECRET` | Cap Media Server | (secret) | Shared with Cap: references Cap.MEDIA_SERVER_WEBHOOK_SECRET (edit it there). |
| `S3_REGION` | Bucket CORS | - | Bucket region. |
| `BUCKET_NAME` | Bucket CORS | - | Bucket to configure. |
| `S3_ENDPOINT` | Bucket CORS | - | Bucket S3 endpoint. |
| `PUBLIC_ORIGIN` | Bucket CORS | - | Cap's public origin (used in the log line). |
| `AWS_ACCESS_KEY_ID` | Bucket CORS | - | Bucket access key. |
| `CORS_CONFIGURATION` | Bucket CORS | - | CORS rule letting browsers on Cap's domain upload (multipart, needs ETag) and play recordings via presigned URLs. Add custom domains to AllowedOrigins and redeploy this service. |
| `AWS_SECRET_ACCESS_KEY` | Bucket CORS | (secret) | Bucket secret key. |
| `CRON_SECRET` | Cap Maintenance | (secret) | Shared with Cap: references Cap.CRON_SECRET (edit it there). |
| `CAP_INTERNAL_URL` | Cap Maintenance | - | Cap's private address. |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQL_USER` | MySQL | (secret) | Application user created on first boot with full rights on MYSQL_DATABASE. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | cap | Database created on first boot; Cap's DATABASE_URL points at it. |
| `MYSQL_PASSWORD` | MySQL | (secret) | Password of the application user (letters and digits only, it is embedded in a URL). |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | Cap | 3000 | Port the Next.js server listens on; Railway routes traffic and healthchecks here. |
| `WEB_URL` | Cap | - | Public URL of this Cap instance (share links, desktop app sign-in, OAuth callbacks). Change it when you add a custom domain. |
| `CRON_SECRET` | Cap | (secret) | Bearer token for Cap's maintenance endpoints; Cap Maintenance references it. |
| `DATABASE_URL` | Cap | - | MySQL connection string over the private network (Cap requires MySQL). |
| `GROQ_API_KEY` | Cap | (secret) | Optional Groq key: AI titles, summaries and chapters (preferred generation provider). |
| `NEXTAUTH_URL` | Cap | - | Must equal WEB_URL; NextAuth builds its callback URLs from it. |
| `S3_PATH_STYLE` | Cap | true | Use path-style bucket URLs (Cap's default for non-AWS storage). Keep true: browser uploads depend on the bucket CORS rule set by Bucket CORS. |
| `CAP_AWS_BUCKET` | Cap | - | Railway Bucket that stores recordings, thumbnails and exports. |
| `CAP_AWS_REGION` | Cap | - | Bucket region. |
| `OPENAI_API_KEY` | Cap | (secret) | Optional OpenAI key: AI features fallback. |
| `RESEND_API_KEY` | Cap | (secret) | Resend API key for login-code and notification e-mails (HTTP API, works on every Railway plan). Without it, login codes are printed to this service's logs. |
| `MYSQL_WAIT_HOST` | Cap | - | Host the start command waits for before booting; Cap migrates on boot and gives up after three quick attempts. |
| `NEXTAUTH_SECRET` | Cap | (secret) | Signs session tokens (32 random bytes, hex). Changing it signs everyone out. |
| `ASSEMBLY_API_KEY` | Cap | (secret) | Optional AssemblyAI key: automatic transcription and captions. |
| `GOOGLE_CLIENT_ID` | Cap | - | Optional Google OAuth client ID for 'Sign in with Google' (callback: WEB_URL/api/auth/callback/google). |
| `MEDIA_SERVER_URL` | Cap | - | Private address of the ffmpeg media server. |
| `ANTHROPIC_API_KEY` | Cap | (secret) | Optional Anthropic key: AI chat features. |
| `CAP_AWS_ACCESS_KEY` | Cap | - | Bucket access key. |
| `CAP_AWS_SECRET_KEY` | Cap | (secret) | Bucket secret key. |
| `RESEND_FROM_DOMAIN` | Cap | - | Domain verified in Resend that e-mails are sent from, e.g. yourcompany.com. |
| `S3_PUBLIC_ENDPOINT` | Cap | - | S3 endpoint used in the presigned URLs browsers and the desktop app upload to and play from. |
| `GOOGLE_CLIENT_SECRET` | Cap | (secret) | Optional Google OAuth client secret. |
| `S3_INTERNAL_ENDPOINT` | Cap | - | S3 endpoint for server-side calls (Railway Buckets have no private endpoint, so it equals the public one). |
| `DATABASE_ENCRYPTION_KEY` | Cap | - | 32-byte hex key that encrypts stored credentials (e.g. a user's own S3 keys). Never change it after first boot. |
| `MEDIA_SERVER_WEBHOOK_URL` | Cap | - | Private address the media server calls back to (works because the start command binds to ::). |
| `CAP_VIDEOS_DEFAULT_PUBLIC` | Cap | true | New recordings are viewable by anyone with the link (upstream default). Set false to make them private until shared. |
| `CAP_ALLOWED_SIGNUP_DOMAINS` | Cap | - | Comma-separated e-mail domains allowed to sign up, e.g. yourcompany.com. Empty = anyone who can receive the login code. |
| `MEDIA_SERVER_WEBHOOK_SECRET` | Cap | (secret) | Shared secret for media-server progress callbacks; Cap Media Server references it. |

## Configuration

- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c "aws s3api put-bucket-cors --bucket $BUCKET_NAME --endpoint-url $S3_ENDPOINT --region $S3_REGION --cors-configuration \"$CORS_CONFIGURATION\" && echo 'Bucket CORS configured for' $PUBLIC_ORIGIN"`
- **Start command:** `/bin/sh -c "for job in recover-failed-video-processing finalize-stale-desktop-segments; do curl -sS --max-time 240 --retry 2 --retry-delay 10 --retry-connrefused -o /dev/null -w \"$job: HTTP %{http_code} in %{time_total}s\n\" -H \"Authorization: Bearer $CRON_SECRET\" \"$CAP_INTERNAL_URL/api/cron/$job\"; done"`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --max-connections=1000`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "i=0; until nc -w 3 $MYSQL_WAIT_HOST 3306 </dev/null >/dev/null 2>&1; do i=$((i+1)); if [ $i -ge 150 ]; then echo 'MySQL not reachable after 5 minutes'; exit 1; fi; echo 'waiting for MySQL'; sleep 2; done; HOSTNAME=:: exec node apps/web/server.js"`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Tags:** cap, screen-recording, video, loom-alternative, mysql

[View on Railway →](https://railway.com/deploy/cap-screen-recording-and-sharing)
