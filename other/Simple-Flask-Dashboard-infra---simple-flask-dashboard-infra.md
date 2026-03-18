# Deploy Simple Flask Dashboard infra on Railway

Quickly Create Infrastructure for Deploying Flask Based Dashboard Apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/simple-flask-dashboard-infra)

## About

Hosting a **Simple Flask Dashboard infra** on Railway is straightforward and developer-friendly. Start with a GitHub repo containing your Flask app (using blueprints for modularity, `requirements.txt` for deps like Flask, Gunicorn, SQLAlchemy, and optionally Flask-Login). Railway auto-detects Python apps, runs `pip install`, configures Gunicorn as the WSGI server (via `Procfile`: `web: gunicorn app:app`), provisions a public domain, and manages builds/deployments on every git push. Add a PostgreSQL database in one click for persistent data (replacing default SQLite), set env vars for secrets (e.g., `DATABASE_URL`, `SECRET_KEY`), and scale vertically/horizontally with zero server config. This enables rapid deployment of full-stack admin dashboards — from MVP prototypes to production internal tools — in minutes, eliminating traditional DevOps burdens like Nginx setup or manual scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| heroic-friendship | [Office-Design-Group/odg-project-consolidation](https://github.com/Office-Design-Group/odg-project-consolidation) (root: /dashboard) | Web service |
| Redis | `redis:8.2.1` | Database |
| zestful-trust | [Office-Design-Group/odg-project-consolidation](https://github.com/Office-Design-Group/odg-project-consolidation) (root: /dashboard) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | heroic-friendship | (secret) |
| `REDIS_PASSWORD` | heroic-friendship | (secret) |
| `POSTGRES_PASSWORD` | heroic-friendship | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `SECRET_KEY` | zestful-trust | (secret) |
| `POSTGRES_USER` | zestful-trust | (secret) |
| `REDISPASSWORD` | zestful-trust | (secret) |
| `POSTGRES_PASSWORD` | zestful-trust | (secret) |
| `SECRET_KEY` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `celery -A celery_app:celery worker --loglevel=info`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/simple-flask-dashboard-infra)
