# Deploy Akaunting | (Just Updated) QuickBooks Alternative Whose Recurring Invoices Actually Run on Railway

Books that actually run recurring invoices. Volumes, admin seeded.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/akaunting-or-just-updated-quickbooks-alt)

## About

Akaunting is open-source accounting software for small businesses and freelancers:
invoicing, expenses, bills, banking, reporting and multi-company bookkeeping in the
browser. This template runs Akaunting 3.1.21 with MariaDB, on persistent volumes, with
the administrator account seeded before the public URL ever answers a request.

Two services: Akaunting (Apache + PHP, public HTTPS, volume at `/var/www/html`) and
MariaDB (private networking, volume at `/var/lib/mysql`). The application, its `.env`,
uploads and installed modules all live under the webroot, so the whole webroot is the
volume — the official `-v` image unpacks the release into it on first boot and reuses it
afterwards.

The scheduler runs **inside the application container**, next to Apache. That is not a
cost saving, it is a correctness requirement: `Console\Kernel::schedule()` returns early
unless `config('app.installed')` is true, and `APP_INSTALLED=true` is written by the
installer into `/var/www/html/.env` on the volume. A separate scheduler service that
cannot read that file registers **zero** Akaunting jobs — no recurring invoices, no
invoice or bill reminders, no temp-file cleanup, no pruning — and still exits 0 every
run, so nothing ever looks broken.

The installer runs exactly once, behind a marker on the volume. `php artisan install` is
not idempotent: it regenerates `APP_KEY` and creates a second company plus a duplicate
admin user, and the `users` unique index is `(email, deleted_at)`, so MySQL's distinct
NULLs let that duplicate through silently.

The administrator password is generated per deploy by Railway (`${{secret}}`) and the
container refuses to boot without one, so the instance is claimed before it is reachable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| akaunting | `ghcr.io/bon5co/akaunting-railway:3.1.21` | Web service |
| mariadb | `ghcr.io/bon5co/akaunting-railway-mariadb:11.8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_PASSWORD` | akaunting | (secret) |
| `ADMIN_PASSWORD` | akaunting | (secret) |
| `MARIADB_PASSWORD` | mariadb | (secret) |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/akaunting-or-just-updated-quickbooks-alt)
