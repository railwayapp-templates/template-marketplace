# Deploy WordPress on Railway

Open source publishing platform of choice for millions of websites globally

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-railway)

## About

WordPress is the GPL-licensed CMS behind roughly 40% of all websites and about 60% of those on a known CMS. Its advantage is breadth: tens of thousands of plugins, a block editor non-developers can use, and a REST API that makes any install a headless backend. Teams self-host WordPress to keep that ecosystem without a managed host's plugin blocklists or per-site pricing.

Run WordPress on Railway as three services. The Docker Official Image `wordpress:7.0.2-php8.4-apache` — Apache 2.4 with `mod_php`, `imagick`, `gd` and OPcache — serves port `80` behind Railway's HTTPS domain. Managed **MySQL 9.4** holds posts, users and options over the private network, managed **Redis 8.2.1** backs a persistent object cache, and a 5 GB volume at `/var/www/html` persists core, plugins and uploads.

![WordPress Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786204107/2b780b33-5eaa-418c-ad65-76dad17a1d5f.png)

Self-host when content must live in infrastructure you control, when you need plugins a managed platform forbids, or when per-site pricing stops scaling.

- **Block editor** — layouts and templates without touching PHP.
- **Plugin ecosystem** — WooCommerce, SEO, forms, membership and backups from the dashboard.
- **API and media** — every post type under `/wp-json/`; `imagick`/`gd` resize uploads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Redis | `redis:8.2.1` | Database |
| wordpress | `wordpress:7.0.2-php8.4-apache` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Private hostname, never publicly exposed |
| `MYSQLPORT` | MySQL | 3306 | MySQL port on the private network |
| `MYSQLUSER` | MySQL | root | Superuser; give the app a scoped user instead |
| `MYSQL_URL` | MySQL | - | Private-network connection string |
| `MYSQLDATABASE` | MySQL | - | Alias consumers reference as ${{MySQL.MYSQLDATABASE}} |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias of the root password |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first init |
| `MYSQL_PUBLIC_URL` | MySQL | - | External connection string; empty host/port until a TCP proxy exists |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, generated once at init — read only when the data dir is created |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | wordpress | 80 | HTTP port, matches domain target port |
| `REDISHOST` | wordpress | - | Private Redis host for object cache |
| `REDISPORT` | wordpress | - | Redis port |
| `REDISPASSWORD` | wordpress | (secret) | Redis AUTH password |
| `WORDPRESS_DB_HOST` | wordpress | - | Private MySQL host and port |
| `WORDPRESS_DB_NAME` | wordpress | - | Database created for WordPress |
| `WORDPRESS_DB_USER` | wordpress | (secret) | Least-privilege database user, not root |
| `WORDPRESS_AUTH_KEY` | wordpress | (secret) | Signs auth cookies, keep stable |
| `WORDPRESS_AUTH_SALT` | wordpress | - | Salt for the auth key |
| `WORDPRESS_NONCE_KEY` | wordpress | - | Signs form nonces, keep stable |
| `WORDPRESS_NONCE_SALT` | wordpress | - | Salt for the nonce key |
| `WORDPRESS_DB_PASSWORD` | wordpress | (secret) | Password for that scoped user |
| `WORDPRESS_CONFIG_EXTRA` | wordpress | define('WP_HOME','https://'.getenv('RAILWAY_PUBLIC_DOMAIN')); define('WP_SITEURL','https://'.getenv('RAILWAY_PUBLIC_DOMAIN')); define('FORCE_SSL_ADMIN',true); define('DISALLOW_FILE_EDIT',true); define('WP_MEMORY_LIMIT','256M'); define('WP_MAX_MEMORY_LIMIT','512M'); define('WP_REDIS_HOST',getenv('REDISHOST')); define('WP_REDIS_PORT',(int)getenv('REDISPORT')); define('WP_REDIS_PASSWORD',getenv('REDISPASSWORD')); define('WP_REDIS_CLIENT','predis'); define('WP_REDIS_PREFIX','wp:'); define('WP_REDIS_DATABASE',0); define('WP_REDIS_TIMEOUT',2); define('WP_REDIS_READ_TIMEOUT',2); | Extra PHP eval'd in wp-config.php |
| `WORDPRESS_TABLE_PREFIX` | wordpress | wp_ | Prefix for all WordPress tables |
| `WORDPRESS_LOGGED_IN_KEY` | wordpress | - | Signs logged-in cookies, keep stable |
| `WORDPRESS_LOGGED_IN_SALT` | wordpress | - | Salt for the logged-in key |
| `WORDPRESS_SECURE_AUTH_KEY` | wordpress | (secret) | Signs secure auth cookies, keep stable |
| `WORDPRESS_SECURE_AUTH_SALT` | wordpress | - | Salt for the secure auth key |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'printf "upload_max_filesize=64M\npost_max_size=64M\nmemory_limit=256M\nmax_execution_time=300\nmax_input_vars=3000\n" > /usr/local/etc/php/conf.d/zz-railway.ini; a2dismod mpm_event mpm_worker >/dev/null 2>&1 || true; rm -f /etc/apache2/mods-enabled/mpm_event.* /etc/apache2/mods-enabled/mpm_worker.*; a2enmod mpm_prefork >/dev/null 2>&1 || true; grep -q "100.64.0.0/10" /etc/apache2/conf-available/remoteip.conf || { echo "RemoteIPInternalProxy 100.64.0.0/10"; echo "RemoteIPInternalProxy fd00::/8"; } >> /etc/apache2/conf-available/remoteip.conf; apache2ctl -t; exec docker-entrypoint.sh apache2-foreground'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-railway)
