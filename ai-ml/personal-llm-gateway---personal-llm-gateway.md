# Deploy personal-llm-gateway on Railway

Personal LiteLLM gateway with CLIProxyAPI accounts and virtual keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/personal-llm-gateway)

## About

Deploy a three-service personal LLM gateway with a public LiteLLM endpoint, a CLIProxyAPI provider-account broker, PostgreSQL-backed virtual keys, and persistent OAuth state.

The template creates `litellm`, `cliproxyapi`, and `postgres`. LiteLLM is the client-facing OpenAI-compatible gateway and virtual-key manager. CLIProxyAPI authenticates coding subscriptions and stores their credentials in a `/data` volume. PostgreSQL stores LiteLLM users, keys, budgets, and usage state. All service secrets are generated automatically and the app-to-app request path uses Railway private networking.

Provider credentials are not bundled. After deployment, sign in to the generated CLIProxyAPI `/management.html` page and complete each provider OAuth flow.

After deployment:

1. Open the `cliproxyapi` generated domain at `/management.html` and sign in with `CLIPROXY_MANAGEMENT_KEY` from that service's Variables page.
2. Authorize each Claude, Antigravity, Codex, Kimi, Qwen, or other account separately.
3. Open the `litellm` generated domain at `/ui` and sign in with `UI_USERNAME` and `UI_PASSWORD` from its Variables page.
4. Create a virtual key, select its allowed model IDs, and give that key to one client.
5. Configure the client with `https:///v1`; never give it the LiteLLM master key or CLIProxyAPI key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cliproxyapi | `ghcr.io/aaronabuusama/personal-llm-gateway-cliproxyapi:v7.2.137@sha256:a1ea03be9493717bae0c55438707fcc70896118fd8bfbaf7cc5508f136124851` | Web service |
| litellm | `ghcr.io/aaronabuusama/personal-llm-gateway-litellm:v1.97.0@sha256:c8a7241be92ceac5f4b712a6752859c9e4e884c626d08b5c47037705fa1a042b` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | postgres | railway |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PORT` | cliproxyapi | 8317 |
| `CLIPROXY_API_KEY` | cliproxyapi | (secret) |
| `PORT` | litellm | 4000 |
| `UI_PASSWORD` | litellm | (secret) |
| `UI_USERNAME` | litellm | (secret) |
| `CLIPROXY_API_KEY` | litellm | (secret) |
| `CLIPROXY_BASE_URL` | litellm | http://cliproxyapi.railway.internal:8317/v1 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/management.html`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/health/liveliness`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/personal-llm-gateway)
