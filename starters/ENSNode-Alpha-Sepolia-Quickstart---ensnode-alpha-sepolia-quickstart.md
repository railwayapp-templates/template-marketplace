# Deploy ENSNode Alpha-Sepolia Quickstart on Railway

The full-stack development platform for ENSv2.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ensnode-alpha-sepolia-quickstart)

## About

[ENSNode](https://ensnode.io) is the full-stack development platform for [ENSv2](https://ens.domains/ensv2).

ENSNode is a development platform built from multiple services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ENSApi | `ghcr.io/namehash/ensnode/ensapi:latest` | Web service |
| ENSIndexer | `ghcr.io/namehash/ensnode/ensindexer:latest` | Worker |
| ENSRainbow | `ghcr.io/namehash/ensnode/ensrainbow:latest` | Database |
| ENSDb Server | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| ENSAdmin | `ghcr.io/namehash/ensnode/ensadmin:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENSDB_URL` | ENSApi | - | URL for the co-located server hosting ENSDb instance. |
| `ALCHEMY_API_KEY` | ENSApi | (secret) | Your API key for the Alchemy RPC. |
| `ENSINDEXER_SCHEMA_NAME` | ENSApi | ensdb_writer_0 | The name of ENSDb Writer Schema in ENSDb.  _MUST_ be same as the one configured in the _ENSIndexer instance_. |
| `PLUGINS` | ENSIndexer | unigraph,subgraph,protocol-acceleration,basenames,lineanames,registrars | ENSNode Plugins to be activated. |
| `ENSDB_URL` | ENSIndexer | - | URL for the co-located server hosting ENSDb instance. |
| `NAMESPACE` | ENSIndexer | sepolia | The ENS namespace, identifies which ENS protocol deployment ENSNode will provide data for (ex: mainnet or sepolia). |
| `LABEL_SET_ID` | ENSIndexer | searchlight | The label set ID to be applied for ENSRainbow requests. |
| `ENSRAINBOW_URL` | ENSIndexer | - | URL for the co-located ENSRainbow instance. |
| `ALCHEMY_API_KEY` | ENSIndexer | (secret) | Your API key for the Alchemy RPC. |
| `LABEL_SET_VERSION` | ENSIndexer | 1 | The label set verion to be applied for ENSRainbow requests. |
| `ENSINDEXER_SCHEMA_NAME` | ENSIndexer | ensdb_writer_0 | The name of ENSDb Writer Schema in ENSDb where ENSIndexer will store indexed data. |
| `LOG_LEVEL` | ENSRainbow | info | - |
| `LABEL_SET_ID` | ENSRainbow | searchlight | - |
| `DB_SCHEMA_VERSION` | ENSRainbow | 3 | - |
| `LABEL_SET_VERSION` | ENSRainbow | 1 | - |
| `POSTGRES_DB` | ENSDb Server | railway | Default database created when image is started. |
| `DATABASE_URL` | ENSDb Server | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | ENSDb Server | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | ENSDb Server | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | ENSDb Server | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/app/apps/ensrainbow/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/ensnode-alpha-sepolia-quickstart)
