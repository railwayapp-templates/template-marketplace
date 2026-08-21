# Deploy PhpMyAdmin on Railway

Web interface for managing MySQL and MariaDB databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/phpmyadmin-mysql)

## About

phpMyAdmin is the web interface most of the world uses to look inside a MySQL or MariaDB server. It has been the default database console on shared hosting for two decades and still beats a terminal for what people actually need: browsing rows, fixing a bad value, reading a query result as a table, importing a dump someone emailed you, granting exact privileges to a user. Deploy phpMyAdmin when you want that console for your own database rather than paying per seat for a desktop client or opening a database port.

Self-host phpMyAdmin on Railway and this template gives you two services: the web app on a public HTTPS URL, and a MySQL 9.4 database reachable only over Railway's private network. The browser talks to phpMyAdmin, phpMyAdmin talks to MySQL over `mysql.railway.internal`, and every request is authenticated with a real MySQL username and password. The template also creates phpMyAdmin's configuration storage on first boot — the piece most self-hosted installs skip, and the reason bookmarks, query history, the designer and two-factor authentication already work when you arrive.

![Diagram of the phpMyAdmin and MySQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787209714/phpmyadmin-architecture.png)

phpMyAdmin is a PHP application that speaks to MySQL and MariaDB over the normal client protocol and renders results as a web UI. It holds no data of its own, so it is cheap to run and easy to repoint elsewhere. Teams self-host it when a managed console is missing, too limited or priced per seat, or when they would rather not hand a third party a database credential.

Key features:

- Browse, edit, insert and delete rows without writing SQL
- SQL editor with highlighting, bookmarks and query history
- Visual Designer that reads and writes foreign keys
- Import and export in SQL, CSV, JSON, XML, YAML and PDF
- Privilege management with per-database grants
- Change tracking, two-factor authentication, 70+ languages

The template runs two services. **phpmyadmin** is the web app, built from a public source repository on the official `phpmyadmin:apache` image, with a volume for PHP sessions and the server-side import and export directories. **MySQL** is the database it manages, on its own volume, private by default. The app provisions the configuration storage — a `phpmyadmin` database and a least-privilege `pma` control user — at startup, and keeps its session-signing secret stable so redeploys do not sign anyone out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| phpmyadmin | [gridalpha/phpmyadmin-railway](https://github.com/gridalpha/phpmyadmin-railway) | Web service |

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
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |
| `PORT` | phpmyadmin | 8080 | Apache listening port |
| `PMA_HOST` | phpmyadmin | - | Database server to administer |
| `PMA_PORT` | phpmyadmin | - | Database server port |
| `PMA_CONTROLPASS` | phpmyadmin | - | Password for the pma control user |
| `PMA_ABSOLUTE_URI` | phpmyadmin | - | Public base URL |
| `PMA_BOOTSTRAP_USER` | phpmyadmin | (secret) | Account that creates configuration storage |
| `PMA_BLOWFISH_SECRET` | phpmyadmin | (secret) | Cookie encryption key, must stay stable |
| `PMA_BOOTSTRAP_PASSWORD` | phpmyadmin | (secret) | Password for that account |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pma`

**Category:** Storage · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/phpmyadmin-mysql)
