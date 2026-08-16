# Deploy FreeScout on Railway

Zendesk alternative. Shared inbox and ticketing for customer support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/freescout-railway)

## About

FreeScout is a free, open source help desk and shared mailbox that turns a support address such as `support@yourcompany.com` into a proper team inbox. Every customer email becomes a conversation with a status, an assignee and a full history, so two people never answer the same message twice. Written in PHP on the Laravel framework and licensed AGPL-3.0, it places no limit on agents, mailboxes or tickets — the thing that makes hosted help desks expensive as a team grows. Support teams, agencies and SaaS companies self-host FreeScout to keep customer conversations on infrastructure they control.

Deploy FreeScout on Railway and this template wires up the two services it needs: a **FreeScout** application service running nginx, PHP-FPM, a queue worker and a per-minute scheduler in one container, and a managed **MySQL** database holding conversations, customers, users and settings. A persistent volume at `/data` stores configuration, attachments, modules, sessions and cache, so nothing is lost when the container restarts. The application gets the public HTTPS domain; MySQL stays on Railway's private network. The scheduler is what makes this a help desk rather than a web form — it polls your mailboxes over IMAP, dispatches replies and sends digests, once a minute.

![FreeScout Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786824269/37c87cec-2bbc-4476-b609-7b712d0ed734.png)

A plain shared mailbox works until the team outgrows it: two agents reply to the same customer, someone forgets to follow up, and nobody can answer "how long are we taking to respond?"

Core features include:

- **Shared mailboxes** with unlimited agents, mailboxes and conversations
- **Collision detection**, showing when a colleague is replying
- **Saved replies**, notes, tags and custom folders for repetitive workflows
- **Assignment and statuses** (active, pending, closed, spam) with per-user queues
- **Full-text search** and customer profiles gathering past conversations
- **A REST API, webhooks and a large module ecosystem** — knowledge base, live chat, satisfaction ratings, time tracking, Slack and CRM add-ons

The architecture is deliberately small: one container serving the interface and running two background processes, one managed database, and one volume holding what must survive a redeploy — attachments and the encryption key in the configuration file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| freescout | `nfrastack/freescout` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Private hostname, never publicly exposed |
| `MYSQLPORT` | MySQL | 3306 | MySQL port on the private network |
| `MYSQLUSER` | MySQL | root | Superuser; give the app a scoped user instead |
| `MYSQL_URL` | MySQL | - | Private-network connection string |
| `MYSQLDATABASE` | MySQL | - | Alias consumers reference as ${{MySQL.MYSQLDATABASE}} |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias of the root password |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first init |
| `MYSQL_PUBLIC_URL` | MySQL | - | External connection string; empty host/port until a TCP proxy exists |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, generated once at init — read only when the data dir is created |
| `PORT` | freescout | 80 | HTTP port nginx listens on |
| `DB_SSL` | freescout | FALSE | Private network, no TLS needed |
| `APP_URL` | freescout | - | Public URL of the instance |
| `DB_HOST` | freescout | - | Private database hostname |
| `DB_NAME` | freescout | - | Application database name |
| `DB_PASS` | freescout | - | Scoped application database password |
| `DB_PORT` | freescout | - | Database port |
| `DB_TYPE` | freescout | mysql | Database driver |
| `DB_USER` | freescout | (secret) | Scoped application database user |
| `TIMEZONE` | freescout | UTC | Container timezone |
| `ADMIN_PASS` | freescout | - | First administrator password, change after login |
| `SETUP_TYPE` | freescout | AUTO | Migrate and bootstrap admin on empty DB |
| `ADMIN_EMAIL` | freescout | admin@example.com | First administrator login email |
| `SCHEDULER_TYPE` | freescout | service | Run queue worker and scheduler as services |
| `ADMIN_LAST_NAME` | freescout | Admin | First administrator last name |
| `ADMIN_FIRST_NAME` | freescout | FreeScout | First administrator first name |
| `FREESCOUT_APP_LOCALE` | freescout | en | Interface language |
| `FREESCOUT_APP_TIMEZONE` | freescout | UTC | Application timezone |
| `FREESCOUT_APP_TRUSTED_PROXIES` | freescout | ** | Trust full proxy chain for client IP and HTTPS |
| `FREESCOUT_SESSION_SECURE_COOKIE` | freescout | true | Mark session cookie as secure |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/freescout-railway)
