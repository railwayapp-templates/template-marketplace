# Deploy lightpanda on Railway

Lightpanda 0.4: fast headless browser for agents over CDP, token-gated.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightpanda-1)

## About

Lightpanda is a headless browser written from scratch in Zig for AI agents, scraping and automation. It runs JavaScript and exposes the Chrome DevTools Protocol, so Puppeteer, Playwright and chromedp connect to it like Chrome, while starting instantly and using a fraction of Chrome's memory.

This template runs two services. `lightpanda` runs the official `lightpanda/browser:0.4.1` image as a CDP server on the private network only. `gateway` is a small Caddy proxy on the public domain that checks a generated token, sent as `?token=` or a `Bearer` header, before passing WebSocket and HTTP traffic through; requests without it get 401. Connect Puppeteer or Playwright to `LIGHTPANDA_WS_URL`. Telemetry is off. The browser keeps no state between sessions, so there is no volume, and both services fit the Hobby plan. Lightpanda does not implement every web API yet, so test your target sites before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lightpanda | `lightpanda/browser:0.4.1` | Worker |
| gateway | `caddy:2.11.4-alpine` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | lightpanda | 9222 |
| `LIGHTPANDA_DISABLE_TELEMETRY` | lightpanda | true |
| `PORT` | gateway | 8080 |
| `CADDYFILE` | gateway | {
	admin off
	auto_https off
}

:{$PORT} {
	handle /gateway_health {
		respond ok 200
	}

	@authorized {
		header Authorization `Bearer {$LIGHTPANDA_TOKEN}`
	}
	@authorized_query {
		query token={$LIGHTPANDA_TOKEN}
	}
	# Lightpanda only accepts WebSocket connections addressed to its own host.
	handle @authorized {
		reverse_proxy {$LIGHTPANDA_UPSTREAM} {
			header_up Host 127.0.0.1:9222
		}
	}
	handle @authorized_query {
		reverse_proxy {$LIGHTPANDA_UPSTREAM} {
			header_up Host 127.0.0.1:9222
		}
	}

	handle {
		respond Unauthorized 401
	}
} |
| `LIGHTPANDA_TOKEN` | gateway | (secret) |

## Configuration

- **Start command:** `/usr/bin/tini -- /bin/lightpanda serve --host :: --port 9222 --log_level info`
- **Start command:** `sh -c 'printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/gateway_health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/lightpanda-1)
