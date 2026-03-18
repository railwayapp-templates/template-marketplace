# Deploy Wagtail on Railway

A production-ready Wagtail CMS starter template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wagtail-starter)

## About

Wagtail Starter is a production-ready Wagtail CMS template pre-configured for Railway. It includes PostgreSQL, WhiteNoise for static files, split            
  development/production settings, Argon2 password hashing, and a health check endpoint. Deploy a fully working Wagtail site in under a minute and start       
  building your content-managed application.                                                                                                                   
                                                                                                                                                               
  ## About Hosting Wagtail Starter

  Hosting Wagtail Starter on Railway requires a web service running Django with Gunicorn and a PostgreSQL database. Railway automatically provisions the
  database, sets environment variables like `DATABASE_URL` and `SECRET_KEY`, and runs migrations on deploy. Static files are served via WhiteNoise with brotli
  compression, so no separate web server is needed. For media uploads (images, documents managed through Wagtail), you'll need S3-compatible storage since
  Railway doesn't provide persistent disk. The template includes commented-out S3 configuration ready to enable.

  ## Common Use Cases

  - Content-managed websites with a powerful admin interface for non-technical editors
  - Blogs, portfolios, and marketing sites with structured page types and rich text editing
  - Headless CMS providing content via Wagtail's built-in API for frontend frameworks

  ## Dependencies for Wagtail Starter Hosting

  - PostgreSQL database
  - Python 3.12+

  ### Deployment Dependencies

  - [Wagtail documentation](https://docs.wagtail.org/)
  - [Django documentation](https://docs.djangoproject.com/en/5.2/)
  - [S3-compatible storage for media files](https://docs.wagtail.org/en/stable/advanced_topics/deploying.html) (optional)

  ## Why Deploy Wagtail Starter on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while
   allowing you to vertically and horizontally scale it.

  By deploying Wagtail Starter on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers,
  databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| wagtail-starter-template | [fasouto/wagtail-starter-template](https://github.com/fasouto/wagtail-starter-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SECRET_KEY` | wagtail-starter-template | (secret) | - |
| `ALLOWED_HOSTS` | wagtail-starter-template | .railway.app    | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** Python, HTML, CSS

[View on Railway →](https://railway.com/template/wagtail-starter)
