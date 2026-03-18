# Deploy EFP-Silo on Railway

Backend Infrastructure for the Ethereum Follow Protocol

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pDGEZm)

## About

This template will setup all the necessary services for processing, storing and reading data for the Ethereum Follow Protocol.  It includes the following services:

   - Database (Postgres)
   - PGBouncer (a connection pooler for Postgres)
   - Indexers for Base, Optimism and Ethereum Mainnet
   - Service Manager (updates ens data, leaderboard, cache, mutuals counts)
   - API (Can be deployed as a cloudflare worker)
   - Redis Cache for the API

Further explanation and deployment instructions can be found in the EFP docs:

https://docs.ethfollow.xyz/production/silo

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| indexer-eth | [ethereumfollowprotocol/indexer](https://github.com/ethereumfollowprotocol/indexer) (branch: develop) | Worker |
| indexer-base | [ethereumfollowprotocol/indexer](https://github.com/ethereumfollowprotocol/indexer) (branch: develop) | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |
| pgbouncer | `bitnami/pgbouncer` | Worker |
| enstate | `ghcr.io/v3xlabs/enstate:sha-f80a1d1` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| services | [ethereumfollowprotocol/services](https://github.com/ethereumfollowprotocol/services) | Worker |
| api | [ethereumfollowprotocol/api](https://github.com/ethereumfollowprotocol/api) (branch: develop) | Web service |
| indexer-op | [ethereumfollowprotocol/indexer](https://github.com/ethereumfollowprotocol/indexer) (branch: develop) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CHAIN_ID` | indexer-eth | 1 | - |
| `NODE_ENV` | indexer-eth | production | - |
| `BATCH_SIZE` | indexer-eth | 500 | - |
| `START_BLOCK` | indexer-eth | 20820000 | - |
| `RECORDS_ONLY` | indexer-eth | true | - |
| `HEARTBEAT_URL` | indexer-eth | unset | - |
| `RECOVER_HISTORY` | indexer-eth | true | - |
| `EFP_CONTRACT_LIST_RECORDS` | indexer-eth | 0x5289fE5daBC021D02FDDf23d4a4DF96F4E0F17EF | - |
| `CHAIN_ID` | indexer-base | 8453 | - |
| `NODE_ENV` | indexer-base | production | - |
| `BATCH_SIZE` | indexer-base | 500 | - |
| `START_BLOCK` | indexer-base | 20180000 | - |
| `NODE_OPTIONS` | indexer-base | --no-warnings | - |
| `RECORDS_ONLY` | indexer-base | false | - |
| `HEARTBEAT_URL` | indexer-base | unset | - |
| `RECOVER_HISTORY` | indexer-base | true | - |
| `EFP_CONTRACT_LINT_MINTER` | indexer-base | 0xDb17Bfc64aBf7B7F080a49f0Bbbf799dDbb48Ce5 | - |
| `EFP_CONTRACT_LIST_RECORDS` | indexer-base | 0x41Aa48Ef3c0446b46a5b1cc6337FF3d3716E2A33 | - |
| `EFP_CONTRACT_LIST_REGISTRY` | indexer-base | 0x0E688f5DCa4a0a4729946ACbC44C792341714e08 | - |
| `EFP_CONTRACT_ACCOUNT_METADATA` | indexer-base | 0x5289fE5daBC021D02FDDf23d4a4DF96F4E0F17EF | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `POSTGRESQL_PORT` | pgbouncer | 5432 | - |
| `PGBOUNCER_POOL_MODE` | pgbouncer | transaction | - |
| `POSTGRESQL_PASSWORD` | pgbouncer | (secret) | - |
| `POSTGRESQL_USERNAME` | pgbouncer | (secret) | - |
| `PGBOUNCER_QUERY_TIMEOUT` | pgbouncer | 15 | - |
| `PGBOUNCER_LISTEN_ADDRESS` | pgbouncer | * | - |
| `PGBOUNCER_MAX_CLIENT_CONN` | pgbouncer | 5000 | - |
| `PGBOUNCER_DEFAULT_POOL_SIZE` | pgbouncer | 50 | - |
| `OPENSEA_API_KEY` | enstate | (secret) | - |
| `UNIVERSAL_RESOLVER` | enstate | 0xce01f8eee7E479C928F8919abD53E553a36CeF67 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | services | production | - |
| `NODE_OPTIONS` | services | --no-warnings | - |
| `HEARTBEAT_URL` | services | unset | - |
| `GITHUB_LIST_PATH` | services | unset | - |
| `EFP_CACHE_INTERVAL` | services | 7200000 | - |
| `HEARTBEAT_INTERVAL` | services | 290000 | - |
| `GITHUB_ACCESS_TOKEN` | services | (secret) | - |
| `EFP_MUTUALS_INTERVAL` | services | 973000 | - |
| `ENSMETADATA_INTERVAL` | services | 41600000 | - |
| `RECOMMENDED_INTERVAL` | services | 4260000 | - |
| `ENABLE_DATABASE_LOGGING` | services | true | - |
| `RECENT_FOLLOWS_INTERVAL` | services | 2850000 | - |
| `LEADERBOARD_RANKING_INTERVAL` | services | 960000 | - |
| `CACHE_TTL` | api | 300 | - |
| `ALLOW_TTL_MOD` | api | false | - |
| `POAP_API_TOKEN` | api | (secret) | - |
| `CHAIN_ID` | indexer-op | 10 | - |
| `NODE_ENV` | indexer-op | production | - |
| `BATCH_SIZE` | indexer-op | 500 | - |
| `START_BLOCK` | indexer-op | 125790000 | - |
| `RECORDS_ONLY` | indexer-op | true | - |
| `HEARTBEAT_URL` | indexer-op | unset | - |
| `RECOVER_HISTORY` | indexer-op | true | - |
| `EFP_CONTRACT_LIST_RECORDS` | indexer-op | 0x4Ca00413d850DcFa3516E14d21DAE2772F2aCb85 | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** PLpgSQL, TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pDGEZm)
