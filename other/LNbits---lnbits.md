# Deploy LNbits on Railway

Bitcoin Lightning wallet & payments API powered by an ACINQ phoenixd node.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lnbits)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/lnbits?utm_medium=integration&utm_source=button&utm_campaign=lnbits)

[LNbits](https://lnbits.com/) is a free, open-source Lightning wallet and accounts system: create wallets for yourself or your users, accept Bitcoin Lightning payments, and extend it with plugins (payment links, paywalls, points of sale, vouchers, and more). This template pairs it with [phoenixd](https://phoenix.acinq.co/server), ACINQ's lightweight self-custodial Lightning node, so you get a complete, working bitcoin payments stack with no blockchain sync and no channel management.

Hosting LNbits normally requires connecting it to a Lightning funding source — often a full bitcoind + LND/CLN stack that needs tens of gigabytes and days of sync. This template uses phoenixd instead: a self-custodial node that offloads chain-watching to ACINQ's infrastructure while your keys stay in your volume. Both services deploy in minutes on Railway's private network — phoenixd is not publicly exposed, LNbits reaches it over the internal network, and the shared API password is auto-generated at deploy time. Each service keeps its state on a persistent volume: your Lightning seed lives in phoenixd's volume, and wallets/accounts live in LNbits' SQLite database.

**Back up your seed.** phoenixd generates a 12-word seed at `/phoenix/.phoenix/seed.dat` on first boot. This is self-custodial software — if you delete the volume without a backup, your funds are gone. Read the file right after your first deploy and store the words somewhere safe.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Phoenixd | [nomideusz/lnbits-railway](https://github.com/nomideusz/lnbits-railway) (root: /phoenixd) | Database |
| LNbits | `lnbits/lnbits:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PHOENIXD_API_PASSWORD` | Phoenixd | (secret) | Auto-generated API password for phoenixd's HTTP API. LNbits references this value — do not change after first deploy. |
| `HOST` | LNbits | 0.0.0.0 | Bind address for the web server. |
| `PORT` | LNbits | 5000 | Web server port. Also used by the Railway healthcheck. |
| `LNBITS_ADMIN_UI` | LNbits | true | Enables the superuser admin panel at /admin (first visit to the site creates the superuser). |
| `LNBITS_DATA_FOLDER` | LNbits | /app/data | SQLite data directory on the persistent volume. |
| `PHOENIXD_API_ENDPOINT` | LNbits | - | phoenixd HTTP API over Railway's private network. Auto-resolved at deploy time. |
| `PHOENIXD_API_PASSWORD` | LNbits | (secret) | Reference to Phoenixd's API password — shared secret, stored once. |
| `FUNDING_SOURCE_MAX_RETRIES` | LNbits | 9 | Startup retries while phoenixd builds (exponential backoff, ~4 min total). Without this LNbits silently falls back to VoidWallet on first deploy. |
| `LNBITS_BACKEND_WALLET_CLASS` | LNbits | PhoenixdWallet | Funding source implementation. Static — this template wires LNbits to phoenixd. |

## Configuration

- **Volume:** `/phoenix/.phoenix`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/lnbits)
