# Deploy httpbin on Railway

HTTP request & response testing with go-httpbin. Zero config, no vars.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/httpbin)

## About

# httpbin — HTTP Request &amp; Response Testing Service

A simple HTTP request &amp; response service, powered by [go-httpbin](https://github.com/mccutchen/go-httpbin) — a modern, single-binary Go port of the classic [httpbin.org](https://httpbin.org).

## What it does

httpbin echoes back whatever you throw at it, making it the go-to tool for testing HTTP clients, webhooks, proxies, and API integrations:

- **`/get`, `/post`, `/put`, `/patch`, `/delete`** — inspect method, headers, args, and body of your request
- **`/status/{code}`** — return any HTTP status code (test error handling)
- **`/delay/{seconds}`** — delayed responses (test timeouts and retries)
- **`/headers`, `/ip`, `/user-agent`** — see what your client actually sends
- **`/redirect/{n}`, `/relative-redirect/{n}`** — test redirect following
- **`/gzip`, `/deflate`, `/brotli`** — compressed response handling
- **`/basic-auth`, `/bearer`, `/digest-auth`** — auth flow testing
- **`/stream/{n}`, `/sse`, `/drip`** — streaming and server-sent events
- **`/cache`, `/etag`, `/cookies`** — caching and cookie behavior

Interactive API docs are served at the root URL.

## Why this template

- **Zero configuration** — deploy and it's live; no variables to set
- **Tiny footprint** — single static Go binary, minimal image, idles at a few MB of RAM
- **Stateless** — no database, no volume, nothing to manage
- **Health-checked** — Railway monitors `/status/200` so deploys only go live when healthy

## Usage

After deploy, hit your service URL:

```bash
curl https:///get
curl -X POST https:///post -d '{"hello":"world"}'
curl https:///status/418
```

Runs on port 8080 (go-httpbin's default). No environment variables required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| httpbin | `mccutchen/go-httpbin:2.23` | Web service |

## Configuration

- **Healthcheck:** `/status/200`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/httpbin)
