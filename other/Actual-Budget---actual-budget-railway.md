# Deploy Actual Budget on Railway

YNAB Alternative. Local-first personal finance and budgeting

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/actual-budget-railway)

## About

Actual Budget is an open-source, local-first envelope budgeting app — the zero-based method popularised by YNAB, without the subscription. Every dollar gets assigned a job before you spend it, and the app tracks how each category performs month to month. Because it is local-first, the browser holds a working copy of your budget and syncs changes to a server you control, so it stays fast offline and your financial data never touches a third-party analytics stack. People self-host Actual Budget to replace a $109/year YNAB subscription or to keep bank data off commercial servers.

Deploy Actual Budget on Railway and you get the sync server and web client in one container on port 5006 behind a generated HTTPS domain. A 5 GB volume is mounted at `/data`, where the whole deployment lives: `account.sqlite` under `server-files` holds users, sessions and the budget-file registry, while `user-files` holds each budget and its sync history. There is no separate database to configure — Actual Budget uses SQLite by design — so the template is one service, one volume, and no wiring between them. A health check on `/health` keeps traffic away from a container that has not finished its migrations.

Actual Budget answers one question well: how much can I actually spend in this category without breaking something else? It does that with zero-based budgeting, where income is allocated into categories until nothing is unassigned. Households self-host it when they want that workflow without sending years of transaction history to a vendor.

Key features:

- Zero-based, envelope-style monthly budgeting with rollover balances
- Multi-device sync through a server you own, with full offline use
- Optional end-to-end encryption, so the server stores ciphertext it cannot read
- Bank syncing via GoCardless, SimpleFIN, Pluggy.ai and Enable Banking, plus QIF/OFX/QFX/CSV import
- Scheduled transactions, auto-categorising rules, and reports for net worth, cash flow and spending
- A sync API and official CLI for scripting

The architecture is deliberately small. One Node.js process serves the compiled React client and the sync API from the same origin, and SQLite files on the volume are the only datastore. The client keeps its own copy of the budget in IndexedDB and exchanges sync messages with the server, which is why the interface stays responsive and why a lost browser profile is not a lost budget — signing in again re-downloads everything.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| actual | `actualbudget/actual-server` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5006 | HTTP listen port |
| `NODE_OPTIONS` | --max-old-space-size=4096 | Cap Node heap to container size |
| `ACTUAL_TRUSTED_PROXIES` | 10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,fc00::/7,::1/128,100.64.0.0/10,fd00::/8 | Trusted proxy CIDRs including Railway edge |
| `ACTUAL_USER_CREATION_MODE` | manual | Admin creates users, no self-signup |
| `ACTUAL_UPLOAD_FILE_SYNC_SIZE_LIMIT_MB` | 100 | Max budget file sync size |
| `ACTUAL_UPLOAD_SYNC_ENCRYPTED_FILE_SYNC_SIZE_LIMIT_MB` | 100 | Max encrypted file sync size |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /data && chown -R actual:actual /data && setpriv --reuid=actual --regid=actual --init-groups id && exec setpriv --reuid=actual --regid=actual --init-groups /usr/bin/tini -g -- node app.js'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/actual-budget-railway)
