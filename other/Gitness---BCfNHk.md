# Deploy Gitness on Railway

Lightweight, fast code hosting and CI service (powered by Drone)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/BCfNHk)

## About

# Gitness Template

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/BCfNHk?referralCode=shixzie)

## Gitness Information

Your lightweight, super fast code hosting and continuous integration service (powered by Drone)

Gitness is building on top of Drone to create a new, open source developer platform with code hosting and pipeline capabilities. 

[Github Repo](https://github.com/harness/gitness)

[Web](https://gitness.com)

[Docs](https://docs.gitness.com/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gitness | `harness/gitness` | Web service |
| GitnessPg | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Gitness | 3000 | - |
| `GITNESS_DATABASE_DRIVER` | Gitness | postgres | - |
| `GITNESS_ENCRYPTER_SECRET` | Gitness | (secret) | - |
| `GITNESS_REGISTRY_HTTP_SECRET` | Gitness | (secret) | - |
| `POSTGRES_DB` | GitnessPg | railway | Default database created when image is started. |
| `DATABASE_URL` | GitnessPg | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | GitnessPg | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | GitnessPg | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | GitnessPg | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/BCfNHk)
