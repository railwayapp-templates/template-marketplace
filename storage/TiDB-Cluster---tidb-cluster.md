# Deploy TiDB Cluster on Railway

A MySQL-compatible distributed SQL database, deploy in 1-click 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tidb-cluster)

## About

TiDB is an open-source distributed SQL database designed for scalability, strong consistency, and MySQL compatibility.

This Railway template deploys a minimal TiDB cluster using separate TiDB, PD, and TiKV services connected through Railway Private Networking.

Hosting TiDB Cluster on Railway gives you a simplified distributed SQL environment without manually provisioning multiple virtual machines or managing Kubernetes.

This template deploys:

* **TiDB** as the SQL processing layer
* **PD** for cluster metadata and placement management
* **TiKV** as the persistent transactional storage layer

Only the TiDB service should be accessed by applications.

PD and TiKV remain internal and communicate through Railway Private Networking.

For external database connections, use Railway **TCP Proxy** on the TiDB service instead of an HTTP public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pd | `pingcap/pd:v8.5.8` | Database |
| tidb | `pingcap/tidb:v8.5.8` | TCP service |
| tikv | `pingcap/tikv:v8.5.8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | pd | 2379 | Railway service port for PD client traffic |
| `PORT` | tidb | 4000 | MySQL-compatible SQL port |
| `PD_HOST` | tidb | - | Private hostname of the PD service |
| `PORT` | tikv | 20160 | TiKV service port |
| `PD_HOST` | tikv | - | Private hostname of the PD service |

## Configuration

- **Start command:** `pd-server \   --name=pd \   --data-dir=/data/pd \   --client-urls=http://0.0.0.0:2379 \   --advertise-client-urls=http://${RAILWAY_PRIVATE_DOMAIN}:2379 \   --peer-urls=http://0.0.0.0:2380 \   --advertise-peer-urls=http://${RAILWAY_PRIVATE_DOMAIN}:2380 \   --initial-cluster=pd=http://${RAILWAY_PRIVATE_DOMAIN}:2380`
- **Volume:** `/data`
- **Start command:** `tidb-server \   --store=tikv \   --path=${pd.RAILWAY_PRIVATE_DOMAIN}:2379 \   --host=0.0.0.0 \   --advertise-address=${RAILWAY_PRIVATE_DOMAIN} \   --port=4000 \   --status=10080`
- **TCP Proxies:** 4000
- **Start command:** `tikv-server \   --addr=0.0.0.0:20160 \   --advertise-addr=${RAILWAY_PRIVATE_DOMAIN}:20160 \   --status-addr=0.0.0.0:20180 \   --advertise-status-addr=${RAILWAY_PRIVATE_DOMAIN}:20180 \   --pd=${pd.RAILWAY_PRIVATE_DOMAIN}:2379 \   --data-dir=/data/tikv`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/tidb-cluster)
