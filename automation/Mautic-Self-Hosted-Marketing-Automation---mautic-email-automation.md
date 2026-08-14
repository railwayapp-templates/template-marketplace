# Deploy Mautic — Self-Hosted Marketing Automation on Railway

Self-host Mautic — email campaigns, segments & lead scoring, free

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mautic-email-automation)

## About

Mautic is the leading open-source marketing automation platform — a self-hosted alternative to HubSpot, Mailchimp, and ActiveCampaign for email campaigns, contact segmentation, lead scoring, landing pages, and visual automation workflows. Own your marketing data and run unlimited campaigns without per-contact or per-seat fees. This template deploys Mautic as three pre-wired services — the web app, a dedicated cron worker, and MySQL — so campaigns actually fire on schedule and emails send automatically, the piece most Mautic deploys get wrong.

---

Mautic is powerful, and one architectural detail decides whether your automation actually works — this template handles it.

**The cron worker is the make-or-break piece.** Mautic's campaigns, scheduled emails, segment updates, and background tasks only run if a cron process fires them on a schedule. Without it, you can build campaigns in the UI but they silently never send — the single most common failure in self-hosted Mautic. This template ships a dedicated cron service (the same image running Mautic's CLI role instead of Apache), so your automation fires reliably from the first deploy. This is the difference between a marketing platform that works and one that looks fine but sends nothing.

**Three services, wired automatically.** The web app, cron worker, and MySQL are connected through Railway's service references, so database hostnames and credentials are injected rather than copied by hand. Mautic's architecture separates web serving from background processing, so each can scale independently.

**Your data and configuration persist.** Contacts, campaigns, and segments live in MySQL, while Mautic's config, uploaded media, and logs persist on volumes — all surviving redeploys. MySQL is the component to back up, since it holds your entire contact database and campaign history.

**Configure SMTP to actually send.** Mautic builds and schedules emails, but sending requires an email provider: after deploy, go to Settings > Email Settings and configure your SMTP host (or a service like Amazon SES, SendGrid, or Postmark). For real volume, a dedicated sending service protects deliverability far better than a generic SMTP relay.

**Log in with your admin credentials.** The administrator account is created from the environment variables on first boot — open your Mautic URL, sign in, and start by importing contacts and building an email in the drag-and-drop editor.

**Scale each part independently.** For large contact databases (100K+), raise the PHP memory limit via `PHP_INI_VALUE_MEMORY_LIMIT`, scale the cron service for more throughput, and ensure MySQL has adequate storage — the web and worker tiers scale separately.

Typical cost: **~$10–15/month** on Railway for the three services. Mautic is GPL-licensed and free — unlimited contacts and campaigns, versus HubSpot's tiered pricing and Mailchimp's per-subscriber fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mautic | `mautic/mautic:latest` | Web service |
| Mautic Cron | `mautic/mautic:latest` | Worker |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mautic | 80 | - |
| `LOCAL_PHP_B64` | Mautic | PD9waHAKJHBhcmFtZXRlcnMgPSBhcnJheSgKICAgICdkYl9kcml2ZXInID0+ICdwZG9fbXlzcWwnLAogICAgJ2RiX2hvc3QnID0+IGdldGVudignTUFVVElDX0RCX0hPU1QnKSwKICAgICdkYl9wb3J0JyA9PiBnZXRlbnYoJ01BVVRJQ19EQl9QT1JUJyksCiAgICAnZGJfbmFtZScgPT4gZ2V0ZW52KCdNQVVUSUNfREJfREFUQUJBU0UnKSwKICAgICdkYl91c2VyJyA9PiBnZXRlbnYoJ01BVVRJQ19EQl9VU0VSJyksCiAgICAnZGJfcGFzc3dvcmQnID0+IGdldGVudignTUFVVElDX0RCX1BBU1NXT1JEJyksCiAgICAnaW5zdGFsbGVkJyA9PiB0cnVlLAogICAgJ3NpdGVfdXJsJyA9PiAnaHR0cHM6Ly8nIC4gZ2V0ZW52KCdSQUlMV0FZX1BVQkxJQ19ET01BSU4nKSwKICAgICdzZWNyZXRfa2V5JyA9PiBnZXRlbnYoJ01BVVRJQ19TRUNSRVRfS0VZJyksCiAgICAndHJ1c3RlZF9wcm94aWVzJyA9PiBhcnJheSgnMC4wLjAuMC8wJyksCiAgICAncmVtZW1iZXJtZV9rZXknID0+IGdldGVudignTUFVVElDX1NFQ1JFVF9LRVknKSwKICAgICdtYWlsZXJfZHNuJyA9PiAnc210cDovL2xvY2FsaG9zdDoyNScsCik7Cg== | - |
| `MAUTIC_DB_USER` | Mautic | (secret) | - |
| `TRUSTED_PROXIES` | Mautic | 0.0.0.0/0 | - |
| `MAUTIC_SECRET_KEY` | Mautic | (secret) | - |
| `DOCKER_MAUTIC_ROLE` | Mautic | mautic_web | - |
| `MAUTIC_ADMIN_EMAIL` | Mautic | - | Create Initial admin email |
| `MAUTIC_DB_PASSWORD` | Mautic | (secret) | - |
| `MAUTIC_ADMIN_PASSWORD` | Mautic | (secret) | Create Initial admin password |
| `MAUTIC_TRUSTED_PROXIES` | Mautic | ["0.0.0.0/0"] | - |
| `PHP_INI_VALUE_MEMORY_LIMIT` | Mautic | 512M | - |
| `DOCKER_MAUTIC_LOAD_TEST_DATA` | Mautic | false | - |
| `DOCKER_MAUTIC_RUN_MIGRATIONS` | Mautic | true | - |
| `MAUTIC_DB_USER` | Mautic Cron | (secret) | - |
| `TRUSTED_PROXIES` | Mautic Cron | 0.0.0.0/0 | - |
| `MAUTIC_SECRET_KEY` | Mautic Cron | (secret) | - |
| `DOCKER_MAUTIC_ROLE` | Mautic Cron | mautic_cron | - |
| `MAUTIC_DB_PASSWORD` | Mautic Cron | (secret) | - |
| `PHP_INI_VALUE_MEMORY_LIMIT` | Mautic Cron | 512M | - |
| `DOCKER_MAUTIC_LOAD_TEST_DATA` | Mautic Cron | false | - |
| `DOCKER_MAUTIC_RUN_MIGRATIONS` | Mautic Cron | false | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/docroot/media`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/mautic-email-automation)
