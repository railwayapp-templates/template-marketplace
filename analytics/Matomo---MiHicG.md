# Deploy Matomo on Railway

Powerful web analytics platform that gives you 100% data ownership

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/MiHicG)

## About

## Google Analytics alternative that protects your data and your customers' privacy

**Take back control with Matomo – a powerful web analytics platform that gives you 100% data ownership.**

**Things of Note:**

- Communication to MariaDB is done exclusively over the private network and the database is not exposed externally in any way by default, if you want to enable access from outside of the private network you can go to the databases settings to enable TCP proxying and enter the internal port (3306) the TCP proxy can be again removed at any point to close off external access.

### Don’t damage your reputation with Google Analytics

Don’t damage your reputation with Google Analytics
You could lose your customers’ trust and risk damaging your reputation if people learn their data is used for Google’s “own purposes”.

By choosing the ethical alternative, Matomo, you won’t make privacy sacrifices or compromise your site. You can even use Matomo without needing to ask for consent. [Read more](https://matomo.org/google-owns-your-data/).

## Be in full control with data ownership and privacy protection

With 100% data ownership you get the power to protect your user’s privacy. You know where your data is stored and what’s happening to it, without external influence. We’re serious about privacy here at Matomo and keeping your business GDPR and CCPA compliant.

Matomo is a full-featured PHP MySQL software program that you download and install on your own webserver. At the end of the five-minute installation process, you will be given a JavaScript code. Simply copy and paste this tag on websites you wish to track and access your analytics reports in real-time.

Matomo aims to be a Free software alternative to Google Analytics and is already used on more than 1,400,000 websites. Privacy is built-in!

What makes Matomo unique from the competition:

- You own your web analytics data: since Matomo is installed on your server, the data is stored in your own database and you can get all the statistics using the powerful Matomo Analytics API.

- Matomo is a Free Software which can easily be configured to respect your visitors' privacy.

- Modern, easy to use User Interface: you can fully customize your dashboard, drag and drop widgets and more.

- Matomo features are built inside plugins: you can add new features and remove the ones you don’t need. You can build your own web analytics plugins or hire a consultant to have your custom feature built-in Matomo.

- A vibrant international Open community of more than 200,000 active users (tracking even more websites!)

- Advanced Web Analytics capabilities such as E-commerce Tracking, Goal tracking, Campaign tracking, Custom Variables, Email Reports, Custom Segment Editor, Geo Location, Real-time visits and maps, and a lot more!

Documentation and more info on https://matomo.org.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Matomo | `matomo:latest` | Web service |
| MariaDB | `mariadb:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Matomo | 80 | Let Railway know that the app listens on port 80 |
| `MATOMO_DATABASE_HOST` | Matomo | - | Private host for MariaDB |
| `MATOMO_DATABASE_DBNAME` | Matomo | - | Database name for MariaDB |
| `MATOMO_DATABASE_ADAPTER` | Matomo | mysql | Use the mysql database adapter |
| `MATOMO_DATABASE_PASSWORD` | Matomo | (secret) | MariaDB password |
| `MATOMO_DATABASE_USERNAME` | Matomo | (secret) | MariaDB username |
| `MATOMO_DATABASE_TABLES_PREFIX` | Matomo | matomo_ | Table prefix |
| `MARIADB_HOST` | MariaDB | - | Public host for MariaDB, only available if public TCP proxying is enabled |
| `MARIADB_PORT` | MariaDB | - | Public port for MariaDB, only available if public TCP proxying is enabled |
| `MARIADB_USER` | MariaDB | (secret) | MariaDB username |
| `MARIADB_DATABASE` | MariaDB | matomo | MariaDB default database |
| `MARIADB_PASSWORD` | MariaDB | (secret) | MariaDB password |
| `MARIADB_PRIVATE_HOST` | MariaDB | - | MariaDB private host |
| `MARIADB_PRIVATE_PORT` | MariaDB | 3306 | Private port for MariaDB |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | MariaDB root password |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/mysql`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/MiHicG)
