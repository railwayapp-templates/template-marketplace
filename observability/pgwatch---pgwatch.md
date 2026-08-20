# Deploy pgwatch on Railway

Self-hosted PostgreSQL monitoring with preloaded Grafana dashboards.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgwatch)

## About

pgwatch is an open-source PostgreSQL monitoring tool. It polls the statistics collectors of any Postgres instance you point it at, stores the measurements as time series, and visualizes them in Grafana. No agent is installed on the monitored database, only a connection string is needed.

This template runs the full pgwatch stack from public Docker images, with no source repository to fork or maintain. Four services deploy together: a config database holding the list of monitored instances, a metrics database holding the gathered time series, the pgwatch gatherer with its web UI, and Grafana. pgwatch creates its own schema in both databases on first connect, so nothing needs bootstrapping. Grafana fetches the 22 official pgwatch dashboards from the pinned upstream release on first boot, caches them on its volume, and provisions both the dashboards and the metrics datasource automatically, so the graphs are populated the moment you add a monitored database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana | `grafana/grafana-oss:13.0.2` | Web service |
| pgwatch | `cybertecpostgresql/pgwatch:5.3.0` | Database |
| postgres-metrics | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| postgres-config | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | grafana | 3000 | Port Railway healthchecks. Must match Grafana's http_port. |
| `PGWATCH_VERSION` | grafana | 5.3.0 | pgwatch release the Grafana dashboards are fetched from. |
| `GF_PLUGINS_PREINSTALL` | grafana | marcusolsson-treemap-panel | Panel plugin the pgwatch dashboards need. Comma-separate to add more. |
| `GF_SECURITY_ADMIN_USER` | grafana | (secret) | Grafana admin username. |
| `GF_USERS_ALLOW_SIGN_UP` | grafana | false | Whether visitors may create their own Grafana accounts. |
| `GF_SECURITY_ADMIN_PASSWORD` | grafana | (secret) | Grafana admin password. |
| `PORT` | pgwatch | 8080 | Port Railway healthchecks. Must match PW_WEBADDR. |
| `PW_SINK` | pgwatch | - | Metrics database the gathered measurements are written to. |
| `PW_SOURCES` | pgwatch | - | Config database holding the list of monitored instances. |
| `PW_WEBADDR` | pgwatch | :8080 | Address the pgwatch web UI binds to. Must match PORT. |
| `PW_WEBUSER` | pgwatch | admin | Username for the pgwatch web UI and REST API. |
| `PW_WEBPASSWORD` | pgwatch | (secret) | Password for the pgwatch web UI. Blanking both it and PW_WEBUSER disables auth. |
| `POSTGRES_DB` | postgres-metrics | railway | Database created on first boot; pgwatch writes the gathered time series here. |
| `DATABASE_URL` | postgres-metrics | - | URL to connect to this Postgres over the private network. |
| `POSTGRES_USER` | postgres-metrics | (secret) | User to connect to Postgres. |
| `POSTGRES_PASSWORD` | postgres-metrics | (secret) | Generated password for the Postgres user. |
| `DATABASE_PUBLIC_URL` | postgres-metrics | - | Public URL to connect to Postgres, used by the data panel. |
| `POSTGRES_DB` | postgres-config | railway | Database created on first boot; pgwatch stores its source list and settings here. |
| `DATABASE_URL` | postgres-config | - | URL to connect to this Postgres over the private network. |
| `POSTGRES_USER` | postgres-config | (secret) | User to connect to Postgres. |
| `POSTGRES_PASSWORD` | postgres-config | (secret) | Generated password for the Postgres user. |
| `DATABASE_PUBLIC_URL` | postgres-config | - | Public URL to connect to Postgres, used by the data panel. |

## Configuration

- **Start command:** `sh -c 'set -e
DASHDIR=/var/lib/grafana/dashboards/postgres
STAMP=$DASHDIR/.provisioned-$PGWATCH_VERSION
if [ ! -f "$STAMP" ]; then
  rm -rf "$DASHDIR"
  mkdir -p "$DASHDIR"
  echo "fetching pgwatch v$PGWATCH_VERSION dashboards..."
  curl -fsSL "https://codeload.github.com/cybertec-postgresql/pgwatch/tar.gz/refs/tags/v$PGWATCH_VERSION" \
    | tar -xz -C "$DASHDIR" --strip-components=4 "pgwatch-$PGWATCH_VERSION/grafana/postgres/v12"
  touch "$STAMP"
fi
mkdir -p /etc/grafana/provisioning/dashboards /etc/grafana/provisioning/datasources
cat > /etc/grafana/provisioning/dashboards/pgwatch.yaml <<EOF
apiVersion: 1
providers:
  - name: pgwatch
    orgId: 1
    folder: pgwatch
    type: file
    disableDeletion: false
    allowUiUpdates: true
    updateIntervalSeconds: 30
    options:
      path: $DASHDIR
EOF
cat > /etc/grafana/provisioning/datasources/pgwatch.yaml <<EOF
apiVersion: 1
datasources:
  - name: pgwatch metrics (postgres)
    uid: pgwatch-metrics
    type: grafana-postgresql-datasource
    access: proxy
    url: $PGHOST:$PGPORT
    user: $PGUSER
    database: $PGDATABASE
    isDefault: true
    editable: true
    secureJsonData:
      password: $PGPASSWORD
    jsonData:
      sslmode: disable
      postgresVersion: 1800
EOF
exec /run.sh'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana`
- **Healthcheck:** `/readiness`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/pgwatch)
