# Deploy UVdesk on Railway

Open-source helpdesk with a ticket queue, support portal and knowledgebase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uvdesk-helpdesk)

## About

UVdesk is an open-source helpdesk built by Webkul on Symfony and PHP. It gives a support team a shared ticket queue, a customer-facing support centre with a knowledgebase, agent roles and groups, saved replies, and automation rules that route or escalate tickets on their own. Teams reach for it when they want Zendesk-shaped support software without per-agent pricing, with the ticket history on their own infrastructure.

Self-host UVdesk on Railway and the stack arrives wired together. The template deploys three services: `uvdesk`, the Apache and PHP application serving the agent panel and the public support centre; `MySQL`, the managed database holding every ticket, thread, customer and setting; and `mailpit`, a capture-and-relay mail service so notifications work as soon as the deploy finishes. Browsers reach `uvdesk` over its public domain, the app talks to MySQL privately, and mail leaves through Mailpit's SMTP listener on 1025.

![Diagram of the UVdesk, MySQL and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788798584/uvdesk-architecture.png)

UVdesk turns scattered support requests into one queue a team can work. A customer writes in through the web form, the support centre, or an email address you connect, and UVdesk opens a ticket with a threaded conversation, a priority, a type and a status. Agents reply, leave internal notes, hand tickets between groups and teams, and publish articles so common questions answer themselves. Self-hosting matters because those threads hold customer addresses and order numbers for years.

Key features:

- Threaded conversations with replies, forwards and private notes
- Public support centre with a searchable knowledgebase
- Email-to-ticket over IMAP, outbound replies through your own SMTP
- Agent roles, privileges, groups and teams for routing work
- Workflow automation and prepared responses for repeat requests
- A REST API and an extension framework

The architecture is deliberately small. `uvdesk` runs Apache with mod_php on one origin, `MySQL` is the single source of truth, and `mailpit` catches outbound mail so you can see what the helpdesk sends before pointing it at a real relay. A volume on `uvdesk` keeps attachments, uploads, sessions and the two config files the admin panel rewrites at runtime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| uvdesk | [gridalpha/uvdesk-railway](https://github.com/gridalpha/uvdesk-railway) | Web service |
| MySQL | `mysql:9.4` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | uvdesk | 8080 | Apache listening port |
| `APP_SECRET` | uvdesk | (secret) | Symfony signing key, must stay stable |
| `MAILER_DSN` | uvdesk | - | Symfony mailer transport |
| `MAILER_URL` | uvdesk | - | Swiftmailer transport |
| `UVDESK_REF` | uvdesk | v1.1.8 | Upstream release the image builds |
| `DATABASE_URL` | uvdesk | - | MySQL connection string |
| `TRUSTED_PROXIES` | uvdesk | 0.0.0.0/0,::/0 | Trust Railway's edge for client IP and scheme |
| `UVDESK_SITE_URL` | uvdesk | - | Host used for links in outgoing mail |
| `UVDESK_ADMIN_NAME` | uvdesk | Helpdesk Owner | Display name of that account |
| `UVDESK_ADMIN_EMAIL` | uvdesk | admin@example.com | First super admin, change this |
| `UVDESK_ADMIN_PASSWORD` | uvdesk | (secret) | First super admin password |
| `UVDESK_DB_SERVER_VERSION` | uvdesk | 5.7 | Doctrine platform selector |
| `UV_SESSION_COOKIE_LIFETIME` | uvdesk | 86400 | Session lifetime in seconds |
| `UVDESK_MAILBOX_POLL_SECONDS` | uvdesk | 300 | Email-to-ticket poll interval, 0 disables |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |
| `TZ` | mailpit | UTC | Timestamp timezone |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth on the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Ring buffer size |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/livez`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/uvdesk-helpdesk)
