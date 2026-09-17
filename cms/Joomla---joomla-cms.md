# Deploy Joomla on Railway

Open-source CMS for websites, portals and intranets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/joomla-cms)

## About

Joomla is an open-source content management system that has run production websites since 2005, and it is still the CMS people reach for when a site needs more structure than a blog engine: fine-grained access levels, multilingual content and a real extension framework are in core rather than bolted on. Editors get a WYSIWYG interface, developers get a documented MVC framework and a CLI, and the GPL licence has no seat counts. Self-host Joomla to keep your content, database and domain, without a SaaS bill.

Deploy Joomla on Railway and the stack comes up configured: the `joomla` service runs Apache with PHP 8.4 and serves both the site and the administrator on one public domain, `MySQL` holds content, users and configuration, and `Redis` holds PHP sessions and the cache. The site's files — `configuration.php`, uploaded media, installed extensions, cache and logs — live on a persistent volume at `/var/www/html` and survive every redeploy. Joomla installs itself on the first boot from the values you supply, creates the administrator, deletes its own installer, and starts a scheduler worker that runs due tasks on an interval rather than waiting for a visitor.

![Joomla with MySQL and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789500900/joomla-architecture.webp)

Hosting Joomla well is mostly about what surrounds the PHP: a file tree that persists, a database it owns, somewhere fast for sessions, and a trigger for scheduled work.

- **Content:** articles, categories, tags, custom fields, workflows, versioning
- **Access control:** user groups, view levels, per-component permissions in core
- **Multilingual:** language associations and per-language menus, no paid extension
- **Extensible:** components, modules, plugins and templates from a ZIP or URL
- **Scheduled tasks:** log rotation, session purging, update checks, HTTP requests

The `joomla` service is the only public one. It reaches `MySQL` over the private network as a role with privileges on its own database only, not the superuser, and `Redis` on two databases — sessions in one, cache in the other — so clearing the cache signs nobody out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| joomla | [gridalpha/joomla-railway](https://github.com/gridalpha/joomla-railway) | Web service |
| MySQL | `mysql:9.4` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | joomla | 8080 | Apache listening port |
| `REDIS_URL` | joomla | - | Sessions on db 0, cache on db 1 |
| `JOOMLA_DB_HOST` | joomla | - | Optional external database as host:port |
| `JOOMLA_DB_NAME` | joomla | joomla | Database created at boot |
| `JOOMLA_DB_USER` | joomla | (secret) | Database-scoped role Joomla runs as |
| `MYSQL_ADMIN_URL` | joomla | - | Admin connection, boot-time role setup only |
| `JOOMLA_FORCE_SSL` | joomla | 1 | 1 administrator only, 2 whole site |
| `JOOMLA_SITE_NAME` | joomla | My Joomla Site | Site name shown in titles |
| `JOOMLA_SMTP_HOST` | joomla | - | Optional SMTP relay as host:port |
| `JOOMLA_ADMIN_USER` | joomla | (secret) | Administrator display name |
| `JOOMLA_ADMIN_EMAIL` | joomla | admin@example.com | Administrator email address |
| `JOOMLA_DB_PASSWORD` | joomla | (secret) | Password for that scoped role |
| `JOOMLA_ADMIN_PASSWORD` | joomla | (secret) | Administrator password, over 12 chars |
| `JOOMLA_ADMIN_USERNAME` | joomla | (secret) | Administrator login, letters only |
| `JOOMLA_EXTENSIONS_URLS` | joomla | - | Optional extension URLs, semicolon-separated |
| `JOOMLA_SCHEDULER_INTERVAL` | joomla | 300 | Seconds between scheduled task runs |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the server |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/joomla-cms)
