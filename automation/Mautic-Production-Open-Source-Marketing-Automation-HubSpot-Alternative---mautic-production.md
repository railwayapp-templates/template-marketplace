# Deploy Mautic Production | Open-Source Marketing Automation, HubSpot Alternative on Railway

Marketing automation with the cron and workers that make campaigns fire

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mautic-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/mautic-production?utm_medium=integration&utm_source=button&utm_campaign=mautic-production)

[Mautic](https://mautic.org/) is the open-source marketing automation platform: contacts and segments, newsletters and email campaigns, forms and landing pages, lead scoring, and multi-step campaigns triggered by what your contacts do. It is an alternative to HubSpot Marketing Hub, ActiveCampaign and Mailchimp, with no per-contact pricing. This template runs Mautic 7.2.1 together with the cron jobs and queue workers that make campaigns actually run.

The stack is two services: Mautic and MySQL.

- **Mautic** runs the web app, cron and the queue workers in one container. **Cron and the workers are what make Mautic do anything on its own.** Every 15 minutes segments rebuild, campaigns pick up new contacts and fire their due events, and scheduled segment emails go out. Background imports and exports also run on cron. The workers send the queued emails and record opens and page visits. The most-deployed Mautic templates on Railway run the web app only, so you can build a campaign there but it never fires. Upstream's Docker setup runs web, cron and worker as three containers that share config and media volumes. Railway volumes can't be shared between services, so here they run under one supervisor, which restarts any process that stops.
- **Settings survive redeploys.** Mautic keeps everything you save under Settings, including your email credentials, in `config/local.php`. That file also holds the secret key that encrypts integration credentials. Here it lives on the Mautic volume, along with your uploaded images and files. Without a volume, both are lost on every redeploy.
- **Sends without SMTP.** Railway blocks outbound SMTP below the Pro plan. The image adds the HTTPS API transports for Amazon SES, Brevo, Mailgun, Mailjet, Postmark, Resend and SendGrid, so Mautic sends on any plan.
- **Installed for you.** The admin account is created on the first boot from the email you enter at deploy time. There is no install wizard, so nobody else can claim a freshly deployed instance.
- **MySQL 8.4 LTS**, the database upstream's Docker setup uses. `performance_schema` is turned off, which roughly halves MySQL's idle memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mautic | [nomideusz/mautic-railway](https://github.com/nomideusz/mautic-railway) | Web service |
| MySQL | `mysql:8.4.11` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mautic | 80 | Port Apache listens on - leave as is |
| `MAUTIC_URL` | Mautic | - | Site URL written at install. For a custom domain later, change it under Settings > Configuration |
| `MAUTIC_DB_HOST` | Mautic | - | MySQL host on the private network |
| `MAUTIC_DB_PORT` | Mautic | 3306 | MySQL port |
| `MAUTIC_DB_USER` | Mautic | (secret) | MySQL user |
| `MAUTIC_ADMIN_EMAIL` | Mautic | - | Your email - the admin account is created with it on first boot |
| `MAUTIC_DB_DATABASE` | Mautic | - | MySQL database |
| `MAUTIC_DB_PASSWORD` | Mautic | (secret) | MySQL password |
| `MAUTIC_ADMIN_PASSWORD` | Mautic | (secret) | Admin password (username admin, or sign in with your email). Change it after first login |
| `MAUTIC_MESSENGER_DSN_HIT` | Mautic | doctrine://default | Page-hit and email-open queue, consumed by the worker in this container |
| `MAUTIC_MESSENGER_DSN_EMAIL` | Mautic | doctrine://default | Email queue, consumed by the worker in this container |
| `MYSQL_USER` | MySQL | (secret) | Database user |
| `MYSQL_DATABASE` | MySQL | mautic | Database name |
| `MYSQL_PASSWORD` | MySQL | (secret) | Auto-generated database password |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Auto-generated root password |

## Configuration

- **Healthcheck:** `/s/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --datadir=/var/lib/mysql/data --performance-schema=OFF`
- **Volume:** `/var/lib/mysql`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mautic-production)
