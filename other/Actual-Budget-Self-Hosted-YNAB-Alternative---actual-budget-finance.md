# Deploy Actual Budget — Self-Hosted YNAB Alternative on Railway

Self-host Actual — private budgeting with bank sync & encryption

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/actual-budget-finance)

## About

Actual Budget is a fast, private, open-source personal finance app — a self-hosted alternative to YNAB with zero-based envelope budgeting, multi-device sync, bank import, and optional end-to-end encryption. It's local-first, so the app is quick and works offline, while your own server keeps every device in sync — with no subscription and your financial data entirely under your control. This template deploys the official Actual server with a persistent volume and automatic HTTPS, so your private budgeting server is live across all your devices in minutes.

---

Actual is exceptionally light, and two specifics are essential to get right — this template handles both.

**HTTPS is mandatory — and Railway provides it automatically.** Actual uses the browser's Web Cryptography API for its end-to-end encryption and client sync, and browsers only expose that API over a secure connection. Without HTTPS, encryption and multi-device sync simply fail — a common self-hosting frustration on setups that skip TLS. Railway serves your instance over automatic HTTPS out of the box, so encryption and sync work immediately with nothing to configure.

**The `/data` volume holds your entire budget — persist it.** Actual writes everything under `/data`: `server-files/` contains the account database (`account.sqlite`) with your login and session data, and `user-files/` holds your actual budget files. Both must live on the mounted volume — miss it, and the next image update throws your budget away. This template mounts the volume at `/data`, so your login and budgets survive every redeploy and update.

**Set your server password on first visit.** After deploy, open your Railway URL and you're prompted to create a server password that protects your budget from unauthorized access. Then click "Start fresh" for a new budget, or import an existing one from YNAB4, nYNAB, or QIF/OFX/QFX/CSV files.

**Bank sync brings transactions in automatically.** Connect your accounts through GoCardless (Europe/UK) or SimpleFIN (North America) to import and reconcile transactions automatically against your budget, instead of uploading CSVs by hand — the "bank sync" that makes a self-hosted budget genuinely low-effort to maintain.

**Local-first means your budget survives anything.** The budget itself lives in each client (browser and mobile app); the server is a sync endpoint holding the master copy and change log. So the app keeps working if the server is briefly down, and as long as one client has a copy, your data is safe. `ACTUAL_TRUSTED_PROXIES` is set so Actual correctly interprets forwarded headers behind Railway's proxy, and `ACTUAL_PORT` is `5006`.

Typical cost: **~$5/month** on Railway — Actual is remarkably light, running comfortably on the smallest plan with SQLite and no separate database. It's MIT-licensed and free, versus YNAB's annual subscription.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Actual | `actualbudget/actual-server:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/actual-budget-finance)
