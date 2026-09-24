# Deploy Apache Tika on Railway

Apache Tika 4.0 server for text extraction and OCR behind an API token.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-tika)

## About

Apache Tika detects and extracts text and metadata from more than a thousand file types, including PDF, Word, Excel, PowerPoint, email, HTML and images. Its REST server is widely used in search indexing and RAG pipelines to turn uploaded documents into plain text or structured content, with Tesseract OCR for scanned files.

This template deploys Tika Server 4.0.0 using the full image, which includes Tesseract OCR, plus a Caddy gateway as the only public entry point. The gateway requires a bearer token on every request and removes it before forwarding, so Tika never sees it, and it caps uploads at 100 MB. Tika stays private, so services in the same project can call it directly without the token. Tika keeps no state. OCR and large documents are CPU and memory hungry, so size the service for your files. Add replicas to scale throughput horizontally.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `caddy:2.11.4-alpine` | Web service |
| tika | `apache/tika:4.0.0-1-full` | Worker |

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

	@authorized header Authorization `Bearer {$TIKA_API_TOKEN}`
	handle @authorized {
		request_body {
			max_size {$TIKA_MAX_UPLOAD}
		}
		reverse_proxy {$TIKA_UPSTREAM} {
			header_up -Authorization
		}
	}

	handle {
		respond Unauthorized 401
	}
} |
| `TIKA_API_TOKEN` | gateway | (secret) |
| `TIKA_MAX_UPLOAD` | gateway | 100MB |
| `PORT` | tika | 9998 |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/version`

**Category:** Other

[View on Railway →](https://railway.com/deploy/apache-tika)
