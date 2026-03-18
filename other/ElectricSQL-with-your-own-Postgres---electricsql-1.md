# Deploy ElectricSQL with your own Postgres on Railway

Electric for your existing Postgres. Sync little subsets of your data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/electricsql-1)

## About

Sync makes apps awesome.
Electric solves sync. https://electric-sql.com

Enable replication in Postgres using the following SQL command
```
ALTER SYSTEM SET wal_level = 'logical';
SELECT pg_reload_conf();
```
restart the db, that's it!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| electric | `electricsql/electric:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATABASE_URL` | - | Postgres database URL; Fill anything, can be updated later |
| `ELECTRIC_SECRET` | (secret) | Secret used to connect to ElectricSQL; Make it long! |
| `ELECTRIC_STORAGE_DIR` | /var/lib/electric/persistent | Persistent data location |
| `ELECTRIC_LISTEN_ON_IPV6` | true | Required for private networking since railway.internal is ipv6 |
| `ELECTRIC_DATABASE_USE_IPV6` | true | Enables IPV6 connection |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/electric/persistent`

**Category:** Other

[View on Railway →](https://railway.com/deploy/electricsql-1)
