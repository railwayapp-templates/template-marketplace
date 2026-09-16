# Deploy HumHub on Railway

Social network and intranet with spaces, streams and modules

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/humhub)

## About

HumHub is an open-source social network and intranet platform. It gives a company, an association or a community the familiar shape of a social app — a dashboard stream, topic-based Spaces, posts, comments, mentions, notifications and file sharing — on infrastructure you own, under an AGPL licence, with a marketplace of modules adding a wiki, calendar, tasks and single sign-on. Teams self-host HumHub when member data cannot sit in someone else's tenant, or when they want a members' area that behaves like a social network, not a forum.

This template runs the official HumHub container with everything wired up. The `humhub` service is the web tier, cron scheduler and two queue workers in one container, as the project packages it for production. `MySQL` holds every row — content, users, the job queue, the lock table. `mailpit` is a private SMTP server capturing the invitations, password resets and digests HumHub sends, so email works from the first minute and can point at a real relay later. Uploads, assets and modules live on a persistent volume.

![Diagram of the HumHub, MySQL and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789289636/humhub-architecture.webp)

HumHub is a PHP application on the Yii 2 framework, maintained by HumHub GmbH & Co. KG in Germany. The Community Edition is complete software rather than a trial — AGPL-3.0-or-later, with the paid Professional Edition adding commercially licensed modules instead of unlocking the core. Self-hosting is the point for most adopters: GDPR-sensitive member data, or content that should not be one acquisition away from disappearing.

- **Spaces** — areas with their own stream, members, permissions and modules
- **Dashboard stream** — one feed of everything a user follows, with @mentions
- **Notifications** — in-app, real-time over server-sent events, plus digests
- **Files and search** — per-Space file areas and full-text search
- **Marketplace modules** — wiki, calendar, tasks, polls, LDAP and OAuth
- **Administration** — member vetting, groups, permissions and themes

`humhub` serves HTTP through FrankenPHP and, in the same container, runs the cron scheduler and two queue workers handling notifications, search indexing and scheduled publishing. `MySQL` is Railway's managed database, so backups and the Data panel come with it. `mailpit` accepts SMTP on the private network and keeps the messages for you to read.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| MySQL | `mysql:9.4` | Database |
| humhub | [gridalpha/humhub-railway](https://github.com/gridalpha/humhub-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | mailpit | UTC | Timestamp timezone |
| `PORT` | mailpit | 8025 | Web inbox port Railway probes |
| `MP_UI_AUTH` | mailpit | - | Basic auth on the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 2000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack listener for the inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack SMTP listener for peers |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |
| `PORT` | humhub | 8080 | Port FrankenPHP binds and Railway probes |
| `HUMHUB_SITE_NAME` | humhub | HumHub | Network name in header and mail |
| `HUMHUB_SMTP_HOST` | humhub | - | SMTP server hostname |
| `HUMHUB_SMTP_PORT` | humhub | 1025 | SMTP server port |
| `HUMHUB_ADMIN_EMAIL` | humhub | admin@example.com | First administrator email address |
| `HUMHUB_SYSTEM_EMAIL` | humhub | - | From address on system mail |
| `HUMHUB_ADMIN_PASSWORD` | humhub | (secret) | First administrator password |
| `HUMHUB_ADMIN_USERNAME` | humhub | (secret) | First administrator login |
| `HUMHUB_PHP_MEMORY_LIMIT` | humhub | 512M | PHP memory limit |
| `HUMHUB_ENABLE_REGISTRATION` | humhub | false | Open anonymous sign-up |
| `HUMHUB_DOCKER__NUMPROCS_WORKER` | humhub | 2 | Background queue worker processes |
| `HUMHUB_CONFIG__COMPONENTS__DB__DSN` | humhub | - | PDO connection string |
| `HUMHUB_CONFIG__COMPONENTS__DB__PASSWORD` | humhub | (secret) | Database password |
| `HUMHUB_CONFIG__COMPONENTS__DB__USERNAME` | humhub | (secret) | Database user |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/user/auth/login`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/humhub)
