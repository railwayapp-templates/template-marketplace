# Deploy httpbin-python on Railway

The original Python httpbin. HTTP request & response testing, zero config.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/httpbin-python)

## About

# httpbin (Python) — The Original HTTP Request &amp; Response Service

The classic [httpbin](https://github.com/postmanlabs/httpbin) by Kenneth Reitz — the original Python/Flask HTTP testing service behind [httpbin.org](https://httpbin.org), running the official `kennethreitz/httpbin` image.

&gt; Looking for a lighter, actively maintained port? See the Go version ([go-httpbin template](https://railway.com/deploy/httpbin)) — same API, smaller footprint. This template is the original, for when you want exact httpbin.org behavior.

## What it does

httpbin echoes back whatever you throw at it — the standard tool for testing HTTP clients, webhooks, proxies, and API integrations:

- **`/get`, `/post`, `/put`, `/patch`, `/delete`** — inspect method, headers, args, and body
- **`/status/{code}`** — return any HTTP status code (test error handling)
- **`/delay/{seconds}`** — delayed responses (test timeouts and retries)
- **`/headers`, `/ip`, `/user-agent`** — see what your client actually sends
- **`/redirect/{n}`** — test redirect following
- **`/gzip`, `/deflate`, `/brotli`** — compressed response handling
- **`/basic-auth`, `/bearer`, `/digest-auth`** — auth flow testing
- **`/cookies`, `/cache`, `/etag`** — cookie and caching behavior
- **`/anything`** — echo absolutely anything

Interactive Flasgger API docs served at the root URL.

## Usage

After deploy, hit your service URL:

```bash
curl https:///get
curl -X POST https:///post -d '{"hello":"world"}'
curl https:///status/418
```

## Configuration

None. No variables, no volume. The service listens on port 80 (start command binds gunicorn to `[::]:80` for Railway's IPv6 private network).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| httpbin | `kennethreitz/httpbin:latest` | Web service |

## Configuration

- **Start command:** `gunicorn -b [::]:80 httpbin:app -k gevent`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/httpbin-python)
