# Deploy Wealthfolio on Railway

Empower Alternative. Track investments, holdings and net worth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wealthfolio-tracker)

## About

Wealthfolio is an open-source portfolio and net-worth tracker for people who want to follow their investments without handing a bank login to a third party. It records brokerage accounts, holdings and every buy, sell, dividend and deposit, values the portfolio against live market data, and reports time-weighted returns and allocation — the self-hosted answer to Empower Personal Dashboard, Sharesight and the spreadsheet most investors outgrow.

Deploy Wealthfolio on Railway and you get the web edition: a single Rust service serving both the React frontend and its REST API on one origin, backed by embedded SQLite on a persistent volume. Self-host Wealthfolio here and there is nothing else to wire up — no external database, cache or object storage. The source repository builds on the official `wealthfolio/wealthfolio` image, adding a startup script that hashes your password, prepares the encryption key and takes ownership of the volume before dropping to the app's own unprivileged user.

![Wealthfolio Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787076959/152f864c-2173-4ea0-ba0e-e12b787cb1e5.png)

Wealthfolio is local-first by design: your holdings, trades and balances live in one SQLite file you own, and the only data leaving the deployment is anonymous market-data lookups for the tickers you hold. Aggregators like Empower and Mint instead hold your brokerage credentials; the trade-off for inverting that is entering transactions yourself or importing broker CSVs.

Key features:

- Accounts in any currency, converted automatically into one base currency
- Full ledger — buys, sells, dividends, splits, deposits, withdrawals, fees, transfers
- Live and historical prices for stocks, ETFs and bonds across global exchanges
- Time- and money-weighted returns, allocation and contribution tracking
- Net worth and spending views, savings goals and contribution limits
- CSV import, addons and optional OpenID Connect SSO

One service runs the Rust binary, serving the frontend and the REST API under `/api/v1` from one origin, so there is no cross-origin session problem. A single volume at `/data` holds the database, the encrypted secrets file and addons. Two background jobs run inside that process on timers, refreshing market data and syncing brokers — which is why it runs as one instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wealthfolio | [gridalpha/wealthfolio-railway](https://github.com/gridalpha/wealthfolio-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8088 | HTTP server listening port |
| `WF_SECRET_KEY` | (secret) | Encrypts stored secrets, signs sessions |
| `WF_AUTH_PASSWORD` | (secret) | Password used to sign in |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/wealthfolio-tracker)
