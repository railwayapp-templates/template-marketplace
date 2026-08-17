# Deploy Firefly iii on Railway

Open-source personal finance manager with double-entry accounting

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fireflyiii)

## About

Firefly III is a self-hosted personal finance manager built on real double-entry bookkeeping. Every amount you record moves between two accounts, so checking, credit cards, loans and cash always reconcile instead of drifting. You get budgets, recurring bills, savings goals ("piggy banks"), rules that categorise transactions automatically, multi-currency support and reports that add up. People move to it when a commercial budgeting app shuts down, raises its price, or asks them to hand a bank login to a third party.

Self-host Firefly III on Railway with everything already wired together: the `fireflyiii/core` application behind a public HTTPS URL, managed PostgreSQL holding the ledger, managed Redis backing login sessions, a persistent volume for attachments, the official Data Importer on its own URL for CSV files and bank data, and a scheduler that calls the cron endpoint daily so recurring transactions and bill reminders fire on time.

![Firefly III Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786897145/9519b11e-d762-4985-8f25-9cc62074916b.png)

Firefly III is a PHP/Laravel application storing a complete double-entry ledger in a relational database. Self-host it when your finances are nobody else's business, or when you need currencies and account types mainstream apps refuse to model.

Key features:

- Double-entry accounting across asset, expense, revenue and liability accounts
- Budgets with auto-budget periods, plus categories, tags and bill tracking
- Rules that categorise, rename and split transactions automatically
- Piggy banks, recurring transactions and multi-currency accounts
- A full REST API with OAuth2 and personal access tokens

**Firefly III** serves the web interface and API. **PostgreSQL** is the system of record — accounts, transactions, budgets, rules and the encrypted OAuth signing keys live there, which is why API tokens survive restarts. **Redis** keeps login sessions outside the container. The **Data Importer** reaches Firefly III over the private network and handles CSV/CAMT files plus bank connections through GoCardless, SimpleFIN, Spectre and Enable Banking. The **scheduler** only calls `/api/v1/cron/` daily, because Firefly III has no in-process scheduler.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| importer | `fireflyiii/data-importer:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| firefly | `fireflyiii/core:latest` | Web service |
| cron | `alpine:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | importer | UTC | Container timezone |
| `PORT` | importer | 8080 | HTTP port used by the health check |
| `APP_ENV` | importer | production | Laravel environment name |
| `APP_KEY` | importer | - | Importer's own key, not Firefly's |
| `APP_DEBUG` | importer | false | Disable debug output |
| `VANITY_URL` | importer | - | Browser-facing Firefly III URL |
| `IS_EXTERNAL` | importer | true | Importer is reachable from outside |
| `CAN_POST_FILES` | importer | false | Keep unauthenticated file posting closed |
| `FIREFLY_III_URL` | importer | - | Private API address |
| `TRUSTED_PROXIES` | importer | 0.0.0.0/0,::/0 | Trust proxy headers for client IP |
| `EXPECT_SECURE_URL` | importer | true | Advertise an https callback URL |
| `CAN_POST_AUTOIMPORT` | importer | false | Keep unauthenticated auto-import closed |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `TZ` | firefly | UTC | Container timezone |
| `PORT` | firefly | 8080 | HTTP port used by the health check |
| `APP_ENV` | firefly | production | Laravel environment name |
| `APP_KEY` | firefly | - | Encryption key, exactly 32 characters |
| `APP_URL` | firefly | - | Public base URL |
| `DB_HOST` | firefly | - | Postgres private hostname |
| `DB_PORT` | firefly | - | Postgres port |
| `REDIS_DB` | firefly | 0 | Redis database index |
| `APP_DEBUG` | firefly | false | Disable debug output |
| `MAIL_FROM` | firefly | mail@example.com | From address for outgoing mail |
| `REDIS_HOST` | firefly | - | Redis private hostname |
| `REDIS_PORT` | firefly | - | Redis port |
| `SITE_OWNER` | firefly | mail@example.com | Owner contact address |
| `DB_DATABASE` | firefly | - | Postgres database name |
| `DB_PASSWORD` | firefly | (secret) | Postgres password |
| `DB_USERNAME` | firefly | (secret) | Postgres user |
| `MAIL_MAILER` | firefly | log | Set to smtp to enable outgoing mail |
| `CACHE_DRIVER` | firefly | file | Keeps cache clears from wiping sessions |
| `COOKIE_SECURE` | firefly | true | Send session cookie over HTTPS only |
| `DB_CONNECTION` | firefly | pgsql | Database driver |
| `REDIS_PASSWORD` | firefly | (secret) | Redis password |
| `REDIS_USERNAME` | firefly | (secret) | Redis ACL username |
| `SESSION_DRIVER` | firefly | redis | Keep sessions outside the container |
| `COOKIE_SAMESITE` | firefly | lax | Session cookie SameSite policy |
| `TRUSTED_PROXIES` | firefly | 0.0.0.0/0,::/0 | Trust proxy headers for client IP |
| `DEFAULT_LANGUAGE` | firefly | en_US | Interface language |
| `DKR_CHECK_SQLITE` | firefly | false | Skip SQLite probe on a Postgres install |
| `PHP_MEMORY_LIMIT` | firefly | 512M | PHP memory ceiling for imports |
| `STATIC_CRON_TOKEN` | firefly | (secret) | Cron endpoint token, exactly 32 characters |
| `SEND_ERROR_MESSAGE` | firefly | false | Skip error mail while no mailer exists |
| `CRON_SCHEDULE` | cron | 0 3 * * * | Daily cron expression, UTC |
| `FIREFLY_III_URL` | cron | - | Private address to call |
| `STATIC_CRON_TOKEN` | cron | (secret) | Token shared with Firefly III |

## Configuration

- **Healthcheck:** `/token`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'set -e; mkdir -p /var/www/html/storage/upload; echo "railway-boot: uid=$(id -u) gid=$(id -g)"; if [ "$(id -u)" = "0" ]; then chown -R www-data:www-data /var/www/html/storage/upload; ls -ld /var/www/html/storage/upload; HOME=$(getent passwd www-data | cut -d: -f6); export HOME; echo "railway-boot: dropping to www-data, HOME=$HOME"; setpriv --reuid=www-data --regid=www-data --init-groups id; exec setpriv --reuid=www-data --regid=www-data --init-groups docker-php-serversideup-entrypoint /init; fi; echo "railway-boot: already unprivileged"; exec docker-php-serversideup-entrypoint /init'`
- **Healthcheck:** `/up`
- **Volume:** `/var/www/html/storage/upload`
- **Start command:** `/bin/sh -c 'printf "%s wget -qO- %s/api/v1/cron/%s >> /proc/1/fd/1 2>&1\n" "$CRON_SCHEDULE" "$FIREFLY_III_URL" "$STATIC_CRON_TOKEN" > /etc/crontabs/root; echo "railway-cron: schedule=$CRON_SCHEDULE target=$FIREFLY_III_URL/api/v1/cron/***"; exec crond -f -l 8 -c /etc/crontabs -L /dev/stdout'`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fireflyiii)
