# Deploy Tinode on Railway

Instant messaging server with a web app and mobile SDKs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tinode)

## About

Tinode is an open-source instant messaging server written in Go. It is a chat *backend* rather than a finished chat product: the server owns accounts, topics, presence and delivery receipts and exposes them over websockets, long polling and gRPC, while first-party SDKs for JavaScript, Android and iOS do the client half. Teams reach for it when they need messaging inside their own application rather than renting a proprietary chat API, and a polished web app ships alongside.

Self-host Tinode on Railway and this template wires up everything the server needs. The `tinode` service runs the chat server and serves the bundled web app on its public domain. `Postgres` is Railway's managed PostgreSQL and holds every account, topic, subscription and message. A managed bucket, `tinode-media`, holds attachments: anything above the in-band message limit is uploaded through the server and handed back as a short-lived signed URL. The server builds its own schema on the first deployment and seeds one administrator account from the credentials you supply, so nothing is left to set up by hand.

![Tinode chat server connected to a Postgres database on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788872178/tinode-architecture.png)

Tinode solves the problem of putting real chat into software that is not itself a chat app. Building messaging from scratch means reimplementing presence, ordering, delivery state and push; Tinode ships all of it behind one API and leaves the interface to you.

- Peer-to-peer, group and broadcast-channel topics with per-user access modes
- Delivery and read receipts, typing notifications, message editing and replies
- Out-of-band attachments with signed, expiring download URLs
- Websocket, long-polling and gRPC transports from one process
- Firebase push for mobile clients, and tag-based directory search
- A bundled React web app plus Android, iOS and JavaScript SDKs

The deployment is three pieces. `tinode` is the server and the web app, and the only service with a public domain. `Postgres` stores everything durable and is reachable only on the private network. `tinode-media` is object storage for attachments — the server signs a short-lived URL per download rather than opening the bucket.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tinode | [gridalpha/tinode-railway](https://github.com/gridalpha/tinode-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | tinode | 6060 | HTTP and websocket listening port |
| `PGSSLMODE` | tinode | disable | Private network, no TLS needed |
| `AWS_REGION` | tinode | - | Bucket region |
| `UPGRADE_DB` | tinode | true | Migrate the schema in place on upgrade |
| `AWS_S3_BUCKET` | tinode | - | Attachment bucket name |
| `MEDIA_HANDLER` | tinode | s3 | Store attachments in object storage |
| `ACC_GC_ENABLED` | tinode | true | Collect abandoned registrations |
| `AWS_S3_ENDPOINT` | tinode | - | S3-compatible endpoint |
| `AWS_ACCESS_KEY_ID` | tinode | - | Bucket access key |
| `PG_MAX_OPEN_CONNS` | tinode | 20 | Connection pool ceiling |
| `TINODE_ROOT_LOGIN` | tinode | (secret) | Login for the first administrator account |
| `DEFAULT_COUNTRY_CODE` | tinode | US | Fallback country for phone numbers |
| `TINODE_MASTER_SECRET` | tinode | (secret) | Seeds the server's three signing keys |
| `TINODE_ROOT_PASSWORD` | tinode | (secret) | Password for that account |
| `AWS_SECRET_ACCESS_KEY` | tinode | (secret) | Bucket secret key |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tinode)
