# Deploy CloudBeaver [Updated Sep'26] on Railway

Self-host CloudBeaver — browser SQL editor & database GUI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudbeaver-database-manager)

## About

CloudBeaver is a web-based database manager from the team behind DBeaver — a browser SQL editor, data grid, and admin tool for PostgreSQL, MySQL, MariaDB, SQLite, MongoDB, and dozens of other databases. Give your whole team a shared, self-hosted GUI to browse schemas, run queries, and edit data, with no desktop client to install and no per-seat licensing. This template deploys CloudBeaver Community Edition with a persistent volume and an admin account, handling Railway's port and login gotchas — so your team's database console is live in minutes.

---

CloudBeaver is simple to run, and three specifics decide whether it deploys cleanly and keeps your work — all handled here.

**Persist the workspace volume — or lose every connection.** This is the critical one: CloudBeaver stores all of its state — saved database connections, users, roles, and configuration — under `/opt/cloudbeaver/workspace`. Without a volume there, everything is wiped on every redeploy, so you'd re-add every database connection each time. This template mounts the volume, so your connections and settings persist across redeploys — a console you set up once, not one you rebuild constantly.

**Your admin password must meet the policy — or the first login fails.** A non-obvious gotcha: CloudBeaver enforces a password policy, so `CB_ADMIN_PASSWORD` must be at least 8 characters with mixed case and a digit, or your very first login is rejected — and ten failed attempts lock the account for five minutes. This template sets a compliant admin password so you can sign in immediately, along with `CB_ADMIN_NAME` and `CB_SERVER_NAME`.

**Don't override the start command — the port mapping needs it.** CloudBeaver's entrypoint maps Railway's `$PORT` to `CLOUDBEAVER_WEB_SERVER_PORT` and then runs the upstream initialization, so the app binds where Railway routes. Overriding the start command skips that mapping and the init, and the service won't be reachable — so leave it alone. Railway terminates TLS for your generated domain.

**Lock it down, and connect the databases you already run.** CloudBeaver can browse and edit real data, so this template sets `CLOUDBEAVER_APP_ANONYMOUS_ACCESS_ENABLED=false` to require login rather than leaving the console open; supply database credentials as Railway variables, never in files. From the UI, add connections to PostgreSQL, MySQL, MariaDB, SQLite, MongoDB, and more via built-in drivers — and for databases in the same Railway project, connect over the private network for speed and to avoid exposing them publicly, so CloudBeaver becomes the single shared window into all of them.

Typical cost: **~$5–10/month** on Railway for the lightweight service and volume. CloudBeaver Community Edition is Apache-2.0 and free — no seat limits and no feature keys, unlike commercial database GUIs.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CloudBeaver | `dbeaver/cloudbeaver` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8978 | Port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/cloudbeaver/workspace`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/cloudbeaver-database-manager)
