# Deploy Grocy — Self-Hosted Groceries & Household Manager on Railway

Self-host Grocy — track groceries, expiry, recipes & chores

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grocy-household-manager)

## About

Grocy is an open-source "ERP for your kitchen" — a self-hosted household management system for tracking groceries, expiration dates, recipes, meal plans, chores, and household tasks. Know exactly what's in your pantry, fridge, and freezer, get warned before food spoils, plan meals from what you have, and manage recurring chores, all from a clean web app you own. This template deploys Grocy with a persistent volume and the Nginx DNS fix that Railway deployments need — so your household inventory is live and reliable, no config editing required, in minutes.

---

Grocy is simple and light, and one Railway-specific fix is the difference between a reliable deploy and a crashing one — this template includes it.

**The Nginx IPv6 resolver fix — why this template works on Railway.** The standard LinuxServer.io Grocy image crashes on Railway because its Nginx tries to use IPv6 DNS formatting that Railway's internal network doesn't provide, causing the container to fail on startup. This template ships a custom init script (`/custom-cont-init.d/99-fix-resolver`) that forces Nginx to use a standard IPv4 DNS resolver, so the service starts reliably out of the box — no manual config edits, no crash loop. This is the difference between a Grocy that deploys cleanly here and one that doesn't.

**The `/config` volume holds your entire household — persist it.** Grocy stores everything under `/config`: the SQLite database (your whole inventory, recipes, chores, and history), product images, and application settings. This template mounts a persistent volume there, so all of it survives redeploys and updates — miss the volume and your entire household database is wiped on the next deploy.

**One light container, no database to manage.** Because the image bundles Nginx, PHP, and SQLite, there's no separate database service to provision or wire beyond the volume — Grocy runs comfortably on the smallest Railway plan.

**Change the default credentials immediately.** Grocy deploys with default login credentials, so open your Railway URL, sign in, and change the username and password in settings right away, since this is a web app on the public internet. Railway's automatic HTTPS secures the connection. Beyond a shopping list, Grocy tracks stock by location and quantity, warns on expiring products, generates shopping lists, stores and scales recipes, plans meals, and manages chores with due dates — a complete home-management system.

Typical cost: **~$5/month** on Railway for the single lightweight container and volume. Grocy is MIT-licensed and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Grocy | [gridalpha/grocy-railway](https://github.com/gridalpha/grocy-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Container and PHP timezone |
| `PORT` | 80 | Port the web server listens on |
| `GROCY_CURRENCY` | USD | ISO 4217 code for price formatting |
| `GROCY_ENTRY_PAGE` | stock | Page Grocy opens on after login |
| `GROCY_BACKUP_KEEP` | 7 | Nightly database backups retained |
| `GROCY_ENERGY_UNIT` | kcal | Unit shown for energy values |
| `GROCY_ADMIN_PASSWORD` | (secret) | Password for the first account |
| `GROCY_ADMIN_USERNAME` | (secret) | Username of the first account |
| `GROCY_DEFAULT_LOCALE` | en | Fallback interface language |
| `GROCY_NGINX_WORKER_PROCESSES` | 2 | nginx worker process count |

## Configuration

- **Volume:** `/config`

**Category:** Other · **Languages:** PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/grocy-household-manager)
