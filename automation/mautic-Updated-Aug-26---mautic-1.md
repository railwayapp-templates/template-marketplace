# Deploy mautic [Updated Aug '26] on Railway

Mautic [Aug '26] (Marketing Automation Platform) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mautic-1)

## About

Mautic is the open-source marketing automation platform that replaces HubSpot and Mailchimp for email campaigns, lead scoring, and multi-channel automation. Build visual campaigns, score leads by behavior, and send personalized emails at scale, all on infrastructure you control instead of a per-contact metered SaaS.

HubSpot's Marketing Hub Professional plan runs $800-890/month for 3 seats and 2,000 marketing contacts, plus a mandatory one-time $3,000 onboarding fee. Growing past 2,000 contacts adds hundreds more per month, and the bill keeps climbing as your list grows, exactly when your marketing is working. Self-hosted Mautic on Railway costs a flat infrastructure fee regardless of contact count or campaign volume.

The bigger reason to self-host marketing automation specifically isn't only the pricing curve. Your contact list, campaign logic, and email history are some of the most valuable data a growing business has, and every major marketing platform's business model depends on making that data hard to fully export or move. Self-hosting Mautic means that data lives on infrastructure you actually control from day one.

It's worth being direct about something most simplified Mautic templates get wrong: they run a single web container and call it done. Mautic's real architecture needs a dedicated worker to process queued email and campaign jobs, and a dedicated cron process to run scheduled tasks like segment updates and campaign triggers, without either, campaigns look fully configured in the dashboard but silently never actually execute. This template runs the real three-service architecture Mautic itself recommends.

This isn't a small or unproven project either. Mautic has real production adoption, with an active plugin ecosystem and a genuine open-source community behind it, not a solo maintainer project. That matters for infrastructure this central to how a business talks to its customers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mautic-railway | [shruti060701/mautic-railway](https://github.com/shruti060701/mautic-railway) | Web service |
| harmonious-light | [shruti060701/mautic-railway](https://github.com/shruti060701/mautic-railway) | Worker |
| MySQL | `mysql:9.4` | Database |
| focused-encouragement | [shruti060701/mautic-railway](https://github.com/shruti060701/mautic-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mautic-railway | 80 | Set explicitly during testing; did not actually resolve the 502/targetPort issue on its own, the real fix was the dashboard target-port field (see section 1). Keep this set regardless since it's a reasonable Railway convention, but don't rely on it alone. |
| `MAUTIC_URL` | mautic-railway | - | Confirmed live as `https://mautic-railway-production.up.railway.app` on all three. An earlier draft of this checklist wrongly showed `https://${{mautic-railway.RAILWAY_PUBLIC_DOMAIN}}` on all three rows, including web referencing itself, caught directly by Shruti comparing the dashboard's real value against this file. |
| `MAUTIC_DB_HOST` | mautic-railway | - | MySQL private hostname. Confirmed real variable name live. |
| `MAUTIC_DB_PORT` | mautic-railway | - | MySQL port. Confirmed real variable name live. |
| `MAUTIC_DB_USER` | mautic-railway | (secret) | MySQL username. Confirmed real variable name live. |
| `MAUTIC_SECRET_KEY` | mautic-railway | (secret) | Must be byte-identical across all three, confirmed live via SHA-256 hash comparison without printing the value. |
| `DOCKER_MAUTIC_ROLE` | mautic-railway | mautic_web |  Which Mautic process this service runs. |
| `MAUTIC_ADMIN_EMAIL` | mautic-railway | - | Admin account email created on first install. |
| `MAUTIC_DB_DATABASE` | mautic-railway | - | Database name. The real image expects `MAUTIC_DB_DATABASE`, not `MAUTIC_DB_NAME` (confirmed directly in Mautic's own `docker-mautic` source), the reference Railway template uses the wrong variable name here. Confirmed real MySQL plugin variable name live. |
| `MAUTIC_DB_PASSWORD` | mautic-railway | (secret) | MySQL password. Confirmed real variable name live. |
| `MAUTIC_ADMIN_PASSWORD` | mautic-railway | (secret) | Admin account password created on first install. |
| `MAUTIC_URL` | harmonious-light | - | Confirmed live as `https://mautic-railway-production.up.railway.app` on all three. An earlier draft of this checklist wrongly showed `https://${{mautic-railway.RAILWAY_PUBLIC_DOMAIN}}` on all three rows, including web referencing itself, caught directly by Shruti comparing the dashboard's real value against this file. |
| `MAUTIC_DB_HOST` | harmonious-light | - | MySQL private hostname. Confirmed real variable name live. |
| `MAUTIC_DB_PORT` | harmonious-light | - | MySQL port. Confirmed real variable name live. |
| `MAUTIC_DB_USER` | harmonious-light | (secret) | MySQL username. Confirmed real variable name live. |
| `MAUTIC_SECRET_KEY` | harmonious-light | (secret) | Must be byte-identical across all three, confirmed live via SHA-256 hash comparison without printing the value. |
| `DOCKER_MAUTIC_ROLE` | harmonious-light | mautic_worker | Which Mautic process this service runs. |
| `MAUTIC_DB_DATABASE` | harmonious-light | - | Database name. The real image expects `MAUTIC_DB_DATABASE`, not `MAUTIC_DB_NAME` (confirmed directly in Mautic's own `docker-mautic` source), the reference Railway template uses the wrong variable name here. Confirmed real MySQL plugin variable name live. |
| `MAUTIC_DB_PASSWORD` | harmonious-light | (secret) | MySQL password. Confirmed real variable name live. |
| `MYSQLHOST` | MySQL | - | Private-network hostname for this service. Confirmed live as `mysql.railway.internal`. |
| `MYSQLPORT` | MySQL | 3306 | Port MySQL listens on. |
| `MYSQLUSER` | MySQL | root | Superuser username. |
| `MYSQL_URL` | MySQL | - | Full private-network connection string. Confirmed live, matches the real resolved shape (`mysql://root:[password]@mysql.railway.internal:3306/railway`). Not directly referenced by the app services, they build their own connection from the individual `MYSQL*` variables instead, but document it since the composer will show it. |
| `MYSQLDATABASE` | MySQL | - | Alias referencing `MYSQL_DATABASE`. Already prefilled by Railway, don't overwrite with a literal. |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias referencing `MYSQL_ROOT_PASSWORD`. Already prefilled by Railway, don't overwrite with a literal. |
| `MYSQL_DATABASE` | MySQL | railway | Default database name, the real literal value. This is what `MAUTIC_DB_DATABASE` on the app services ultimately resolves to via `MYSQLDATABASE`. |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public connection string. Only resolves to a real host/port once a TCP Proxy is enabled under this service's Settings → Networking, confirmed live it's an empty/unusable host:port until then. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, auto-generated per deploy, the real literal value. |
| `MAUTIC_URL` | focused-encouragement | - | Confirmed live as `https://mautic-railway-production.up.railway.app` on all three. An earlier draft of this checklist wrongly showed `https://${{mautic-railway.RAILWAY_PUBLIC_DOMAIN}}` on all three rows, including web referencing itself, caught directly by Shruti comparing the dashboard's real value against this file. |
| `MAUTIC_DB_HOST` | focused-encouragement | - | MySQL private hostname. Confirmed real variable name live. |
| `MAUTIC_DB_PORT` | focused-encouragement | - | MySQL port. Confirmed real variable name live. |
| `MAUTIC_DB_USER` | focused-encouragement | (secret) | MySQL username. Confirmed real variable name live. |
| `MAUTIC_SECRET_KEY` | focused-encouragement | (secret) | Must be byte-identical across all three, confirmed live via SHA-256 hash comparison without printing the value. |
| `DOCKER_MAUTIC_ROLE` | focused-encouragement | mautic_cron | Which Mautic process this service runs. |
| `MAUTIC_DB_DATABASE` | focused-encouragement | - | Database name. The real image expects `MAUTIC_DB_DATABASE`, not `MAUTIC_DB_NAME` (confirmed directly in Mautic's own `docker-mautic` source), the reference Railway template uses the wrong variable name here. Confirmed real MySQL plugin variable name live. |
| `MAUTIC_DB_PASSWORD` | focused-encouragement | (secret) | MySQL password. Confirmed real variable name live. |

## Configuration

- **Healthcheck:** `/s/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/mautic-persist`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Automation · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/mautic-1)
