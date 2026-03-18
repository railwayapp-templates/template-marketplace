# Deploy Rails 8 + Solid Stack + Docker on Railway

Starter template for Rails 8 with Solid Stack, PostgreSQL, and Docker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/railwayrails8starter)

## About

**rails8_starter** is a production-ready Ruby on Rails 8 template built for instant deployment on Railway. It comes pre-configured with Solid Stack (Rails 8 defaults), PostgreSQL, and Docker, all wired to run on Railway’s infrastructure with minimal setup.

This template is designed to streamline the process of deploying a modern Rails 8 app to Railway. It uses a Dockerfile (without Thruster) and connects to four separate PostgreSQL databases, one for each part of the Solid Stack (cache, queue, cable, and primary). 

Optional: Devise handles authentication, letter_opener is used in development, and Postmark is configured for outbound email in production. 

A persistent volume is mounted to /rails/storage for Active Storage or can be replaced with S3.

This template also includes Mission Control Jobs at /jobs, giving you real-time visibility into your background jobs powered by Solid Queue.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CABLE | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| PRIMARY | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| railway-rails-8-template | [ADHD-Coder/railway-rails-8-template](https://github.com/ADHD-Coder/railway-rails-8-template) | Web service |
| CACHE | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| QUEUE | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | CABLE | railway | Default database created when image is started.	 |
| `DATABASE_URL` | CABLE | - | URL to connect to Postgres database.	 |
| `POSTGRES_USER` | CABLE | (secret) | User to connect to Postgres DB	 |
| `POSTGRES_PASSWORD` | CABLE | (secret) | Password to connect to DB	 |
| `DATABASE_PUBLIC_URL` | CABLE | - | Public URL to connect to Postgres database, used by the Data panel.	 |
| `POSTGRES_DB` | PRIMARY | railway | Default database created when image is started. |
| `DATABASE_URL` | PRIMARY | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | PRIMARY | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | PRIMARY | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | PRIMARY | - | Public URL to connect to Postgres database, used by the Data panel. |
| `RAILS_ENV` | railway-rails-8-template | production | Rails environment the app should run in. |
| `RAILS_MASTER_KEY` | railway-rails-8-template | - | From config/master.key |
| `CABLE_DATABASE_URL` | railway-rails-8-template | - | Database for Solid Cable |
| `CACHE_DATABASE_URL` | railway-rails-8-template | - | Database for Solid Cache |
| `QUEUE_DATABASE_URL` | railway-rails-8-template | - | Database for Solid Queue |
| `PRIMARY_DATABASE_URL` | railway-rails-8-template | - | Main application database |
| `POSTGRES_DB` | CACHE | railway | Default database created when image is started.	 |
| `DATABASE_URL` | CACHE | - | URL to connect to Postgres database.	 |
| `POSTGRES_USER` | CACHE | (secret) | User to connect to Postgres DB	 |
| `POSTGRES_PASSWORD` | CACHE | (secret) | Password to connect to DB	 |
| `DATABASE_PUBLIC_URL` | CACHE | - | Public URL to connect to Postgres database, used by the Data panel.	 |
| `POSTGRES_DB` | QUEUE | railway | Default database created when image is started.	 |
| `DATABASE_URL` | QUEUE | - | URL to connect to Postgres database.	 |
| `POSTGRES_USER` | QUEUE | (secret) | User to connect to Postgres DB	 |
| `POSTGRES_PASSWORD` | QUEUE | (secret) | Password to connect to DB	 |
| `DATABASE_PUBLIC_URL` | QUEUE | - | Public URL to connect to Postgres database, used by the Data panel.	 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`

**Category:** Starters · **Languages:** Ruby, HTML, Shell, Dockerfile, JavaScript, CSS

[View on Railway →](https://railway.com/template/railwayrails8starter)
