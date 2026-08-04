# Deploy Promptfoo evaluation on Railway

Private Promptfoo evaluation and red teaming with persistent project data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/promptfoo-evaluation)

## About

Deploy Promptfoo's LLM evaluation and red-team UI behind an authenticated gateway with persistent local results.

Promptfoo is an MIT-licensed toolkit for testing prompts, models, agents, and security behavior. This template runs its community self-hosted UI and API as a private service while Caddy provides generated Basic Auth at the public edge.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Promptfoo Gateway | `caddy:2.10-alpine@sha256:4c6e91c6ed0e2fa03efd5b44747b625fec79bc9cd06ac5235a779726618e530d` | Web service |
| Promptfoo | [tech-progress/railway-template-promptfoo](https://github.com/tech-progress/railway-template-promptfoo) (branch: release-v1) (root: /) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Promptfoo Gateway | 8080 | Railway listener port for the public Basic Auth gateway. |
| `PROMPTFOO_PASSWORD` | Promptfoo Gateway | (secret) | Generated password required by the public Basic Auth gateway. |
| `PROMPTFOO_UPSTREAM` | Promptfoo Gateway | - | Private Promptfoo UI and API endpoint. |
| `PROMPTFOO_USERNAME` | Promptfoo Gateway | (secret) | Username required by the public Basic Auth gateway. |
| `HOST` | Promptfoo | 0.0.0.0 | Container network binding for the Promptfoo server. |
| `PORT` | Promptfoo | 3000 | Railway listener port for the private Promptfoo service. |
| `API_PORT` | Promptfoo | 3000 | HTTP port used by Promptfoo's self-hosted server. |
| `PROMPTFOO_CONFIG_DIR` | Promptfoo | /home/promptfoo/.promptfoo | Persistent directory for Promptfoo's SQLite database and configuration. |
| `PROMPTFOO_SELF_HOSTED` | Promptfoo | 1 | Enables Promptfoo's self-hosted server behavior. |
| `PROMPTFOO_DISABLE_UPDATE` | Promptfoo | 1 | Disables Promptfoo update checks. |
| `PROMPTFOO_DISABLE_SHARING` | Promptfoo | 1 | Disables uploads to Promptfoo's hosted sharing service. |
| `PROMPTFOO_DISABLE_TELEMETRY` | Promptfoo | 1 | Disables Promptfoo telemetry. |
| `PROMPTFOO_DISABLE_REMOTE_GENERATION` | Promptfoo | true | Keeps generation and grading on this deployment instead of Promptfoo-hosted services. |

## Configuration

- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$PROMPTFOO_PASSWORD")"; printf '"'"':8080 {\n handle /healthz {\n  respond "ok" 200\n }\n handle {\n  basic_auth {\n   %s %s\n  }\n  reverse_proxy %s\n }\n}\n'"'"' "$PROMPTFOO_USERNAME" "$password_hash" "$PROMPTFOO_UPSTREAM" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/home/promptfoo/.promptfoo`

**Category:** AI/ML · **Languages:** Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/promptfoo-evaluation)
