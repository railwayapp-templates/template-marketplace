# Deploy Aurelio Finance Pro Stack on Railway

Aurelio Finance Pro Stack: private wealth dashboard, AI and SQLite volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aurelio-finance-pro-stack)

## About

Aurelio Finance is an open-source wealth dashboard and financial-planning app with an optional AI advisor. Track banks, brokers, investments, real assets, debts, income, expenses and financial goals from one private workspace. This Railway Pro Stack adds a generated password, protected UI and API, and persistent SQLite storage to the original Aurelio application.

The template builds the native React interface and FastAPI backend from a fixed upstream revision. One service runs them behind a private HTTPS gateway. SQLite, application records and settings are stored on an attached Railway volume. You can open and use the core application without creating an OpenRouter account or providing a model API key.

Aurelio is a single-user app. The deployment password protects the whole instance; it does not add separate users or roles. This is an independent Railway template, not an official hosted Aurelio product.

### What this Pro Stack adds

| Feature | Included behavior |
| --- | --- |
| Private access | Generated owner password for the web app and every API route |
| Secure browser session | HTTPS-only, HTTP-only session cookie and origin checks |
| Persistent records | SQLite database and saved settings on `/data` |
| Low-friction first launch | Core features start without an AI key |
| Optional AI advisor | Add your own OpenRouter key in Railway Variables |
| Reproducible deployment | Pinned source revision, verified source archive and frozen dependency locks |
| Real readiness check | `/healthz` checks the running application backend |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Aurelio Finance | [XavTo/Aurelio-Finance-Railway](https://github.com/XavTo/Aurelio-Finance-Railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `APP_PASSWORD` | (secret) | - |
| `SESSION_SECRET` | (secret) | - |
| `OPENROUTER_API_KEY` | (secret) | Optional. Enables Ask Aurelio and AI analysis through your OpenRouter account. Leave blank to use the dashboard without AI; you can add it later in Railway Variables. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/aurelio-finance-pro-stack)
