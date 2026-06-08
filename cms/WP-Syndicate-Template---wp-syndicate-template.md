# Deploy WP Syndicate Template on Railway

WP Syndicate (WordPress(MPM Patched) + Redis)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wp-syndicate-template)

## About

Deploy and host this high-performance WordPress stack, complete with MariaDB and Redis caching, seamlessly on Railway.

This template provides a fully configured WordPress environment. It utilizes MariaDB as the primary relational database for robust data storage and Redis for object caching to ensure ultra-fast load times. All services are securely hosted and easily manageable on Railway's cloud infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:latest` | Database |
| WordPress-Syndicate | `wordpress:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_HOST` | MariaDB | localhost | Internal host for the MariaDB database connection |
| `MARIADB_PORT` | MariaDB | 3306 | Port for the database connection (default is 3306) |
| `MARIADB_USER` | MariaDB | (secret) | Database username |
| `MARIADB_DATABASE` | MariaDB | wordpress | Main database name |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Password to access the database |
| `MARIADB_PUBLIC_URL` | MariaDB | - | Public URL for external database connection |
| `MARIADB_PRIVATE_URL` | MariaDB | - | Private URL for internal network connection |
| `MARIADB_PUBLIC_HOST` | MariaDB | - | Public host for external database connection |
| `MARIADB_PUBLIC_PORT` | MariaDB | - | Public port for external database connection |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Root administrator password for the database |
| `PORT` | WordPress-Syndicate | 80 | Web server port for running WordPress (Set default to 80) |
| `WORDPRESS_DB_HOST` | WordPress-Syndicate | - | Database host address for WordPress |
| `WORDPRESS_DB_NAME` | WordPress-Syndicate | - | Database name for WordPress |
| `WORDPRESS_DB_USER` | WordPress-Syndicate | (secret) | Database username for WordPress |
| `WORDPRESS_AUTH_KEY` | WordPress-Syndicate | (secret) | Authentication unique key for security |
| `WORDPRESS_AUTH_SALT` | WordPress-Syndicate | - | Authentication salt for security |
| `WORDPRESS_NONCE_KEY` | WordPress-Syndicate | - | Nonce unique key for CSRF protection |
| `WORDPRESS_NONCE_SALT` | WordPress-Syndicate | - | Nonce salt for CSRF protection |
| `WORDPRESS_DB_PASSWORD` | WordPress-Syndicate | (secret) | Database password for WordPress |
| `WORDPRESS_CONFIG_EXTRA` | WordPress-Syndicate | - | Extra configuration for wp-config.php (e.g., Domain and Redis settings) |
| `WORDPRESS_LOGGED_IN_KEY` | WordPress-Syndicate | - | Logged-in unique key for security |
| `WORDPRESS_LOGGED_IN_SALT` | WordPress-Syndicate | - | Logged-in salt for security |
| `WORDPRESS_SECURE_AUTH_KEY` | WordPress-Syndicate | (secret) | Secure authentication unique key |
| `WORDPRESS_SECURE_AUTH_SALT` | WordPress-Syndicate | - | Secure authentication salt |
| `REDISHOST` | Redis | localhost | Internal host for the Redis cache connection |
| `REDISPORT` | Redis | 6379 | Port for the Redis connection (default is 6379) |
| `REDISUSER` | Redis | default | Redis username |
| `REDIS_URL` | Redis | - | Full URL for the Redis connection |
| `REDISPASSWORD` | Redis | (secret) | Password for the Redis connection (secondary) |
| `REDIS_PASSWORD` | Redis | (secret) | Password for the Redis connection |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL for connecting to Redis externally |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'set -eu; a2dismod mpm_event mpm_worker || true; a2enmod mpm_prefork || true; exec docker-entrypoint.sh "$@"' -- apache2-foreground`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wp-syndicate-template)
