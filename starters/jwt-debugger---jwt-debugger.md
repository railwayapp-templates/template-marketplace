# Deploy jwt-debugger on Railway

Self-hosted jwt.io debugger - decode and verify JWTs fully client-side

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jwt-debugger)

## About

Hosting runs a single stateless web service: a React (Vite) single-page app served by Caddy
inside a compact Alpine container. The image is self-sufficient — it listens on the
Railway-injected `PORT`, exposes `GET /health` (200) for the Railway healthcheck, and
restarts on failure (ON_FAILURE, max 10 retries). No database, no volumes, no background
workers. The only optional service variable is `JWKS_PROXY_ENABLED`: unset or `false` (the
default) keeps the same-origin `/jwks` proxy disabled (it answers 403); set it to `true` to
let the app verify RS256 tokens against a JWKS URL of an identity provider that doesn't
send CORS headers. The proxy is SSRF-hardened (http/https only; every resolved address is
checked against loopback, RFC1918, CGNAT 100.64/10, link-local 169.254/16 — which covers
cloud metadata 169.254.169.254 — and ULA fc00::/7 before any connection; redirects are
re-checked per hop; responses are capped at 512 KB) and relays only JWKS JSON — signature
verification always happens in the visitor's browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [lNamelessl/self-hosted-jwt-debugger](https://github.com/lNamelessl/self-hosted-jwt-debugger) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, Shell, HTML

[View on Railway →](https://railway.com/deploy/jwt-debugger)
