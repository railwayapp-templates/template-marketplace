# Deploy Everruns on Railway

Deploy the Everruns OSS agent platform on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/everruns)

## About

Everruns is an OSS durable agent platform for running AI agents with a control plane, worker pool, browser UI, and persistent storage.

This template deploys a complete test stack on Railway. Caddy is the only public service and routes browser traffic, API traffic, OAuth/MCP endpoints, well-known endpoints, API docs, and health checks to the correct internal service. The server, worker, UI, Postgres, Redis, and NATS services stay on Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ui | `ghcr.io/everruns/everruns-ui:latest` | Worker |
| redis | `redis:8.2.1` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nats | `nats:2-alpine` | Database |
| worker | `ghcr.io/everruns/everruns-worker:latest` | Worker |
| caddy | `caddy:2-alpine` | Web service |
| server | `ghcr.io/everruns/everruns-server:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPASSWORD` | redis | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `WORKER_GRPC_AUTH_TOKEN` | worker | (secret) |
| `AUTH_JWT_SECRET` | server | (secret) |
| `AUTH_ADMIN_PASSWORD` | server | (secret) |
| `SECRETS_ENCRYPTION_KEY` | server | (secret) |
| `WORKER_GRPC_AUTH_TOKEN` | server | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `nats-server --jetstream --store_dir /data -m 8222`
- **Start command:** `/bin/sh -c 'cat > /etc/caddy/Caddyfile <<'"'"'CADDYFILE'"'"'
:{$PORT:8080} {
	handle /api/* {
		reverse_proxy {$SERVER_HOST}:9000 {
			flush_interval -1
		}
	}
	handle /oauth/* {
		reverse_proxy {$SERVER_HOST}:9000
	}
	handle /mcp {
		reverse_proxy {$SERVER_HOST}:9000
	}
	handle /.well-known/* {
		reverse_proxy {$SERVER_HOST}:9000
	}
	handle /api-doc/* {
		reverse_proxy {$SERVER_HOST}:9000
	}
	handle /health {
		reverse_proxy {$SERVER_HOST}:9000
	}
	handle {
		reverse_proxy {$UI_HOST}:9100
	}
}
CADDYFILE
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/everruns)
