# Deploy Temporal.io on Railway

Temporal is an open-source durable execution platform for scalable apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/temporalio)

## About

<img alt="Temporal Logo" src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/temporal-logo.svg" width="200">

Temporal is an open-source durable execution platform for building reliable distributed applications. It guarantees that workflows run to completion even through infrastructure failures, network outages, and server restarts. Developers write workflows as regular code in Go, Java, TypeScript, Python, or .NET, and Temporal handles retries, state persistence, and fault recovery automatically.
![Temporal workflows](https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/temporal-workflow.png)

Hosting Temporal involves deploying five interconnected services: the Temporal Server itself (via the auto-setup image, which handles database schema creation and default namespace initialization), PostgreSQL for workflow state and visibility data, Elasticsearch for advanced workflow search and filtering, a web UI for monitoring and inspecting workflow executions, and Admin Tools for cluster management and debugging. All services communicate over private networking. The auto-setup image eliminates manual schema migration and namespace configuration, making the deployment zero-config out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Temporal UI | `temporalio/ui:2.45.3` | Web service |
| Temporal Admin Tools | `temporalio/admin-tools:1.29` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Temporal Auto Setup | `temporalio/auto-setup:1.29.3` | Worker |
| Elasticsearch | [protemplate/elasticsearch-railway](https://github.com/protemplate/elasticsearch-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TEMPORAL_CORS_ORIGINS` | Temporal UI | http://localhost:3000 | - |
| `DB` | Temporal Admin Tools | postgres12 | - |
| `DB_PORT` | Temporal Admin Tools | 5432 | - |
| `ES_PORT` | Temporal Admin Tools | 9200 | - |
| `ES_SCHEME` | Temporal Admin Tools | http | - |
| `ES_VERSION` | Temporal Admin Tools | v7 | - |
| `POSTGRES_USER` | Temporal Admin Tools | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB` | Temporal Auto Setup | postgres12 | - |
| `DB_PORT` | Temporal Auto Setup | 5432 | - |
| `ES_PORT` | Temporal Auto Setup | 9200 | - |
| `ES_USER` | Temporal Auto Setup | (secret) | - |
| `ENABLE_ES` | Temporal Auto Setup | true | - |
| `BIND_ON_IP` | Temporal Auto Setup | 0.0.0.0 | - |
| `ES_VERSION` | Temporal Auto Setup | v7 | - |
| `POSTGRES_USER` | Temporal Auto Setup | (secret) | - |
| `TEMPORAL_ADDRESS` | Temporal Auto Setup | 127.0.0.1:7233 | - |
| `DEFAULT_NAMESPACE` | Temporal Auto Setup | default | - |
| `TEMPORAL_BROADCAST_ADDRESS` | Temporal Auto Setup | 127.0.0.1 | - |
| `SKIP_DEFAULT_NAMESPACE_CREATION` | Temporal Auto Setup | false | - |
| `PORT` | Elasticsearch | 9200 | - |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms256m -Xmx512m | - |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | - |
| `ELASTIC_USERNAME` | Elasticsearch | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/esdata`

**Category:** Queues · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/temporalio)
