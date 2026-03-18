# Deploy Roundcube E-Mail Client with MySQL DB on Railway

Roundcube with MySQL as Database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/VgpEjU)

## About

Deploy Roundcube with MySQL

Roundcube is a web-based IMAP email client. Roundcube's most prominent feature is the pervasive use of Ajax technology. Roundcube is free and open-source software subject to the terms of the GNU General Public License (GPL-3.0-or-later), with exceptions for skins and plugins

Using this template, you can easily deploy a Roundcube with MySQL on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Roundcube | `roundcube/roundcubemail` | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Roundcube | 80 | - |
| `ROUNDCUBEMAIL_DB_HOST` | Roundcube | - | Host (or Docker instance) name of the database service; defaults to mysql or postgres depending on linked containers. |
| `ROUNDCUBEMAIL_DB_NAME` | Roundcube | - | The database name for Roundcube to use; defaults to roundcubemail |
| `ROUNDCUBEMAIL_DB_TYPE` | Roundcube | mysql | - |
| `ROUNDCUBEMAIL_DB_USER` | Roundcube | (secret) | The database username for Roundcube; defaults to root on mysql |
| `ROUNDCUBEMAIL_SMTP_PORT` | Roundcube | - | SMTP port number; defaults to 587 |
| `ROUNDCUBEMAIL_DB_PASSWORD` | Roundcube | (secret) | The password for the database connection |
| `ROUNDCUBEMAIL_SMTP_SERVER` | Roundcube | - | Hostname of the SMTP server to connect to. For encrypted connections, prefix the host with tls:// (STARTTLS) or ssl:// (SSL/TLS). |
| `ROUNDCUBEMAIL_DEFAULT_HOST` | Roundcube | - | Hostname of the IMAP server to connect to. For encrypted connections, prefix the host with tls:// (STARTTLS) or ssl:// (SSL/TLS). |
| `ROUNDCUBEMAIL_DEFAULT_PORT` | Roundcube | - | IMAP port number; defaults to 143 |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/VgpEjU)
