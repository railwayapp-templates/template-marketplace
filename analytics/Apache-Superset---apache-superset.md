# Deploy Apache Superset on Railway

Self-host Apache Superset BI with workers, PostgreSQL and Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-superset)

## About

Apache Superset is an open-source business intelligence platform for exploring data with SQL, building charts and assembling dashboards on top of any database you can reach. It began at Airbnb, is now a top-level Apache project, and is used by data teams who want Tableau- or Looker-class exploration without per-seat licensing. Analysts write SQL in a browser IDE, save results as datasets, turn those into charts across roughly fifty visualization types, and publish dashboards with cross-filters.

Self-host Superset on Railway in the shape its maintainers document for production, not one all-in-one container: a gunicorn web tier serving the UI and API, a Celery worker running asynchronous SQL Lab queries and reports, a beat scheduler firing those jobs, PostgreSQL for metadata, and Redis for the queue, query cache and SQL Lab results. Only the web service is public; everything else stays on Railway's private network.

![Apache Superset Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786648186/8f87a6e8-3b9d-4d96-aca2-182255e660ce.png)

Superset sits between your databases and the people who need answers from them. It does not copy your data; it issues SQL against the warehouses you connect and caches the results, so database access stays yours.

Key features:

- **SQL Lab** — a browser SQL IDE with schema browsing, query history and asynchronous execution
- **No-code chart builder** — around fifty visualizations, time series to geospatial
- **Dashboards** — drag-and-drop layouts with cross-filters, tabs and drill-to-detail
- **Security model** — role-based access and row-level security that rewrites queries per user
- **Alerts and reports** — scheduled SQL conditions and digests by email or Slack
- **Broad database support** — PostgreSQL, MySQL, BigQuery, Snowflake, ClickHouse, Trino and any SQLAlchemy dialect

The services divide the work cleanly. The web tier answers browser and API traffic. Redis is both the Celery broker and the cache, which is what lets the web tier read results the worker produced. The worker runs whatever should not block a request: asynchronous queries, report delivery, cache warm-up. Beat is the clock, and runs as one instance because two schedulers would fire every job twice.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| superset-worker | [gridalpha/superset-railway](https://github.com/gridalpha/superset-railway) | Worker |
| superset-beat | [gridalpha/superset-railway](https://github.com/gridalpha/superset-railway) | Database |
| superset | [gridalpha/superset-railway](https://github.com/gridalpha/superset-railway) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `REDIS_URL` | superset-worker | - | Cache, queue and results backend |
| `DATABASE_URL` | superset-worker | - | Metadata database connection |
| `SUPERSET_ROLE` | superset-worker | worker | Selects the Celery worker process |
| `SUPERSET_PUBLIC_URL` | superset-worker | - | Link base in report emails |
| `SUPERSET_SECRET_KEY` | superset-worker | (secret) | Shared with the web service |
| `SUPERSET_WEB_SERVICE` | superset-worker | superset | Private hostname of the web service |
| `REDIS_URL` | superset-beat | - | Cache, queue and results backend |
| `DATABASE_URL` | superset-beat | - | Metadata database connection |
| `SUPERSET_ROLE` | superset-beat | beat | Selects the Celery beat scheduler |
| `SUPERSET_PUBLIC_URL` | superset-beat | - | Link base in report emails |
| `SUPERSET_SECRET_KEY` | superset-beat | (secret) | Shared with the web service |
| `SUPERSET_WEB_SERVICE` | superset-beat | superset | Private hostname of the web service |
| `PORT` | superset | 8088 | HTTP listening port |
| `REDIS_URL` | superset | - | Cache, queue and results backend |
| `ADMIN_EMAIL` | superset | admin@example.com | First administrator email |
| `DATABASE_URL` | superset | - | Metadata database connection |
| `SUPERSET_ROLE` | superset | web | Selects the gunicorn web process |
| `ADMIN_PASSWORD` | superset | (secret) | First administrator password |
| `ADMIN_USERNAME` | superset | (secret) | First administrator username |
| `SUPERSET_SECRET_KEY` | superset | (secret) | Encrypts stored database passwords |
| `SUPERSET_WEB_SERVICE` | superset | superset | Private hostname of the web service |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/superset_home`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Analytics · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/apache-superset)
