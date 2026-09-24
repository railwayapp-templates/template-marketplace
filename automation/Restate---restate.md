# Deploy Restate on Railway

Restate 1.7 durable execution server with authenticated gateway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/restate)

## About

Restate is a durable execution engine for building resilient services, workflows and agents. Your code, written with the Restate SDKs for TypeScript, Java, Kotlin, Go, Python or Rust, runs as normal HTTP services, and Restate journals every step so that handlers survive crashes, retries and restarts with exactly-once semantics.

This template deploys Restate Server v1.7.12 as a single node with its log and state on a Railway volume, plus a Caddy gateway with two public domains. The ingress domain requires a bearer token and is where clients invoke your services. The admin domain serves the Restate UI and admin API behind basic auth. Restate itself stays private and uses a fixed node name, so its data survives redeploys. Deploy your service code as another Railway service and register it with the admin API. The Hobby plan fits development and small production loads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| restate | `restatedev/restate:1.7.12` | Database |
| gateway | `caddy:2.11.4-alpine` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | restate | 9070 |
| `RESTATE_BIND_IP` | restate | :: |
| `RESTATE_NODE_NAME` | restate | restate-1 |
| `PORT` | gateway | 8080 |
| `CADDYFILE` | gateway | {
	admin off
	auto_https off
}

:{$PORT} {
	handle /healthz {
		respond ok 200
	}

	@authorized header Authorization `Bearer {$RESTATE_INGRESS_TOKEN}`
	handle @authorized {
		reverse_proxy {$RESTATE_INGRESS_UPSTREAM} {
			header_up -Authorization
		}
	}

	handle {
		respond Unauthorized 401
	}
}

:{$ADMIN_PORT} {
	basic_auth {
		{$RESTATE_ADMIN_USERNAME} {$RESTATE_ADMIN_PASSWORD_HASH}
	}
	reverse_proxy {$RESTATE_ADMIN_UPSTREAM}
} |
| `ADMIN_PORT` | gateway | 9071 |
| `RESTATE_INGRESS_TOKEN` | gateway | (secret) |
| `RESTATE_ADMIN_PASSWORD` | gateway | (secret) |
| `RESTATE_ADMIN_USERNAME` | gateway | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/restate-data`
- **Start command:** `sh -c 'export RESTATE_ADMIN_PASSWORD_HASH="$(caddy hash-password --plaintext "$RESTATE_ADMIN_PASSWORD")" && printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/restate)
