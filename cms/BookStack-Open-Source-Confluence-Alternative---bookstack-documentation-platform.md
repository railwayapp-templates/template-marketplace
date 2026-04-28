# Deploy BookStack | Open Source Confluence Alternative on Railway

Self-host BookStack: Structured wiki with LDAP, SAML, API & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bookstack-documentation-platform)

## About

Deploy BookStack on Railway to get a fully self-hosted wiki and documentation platform running in minutes. BookStack organizes knowledge into a clear Books, Chapters, and Pages hierarchy — ideal for engineering teams, IT operations, and compliance-driven organizations that need data sovereignty over their documentation.

This Railway template pre-configures BookStack with a MySQL database for persistent storage, automatic database migrations on startup, HTTPS via Railway's TLS-terminating proxy, and secure session management. Self-host BookStack on Railway without managing servers, SSL certificates, or database backups.

BookStack is a free, open-source (MIT License) documentation platform built on PHP and Laravel. Created by Dan Brown in 2015, it provides structured knowledge management through an intuitive book metaphor that maps naturally to how teams organize information.

- **Books &gt; Chapters &gt; Pages** hierarchy for structured documentation
- **WYSIWYG and Markdown editors** with real-time preview and inline image uploads
- **Full-text search** across all content with advanced filtering
- **Role-based access control** with granular permissions per shelf, book, chapter, or page
- **Built-in draw.io/diagrams.net** integration for architecture diagrams and flowcharts
- **Full REST API** with token-based authentication for CI/CD-driven documentation
- **Audit logging** with IP tracking for compliance requirements
- **Multi-language support** with 40+ translations
- **MFA/2FA enforcement** per role via TOTP (Google Authenticator, etc.)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| BookStack | `andreidrang/bookstack-railway:26.03.1` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | BookStack | 80 | Container listening port |
| `APP_ENV` | BookStack | production | Laravel environment |
| `APP_KEY` | BookStack | - | Laravel encryption key |
| `APP_URL` | BookStack | - | Public-facing app URL |
| `DB_HOST` | BookStack | - | MySQL hostname |
| `DB_PORT` | BookStack | - | MySQL port |
| `APP_DEBUG` | BookStack | false | Disable debug mode |
| `APP_PROXIES` | BookStack | * | Trust Railway reverse proxy |
| `DB_DATABASE` | BookStack | - | Database name |
| `DB_PASSWORD` | BookStack | (secret) | Database password |
| `DB_USERNAME` | BookStack | (secret) | Database user |
| `ALLOW_ROBOTS` | BookStack | false | Block search engines |
| `CACHE_DRIVER` | BookStack | database | Cache backend |
| `SESSION_DRIVER` | BookStack | database | Session backend |
| `QUEUE_CONNECTION` | BookStack | database | Queue backend |
| `SESSION_SECURE_COOKIE` | BookStack | true | HTTPS-only cookies |
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

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/bookstack-documentation-platform)
