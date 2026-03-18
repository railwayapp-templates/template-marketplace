# Deploy pre-scouting-app on Railway

Pre-scouting app for FRC.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/EphMDM)

## About

Pre-scouting app is a way to pre-scout for FRC (_**FIRST**_ Robotics Competition) events. It uses pre compiled data from APIs like The Blue Alliance and Statbotics, and you and your team's your own, team-specific, data, all in one app.

* [GitHub Repo](https://github.com/salvobonsma/pre-scouting-app)
* [Installation Guide](https://github.com/salvobonsma/pre-scouting-app/wiki/Installation-Guide)
* [General Guide](https://github.com/salvobonsma/pre-scouting-app/wiki/Guide)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pre-scouting-app | [salvobonsma/pre-scouting-app](https://github.com/salvobonsma/pre-scouting-app) | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TBA_KEY` | pre-scouting-app | - | API key from The Blue Alliance |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/EphMDM)
