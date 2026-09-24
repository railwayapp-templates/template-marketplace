# Deploy Pyroscope on Railway

Pyroscope 2.3 continuous profiling with volume storage and auth gateway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pyroscope)

## About

Grafana Pyroscope is an open-source continuous profiling database. Your applications send CPU, memory and other profiles through SDKs for Go, Python, Node.js, Java, Ruby, .NET and Rust, and Pyroscope shows them as flame graphs over time. It helps you find the exact functions that cost CPU, memory or latency in production.

This template deploys Pyroscope v2.3.1 in single-binary mode with v2 filesystem storage on a Railway volume, plus a Caddy gateway that is the only public entry point. The gateway has two logins. `admin` opens the web UI. `ingest` is used by SDKs to push profiles and cannot open the UI. Both passwords are generated at deploy time. Profiles are kept for 14 days. Pyroscope starts in about a minute and runs as root so it can write to the volume. Storage grows with the number of profiled services, so watch the volume on the Hobby plan (5 GB).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `caddy:2.11.4-alpine` | Web service |
| pyroscope | `grafana/pyroscope:2.3.1` | Database |

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

	@ingest path /ingest /push.v1.PusherService/*
	handle @ingest {
		basic_auth {
			{$PYROSCOPE_INGEST_USERNAME} {$PYROSCOPE_INGEST_PASSWORD_HASH}
		}
		reverse_proxy {$PYROSCOPE_UPSTREAM}
	}

	handle {
		basic_auth {
			{$PYROSCOPE_UI_USERNAME} {$PYROSCOPE_UI_PASSWORD_HASH}
		}
		reverse_proxy {$PYROSCOPE_UPSTREAM}
	}
} |
| `PYROSCOPE_UI_PASSWORD` | gateway | (secret) |
| `PYROSCOPE_UI_USERNAME` | gateway | (secret) |
| `PYROSCOPE_INGEST_PASSWORD` | gateway | (secret) |
| `PYROSCOPE_INGEST_USERNAME` | gateway | (secret) |
| `PORT` | pyroscope | 4040 |

## Configuration

- **Start command:** `sh -c 'export PYROSCOPE_UI_PASSWORD_HASH="$(caddy hash-password --plaintext "$PYROSCOPE_UI_PASSWORD")" PYROSCOPE_INGEST_PASSWORD_HASH="$(caddy hash-password --plaintext "$PYROSCOPE_INGEST_PASSWORD")" && printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/usr/bin/pyroscope -config.file=/etc/pyroscope/config.yaml -architecture.storage=v2 -retention-period=14d -self-profiling.disable-push=true`
- **Healthcheck:** `/ready`
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/pyroscope)
