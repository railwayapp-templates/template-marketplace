# Deploy CMS Wordpress Powered by SOPAN on Railway

WordPress siap pakai dengan database MySQL terhubung otomatis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cms-wordpress-powered-by-sopan)

## About

sopan-wordpress adalah template WordPress siap pakai yang sudah terhubung dengan database MySQL secara otomatis. Cocok untuk membuat blog, company profile, portofolio, atau toko online berbasis WooCommerce tanpa perlu konfigurasi server, database, atau koneksi manual antar service.

Hosting sopan-wordpress di Railway berarti menjalankan dua service sekaligus: WordPress sebagai aplikasi utama dan MySQL sebagai database-nya. Railway otomatis membuat koneksi antar keduanya lewat environment variable, jadi kamu tidak perlu setting host, port, atau kredensial database secara manual. Setelah deploy, WordPress langsung bisa diakses lewat domain yang di-generate Railway, dan kamu tinggal login ke `/wp-admin` untuk mulai mengelola konten.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| wordpress-tkGV | `ghcr.io/daniakash/wordpress-bitnami:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Internal hostname used to connect to this database from other services in the same project (private network). |
| `MYSQLPORT` | MySQL | - | Port used for MySQL connections, default 3306. |
| `MYSQLUSER` | MySQL | - | Username for authenticating with the MySQL database. |
| `MYSQL_URL` | MySQL | - | Full connection string to the database, used over Railway's private network between services. |
| `MYSQLDATABASE` | MySQL | - | Name of the database used by the application. |
| `MYSQLPASSWORD` | MySQL | (secret) | Password for authenticating the MySQL user. |
| `MYSQL_DATABASE` | MySQL | - | Name of the database automatically created on deploy. |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public connection string for accessing the database from outside Railway's network (e.g. local tools). |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL, used for authentication and advanced database administration. |
| `WORDPRESS_EMAIL` | wordpress-tkGV | - | Email address for the WordPress admin account. |
| `WORDPRESS_PASSWORD` | wordpress-tkGV | (secret) | Password for the WordPress admin account. |
| `WORDPRESS_USERNAME` | wordpress-tkGV | (secret) | Username used to log in to the WordPress admin dashboard (/wp-admin). |
| `WORDPRESS_BLOG_NAME` | wordpress-tkGV | - | Site name displayed as the website title. |
| `WORDPRESS_LAST_NAME` | wordpress-tkGV | - | Last name of the admin account owner. |
| `WORDPRESS_FIRST_NAME` | wordpress-tkGV | - | First name of the admin account owner. |
| `WORDPRESS_DATABASE_HOST` | wordpress-tkGV | - | Hostname of the MySQL database, connected over Railway's private network to the MySQL service. |
| `WORDPRESS_DATABASE_NAME` | wordpress-tkGV | - | Name of the MySQL database used by WordPress. |
| `WORDPRESS_DATABASE_USER` | wordpress-tkGV | (secret) | Username used by WordPress to connect to the MySQL database. |
| `WORDPRESS_DATABASE_PASSWORD` | wordpress-tkGV | (secret) | Password used by WordPress to connect to the MySQL database. |
| `WORDPRESS_DATABASE_PORT_NUMBER` | wordpress-tkGV | - | Port used to connect to the MySQL database, default 3306. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami/wordpress`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/cms-wordpress-powered-by-sopan)
