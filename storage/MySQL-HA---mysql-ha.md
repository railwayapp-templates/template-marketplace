# Deploy MySQL HA on Railway

MySQL HA cluster with Group Replication and HAProxy entry point

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mysql-ha)

## About

# MySQL HA

A highly available MySQL cluster using:
- **MySQL Group Replication** (single-primary, consensus built into mysqld)
- **HAProxy** for client connections, routing writes to the current primary

## Architecture

- **MySQL-1 (Primary)**: Current Group Replication primary (may change after failover)
- **MySQL-2+ (Replicas)**: Group members that elect a replacement on primary loss
- **MySQL HA (Edge)**: HAProxy entry point - use this for all client connections

Minimum 3 MySQL nodes: Group Replication is majority-based, so a 2-node group
cannot survive a symmetric partition. 3 members tolerate 1 node loss.

## Connecting

Use the `MYSQL_URL` or `MYSQL_PUBLIC_URL` from the "MySQL HA" (HAProxy) service.
Do not connect directly to individual MySQL nodes.

## Scaling

- **Replicas**: even counts (2/4/6/8) via the cluster overview - the cluster
  totals 3, 5, 7 or 9 members, keeping the voter count odd (Group Replication
  caps membership at 9)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL HA | `ghcr.io/railwayapp-templates/mysql-ha/haproxy:3.2` | Database |
| MySQL-1 | `ghcr.io/railwayapp-templates/mysql-ha/mysql-wrapper:8.4` | Database |
| MySQL-2 | `ghcr.io/railwayapp-templates/mysql-ha/mysql-wrapper:8.4` | Database |
| MySQL-3 | `ghcr.io/railwayapp-templates/mysql-ha/mysql-wrapper:8.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQLUSER` | MySQL HA | root |
| `MYSQL_PORT` | MySQL HA | 3306 |
| `MYSQLPASSWORD` | MySQL HA | (secret) |
| `HAPROXY_MAX_CONN` | MySQL HA | 10000 |
| `HAPROXY_TIMEOUT_CHECK` | MySQL HA | 3s |
| `HAPROXY_CHECK_INTERVAL` | MySQL HA | 3s |
| `HAPROXY_TIMEOUT_CLIENT` | MySQL HA | 30m |
| `HAPROXY_TIMEOUT_SERVER` | MySQL HA | 30m |
| `HAPROXY_CHECK_DOWNINTER` | MySQL HA | 500ms |
| `HAPROXY_CHECK_FASTINTER` | MySQL HA | 500ms |
| `HAPROXY_TIMEOUT_CONNECT` | MySQL HA | 10s |
| `MYSQLUSER` | MySQL-1 | root |
| `GR_ENABLED` | MySQL-1 | true |
| `MYSQL_PORT` | MySQL-1 | 3306 |
| `HEALTH_PORT` | MySQL-1 | 8080 |
| `MYSQLPASSWORD` | MySQL-1 | (secret) |
| `MYSQL_DATABASE` | MySQL-1 | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL-1 | (secret) |
| `GR_REPLICATION_PASSWORD` | MySQL-1 | (secret) |
| `MYSQLUSER` | MySQL-2 | root |
| `MYSQLPASSWORD` | MySQL-2 | (secret) |
| `MYSQL_ROOT_PASSWORD` | MySQL-2 | (secret) |
| `GR_REPLICATION_PASSWORD` | MySQL-2 | (secret) |
| `MYSQLUSER` | MySQL-3 | root |
| `MYSQLPASSWORD` | MySQL-3 | (secret) |
| `MYSQL_ROOT_PASSWORD` | MySQL-3 | (secret) |
| `GR_REPLICATION_PASSWORD` | MySQL-3 | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mysql-ha)
