# Deploy Finance Tracker Lite on Railway

Single-service household finance ledger on SQLite with a data volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/finance-tracker-lite)

## About

Finance Tracker Lite is the single-service edition of Finance Tracker: a private, multi-user household finance app that stores everything in an embedded SQLite database on a Railway volume — no database service to pay for. Accounts, balanced ledger transactions, budgets, recurring bills, and CSV import validation work exactly like the full edition.

Hosting deploys exactly one service: the Node application plus a persistent `/data` volume holding the SQLite file (WAL mode). Household members create accounts and record balanced postings; dashboards derive net worth, cash flow, and budget spending from posted ledger data. Signed sessions isolate households. Money is stored as integer minor units (EUR/USD cents, whole COP pesos). Because there is no database process, runtime cost stays at a single small service.

Choose Lite for the cheapest self-hosted household deployment. Choose the full [Finance Tracker](https://railway.com/deploy/finance-tracker-1) when you want managed PostgreSQL, managed backups, or expect many households per deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| finance-tracker-lite | `wotonews/finance-tracker-lite:v0.2.0` | Database |

## Configuration

- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/finance-tracker-lite)
