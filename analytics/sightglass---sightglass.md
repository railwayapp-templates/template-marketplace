# Deploy sightglass on Railway

A self-hosted Steam market analysis & charting platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sightglass)

## About

Sightglass is a self-hosted platform for analyzing over 150,000 Steam games &amp; demos. Own data for game reviews, tags, estimated revenue, languages, release dates, and more. Built for developers, publishers, and marketers who need high customizability and efficiency.

Sightglass runs on a client-server architecture, with a PostgreSQL database for storing data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sightglass-server | `spec88/sightglass-server:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| sightglass-client | `spec88/sightglass-client:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | sightglass-server | 3000 | The port that the server will use. |
| `DATABASE_URL` | sightglass-server | - | The URL the server will use to make a connection to the database. |
| `CLIENT_ORIGIN` | sightglass-server | - | Allows traffic only from the client origin. |
| `POSTGRES_DB` | Postgres | sightglass | The database that will be used. |
| `DATABASE_URL` | Postgres | - | The URL used to connect to the database. |
| `POSTGRES_USER` | Postgres | (secret) | The user of the database. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | The database password. |
| `SERVER_API_URL` | sightglass-client | - | The URL the client will use to make API calls. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/sightglass)
