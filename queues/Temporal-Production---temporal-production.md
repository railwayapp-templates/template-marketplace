# Deploy Temporal Production on Railway

Self-hosted Temporal cluster with PostgreSQL and a protected Web UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/temporal-production)

## About

Temporal Production is a self-hosted Temporal cluster for running durable, fault-tolerant applications on Railway. It preserves Workflow state, timers, retries, and event histories through failures and restarts. The template includes independently scalable Temporal services, PostgreSQL persistence, automatic schema initialization, Namespace creation, health checks, and an authenticated Web UI.

Hosting Temporal Production requires multiple coordinated services rather than a single development server. This template deploys the Temporal Frontend, History, Matching, and System Worker roles as independent Railway services connected through private networking. PostgreSQL provides durable persistence for Workflow state, event history, Namespace metadata, and Visibility records. Dedicated setup services initialize and upgrade the required database schemas and create the default Namespace. A private Temporal Web UI is exposed through a Basic Auth-protected gateway. Application-specific Workers are deployed separately and connect to the private Frontend endpoint. Operators remain responsible for backups, monitoring, resource sizing, retention policies, and controlled upgrades.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| temporal-ui | `temporalio/ui:2.53.3` | Worker |
| temporal-schema | `temporalio/admin-tools:1.31.2` | Worker |
| temporal-ui-auth | `caddy:2.11.4-alpine` | Web service |
| temporal-bootstrap | `temporalio/admin-tools:1.31.2` | Worker |
| temporal-system-worker | `temporalio/server:1.31.2` | Worker |
| temporal-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| temporal-matching | `temporalio/server:1.31.2` | Worker |
| temporal-history | `temporalio/server:1.31.2` | Worker |
| temporal-frontend | `temporalio/server:1.31.2` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TEMPORAL_ADDRESS` | temporal-ui | - | Private gRPC endpoint used by the Web UI to query Temporal. |
| `TEMPORAL_UI_PORT` | temporal-ui | 8080 | Internal HTTP port on which the Temporal Web UI listens. |
| `BOOTSTRAP_READY_HOST` | temporal-ui | - | Railway dependency marker ensuring Namespace bootstrap is available first. |
| `TEMPORAL_OPENAPI_ENABLED` | temporal-ui | true | Enables the Temporal UI OpenAPI endpoint. |
| `TEMPORAL_DEFAULT_NAMESPACE` | temporal-ui | default | Namespace selected automatically when users open the Web UI. |
| `TEMPORAL_NOTIFY_ON_NEW_VERSION` | temporal-ui | false | Disables upstream version notification banners in the Web UI. |
| `PORT` | temporal-schema | 8080 | Internal HTTP port used only for the Railway readiness health check. |
| `DBNAME` | temporal-schema | temporal | Database that stores Temporal Workflow state and event history. |
| `DB_PORT` | temporal-schema | - | Internal PostgreSQL port used during schema initialization. |
| `POSTGRES_PWD` | temporal-schema | - | PostgreSQL password used by the Temporal schema tools. |
| `SQL_PASSWORD` | temporal-schema | (secret) | SQL password alias required by the Temporal PostgreSQL tooling. |
| `POSTGRES_USER` | temporal-schema | (secret) | PostgreSQL user used to create and upgrade Temporal schemas. |
| `POSTGRES_SEEDS` | temporal-schema | - | Private PostgreSQL hostname used by the Temporal schema tools. |
| `VISIBILITY_DBNAME` | temporal-schema | temporal_visibility | Database that stores Workflow list and visibility records. |
| `PORT` | temporal-ui-auth | 8080 | HTTP port exposed by the authenticated Caddy gateway to Railway. |
| `UI_PASSWORD` | temporal-ui-auth | (secret) | Strong password generated automatically for Web UI access. |
| `UI_UPSTREAM` | temporal-ui-auth | - | Private upstream address of the Temporal Web UI service. |
| `UI_USERNAME` | temporal-ui-auth | (secret) | Username required to access the protected Temporal Web UI. |
| `PORT` | temporal-bootstrap | 8080 | Internal HTTP port used only for the Railway readiness health check. |
| `TEMPORAL_ADDRESS` | temporal-bootstrap | - | Private gRPC endpoint of the Temporal Frontend service. |
| `DEFAULT_NAMESPACE` | temporal-bootstrap | default | Namespace created automatically for application Workflows and Workers. |
| `DEFAULT_NAMESPACE_RETENTION` | temporal-bootstrap | 72h | Time completed Workflow histories are retained before automatic deletion. |
| `DB` | temporal-system-worker | postgres12 | Temporal persistence plugin for PostgreSQL-compatible schemas. |
| `DBNAME` | temporal-system-worker | temporal | Database containing Workflow state and event history. |
| `DB_PORT` | temporal-system-worker | - | Internal PostgreSQL service port. |
| `ENABLE_ES` | temporal-system-worker | false | Uses PostgreSQL advanced visibility instead of Elasticsearch. |
| `LOG_LEVEL` | temporal-system-worker | info | Temporal server logging level suitable for normal production operation. |
| `POSTGRES_PWD` | temporal-system-worker | - | PostgreSQL password shared by the Temporal server roles. |
| `POSTGRES_USER` | temporal-system-worker | (secret) | PostgreSQL user shared by the Temporal server roles. |
| `SQL_MAX_CONNS` | temporal-system-worker | 10 | Maximum persistence database connections opened by each server process. |
| `POSTGRES_SEEDS` | temporal-system-worker | - | Private hostname of the Railway PostgreSQL service. |
| `SCHEMA_READY_HOST` | temporal-system-worker | - | Railway dependency marker ensuring schema initialization is available first. |
| `SQL_VIS_MAX_CONNS` | temporal-system-worker | 5 | Maximum visibility database connections opened by each server process. |
| `VISIBILITY_DBNAME` | temporal-system-worker | temporal_visibility | Database containing Workflow visibility and list data. |
| `NUM_HISTORY_SHARDS` | temporal-system-worker | 512 | Number of History shards created for the cluster. Cannot be changed after initialization. |
| `SQL_MAX_IDLE_CONNS` | temporal-system-worker | 10 | Maximum idle persistence connections retained by each server process. |
| `SQL_VIS_MAX_IDLE_CONNS` | temporal-system-worker | 5 | Maximum idle visibility connections retained by each server process. |
| `DYNAMIC_CONFIG_FILE_PATH` | temporal-system-worker | /tmp/temporal-dynamicconfig.yaml | Runtime path for the Dynamic Config file created during container startup. |
| `POSTGRES_DB` | temporal-db | railway | Default PostgreSQL database created when the service initializes. |
| `DATABASE_URL` | temporal-db | - | Private PostgreSQL connection URL for services in the same Railway project. |
| `POSTGRES_USER` | temporal-db | (secret) | PostgreSQL superuser created during first initialization. |
| `POSTGRES_PASSWORD` | temporal-db | (secret) | Strong PostgreSQL password generated independently for every deployment. |
| `DB` | temporal-matching | postgres12 | Temporal persistence plugin for PostgreSQL-compatible schemas. |
| `DBNAME` | temporal-matching | temporal | Database containing Workflow state and event history. |
| `DB_PORT` | temporal-matching | - | Internal PostgreSQL service port. |
| `ENABLE_ES` | temporal-matching | false | Uses PostgreSQL advanced visibility instead of Elasticsearch. |
| `LOG_LEVEL` | temporal-matching | info | Temporal server logging level suitable for normal production operation. |
| `POSTGRES_PWD` | temporal-matching | - | PostgreSQL password shared by the Temporal server roles. |
| `POSTGRES_USER` | temporal-matching | (secret) | PostgreSQL user shared by the Temporal server roles. |
| `SQL_MAX_CONNS` | temporal-matching | 10 | Maximum persistence database connections opened by each server process. |
| `POSTGRES_SEEDS` | temporal-matching | - | Private hostname of the Railway PostgreSQL service. |
| `SCHEMA_READY_HOST` | temporal-matching | - | Railway dependency marker ensuring schema initialization is available first. |
| `SQL_VIS_MAX_CONNS` | temporal-matching | 5 | Maximum visibility database connections opened by each server process. |
| `VISIBILITY_DBNAME` | temporal-matching | temporal_visibility | Database containing Workflow visibility and list data. |
| `NUM_HISTORY_SHARDS` | temporal-matching | 512 | Number of History shards created for the cluster. Cannot be changed after initialization. |
| `SQL_MAX_IDLE_CONNS` | temporal-matching | 10 | Maximum idle persistence connections retained by each server process. |
| `SQL_VIS_MAX_IDLE_CONNS` | temporal-matching | 5 | Maximum idle visibility connections retained by each server process. |
| `DYNAMIC_CONFIG_FILE_PATH` | temporal-matching | /tmp/temporal-dynamicconfig.yaml | Runtime path for the Dynamic Config file created during container startup. |
| `DB` | temporal-history | postgres12 | Temporal persistence plugin for PostgreSQL-compatible schemas. |
| `DBNAME` | temporal-history | temporal | Database containing Workflow state and event history. |
| `DB_PORT` | temporal-history | - | Internal PostgreSQL service port. |
| `ENABLE_ES` | temporal-history | false | Uses PostgreSQL advanced visibility instead of Elasticsearch. |
| `LOG_LEVEL` | temporal-history | info | Temporal server logging level suitable for normal production operation. |
| `POSTGRES_PWD` | temporal-history | - | PostgreSQL password shared by the Temporal server roles. |
| `POSTGRES_USER` | temporal-history | (secret) | PostgreSQL user shared by the Temporal server roles. |
| `SQL_MAX_CONNS` | temporal-history | 10 | Maximum persistence database connections opened by each server process. |
| `POSTGRES_SEEDS` | temporal-history | - | Private hostname of the Railway PostgreSQL service. |
| `SCHEMA_READY_HOST` | temporal-history | - | Railway dependency marker ensuring schema initialization is available first. |
| `SQL_VIS_MAX_CONNS` | temporal-history | 5 | Maximum visibility database connections opened by each server process. |
| `VISIBILITY_DBNAME` | temporal-history | temporal_visibility | Database containing Workflow visibility and list data. |
| `NUM_HISTORY_SHARDS` | temporal-history | 512 | Number of History shards created for the cluster. Cannot be changed after initialization. |
| `SQL_MAX_IDLE_CONNS` | temporal-history | 10 | Maximum idle persistence connections retained by each server process. |
| `SQL_VIS_MAX_IDLE_CONNS` | temporal-history | 5 | Maximum idle visibility connections retained by each server process. |
| `DYNAMIC_CONFIG_FILE_PATH` | temporal-history | /tmp/temporal-dynamicconfig.yaml | Runtime path for the Dynamic Config file created during container startup. |
| `DB` | temporal-frontend | postgres12 | Temporal persistence plugin for PostgreSQL-compatible schemas. |
| `DBNAME` | temporal-frontend | temporal | Database containing Workflow state and event history. |
| `DB_PORT` | temporal-frontend | - | Internal PostgreSQL service port. |
| `ENABLE_ES` | temporal-frontend | false | Uses PostgreSQL advanced visibility instead of Elasticsearch. |
| `LOG_LEVEL` | temporal-frontend | info | Temporal server logging level suitable for normal production operation. |
| `POSTGRES_PWD` | temporal-frontend | - | PostgreSQL password shared by the Temporal server roles. |
| `POSTGRES_USER` | temporal-frontend | (secret) | PostgreSQL user shared by the Temporal server roles. |
| `SQL_MAX_CONNS` | temporal-frontend | 10 | Maximum persistence database connections opened by each server process. |
| `POSTGRES_SEEDS` | temporal-frontend | - | Private hostname of the Railway PostgreSQL service. |
| `SCHEMA_READY_HOST` | temporal-frontend | - | Railway dependency marker ensuring schema initialization is available first. |
| `SQL_VIS_MAX_CONNS` | temporal-frontend | 5 | Maximum visibility database connections opened by each server process. |
| `VISIBILITY_DBNAME` | temporal-frontend | temporal_visibility | Database containing Workflow visibility and list data. |
| `NUM_HISTORY_SHARDS` | temporal-frontend | 512 | Number of History shards created for the cluster. Cannot be changed after initialization. |
| `SQL_MAX_IDLE_CONNS` | temporal-frontend | 10 | Maximum idle persistence connections retained by each server process. |
| `SQL_VIS_MAX_IDLE_CONNS` | temporal-frontend | 5 | Maximum idle visibility connections retained by each server process. |
| `DYNAMIC_CONFIG_FILE_PATH` | temporal-frontend | /tmp/temporal-dynamicconfig.yaml | Runtime path for the Dynamic Config file created during container startup. |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; until nc -z "$POSTGRES_SEEDS" "$DB_PORT"; do echo "Waiting for PostgreSQL..."; sleep 2; done; temporal-sql-tool --plugin postgres12 --ep "$POSTGRES_SEEDS" -u "$POSTGRES_USER" -p "$DB_PORT" --db "$DBNAME" create || true; temporal-sql-tool --plugin postgres12 --ep "$POSTGRES_SEEDS" -u "$POSTGRES_USER" -p "$DB_PORT" --db "$DBNAME" setup-schema -v 0.0 || true; temporal-sql-tool --plugin postgres12 --ep "$POSTGRES_SEEDS" -u "$POSTGRES_USER" -p "$DB_PORT" --db "$DBNAME" update-schema -d /etc/temporal/schema/postgresql/v12/temporal/versioned; temporal-sql-tool --plugin postgres12 --ep "$POSTGRES_SEEDS" -u "$POSTGRES_USER" -p "$DB_PORT" --db "$VISIBILITY_DBNAME" create || true; temporal-sql-tool --plugin postgres12 --ep "$POSTGRES_SEEDS" -u "$POSTGRES_USER" -p "$DB_PORT" --db "$VISIBILITY_DBNAME" setup-schema -v 0.0 || true; temporal-sql-tool --plugin postgres12 --ep "$POSTGRES_SEEDS" -u "$POSTGRES_USER" -p "$DB_PORT" --db "$VISIBILITY_DBNAME" update-schema -d /etc/temporal/schema/postgresql/v12/visibility/versioned; printf "#!/bin/sh\nprintf '\''HTTP/1.1 200 OK\\r\\nContent-Length: 2\\r\\nConnection: close\\r\\n\\r\\nOK'\''\n" >/tmp/health-handler.sh; chmod +x /tmp/health-handler.sh; echo "Schema ready; serving healthcheck on port $PORT"; exec nc -lk -s :: -p "$PORT" -e /tmp/health-handler.sh'`
- **Healthcheck:** `/healthz`
- **Start command:** `/bin/sh -c 'set -eu; HASH=$(caddy hash-password --plaintext "$UI_PASSWORD"); printf ":%s {\n handle /healthz {\n  respond \"OK\" 200\n }\n handle {\n  basic_auth {\n   %s %s\n  }\n  reverse_proxy %s\n  header {\n   X-Content-Type-Options nosniff\n   X-Frame-Options DENY\n   Referrer-Policy no-referrer\n  }\n }\n}\n" "$PORT" "$UI_USERNAME" "$HASH" "$UI_UPSTREAM" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'set -eu; until temporal operator cluster health --address "$TEMPORAL_ADDRESS" >/dev/null 2>&1; do echo "Waiting for Temporal cluster..."; sleep 3; done; if ! temporal operator namespace describe --address "$TEMPORAL_ADDRESS" --namespace "$DEFAULT_NAMESPACE" >/dev/null 2>&1; then temporal operator namespace create --address "$TEMPORAL_ADDRESS" --namespace "$DEFAULT_NAMESPACE" --retention "$DEFAULT_NAMESPACE_RETENTION"; fi; printf "#!/bin/sh\nprintf '\''HTTP/1.1 200 OK\\r\\nContent-Length: 2\\r\\nConnection: close\\r\\n\\r\\nOK'\''\n" >/tmp/health-handler.sh; chmod +x /tmp/health-handler.sh; echo "Bootstrap ready; serving healthcheck on port $PORT"; exec nc -lk -s :: -p "$PORT" -e /tmp/health-handler.sh'`
- **Start command:** `/bin/sh -c "set -eu; printf '{}\n' > \"\$DYNAMIC_CONFIG_FILE_PATH\"; BIND_ON_IP=\$(getent hosts \$(hostname) | awk 'NR==1 {print \$1}'); export BIND_ON_IP; export TEMPORAL_BROADCAST_ADDRESS=\$BIND_ON_IP; exec temporal-server start --service worker"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "set -eu; printf '{}\n' > \"\$DYNAMIC_CONFIG_FILE_PATH\"; BIND_ON_IP=\$(getent hosts \$(hostname) | awk 'NR==1 {print \$1}'); export BIND_ON_IP; export TEMPORAL_BROADCAST_ADDRESS=\$BIND_ON_IP; exec temporal-server start --service matching"`
- **Start command:** `/bin/sh -c "set -eu; printf '{}\n' > \"\$DYNAMIC_CONFIG_FILE_PATH\"; BIND_ON_IP=\$(getent hosts \$(hostname) | awk 'NR==1 {print \$1}'); export BIND_ON_IP; export TEMPORAL_BROADCAST_ADDRESS=\$BIND_ON_IP; exec temporal-server start --service history"`
- **Start command:** `/bin/sh -c "set -eu; printf '{}\n' > \"\$DYNAMIC_CONFIG_FILE_PATH\"; BIND_ON_IP=\$(getent hosts \$(hostname) | awk 'NR==1 {print \$1}'); export BIND_ON_IP; export TEMPORAL_BROADCAST_ADDRESS=\$BIND_ON_IP; exec temporal-server start --service frontend"`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/temporal-production)
