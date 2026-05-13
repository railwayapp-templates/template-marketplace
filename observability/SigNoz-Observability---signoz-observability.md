# Deploy SigNoz Observability on Railway

Self-hosted observability with ClickHouse and OpenTelemetry.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/signoz-observability)

## About

SigNoz is an open-source observability platform for traces, metrics, logs, dashboards, and alerts. This template deploys the SigNoz UI, OpenTelemetry Collector, ClickHouse, and Zookeeper as separate Railway services with persistent volumes and private networking.

The template runs SigNoz with a public UI on port 8080 and a public OTLP HTTP collector endpoint on port 4318. ClickHouse and Zookeeper stay private. The collector runs SigNoz migrations before starting and writes telemetry into ClickHouse.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| signoz | `signoz/signoz:v0.122.0` | Web service |
| zookeeper-1 | `signoz/zookeeper:3.7.1` | Database |
| otel-collector | `signoz/signoz-otel-collector:v0.144.3` | Web service |
| clickhouse | `clickhouse/clickhouse-server:25.5.6` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | signoz | 8080 |
| `SIGNOZ_SQLSTORE_SQLITE_PATH` | signoz | /var/lib/signoz/signoz.db |
| `SIGNOZ_TOKENIZER_JWT_SECRET` | signoz | (secret) |
| `SIGNOZ_ALERTMANAGER_PROVIDER` | signoz | signoz |
| `ZOO_SERVER_ID` | zookeeper-1 | 1 |
| `ALLOW_ANONYMOUS_LOGIN` | zookeeper-1 | (secret) |
| `ZOO_AUTOPURGE_INTERVAL` | zookeeper-1 | 1 |
| `ZOO_ENABLE_PROMETHEUS_METRICS` | zookeeper-1 | yes |
| `ZOO_PROMETHEUS_METRICS_PORT_NUMBER` | zookeeper-1 | 9141 |
| `PORT` | otel-collector | 4318 |
| `OTEL_RESOURCE_ATTRIBUTES` | otel-collector | host.name=signoz-railway,os.type=linux |
| `SIGNOZ_OTEL_COLLECTOR_TIMEOUT` | otel-collector | 10m |
| `LOW_CARDINAL_EXCEPTION_GROUPING` | otel-collector | false |
| `SIGNOZ_OTEL_COLLECTOR_CLICKHOUSE_CLUSTER` | otel-collector | cluster |
| `SIGNOZ_OTEL_COLLECTOR_CLICKHOUSE_REPLICATION` | otel-collector | true |
| `SIGNOZ_CONFIG_BASE` | clickhouse | https://raw.githubusercontent.com/SigNoz/signoz/v0.122.0/deploy |
| `CLICKHOUSE_SKIP_USER_SETUP` | clickhouse | 1 |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/signoz`
- **Volume:** `/bitnami/zookeeper`
- **Start command:** `/bin/sh -lc '
set -eu

cat >/tmp/otel-collector-config.yaml <<YAML
connectors:
  signozmeter:
    metrics_flush_interval: 1h
    dimensions:
      - name: service.name
      - name: deployment.environment
      - name: host.name
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus:
    config:
      global:
        scrape_interval: 60s
      scrape_configs:
        - job_name: otel-collector
          static_configs:
          - targets:
              - localhost:8888
            labels:
              job_name: otel-collector
processors:
  batch:
    send_batch_size: 10000
    send_batch_max_size: 11000
    timeout: 10s
  batch/meter:
    send_batch_max_size: 25000
    send_batch_size: 20000
    timeout: 1s
  resourcedetection:
    detectors: [env, system]
    timeout: 2s
  signozspanmetrics/delta:
    metrics_exporter: signozclickhousemetrics
    metrics_flush_interval: 60s
    latency_histogram_buckets: [100us, 1ms, 2ms, 6ms, 10ms, 50ms, 100ms, 250ms, 500ms, 1000ms, 1400ms, 2000ms, 5s, 10s, 20s, 40s, 60s]
    dimensions_cache_size: 100000
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    enable_exp_histogram: true
    dimensions:
      - name: service.namespace
        default: default
      - name: deployment.environment
        default: default
      - name: signoz.collector.id
      - name: service.version
      - name: browser.platform
      - name: browser.mobile
      - name: k8s.cluster.name
      - name: k8s.node.name
      - name: k8s.namespace.name
      - name: host.name
      - name: host.type
      - name: container.name
extensions:
  health_check:
    endpoint: 0.0.0.0:13133
  pprof:
    endpoint: 0.0.0.0:1777
exporters:
  clickhousetraces:
    datasource: tcp://clickhouse.railway.internal:9000/signoz_traces
    low_cardinal_exception_grouping: \${env:LOW_CARDINAL_EXCEPTION_GROUPING}
    use_new_schema: true
  signozclickhousemetrics:
    dsn: tcp://clickhouse.railway.internal:9000/signoz_metrics
  clickhouselogsexporter:
    dsn: tcp://clickhouse.railway.internal:9000/signoz_logs
    timeout: 10s
    use_new_schema: true
  signozclickhousemeter:
    dsn: tcp://clickhouse.railway.internal:9000/signoz_meter
    timeout: 45s
    sending_queue:
      enabled: false
  metadataexporter:
    cache:
      provider: in_memory
    dsn: tcp://clickhouse.railway.internal:9000/signoz_metadata
    enabled: true
    timeout: 45s
service:
  telemetry:
    logs:
      encoding: json
  extensions:
    - health_check
    - pprof
  pipelines:
    traces:
      receivers: [otlp]
      processors: [signozspanmetrics/delta, batch]
      exporters: [clickhousetraces, metadataexporter, signozmeter]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [signozclickhousemetrics, metadataexporter, signozmeter]
    metrics/prometheus:
      receivers: [prometheus]
      processors: [batch]
      exporters: [signozclickhousemetrics, metadataexporter, signozmeter]
    logs:
      receivers: [otlp]
      processors: [batch]
      exporters: [clickhouselogsexporter, metadataexporter, signozmeter]
    metrics/meter:
      receivers: [signozmeter]
      processors: [batch/meter]
      exporters: [signozclickhousemeter]
YAML

/signoz-otel-collector migrate bootstrap
/signoz-otel-collector migrate sync up
/signoz-otel-collector migrate async up
/signoz-otel-collector migrate sync check
exec /signoz-otel-collector --config=/tmp/otel-collector-config.yaml --copy-path=/var/tmp/collector-config.yaml
'`
- **Start command:** `/bin/bash -lc '
set -euo pipefail

base="${SIGNOZ_CONFIG_BASE:-https://raw.githubusercontent.com/SigNoz/signoz/v0.122.0/deploy}"
mkdir -p /etc/clickhouse-server/config.d /var/lib/clickhouse/preprocessed_configs /var/lib/clickhouse/user_scripts

wget -q -O /etc/clickhouse-server/config.xml "$base/common/clickhouse/config.xml"
wget -q -O /etc/clickhouse-server/users.xml "$base/common/clickhouse/users.xml"
wget -q -O /etc/clickhouse-server/custom-function.xml "$base/common/clickhouse/custom-function.xml"
wget -q -O /etc/clickhouse-server/config.d/cluster.xml "$base/common/clickhouse/cluster.xml"

sed -i "s/<host>zookeeper-1<\/host>/<host>zookeeper-1.railway.internal<\/host>/g; s/<host>clickhouse<\/host>/<host>127.0.0.1<\/host>/g" /etc/clickhouse-server/config.d/cluster.xml
cat >/etc/clickhouse-server/config.d/listen.xml <<XML
<clickhouse>
  <listen_host>0.0.0.0</listen_host>
  <listen_host>::</listen_host>
  <listen_try>1</listen_try>
</clickhouse>
XML

if [ ! -x /var/lib/clickhouse/user_scripts/histogramQuantile ]; then
  version="v0.0.1"
  node_os="$(uname -s | tr "[:upper:]" "[:lower:]")"
  node_arch="$(uname -m | sed s/aarch64/arm64/ | sed s/x86_64/amd64/)"
  wget -q -O /tmp/histogram-quantile.tar.gz "https://github.com/SigNoz/signoz/releases/download/histogram-quantile%2F${version}/histogram-quantile_${node_os}_${node_arch}.tar.gz"
  tar -xzf /tmp/histogram-quantile.tar.gz -C /tmp
  mv /tmp/histogram-quantile /var/lib/clickhouse/user_scripts/histogramQuantile
  chmod +x /var/lib/clickhouse/user_scripts/histogramQuantile
fi

chown -R clickhouse:clickhouse /var/lib/clickhouse
exec su -s /bin/bash clickhouse -c "clickhouse-server --config-file=/etc/clickhouse-server/config.xml"
'`
- **Volume:** `/var/lib/clickhouse`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/signoz-observability)
