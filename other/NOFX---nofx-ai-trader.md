# Deploy NOFX on Railway

Trading terminal where an AI model picks and manages the trades

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nofx-ai-trader)

## About

NOFX is an open-source AI trading terminal where the strategy is a language model. Each trader runs a continuous loop — read market structure, decide, execute, record the reasoning — while a Go runtime clamps every order to risk limits the model cannot override. Traders compose across nine exchanges and eight model providers, and you can run several side by side and rank them by realized return. It is for developers who want an autonomous trading agent they can read and modify.

Deploy NOFX on Railway and you get the full terminal on one HTTPS URL, backed by managed PostgreSQL. The Go API and React front end run in a single container behind nginx, so dashboard and API share an origin and sessions work with no extra configuration. Account, trader configurations, decision history and encrypted exchange credentials live in PostgreSQL; a volume holds the transport encryption key. Self-host NOFX elsewhere and you manage key material, a database and a reverse proxy by hand.

![Diagram of the NOFX and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787154195/nofx-architecture.png)

NOFX puts a language model in the decision seat and keeps risk controls in compiled code. A trader is a named configuration — model, exchange, coin universe, indicators, prompt — that wakes on a schedule, reads market structure, and opens, adjusts or closes positions. Every decision is stored with its reasoning, so no position lacks a paper trail.

Key features:

- **Model-agnostic traders** — DeepSeek, OpenAI, Claude, Qwen, Gemini, Grok, Kimi, MiniMax and custom endpoints
- **Nine exchanges** — Binance, Bybit, OKX, Hyperliquid, Bitget, KuCoin, Gate, Aster, Lighter
- **Risk limits outside the model's reach** — position and leverage caps, exchange-side stop-loss and take-profit, drawdown auto-close, trade throttling, and a safe mode after repeated model failures
- **Strategy Studio** — style presets, coin universes, indicators, entry confidence, custom prompts
- **Competition leaderboard** — rank traders by realized return, each attributed to its model
- **Full decision log** — the reasoning behind every entry and exit

Two services. **NOFX** runs the Go API on a loopback port with nginx in front, serving the React bundle and proxying `/api`; nginx forwards the real client address so the login rate limiter works per user. **PostgreSQL** holds every durable record — users, traders, orders, positions, equity history and encrypted credentials. The app's volume stores the browser-to-server encryption key and keeps a redeploy from running two trading runtimes at once.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nofx | [gridalpha/nofx-railway](https://github.com/gridalpha/nofx-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `TZ` | nofx | UTC | Container timezone |
| `PORT` | nofx | 8080 | HTTP port nginx listens on |
| `DB_HOST` | nofx | - | PostgreSQL private hostname |
| `DB_NAME` | nofx | - | PostgreSQL database name |
| `DB_PORT` | nofx | - | PostgreSQL port |
| `DB_USER` | nofx | (secret) | PostgreSQL user |
| `DB_SSLMODE` | nofx | require | Encrypt the database connection |
| `JWT_SECRET` | nofx | (secret) | Signs session tokens, keep stable |
| `DB_PASSWORD` | nofx | (secret) | PostgreSQL password |
| `CORS_ALLOWED_ORIGINS` | nofx | - | This deployment's own origin |
| `TRANSPORT_ENCRYPTION` | nofx | true | Browser encrypts API keys before sending |
| `NOFX_ENCRYPTION_SECRET` | nofx | (secret) | Seeds the at-rest encryption key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nofx-ai-trader)
