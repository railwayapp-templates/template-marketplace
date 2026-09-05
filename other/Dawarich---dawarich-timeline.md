# Deploy Dawarich on Railway

Map your own location history — an open-source Google Timeline

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dawarich-timeline)

## About

Dawarich is an open-source alternative to Google Timeline. It takes the location
history your phone already records, stores it in your own database, and turns it into an
interactive map, a list of trips and places, and year-by-year statistics on where you
went. People self-host it for one reason above all: location history is among the most
sensitive data a person generates, and running it yourself means nobody else holds a
copy of everywhere you have been.

Deploy Dawarich on Railway and you get the full production shape, not a single
container. Four services are pre-wired: `dawarich`, the Rails web app serving the map and
API and holding the only public URL; `dawarich-sidekiq`, a worker that parses imports,
reverse-geocodes points and rebuilds statistics without blocking a request; `postgis`,
PostgreSQL with the PostGIS extension storing every point as a geographic coordinate; and
`Redis`, backing the job queue, cache and live map updates. An object storage bucket holds
uploaded imports and rendered videos, so the web and worker containers share files
without sharing a disk.

![Diagram of the Dawarich, Sidekiq, PostGIS and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788541714/dawarich-architecture.png)

Dawarich is a Ruby on Rails application that ingests location points from phones and file
exports, stores them as geographic data, and derives everything else from that one stream.
It suits anyone who wants Google Timeline without Google, or who has years of Takeout
archives on a disk and wants them queryable again.

- Interactive map with heatmaps, fog-of-war and per-day tracks
- Imports Google Takeout, GPX, GeoJSON, KML, OwnTracks, FIT, TCX and CSV
- Live tracking from the Dawarich apps, OwnTracks, Overland or GPSLogger
- Trips, visited places and cities, with optional reverse geocoding
- Yearly and monthly statistics: distance, countries and cities visited
- REST API, two-factor auth and shareable read-only links

The service split matters at import time: a Takeout archive can hold years of points and
parsing it is slow, so that work goes to `dawarich-sidekiq` while `dawarich` keeps
serving the map. `postgis` is not interchangeable with plain PostgreSQL — the schema
stores points as `geography` columns.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dawarich-sidekiq | [gridalpha/dawarich-railway](https://github.com/gridalpha/dawarich-railway) | Worker |
| Redis | `redis:8.2` | Database |
| postgis | `postgis/postgis:17-3.5-alpine` | Database |
| dawarich | [gridalpha/dawarich-railway](https://github.com/gridalpha/dawarich-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RAILS_ENV` | dawarich-sidekiq | production | Rails environment |
| `REDIS_URL` | dawarich-sidekiq | - | Queue the worker consumes |
| `TIME_ZONE` | dawarich-sidekiq | UTC | Timezone for dates and statistics |
| `AWS_BUCKET` | dawarich-sidekiq | - | Bucket name |
| `AWS_REGION` | dawarich-sidekiq | - | Bucket region |
| `SELF_HOSTED` | dawarich-sidekiq | true | Enables the self-hosted feature set |
| `DATABASE_HOST` | dawarich-sidekiq | postgis.railway.internal | Private PostGIS hostname |
| `DATABASE_NAME` | dawarich-sidekiq | - | Application database |
| `DATABASE_PORT` | dawarich-sidekiq | 5432 | PostGIS port |
| `STORE_GEODATA` | dawarich-sidekiq | true | Keep raw geocoding responses |
| `SECRET_KEY_BASE` | dawarich-sidekiq | (secret) | Must match the web service |
| `STORAGE_BACKEND` | dawarich-sidekiq | s3 | Store uploads in object storage |
| `AWS_ENDPOINT_URL` | dawarich-sidekiq | - | S3-compatible endpoint |
| `AWS_ACCESS_KEY_ID` | dawarich-sidekiq | - | Bucket access key |
| `DATABASE_PASSWORD` | dawarich-sidekiq | (secret) | Database password |
| `DATABASE_USERNAME` | dawarich-sidekiq | (secret) | Database role |
| `RAILS_LOG_TO_STDOUT` | dawarich-sidekiq | true | Send logs to the deploy log |
| `APPLICATION_PROTOCOL` | dawarich-sidekiq | https | Scheme used in generated URLs |
| `AWS_SECRET_ACCESS_KEY` | dawarich-sidekiq | (secret) | Bucket secret key |
| `OTP_ENCRYPTION_PRIMARY_KEY` | dawarich-sidekiq | - | Must match the web service |
| `OTP_ENCRYPTION_DETERMINISTIC_KEY` | dawarich-sidekiq | - | Must match the web service |
| `ALLOW_EMAIL_PASSWORD_REGISTRATION` | dawarich-sidekiq | (secret) | Keep public signup closed |
| `BACKGROUND_PROCESSING_CONCURRENCY` | dawarich-sidekiq | 3 | Sidekiq threads |
| `OTP_ENCRYPTION_KEY_DERIVATION_SALT` | dawarich-sidekiq | - | Must match the web service |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | postgis | dawarich | Database created on first boot |
| `POSTGRES_USER` | postgis | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | postgis | (secret) | Superuser password |
| `PORT` | dawarich | 3000 | Puma listening port |
| `RAILS_ENV` | dawarich | production | Rails environment |
| `REDIS_URL` | dawarich | - | Queue, cache and live updates |
| `TIME_ZONE` | dawarich | UTC | Timezone for dates and statistics |
| `AWS_BUCKET` | dawarich | - | Bucket name |
| `AWS_REGION` | dawarich | - | Bucket region |
| `SELF_HOSTED` | dawarich | true | Enables the self-hosted feature set |
| `DATABASE_HOST` | dawarich | postgis.railway.internal | Private PostGIS hostname |
| `DATABASE_NAME` | dawarich | - | Application database |
| `DATABASE_PORT` | dawarich | 5432 | PostGIS port |
| `STORE_GEODATA` | dawarich | true | Keep raw geocoding responses |
| `SECRET_KEY_BASE` | dawarich | (secret) | Rails signing and encryption key |
| `STORAGE_BACKEND` | dawarich | s3 | Store uploads in object storage |
| `WEB_CONCURRENCY` | dawarich | 2 | Puma worker processes |
| `AWS_ENDPOINT_URL` | dawarich | - | S3-compatible endpoint |
| `APPLICATION_HOSTS` | dawarich | - | Hostnames the app answers on |
| `AWS_ACCESS_KEY_ID` | dawarich | - | Bucket access key |
| `DATABASE_PASSWORD` | dawarich | (secret) | Database password |
| `DATABASE_USERNAME` | dawarich | (secret) | Database role |
| `RAILS_MAX_THREADS` | dawarich | 5 | Puma threads per worker, and the DB pool size |
| `RAILS_LOG_TO_STDOUT` | dawarich | true | Send logs to the deploy log |
| `APPLICATION_PROTOCOL` | dawarich | https | Enables HSTS and secure cookies |
| `DAWARICH_ADMIN_EMAIL` | dawarich | admin@example.com | First admin account, seeded on first boot |
| `AWS_SECRET_ACCESS_KEY` | dawarich | (secret) | Bucket secret key |
| `DAWARICH_ADMIN_PASSWORD` | dawarich | (secret) | First admin password, change after signing in |
| `OTP_ENCRYPTION_PRIMARY_KEY` | dawarich | - | Two-factor secret encryption key |
| `OTP_ENCRYPTION_DETERMINISTIC_KEY` | dawarich | - | Two-factor deterministic key |
| `ALLOW_EMAIL_PASSWORD_REGISTRATION` | dawarich | (secret) | Keep public signup closed |
| `OTP_ENCRYPTION_KEY_DERIVATION_SALT` | dawarich | - | Two-factor key derivation salt |

## Configuration

- **Start command:** `railway-entrypoint.sh sidekiq-entrypoint.sh`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh postgres -c data_directory=/var/lib/postgresql/data/pgdata -c listen_addresses=*`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `railway-entrypoint.sh web-entrypoint.sh rails server -b ::`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Ruby, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/dawarich-timeline)
