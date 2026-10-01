# Deploy DevTrack with PostgreSQL on Railway

Full-stack development tracking app with PostgreSQL database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/devtrack-with-postgresql)

## About

Your deployment runs on Railway's infrastructure with:
- Automatic SSL certificate generation for database connections
- Private network communication between services
- Persistent volume for database data
- Restart policies to ensure uptime
- Environment-based configuration for flexibility

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| DevTrack | [2007abdullah/DevTrack](https://github.com/2007abdullah/DevTrack) (branch: devtrack) (root: devtrack/backend) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | - | Initial database to create |
| `DATABASE_URL` | - | Connection string for applications |
| `POSTGRES_USER` | (secret) | PostgreSQL superuser username |
| `POSTGRES_PASSWORD` | (secret) | PostgreSQL superuser password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Tags:** development, tracking, postgres, fullstack · **Languages:** JavaScript, Python, CSS, Dockerfile, HTML, Mako

[View on Railway →](https://railway.com/deploy/devtrack-with-postgresql)
