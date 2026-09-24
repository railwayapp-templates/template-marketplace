# Deploy Dgraph on Railway

Dgraph 25 graph database with Zero, Alpha and token-auth gateway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dgraph)

## About

Dgraph is a distributed, open-source graph database with a native GraphQL API and its own query language, DQL. It stores data as a graph of nodes and edges, supports full-text, geo and vector indexes, and runs fast traversals and joins, which suits social graphs, knowledge graphs and recommendation engines.

This template deploys Dgraph v25.4.1 as a Zero node, which runs cluster coordination, and an Alpha node, which stores and serves data, each with its own Railway volume, plus a Caddy gateway as the public entry point. The gateway requires a bearer token and removes it before forwarding. Schema changes and other admin operations additionally need the Alpha admin token in the `X-Dgraph-AuthToken` header. Data survived redeploys of both nodes in testing. The gRPC API stays private. Memory use grows with dataset size; start on Hobby and scale up. Back up both volumes regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `caddy:2.11.4-alpine` | Web service |
| zero | `dgraph/dgraph:v25.4.1` | Database |
| alpha | `dgraph/dgraph:v25.4.1` | Database |

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

	@authorized header Authorization `Bearer {$DGRAPH_API_TOKEN}`
	handle @authorized {
		request_body {
			max_size 100MB
		}
		reverse_proxy {$DGRAPH_UPSTREAM} {
			header_up -Authorization
		}
	}

	handle {
		respond Unauthorized 401
	}
} |
| `DGRAPH_API_TOKEN` | gateway | (secret) |
| `PORT` | zero | 6080 |
| `PORT` | alpha | 8080 |
| `DGRAPH_ADMIN_TOKEN` | alpha | (secret) |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'exec dgraph zero --my="$DGRAPH_ZERO_MY" --wal /dgraph/zw'`
- **Healthcheck:** `/health`
- **Volume:** `/dgraph`
- **Start command:** `sh -c 'exec dgraph alpha --my="$DGRAPH_ALPHA_MY" --zero="$DGRAPH_ZERO_ADDR" --postings /dgraph/p --wal /dgraph/w --tmp /dgraph/t --security "token=$DGRAPH_ADMIN_TOKEN; whitelist=0.0.0.0/0,::/0"'`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/dgraph)
