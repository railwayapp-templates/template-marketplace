# Deploy Invoice Ninja | (Just Updated) FreshBooks Alternative That Finishes Setting Itself Up on Railway

Self-configuring: admin seeded, queue workers running, uploads persist

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/invoice-ninja-or-just-updated-freshbooks)

## About

**Invoice Ninja** is the open-source invoicing, quoting and payments platform — a
self-hosted FreshBooks / Bill.com alternative. Create clients, send invoices and
quotes, take card payments through dozens of gateways, track expenses and time,
and let recurring invoices and payment reminders go out on their own.

This template finishes setting itself up: the database is created and migrated,
the lookup data is seeded, your admin account exists before the URL is live, and
the scheduler and queue workers actually run.

The stack is two services: the Invoice Ninja application and a MySQL 9 database,
each on its own Railway volume. The application container runs nginx on the port
Railway injects, php-fpm, the Laravel scheduler and two queue workers under
supervisord — so recurring invoices, reminders, autobilling and outbound email
are processed in the background rather than inside a web request.

Boot order matters and is handled for you. The container waits for MySQL, creates
the application database if it is missing, runs migrations and seeds, then creates
your administrator account — all before nginx opens the public port, so the setup
wizard is never served to a stranger. Your admin password is re-applied on every
boot, which makes a redeploy a working password reset. The `APP_KEY` that encrypts
stored payment-gateway credentials is generated per deployment onto the volume
instead of being shared by every deploy, and uploaded logos and attachments are
written to the volume rather than to the disposable container layer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| invoice-ninja | `ghcr.io/bon5co/invoice-ninja-railway:5.13.37` | Web service |
| mysql | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_PASSWORD` | invoice-ninja | (secret) |
| `IN_PASSWORD` | invoice-ninja | (secret) |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/app/storage`
- **Start command:** `/bin/sh -c 'MEM=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$MEM" in ""|max|*[!0-9]*) MEM=2147483648;; esac; BP=$((MEM / 1024 / 1024 * 50 / 100)); [ "$BP" -lt 128 ] && BP=128; echo "[railway] innodb_buffer_pool_size=${BP}M"; exec docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=${BP}M'`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/invoice-ninja-or-just-updated-freshbooks)
