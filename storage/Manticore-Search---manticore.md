# Deploy Manticore Search on Railway

Open-source database for full-text and vector search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/manticore)

## About

Manticore Search is an open-source database built for search. It handles full-text ranking, vector search, filtering, faceting and analytics over the same tables, and it speaks two protocols developers already have clients for: SQL over the MySQL wire protocol, and JSON over HTTP with an Elasticsearch-compatible mode. Teams reach for it when Postgres full-text search stops being good enough and a full Elasticsearch cluster is more machinery than the problem deserves. It is written in C++, keeps its indexes on disk, and runs happily in a few hundred megabytes of RAM.

This template runs two services. `manticore` is the search daemon itself, with a volume for its tables, a public HTTPS endpoint for the JSON API and a TCP proxy for MySQL clients. `dashboard` runs the Grafana and Prometheus image the Manticore team publish, so you get their monitoring dashboard and their 21 alert rules without configuring anything. The dashboard scrapes the daemon's metrics endpoint over Railway's private network and also queries your tables directly through a MySQL data source. Manticore's built-in authentication is switched on before the daemon ever accepts a connection, and the first administrator is created on the first boot from the password you supply, so nothing is ever exposed unauthenticated.

![Diagram of the Manticore and dashboard services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788934817/manticore-search-architecture.png)

Manticore Search grew out of Sphinx and is now a general-purpose search database rather than an add-on index. Self-host it when you want search you can reason about: one process, one data directory, no JVM, no cluster to babysit, and a query language your team already knows.

- Full-text search with BM25 ranking, stemming, wildcards, fuzzy matching and highlighting
- Vector search for embeddings, alongside the text index in the same table
- Real-time inserts, updates and deletes; no reindex step
- SQL over MySQL, JSON over HTTP, and an Elasticsearch-compatible write API

The `manticore` service holds all the state on its volume: tables, binary log and the authentication store. The `dashboard` service holds none of your data — its volume is only Prometheus' time series and Grafana's own settings — so it can be redeployed or removed freely.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashboard | [gridalpha/manticore-search-railway](https://github.com/gridalpha/manticore-search-railway) | Web service |
| manticore | [gridalpha/manticore-search-railway](https://github.com/gridalpha/manticore-search-railway) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | dashboard | 3000 | Port Grafana serves on |
| `MANTICORE_USER` | dashboard | (secret) | Manticore user for both |
| `MANTICORE_TARGETS` | dashboard | - | Endpoints Prometheus scrapes |
| `MANTICORE_PASSWORD` | dashboard | (secret) | Manticore password for both |
| `MANTICORE_SQL_HOST` | dashboard | - | MySQL host for the data source |
| `GF_SECURITY_ADMIN_USER` | dashboard | (secret) | Grafana administrator's name |
| `GF_SECURITY_ADMIN_PASSWORD` | dashboard | (secret) | Grafana administrator's password |
| `PORT` | manticore | 8080 | Port the HTTP front door serves on |
| `AWS_REGION` | manticore | - | Bucket region |
| `BACKUP_KEEP` | manticore | 7 | Snapshots retained in the bucket |
| `PRIVATE_SQL` | manticore | manticore.railway.internal:9306 | Private MySQL protocol endpoint |
| `PRIVATE_HTTP` | manticore | manticore.railway.internal:9308 | Private JSON API endpoint |
| `BACKUP_BUCKET` | manticore | - | Bucket holding the snapshots |
| `BACKUP_PREFIX` | manticore | manticore | Key prefix inside the bucket |
| `MANTICORE_USER` | manticore | (secret) | First administrator's name |
| `AWS_ENDPOINT_URL` | manticore | - | Bucket S3 endpoint |
| `AWS_ACCESS_KEY_ID` | manticore | - | Bucket access key |
| `MANTICORE_PASSWORD` | manticore | (secret) | First administrator's password |
| `AWS_SECRET_ACCESS_KEY` | manticore | (secret) | Bucket secret key |
| `BACKUP_INTERVAL_SECONDS` | manticore | 86400 | Seconds between snapshots |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **TCP Proxies:** 9306
- **Volume:** `/var/lib/manticore`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/manticore)
