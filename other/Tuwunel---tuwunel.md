# Deploy Tuwunel on Railway

Chat server for private, federated team and community messaging

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tuwunel)

## About

Tuwunel is a Matrix homeserver written in Rust, and the official continuation of the conduwuit project. It speaks the full Matrix client-server and federation protocol, so the people you invite can talk to anyone on matrix.org or on a company server — while every message, room and uploaded file stays on infrastructure you control. Being a single compiled binary over an embedded RocksDB store, it runs in a few hundred megabytes where the reference Python homeserver wants gigabytes, which is what makes self-hosting Matrix realistic for a small team.

Deploy Tuwunel on Railway and you get a working chat service rather than a bare API: the homeserver, handling logins, rooms, encrypted messaging and federation, plus Element Web, a browser client already pointed at it. A volume holds the database and a Railway object storage bucket holds every uploaded image, video and file, so attachments never compete with the database for disk. Federation is published through `/.well-known/matrix/server` on port 443, so remote servers reach you over Railway's HTTPS edge with no extra port to open.

![Diagram of the Element Web and tuwunel services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787646541/tuwunel-architecture.png)

Matrix is an open standard for real-time communication, and a homeserver stores your users' accounts and their share of every room they join. Running your own means group chat, direct messages, call signalling and file sharing that no vendor can price-change, discontinue or read. Teams reach for it when a hosted chat tool becomes a compliance problem.

Tuwunel is the practical choice when you would rather not run a database cluster:

- Rooms, spaces, threads, reactions, read receipts, presence and end-to-end encryption
- Federation with the wider Matrix network, or a closed server if you turn it off
- Registration closed by default and opened only with a token; optional LDAP, OIDC and JWT login
- An embedded RocksDB database, so there is no separate Postgres to run or back up
- Media on any S3-compatible bucket, with the local disk kept as a fallback
- An in-chat admin console for user, room, media and federation moderation

**Tuwunel** is the only service holding state: its volume carries the database, its bucket the uploaded media. **Element Web** is a static client served by nginx that stores nothing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tuwunel | `ghcr.io/matrix-construct/tuwunel:latest` | Web service |
| element-web | [gridalpha/element-web-railway](https://github.com/gridalpha/element-web-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | tuwunel | 8008 | Port Railway health-checks |
| `TUWUNEL_LOG` | tuwunel | info | Log level |
| `TUWUNEL_PORT` | tuwunel | 8008 | HTTP listener port |
| `TUWUNEL_ADDRESS` | tuwunel | 0.0.0.0 | Bind address; image default is loopback only |
| `TUWUNEL_SERVER_NAME` | tuwunel | - | Suffix of every user ID, permanent |
| `TUWUNEL_DATABASE_PATH` | tuwunel | /data | RocksDB location on the volume |
| `TUWUNEL_SENDER_WORKERS` | tuwunel | 4 | Federation sender parallelism |
| `TUWUNEL_DB_POOL_WORKERS` | tuwunel | 8 | Fallback when queue detection fails |
| `TUWUNEL_TRUSTED_SERVERS` | tuwunel | ["matrix.org"] | Notary servers for signing keys |
| `TUWUNEL_ALLOW_FEDERATION` | tuwunel | true | Talk to the wider Matrix network |
| `TUWUNEL_MAX_REQUEST_SIZE` | tuwunel | 104857600 | 100 MB upload ceiling |
| `TUWUNEL_ALLOW_REGISTRATION` | tuwunel | true | Allow signup with a token |
| `TUWUNEL_REGISTRATION_TOKEN` | tuwunel | (secret) | Token new users must supply |
| `TUWUNEL_WELL_KNOWN__CLIENT` | tuwunel | - | Client discovery base URL |
| `TUWUNEL_WELL_KNOWN__SERVER` | tuwunel | - | Federation delegation to port 443 |
| `TUWUNEL_DB_POOL_MAX_WORKERS` | tuwunel | 128 | Ceiling on database pool threads |
| `TUWUNEL_DB_CACHE_CAPACITY_MB` | tuwunel | 512 | RocksDB read cache size |
| `TUWUNEL_DB_POOL_WORKERS_LIMIT` | tuwunel | 2 | Threads per storage queue; uncapped exhausts threads |
| `TUWUNEL_CACHE_CAPACITY_MODIFIER` | tuwunel | 0.2 | Scales every in-memory LRU cache |
| `TUWUNEL_MEDIA_STORAGE_PROVIDERS` | tuwunel | ["media","s3"] | Read media from bucket, disk fallback |
| `TUWUNEL_STORE_MEDIA_ON_PROVIDERS` | tuwunel | ["s3"] | Write new media to the bucket |
| `TUWUNEL_DB_WRITE_BUFFER_CAPACITY_MB` | tuwunel | 96 | RocksDB write buffer size |
| `TUWUNEL_NEW_USER_DISPLAYNAME_SUFFIX` | tuwunel | - | No emoji appended to display names |
| `TUWUNEL_ROCKSDB_PARALLELISM_THREADS` | tuwunel | 8 | RocksDB background threads |
| `TUWUNEL_STORAGE_PROVIDER__S3__S3__KEY` | tuwunel | - | Media bucket access key |
| `TUWUNEL_STORAGE_PROVIDER__S3__S3__BUCKET` | tuwunel | - | Media bucket name |
| `TUWUNEL_STORAGE_PROVIDER__S3__S3__REGION` | tuwunel | - | Media bucket region |
| `TUWUNEL_STORAGE_PROVIDER__S3__S3__SECRET` | tuwunel | (secret) | Media bucket secret key |
| `TUWUNEL_STORAGE_PROVIDER__S3__S3__ENDPOINT` | tuwunel | - | Media bucket endpoint URL |
| `TUWUNEL_STORAGE_PROVIDER__S3__S3__USE_VHOST_REQUEST` | tuwunel | false | Path-style addressing |
| `PORT` | element-web | 8080 | Port Railway health-checks |
| `ELEMENT_WEB_PORT` | element-web | 8080 | nginx listen port; default 80 cannot bind |
| `MATRIX_SERVER_NAME` | element-web | - | Matrix server name shown at login |
| `MATRIX_HOMESERVER_URL` | element-web | - | Homeserver this client signs in to |
| `ELEMENT_ALLOW_OTHER_HOMESERVERS` | element-web | false | Lock the client to this homeserver |

## Configuration

- **Healthcheck:** `/_matrix/client/versions`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tuwunel)
