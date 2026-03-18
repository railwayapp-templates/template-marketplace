# Deploy BookStack on Railway

Deploy BookStack on Railway. Alternative to Notion/Confluence. One click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bookstack-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/JfN_TH?referralCode=9uHSFr&utm_medium=integration&utm_source=template&utm_campaign=generic)

BookStack is an open-source documentation platform designed for organizing and storing information in a structured and user-friendly way. It works like a modern knowledge base or internal wiki, allowing teams to create books, chapters, and pages to document processes, systems, and knowledge.

With BookStack you can quickly build internal documentation, technical guides, knowledge bases, and collaborative documentation portals.

Hosting BookStack requires a MySQL or MariaDB database for storing application data such as users, pages, permissions, and revisions. The application stores uploaded images and attachments on local persistent storage.

The container runs an Nginx web server and PHP application internally. Railway handles networking, TLS certificates, and service orchestration.

BookStack listens on **port 80 inside the container**, which must be exposed to Railway via the `PORT` environment variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| BookStack | `linuxserver/bookstack` | Web service |
| MySQL | `mysql:9.6` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_KEY` | BookStack | - | Laravel application secret key used for encryption, sessions, and security |
| `APP_URL` | BookStack | - | Public URL of the BookStack application used to generate correct links |
| `DB_HOST` | BookStack | - | MySQL/MariaDB server host used for the connection |
| `DB_PORT` | BookStack | - | MySQL/MariaDB server port used for the connection |
| `DB_DATABASE` | BookStack | - | Name of the database where BookStack stores its data |
| `DB_PASSWORD` | BookStack | (secret) | Password for the MySQL/MariaDB database used by BookStack |
| `DB_USERNAME` | BookStack | (secret) | Database user that BookStack will use to connect to MySQL/MariaDB |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | bookstack | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Blogs

[View on Railway →](https://railway.com/template/bookstack-1)
