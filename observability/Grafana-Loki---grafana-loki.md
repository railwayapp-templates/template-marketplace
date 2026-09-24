# Deploy Grafana Loki on Railway

Grafana Loki 3.7 log aggregation with volume storage and auth gateway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-loki)

## About

Grafana Loki is a horizontally scalable, cost-efficient log aggregation system inspired by Prometheus. It indexes only labels, not full text, and stores compressed log chunks, so it is cheap to run. Logs are pushed by Grafana Alloy, Promtail, Fluent Bit, Vector or OpenTelemetry and queried with LogQL in Grafana.

This template deploys Loki v3.7.8 in single-binary mode with filesystem storage on a Railway volume, plus a Caddy gateway that is the only public entry point. The gateway has two logins: `push` for shipping logs and `admin` for queries from Grafana; each works only on its own routes. Logs are kept for 14 days by the compactor, and usage reporting is off. Loki itself stays private and runs as root so it can write to the volume. Watch the volume size on the Hobby plan, since storage grows with log volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `caddy:2.11.4-alpine` | Web service |
| loki | `grafana/loki:3.7.8` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | gateway | 8080 |
| `CADDYFILE` | gateway | {
	admin off
	auto_https off
}

:{$PORT} {
	handle /healthz {
		respond ok 200
	}

	@push path /loki/api/v1/push /otlp/v1/logs
	handle @push {
		basic_auth {
			{$LOKI_PUSH_USERNAME} {$LOKI_PUSH_PASSWORD_HASH}
		}
		reverse_proxy {$LOKI_UPSTREAM}
	}

	handle {
		basic_auth {
			{$LOKI_QUERY_USERNAME} {$LOKI_QUERY_PASSWORD_HASH}
		}
		reverse_proxy {$LOKI_UPSTREAM}
	}
} |
| `LOKI_PUSH_PASSWORD` | gateway | (secret) |
| `LOKI_PUSH_USERNAME` | gateway | (secret) |
| `LOKI_QUERY_PASSWORD` | gateway | (secret) |
| `LOKI_QUERY_USERNAME` | gateway | (secret) |
| `PORT` | loki | 3100 |

## Configuration

- **Start command:** `sh -c 'export LOKI_QUERY_PASSWORD_HASH="$(caddy hash-password --plaintext "$LOKI_QUERY_PASSWORD")" LOKI_PUSH_PASSWORD_HASH="$(caddy hash-password --plaintext "$LOKI_PUSH_PASSWORD")" && printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/usr/bin/loki -config.file=/etc/loki/local-config.yaml -compactor.retention-enabled=true -compactor.delete-request-store=filesystem -store.retention=14d -reporting.enabled=false`
- **Healthcheck:** `/ready`
- **Volume:** `/loki`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/grafana-loki)
