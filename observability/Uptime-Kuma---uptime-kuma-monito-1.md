# Deploy Uptime Kuma on Railway

Uptime monitoring, incident alerts, certificate expiry and status pages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-monito-1)

## About

Uptime Kuma is a self-hosted uptime monitoring tool that checks whether your sites, APIs, servers and containers are up, records every result as a heartbeat, and alerts you the moment one stops answering. It is the MIT-licensed open-source alternative to Pingdom, UptimeRobot and StatusPage — the same monitors, response-time charts, incident alerts and public status pages, with no per-monitor pricing and nobody else holding your data.

Self-host Uptime Kuma on Railway with two services. `uptime-kuma` runs the official `louislam/uptime-kuma:2` image on port 3001 behind an HTTPS domain, with a volume at `/app/data` and a health check on `/dashboard`. A managed **MySQL** service sits beside it on the private network with no public port, holding every monitor, heartbeat, notification rule and status page on its own volume.

![Uptime Kuma Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786896533/0440df1f-d761-4da8-b4d0-278b31d164ad.png)

Uptime Kuma answers one question continuously — *is it up?* — for far more than web pages. Teams self-host it because a hosted service only sees what is publicly exposed, bills per monitor, and has outages of its own. Running it yourself makes private endpoints reachable, monitor count free, and check history yours.

- **30+ monitor types** — HTTP(s) with keyword and JSON-query matching, TCP port, Ping, DNS, Docker containers, gRPC, MQTT, Kafka, SNMP, NTP, database probes, game servers, and push monitors a cron job calls when it finishes.
- **90+ notification providers** — Telegram, Discord, Slack, SMTP email, webhooks, PagerDuty, Gotify and more, per monitor or as a default.
- **Status pages** — as many as you like, each with a custom domain, custom CSS, grouped monitors and an incident banner.
- **Certificate and domain expiry alerts**, maintenance windows, 2FA, API keys, a key-protected Prometheus `/metrics` endpoint, monitor groups and tags, and check intervals down to 20 seconds.

`uptime-kuma` is the Node.js application: dashboard, scheduler, notification dispatcher and status-page renderer. **MySQL** holds the state — monitors, heartbeat history, notification config, status pages, users and API keys — so a database backup is a complete backup. `/app/data` holds icon uploads, real-browser screenshots and Docker TLS certificates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| uptime-kuma | `louislam/uptime-kuma:2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Private hostname, never publicly exposed |
| `MYSQLPORT` | MySQL | 3306 | MySQL port on the private network |
| `MYSQLUSER` | MySQL | umami | Superuser; give the app a scoped user instead |
| `MYSQL_URL` | MySQL | - | Private-network connection string |
| `MYSQL_USER` | MySQL | (secret) | Scoped, non-root application account |
| `MYSQLDATABASE` | MySQL | - | Alias consumers reference as ${{MySQL.MYSQLDATABASE}} |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias of the root password |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first init |
| `MYSQL_PASSWORD` | MySQL | (secret) | Password for the application account |
| `MYSQL_PUBLIC_URL` | MySQL | - | External connection string; empty host/port until a TCP proxy exists |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, generated once at init — read only when the data dir is created |
| `PORT` | uptime-kuma | 3001 | HTTP server listening port |
| `NODE_OPTIONS` | uptime-kuma | --max-old-space-size=4096 | Node heap ceiling for container |
| `UPTIME_KUMA_DB_NAME` | uptime-kuma | - | Database name |
| `UPTIME_KUMA_DB_PORT` | uptime-kuma | - | Database port |
| `UPTIME_KUMA_DB_TYPE` | uptime-kuma | mariadb | Use MySQL/MariaDB instead of SQLite |
| `UPTIME_KUMA_DB_HOSTNAME` | uptime-kuma | - | Private database hostname |
| `UPTIME_KUMA_DB_PASSWORD` | uptime-kuma | (secret) | Application database password |
| `UPTIME_KUMA_DB_USERNAME` | uptime-kuma | (secret) | Scoped application database user |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'setcap -r /usr/bin/ping 2>/dev/null || { mkdir -p /usr/local/bin && cp /usr/bin/ping /usr/local/bin/ping; }; echo "boot: ping=$(command -v ping) caps=[$(getcap /usr/bin/ping 2>/dev/null)]"; exec /usr/bin/dumb-init -- node server/server.js'`
- **Healthcheck:** `/dashboard`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptime-kuma-monito-1)
