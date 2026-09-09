# Deploy Songbird on Railway

A secure, lightweight and self-hostable chat platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/songbird)

## About

Songbird is a secure, lightweight, self-hosted real-time communication platform. Built with React and Node.js, it offers direct messages, private groups, broadcast channels, voice notes, file attachments, and video transcoding. Designed with privacy in mind, Songbird features encryption at rest, an administrative dashboard, PWA support, and full data sovereignty.

Deploying Songbird on Railway provisions a scalable, production-ready real-time communication stack in a single click. The deployment bundles the primary Node.js application server (handling client traffic, REST APIs, and Server-Sent Events for instant message delivery), a dedicated background media worker equipped with FFmpeg for asynchronous video transcoding and thumbnail generation, a persistent PostgreSQL database, and an S3-compatible object storage bucket. All services communicate over Railway's encrypted private network mesh, keeping database and worker traffic shielded from the public internet while connection strings, bucket credentials, and webhook authentication tokens are auto-configured seamlessly out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| songbird-server | [bllackbull/Songbird](https://github.com/bllackbull/Songbird) | Worker |
| songbird-worker | [bllackbull/Songbird](https://github.com/bllackbull/Songbird) (root: worker) | Worker |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | songbird-server | production | Application environment mode (`production` or `development`). |
| `SIGN_UP` | songbird-server | true | Allow open user registration from the UI. |
| `DB_CLIENT` | songbird-server | postgres | Database engine driver (`postgres` or `sqlite3`). |
| `WORKER_URL` | songbird-server | - | Internal URL for the background media worker service. |
| `ADMIN_PANEL` | songbird-server | true | Enable the admin dashboard. |
| `BIND_ADDRESS` | songbird-server | :: | Network interface to bind the HTTP server to. |
| `POSTGRES_SSL` | songbird-server | false | Enable SSL for PostgreSQL connections. |
| `POSTGRES_URL` | songbird-server | - | PostgreSQL connection URL string. |
| `APP_PUBLIC_URL` | songbird-server | - | Public origin URL of the app. |
| `STORAGE_BUCKET` | songbird-server | - | Name of the attached storage bucket. |
| `STORAGE_DRIVER` | songbird-server | remote | File storage backend driver (`remote` or `local`). |
| `STORAGE_REGION` | songbird-server | - | Storage bucket region identifier. |
| `WEBHOOK_SECRET` | songbird-server | (secret) | Shared secret token to verify internal communication between server and worker. |
| `STORAGE_ENDPOINT` | songbird-server | - | API endpoint URL for the storage bucket. |
| `STORAGE_AUTO_CORS` | songbird-server | true | Automatically configure bucket CORS headers for browser uploads. |
| `STORAGE_PUBLIC_URL` | songbird-server | - | Custom CDN or public URL prefix for downloads. |
| `FILE_UPLOAD_MAX_FILES` | songbird-server | 10 | Maximum number of attachments per message. |
| `STORAGE_ACCESS_KEY_ID` | songbird-server | - | Access key ID for bucket authentication. |
| `MESSAGE_FILE_RETENTION` | songbird-server | 7 | Days to keep uploaded files before auto-cleanup (`0` = forever). |
| `MESSAGE_TEXT_RETENTION` | songbird-server | 0 | Days to keep chat message history before auto-cleanup (`0` = forever). |
| `FILE_UPLOAD_MAX_SIZE_MB` | songbird-server | 25 | Maximum allowed size per uploaded file in MB. |
| `STORAGE_PROCESSING_MODE` | songbird-server | remote | Media processing workflow mode (`remote`, `local`, or `auto`). |
| `STORAGE_FORCE_PATH_STYLE` | songbird-server | false | Use path-style URLs instead of virtual-hosted URLs. |
| `STORAGE_SECRET_ACCESS_KEY` | songbird-server | (secret) | Secret access key for bucket authentication. |
| `FILE_UPLOAD_TRANSCODE_VIDEOS` | songbird-server | true | Automatically transcode videos to web-compatible MP4. |
| `FILE_UPLOAD_MAX_TOTAL_SIZE_MB` | songbird-server | 75 | Maximum combined size of attachments per message in MB. |
| `APP_ENV` | songbird-worker | production | Worker environment mode (`production` or `development`). |
| `WORKER_PORT` | songbird-worker | 8080 | HTTP port the worker process listens on. |
| `STORAGE_BUCKET` | songbird-worker | - | Name of the storage bucket containing media files. |
| `STORAGE_DRIVER` | songbird-worker | remote | File storage backend driver (`remote` or `local`). |
| `STORAGE_REGION` | songbird-worker | - | Storage bucket region identifier. |
| `WEBHOOK_SECRET` | songbird-worker | (secret) | Shared secret token used to authenticate requests sent to the server. |
| `STORAGE_ENDPOINT` | songbird-worker | - | S3-compatible API endpoint URL for reading/writing media. |
| `WORKER_CONCURRENCY` | songbird-worker | 2 | Maximum concurrent media transcoding jobs. |
| `STORAGE_ACCESS_KEY_ID` | songbird-worker | - | Access key ID for S3 bucket operations. |
| `STORAGE_FORCE_PATH_STYLE` | songbird-worker | false | Use path-style URLs for S3 requests. |
| `STORAGE_SECRET_ACCESS_KEY` | songbird-worker | (secret) | Secret access key for S3 bucket operations. |
| `POSTGRES_DB` | postgres | songbird | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** JavaScript, Shell, CSS, Dockerfile, TypeScript, HTML

[View on Railway →](https://railway.com/deploy/songbird)
