# Deploy Akaunting on Railway

Open-source accounting with MariaDB and persistent business data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/akaunting-1)

## About

This template deploys exactly two services: Akaunting and MariaDB. Akaunting
uses `akaunting/akaunting:3.1.21@sha256:918bbc77981e5b96ab6aa6838491cfa7c98cb4ee7bbf9532ee083e7e66d04255`,
and MariaDB uses
`mariadb:11.8.2@sha256:2bcbaec92bd9d4f6591bc8103d3a8e6d0512ee2235506e47a2e129d190444405`.
Railway provides the public HTTPS endpoint for Akaunting while MariaDB remains
on private networking. Only MariaDB has a persistent volume, mounted at
`/var/lib/mysql`; Akaunting has no volume mount. Shared credentials are
generated once and passed through Railway service references. The deployer
supplies only the initial administrator email and password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:11.8.2@sha256:2bcbaec92bd9d4f6591bc8103d3a8e6d0512ee2235506e47a2e129d190444405` | Database |
| Akaunting | `akaunting/akaunting:3.1.21@sha256:918bbc77981e5b96ab6aa6838491cfa7c98cb4ee7bbf9532ee083e7e66d04255` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_USER` | MariaDB | (secret) |
| `MYSQL_DATABASE` | MariaDB | akaunting |
| `MYSQL_PASSWORD` | MariaDB | (secret) |
| `MYSQL_RANDOM_ROOT_PASSWORD` | MariaDB | (secret) |
| `PORT` | Akaunting | 80 |
| `LOCALE` | Akaunting | en-US |
| `DB_PORT` | Akaunting | 3306 |
| `DB_PREFIX` | Akaunting | ak_ |
| `ADMIN_EMAIL` | Akaunting | admin@example.com |
| `DB_PASSWORD` | Akaunting | (secret) |
| `DB_USERNAME` | Akaunting | (secret) |
| `COMPANY_NAME` | Akaunting | My Company |
| `ADMIN_PASSWORD` | Akaunting | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `bash -c "a2dismod mpm_event mpm_worker 2>/dev/null || true; a2enmod mpm_prefork >/dev/null 2>&1 || true; a2enmod rewrite >/dev/null 2>&1 || true; mkdir -p /var/www/html/storage/framework/sessions /var/www/html/storage/framework/views /var/www/html/storage/framework/cache /var/www/html/storage/app/uploads /var/www/html/bootstrap/cache; if [ \"\$(php -r 'try{\$p=new PDO(\"mysql:host=\".getenv(\"DB_HOST\").\";port=\".getenv(\"DB_PORT\").\";dbname=\".getenv(\"DB_NAME\"),getenv(\"DB_USERNAME\"),getenv(\"DB_PASSWORD\"));\$c=\$p->query(\"SELECT COUNT(*) FROM \".getenv(\"DB_PREFIX\").\"users\")->fetchColumn();echo \$c>0?\"yes\":\"no\";}catch(Exception \$e){echo \"no\";}')\" != \"yes\" ]; then echo INSTALL_BRANCH; retry_for=30; while sleep 5; do if php artisan install --db-host=\"\$DB_HOST\" --db-port=\"\$DB_PORT\" --db-name=\"\$DB_NAME\" --db-username=\"\$DB_USERNAME\" \"--db-password=\$DB_PASSWORD\" --db-prefix=\"\$DB_PREFIX\" \"--company-name=\$COMPANY_NAME\" \"--company-email=\$COMPANY_EMAIL\" \"--admin-email=\$ADMIN_EMAIL\" \"--admin-password=\$ADMIN_PASSWORD\" \"--locale=\$LOCALE\" --no-interaction; then break; fi; retry_for=\$((retry_for-5)); if [ \$retry_for -le 0 ]; then echo \"Unable to find database!\" >&2; exit 1; fi; done; else echo SERVE_BRANCH; if ! grep -q \"^APP_INSTALLED=true\" /var/www/html/.env; then sed -i \"s/^APP_INSTALLED=false/APP_INSTALLED=true/\" /var/www/html/.env || echo \"APP_INSTALLED=true\" >> /var/www/html/.env; fi; fi; chown -R www-data:root /var/www/html/storage /var/www/html/bootstrap/cache; chmod -R u=rwX,g=rX,o=rX /var/www/html/storage /var/www/html/bootstrap/cache; exec docker-php-entrypoint apache2-foreground"`
- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/akaunting-1)
