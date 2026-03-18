# Deploy wordpress-bitnami on Railway

Deploy and host wordpress on Railway using the Bitnami Wordpress Image

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wordpress-bitnami-1)

## About

WordPress is the world's most popular content management system, powering over 40% of all websites. This Bitnami-packaged WordPress template provides a production-ready, pre-configured installation with Apache, PHP, and all necessary dependencies bundled together for seamless deployment on Railway.

Hosting WordPress traditionally requires configuring web servers, PHP environments, database connections, and file permissions—a process that can take hours and introduce security vulnerabilities if done incorrectly. The Bitnami WordPress image simplifies this by packaging everything into a single, optimized container. This Railway template takes it further by solving the common permission issues that occur when Bitnami's non-root container meets Railway's volume mounting system. With a minimal Dockerfile override, your WordPress instance gets persistent storage that survives redeployments while maintaining security best practices.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| wordpress | `ghcr.io/daniakash/wordpress-bitnami:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | railway | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `WORDPRESS_EMAIL` | wordpress | - | Email address for the admin account. Used for password resets, admin notifications (comments, updates, security alerts), and as the default site admin contact. |
| `WORDPRESS_PASSWORD` | wordpress | (secret) | Login password for the admin account. If not set, Bitnami generates a random one (check container logs). |
| `WORDPRESS_USERNAME` | wordpress | (secret) | Login username for the admin account. This is what you type in the "Username" field on the login page. |
| `WORDPRESS_BLOG_NAME` | wordpress | - | The site title. Appears in the browser tab, header (depending on theme), SEO titles, and admin dashboard. This is what you'd set in Settings → General → Site Title. |
| `WORDPRESS_LAST_NAME` | wordpress | - | Last name on the admin user's profile. Combined with first name for the full display name shown on posts and in the admin UI. |
| `WORDPRESS_FIRST_NAME` | wordpress | - | First name on the admin user's profile. Appears in the display name, post author bylines, and the "Howdy, [name]" greeting in the dashboard. |
| `WORDPRESS_DATABASE_USER` | wordpress | (secret) | - |
| `WORDPRESS_DATABASE_PASSWORD` | wordpress | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Volume:** `/bitnami/wordpress`

**Category:** Blogs

[View on Railway →](https://railway.com/template/wordpress-bitnami-1)
