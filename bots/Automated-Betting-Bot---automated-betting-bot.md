# Deploy Automated Betting Bot on Railway

A sophisticated automated betting bot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/automated-betting-bot)

## About

Deploying BetBot Pro requires a continuous 24/7 cloud environment to ensure it never misses critical live match windows. Hosting this bot involves setting up a Python-based state machine that polls the Sofascore API, integrates with a persistent Google Firebase Firestore database, and maintains real-time connectivity for Telegram notifications. Using a cloud platform ensures that network drops do not interrupt the Martingale tracking, preventing costly desynchronization of your bankroll recovery steps.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 36-80_live_bet | [atho-gitrepo/36-80_live_bet](https://github.com/atho-gitrepo/36-80_live_bet) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |
| `TELEGRAM_TOKEN` | (secret) |
| `TELEGRAM_CHAT_ID` | Please fill telegram chat id here |
| `FIREBASE_CREDENTIALS_JSON` | (secret) |

## Configuration

- **Start command:** `python -u worker/main.py`

**Category:** Bots · **Languages:** Python

[View on Railway →](https://railway.com/deploy/automated-betting-bot)
