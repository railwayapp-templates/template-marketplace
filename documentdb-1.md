# Deploy DocumentDB on Railway

This template deploys the latest official DocumentDB image on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/documentdb-1)

## About

**DocumentDB** is a powerful, scalable, MongoDB-compatible open-source document database built on PostgreSQL.

You can connect just like you would with MongoDB:

```python
from pymongo import MongoClient, AsyncMongoClient

mongo_client: MongoClient = MongoClient(MONGO_URL)
```

Set the environment variable:

```bash
MONGO_URL=${{documentdb.PRIVATE_URL}}
```

If you prefer, you can also use:

```bash
MONGO_URL=${{documentdb.URL}}
```

⚠️ Note: Using the public `URL` incurs **egress costs**. The `PRIVATE_URL` avoids this when used inside Railway’s network.

---

Deploying DocumentDB on Railway involves:

* Creating a **service** (DocumentDB instance)
* Attaching a **volume** for persistent storage

This setup ensures your data remains safe and accessible across deployments.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| documentdb | `ghcr.io/microsoft/documentdb/documentdb-local:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `URL` | - | Public URL (i.e. Mongo Compass compatible) |
| `PASSWORD` | (secret) | MongoDB Password |
| `USERNAME` | (secret) | MongoDB Username |
| `PGOPTIONS` | -c | Options to customize Postgresql start |
| `POSTGRES_DB` | default | Database Name |
| `PRIVATE_URL` | - | Private URL to save on Egress |
| `PUBLIC_PORT` | - | The external port for the TCP Proxy. |
| `POSTGRES_USER` | (secret) | Postgresql User |
| `PUBLIC_DOMAIN` | - | The public TCP proxy domain for the service. |
| `PRIVATE_DOMAIN` | - | The private DNS name of the service. |
| `POSTGRES_PASSWORD` | (secret) | Postgersql Password |
| `POSTGRES_INITDB_ARGS` | --encoding=UTF-8 --lc-collate=C --lc-ctype=C | Args supplied to the Postgresql initialization |

## Configuration

- **TCP Proxies:** 10260
- **Volume:** `/home/documentdb/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/template/documentdb-1)
