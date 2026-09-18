# Deploy rotki on Railway

Portfolio tracker and tax accounting tool for crypto and assets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rotki-app)

## About

Self-host rotki to track a portfolio without handing your financial history to anyone. rotki is an open-source portfolio manager, analytics engine and tax-accounting tool for crypto and traditional assets. It reads balances from exchanges, blockchains and manual entries, prices them against real market data, and keeps everything in a SQLCipher-encrypted database only your password opens. Accountants, long-term holders and anyone uneasy about giving a closed-source tracker their exchange keys reach for it.

Deploy rotki on Railway and the template wires up two services. **rotki** runs the published `rotki/rotki` image — a supervisor serving the web interface, the Python accounting API and a Rust asset service — with a volume holding your encrypted database. **rotki-gateway** is a small Caddy reverse proxy built from `gridalpha/rotki-railway`; it owns the public URL and puts HTTP basic auth in front. That second service is not optional polish: rotki leaves its account-creation endpoint open so its own login screen works before you sign in, which is right on a laptop and wrong on the public internet.

![Caddy gateway routing to the private rotki service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789643956/rotki-architecture.webp)

rotki inverts the usual tracker bargain: instead of a hosted service holding your keys and history, it runs beside you and keeps every record in a local encrypted database. Self-hosting suits holdings spread across exchanges and chains, defensible cost-basis numbers at tax time, or any case where giving a third party your exchange keys is unacceptable.

- Balance tracking across exchanges, EVM, Bitcoin, Solana and Substrate chains, plus manual entries
- Profit-and-loss reports with configurable accounting rules and cost-basis methods
- A decoder turning raw on-chain transactions into readable events across many DeFi protocols
- Historical price lookups from multiple oracles, with per-asset overrides
- An editable asset database of tens of thousands of tokens
- Per-user encryption, so several people can share one deployment privately

The two services divide cleanly. **rotki** holds all state and takes no traffic directly — interface, REST API and asset service all sit behind Railway's private network. **rotki-gateway** terminates the public request, checks basic auth and forwards, leaving two paths open: its own health endpoint, and the WebSocket rotki already protects with its session cookie.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rotki | `rotki/rotki:latest` | Database |
| rotki-gateway | [gridalpha/rotki-railway](https://github.com/gridalpha/rotki-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | rotki | 8080 | Port Railway probes and routes |
| `LOGLEVEL` | rotki | info | Backend log level |
| `ROTKI_HTTP_PORT` | rotki | 8080 | Supervisor's own port knob, must equal PORT |
| `ROTKI_SESSION_KEY` | rotki | - | Signs session cookies, enables API auth |
| `ROTKI_SESSION_COOKIE_SECURE` | rotki | forwarded | Mark cookies Secure from X-Forwarded-Proto |
| `PORT` | rotki-gateway | 8080 | Public listener port |
| `GATEWAY_USER` | rotki-gateway | (secret) | Basic-auth username |
| `ROTKI_UPSTREAM` | rotki-gateway | - | Private address of the rotki service |
| `GATEWAY_PASSWORD` | rotki-gateway | (secret) | Basic-auth password, hashed at boot |

## Configuration

- **Start command:** `/opt/rotki/starling --mode docker --core-binary /opt/rotki/rotki-core/rotki --colibri-binary /opt/rotki/colibri --data-dir /data --logs-dir /data --frontend-dir /opt/rotki/frontend --api-host 127.0.0.1`
- **Healthcheck:** `/health`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rotki-app)
