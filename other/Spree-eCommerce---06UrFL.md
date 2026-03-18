# Deploy Spree eCommerce on Railway

Ready-to-use Spree Commerce store with admin dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/06UrFL)

## About

# Spree Commerce Starter

A production-ready e-commerce platform built with Spree Commerce on Ruby on Rails.

## What is Spree?

Spree Commerce is a complete, modular e-commerce solution built with Ruby on Rails. It offers:

- 🛍️ Full-featured shopping cart
- 🎨 Customizable products, variants, and options
- 💳 Multiple payment gateway integrations
- 📦 Advanced shipping methods configuration
- 🔍 Powerful product search and filtering
- 👥 Customer accounts and order management
- 📱 Mobile-responsive design out of the box

## What's Included

This template sets up:
- A Spree Commerce application
- PostgreSQL database for data persistence
- Redis for caching and background jobs

## Environment Variables

This template automatically sets up most requirements, but you can customize these variables:

```

# Required 
ADMIN_EMAIL
# Password is auto generated, check env tab.

# Auto-generated secrets:
SECRET_KEY_BASE
SPREE_AUTH_SECRET_KEY

# Defaults set by template:
RAILS_ENV=production
RAILS_SERVE_STATIC_FILES=true
RAILS_LOG_TO_STDOUT=true

# Optional customization:
SPREE_MAIL_FROM=your@email.com
SPREE_STORE_NAME="Your Store Name"
```

## Additional Features

- **Multi-Store**: Support for running multiple stores from a single installation
- **Multi-Currency**: Built-in support for multiple currencies
- **Multi-Language**: Internationalization ready
- **SEO-Friendly**: Built-in SEO best practices
- **API-First**: Complete REST API for headless commerce

## Security

- All necessary security configurations are pre-configured
- Environment variables for sensitive data
- Secure password management
- CSRF protection enabled
- XSS protection enabled

## Customization

Spree is highly customizable. You can:
1. Install additional Spree extensions
2. Override default views
3. Customize the admin interface
4. Add custom models and controllers

## Support

For issues with:
- The template itself: Open an issue in the template repository
- Spree Commerce: Visit [Spree's documentation]

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Spree | [kadumedim/spree-starter-template](https://github.com/kadumedim/spree-starter-template) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `RAILS_ENV` | Spree | production | Rails env |
| `REDIS_URL` | Spree | - | Redis URL |
| `ADMIN_EMAIL` | Spree | - | Admin account email |
| `DATABASE_URL` | Spree | - | Postgres URL |
| `ADMIN_PASSWORD` | Spree | (secret) | Admin account password |
| `SECRET_KEY_BASE` | Spree | (secret) | Secret |
| `RAILS_LOG_TO_STDOUT` | Spree | true | Log to stdout |
| `SPREE_AUTH_SECRET_KEY` | Spree | (secret) | Spree auth secret |
| `RAILS_SERVE_STATIC_FILES` | Spree | true | Rails serve static files |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** Ruby, HTML, SCSS, Dockerfile, JavaScript, CSS, Shell, Procfile

[View on Railway →](https://railway.com/template/06UrFL)
