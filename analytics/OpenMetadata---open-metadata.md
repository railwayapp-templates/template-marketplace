# Deploy OpenMetadata on Railway

OpenMetadata on Railway — catalog, column lineage, data quality tests

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-metadata)

## About

OpenMetadata is an open-source metadata platform: a searchable catalog of every table, dashboard, pipeline, topic and ML model in your data stack, with column-level lineage, data quality tests, a business glossary and governance workflows on top. It answers the questions that otherwise cost hours in Slack — where did this number come from, who owns this table, what breaks if I drop this column. It ships 75+ connectors under Apache-2.0, so there is no seat cost and no data leaves your infrastructure.

Deploy OpenMetadata on Railway and you get the production shape, not a demo container. The template runs four services: the server (API and React UI) on a public domain, an Elasticsearch node backing search and lineage, an Airflow-based ingestion agent running your connector jobs on a schedule, and managed PostgreSQL holding the catalog. They talk over the private network, so only the web UI is exposed. To self-host OpenMetadata otherwise means writing a Compose file and generating your own signing keys.

![Diagram of the OpenMetadata, Elasticsearch, ingestion and Postgres services](https://res.cloudinary.com/rroe4rtk/image/upload/v1788240491/openmetadata-architecture.png)

OpenMetadata began at Uber and is maintained by Collate under Apache-2.0. It suits a team that has outgrown a spreadsheet of table owners but does not want a per-seat SaaS catalog holding a map of its warehouse. The closest alternatives are DataHub, stronger if you will build on its metadata model, and Amundsen, which is search and little else.

Key features:

- **Unified discovery** — search across tables, dashboards, pipelines, topics, ML models and APIs.
- **Column-level lineage** — parsed from query history and dbt, drawn as an interactive graph.
- **Data quality** — declarative tests, freshness and volume checks, per-column profiles, alerting.
- **Glossary and classification** — business terms, tags and PII labels that follow lineage.
- **Governance** — approval workflows, ownership, certification, tiers and domains.
- **Open APIs and MCP** — REST API, Python SDK and a Model Context Protocol server for AI assistants.

The **server** is a Java application serving the REST API and the React UI, and owns every write. **PostgreSQL** is the system of record: entities, relationships, lineage edges, test results and encrypted credentials. **Elasticsearch** holds the indexes Explore and lineage read from, rebuilt from PostgreSQL. The **ingestion agent** is an Airflow instance carrying the connector library, which the server deploys DAGs into.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| openmetadata | [gridalpha/openmetadata-railway](https://github.com/gridalpha/openmetadata-railway) | Web service |
| elasticsearch | [gridalpha/openmetadata-railway](https://github.com/gridalpha/openmetadata-railway) | Database |
| ingestion | [gridalpha/openmetadata-railway](https://github.com/gridalpha/openmetadata-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the image |
| `PORT` | openmetadata | 8586 | Admin port Railway health-checks |
| `DB_HOST` | openmetadata | - | Private database hostname |
| `DB_PORT` | openmetadata | - | Database port |
| `DB_USER` | openmetadata | (secret) | Scoped role created at boot |
| `DB_PARAMS` | openmetadata | sslmode=require | JDBC connection parameters |
| `DB_SCHEME` | openmetadata | postgresql | JDBC scheme |
| `LOG_LEVEL` | openmetadata | INFO | Server log verbosity |
| `OM_DATABASE` | openmetadata | openmetadata_db | Catalog database name |
| `SEARCH_TYPE` | openmetadata | elasticsearch | Search backend selector |
| `SERVER_HOST` | openmetadata | :: | Dual-stack bind address |
| `SERVER_PORT` | openmetadata | 8585 | HTTP port serving API and UI |
| `OM_STATE_DIR` | openmetadata | /data | Volume path for generated keys |
| `OM_ADMIN_EMAIL` | openmetadata | admin@open-metadata.org | First administrator email |
| `DB_DRIVER_CLASS` | openmetadata | org.postgresql.Driver | JDBC driver class |
| `AIRFLOW_PASSWORD` | openmetadata | (secret) | Ingestion agent password |
| `AIRFLOW_USERNAME` | openmetadata | (secret) | Ingestion agent username |
| `DB_USER_PASSWORD` | openmetadata | (secret) | Password for that scoped role |
| `OM_ADMIN_PASSWORD` | openmetadata | (secret) | First administrator password |
| `SERVER_ADMIN_PORT` | openmetadata | 8586 | Dropwizard admin connector port |
| `ELASTICSEARCH_HOST` | openmetadata | - | Private search hostname |
| `ELASTICSEARCH_PORT` | openmetadata | 9200 | Search node port |
| `ELASTICSEARCH_USER` | openmetadata | (secret) | Search account username |
| `POSTGRES_ADMIN_URL` | openmetadata | - | Superuser URL, boot-time bootstrap only |
| `SERVER_HOST_API_URL` | openmetadata | - | Callback URL for ingestion jobs |
| `ELASTICSEARCH_SCHEME` | openmetadata | http | Search connection scheme |
| `WEB_CONF_HSTS_ENABLED` | openmetadata | true | Send Strict-Transport-Security |
| `ELASTICSEARCH_PASSWORD` | openmetadata | (secret) | Search account password |
| `OPENMETADATA_HEAP_OPTS` | openmetadata | -XX:InitialRAMPercentage=30 -XX:MaxRAMPercentage=60 | JVM heap sizing |
| `AUTHENTICATION_PROVIDER` | openmetadata | basic | Auth mode; set oidc for SSO |
| `OPENMETADATA_SERVER_URL` | openmetadata | - | Public base URL |
| `OPENMETADATA_CLUSTER_NAME` | openmetadata | openmetadata | Cluster name shown in the UI |
| `AUTHORIZER_ADMIN_PRINCIPALS` | openmetadata | [admin] | Usernames granted admin |
| `AUTHORIZER_PRINCIPAL_DOMAIN` | openmetadata | open-metadata.org | Email domain for principals |
| `DB_CONNECTION_POOL_MAX_SIZE` | openmetadata | 25 | Maximum pooled connections |
| `DB_CONNECTION_POOL_MIN_IDLE` | openmetadata | 5 | Minimum idle connections |
| `DB_CONNECTION_POOL_MIN_SIZE` | openmetadata | 5 | Minimum pooled connections |
| `FORCE_SECURE_SESSION_COOKIE` | openmetadata | true | Secure flag behind the edge proxy |
| `WEB_CONF_FRAME_OPTION_ENABLED` | openmetadata | true | Send X-Frame-Options |
| `AUTHORIZER_INGESTION_PRINCIPALS` | openmetadata | [ingestion-bot] | Bot principal for ingestion |
| `DB_CONNECTION_POOL_INITIAL_SIZE` | openmetadata | 5 | Connections opened at startup |
| `PIPELINE_SERVICE_CLIENT_ENABLED` | openmetadata | true | Enable the ingestion agent client |
| `WEB_CONF_XSS_PROTECTION_ENABLED` | openmetadata | true | Send X-XSS-Protection |
| `PIPELINE_SERVICE_CLIENT_ENDPOINT` | openmetadata | - | Ingestion agent URL |
| `AUTHENTICATION_ENABLE_SELF_SIGNUP` | openmetadata | false | Keep the instance invite-only |
| `AUTHORIZER_ENFORCE_PRINCIPAL_DOMAIN` | openmetadata | false | Allow any email domain |
| `WEB_CONF_CONTENT_TYPE_OPTIONS_ENABLED` | openmetadata | true | Send X-Content-Type-Options |
| `PORT` | elasticsearch | 9200 | HTTP port Railway health-checks |
| `ES_APP_USER` | elasticsearch | (secret) | File-realm account for the server |
| `ES_HTTP_PORT` | elasticsearch | 9200 | Search node HTTP port |
| `ES_APP_PASSWORD` | elasticsearch | (secret) | Password for that account |
| `ES_CLUSTER_NAME` | elasticsearch | openmetadata | Single-node cluster name |
| `ELASTIC_PASSWORD` | elasticsearch | (secret) | Built-in elastic bootstrap password |
| `PORT` | ingestion | 8080 | Airflow API port |
| `DB_HOST` | ingestion | - | Private database hostname |
| `DB_PORT` | ingestion | - | Database port |
| `DB_USER` | ingestion | (secret) | Scoped role created at boot |
| `DB_SCHEME` | ingestion | postgresql+psycopg2 | SQLAlchemy scheme |
| `AIRFLOW_DB` | ingestion | airflow_db | Airflow metadata database name |
| `DB_PASSWORD` | ingestion | (secret) | Password for that scoped role |
| `AIRFLOW_HOME` | ingestion | /opt/airflow | Airflow home directory |
| `DB_PROPERTIES` | ingestion | ?sslmode=require | Extra connection properties |
| `AIRFLOW_STATE_DIR` | ingestion | /airflow-data | Volume for DAGs and logs |
| `AIRFLOW_ADMIN_USER` | ingestion | (secret) | Airflow admin username |
| `POSTGRES_ADMIN_URL` | ingestion | - | Superuser URL, boot-time bootstrap only |
| `AIRFLOW_ADMIN_PASSWORD` | ingestion | (secret) | Airflow admin password |
| `AIRFLOW__API__BASE_URL` | ingestion | - | Private base URL |
| `AIRFLOW__CORE__EXECUTOR` | ingestion | LocalExecutor | Single-container executor |
| `AIRFLOW__CORE__PARALLELISM` | ingestion | 8 | Concurrent tasks across the instance |
| `AIRFLOW__API__AUTH_BACKENDS` | ingestion | airflow.api.auth.backend.basic_auth,airflow.api.auth.backend.session | API auth backends |
| `AIRFLOW__CORE__LOAD_EXAMPLES` | ingestion | False | Do not load example DAGs |
| `AIRFLOW__CORE__MAX_ACTIVE_TASKS_PER_DAG` | ingestion | 4 | Concurrent tasks per DAG |
| `AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION` | ingestion | False | Run new agents on schedule |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Volume:** `/usr/share/elasticsearch/data`
- **Healthcheck:** `/api/v2/monitor/health`
- **Volume:** `/airflow-data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/open-metadata)
