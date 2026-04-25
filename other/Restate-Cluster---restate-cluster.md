# Deploy Restate Cluster on Railway

Deploy and Host Restate Cluster with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/restate-cluster)

## About

Restate is a lightweight runtime to turn AI agents, workflows, and backend services into durable processes. Focus on your logic, not failure mechanics.

Run Restate Server

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| restate-3 | `ghcr.io/restatedev/restate:1.6.2` | Database |
| restate-1 | `ghcr.io/restatedev/restate:1.6.2` | Database |
| restate-2 | `ghcr.io/restatedev/restate:1.6.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `RESTATE_NODE_NAME` | restate-3 | restate-3 |
| `RESTATE_LOG_FILTER` | restate-3 | restate=info |
| `RESTATE_CLUSTER_NAME` | restate-3 | restate-cluster |
| `RESTATE_FORCE_NODE_ID` | restate-3 | 3 |
| `RESTATE_AUTO_PROVISION` | restate-3 | false |
| `RESTATE_ADVERTISED_ADDRESS` | restate-3 | http://restate-3:5122 |
| `RESTATE_DEFAULT_REPLICATION` | restate-3 | 2 |
| `RESTATE_METADATA_CLIENT__ADDRESSES` | restate-3 | ["http://restate-1:5122","http://restate-2:5122","http://restate-3:5122"] |
| `RESTATE_WORKER__SNAPSHOTS__AWS_ALLOW_HTTP` | restate-3 | true |
| `RESTATE_WORKER__SNAPSHOTS__AWS_SECRET_ACCESS_KEY` | restate-3 | (secret) |
| `RESTATE_WORKER__SNAPSHOTS__SNAPSHOT_INTERVAL_NUM_RECORDS` | restate-3 | 1000 |
| `RESTATE_NODE_NAME` | restate-1 | restate-1 |
| `RESTATE_LOG_FILTER` | restate-1 | restate=info |
| `RESTATE_CLUSTER_NAME` | restate-1 | restate-cluster |
| `RESTATE_FORCE_NODE_ID` | restate-1 | 1 |
| `RESTATE_AUTO_PROVISION` | restate-1 | true |
| `RESTATE_ADVERTISED_ADDRESS` | restate-1 | http://restate-1:5122 |
| `RESTATE_DEFAULT_REPLICATION` | restate-1 | 2 |
| `RESTATE_METADATA_CLIENT__ADDRESSES` | restate-1 | ["http://restate-1:5122","http://restate-2:5122","http://restate-3:5122"] |
| `RESTATE_WORKER__SNAPSHOTS__AWS_ALLOW_HTTP` | restate-1 | true |
| `RESTATE_WORKER__SNAPSHOTS__AWS_SECRET_ACCESS_KEY` | restate-1 | (secret) |
| `RESTATE_WORKER__SNAPSHOTS__SNAPSHOT_INTERVAL_NUM_RECORDS` | restate-1 | 1000 |
| `RESTATE_NODE_NAME` | restate-2 | restate-2 |
| `RESTATE_LOG_FILTER` | restate-2 | restate=info |
| `RESTATE_CLUSTER_NAME` | restate-2 | restate-cluster |
| `RESTATE_FORCE_NODE_ID` | restate-2 | 2 |
| `RESTATE_AUTO_PROVISION` | restate-2 | false |
| `RESTATE_ADVERTISED_ADDRESS` | restate-2 | http://restate-2:5122 |
| `RESTATE_DEFAULT_REPLICATION` | restate-2 | 2 |
| `RESTATE_METADATA_CLIENT__ADDRESSES` | restate-2 | ["http://restate-1:5122","http://restate-2:5122","http://restate-3:5122"] |
| `RESTATE_WORKER__SNAPSHOTS__AWS_ALLOW_HTTP` | restate-2 | true |
| `RESTATE_WORKER__SNAPSHOTS__AWS_SECRET_ACCESS_KEY` | restate-2 | (secret) |
| `RESTATE_WORKER__SNAPSHOTS__SNAPSHOT_INTERVAL_NUM_RECORDS` | restate-2 | 1000 |

## Configuration

- **Volume:** `/restate-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/restate-cluster)
