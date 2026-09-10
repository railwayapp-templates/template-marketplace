# Deploy October CMS on Railway

Laravel-based CMS for building websites you edit in the browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/october-cms)

## About

October CMS is a content management platform built on the Laravel PHP framework, used by agencies and product teams who build a site in Twig templates and hand day-to-day editing to someone who does not write code. Its backend gives you a file-tree editor for pages, layouts and partials, a media library, a structured-content builder called Tailor, and a Composer-managed plugin ecosystem. Deploy October CMS on Railway for that developer-first workflow without the shared-hosting babysitting.

Self-host October CMS here and five services arrive wired together. **october** runs nginx, PHP-FPM and the task scheduler. **october-worker** runs the same image as a queue consumer, so mail and plugin jobs leave the request path. **Postgres** holds pages, content and settings, **Redis** backs the cache, sessions and job queue, and **mailpit** is a private SMTP endpoint with a password-protected inbox, so outbound mail works without a relay account. A volume on the web service keeps media and theme files across redeploys.

![Diagram of the October CMS services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788960112/october-architecture.png)

October CMS sits between a framework and a CMS. A page is a flat file of Twig markup with an optional PHP section, a layout wraps it, a partial is reusable, and plugin components add dynamic behaviour. That suits marketing sites, client work and content-driven apps where the structure is custom but non-technical people still change words and images.

- File-tree editor for pages, layouts, partials, content blocks and theme assets
- Tailor blueprints for structured content without writing a plugin
- Media library with an image resizer and a built-in file manager
- Backend roles, groups and per-permission access control
- Multisite support with hostname routing
- Composer-based plugin and theme management

The Railway architecture keeps the roles separate. The web service holds the volume and runs `schedule:work` under Supervisor for October's periodic tasks. The worker runs `queue:work` against Redis. Postgres stores everything the CMS treats as content, including editor changes to templates, so the site survives a container being replaced.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| Redis | `redis:8.2` | Database |
| october-worker | [gridalpha/october-railway](https://github.com/gridalpha/october-railway) | Worker |
| october | [gridalpha/october-railway](https://github.com/gridalpha/october-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | mailpit | UTC | Timestamps in the inbox |
| `PORT` | mailpit | 8025 | Inbox UI port Railway probes |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | IPv6 bind for the inbox UI |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | IPv6 bind so peers can send |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `APP_ENV` | october-worker | production | Laravel environment |
| `APP_KEY` | october-worker | - | Same key as the web service |
| `APP_URL` | october-worker | - | Public base URL for links in mail |
| `DB_HOST` | october-worker | - | Private Postgres hostname |
| `DB_PORT` | october-worker | - | Postgres port |
| `APP_NAME` | october-worker | October CMS | Must match the web service |
| `APP_DEBUG` | october-worker | false | Never enable in production |
| `LOG_LEVEL` | october-worker | info | Minimum level written |
| `MAIL_HOST` | october-worker | - | Private Mailpit hostname |
| `MAIL_PORT` | october-worker | 1025 | Mailpit SMTP port |
| `REDIS_URL` | october-worker | - | Private Redis connection string |
| `APP_LOCALE` | october-worker | en | Backend and frontend language |
| `DB_SSLMODE` | october-worker | prefer | TLS without certificate verification |
| `BACKEND_URI` | october-worker | /manage | Must match the web service |
| `CACHE_STORE` | october-worker | redis | Application cache backend |
| `DB_DATABASE` | october-worker | - | Database name |
| `DB_PASSWORD` | october-worker | (secret) | Database password |
| `DB_USERNAME` | october-worker | (secret) | Database user |
| `LINK_POLICY` | october-worker | secure | Force https in generated links |
| `LOG_CHANNEL` | october-worker | stderr | Send logs to the deploy log |
| `MAIL_MAILER` | october-worker | smtp | Mail transport |
| `MAIL_SCHEME` | october-worker | smtp | Plaintext SMTP to Mailpit |
| `ACTIVE_THEME` | october-worker | demo | Fallback theme without a database |
| `REDIS_CLIENT` | october-worker | phpredis | Redis extension in the image |
| `CMS_SAFE_MODE` | october-worker | true | Must match the web service |
| `DB_CONNECTION` | october-worker | pgsql | Database driver |
| `MAIL_FROM_NAME` | october-worker | October CMS | Default sender name |
| `SESSION_DRIVER` | october-worker | redis | Shared session store |
| `CMS_DB_TEMPLATES` | october-worker | true | Must match the web service |
| `QUEUE_CONNECTION` | october-worker | redis | Queue this worker drains |
| `MAIL_FROM_ADDRESS` | october-worker | - | Default sender address |
| `OCTOBER_BOOTSTRAP` | october-worker | false | Do not race the web service's migrations |
| `CMS_SECURITY_POLICY_V1` | october-worker | true | Must match the web service |
| `OCTOBER_DB_WAIT_SECONDS` | october-worker | 600 | Seconds to wait for Postgres |
| `OCTOBER_SCHEDULER_ENABLED` | october-worker | false | Scheduler runs on the web service |
| `PORT` | october | 80 | nginx listen port in the runtime image |
| `APP_ENV` | october | production | Laravel environment |
| `APP_KEY` | october | - | Session signing and encryption key |
| `APP_URL` | october | - | Public base URL |
| `DB_HOST` | october | - | Private Postgres hostname |
| `DB_PORT` | october | - | Postgres port |
| `APP_NAME` | october | October CMS | Site name in the backend and mail |
| `APP_DEBUG` | october | false | Never enable in production |
| `LOG_LEVEL` | october | info | Minimum level written |
| `MAIL_HOST` | october | - | Private Mailpit hostname |
| `MAIL_PORT` | october | 1025 | Mailpit SMTP port |
| `REDIS_URL` | october | - | Private Redis connection string |
| `APP_LOCALE` | october | en | Backend and frontend language |
| `DB_SSLMODE` | october | prefer | TLS without certificate verification |
| `BACKEND_URI` | october | /manage | Backend path, avoid generic names |
| `CACHE_STORE` | october | redis | Application cache backend |
| `DB_DATABASE` | october | - | Database name |
| `DB_PASSWORD` | october | (secret) | Database password |
| `DB_USERNAME` | october | (secret) | Database user |
| `LINK_POLICY` | october | secure | Force https in generated links |
| `LOG_CHANNEL` | october | stderr | Send logs to the deploy log |
| `MAIL_MAILER` | october | smtp | Mail transport |
| `MAIL_SCHEME` | october | smtp | Plaintext SMTP to Mailpit |
| `THEMES_PATH` | october | /var/www/html/storage/themes | Real theme directory, not the symlink |
| `ACTIVE_THEME` | october | demo | Fallback theme without a database |
| `REDIS_CLIENT` | october | phpredis | Redis extension in the image |
| `CMS_SAFE_MODE` | october | true | Block PHP code sections in the editor |
| `DB_CONNECTION` | october | pgsql | Database driver |
| `MAIL_FROM_NAME` | october | October CMS | Default sender name |
| `SESSION_DRIVER` | october | redis | Sessions survive a redeploy |
| `CMS_DB_TEMPLATES` | october | true | Store editor changes in Postgres |
| `QUEUE_CONNECTION` | october | redis | Jobs go to the worker |
| `SESSION_LIFETIME` | october | 120 | Session lifetime in minutes |
| `DEFAULT_FILE_MASK` | october | 644 | Mode for files October creates |
| `MAIL_FROM_ADDRESS` | october | - | Default sender address |
| `OCTOBER_BOOTSTRAP` | october | true | Run migrations and seed the administrator |
| `SESSION_SAME_SITE` | october | lax | SameSite policy |
| `DEFAULT_FOLDER_MASK` | october | 755 | Mode for folders October creates |
| `OCTOBER_ADMIN_EMAIL` | october | admin@example.com | First administrator email |
| `OCTOBER_ADMIN_LOGIN` | october | (secret) | First administrator username |
| `SESSION_SECURE_COOKIE` | october | true | Secure flag on the session cookie |
| `CMS_SECURITY_POLICY_V1` | october | true | Relaxed Twig sandbox under safe mode |
| `OCTOBER_ADMIN_PASSWORD` | october | (secret) | First administrator password |
| `OCTOBER_ADMIN_LAST_NAME` | october | Administrator | Administrator last name |
| `OCTOBER_DB_WAIT_SECONDS` | october | 300 | Seconds to wait for Postgres |
| `OCTOBER_ADMIN_FIRST_NAME` | october | Site | Administrator first name |
| `OCTOBER_SCHEDULER_ENABLED` | october | true | Run schedule:work under Supervisor |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Start command:** `/usr/local/bin/october-railway-entrypoint.sh php artisan queue:work --tries=3 --timeout=90 --sleep=3 --max-time=3600`
- **Healthcheck:** `/_health`
- **Volume:** `/var/www/html/storage`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/october-cms)
