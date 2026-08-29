# Deploy Ghost | (Just Updated) Substack Alternative With a Login Nobody Can Steal on Railway

Own your newsletter. Admin seeded before boot, nobody can hijack the site.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-or-just-updated-substack-alternati)

## About

Ghost is the open-source publishing platform behind modern blogs and newsletters — a Substack and Medium alternative you own, with a full editor, members and paid subscriptions, email newsletters and a REST API. This template deploys Ghost 6.60.0 with MySQL on a persistent volume, and it fixes two things a stock Ghost deploy gets wrong on Railway: the admin account is claimed by the first stranger who reaches the URL, and sign-in is impossible without an email server.

A fresh Ghost install has no owner account. It publishes its setup endpoint at `/ghost/api/admin/authentication/setup/`, and that endpoint is unauthenticated until someone completes it — so on a public Railway URL the first visitor to POST it becomes the Owner, and the person who deployed the site is locked out with no recovery, because Ghost's password reset is an emailed link and a bare deploy cannot send mail. This template closes that window: it seeds the Owner from your variables before the public port ever opens, refuses to boot without a password, and re-applies the credential on every boot so a redeploy is a working password reset.

The second problem is the mail server itself. Ghost 6 enforces two-factor authentication for a sign-in from a new device, and the verification code is delivered by email — so with no SMTP configured you can hold the right password and still never get in. This template bundles a self-contained mailbox: verification and test mail land in an inbox served at `/inbox`, behind HTTP basic auth, so you can sign in end-to-end with no third-party email account. Point the `SMTP_*` variables at a real provider when you are ready to send member newsletters, and outbound mail switches over.

Ghost runs as one service with a volume at `/var/lib/ghost/content` for uploaded images, themes and settings, alongside a MySQL service with its data on its own volume. The app binds Railway's injected port, is healthchecked, and the image is pinned rather than rebuilt on your build minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ghost | `ghcr.io/bon5co/ghost-railway:6.60.0` | Web service |
| mysql | `mysql:8.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `GHOST_ADMIN_PASSWORD` | ghost | (secret) |
| `database__connection__user` | ghost | (secret) |
| `database__connection__password` | ghost | (secret) |
| `MYSQL_USER` | mysql | (secret) |
| `MYSQL_PASSWORD` | mysql | (secret) |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`
- **Start command:** `/bin/sh -c 'MEM=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$MEM" in ""|max|*[!0-9]*) MEM=2147483648;; esac; BP=$((MEM / 1024 / 1024 * 50 / 100)); [ "$BP" -lt 128 ] && BP=128; echo "[railway] innodb_buffer_pool_size=${BP}M"; exec docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=${BP}M'`
- **Volume:** `/var/lib/mysql`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/ghost-or-just-updated-substack-alternati)
