# Deploy WordPress on Railway

WordPress [Jul '26] (Self-Hosted Content Management System) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-3)

## About

WordPress is the open-source CMS that runs more than 40% of the web. Blogs, business sites, online stores, portfolios, whatever you're building, WordPress's plugin ecosystem and theme library cover it, and self-hosting means none of it comes with a managed platform's restrictions or per-site fees.

WP Engine's entry-level managed plan starts at $25-30/month for a single site capped at 25,000 monthly visits. Its Growth tier, for agencies running multiple client sites, runs $96-109/month for just 10 sites. WordPress self-hosted on Railway costs a flat infrastructure fee with no visit cap and no artificial site limit baked into the pricing, so the math gets better the more you actually use it, the opposite of most managed hosting tiers.

The bigger reason to self-host WordPress specifically isn't just the price, though. Managed hosts vet, block, or throttle certain plugins for performance and security reasons, sometimes ones you actually need. Self-hosting means you install anything from the official plugin repository or upload custom code without asking permission. For developers building custom themes or plugins, that's not a convenience, it's the whole point.

It's also worth being clear about what "self-hosted" actually buys you here versus WordPress.com specifically. WordPress.com's free and lower tiers restrict plugin installation entirely, some plans don't allow custom plugins at all. Self-hosting the open-source WordPress core, the same software WordPress.com itself runs, removes that restriction completely, you're running the real thing with none of the platform's guardrails.

This distinction trips people up constantly, so it's worth stating plainly: "WordPress" and "WordPress.com" are not the same thing. WordPress.org publishes the free, open-source software this template deploys. WordPress.com is a separate commercial hosting company that happens to run that same software, with its own pricing tiers and restrictions layered on top. Self-hosting means you get the software with none of the second company's business decisions attached to it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wordpress-railway | [shruti060701/wordpress-railway](https://github.com/shruti060701/wordpress-railway) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | wordpress-railway | 80 | ort Railway routes external traffic to. Must be an explicit Railway variable — Apache inside the official WordPress image always listens on port 80 internally and isn't configurable to read a dynamic port variable, so this project's usual "Dockerfile-only default isn't enough" lesson applies here for a different underlying reason than other templates (a hardcoded app port, not a missing one). |
| `WORDPRESS_DB_HOST` | wordpress-railway | - | Hostname for WordPress's MySQL database. |
| `WORDPRESS_DB_NAME` | wordpress-railway | - | Database name for WordPress's content. |
| `WORDPRESS_DB_PORT` | wordpress-railway | - | Port for WordPress's MySQL database. |
| `WORDPRESS_DB_USER` | wordpress-railway | (secret) | Username for WordPress's MySQL database. |
| `WORDPRESS_DB_PASSWORD` | wordpress-railway | (secret) | Password for WordPress's MySQL database. |
| `MYSQLHOST` | MySQL | - | Internal hostname — what `WORDPRESS_DB_HOST` actually connects through. |
| `MYSQLPORT` | MySQL | 3306 | Port MySQL listens on internally. **Verify this is actually filled in, not left as an empty "to be filled by the user" placeholder** — this exact composer glitch has recurred on this project's Umami and NocoDB templates for Postgres, verify it doesn't also happen for MySQL. |
| `MYSQLUSER` | MySQL | root | Database username. |
| `MYSQL_URL` | MySQL | - | Internal hostname — what `WORDPRESS_DB_HOST` actually connects through. |
| `MYSQLDATABASE` | MySQL | - | Default database name created on startup. |
| `MYSQLPASSWORD` | MySQL | (secret) | Password for connecting to MySQL, mirrors `MYSQL_ROOT_PASSWORD` below. |
| `MYSQL_DATABASE` | MySQL | - | Default database name, mirrors `MYSQL_DATABASE` below. |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public/external connection string for reaching this database from outside Railway's network. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Auto-generated root password for the MySQL server itself. |

## Configuration

- **Healthcheck:** `/wp-admin/install.php`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/wp-content`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/wordpress-3)
