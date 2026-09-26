# Deploy WordPress (MariaDB, WP-CLI) on Railway

WordPress 7 on MariaDB: 128 MB uploads, HTTPS behind the proxy, WP-CLI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-mariadb-wp-cli)

## About

This template runs the official WordPress 7.1 image on PHP 8.4 with MariaDB 11.8 LTS. Uploads go up to 128 MB, WordPress knows it's served over HTTPS behind Railway's proxy, and WP-CLI is installed. The site files and the database each live on a volume.

The official WordPress image doesn't start on Railway as is. Apache stops with "More than one MPM loaded". I traced it: the image turns off one Apache module by deleting its link in a later layer, and on Railway that link is back at runtime. The popular WordPress templates here work around it with a long start command that also patches `php.ini` on every boot, and they run unpinned `latest` images. This one fixes it inside the image and pins the versions.

When the deploy finishes, open `WORDPRESS_URL` from the Variables tab of the WordPress service. You land on the WordPress installer: pick a site title and an admin login, and you're done.

Before publishing I ran the whole thing end to end. The installer finished, and the home page had 30 links on https and none on http. I created an application password, which WordPress only allows over HTTPS, and used it to upload an 8 MB file through the REST API in 1.1 seconds. Then I restarted WordPress and MariaDB at the same time. The site was back 51 seconds later, still installed, and the file downloaded fine.

At idle WordPress used 246 MB of RAM and MariaDB 163 MB, about $4 a month together.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:11.8` | Database |
| WordPress | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /wordpress) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | MariaDB | (secret) | Database user for WordPress |
| `MARIADB_DATABASE` | MariaDB | wordpress | Database for WordPress |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Database password (generated) |
| `MARIADB_AUTO_UPGRADE` | MariaDB | 1 | Upgrade the data files automatically after a MariaDB version change |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Root password (generated) |
| `PORT` | WordPress | 80 | Apache port |
| `WORDPRESS_URL` | WordPress | - | Open this to run the WordPress installer |
| `WORDPRESS_DB_HOST` | WordPress | - | MariaDB over the private network |
| `WORDPRESS_DB_NAME` | WordPress | - | Database name |
| `WORDPRESS_DB_USER` | WordPress | (secret) | Database user |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) | Database password |
| `WORDPRESS_CONFIG_EXTRA` | WordPress | if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') { $_SERVER['HTTPS'] = 'on'; }
define('FS_METHOD', 'direct'); | Extra wp-config.php code: trust Railway's HTTPS header, write files directly |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/wp-admin/install.php`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** CMS · **Tags:** wordpress, cms, blog, mariadb, php · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/wordpress-mariadb-wp-cli)
