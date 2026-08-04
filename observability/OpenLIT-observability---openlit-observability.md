# Deploy OpenLIT observability on Railway

Protected AI observability with OpenLIT and persistent ClickHouse traces.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openlit-observability)

## About

OpenLIT captures and explores traces, metrics, and logs from AI applications. This template adds persistent ClickHouse storage and one generated-credential gateway for the dashboard and OTLP/HTTP ingestion.

Railway exposes only Caddy over public HTTPS. OpenLIT, its embedded collector, ClickHouse, OTLP gRPC, and OpAMP stay on the private network, while separate generated credentials protect browser access and HTTP telemetry ingestion.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenLIT Gateway | `caddy:2.10-alpine@sha256:4c6e91c6ed0e2fa03efd5b44747b625fec79bc9cd06ac5235a779726618e530d` | Web service |
| OpenLIT | `ghcr.io/openlit/openlit:1.24.2@sha256:9b85bc3214767603670d3f5c74e1d43ae7e34b292b1f330b99607f7ea2c29230` | Database |
| OpenLIT ClickHouse | `clickhouse/clickhouse-server:24.4.1@sha256:2e6587b81a267c6152cf2112c3532516424d3eaa36f1b150d5b8847c0e3d5b01` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OpenLIT Gateway | 8080 | - |
| `OPENLIT_OTLP_TOKEN` | OpenLIT Gateway | (secret) | Generated bearer token for OTLP/HTTP ingestion. |
| `OPENLIT_GATEWAY_PASSWORD` | OpenLIT Gateway | (secret) | Generated password for browser Basic Auth. |
| `OPENLIT_GATEWAY_USERNAME` | OpenLIT Gateway | (secret) | Username for browser Basic Auth. |
| `PORT` | OpenLIT | 3000 | - |
| `API_URL` | OpenLIT | http://127.0.0.1:3000 | - |
| `HOSTNAME` | OpenLIT | 0.0.0.0 | - |
| `DOCKER_PORT` | OpenLIT | 3000 | - |
| `INIT_DB_PORT` | OpenLIT | 8123 | - |
| `CRON_JOB_SECRET` | OpenLIT | (secret) | Generated token for OpenLIT internal scheduled endpoints. |
| `OPAMP_CERTS_DIR` | OpenLIT | /app/opamp/certs | - |
| `OPAMP_LOG_LEVEL` | OpenLIT | info | - |
| `OPENLIT_EDITION` | OpenLIT | oss | - |
| `INIT_DB_PASSWORD` | OpenLIT | (secret) | - |
| `INIT_DB_USERNAME` | OpenLIT | (secret) | - |
| `OPAMP_ENVIRONMENT` | OpenLIT | production | - |
| `TELEMETRY_ENABLED` | OpenLIT | false | - |
| `DEMO_ACCOUNT_EMAIL` | OpenLIT | user@openlit.io | - |
| `SQLITE_DATABASE_URL` | OpenLIT | file:/app/client/data/data.db | - |
| `DEMO_ACCOUNT_PASSWORD` | OpenLIT | (secret) | - |
| `OPAMP_TLS_MAX_VERSION` | OpenLIT | 1.3 | - |
| `OPAMP_TLS_MIN_VERSION` | OpenLIT | 1.2 | - |
| `OPENLIT_COLLECTOR_CONFIG` | OpenLIT | receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
processors:
  batch: {}
  memory_limiter:
    check_interval: 5s
    limit_mib: 512
    spike_limit_mib: 128
exporters:
  clickhouse:
    endpoint: tcp://${env:INIT_DB_HOST}:9000?dial_timeout=10s
    database: ${env:INIT_DB_DATABASE}
    username: ${env:INIT_DB_USERNAME}
    password: ${env:INIT_DB_PASSWORD}
    ttl: 730h
    logs_table_name: otel_logs
    traces_table_name: otel_traces
    timeout: 5s
    retry_on_failure:
      enabled: true
      initial_interval: 5s
      max_interval: 30s
      max_elapsed_time: 300s
service:
  pipelines:
    logs:
      receivers: [otlp]
      processors: [batch]
      exporters: [clickhouse]
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [clickhouse]
    metrics:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [clickhouse] | Pinned OTLP-to-ClickHouse collector pipeline from the OpenLIT release. |
| `OPENLIT_VAULT_ENCRYPTION_KEY` | OpenLIT | - | Stable generated key for encrypted OpenLIT Vault values. |
| `OPAMP_TLS_REQUIRE_CLIENT_CERT` | OpenLIT | true | - |
| `OPAMP_TLS_INSECURE_SKIP_VERIFY` | OpenLIT | false | - |
| `OPENLIT_CLICKHOUSE_BOOTSTRAP_SCRIPT` | OpenLIT | const e = process.env;
const base = "http://" + e.INIT_DB_HOST + ":" + e.INIT_DB_PORT;
const headers = {
  Authorization: "Basic " + Buffer.from(e.INIT_DB_USERNAME + ":" + e.INIT_DB_PASSWORD).toString("base64"),
};
async function main() {
  let attempt = 0;
  for (;;) {
    attempt += 1;
    let detail = "unreachable";
    try {
      const response = await fetch(base + "/ping", { headers });
      detail = "HTTP " + response.status;
      if (response.ok) break;
    } catch (error) {
      detail = error.cause?.code || error.message;
    }
    if (attempt % 10 === 0) console.error("Waiting for ClickHouse readiness: " + detail);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  const response = await fetch(base + "/", {
    method: "POST",
    headers,
    body: "CREATE DATABASE IF NOT EXISTS " + e.INIT_DB_DATABASE,
  });
  if (!response.ok) throw new Error("ClickHouse database bootstrap failed: " + response.status);
}
main().catch((error) => {
  console.error(error.message);
  process.exit(1);
}); | Readiness and database bootstrap executed before OpenLIT migrations. |
| `CLICKHOUSE_USER` | OpenLIT ClickHouse | (secret) | - |
| `CLICKHOUSE_DATABASE` | OpenLIT ClickHouse | openlit | - |
| `CLICKHOUSE_PASSWORD` | OpenLIT ClickHouse | (secret) | Generated password shared only through Railway references. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | OpenLIT ClickHouse | 1 | - |

## Configuration

- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$OPENLIT_GATEWAY_PASSWORD")"; printf '"'"':8080 {\n handle /healthz {\n  rewrite * /login\n  reverse_proxy %s\n }\n @otlp path /v1/traces /v1/logs /v1/metrics\n handle @otlp {\n  @unauthorized not header Authorization "Bearer %s"\n  respond @unauthorized 401\n  reverse_proxy %s\n }\n handle {\n  basic_auth {\n   %s %s\n  }\n  reverse_proxy %s\n }\n}\n'"'"' "$OPENLIT_WEB_UPSTREAM" "$OPENLIT_OTLP_TOKEN" "$OPENLIT_OTLP_UPSTREAM" "$OPENLIT_GATEWAY_USERNAME" "$password_hash" "$OPENLIT_WEB_UPSTREAM" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/bash -ec 'node -e "$OPENLIT_CLICKHOUSE_BOOTSTRAP_SCRIPT"; mkdir -p /etc/otel; printf "%s\n" "$OPENLIT_COLLECTOR_CONFIG" > /etc/otel/otel-collector-config.yaml; exec /app/client/scripts/entrypoint.sh'`
- **Healthcheck:** `/login`
- **Volume:** `/app/client/data`
- **Volume:** `/var/lib/clickhouse`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/openlit-observability)
