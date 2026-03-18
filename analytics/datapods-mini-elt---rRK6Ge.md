# Deploy datapods-mini-elt on Railway

Mini ETL Data Platform - Starting ETL Fast and Easy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rRK6Ge)

## About

_If you have been spent late night with data ingestion and data migration_

You are finding the project, template, starting point includes:

- lightweight setup for creating the development environment, testing environment, Proof of Concept, Proof of Service or even support for **Small Business**.

- with DataPods [DPs],  maximize the number of times to provision services for creating data transformations.

Checkout and star the git repository at: https://github.com/longbuivan/datapods-oss

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgadmin | `dpage/pgadmin4` | Web service |
| mageai | `longed/mageai` | Web service |
| grafana | `longed/grafana` | Web service |
| postgres | `longed/postgres` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | pgadmin | - | PG Admin PORT |
| `PGADMIN_LISTEN_PORT` | pgadmin | - | PG ADMIN LISTEN PORT |
| `PGADMIN_DEFAULT_EMAIL` | pgadmin | - | PG ADMIN DEFAULT EMAIL |
| `PGADMIN_LISTEN_ADDRESS` | pgadmin | - | PG ADMIN LISTEN ADDRESS |
| `PGADMIN_DISABLE_POSTFIX` | pgadmin | - | PG ADMIN POSTFIX Enable |
| `PGADMIN_DEFAULT_PASSWORD` | pgadmin | (secret) | PG ADMIN DEFAULT PASSWORD |
| `PORT` | mageai | - | Mage AI port |
| `MAGE_DATABASE_CONNECTION_URL` | mageai | - | PG DB URL |
| `POSTGRES_DB` | postgres | - | PG Database Name |
| `DATABASE_URL` | postgres | - | PG Database URL |
| `POSTGRES_USER` | postgres | (secret) | PG User Name |
| `POSTGRES_PASSWORD` | postgres | (secret) | PG Password |
| `DATABASE_PUBLIC_URL` | postgres | - | PG Public URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data/pgdata`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/rRK6Ge)
