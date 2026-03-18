# Deploy Spree eCommerce on Railway

Production-ready Spree eCommerce with admin & storefront

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spree-ecommerce-1)

## About

Spree Commerce is an open-source, API-first eCommerce platform built with Ruby on Rails. It provides a complete, modular solution for building modern online stores with multi-vendor marketplace capabilities, multi-currency support, and customizable product catalogs. Trusted by major brands like New England Patriots, Craftsman, and Blue Bottle Coffee.

Hosting Spree eCommerce requires a Ruby on Rails environment with PostgreSQL database support and Redis for caching and background job processing. The platform is highly scalable and can handle everything from small single-store setups to large multi-tenant marketplace deployments.

Spree's modular architecture allows for easy customization and extension through gems, while its RESTful API enables headless commerce implementations. The platform includes a comprehensive admin dashboard for managing products, orders, customers, and shipping, making it production-ready out of the box with enterprise-grade security and performance optimizations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| Spree | [youssefsiam38/spree_starter](https://github.com/youssefsiam38/spree_starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `APP_HOST` | Spree | - | REQUIRED: Your production domain WITHOUT protocol, eg. mystore.com |
| `RAILS_ENV` | Spree | production | - |
| `SENTRY_DSN` | Spree | - | Sentry DSN (optional, if not provided will not send errors to Sentry) |
| `ADMIN_EMAIL` | Spree | - | REQUIRED: Admin user email address (will be created on first deployment) |
| `ADMIN_PASSWORD` | Spree | (secret) | REQUIRED: Secure admin password (minimum 6 characters) |
| `RAILS_LOG_LEVEL` | Spree | info | Logging level (optional, defaults to info, options: debug, info, warn, error) |
| `SECRET_KEY_BASE` | Spree | (secret) | - |
| `SENDGRID_DOMAIN` | Spree | - | The domain you want to use for sending emails that was verified in SendGrid, eg. mystore.com |
| `SENDGRID_API_KEY` | Spree | (secret) | Your SendGrid API key. Can be found in https://app.sendgrid.com/settings/api_keys |
| `MAIL_FROM_ADDRESS` | Spree | - | Email from address for transactional emails (optional, defaults to support@mystore.com) |
| `RAILS_MAX_THREADS` | Spree | 5 | Puma thread pool size (optional, defaults to 3, recommended: 5 for better performance) |
| `SCREENSHOT_API_TOKEN` | Spree | (secret) | Screenshot API (Platform) token (optional, used for screenshot generation) https://screenshotapi.net |
| `GOOGLE_PLACES_API_KEY` | Spree | (secret) | Google Places API key (optional, used on checkout for address autocomplete) |
| `SPREE_AUTH_SECRET_KEY` | Spree | (secret) | - |
| `DEVISE_SESSION_TIMEOUT` | Spree | 14 | User session timeout in days (optional, defaults to 14) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Ruby, CSS, HTML, Dockerfile, Shell, JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/spree-ecommerce-1)
