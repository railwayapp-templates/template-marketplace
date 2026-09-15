# Deploy Milvus Standalone + Attu on Railway

Milvus 3 standalone vector DB with auth on, plus the Attu admin UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/milvus-standalone-attu)

## About

Milvus is the open-source, cloud-native vector database built for billion-scale similarity search. It stores dense and sparse embeddings alongside scalar fields, supports hybrid search with metadata filtering and full-text (BM25) search, and ships SDKs for Python, Node.js, Go, and Java plus a RESTful API. Attu is the official Milvus web UI for browsing collections, running searches, managing users and roles, and importing or exporting data.

Hosting Milvus normally means running etcd, MinIO, and Milvus as three services. This template uses upstream's single-container standalone mode instead: etcd runs embedded inside the Milvus process and all data lives on the local filesystem, which is exactly what the official `standalone_embed.sh` installer does. The template wraps `milvusdb/milvus:v3.0.1` so it runs cleanly on Railway: a start command writes the two config files upstream bind-mounts, everything persists on one volume at `/var/lib/milvus`, the healthcheck probes `/healthz` on the metrics port, authentication is switched on with a generated root password, and the gRPC/REST port is published through a TCP proxy. Attu (`zilliz/attu:v3.0.0`) gets the public domain and is pre-connected to Milvus over private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Attu | `zilliz/attu:v3.0.0` | Web service |
| Milvus | `milvusdb/milvus:v3.0.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Attu | 3000 | Attu listen port (the image already sets PORT=3000 and HOST=0.0.0.0). Railway's healthcheck and the public domain probe $PORT, so keep it equal to the domain target port (3000). |
| `MILVUS_NAME` | Attu | Railway Milvus | Display name of the pre-configured connection in Attu's connection list. |
| `ATTU_AUTH_MODE` | Attu | local | Attu's own login. 'local' (upstream Docker default) shows a one-time setup form on first visit to create the Attu admin account. 'none' disables Attu login entirely; only use it behind another access layer. |
| `MILVUS_ADDRESS` | Attu | - | Milvus gRPC endpoint over Railway private networking (IPv6, port required). Attu creates a default connection to it on startup. |
| `ATTU_ADMIN_USER` | Attu | (secret) | Optional. Bootstrap Attu admin username created on startup when no users exist (skips the first-visit setup form). Must be set together with ATTU_ADMIN_PASSWORD. |
| `MILVUS_DATABASE` | Attu | default | Milvus database the pre-configured connection opens. |
| `MILVUS_PASSWORD` | Attu | (secret) | Milvus root password, referenced from the Milvus service. Update this if you change the root password inside Milvus. |
| `MILVUS_USERNAME` | Attu | (secret) | Milvus username for the pre-configured connection. 'root' is the built-in superuser. |
| `ATTU_ADMIN_PASSWORD` | Attu | (secret) | Optional. Bootstrap Attu admin password; must satisfy Attu's password policy (upstream example: Change-me-please-123). Leave empty to use the first-visit setup form. |
| `PORT` | Milvus | 9091 | Port Railway's healthcheck probes. 9091 is Milvus's metrics/management HTTP port, which serves GET /healthz (200 'OK', no auth). Do not change: the gRPC/REST port stays 19530. |
| `DEPLOY_MODE` | Milvus | STANDALONE | Reported in metrics/system info as the deployment mode (matches upstream standalone_embed.sh). |
| `ETCD_DATA_DIR` | Milvus | /var/lib/milvus/etcd | Embedded etcd data directory. Kept under /var/lib/milvus so metadata lives on the same volume as the vector data (one volume per service). |
| `ETCD_USE_EMBED` | Milvus | true | Run etcd in-process (single-container standalone mode from upstream scripts/standalone_embed.sh) instead of a separate etcd service. |
| `ETCD_CONFIG_PATH` | Milvus | /milvus/configs/embedEtcd.yaml | Embedded etcd config file. Railway cannot mount files, so the start command writes this file before launching Milvus. |
| `COMMON_STORAGETYPE` | Milvus | local | Store segments and the Woodpecker WAL on the local filesystem (localStorage.path=/var/lib/milvus/data) instead of MinIO/S3. Changing this after first boot loses access to existing data. |
| `COMMON_SECURITY_DEFAULTROOTPASSWORD` | Milvus | (secret) | Password for the built-in 'root' user (common.security.defaultRootPassword, max 72 chars). Applied ONLY on first boot when the root credential does not exist yet; changing it later has no effect (use the API/Attu to change the password instead). Attu reads this value to pre-configure its connection. |
| `COMMON_SECURITY_AUTHORIZATIONENABLED` | Milvus | true | Require username/password on gRPC and the RESTful API (common.security.authorizationEnabled). Upstream default is false (no auth). Leave true because port 19530 is exposed through the TCP proxy. |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `sh -c 'mkdir -p /var/lib/milvus/etcd && printf "listen-client-urls: http://0.0.0.0:2379\nadvertise-client-urls: http://0.0.0.0:2379\nquota-backend-bytes: 4294967296\nauto-compaction-mode: revision\nauto-compaction-retention: \"1000\"\n" > /milvus/configs/embedEtcd.yaml && printf "# Extra config to override default milvus.yaml\n" > /milvus/configs/user.yaml && exec /tini -- milvus run standalone'`
- **Healthcheck:** `/healthz`
- **TCP Proxies:** 19530
- **Volume:** `/var/lib/milvus`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/milvus-standalone-attu)
