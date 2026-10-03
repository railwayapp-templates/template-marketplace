# Deploy Wordpress on Railway

Host WordPress [Oct'26]— MySQL, persistent media, HTTPS behind the proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-dedicated-hosting)

## About

WordPress is the CMS behind a large share of the web — a PHP application with the deepest plugin and theme ecosystem anywhere. This template runs it on dedicated infrastructure rather than a shared host: managed MySQL over private networking, a volume for media and plugins, and the proxy and cron configuration container deployments normally get wrong.

WordPress assumes a server it controls — writable filesystem, cron daemon, a web server terminating its own TLS. A container behind a proxy gives it none of those, and the failures look like WordPress bugs rather than configuration.

**TLS terminates at the edge, and WordPress does not know it.** Railway handles HTTPS and forwards plain HTTP to PHP. WordPress sees an insecure request, compares it to an `https://` site URL and redirects — the proxy forwards HTTP again, and you have an infinite loop. Turn on `FORCE_SSL_ADMIN` and it locks you out of `/wp-admin` specifically. The fix is reading `X-Forwarded-Proto` in `wp-config.php` before `wp-settings.php` loads.

**A volume at the web root cancels your pinned image.** Mount a volume over `/var/www/html` and it shadows the directory the image ships core in. From the second boot the pinned tag no longer decides your version — the copy on the volume does, and WordPress's auto-updates have been editing it. Mounting `wp-content` instead keeps core in the image where the tag means something, and media and plugins on the volume where they belong.

**WP-Cron fires on page loads, not on a schedule.** WordPress has no scheduler; it checks for due tasks when someone visits. On a quiet site, scheduled posts publish late, backups skip and plugin tasks stall. Set `DISABLE_WP_CRON=true` and drive `wp-cron.php` from a real scheduled job.

**One volume means one instance.** A Railway volume attaches to a single service, so `wp-content` cannot be shared across replicas. This scales vertically only — fine for most sites, and a hard ceiling worth knowing before you plan around traffic you do not have yet.

**Your site URL lives in the database, not your config.** `siteurl` and `home` are rows in `wp_options`. Change your domain without updating them and the site redirects to the old one from the first request, login page included. Set `WP_HOME` and `WP_SITEURL` as constants so the environment wins.

Typical cost: **~$15–25/month** for WordPress, MySQL and volumes at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. Be clear-eyed: shared hosting starts around $4/month and will be cheaper for a small blog. You are paying for isolated resources, a real database and infrastructure you control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb` | Database |
| wordpress | `wordpress` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_URL` | MariaDB | - | Database url - default: mariadb://${{MARIADB_USER}}:${{MARIADB_PASSWORD}}@${{MARIADB_HOST}}:${{MARIADB_PORT}}/${{MARIADB_DATABASE}} |
| `MARIADB_HOST` | MariaDB | - | Database host - default: ${{RAILWAY_TCP_PROXY_DOMAIN}} |
| `MARIADB_PORT` | MariaDB | - | Database port - default: ${{RAILWAY_TCP_PROXY_PORT}} |
| `MARIADB_USER` | MariaDB | (secret) | Database user - default: railway |
| `MARIADB_DATABASE` | MariaDB | railway | Database name - default: railway |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Database password - default: ${{secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!~*")}} |
| `MARIADB_PRIVATE_URL` | MariaDB | - | Database url (private) - default: mariadb://${{MARIADB_USER}}:${{MARIADB_PASSWORD}}@${{MARIADB_PRIVATE_HOST}}:${{MARIADB_PRIVATE_PORT}}/${{MARIADB_DATABASE}} |
| `MARIADB_PRIVATE_HOST` | MariaDB | - | Database host (private) - default: ${{RAILWAY_PRIVATE_DOMAIN}} |
| `MARIADB_PRIVATE_PORT` | MariaDB | 3306 | Database port (private) - default: 3306 |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Database root password - default: ${{secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!~*")}} |
| `PORT` | wordpress | 80 | The HTTP port the application runs on. (temporarily unchangeable) |
| `WORDPRESS_DB_HOST` | wordpress | - | Database host - default: ${{MariaDB.MARIADB_PRIVATE_HOST}}:${{MariaDB.MARIADB_PRIVATE_PORT}} |
| `WORDPRESS_DB_NAME` | wordpress | - | Database type - default: ${{MariaDB.MARIADB_DATABASE}} |
| `WORDPRESS_DB_USER` | wordpress | (secret) | Database user - default: ${{MariaDB.MARIADB_USER}} |
| `WORDPRESS_AUTH_KEY` | wordpress | (secret) | WordPress auth key - default: ${{secret(32)}} |
| `WORDPRESS_AUTH_SALT` | wordpress | - | WordPress auth salt - default: ${{secret(32)}} |
| `WORDPRESS_NONCE_KEY` | wordpress | - | WordPress nonce key - default: ${{secret(32)}} |
| `WORDPRESS_NONCE_SALT` | wordpress | - | WordPress nonce salt - default: ${{secret(32)}} |
| `WORDPRESS_DB_PASSWORD` | wordpress | (secret) | Database password - default: ${{MariaDB.MARIADB_PASSWORD}} |
| `WORDPRESS_CONFIG_EXTRA` | wordpress | - | Extra configurations - default: define('DOMAIN_CURRENT_SITE','${{RAILWAY_PUBLIC_DOMAIN}}');define('WP_HOME','https://${{RAILWAY_PUBLIC_DOMAIN}}');define('WP_SITEURL','https://${{RAILWAY_PUBLIC_DOMAIN}}'); |
| `WORDPRESS_LOGGED_IN_KEY` | wordpress | - | WordPress logged in key - default: ${{secret(32)}} |
| `WORDPRESS_LOGGED_IN_SALT` | wordpress | - | WordPress logged in salt - default: ${{secret(32)}} |
| `WORDPRESS_SECURE_AUTH_KEY` | wordpress | (secret) | WordPress secure auth key - default: ${{secret(32)}} |
| `WORDPRESS_SECURE_AUTH_SALT` | wordpress | - | WordPress secure auth salt - default: ${{secret(32)}} |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-dedicated-hosting)
