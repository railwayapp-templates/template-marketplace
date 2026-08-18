# Deploy Mautic on Railway

Open source email marketing, lead scoring and campaign automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mautic-automation)

## About

Mautic is the largest open source marketing automation platform. It stores contacts, groups them into segments, tracks what they do on your site, and runs campaigns that send email, score leads and hand qualified people to sales — the self-hosted answer to HubSpot and Mailchimp.

Deploy Mautic on Railway and the production topology comes up wired together: the web app, a queue worker, a cron service, managed MySQL and Mailpit as the mail hub. The web app queues email and tracking hits into MySQL, the worker consumes them, cron refreshes segments and drives campaigns, and mail leaves through Mailpit — point it at your own SMTP provider when ready. The first admin is created on first boot from two variables you fill in at deploy time.

![Mautic Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786975779/481c8c00-6d16-4887-94af-5243c4b58438.png)

Marketing automation holds your most sensitive first-party data. Self-hosting Mautic keeps that database yours, removes per-contact pricing, and lets you send through a provider you already pay for.

Key features:

- Contacts with custom fields, companies, tags, stages and scoring
- Segments from behavioural and field filters, rebuilt on a schedule
- Drag-and-drop campaign builder with decisions, actions and waits
- Email builder with A/B testing, dynamic content and click tracking
- Landing pages, forms, site tracking and per-contact timelines
- REST API, webhooks and a plugin marketplace

Mautic ships as three roles sharing one codebase and database. **Web** serves the UI, API and tracking endpoints. **Worker** consumes the `email` and `hit` queues, so sending never blocks a web request. **Cron** runs the segment rebuilds and campaign triggers. Splitting them is upstream's recommendation and lets you scale sending independently of browsing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mautic-cron | [gridalpha/mautic-railway](https://github.com/gridalpha/mautic-railway) | Worker |
| MySQL | `mysql:9.4` | Database |
| mautic-worker | [gridalpha/mautic-railway](https://github.com/gridalpha/mautic-railway) | Worker |
| mautic-web | [gridalpha/mautic-railway](https://github.com/gridalpha/mautic-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MAUTIC_DB_HOST` | mautic-cron | - | MySQL private hostname |
| `MAUTIC_DB_PORT` | mautic-cron | - | MySQL port |
| `MAUTIC_DB_USER` | mautic-cron | (secret) | MySQL user |
| `MAUTIC_SITE_URL` | mautic-cron | - | Same public URL as the web role |
| `MAUTIC_MAILER_DSN` | mautic-cron | smtp://mailpit.railway.internal:1025 | Outbound mail transport |
| `MAUTIC_SECRET_KEY` | mautic-cron | (secret) | Must match the web role |
| `DOCKER_MAUTIC_ROLE` | mautic-cron | mautic_cron | Container role: scheduled jobs |
| `MAUTIC_DB_DATABASE` | mautic-cron | - | Database holding Mautic tables |
| `MAUTIC_DB_PASSWORD` | mautic-cron | (secret) | MySQL password |
| `MAUTIC_MAILER_FROM_NAME` | mautic-cron | Mautic | Default From name |
| `MAUTIC_MAILER_FROM_EMAIL` | mautic-cron | - | Same From address |
| `MAUTIC_MESSENGER_DSN_HIT` | mautic-cron | doctrine://default | Tracking-hit queue transport |
| `MAUTIC_MESSENGER_DSN_EMAIL` | mautic-cron | doctrine://default | Email queue transport |
| `MAUTIC_MESSENGER_DSN_FAILED` | mautic-cron | doctrine://default?queue_name=failed | Failed-message queue |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |
| `MAUTIC_DB_HOST` | mautic-worker | - | MySQL private hostname |
| `MAUTIC_DB_PORT` | mautic-worker | - | MySQL port |
| `MAUTIC_DB_USER` | mautic-worker | (secret) | MySQL user |
| `MAUTIC_SITE_URL` | mautic-worker | - | Same public URL as the web role |
| `MAUTIC_MAILER_DSN` | mautic-worker | smtp://mailpit.railway.internal:1025 | Outbound mail transport |
| `MAUTIC_SECRET_KEY` | mautic-worker | (secret) | Must match the web role |
| `DOCKER_MAUTIC_ROLE` | mautic-worker | mautic_worker | Container role: queue consumer |
| `MAUTIC_DB_DATABASE` | mautic-worker | - | Database holding Mautic tables |
| `MAUTIC_DB_PASSWORD` | mautic-worker | (secret) | MySQL password |
| `MAUTIC_MAILER_FROM_NAME` | mautic-worker | Mautic | Default From name |
| `MAUTIC_MAILER_FROM_EMAIL` | mautic-worker | - | Same From address |
| `MAUTIC_MESSENGER_DSN_HIT` | mautic-worker | doctrine://default | Tracking-hit queue transport |
| `MAUTIC_MESSENGER_DSN_EMAIL` | mautic-worker | doctrine://default | Email queue transport |
| `MAUTIC_MESSENGER_DSN_FAILED` | mautic-worker | doctrine://default?queue_name=failed | Failed-message queue |
| `DOCKER_MAUTIC_WORKERS_CONSUME_HIT` | mautic-worker | 2 | Concurrent tracking-hit consumers |
| `DOCKER_MAUTIC_WORKERS_CONSUME_EMAIL` | mautic-worker | 2 | Concurrent email consumers |
| `DOCKER_MAUTIC_WORKERS_CONSUME_FAILED` | mautic-worker | 1 | Concurrent failed-message consumers |
| `PORT` | mautic-web | 80 | Apache listening port |
| `MAUTIC_DB_HOST` | mautic-web | - | MySQL private hostname |
| `MAUTIC_DB_PORT` | mautic-web | - | MySQL port |
| `MAUTIC_DB_USER` | mautic-web | (secret) | MySQL user |
| `MAUTIC_SITE_URL` | mautic-web | - | Public URL in links and tracking |
| `MAUTIC_MAILER_DSN` | mautic-web | smtp://mailpit.railway.internal:1025 | Outbound mail transport |
| `MAUTIC_SECRET_KEY` | mautic-web | (secret) | Encrypts stored integration credentials |
| `DOCKER_MAUTIC_ROLE` | mautic-web | mautic_web | Container role: web application |
| `MAUTIC_ADMIN_EMAIL` | mautic-web | admin@example.dev | First administrator email address |
| `MAUTIC_DB_DATABASE` | mautic-web | - | Database holding Mautic tables |
| `MAUTIC_DB_PASSWORD` | mautic-web | (secret) | MySQL password |
| `MAUTIC_ADMIN_PASSWORD` | mautic-web | (secret) | First admin password, change after login |
| `MAUTIC_ADMIN_USERNAME` | mautic-web | (secret) | First administrator username |
| `MAUTIC_MAILER_FROM_NAME` | mautic-web | Mautic | Default From name |
| `MAUTIC_MAILER_FROM_EMAIL` | mautic-web | mautic@example.dev | Default From address |
| `MAUTIC_MESSENGER_DSN_HIT` | mautic-web | doctrine://default | Tracking-hit queue transport |
| `MAUTIC_MESSENGER_DSN_EMAIL` | mautic-web | doctrine://default | Email queue transport |
| `MAUTIC_MESSENGER_DSN_FAILED` | mautic-web | doctrine://default?queue_name=failed | Failed-message queue |
| `PORT` | mailpit | 8025 | Inbox web UI port |
| `MP_UI_AUTH` | mailpit | - | Basic auth protecting the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_SMTP_AUTH_ACCEPT_ANY` | mailpit | true | Accept any SMTP credentials privately |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow plain SMTP on the private network |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/s/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/livez`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mautic-automation)
