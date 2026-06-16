# Deploy ENSNode Quickstart on Railway

The full-stack development platform for ENSv2

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ensnode-alpha)

## About

[ENSNode](https://ensnode.io) is the full-stack development platform for [ENSv2](https://ens.domains/ensv2).

ENSNode is a development platform built from multiple services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ENSDb Server | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| ENSIndexer | `ghcr.io/namehash/ensnode/ensindexer:latest` | Worker |
| ENSApi | `ghcr.io/namehash/ensnode/ensapi:latest` | Web service |
| ENSRainbow | `ghcr.io/namehash/ensnode/ensrainbow:latest` | Database |
| ENSAdmin | `ghcr.io/namehash/ensnode/ensadmin:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | ENSDb Server | railway | Default database created when image is started. |
| `DATABASE_URL` | ENSDb Server | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | ENSDb Server | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | ENSDb Server | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | ENSDb Server | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PLUGINS` | ENSIndexer | unigraph,subgraph,protocol-acceleration,basenames,lineanames,threedns,registrars,tokenscope | ENSNode Plugins to be activated. |
| `ENSDB_URL` | ENSIndexer | - | URL for the co-located server hosting ENSDb instance. |
| `NAMESPACE` | ENSIndexer | mainnet | The ENS namespace, identifies which ENS protocol deployment ENSNode will provide data for (ex: mainnet or sepolia). |
| `LABEL_SET_ID` | ENSIndexer | searchlight | The label set ID to be applied for ENSRainbow requests. |
| `ENSRAINBOW_URL` | ENSIndexer | - | URL for the co-located ENSRainbow instance. |
| `ALCHEMY_API_KEY` | ENSIndexer | (secret) | Your API key for the Alchemy RPC. |
| `LABEL_SET_VERSION` | ENSIndexer | 1 | The label set verion to be applied for ENSRainbow requests. |
| `ENSINDEXER_SCHEMA_NAME` | ENSIndexer | ensdb_writer_0 | The name of ENSDb Writer Schema in ENSDb where ENSIndexer will store indexed data. |
| `ENSDB_URL` | ENSApi | - | URL for the co-located server hosting ENSDb instance. |
| `ALCHEMY_API_KEY` | ENSApi | (secret) | Your API key for the Alchemy RPC. |
| `THEGRAPH_API_KEY` | ENSApi | (secret) | The Graph Subgraph API Fallback. |
| `ENSINDEXER_SCHEMA_NAME` | ENSApi | ensdb_writer_0 | The name of ENSDb Writer Schema in ENSDb.  _MUST_ be same as the one configured in the _ENSIndexer instance_. |
| `REFERRAL_PROGRAM_EDITIONS` | ENSApi | - | Referral Program Edition Config Set Definition. For example, `https://ensawards.org/production-editions.json`. |
| `LOG_LEVEL` | ENSRainbow | info | - |
| `LABEL_SET_ID` | ENSRainbow | subgraph | - |
| `DB_SCHEMA_VERSION` | ENSRainbow | 3 | - |
| `LABEL_SET_VERSION` | ENSRainbow | 0 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/apps/ensrainbow/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/ensnode-alpha)
