# Deploy Playwright MCP on Railway

Playwright MCP headless browser for AI agents, behind a token gateway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/playwright-mcp)

## About

Playwright MCP is Microsoft's Model Context Protocol server that gives AI agents a real browser. Agents navigate pages, click, type, fill forms, take screenshots and read structured accessibility snapshots instead of pixels, which makes web automation reliable for Claude, Cursor, VS Code, Codex and other MCP clients.

This template deploys Playwright MCP v0.0.82 with headless Chromium on the Railway private network and a small Caddy gateway in front. The gateway requires a generated bearer token on every request, because the server itself has no authentication and its browser can reach anything the service can. Each session uses an isolated in-memory profile, so nothing persists between sessions. Connect your MCP client to the gateway's `/mcp` URL with the token as a header. Chromium needs a few hundred megabytes of memory per session; the Hobby plan handles light use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| playwright | `mcr.microsoft.com/playwright/mcp:v0.0.82` | Worker |
| gateway | `caddy:2.11.4-alpine` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | playwright | 8931 |
| `PORT` | gateway | 8080 |
| `CADDYFILE` | gateway | {
	admin off
	auto_https off
}

:{$PORT} {
	handle /healthz {
		respond ok 200
	}

	@authorized header Authorization `Bearer {$MCP_API_TOKEN}`
	handle @authorized {
		reverse_proxy {$MCP_UPSTREAM} {
			header_up -Authorization
			header_up Host {upstream_hostport}
			flush_interval -1
			transport http {
				read_timeout 10m
			}
		}
	}

	handle {
		respond Unauthorized 401
	}
} |
| `MCP_API_TOKEN` | gateway | (secret) |

## Configuration

- **Start command:** `node /app/cli.js --headless --browser chromium --no-sandbox --isolated --host :: --port 8931 --allowed-hosts *`
- **Start command:** `sh -c 'printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/playwright-mcp)
