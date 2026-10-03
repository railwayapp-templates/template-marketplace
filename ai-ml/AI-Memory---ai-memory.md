# Deploy AI Memory on Railway

One-click deploy: shared AI agent memory with MCP and authentication.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-memory)

## About

AI Memory is an open-source memory server by Fábio Akita that helps AI coding agents preserve context across sessions. It combines an MCP interface, lifecycle hooks, searchable project knowledge, and Git-backed Markdown history. Connect compatible agents to retain decisions, recover context, and hand off work across tools.

This template runs the official AI Memory Docker image with a persistent volume mounted at `/data`. It exposes HTTP MCP, a browser interface, and hook ingestion for compatible agents. Railway provides HTTPS networking; AI Memory handles browser login and API authentication. A custom start command prepares volume ownership, then runs the server as its unprivileged user. SQLite, configuration, credential state, and Markdown/Git history persist across restarts. Deploy one replica per data directory, configure backups, and connect compatible clients to `/mcp`. Install supported lifecycle hooks separately to capture session activity automatically. No external PostgreSQL or Redis service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AI Memory | `akitaonrails/ai-memory:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 49374 | Internal HTTP port used by AI Memory. Configure the Railway HTTPS domain to target this port. |
| `AI_MEMORY_AUTH_TOKEN` | (secret) | Administrative authentication token for AI Memory. Automatically generated on deployment. Keep it secret and use individual API credentials to connect agents to MCP. |
| `AI_MEMORY_ALLOWED_HOSTS` | - | Allowed hostnames for incoming requests to AI Memory, including the Railway public domain, local checks, and Railway health checks. Specify comma-separated hostnames without a protocol or path. |
| `AI_MEMORY_AUTH__TOKEN_PEPPER` | (secret) | Secret used to protect stored API credential hashes. Automatically generated on deployment. Keep it stable across restarts and redeployments; changing it invalidates existing API credentials. |
| `AI_MEMORY_AUTH__ROOT_USERNAME` | (secret) | Administrator username used for browser login with the initial root password. |
| `AI_MEMORY_AUTH__SECURE_COOKIE` | true | Ensures browser authentication cookies are sent only over HTTPS. Keep enabled when accessing AI Memory through Railway’s HTTPS domain. |
| `AI_MEMORY_AUTH__RECOVERY_TOKEN` | (secret) | Secret used to recover administrator access if the password is lost. Keep it separate from the authentication token and initial password, and store it securely. |
| `AI_MEMORY_AUTH__INITIAL_ROOT_PASSWORD` | (secret) | Initial administrator password used to bootstrap browser login. Automatically generated on deployment. Change it on first login and remove this variable after setup; it is not used to reset an existing password. |

## Configuration

- **Start command:** `/bin/sh -ec ': "${AI_MEMORY_AUTH_TOKEN:?Set AI_MEMORY_AUTH_TOKEN}"; : "${AI_MEMORY_ALLOWED_HOSTS:?Set AI_MEMORY_ALLOWED_HOSTS}"; case "$AI_MEMORY_AUTH_TOKEN" in *[[:space:]]*) exit 1;; esac; test "$(id -u)" = 0; test -d /data; test ! -L /data; umask 077; find /data -xdev ! -type l ! -user ai-memory -exec chown -h ai-memory:ai-memory {} +; chmod 700 /data; export HOME=/data AI_MEMORY_DATA_DIR=/data; exec /usr/bin/setpriv --reuid=ai-memory --regid=ai-memory --init-groups --no-new-privs /usr/local/bin/ai-memory serve --transport http --bind "0.0.0.0:${PORT:-49374}" --enable-web'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ai-memory)
