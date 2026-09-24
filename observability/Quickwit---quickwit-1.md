# Deploy Quickwit on Railway

Quickwit 0.9 log and trace search engine with auth gateway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/quickwit-1)

## About

Quickwit is a cloud-native search engine for logs and traces, written in Rust. It indexes JSON documents with sub-second search on large datasets, offers an Elasticsearch-compatible API for ingest and queries, accepts OpenTelemetry logs and traces, and plugs into Grafana and Jaeger as a backend.

This template deploys Quickwit 0.9.1 as a single node with its indexes and metastore on a Railway volume, plus a Caddy gateway as the only public entry point. The gateway has two logins: `ingest` for shippers, which can only reach the ingest, Elasticsearch `_bulk` and OTLP endpoints, and `admin` for search, index management and the web UI. Quickwit stays private and uses a fixed node ID. Telemetry is off. Storage grows with indexed data; watch the volume on the Hobby plan or move splits to S3 later. Back up the volume regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `caddy:2.11.4-alpine` | Web service |
| quickwit | `quickwit/quickwit:0.9.1` | Database |

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

	@ingest {
		method POST PUT
		path /api/v1/*/ingest /api/v1/_elastic/_bulk /api/v1/_elastic/*/_bulk /api/v1/otlp/*
	}
	handle @ingest {
		basic_auth {
			{$QW_INGEST_USERNAME} {$QW_INGEST_PASSWORD_HASH}
		}
		request_body {
			max_size 100MB
		}
		reverse_proxy {$QW_UPSTREAM}
	}

	handle {
		basic_auth {
			{$QW_ADMIN_USERNAME} {$QW_ADMIN_PASSWORD_HASH}
		}
		reverse_proxy {$QW_UPSTREAM}
	}
} |
| `QW_ADMIN_PASSWORD` | gateway | (secret) |
| `QW_ADMIN_USERNAME` | gateway | (secret) |
| `QW_INGEST_PASSWORD` | gateway | (secret) |
| `QW_INGEST_USERNAME` | gateway | (secret) |
| `PORT` | quickwit | 7280 |
| `QW_NODE_ID` | quickwit | quickwit-1 |
| `QW_LISTEN_ADDRESS` | quickwit | :: |
| `QW_DISABLE_TELEMETRY` | quickwit | 1 |

## Configuration

- **Start command:** `sh -c 'export QW_ADMIN_PASSWORD_HASH="$(caddy hash-password --plaintext "$QW_ADMIN_PASSWORD")" QW_INGEST_PASSWORD_HASH="$(caddy hash-password --plaintext "$QW_INGEST_PASSWORD")" && printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `quickwit run`
- **Healthcheck:** `/health/readyz`
- **Volume:** `/quickwit/qwdata`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/quickwit-1)
