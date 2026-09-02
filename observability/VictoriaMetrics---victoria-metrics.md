# Deploy VictoriaMetrics on Railway

Time-series database for storing and querying metrics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/victoria-metrics)

## About

VictoriaMetrics is an open-source time-series database and monitoring stack that speaks the Prometheus remote-write and query APIs, so anything already writing to Prometheus can write to it unchanged. Teams adopt it when one Prometheus server stops being enough: it stores the same metrics in far less disk space, answers queries over months of history, and separates ingestion from querying so a dashboard cannot stall a scrape. It serves as long-term storage behind Grafana, as a drop-in Prometheus replacement, and as a metrics backend for teams who would rather run one dependency than a stack of sidecars.

Deploy VictoriaMetrics in its cluster shape rather than as a single box. Seven services come up together: `vmstorage` holds the data on a persistent volume, `vminsert` accepts writes and shards them across storage nodes, `vmselect` answers MetricsQL and PromQL queries, and `vmauth` is the only public service, authenticating every request and routing it to the right tier. `vmagent` scrapes each component back into the cluster, `vmalert` evaluates the project's rules, and Alertmanager delivers what fires. Everything but the gateway stays private.

![Diagram of the seven VictoriaMetrics cluster services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788210290/victoriametrics-architecture.png)

VictoriaMetrics solves the problem every growing Prometheus deployment hits: retention. Prometheus is built for short local retention and no clustering, so long history usually means bolting on Thanos or Cortex. VictoriaMetrics is one project covering ingestion, storage, querying and alerting.

- **MetricsQL** — a PromQL superset, so existing dashboards keep working
- **Wide ingestion support** — Prometheus remote write, InfluxDB line protocol, Graphite, OpenTSDB, DataDog, CSV and JSON import on one endpoint
- **Aggressive compression** — far less disk per sample than Prometheus' TSDB, which is what makes long retention affordable
- **Multi-tenancy** — an account ID in the URL path separates teams
- **Cardinality tooling** — an explorer for the labels quietly inflating your series count

Writers reach only `vminsert`, readers only `vmselect`. Because those tiers are separate Railway services, a query storm cannot slow ingestion.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vminsert | `victoriametrics/vminsert:v1.151.0-cluster` | Worker |
| vmstorage | `victoriametrics/vmstorage:v1.151.0-cluster` | Database |
| alertmanager | [gridalpha/victoriametrics-railway](https://github.com/gridalpha/victoriametrics-railway) | Database |
| vmalert | [gridalpha/victoriametrics-railway](https://github.com/gridalpha/victoriametrics-railway) | Worker |
| vmagent | [gridalpha/victoriametrics-railway](https://github.com/gridalpha/victoriametrics-railway) | Database |
| vmselect | `victoriametrics/vmselect:v1.151.0-cluster` | Worker |
| vmauth | [gridalpha/victoriametrics-railway](https://github.com/gridalpha/victoriametrics-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | vminsert | 8480 | HTTP listening port |
| `VMSTORAGE_HOST` | vminsert | - | Storage node private hostname |
| `PORT` | vmstorage | 8482 | HTTP port used by the health check |
| `VM_RETENTION_PERIOD` | vmstorage | 1 | Retention in months unless suffixed |
| `PORT` | alertmanager | 9093 | HTTP listening port |
| `PORT` | vmalert | 8880 | HTTP listening port |
| `EXTERNAL_URL` | vmalert | - | Public URL used in alert links |
| `VMINSERT_HOST` | vmalert | - | Destination for recording rules |
| `VMSELECT_HOST` | vmalert | - | Datasource for rule evaluation |
| `ALERTMANAGER_HOST` | vmalert | - | Notification target |
| `VMALERT_EVALUATION_INTERVAL` | vmalert | 30s | How often rules are evaluated |
| `PORT` | vmagent | 8429 | HTTP listening port |
| `VMAUTH_HOST` | vmagent | - | Scrape target |
| `VMALERT_HOST` | vmagent | - | Scrape target |
| `VMINSERT_HOST` | vmagent | - | Scrape target and remote-write destination |
| `VMSELECT_HOST` | vmagent | - | Scrape target |
| `VMSTORAGE_HOST` | vmagent | - | Scrape target |
| `ALERTMANAGER_HOST` | vmagent | - | Scrape target |
| `VMAUTH_METRICS_KEY` | vmagent | - | Key for the gateway's metrics endpoint |
| `PORT` | vmselect | 8481 | HTTP listening port |
| `VMALERT_HOST` | vmselect | - | Puts the rule browser inside VMUI |
| `VMSTORAGE_HOST` | vmselect | - | Storage node private hostname |
| `PORT` | vmauth | 8427 | HTTP listening port for the gateway |
| `VM_PASSWORD` | vmauth | (secret) | Password for every public route |
| `VM_USERNAME` | vmauth | (secret) | Username for every public route |
| `VMINSERT_HOST` | vmauth | - | Ingestion tier private hostname |
| `VMSELECT_HOST` | vmauth | - | Query tier private hostname |
| `VM_INTERNAL_AUTH_KEY` | vmauth | (secret) | Guards /metrics, /flags and pprof on the gateway |

## Configuration

- **Start command:** `/bin/sh -c '[ -n "$VMSTORAGE_HOST" ] || VMSTORAGE_HOST=vmstorage.railway.internal; exec /vminsert-prod -enableTCP6 -httpListenAddr=:$PORT -storageNode=$VMSTORAGE_HOST:8400'`
- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c 'exec /vmstorage-prod -enableTCP6 -httpListenAddr=:$PORT -storageDataPath=/storage/data -retentionPeriod=$VM_RETENTION_PERIOD -vminsertAddr=:8400 -vmselectAddr=:8401'`
- **Volume:** `/storage`
- **Healthcheck:** `/api/v2/status`
- **Volume:** `/alertmanager`
- **Volume:** `/vmagentdata`
- **Start command:** `/bin/sh -c '[ -n "$VMSTORAGE_HOST" ] || VMSTORAGE_HOST=vmstorage.railway.internal; [ -n "$VMALERT_HOST" ] || VMALERT_HOST=vmalert.railway.internal; exec /vmselect-prod -enableTCP6 -httpListenAddr=:$PORT -storageNode=$VMSTORAGE_HOST:8401 -vmalert.proxyURL=http://$VMALERT_HOST:8880'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/victoria-metrics)
