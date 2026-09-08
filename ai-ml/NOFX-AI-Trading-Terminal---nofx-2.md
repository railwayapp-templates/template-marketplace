# Deploy NOFX AI Trading Terminal on Railway

NOFX AI trading dashboard for evaluation; no live trading verified.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nofx-2)

## About

Self-hosted [NOFX](https://github.com/NoFxAiOS/nofx) with a persistent SQLite volume, backend healthcheck, protected owner registration, and restart-invalidated sessions. Backend, frontend, and Alpine image digests are pinned in the Dockerfile.

**Do not attach real funds or credentials based on deployment tests.** Automated trading can lose money. No real trading, deposits, funded wallets, or model/exchange credentials are covered by the audit.

One container runs nginx on port `8080` and the Go backend internally on `8081`. SQLite, RSA, and fallback AES key material live on `/app/data`. Railway checks `GET /health`, which proxies to the backend's `/api/health`.

The startup wrapper requires a setup password and protects **only** `/api/register` (including its trailing-slash form) with nginx HTTP Basic authentication. Other APIs retain their normal Bearer-token authentication. The backend port must never receive a public domain or TCP proxy; publish nginx only.

Each startup derives a new effective JWT signing key from the private JWT seed and fresh random entropy. **All sessions expire on restart/redeploy; log in again.** SQLite, RSA and data-encryption keys are not rotated. Use one replica and the supplied startup wrapper, not the backend binary directly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nofx | [leoisadev1/railway-template-nofx](https://github.com/leoisadev1/railway-template-nofx) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | nginx HTTP listen port; the backend remains internal on 8081. |
| `JWT_SECRET` | (secret) | Private 32+ character seed. Startup combines it with fresh random entropy for a per-process signing key, so every restart invalidates all sessions. Does not encrypt wallet or exchange data. |
| `SETUP_PASSWORD` | (secret) | Required owner-registration gate. When the browser requests NOFX owner setup, use username setup and this password. At least 16 letters/digits/_/-. This is separate from the account password. |
| `DATA_ENCRYPTION_KEY` | - | Generated independent secret accepted by the upstream AES decoder. The observed 32-character Base64 value decodes to 24 bytes (AES-192). Keep stable with the volume; changing it can make stored credentials unreadable. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nofx-2)
