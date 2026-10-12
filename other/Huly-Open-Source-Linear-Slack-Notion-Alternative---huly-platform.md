# Deploy Huly | Open-Source Linear, Slack & Notion Alternative on Railway

Issues, chat, docs and planning in one self-hosted team workspace

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/huly-platform)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/huly-platform?utm_medium=integration&utm_source=button&utm_campaign=huly-platform)

[Huly](https://huly.io/) is the open-source all-in-one workspace that replaces Linear, Slack and Notion: issue tracking with projects, milestones and sprints, team chat with channels, threads and direct messages, collaborative documents, a planner and calendar, an HR and recruiting module. This template runs Huly 0.7.426, the current [huly-selfhost](https://github.com/hcengineering/huly-selfhost) release, on Postgres, Elasticsearch and Redpanda, and stores files in a Railway bucket.

Upstream's self-host compose file has 14 containers. This template runs the same software as four services and a bucket.

- **Huly.** The web front plus the account, transactor, collaborator, workspace, full-text, rekoni and stats services, all from the official `hardcoreeng/*` images at tag `v0.7.426`. They run together in one container and talk over localhost. Caddy sits in front on the only public domain and routes `/_accounts`, `/_transactor`, `/_collaborator`, `/_rekoni` and `/_stats` exactly as upstream's nginx does. Huly has no data on disk, so this service has no volume.
- **Postgres 17** holds accounts, workspaces and every issue, message and document. Huly supports Postgres as well as CockroachDB, and Postgres idles in a fraction of CockroachDB's memory.
- **Elasticsearch 7.17** backs full-text search. It is private, has machine learning switched off, and uses a 512 MB heap.
- **Redpanda 24.3** is the Kafka-compatible event queue that Huly's services use to talk to each other, for example to tell the indexer about changes. It runs single-node in dev-container mode with a 400 MB memory cap.
- **A Railway bucket (`Files`)** holds attachments, images and document bodies. Huly's `rootBucket` mode keeps every workspace under its own prefix in one bucket, so the bucket's single credential is enough and you don't need a MinIO service.

Upstream's `hulykvs` container is left out because none of the services in this stack call it. LiveKit (voice and video), mail, the AI bot, print, Gmail, Telegram and GitHub integrations are optional upstream add-ons and are not included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redpanda | `redpandadata/redpanda:v24.3.18` | Database |
| Huly | [nomideusz/huly-railway](https://github.com/nomideusz/huly-railway) | Web service |
| Elasticsearch | `elasticsearch:7.17.28` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Huly | 8000 | Port the Caddy edge listens on - leave as is |
| `TITLE` | Huly | Huly | Name shown in the browser tab |
| `DB_URL` | Huly | - | Postgres on the private network |
| `S3_BUCKET` | Huly | - | Railway bucket name (every workspace gets its own prefix) |
| `S3_REGION` | Huly | - | Railway bucket region |
| `PUBLIC_URL` | Huly | - | Public URL of Huly (sign-in, websockets, links) - set it to your custom domain after adding one |
| `S3_ENDPOINT` | Huly | - | Railway bucket endpoint for attachments and documents |
| `ADMIN_EMAILS` | Huly | - | Optional comma-separated emails that get Huly's instance admin console |
| `QUEUE_CONFIG` | Huly | - | Redpanda (Kafka API) on the private network |
| `S3_ACCESS_KEY` | Huly | - | Railway bucket access key |
| `S3_SECRET_KEY` | Huly | (secret) | Railway bucket secret key |
| `SERVER_SECRET` | Huly | (secret) | Signs every login and service token shared by Huly's services. Changing it logs everyone out |
| `DISABLE_SIGNUP` | Huly | false | Set to true after your team has signed up to close public registration (invites still work) |
| `FULLTEXT_DB_URL` | Huly | - | Elasticsearch on the private network (full-text search index) |
| `LAST_NAME_FIRST` | Huly | true | Show people as 'Last First' instead of 'First Last' |
| `DEFAULT_LANGUAGE` | Huly | en | Default UI language (en, de, es, fr, it, pt, ru, zh, ja, cs, tr) |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms512m -Xmx512m | JVM heap - raise to 1g for large workspaces |
| `network.host` | Elasticsearch | :: | Listen on IPv6 and IPv4 so Railway's private network can reach it |
| `discovery.type` | Elasticsearch | single-node | Single-node cluster |
| `xpack.ml.enabled` | Elasticsearch | false | Machine learning off - saves memory, Huly does not use it |
| `TAKE_FILE_OWNERSHIP` | Elasticsearch | true | Hands the root-owned Railway volume to the elasticsearch user on boot |
| `xpack.security.enabled` | Elasticsearch | false | Private network only; Huly connects without credentials, like upstream |
| `ingest.geoip.downloader.enabled` | Elasticsearch | false | Skip the GeoIP database download on boot - Huly does not use it |
| `POSTGRES_DB` | Postgres | huly | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Start command:** `/bin/sh -c "exec rpk redpanda start --mode dev-container --smp 1 --memory 400M --reserve-memory 0M --kafka-addr internal://[::]:9092 --advertise-kafka-addr internal://$RAILWAY_PRIVATE_DOMAIN:9092 --rpc-addr [::]:33145 --advertise-rpc-addr $RAILWAY_PRIVATE_DOMAIN:33145 --default-log-level=warn"`
- **Volume:** `/var/lib/redpanda/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/elasticsearch/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/huly-platform)
