# Deploy Rails | Rails 8.1 on Ruby 3.4 with Postgres on Railway

Rails 8.1 on Ruby 3.4 with Postgres, in the container Rails generates

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rails-or-rails-81-on-ruby-34-with-postgr)

## About

Rails 8.1 on Ruby 3.4, in the production container Rails generates for itself.

The Rails template on Railway deploys a starter pinned to Rails 7.0.3 and Ruby 3.1.2 - both from 2022. About one deployment in six fails.

It also deploys Redis from `bitnami/redis` **with no tag**. Bitnami restricted its public catalogue in 2025: that repository now carries digests and metadata but no version tags, so a plain `bitnami/redis` reference is a pull waiting to fail. This template does not ship Redis at all - add it when you actually need Solid Queue or Action Cable at scale, and use the official `redis` image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rails | [ak40u/rails-railway-starter](https://github.com/ak40u/rails-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Rails | 8080 |
| `RAILS_ENV` | Rails | production |
| `SECRET_KEY_BASE` | Rails | (secret) |
| `RAILS_LOG_TO_STDOUT` | Rails | true |
| `POSTGRES_DB` | Postgres | rails |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** HTML, Ruby, Dockerfile, JavaScript, CSS, Shell

[View on Railway →](https://railway.com/deploy/rails-or-rails-81-on-ruby-34-with-postgr)
