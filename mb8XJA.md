# Deploy Redash on Railway

Connect to data, visualize, create dashboards, and share insights easily.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mb8XJA)

## About

<p align="center">
  <img width="200px" src="https://redash.io/assets/images/logo.png" title="Redash">
</p>

Redash is designed to enable anyone, regardless of the level of technical sophistication, to harness the power of data big and small. SQL users leverage Redash to explore, query, visualize, and share data from any data sources. Their work in turn enables anybody in their organization to use the data. Every day, millions of users at thousands of organizations around the world use Redash to develop insights and make data-driven decisions.

Redash features:

1. **Browser-based**: Everything in your browser, with a shareable URL.
2. **Ease-of-use**: Become immediately productive with data without the need to master complex software.
3. **Query editor**: Quickly compose SQL and NoSQL queries with a schema browser and auto-complete.
4. **Visualization and dashboards**: Create [beautiful visualizations](https://redash.io/help/user-guide/visualizations/visualization-types) with drag and drop, and combine them into a single dashboard.
5. **Sharing**: Collaborate easily by sharing visualizations and their associated queries, enabling peer review of reports and queries.
6. **Schedule refreshes**: Automatically update your charts and dashboards at regular intervals you define.
7. **Alerts**: Define conditions and be alerted instantly when your data changes.
8. **REST API**: Everything that can be done in the UI is also available through REST API.
9. **Broad support for data sources**: Extensible data source API with native support for a long list of common databases and platforms.

<p align="center">
  <img style="border-radius: 10px;" width="80%" src="https://raw.githubusercontent.com/getredash/website/8e820cd02c73a8ddf4f946a9d293c54fd3fb08b9/website/_assets/images/redash-anim.gif">
</p>

## Getting Started

* [Documentation](https://redash.io/help/).

## Supported Data Sources

Redash supports more than 35 SQL and NoSQL [data sources](https://redash.io/help/data-sources/supported-data-sources). It can also be extended to support more. Below is a list of built-in sources:

- Amazon Athena
- Amazon CloudWatch / Insights
- Amazon DynamoDB
- Amazon Redshift
- ArangoDB
- Axibase Time Series Database
- Apache Cassandra
- ClickHouse
- CockroachDB
- Couchbase
- CSV
- Databricks
- DB2 by IBM
- Dgraph
- Apache Drill
- Apache Druid
- e6data
- Eccenca Corporate Memory
- Elasticsearch
- Exasol
- Microsoft Excel
- Firebolt
- Databend
- Google Analytics
- Google BigQuery
- Google Spreadsheets
- Graphite
- Greenplum
- Apache Hive
- Apache Impala
- InfluxDB
- InfluxDBv2
- IBM Netezza Performance Server
- JIRA (JQL)
- JSON
- Apache Kylin
- OmniSciDB (Formerly MapD)
- MariaDB
- MemSQL
- Microsoft Azure Data Warehouse / Synapse
- Microsoft Azure SQL Database
- Microsoft Azure Data Explorer / Kusto
- Microsoft SQL Server
- MongoDB
- MySQL
- Oracle
- Apache Phoenix
- Apache Pinot
- PostgreSQL
- Presto
- Prometheus
- Python
- Qubole
- Rockset
- RisingWave
- Salesforce
- ScyllaDB
- Shell Scripts
- Snowflake
- SPARQL
- SQLite
- TiDB
- Tinybird
- TreasureData
- Trino
- Uptycs
- Vertica
- Yandex AppMetrrica
- Yandex Metrica

## Getting Help

* Issues: https://github.com/getredash/redash/issues
* Discussion Forum: https://github.com/getredash/redash/discussions/
* Development Discussion: https://discord.gg/tN5MdmfGBp

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| KeyDB | `eqalpha/keydb:latest` | Database |
| ADHOC Worker | `redash/redash:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Server | `redash/redash:latest` | Web service |
| Scheduled Worker | `redash/redash:latest` | Worker |
| Worker | `redash/redash:latest` | Worker |
| Scheduler | `redash/redash:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KEYDB_URL` | KeyDB | - | URL to connect to KeyDB over the private network |
| `KEYDB_HOST` | KeyDB | - | Railway private domain name |
| `KEYDB_PORT` | KeyDB | 6379 | Port to connect to KeyDB over the private network |
| `KEYDB_USER` | KeyDB | (secret) | Default user to connect to KeyDB |
| `KEYDB_PASSWORD` | KeyDB | (secret) | Password to connect to KeyDB |
| `KEYDB_PUBLIC_URL` | KeyDB | - | URL to connect to KeyDB Publically |
| `KEYDB_PUBLIC_HOST` | KeyDB | - | Railway public TCP domain name |
| `KEYDB_PUBLIC_PORT` | KeyDB | - | Port to connect to KeyDB Publically |
| `QUEUES` | ADHOC Worker | queries | - |
| `WORKERS_COUNT` | ADHOC Worker | 2 | - |
| `PYTHONUNBUFFERED` | ADHOC Worker | 0 | - |
| `REDASH_LOG_LEVEL` | ADHOC Worker | INFO | - |
| `POSTGRES_PASSWORD` | ADHOC Worker | (secret) | - |
| `REDASH_SECRET_KEY` | ADHOC Worker | (secret) | - |
| `REDASH_ENFORCE_CSRF` | ADHOC Worker | true | - |
| `REDASH_COOKIE_SECRET` | ADHOC Worker | (secret) | - |
| `REDASH_GUNICORN_TIMEOUT` | ADHOC Worker | 60 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Server | 5000 | - |
| `PYTHONUNBUFFERED` | Server | 0 | - |
| `REDASH_LOG_LEVEL` | Server | INFO | - |
| `POSTGRES_PASSWORD` | Server | (secret) | - |
| `REDASH_SECRET_KEY` | Server | (secret) | - |
| `REDASH_WEB_WORKERS` | Server | 4 | - |
| `REDASH_ENFORCE_CSRF` | Server | true | - |
| `REDASH_COOKIE_SECRET` | Server | (secret) | - |
| `REDASH_GUNICORN_TIMEOUT` | Server | 60 | - |
| `QUEUES` | Scheduled Worker | scheduled_queries,schemas | - |
| `WORKERS_COUNT` | Scheduled Worker | 1 | - |
| `PYTHONUNBUFFERED` | Scheduled Worker | 0 | - |
| `REDASH_LOG_LEVEL` | Scheduled Worker | INFO | - |
| `POSTGRES_PASSWORD` | Scheduled Worker | (secret) | - |
| `REDASH_SECRET_KEY` | Scheduled Worker | (secret) | - |
| `REDASH_ENFORCE_CSRF` | Scheduled Worker | true | - |
| `REDASH_COOKIE_SECRET` | Scheduled Worker | (secret) | - |
| `REDASH_GUNICORN_TIMEOUT` | Scheduled Worker | 60 | - |
| `QUEUES` | Worker | periodic,emails,default | - |
| `WORKERS_COUNT` | Worker | 1 | - |
| `PYTHONUNBUFFERED` | Worker | 0 | - |
| `REDASH_LOG_LEVEL` | Worker | INFO | - |
| `POSTGRES_PASSWORD` | Worker | (secret) | - |
| `REDASH_SECRET_KEY` | Worker | (secret) | - |
| `REDASH_ENFORCE_CSRF` | Worker | true | - |
| `REDASH_COOKIE_SECRET` | Worker | (secret) | - |
| `REDASH_GUNICORN_TIMEOUT` | Worker | 60 | - |
| `PYTHONUNBUFFERED` | Scheduler | 0 | - |
| `REDASH_LOG_LEVEL` | Scheduler | INFO | - |
| `POSTGRES_PASSWORD` | Scheduler | (secret) | - |
| `REDASH_SECRET_KEY` | Scheduler | (secret) | - |
| `REDASH_ENFORCE_CSRF` | Scheduler | true | - |
| `REDASH_COOKIE_SECRET` | Scheduler | (secret) | - |
| `REDASH_GUNICORN_TIMEOUT` | Scheduler | 60 | - |

## Configuration

- **Start command:** `/bin/sh -c "exec keydb-server /etc/keydb/keydb.conf --server-threads 16 --always-show-logo no --appendonly yes --requirepass ${KEYDB_PASSWORD} --port ${KEYDB_PORT}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/app/bin/docker-entrypoint worker`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "/app/bin/docker-entrypoint create_db && exec /app/bin/docker-entrypoint server"`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/app/bin/docker-entrypoint scheduler`

**Category:** Other

[View on Railway →](https://railway.com/template/mb8XJA)
