# Deploy phpMyAdmin + MySQL | (Just Updated) Fixes the Apache Crash Loop on Railway

Fixes the Apache MPM crash loop and keeps logins alive across redeploys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/phpmyadmin-mysql-or-just-updated-fixes-t)

## About

A working **phpMyAdmin 5.2.3** web console with its own **MySQL 9.4** database, in one
deploy. The MySQL data directory and the phpMyAdmin session store are both on Railway
volumes, and the admin credentials are generated for you — there is nothing to fill in
on the deploy form.

Two services. MySQL 9.4 stores its data on a volume and is published on a Railway TCP
proxy so your own applications can connect to it; its InnoDB buffer pool is sized from
the container's actual memory limit rather than MySQL's fixed 128 MB default.
phpMyAdmin runs from a wrapper image that fixes three things the stock image does not
handle on Railway: it removes the duplicate Apache MPM module that otherwise aborts
Apache at start with `More than one MPM loaded`, it binds Apache to the port Railway
injects, and it pins the phpMyAdmin blowfish secret while keeping PHP's session files
on a volume — so a redeploy no longer signs everyone out mid-task. The phpMyAdmin
configuration storage database and its control user are created automatically on first
boot, which enables bookmarks, query history, column comments and designer layouts.
Both services carry a real healthcheck, so a broken boot is reported as a failed
deploy instead of a green one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| phpmyadmin | `ghcr.io/bon5co/phpmyadmin-railway:5.2.3` | Web service |
| mysql | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_ROOT_PASSWORD` | phpmyadmin | (secret) |
| `PMA_BLOWFISH_SECRET` | phpmyadmin | (secret) |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/sessions`
- **Start command:** `/bin/sh -c 'MEM=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$MEM" in ""|max|*[!0-9]*) MEM=2147483648;; esac; BP=$((MEM / 1024 / 1024 * 50 / 100)); [ "$BP" -lt 128 ] && BP=128; echo "[railway] innodb_buffer_pool_size=${BP}M"; exec docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=${BP}M'`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/phpmyadmin-mysql-or-just-updated-fixes-t)
