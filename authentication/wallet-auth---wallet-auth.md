# Deploy wallet-auth on Railway

Wallet auth API: SIWE, Nostr NIP-98 and Solana signature verification

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wallet-auth)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/wallet-auth)

![Wallet Auth API](https://raw.githubusercontent.com/INAPP-Mobile/wallet-auth/main/template-icon.svg)

Wallet Auth API is a self-hosted signature verification service for the agent economy. Verify **SIWE** (Ethereum/EIP-4361), **NIP-98** (Nostr HTTP auth), and **Solana ed25519** signatures over one HTTP interface — with an x402 micropayment oracle ($0.001 per verify) and a free forward-auth gate mode that protects any service behind Caddy or nginx.

The template deploys a single Node.js container built from its own Dockerfile, with a persistent volume mounted at `/data` that stores single-use sign-in challenges (nonce store) so replay protection survives restarts and deploys.

- One service, one public domain, no companion databases required
- Sessions are stateless HS256 tokens; the only persistent state is the nonce store on the volume
- Set `PUBLIC_URL=${{RAILWAY_PUBLIC_DOMAIN}}` after first deploy and redeploy once so domain variables resolve

Railway provides compute, TLS at the edge, the public URL, and the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wallet-auth | [INAPP-Mobile/wallet-auth](https://github.com/INAPP-Mobile/wallet-auth) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PUBLIC_URL` | - | Canonical public origin (resolves on second deploy). |
| `PAID_VERIFY` | off | 'off' disables the x402 paywall (gate-only mode). |
| `X402_PAY_TO` | 0x90b0dC893406d6eA63bb077ED59F5e8340f98d84 | Wallet receiving x402 payments — replace with your own. |
| `SESSION_SECRET` | (secret) | Auto-generated HS256 signing secret. |
| `X402_PRICE_USD` | $0.001 | Price per oracle verification. |
| `X402_CDP_KEY_ID` | - | Coinbase CDP API key ID for the x402 facilitator. |
| `GATE_COOKIE_NAME` | wa_session | Forward-auth session cookie name. |
| `NONCE_TTL_MINUTES` | 10 | Challenge lifetime (minutes). |
| `SESSION_TTL_HOURS` | 24 | Session token lifetime (hours). |
| `X402_CDP_KEY_SECRET` | (secret) | Coinbase CDP API key secret (PEM EC or base64 Ed25519). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Authentication · **Languages:** JavaScript, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/wallet-auth)
