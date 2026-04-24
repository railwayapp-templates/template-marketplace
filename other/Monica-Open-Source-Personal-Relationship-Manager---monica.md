# Deploy Monica | Open-Source Personal Relationship Manager on Railway

Self-host Monica to track contacts, birthdays, relationships & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/monica)

## About

Monica is an open-source personal relationship management (PRM) system that helps you organize and remember everything about your family, friends, and business relationships. Deploy Monica on Railway to self-host a private, ad-free platform for tracking conversations, birthdays, gift ideas, debts, and life events for every contact in your life.

This Railway template deploys Monica with a MySQL database for persistent storage and a volume for uploaded files. The pre-configured setup includes production-ready security settings, HTTPS support behind Railway's proxy, and automatic database migrations on startup.

Monica is a Personal Relationship Management (PRM) system — not a traditional business CRM. It focuses on the human side of relationships rather than sales pipelines and revenue tracking.

- **Contact profiles** with addresses, phone numbers, work history, food preferences, and custom fields
- **Conversation logging** for phone calls, activities, and meetings with timestamps
- **Birthday and reminder tracking** with automatic notifications
- **Debt and gift management** for tracking who owes what and gift ideas
- **Journal** for documenting daily thoughts and life events
- **Relationship mapping** to link family members, partners, and friend groups
- **API access** for building integrations and automations
- Built with Laravel (PHP) and Vue.js, backed by MySQL

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Monica | `monica:4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |
| `PORT` | Monica | 80 | HTTP listening port |
| `APP_ENV` | Monica | production | Application environment mode |
| `APP_KEY` | Monica | - | Laravel encryption key (base64 format) |
| `APP_URL` | Monica | - | Public-facing application URL |
| `DB_HOST` | Monica | - | MySQL internal hostname |
| `DB_PORT` | Monica | - | MySQL connection port |
| `APP_DEBUG` | Monica | false | Disable debug mode for production |
| `CACHE_STORE` | Monica | database | Cache backend driver |
| `DB_DATABASE` | Monica | - | MySQL database name |
| `DB_PASSWORD` | Monica | (secret) | MySQL connection password |
| `DB_USERNAME` | Monica | (secret) | MySQL connection username |
| `MAIL_MAILER` | Monica | log | Mail transport (change to smtp) |
| `DB_CONNECTION` | Monica | mysql | Database driver type |
| `SESSION_DRIVER` | Monica | database | Session storage driver |
| `TRUSTED_PROXIES` | Monica | * | Trust Railway TLS proxy |
| `QUEUE_CONNECTION` | Monica | sync | Queue processing mode |
| `APP_DISABLE_SIGNUP` | Monica | false | Allow user registration initially |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'a2dismod mpm_event 2>/dev/null; a2enmod mpm_prefork 2>/dev/null; apache2-foreground'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/monica)
