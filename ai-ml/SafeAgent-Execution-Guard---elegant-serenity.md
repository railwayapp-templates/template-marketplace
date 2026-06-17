# Deploy SafeAgent Execution Guard on Railway

Exactly-once guard for AI agents. Prevents duplicate payments on retry.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elegant-serenity)

## About

SafeAgent is an exactly-once execution guard for AI agents. Prevents duplicate payments, emails, trades, and webhooks when agents retry after crashes or timeouts. PROCEED on first call, SKIP on duplicate. Cited in A2A v0.4 RFC #1920.

SafeAgent runs as a FastAPI service on Railway with Postgres for durable claim storage. Every claim is persisted outside the execution context so crashes don't lose state. The sweeper resets stuck PENDING claims automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| SafeAgent | [azender1/SafeAgent](https://github.com/azender1/SafeAgent) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | SafeAgent | 8000 |
| `SAFEAGENT_DB_PATH` | SafeAgent | safeagent.db |
| `SAFEAGENT_NETWORK` | SafeAgent | base |
| `SAFEAGENT_RESOURCE_URL` | SafeAgent | https://safeagent-production.up.railway.app/claim |
| `SAFEAGENT_X402_VERSION` | SafeAgent | 1 |
| `SAFEAGENT_FACILITATOR_URL` | SafeAgent | https://x402.org/facilitator |
| `SAFEAGENT_PAYMENT_ADDRESS` | SafeAgent | Your Base or Solana wallet address to receive x402 payments |
| `SAFEAGENT_CLAIM_PRICE_USDC` | SafeAgent | 0.001 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "uvicorn safeagent_exec_guard.payment_server:app --host 0.0.0.0 --port ${PORT}" Save and redeploy.`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, TypeScript, PowerShell, Dockerfile

[View on Railway →](https://railway.com/deploy/elegant-serenity)
