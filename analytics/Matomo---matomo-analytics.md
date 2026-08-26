# Deploy Matomo on Railway

Web analytics platform for tracking visitors to your websites

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/matomo-analytics)

## About

Matomo is the open-source web analytics platform that keeps visitor data on infrastructure you control. Developed since 2007, it is the closest feature-for-feature replacement for Google Analytics: page and event tracking, visitor profiles, acquisition channels, goals and funnels, e-commerce reporting, a tag manager, heatmaps and session recordings. Teams choose it when analytics data cannot leave their jurisdiction, when they want reports that are never sampled, or because they would rather own the raw logs.

Self-host Matomo on Railway and the application server, its MySQL database and its report archiver are wired together on the first deploy. The web service runs Matomo on Apache with PHP 8.4 and keeps `/var/www/html` on a persistent volume, so the config file, installed plugins and the geolocation database survive redeploys. MySQL runs as a managed Railway database on its own volume. Report archiving — the scheduled job a production Matomo needs so dashboards are not computed inside a page load — runs beside the web server and refreshes reports hourly.

![Diagram of the Matomo and MySQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787661901/matomo-architecture.png)

Matomo answers a question analytics SaaS cannot: where does the data live, and who else can read it. Every pageview, event and visitor profile is written to your own MySQL database, so you can query it directly, keep it as long as you like, delete it on request, and satisfy rules about where personal data is stored. Reports come from the whole log, never a sample.

- Visitor profiles and a full visits log showing each person's path through the site
- Acquisition reporting across search engines, keywords, social networks and campaigns
- Goals, funnels and e-commerce tracking with revenue attribution
- Heatmaps, session recordings, A/B tests and form analytics via the marketplace
- A tag manager, a REST reporting API and an access-log importer
- Privacy controls: IP anonymisation, opt-out, cookie-less tracking, retention limits

The Railway architecture is two services. **Matomo** serves the UI and the tracking endpoint and holds mutable state — `config/config.ini.php`, marketplace plugins, the geolocation database — on its volume. **MySQL** stores every visit, action and pre-computed report. Inside the Matomo container a loop runs `console core:archive`, the job Matomo's docs ask you to add to cron: it turns raw log rows into the aggregated reports dashboards read, so opening a report never triggers a long computation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| matomo | [gridalpha/matomo-railway](https://github.com/gridalpha/matomo-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the server |
| `PORT` | matomo | 80 | Apache listening port |
| `PHP_MEMORY_LIMIT` | matomo | 512M | PHP memory ceiling |
| `MATOMO_DATABASE_HOST` | matomo | - | Private MySQL hostname |
| `MATOMO_DATABASE_DBNAME` | matomo | matomo | Database created at boot |
| `MATOMO_DATABASE_PASSWORD` | matomo | (secret) | Password for that account |
| `MATOMO_DATABASE_USERNAME` | matomo | (secret) | Least-privilege account created at boot |
| `MATOMO_DATABASE_ADMIN_URL` | matomo | - | Provisions database and user at boot |
| `MATOMO_DATABASE_TABLES_PREFIX` | matomo | matomo_ | Prefix for Matomo's tables |
| `MATOMO_ARCHIVE_INTERVAL_SECONDS` | matomo | 3600 | How often reports are re-archived |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Analytics · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/matomo-analytics)
