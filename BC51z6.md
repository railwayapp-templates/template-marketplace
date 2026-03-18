# Deploy ExpressJS on Railway

An ExpressJS app using the Pug view engine connected to a Postgres database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/BC51z6)

## About

# ExpressJS Example

This example starts an [ExpressJS](https://expressjs.com/) server using a Pug view engine connected to a Postgres database.

## ✨ Features

- Express
- JavaScript
- Pug
- Database

## 💁‍♀️ How to use

- Install dependencies `npm install`
- Connect to your Railway project `railway link`
- Start the server `railway run npm start`

## 📝 Notes

The server started returns a timestamp from the database via a page using the Pug view engine.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Express | [unicodeveloper/deploy-express-on-railway](https://github.com/unicodeveloper/deploy-express-on-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** JavaScript, Pug, CSS

[View on Railway →](https://railway.com/template/BC51z6)
