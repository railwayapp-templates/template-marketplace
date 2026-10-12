# Deploy Mattermost v11 Team Chat on Railway

Secure team messaging with channels, threads and file storage on S3.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mattermost-v11-team-chat)

## About

Mattermost is an open-source team messaging platform with channels, threads, direct messages, file sharing and integrations. This community template runs Mattermost Team Edition v11 on Railway with PostgreSQL, keeps its configuration in the database and stores every upload in a Railway Bucket, so nothing is lost on redeploy.

Mattermost is a single Go server that serves the web app, the REST API and real-time websockets, backed by PostgreSQL. Files (attachments, avatars, custom emoji, plugins) go to a file store. Railway Buckets only accept virtual-hosted S3 requests, while Mattermost's S3 client sends path-style requests, so this template adds a small S3 gateway (rclone) on the private network that writes into your Bucket. Mattermost itself runs from the official image with no volume: configuration lives in PostgreSQL, so System Console changes and installed plugins survive redeploys. The first person to sign up becomes System Admin.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| S3 Gateway | [baranberkay96/mattermost-railway](https://github.com/baranberkay96/mattermost-railway) (branch: main) (root: /services/s3-gateway) | Worker |
| Mattermost | `mattermost/mattermost-team-edition:11.11.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres (private network). |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | S3 Gateway | 9000 | Port of the S3 API on the private network. |
| `BUCKET_NAME` | S3 Gateway | - | Railway Bucket name (S3 API name). |
| `BUCKET_PREFIX` | S3 Gateway | - | Optional folder inside the Bucket for all gateway data (empty = Bucket root). |
| `BUCKET_REGION` | S3 Gateway | - | Railway Bucket region. |
| `BUCKET_ENDPOINT` | S3 Gateway | - | Railway Bucket S3 endpoint. |
| `GATEWAY_BUCKETS` | S3 Gateway | mattermost | Space-separated logical buckets created as folders at start. |
| `GATEWAY_LOG_LEVEL` | S3 Gateway | NOTICE | rclone log level (ERROR, NOTICE, INFO, DEBUG). |
| `GATEWAY_ACCESS_KEY` | S3 Gateway | - | Access key Mattermost signs with (generated). |
| `GATEWAY_SECRET_KEY` | S3 Gateway | (secret) | Secret key Mattermost signs with (generated). |
| `BUCKET_ACCESS_KEY_ID` | S3 Gateway | - | Railway Bucket access key. |
| `BUCKET_FORCE_PATH_STYLE` | S3 Gateway | false | Railway Buckets use virtual-hosted URLs; set true only if the Bucket's Credentials tab says path-style. |
| `BUCKET_SECRET_ACCESS_KEY` | S3 Gateway | (secret) | Railway Bucket secret key. |
| `TZ` | Mattermost | UTC | Container time zone. |
| `PORT` | Mattermost | 8065 | Port Mattermost listens on (domain and healthcheck). |
| `MM_CONFIG` | Mattermost | - | Store the server configuration in Postgres so System Console changes survive redeploys. |
| `MM_LOGSETTINGS_ENABLEFILE` | Mattermost | false | Log to Railway's log viewer only (no log files on the ephemeral disk). |
| `MM_SQLSETTINGS_DATASOURCE` | Mattermost | - | Postgres connection string (private network). |
| `MM_SQLSETTINGS_DRIVERNAME` | Mattermost | postgres | Database driver. |
| `MM_FILESETTINGS_DRIVERNAME` | Mattermost | amazons3 | Store uploads, avatars and plugins in S3 (the Railway Bucket via S3 Gateway). |
| `MM_LOGSETTINGS_CONSOLEJSON` | Mattermost | false | Human-readable console logs. |
| `MM_SERVICESETTINGS_SITEURL` | Mattermost | - | Public URL of the server. Change it when you add a custom domain. |
| `MM_FILESETTINGS_AMAZONS3SSL` | Mattermost | false | Plain HTTP to the gateway (private network); the gateway uses HTTPS to the Bucket. |
| `MM_FILESETTINGS_MAXFILESIZE` | Mattermost | 104857600 | Maximum upload size in bytes (100 MB). |
| `MM_SQLSETTINGS_MAXIDLECONNS` | Mattermost | 20 | Max idle DB connections. |
| `MM_SQLSETTINGS_MAXOPENCONNS` | Mattermost | 50 | Max open DB connections (Railway Postgres allows 100). |
| `MM_FILESETTINGS_AMAZONS3BUCKET` | Mattermost | mattermost | Logical bucket = folder inside the Railway Bucket. Must be listed in the gateway's GATEWAY_BUCKETS. |
| `MM_FILESETTINGS_AMAZONS3REGION` | Mattermost | us-east-1 | Region used to sign requests to the gateway. |
| `MM_FILESETTINGS_PUBLICLINKSALT` | Mattermost | - | Salt for public file links. Changing it invalidates existing links. |
| `MM_SQLSETTINGS_ATRESTENCRYPTKEY` | Mattermost | - | Key for encrypting sensitive data at rest. Never change after first boot. |
| `MM_TEAMSETTINGS_MAXUSERSPERTEAM` | Mattermost | 250 | Max members per team (Team Edition servers are limited to 250 active users). |
| `MM_FILESETTINGS_AMAZONS3ENDPOINT` | Mattermost | - | S3 Gateway address on the private network (host:port, no scheme). |
| `MM_SERVICESETTINGS_LISTENADDRESS` | Mattermost | :8065 | Listen on all IPv4 and IPv6 interfaces. |
| `MM_FILESETTINGS_AMAZONS3ACCESSKEYID` | Mattermost | - | Gateway access key. |
| `MM_NOTIFICATIONLOGSETTINGS_ENABLEFILE` | Mattermost | false | No notification log file on the ephemeral disk. |
| `MM_FILESETTINGS_AMAZONS3SECRETACCESSKEY` | Mattermost | (secret) | Gateway secret key. |
| `MM_SERVICESETTINGS_TRUSTEDPROXYIPHEADER` | Mattermost | X-Forwarded-For X-Real-IP | Headers carrying the client IP behind Railway's proxy (audit logs, rate limits). |
| `MM_EMAILSETTINGS_PUSHNOTIFICATIONCONTENTS` | Mattermost | generic | Mobile push shows sender and channel, not message text (pushes travel through Mattermost's push service). |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v4/system/ping`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Tags:** mattermost, team-chat, slack-alternative, messaging, collaboration · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mattermost-v11-team-chat)
