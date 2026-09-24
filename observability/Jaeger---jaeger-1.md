# Deploy Jaeger on Railway

Jaeger 2.21 OpenTelemetry tracing with Badger storage and auth gateway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jaeger-1)

## About

Jaeger is an open-source, CNCF-graduated distributed tracing platform. It collects OpenTelemetry traces from your services and lets you search them, follow requests across services and find slow or failing calls. Jaeger v2 is built on the OpenTelemetry Collector, so any OpenTelemetry SDK can send traces to it directly.

This template deploys Jaeger v2.21.0 with persistent Badger storage on a volume, plus a Caddy gateway that is the only public entry point. The Jaeger UI is protected by a username and a generated password. OTLP/HTTP trace ingestion at `/v1/traces` requires a generated bearer token. Services on Railway can instead send traces over the private network with OTLP gRPC (4317) or HTTP (4318), with no token. Traces are kept for 7 days by default. Disk use grows with trace volume, so watch the volume size on the Hobby plan (5 GB). Jaeger is a single node and runs as root so it can write to the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jaeger | `jaegertracing/jaeger:2.21.0` | Database |
| gateway | `caddy:2.11.4-alpine` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | jaeger | 16686 |
| `JAEGER_CONFIG` | jaeger | service:
  extensions: [jaeger_storage, jaeger_query, healthcheckv2]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [jaeger_storage_exporter]
  telemetry:
    resource:
      service.name: jaeger
    logs:
      level: info

extensions:
  healthcheckv2:
    use_v2: true
    http:
      endpoint: '[::]:13133'

  jaeger_query:
    storage:
      traces: badger_store
    http:
      endpoint: '[::]:16686'
    grpc:
      endpoint: '[::]:16685'

  jaeger_storage:
    backends:
      badger_store:
        badger:
          directories:
            keys: /badger/keys
            values: /badger/values
          ephemeral: false
          ttl:
            spans: ${env:JAEGER_SPAN_TTL:-168h}

receivers:
  otlp:
    protocols:
      grpc:
        endpoint: '[::]:4317'
      http:
        endpoint: '[::]:4318'

processors:
  batch:

exporters:
  jaeger_storage_exporter:
    trace_storage: badger_store |
| `JAEGER_SPAN_TTL` | jaeger | 168h |
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
		path /v1/traces
		header Authorization `Bearer {$OTLP_INGEST_TOKEN}`
	}
	handle @ingest {
		reverse_proxy {$JAEGER_OTLP_HTTP_UPSTREAM}
	}

	handle /v1/* {
		respond Unauthorized 401
	}

	handle {
		basic_auth {
			{$JAEGER_UI_USERNAME} {$JAEGER_UI_PASSWORD_HASH}
		}
		reverse_proxy {$JAEGER_UI_UPSTREAM}
	}
} |
| `OTLP_INGEST_TOKEN` | gateway | (secret) |
| `JAEGER_UI_PASSWORD` | gateway | (secret) |
| `JAEGER_UI_USERNAME` | gateway | (secret) |

## Configuration

- **Start command:** `/cmd/jaeger/jaeger-linux --config env:JAEGER_CONFIG`
- **Healthcheck:** `/`
- **Volume:** `/badger`
- **Start command:** `sh -c 'export JAEGER_UI_PASSWORD_HASH="$(caddy hash-password --plaintext "$JAEGER_UI_PASSWORD")" && printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/jaeger-1)
