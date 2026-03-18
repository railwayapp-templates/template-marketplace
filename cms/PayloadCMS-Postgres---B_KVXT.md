# Deploy PayloadCMS + Postgres on Railway

PayloadCMS v2 with PostgreSQL Database Service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/B_KVXT)

## About

# Payload CMS v2 with PostgreSQL Database


[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/B_KVXT?referralCode=1-iY_G)

The original project was created using `npx create-payload-app` and used the blank template.

## How to Use Locally with Remote PostgreSQL Database
> Following these instructions will have the application pointing to the hosted PostgreSQL database
- `yarn install` to install the needed dependencies
- Install and configure the [Railway CLI](https://docs.railway.app/develop/cli)
- `railway run yarn dev` will start up your application and reload on any changes. At this point changes in the schema will be automatically updated in the remote PostgreSQL database
-  to create migration before committing your code `railway run yarn payload migrate:create`

## How to Use Locally with Local PostgreSQL Database
- `yarn install` to install the needed dependencies
- Create your own local Postgres Database and update the `.env` file with the `DATABASE_URI`
- Set the other `.env` file variables
- `yarn dev` will start up your application and reload on any changes
- Payload will update the database schema locally so you will need to run `railway run yarn payload migrate:create` before committing to GitHub so the schema changes get committed. The deployment script will run the appropriate migrate command to push changes to the database


## PostgreSQL Information
- https://www.postgresql.org/download/
### How To Create a Local PostgreSQL Database

Open the terminal and run the command
```
sudo -u postgres psql
```

Create PostgreSQL Database
```
CREATE DATABASE myproject;
```

Create User
```
CREATE USER myprojectuser WITH PASSWORD 'password';
```

Update the `.env` file variable `DATABASE_URI` appropriately to point to the correct server

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| payload-railway-postgres | [aaronksaunders/payload-railway-postgres](https://github.com/aaronksaunders/payload-railway-postgres) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | payload-railway-postgres | 3000 | Port PayloadCMS Admin Is Running On |
| `DATABASE_URI` | payload-railway-postgres | - | URI to Postgres Database |
| `PAYLOAD_SECRET` | payload-railway-postgres | (secret) | Secret Value |
| `PAYLOAD_PUBLIC_SERVER_URL` | payload-railway-postgres | - | Exposed URL For Payload Admin Server  |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `yarn run serve`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, Shell

[View on Railway →](https://railway.com/deploy/B_KVXT)
