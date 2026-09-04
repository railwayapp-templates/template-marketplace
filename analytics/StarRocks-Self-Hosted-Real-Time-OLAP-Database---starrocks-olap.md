# Deploy StarRocks — Self-Hosted Real-Time OLAP Database on Railway

Self-host StarRocks — fast real-time OLAP, MySQL-compatible SQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/starrocks-olap)

## About

StarRocks is a high-performance, open-source analytical database (MPP OLAP) for real-time analytics — sub-second queries over large datasets, with MySQL-compatible SQL so your existing clients and BI tools connect with no new drivers. Run fast aggregations, joins, and dashboards on live data without a heavyweight pipeline. StarRocks is a powerful, resource-intensive engine built to run as a cluster, so this template deploys the all-in-one image for development and small-to-medium analytics — read the requirements below to size it correctly and know when you'd want a full cluster instead.

---

StarRocks is enterprise-grade analytical infrastructure, and its architecture and resource needs are real — this section is honest so you deploy it successfully.

**This deploys the all-in-one image — not a multi-node cluster.** StarRocks is a distributed system: in production it runs separate Frontend (FE) nodes for metadata and coordination and multiple Backend (BE) nodes for parallel execution, and its real power comes from that parallelism. This template runs the `allin1` image, which bundles FE and BE in one container — the right shape for development, learning, and small-to-medium analytics on Railway, but not a horizontally scaled cluster. For large-scale, high-concurrency production OLAP, a proper multi-node cluster is the correct home; this template is for everything below that.

**Provision meaningful RAM — this is essential.** StarRocks holds columnar data and executes vectorized queries in memory, so the Backend is memory-hungry by design — plan for several GB (8 GB is a sensible target for real query work), not the smallest tier. Under-provisioned, it will OOM on nontrivial queries or fail to start the BE. Size the plan to your data and query complexity before deploying.

**Persist FE metadata and BE data.** StarRocks stores Frontend metadata (schemas, table definitions) and Backend data (your columnar data) on disk, so a persistent volume is mounted for both — without it, your databases and tables are lost on redeploy. The volume is the single backup target.

**Query with any MySQL client — that's the compatibility win.** StarRocks speaks the MySQL wire protocol, so you connect on port `9030` with the standard `mysql` CLI, any MySQL driver, or BI tools like Metabase, Superset, Tableau, and Grafana — no StarRocks-specific driver needed. Familiar SQL and tooling over a far faster engine. Load data via Stream Load, Broker Load, Kafka routine loads, or plain `INSERT`, then run aggregations and joins that return in sub-second time thanks to the vectorized columnar engine — the point of StarRocks versus analytics on a transactional database.

Typical cost: **higher than a lightweight app** — budget for the RAM StarRocks needs (often $20–40+/month depending on the plan). It's Apache-2.0 and free of license fees, but its infrastructure footprint is significant. For lighter analytical needs, a single Postgres with good indexes may be enough.
---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| starrocks | `starrocks/allin1-ubuntu:4.1.4` | Web service |

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

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/persist`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/starrocks-olap)
