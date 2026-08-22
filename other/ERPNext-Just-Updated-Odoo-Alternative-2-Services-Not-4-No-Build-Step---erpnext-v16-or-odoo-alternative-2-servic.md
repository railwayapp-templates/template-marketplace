# Deploy ERPNext | (Just Updated) Odoo Alternative, 2 Services Not 4, No Build Step on Railway

Odoo alternative in 2 services, prebuilt images, no build minutes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/erpnext-v16-or-odoo-alternative-2-servic)

## About

ERPNext is a complete open-source ERP — double-entry accounting, inventory and warehouses, buying and selling, manufacturing (BOMs, work orders, capacity planning), projects, HR and payroll, a built-in CRM, and a website/portal builder — all on the Frappe framework, with a REST API over every document type and a low-code builder for your own doctypes, workflows and print formats. It is the open-source alternative people reach for instead of Odoo, NetSuite or SAP Business One.

This template deploys ERPNext **v16.30.0** as **two** services — the application and MariaDB — off images pinned to an exact version. There is **no build step**: both images are prebuilt, so the deploy is a pull, not a fifteen-minute compile. The deploy form has nothing you have to fill in.

ERPNext is not one process. A working install needs the web server, a background worker for every queued job (emails, stock reposts, ledger rebuilds, scheduled reports), a scheduler for cron-driven documents, a socket.io service for realtime updates, redis for the cache and the job queues, and nginx in front to serve the built assets and route the websocket. `frappe_docker` splits those across six containers around a **shared `sites/` volume**.

That shared volume is the thing Railway does not offer: a Railway volume attaches to exactly one service, and frappe's web, worker and scheduler all read and write the same `sites/` directory. So on Railway, ERPNext is a single container by necessity — this template runs the full process set under `honcho`, exactly as `bench start` does, and if any one process exits the container is torn down and restarted rather than left half-running.

Three things this template does differently from the other ERPNext listings:

- **Prebuilt, pinned images instead of a repo build.** Every other ERPNext listing here points Railway at a GitHub repository, so each deploy runs a full ERPNext image build on your account's build minutes, against a base tag that moves — two deploys a fortnight apart are not the same software. Here the version is the tag: `frappe/erpnext:v16.30.0`, wrapped as `ghcr.io/bon5co/erpnext-railway`. Nothing compiles at deploy time.
- **Two services, not four.** Frappe wants three redis *databases* — cache, queue, socketio — which the other listings satisfy with two extra always-on redis containers. This image runs one redis beside the bench (db `0` for cache, db `1` for queue and socketio), which is what a development bench does anyway. You pay for the app and the database, and nothing else.
- **Custom domains work without re-creating the site.** The site directory is named `erp` and nginx passes that fixed name as `X-Frappe-Site-Name` on every request, so frappe resolves the same site whatever `Host` it arrives with. Listings that name the site after `RAILWAY_PUBLIC_DOMAIN` serve `Site not found` the moment you attach your own domain — the site would have to be created again under the new name.

Sizing: expect roughly 400–500 MB for the application container (nginx, gunicorn, one worker, scheduler, socketio, redis) and 250–350 MB for MariaDB at idle, so the Hobby plan is enough to start. `GUNICORN_WORKERS` and `FRAPPE_WORKER_QUEUES` are ordinary Railway variables — raise them when the ERP is carrying real users.

**First boot takes 5–10 minutes.** The entrypoint runs `bench new-site --install-app erpnext`, which creates the database, installs both apps and builds several hundred doctypes before anything listens on a port. The healthcheck is set to wait for it. Every later boot finds the existing site and starts in seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `ghcr.io/bon5co/erpnext-railway-mariadb:latest` | Database |
| erpnext | `ghcr.io/bon5co/erpnext-railway:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) |
| `ADMIN_PASSWORD` | erpnext | (secret) |
| `DB_ROOT_PASSWORD` | erpnext | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/frappe/frappe-bench/sites`

**Category:** Other

[View on Railway →](https://railway.com/deploy/erpnext-v16-or-odoo-alternative-2-servic)
