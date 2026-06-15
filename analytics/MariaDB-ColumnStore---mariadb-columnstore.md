# Deploy MariaDB ColumnStore on Railway

[Jun'26] Open-source MariaDB columnar database for analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mariadb-columnstore)

## About

MariaDB ColumnStore is an open-source columnar database built on MariaDB Server for analytical SQL workloads. Unlike traditional row-based databases, it stores data by columns, making it suitable for BI dashboards, reporting, aggregations, and large-scale read-heavy analytics where queries often scan selected columns across many rows.

Hosting MariaDB ColumnStore on Railway provides a simple way to deploy a self-hosted columnar analytics database without manually managing servers or infrastructure. This template runs MariaDB ColumnStore as a single-node database service with persistent storage, making it useful for testing OLAP workloads, running analytical SQL queries, building reporting backends, and experimenting with columnar database performance.

MariaDB ColumnStore is best suited for read-heavy analytical workloads such as `GROUP BY`, `COUNT`, `SUM`, filtering, and reporting queries. It is not intended to replace a standard MariaDB or MySQL database for high-frequency transactional application workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| columnstore | `mariadb/columnstore:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PM1` | mcs1 |
| `CGROUP` | ./ |
| `CEJ_USER` | (secret) |
| `CMAPI_KEY` | (secret) |
| `ADMIN_HOST` | % |
| `ADMIN_USER` | (secret) |
| `USE_S3_STORAGE` | false |

## Configuration

- **TCP Proxies:** 3306
- **Volume:** `/var/lib/columnstore`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/mariadb-columnstore)
