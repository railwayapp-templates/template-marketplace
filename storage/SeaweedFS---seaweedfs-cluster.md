# Deploy SeaweedFS on Railway

Distributed storage system with an S3-compatible API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seaweedfs-cluster)

## About

SeaweedFS is a distributed storage system that speaks the S3 API, built around one idea: a file lookup should cost a single disk seek no matter how many billions of files you store. Metadata lives in a filer, the bytes in volume servers, so adding capacity means adding a volume server rather than rebalancing a cluster. Teams reach for it when they need durable object storage they control — uploads, backups, media libraries — without paying per gigabyte or running Ceph.

Deploy SeaweedFS on Railway and you get the full production topology, not one all-in-one container: a `master` that allocates volumes, two `volume` servers storing every object twice, a `filer` keeping the namespace in PostgreSQL, an `s3` gateway serving the authenticated S3 API on a public URL, a `weed admin` console, and a maintenance `worker`. Writes reach the S3 gateway, which asks the filer where to put the data; the filer asks the master for a volume, and the bytes land on both volume servers before the request returns.

![Diagram of the SeaweedFS cluster services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787746435/seaweedfs-architecture.png)

SeaweedFS solves the small-file problem. Most object stores keep a metadata record per object in a general-purpose database and pay for it on every read; SeaweedFS groups objects into large volume files with a compact in-memory index mapping a file id to an offset. That gives O(1) disk access at ten thousand objects or ten billion, which is why it sits behind image services, CDN origins and backup targets.

Key capabilities:

- S3 API with SigV4 auth, multipart uploads, ranged reads and per-bucket isolation
- Replication as a three-digit code for copies across data centres, racks and nodes
- A filer presenting a POSIX-style namespace over the same data
- Erasure coding, background vacuuming and rebalancing driven by maintenance workers
- Iceberg REST catalog and Lance namespace endpoints for analytics
- Apache 2.0 licensed, with over a decade of active development

Each role is its own Railway service. `master` tracks the volume servers, allocates volumes and holds raft leadership. `volume1` and `volume2` are the data plane, both in one rack so the default `001` policy puts a second copy of every volume on the other node. `filer` owns the directory tree and object metadata in PostgreSQL. `s3` turns S3 requests into filer operations. `admin` is the console and the gRPC endpoint `worker` connects to.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| admin | `chrislusf/seaweedfs:4.44` | Web service |
| master | `chrislusf/seaweedfs:4.44` | Database |
| worker | `chrislusf/seaweedfs:4.44` | Database |
| filer | `chrislusf/seaweedfs:4.44` | Worker |
| volume2 | `chrislusf/seaweedfs:4.44` | Database |
| volume1 | `chrislusf/seaweedfs:4.44` | Database |
| s3 | `chrislusf/seaweedfs:4.44` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | admin | 23646 | HTTP port Railway health-checks |
| `MASTER_HOST` | admin | - | Master address |
| `SEAWEED_ADMIN_USER` | admin | (secret) | Console username |
| `SEAWEED_ADMIN_PASSWORD` | admin | (secret) | Console password |
| `PORT` | master | 9333 | HTTP port Railway health-checks |
| `SEAWEEDFS_REPLICATION` | master | 001 | Copies per volume: dc/rack/node |
| `SEAWEEDFS_VOLUME_SIZE_LIMIT_MB` | master | 128 | Max size of one volume file |
| `WEED_MASTER_VOLUME_GROWTH_COPY_1` | master | 2 | Volumes pre-allocated, unreplicated |
| `WEED_MASTER_VOLUME_GROWTH_COPY_2` | master | 2 | Volumes pre-allocated, two copies |
| `WEED_MASTER_VOLUME_GROWTH_COPY_3` | master | 2 | Volumes pre-allocated, three copies |
| `PORT` | worker | 9327 | Metrics port Railway health-checks |
| `ADMIN_HOST` | worker | - | Admin HTTP address |
| `PORT` | filer | 8888 | HTTP port Railway health-checks |
| `MASTER_HOST` | filer | - | Master address |
| `WEED_POSTGRES2_PORT` | filer | - | Postgres port |
| `WEED_LEVELDB2_ENABLED` | filer | false | Disable the image's embedded store |
| `WEED_POSTGRES2_ENABLED` | filer | true | Use Postgres for filer metadata |
| `WEED_POSTGRES2_SSLMODE` | filer | require | Encrypt without cert validation |
| `WEED_POSTGRES2_DATABASE` | filer | - | Postgres database name |
| `WEED_POSTGRES2_HOSTNAME` | filer | - | Postgres private hostname |
| `WEED_POSTGRES2_PASSWORD` | filer | (secret) | Postgres password |
| `WEED_POSTGRES2_USERNAME` | filer | (secret) | Postgres user |
| `PORT` | volume2 | 8080 | HTTP port Railway health-checks |
| `MASTER_HOST` | volume2 | - | Master address |
| `PORT` | volume1 | 8080 | HTTP port Railway health-checks |
| `MASTER_HOST` | volume1 | - | Master address |
| `PORT` | s3 | 8333 | HTTP port Railway health-checks |
| `FILER_HOST` | s3 | - | Filer address |
| `S3_EXTERNAL_URL` | s3 | - | Host used for signatures |
| `AWS_ACCESS_KEY_ID` | s3 | - | S3 access key, enables auth |
| `AWS_SECRET_ACCESS_KEY` | s3 | (secret) | S3 secret key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'M="${MASTER_HOST:-}"; case "$M" in ""|":"*) M=master.railway.internal:9333;; esac; exec /entrypoint.sh -logtostderr=true admin -master="$M" -port=23646 -dataDir=/data -adminUser="${SEAWEED_ADMIN_USER:-admin}" -adminPassword="$SEAWEED_ADMIN_PASSWORD"'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'IP="${RAILWAY_PRIVATE_DOMAIN:-}"; [ -z "$IP" ] && IP=master.railway.internal; exec /entrypoint.sh master -ip="$IP" -ip.bind="[::]" -port=9333 -defaultReplication="${SEAWEEDFS_REPLICATION:-001}" -volumeSizeLimitMB="${SEAWEEDFS_VOLUME_SIZE_LIMIT_MB:-256}"'`
- **Healthcheck:** `/healthz`
- **Start command:** `/bin/sh -c 'A="${ADMIN_HOST:-}"; case "$A" in ""|":"*) A=admin.railway.internal:23646;; esac; exec /entrypoint.sh -logtostderr=true worker -admin="$A" -metricsPort=9327'`
- **Healthcheck:** `/metrics`
- **Start command:** `/bin/sh -c 'M="${MASTER_HOST:-}"; case "$M" in ""|":"*) M=master.railway.internal:9333;; esac; IP="${RAILWAY_PRIVATE_DOMAIN:-}"; [ -z "$IP" ] && IP=filer.railway.internal; exec /entrypoint.sh filer -ip="$IP" -ip.bind="[::]" -port=8888 -master="$M"'`
- **Start command:** `/bin/sh -c 'M="${MASTER_HOST:-}"; case "$M" in ""|":"*) M=master.railway.internal:9333;; esac; IP="${RAILWAY_PRIVATE_DOMAIN:-}"; [ -z "$IP" ] && IP=volume2.railway.internal; exec /entrypoint.sh volume -ip="$IP" -ip.bind="[::]" -port=8080 -master="$M" -dataCenter=railway -rack=rack1'`
- **Start command:** `/bin/sh -c 'M="${MASTER_HOST:-}"; case "$M" in ""|":"*) M=master.railway.internal:9333;; esac; IP="${RAILWAY_PRIVATE_DOMAIN:-}"; [ -z "$IP" ] && IP=volume1.railway.internal; exec /entrypoint.sh volume -ip="$IP" -ip.bind="[::]" -port=8080 -master="$M" -dataCenter=railway -rack=rack1'`
- **Start command:** `/bin/sh -c 'F="${FILER_HOST:-}"; case "$F" in ""|":"*) F=filer.railway.internal:8888;; esac; IP="${RAILWAY_PRIVATE_DOMAIN:-}"; [ -z "$IP" ] && IP=s3.railway.internal; exec /entrypoint.sh s3 -ip="$IP" -ip.bind="[::]" -port=8333 -filer="$F"'`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/seaweedfs-cluster)
