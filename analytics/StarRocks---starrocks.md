# Deploy StarRocks on Railway

Analyze data fast with real-time OLAP and MySQL-compatible SQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/starrocks)

## About

StarRocks is a high-performance analytical database designed for real-time OLAP, fast aggregations, interactive analytics, and BI workloads. This template runs StarRocks as a single Railway service with integrated Frontend (FE) and Backend (BE) components, MySQL-compatible SQL access, persistent storage, and HTTP administration endpoints.

Hosting StarRocks on Railway gives you a complete analytical database in a compact single-service deployment.

The official all-in-one image runs both StarRocks Frontend and Backend components inside the same container. The FE handles metadata, SQL access, query planning, and cluster management, while the BE stores analytical data and executes query workloads.

A single Railway Volume persists both FE metadata and BE data under separate directories, keeping the deployment simple while preserving database state across redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| starrocks | `starrocks/allin1-ubuntu:4.1.4` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8030 | Railway HTTP target port for StarRocks FE HTTP/API |
| `RUN_MODE` | shared_nothing | Use local BE storage in shared-nothing mode |
| `QUERY_PORT` | 9030 | MySQL-compatible SQL query port |
| `STARROCKS_FE_HEAP` | 1024m | Maximum JVM heap allocated to the FE service |
| `STARROCKS_META_DIR` | /data/persist/fe-meta | Persistent FE metadata directory |
| `STARROCKS_STORAGE_ROOT` | /data/persist/be-storage | Persistent BE analytical data directory |

## Configuration

- **Start command:** `/bin/bash -c 'mkdir -p "$STARROCKS_META_DIR" "$STARROCKS_STORAGE_ROOT"; sed -i "/^[[:space:]]*meta_dir[[:space:]]*=/d" /data/deploy/starrocks/fe/conf/fe.conf; sed -i "/^[[:space:]]*storage_root_path[[:space:]]*=/d" /data/deploy/starrocks/be/conf/be.conf; sed -i "/^[[:space:]]*JAVA_OPTS[[:space:]]*=/d" /data/deploy/starrocks/fe/conf/fe.conf; printf "\nmeta_dir = %s\nJAVA_OPTS=\"-Dlog4j2.formatMsgNoLookups=true -Xmx%s -XX:+UseG1GC -Djava.security.policy=/data/deploy/starrocks/fe/conf/udf_security.policy\"\n" "$STARROCKS_META_DIR" "$STARROCKS_FE_HEAP" >> /data/deploy/starrocks/fe/conf/fe.conf; printf "\nstorage_root_path = %s\n" "$STARROCKS_STORAGE_ROOT" >> /data/deploy/starrocks/be/conf/be.conf; exec /data/deploy/entrypoint.sh'`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 9030
- **Volume:** `/data/persist`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/starrocks)
