# Deploy Cap | (Just Updated) Loom Alternative Whose Storage Keys Are Yours on Railway

Screen recording whose S3 keys are per-deploy, not shared by everyone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cap-or-just-updated-loom-alternative-who)

## About

Cap is the open-source Loom alternative: record your screen (and camera and mic), get a shareable link in seconds, and keep every recording on infrastructure you own. This template runs the full Cap stack — web app, media server, MySQL, and S3-compatible object storage — on your own Railway project, with a fresh set of storage credentials generated for your deploy and nobody else's.

The template deploys four services: `cap-web` (the Next.js app and API, the only public service), `mediaserver` (Cap's FFmpeg transcoding worker, private), `mysql` (application database, on a volume), and `minio` (S3-compatible storage for recordings, on a volume). Every image is pinned by digest, so a redeploy gives you the same build you verified rather than whatever `latest` moved to overnight. Database credentials, the NextAuth secret, the media-server webhook secret, the 32-byte database encryption key, and both MinIO root credentials are generated per deploy as Railway secrets — they are not baked into this template and no other deploy shares them. The web app talks to MySQL and MinIO over Railway's private network; browsers get presigned upload and playback URLs on MinIO's own public domain. On first boot the app runs its database migrations and creates its storage bucket itself, so there is nothing to provision by hand. Sign-in works out of the box without SMTP: request a login link and the six-digit code is printed to the `cap-web` deploy logs. Add SMTP variables later if you want real email delivery.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mediaserver | `ghcr.io/capsoftware/cap-media-server@sha256:cb88092bd44e5276c5e82bca5261f169bbe01d8e30439c4ebb8db8f89eb599fa` | Worker |
| cap-web | `ghcr.io/capsoftware/cap-web@sha256:a15efd82c37442d01fa95c4d94954baa1a84b20b8289b758d293fc51b1eb5d54` | Web service |
| minio | `minio/minio@sha256:14cea493d9a34af32f524e538b8346cf79f3321eff8e708c1e2960462bd8936e` | Database |
| mysql | `mysql@sha256:9c3380eac945af0736031b200027f581925927c81e010056214a4bd6b6693714` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MEDIA_SERVER_WEBHOOK_SECRET` | mediaserver | (secret) |
| `NEXTAUTH_SECRET` | cap-web | (secret) |
| `CAP_AWS_SECRET_KEY` | cap-web | (secret) |
| `MEDIA_SERVER_WEBHOOK_SECRET` | cap-web | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c 'export HOSTNAME=0.0.0.0 CAP_AWS_BUCKET=cap CAP_AWS_REGION=us-east-1 S3_PATH_STYLE=true; exec node apps/web/server.js'`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'exec /usr/bin/docker-entrypoint.sh minio server /data --address ":$PORT" --console-address ":9001"'`
- **Healthcheck:** `/minio/health/live`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh mysqld --default-authentication-plugin=mysql_native_password --max_connections=1000 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci'`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cap-or-just-updated-loom-alternative-who)
