# Deploy ZERO Paper Runtime on Railway

Paper-first ZERO runtime for self-custodial onchain operations.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zero-paper-runtime)

## About

ZERO is an autonomous operating system for self-custodial onchain operations. This template launches the public paper runtime: health checks, durable journal storage, delayed intelligence endpoints, live Hyperliquid public prices, and safety-first operator diagnostics without requiring exchange private keys.

The template deploys the Apache-2.0 ZERO runtime from GitHub, builds from the public Dockerfile, mounts a persistent Railway volume at `/data`, and exposes the HTTP service with `/health` as the readiness check. It is intentionally paper-first: live market data can be used for evaluation, but order execution remains simulated unless an operator deliberately provisions a separate live setup with custody, preflight, reconciliation, and kill-switch controls.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zero | [zero-intel/zero](https://github.com/zero-intel/zero) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ZERO_MODE` | paper | Runtime mode. Keep paper for hosted public deployments. |
| `ZERO_JOURNAL_PATH` | /data/decisions.jsonl | Durable journal path mounted on the Railway volume. |
| `ZERO_DEPLOYMENT_ID` | zero-railway-public-paper | Public-safe deployment identifier for diagnostics and evidence. |
| `ZERO_HYPERLIQUID_LIVE_PRICES` | 1 | Use live Hyperliquid public market data while orders remain paper. |
| `ZERO_INTELLIGENCE_API_ACCOUNT_ID` | acct_railway | Public-safe account id for delayed Intelligence API demo packets. |

## Configuration

- **Start command:** `/app/scripts/railway_start.sh`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Rust, Python, Shell, HTML, Just, Ruby, Dockerfile

[View on Railway →](https://railway.com/deploy/zero-paper-runtime)
