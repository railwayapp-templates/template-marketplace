# Deploy Finance Tracker on Railway

Private multi-user household finance ledger with budgets and CSV import.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/finance-tracker-1)

## About

Finance Tracker is private, multi-user household finance software. It replaces browser-only totals with an authenticated PostgreSQL ledger: accounts, cash flow, budgets, recurring bills, reversible transfers, and CSV import validation live together. Monetary values are stored as integer minor units, preventing floating-point drift.

Hosting Finance Tracker deploys the Node application and a managed PostgreSQL database together. Household members create accounts and record balanced postings rather than editing balances directly; the dashboard derives net worth and cash flow from posted ledger data. Secure signed sessions isolate households. Template supports EUR, USD, and COP; COP uses zero fractional digits. Version 0.1 includes manual account and transfer workflows, reverse-not-delete ledger safety, dashboard, onboarding, CSV preview/deduplication foundation, budget schema, and recurring transaction timeline model. It intentionally excludes bank synchronization and investment pricing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| finance-tracker | `wotonews/finance-tracker:v0.1.0` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/finance-tracker-1)
