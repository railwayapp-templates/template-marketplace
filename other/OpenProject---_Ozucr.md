# Deploy OpenProject on Railway

OpenProject is a project management software with a focus on sovereignty

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_Ozucr)

## About

# Open Project

This templates includes Open project containers with Memecached and Postgres as Database. 

Go to https://www.openproject.org/docs/installation-and-operations/installation/docker/ for additional instructions

## Next steps 

Some additional envs are required for sending emails.

## Micro-services

If you'd like to deploy a worker based installation refers to 
[https://railway.app/template/8HXd2f?referralCode=rSsrie](https://railway.app/template/8HXd2f?referralCode=rSsrie)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| OpenProject | `openproject/openproject:14.4.2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `OPENPROJECT_HTTPS` | OpenProject | true | - |
| `OPENPROJECT_SECRET_KEY_BASE` | OpenProject | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/openproject/assets`

**Category:** Other

[View on Railway →](https://railway.com/deploy/_Ozucr)
