# Deploy Wealthfolio on Railway

Personal finance and investment tracking with persistent SQLite storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wealthfolio)

## About

This template runs Wealthfolio 3.6.2 as one digest-pinned container with a
persistent Railway volume for its SQLite database, encrypted integration
secrets, and add-ons. Railway provides the public HTTPS endpoint while the
application runs its embedded migrations at startup and exposes a dedicated
health check. Portable settings are prefilled, including the fixed application
port, database path, generated encryption key, public-origin reference, and
secure cookie policy. The deployer supplies one Argon2id password hash for
access control; no third-party API credentials or external database are
required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Wealthfolio | `wealthfolio/wealthfolio@sha256:f24c607692c1b494a477382aa3dfedc11ede1b433768b66546940c8f6b8a474f` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8088 | Directs Railway health checks and HTTP routing to Wealthfolio's fixed listen port. |
| `WF_DB_PATH` | /data/wealthfolio.db | Stores the SQLite database on the attached persistent volume. |
| `WF_SECRET_KEY` | (secret) | Generates exactly 32 ASCII characters, including one non-Base64 prefix so Wealthfolio uses its raw-key fallback. Keep this value stable; rotation can make stored secrets unreadable. |
| `WF_LISTEN_ADDR` | 0.0.0.0:8088 | Binds the web server to every container interface on the documented port. |
| `WF_MCP_ENABLED` | false | Keeps Wealthfolio's external MCP endpoint disabled by default. |
| `WF_COOKIE_SECURE` | auto | Marks the session cookie Secure when Railway forwards HTTPS. |
| `WF_AUTH_PASSWORD_HASH` | (secret) | Argon2id PHC hash for the web password. Generate locally with the immutable upstream guide: https://github.com/wealthfolio/wealthfolio/blob/633d3a1be7a87e40fbb2d5d335bd60ba4219718b/README.md#password-authentication |
| `WF_CORS_ALLOW_ORIGINS` | - | Restricts credentialed browser requests to the generated Railway origin. |
| `WF_REQUEST_TIMEOUT_MS` | 30000 | Uses the upstream production request timeout of 30 seconds. |
| `WF_AUTH_TOKEN_TTL_MINUTES` | (secret) | Sets authenticated web-session lifetime to 60 minutes. |

## Configuration

- **Healthcheck:** `/api/v1/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wealthfolio)
