# Deploy Grocy on Railway

Household manager for groceries, expiry dates, recipes and chores

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grocy-inventory)

## About

Grocy is a self-hosted groceries and household management system — "ERP beyond your fridge". It tracks what is in your kitchen, when each item is due and what needs buying again, then extends the same idea to recipes, meal plans, chores, tasks, batteries and equipment manuals. It is a small PHP application with a REST API behind every screen, MIT-licensed and built by Bernd Bestel, for when a shared shopping list stops being enough.

Deploy Grocy on Railway and you get one service that already knows how to run here. The image is built on `ghcr.io/linuxserver/grocy` — nginx and PHP-FPM under s6 supervision — with a boot step that creates the admin account from your own credentials instead of leaving Grocy's documented `admin` / `admin` login in place, generates the web server configuration for Railway's assigned port, serves an unauthenticated health route that reads through the migrated database, and hardens the session cookie. One volume at `/config` holds the database, pictures and nightly backups.

![Diagram of the single Grocy service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787739268/grocy-architecture.png)

Grocy solves a problem no shopping-list app touches: knowing what you already own and when it goes off. Households self-host it because the data — what you buy, eat and throw away — is personal.

- **Stock management** with locations, due dates, opened tracking, freezing, price history and a full journal
- **Shopping list** that auto-adds products falling below a minimum stock amount
- **Recipes and meal plan** that check ingredients against stock and push what is missing to the list
- **Chores and tasks** with flexible schedules and per-user assignment
- **Batteries and equipment** for charge cycles and instruction manuals
- **Barcode support** — USB scanner, device camera, and Open Food Facts lookups
- **REST API and userfields**, so custom columns and outside integrations are first-class

The deployment is deliberately one service. Grocy keeps everything in a single SQLite file, which suits a household dataset — but it means the volume is the deployment. A nightly job writes a consistent `VACUUM INTO` copy into `/config/backups` and keeps the last seven.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grocy | [gridalpha/grocy-railway](https://github.com/gridalpha/grocy-railway) | Web service |

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

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/grocy-inventory)
