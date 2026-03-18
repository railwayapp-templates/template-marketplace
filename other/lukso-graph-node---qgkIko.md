# Deploy lukso-graph-node on Railway

A easy way to deploy your own graph node for LUKSO blockchain.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qgkIko)

## About

This template deploys:

- Postgres databased (required to run the graph-node)
- IPFS node (required to run the graph-node)
- The graph-node itself connected to the Postgres database and to the IPFS node.

Disclaimers:

- Exposing port 5001 for IPFS is a security issue, it's the API of the IPFS daemon and should not be exposed to other than localhost.

- Exposing the port 8020 for the graph-node is a security issue, it's an administration port, used to manage the subgraphs deployments, it should be kept locked down.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| IPFS | [chillwhales/kubo](https://github.com/chillwhales/kubo) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| graph-node | `graphprotocol/graph-node` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ipfs_api` | IPFS | - | The private DNS name of the service. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `POSTGRES_INITDB_ARGS` | Postgres | --encoding=UTF-8 --lc-collate=C --lc-ctype=C | - |
| `ethereum` | graph-node | lukso-mainnet:https://rpc.lukso.sigmacore.io | - |
| `postgres_user` | graph-node | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Go, Shell, Makefile, Dockerfile, Python, PureBasic

[View on Railway →](https://railway.com/deploy/qgkIko)
