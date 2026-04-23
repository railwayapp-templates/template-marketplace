# Deploy Mautic Marketing Automation | Open Source HubSpot Alternative on Railway

Self-host Mautic. Automation with email campaigns, segments, lead scoring

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mautic-marketing-automation)

## About

Deploy Mautic on Railway to get a fully self-hosted marketing automation platform with email campaigns, contact segmentation, lead scoring, and multi-channel workflows — all under your control. Self-host Mautic with one click and start automating your marketing in minutes.

This Railway template pre-configures three services: the Mautic web application (Apache), a dedicated cron worker for scheduled campaign processing, and a MySQL database for persistent storage. Everything is wired together with Railway's service references — no manual hostname or credential copy-pasting.

![Mautic Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776868725/b009ad30-3592-4b3c-ba1b-e86643fe667e.png)

Mautic is the world's largest open-source marketing automation platform, built with Symfony/PHP. It provides enterprise-grade marketing tools without vendor lock-in or per-contact pricing.

- **Email marketing** with drag-and-drop builder, A/B testing, and scheduled sends
- **Contact management** with custom fields, segments, and lead scoring
- **Campaign builder** with visual workflow automation and multi-channel triggers
- **Landing pages and forms** with built-in analytics and conversion tracking
- **Multi-channel** support — email, SMS, web notifications, social media
- **50+ plugins** including Salesforce, Mailgun, reCAPTCHA, and WordPress integrations

The template runs three services: the web application handles UI and API requests, the cron service executes scheduled tasks (segment rebuilds, campaign triggers, email sends), and MySQL stores all contact and campaign data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mautic | `mautic/mautic:latest` | Web service |
| Mautic Cron | `mautic/mautic:latest` | Worker |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mautic | 80 | Apache listening port |
| `MAUTIC_URL` | Mautic | - | Public URL with HTTPS |
| `LOCAL_PHP_B64` | Mautic | PD9waHAKJHBhcmFtZXRlcnMgPSBhcnJheSgKICAgICdkYl9kcml2ZXInID0+ICdwZG9fbXlzcWwnLAogICAgJ2RiX2hvc3QnID0+IGdldGVudignTUFVVElDX0RCX0hPU1QnKSwKICAgICdkYl9wb3J0JyA9PiBnZXRlbnYoJ01BVVRJQ19EQl9QT1JUJyksCiAgICAnZGJfbmFtZScgPT4gZ2V0ZW52KCdNQVVUSUNfREJfREFUQUJBU0UnKSwKICAgICdkYl91c2VyJyA9PiBnZXRlbnYoJ01BVVRJQ19EQl9VU0VSJyksCiAgICAnZGJfcGFzc3dvcmQnID0+IGdldGVudignTUFVVElDX0RCX1BBU1NXT1JEJyksCiAgICAnaW5zdGFsbGVkJyA9PiB0cnVlLAogICAgJ3NpdGVfdXJsJyA9PiAnaHR0cHM6Ly8nIC4gZ2V0ZW52KCdSQUlMV0FZX1BVQkxJQ19ET01BSU4nKSwKICAgICdzZWNyZXRfa2V5JyA9PiBnZXRlbnYoJ01BVVRJQ19TRUNSRVRfS0VZJyksCiAgICAndHJ1c3RlZF9wcm94aWVzJyA9PiBhcnJheSgnMC4wLjAuMC8wJyksCiAgICAncmVtZW1iZXJtZV9rZXknID0+IGdldGVudignTUFVVElDX1NFQ1JFVF9LRVknKSwKICAgICdtYWlsZXJfZHNuJyA9PiAnc210cDovL2xvY2FsaG9zdDoyNScsCik7Cg== | Pre-built config with installed=true |
| `MAUTIC_DB_HOST` | Mautic | - | MySQL internal hostname |
| `MAUTIC_DB_PORT` | Mautic | - | MySQL port |
| `MAUTIC_DB_USER` | Mautic | (secret) | Database user |
| `MAUTIC_SITE_URL` | Mautic | - | Canonical site URL |
| `TRUSTED_PROXIES` | Mautic | 0.0.0.0/0 | Symfony trusted proxy config |
| `MAUTIC_SECRET_KEY` | Mautic | (secret) | Encryption and session key |
| `DOCKER_MAUTIC_ROLE` | Mautic | mautic_web | Container role: web server |
| `MAUTIC_ADMIN_EMAIL` | Mautic | - | Create Initial admin email |
| `MAUTIC_DB_DATABASE` | Mautic | - | Database name |
| `MAUTIC_DB_PASSWORD` | Mautic | (secret) | Database password |
| `MAUTIC_ADMIN_PASSWORD` | Mautic | (secret) | Create Initial admin password |
| `MAUTIC_TRUSTED_PROXIES` | Mautic | ["0.0.0.0/0"] | Trust Railway proxy headers |
| `PHP_INI_VALUE_MEMORY_LIMIT` | Mautic | 512M | PHP memory limit |
| `DOCKER_MAUTIC_LOAD_TEST_DATA` | Mautic | false | Load test data (first deploy only) |
| `DOCKER_MAUTIC_RUN_MIGRATIONS` | Mautic | true | Run DB migrations on startup |
| `LOCAL_PHP_B64` | Mautic Cron | - | Pre-built config with installed=true |
| `MAUTIC_DB_HOST` | Mautic Cron | - | MySQL internal hostname |
| `MAUTIC_DB_PORT` | Mautic Cron | - | MySQL port |
| `MAUTIC_DB_USER` | Mautic Cron | (secret) | Database user |
| `MAUTIC_SITE_URL` | Mautic Cron | - | Canonical site URL |
| `TRUSTED_PROXIES` | Mautic Cron | 0.0.0.0/0 | Symfony trusted proxy config |
| `MAUTIC_SECRET_KEY` | Mautic Cron | (secret) | Shared encryption key |
| `DOCKER_MAUTIC_ROLE` | Mautic Cron | mautic_cron | Container role: cron worker |
| `MAUTIC_DB_DATABASE` | Mautic Cron | - | Database name |
| `MAUTIC_DB_PASSWORD` | Mautic Cron | (secret) | Database password |
| `PHP_INI_VALUE_MEMORY_LIMIT` | Mautic Cron | 512M | PHP memory limit |
| `DOCKER_MAUTIC_LOAD_TEST_DATA` | Mautic Cron | false | No test data on cron |
| `DOCKER_MAUTIC_RUN_MIGRATIONS` | Mautic Cron | false | Web service handles migrations |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /var/www/html/var/logs /var/www/html/docroot/media/files /var/www/html/docroot/media/images /var/www/html/config && echo "$LOCAL_PHP_B64" | base64 -d > /var/www/html/config/local.php && a2dismod mpm_event mpm_worker 2>/dev/null; rm -f /etc/apache2/mods-enabled/mpm_event.* /etc/apache2/mods-enabled/mpm_worker.* 2>/dev/null; a2enmod mpm_prefork 2>/dev/null; exec /entrypoint.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/docroot/media`
- **Start command:** `/bin/sh -c 'mkdir -p /var/www/html/var/logs /var/www/html/docroot/media/files /var/www/html/docroot/media/images /var/www/html/config && echo "$LOCAL_PHP_B64" | base64 -d > /var/www/html/config/local.php && exec /entrypoint.sh'`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/mautic-marketing-automation)
