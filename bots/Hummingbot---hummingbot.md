# Deploy Hummingbot on Railway

Headless Hummingbot crypto market-making bots — paper trading by default

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hummingbot)

## About

Deploy with one click. On first boot the container seeds a sample strategy config (`simple_pmm` — pure market making) onto a persistent Railway volume, applies any `HBOT_*` environment overrides, starts an HTTP health endpoint, and launches the bot headlessly. Strategy configs, connector credentials, logs, and trade data persist on the volume across redeploys.

- Single service, official pinned `hummingbot/hummingbot:version-2.16.0` image — no source build
- Runs in headless mode via the image's native `HEADLESS_MODE`/`SCRIPT_CONFIG` env vars (no TTY needed)
- Default strategy: `simple_pmm` on `kraken_paper_trade` — simulated fills, zero exchange keys needed
- Persistent Railway volume at `/home/hummingbot/data` — strategy configs, encrypted keystore, logs, data
- Built-in HTTP health endpoint on port 8080 (`/health` reports bot process liveness)
- Tune strategy parameters via `HBOT_*` env vars — no need to edit YAML by hand
- `hbot` CLI is available inside the container for advanced control: `hbot status --json`, `hbot stop`, `hbot connect kraken`, etc.
- `railway ssh -s hummingbot` shells auto-activate the `hummingbot` conda env, so `hbot` works immediately. On deployments created before this behavior shipped (or any non-login shell), run `conda activate hummingbot` first — otherwise `hbot` fails with `ModuleNotFoundError` (it runs against conda `base`, which lacks the bot's dependencies).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hummingbot | [INAPP-Mobile/hummingbot](https://github.com/INAPP-Mobile/hummingbot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Health endpoint port. Must stay 8080 — it matches the Railway domain target port configured in this template. |
| `HBOT_EXCHANGE` | kraken_paper_trade | Connector id. Paper-trade connectors simulate fills with no API keys. Switch to a live connector (e.g. kraken) after adding API keys via the keystore. |
| `SCRIPT_CONFIG` | simple_pmm.yml | Strategy config file to run from conf/scripts/ on the volume. Seeded on first boot with a pure market-making sample strategy. |
| `CONFIG_PASSWORD` | (secret) | Password for Hummingbot's encrypted keystore (stores connector API keys). Auto-generated per deployment. Set your own to keep keys readable across redeploys. |
| `HBOT_ASK_SPREAD` | 0.5 | Distance of sell orders above the mid price, in percent. |
| `HBOT_BID_SPREAD` | 0.5 | Distance of buy orders below the mid price, in percent. |
| `HBOT_PRICE_TYPE` | mid | Reference price for spreads: mid, last, best_bid, or best_ask. |
| `HBOT_ORDER_AMOUNT` | 0.05 | Order size in base currency. |
| `HBOT_TRADING_PAIR` | ETH-USD | Market to make, in BASE-QUOTE format (e.g. ETH-USD, BTC-USDT). |
| `HBOT_ORDER_REFRESH_TIME` | 30 | Seconds between order cancel-and-replace cycles. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/hummingbot/data`

**Category:** Bots · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hummingbot)
