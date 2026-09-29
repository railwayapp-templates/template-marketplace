# Deploy baikal-template on Railway

Your own CalDAV/CardDAV server — calendar & contact sync for every device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baikal-template)

## About

Deploying this template provisions exactly one Railway service:

- **baikal** — built from the pinned `ckulka/baikal:0.10.1-nginx` image (see the [Dockerfile](https://github.com/lNamelessl/baikal-railway-template/blob/main/Dockerfile)) plus a small boot wrapper that seeds the volume with Baïkal's application files on first boot and refreshes the application code on later boots (so image upgrades take effect) while preserving your data, then hands off to the untouched upstream entrypoint.

One Railway volume is mounted at `/var/www/baikal` — Baïkal keeps its entire state there (SQLite database, admin account, calendars, address books in `Specific/`, plus `config/`), so your data survives every restart and redeploy.

There is **nothing to type at deploy time**: the only template variable, `BAIKAL_SERVERNAME`, fills itself from your Railway domain (`${{RAILWAY_PUBLIC_DOMAIN}}`).

### After deploying

1. Open your Railway domain (`https:///`). Baïkal shows its **initialization wizard** at `/admin/install/`.
2. Set an **admin password** (the panel login name is `admin`) and continue.
3. Keep the **SQLite** database default and submit, then click **Start using Baïkal**.
4. Log in at `https:///admin/` with `admin` + your password.
5. Under **Users → + Add user**, create the account your devices will sync with (CalDAV/CardDAV clients use this user, not the panel admin).
6. Point your devices at the server (below) and start syncing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| baikal | [lNamelessl/baikal-railway-template](https://github.com/lNamelessl/baikal-railway-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/baikal`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/baikal-template)
