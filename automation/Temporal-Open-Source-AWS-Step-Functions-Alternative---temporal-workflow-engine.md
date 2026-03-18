# Deploy Temporal | Open Source AWS Step Functions Alternative on Railway

Self-host Temporal. Durable Workflow Engine for workflow Orchestration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/temporal-workflow-engine)

## About

Self-host Temporal — the open-source durable execution platform used in production by Stripe, Netflix, Datadog, and Snap — on Railway with a one-click deploy. Temporal guarantees workflows run to completion through infrastructure failures and outages, eliminating hand-rolled retry logic, state machines, and scheduler glue code. 
Deploy Temporal with the full five-service stack:
![Temporal Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773692645/Temporal_railway_arch_nkvphf.png)

Temporal is MIT-licensed, originally forked from Uber's Cadence project. Where Airflow schedules DAGs and Step Functions chain Lambda invocations, Temporal treats each workflow as a stateful function that can sleep for months, handle signals from external systems, and resume exactly where it left off after any failure — without losing state.

Key features:
- **Durable execution** — workflow state is checkpointed at every step; crashes are transparent to your code
- **Automatic retries** — configurable retry policies on activities with backoff, jitter, and timeout controls
- **Long-running workflows** — natively supports workflows spanning seconds, days, or years
- **Signals and queries** — send external events into running workflows; inspect live workflow state programmatically
- **Schedules** — cron-style triggers for recurring workflows, replacing fragile cron jobs
- **Multi-language SDKs** — Go, Python, TypeScript, Java, .NET, Ruby

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| temporal-admin-tools | `temporalio/admin-tools` | Worker |
| temporal_server | `temporalio/auto-setup` | Worker |
| temporal-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| temporal-ui | `temporalio/ui` | Web service |
| elasticsearch-railway | [praveen-ks-2001/elasticsearch-railway](https://github.com/praveen-ks-2001/elasticsearch-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TEMPORAL_ADDRESS` | temporal-admin-tools | - | Temporal server gRPC endpoint |
| `TEMPORAL_CLI_ADDRESS` | temporal-admin-tools | - | CLI endpoint for Temporal server |
| `DB` | temporal_server | postgres12 | Database backend engine type |
| `ES_PWD` | temporal_server | - | Elasticsearch authentication password |
| `DB_PORT` | temporal_server | 5432 | Database server port |
| `ES_PORT` | temporal_server | 9200 | Elasticsearch server port |
| `ES_USER` | temporal_server | (secret) | Elasticsearch authentication username |
| `ES_SEEDS` | temporal_server | - | Elasticsearch cluster seed hosts |
| `ENABLE_ES` | temporal_server | true | Enable Elasticsearch advanced visibility |
| `ES_SCHEME` | temporal_server | http | Elasticsearch connection protocol scheme |
| `BIND_ON_IP` | temporal_server | 0.0.0.0 | Bind Temporal services on all interfaces |
| `ES_VERSION` | temporal_server | v7 | Elasticsearch major version compatibility |
| `POSTGRES_PWD` | temporal_server | - | Postgres database authentication password |
| `POSTGRES_USER` | temporal_server | (secret) | Postgres database authentication username |
| `POSTGRES_SEEDS` | temporal_server | - | Postgres database host address |
| `TEMPORAL_ADDRESS` | temporal_server | 127.0.0.1:7233 | Local Temporal server listening address |
| `DEFAULT_NAMESPACE` | temporal_server | default | Default Temporal namespace name |
| `TEMPORAL_NAMESPACE` | temporal_server | default | Namespace used for Temporal workflows |
| `TEMPORAL_BROADCAST_ADDRESS` | temporal_server | 127.0.0.1 | Broadcast address for cluster communication |
| `SKIP_DEFAULT_NAMESPACE_CREATION` | temporal_server | false | Skip automatic default namespace creation |
| `POSTGRES_DB` | temporal-postgres | temporal | Initial Temporal database name |
| `DATABASE_URL` | temporal-postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | temporal-postgres | (secret) | Temporal database service user |
| `POSTGRES_PASSWORD` | temporal-postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | temporal-postgres | - | Public Postgres connection string |
| `PORT` | temporal-ui | 8080 | HTTP server listening port |
| `TEMPORAL_ADDRESS` | temporal-ui | - | Temporal server gRPC endpoint |
| `TEMPORAL_UI_PORT` | temporal-ui | 8080 | Temporal UI web server port |
| `TEMPORAL_CORS_ORIGINS` | temporal-ui | http://localhost:3000 | Allowed CORS origins for UI |
| `PORT` | elasticsearch-railway | 9200 | Elasticsearch HTTP API port |
| `ES_JAVA_OPTS` | elasticsearch-railway | -Xms256m -Xmx512m | JVM heap memory configuration |
| `ELASTIC_PASSWORD` | elasticsearch-railway | (secret) | Elasticsearch cluster authentication password |
| `ELASTIC_USERNAME` | elasticsearch-railway | (secret) | Elasticsearch default superuser name |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/esdata`

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/temporal-workflow-engine)
