# Deploy Rails 8 + Hotwire on Railway

A simple template for full stack Ruby on Rails 8 apps using turbo/hotwire

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rails-8-hotwire)

## About

Rails 8 with hotwire allows real-time, reactive web apps without writing JavaScript. Create SPA-like interfaces and experiences all with Ruby.

Deploying Rails with hotwire requires a few moving parts. PostgreSQL, Redis, Action Cable work together to allow Turbo streams to push HTML updates in real time.  This template pre-configures these services so that broadcasts work immediately on deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| Rails 8 App | [jtmst/rails-hotwire-starter](https://github.com/jtmst/rails-hotwire-starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | PSQL database name |
| `DATABASE_URL` | Postgres | - | PSQL connection string |
| `POSTGRES_USER` | Postgres | (secret) | PSQL User |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PSQL Password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL connection string |
| `REDISHOST` | Redis | - | Redis Host |
| `REDISPORT` | Redis | - | Redis port |
| `REDISUSER` | Redis | - | Redis user |
| `REDIS_URL` | Redis | - | Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PUBLIC_URL` | Redis | - | Redis public connection string |
| `PORT` | Rails 8 App | - | Server port |
| `RAILS_ENV` | Rails 8 App | - | Rails environment |
| `REDIS_URL` | Rails 8 App | - | Redis URL |
| `DATABASE_URL` | Rails 8 App | - | PSQL connection string |
| `SECRET_KEY_BASE` | Rails 8 App | (secret) | Rails encryption key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `bin/rails server -b 0.0.0.0 -p $PORT`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, Ruby, Dockerfile, Shell, JavaScript, CSS, Procfile

[View on Railway →](https://railway.com/deploy/rails-8-hotwire)
