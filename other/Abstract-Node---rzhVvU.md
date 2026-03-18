# Deploy Abstract Node on Railway

Abstract Mainnet External Node

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rzhVvU)

## About

This Railway template sets up a fully functional Abstract Mainnet node with minimal configuration, providing everything you need to get started quickly. It includes:

### Abstract Mainnet External Node
A ready-to-run mainnet node that connects to the Abstract blockchain network. It syncs the latest state and participates in network operations, making it ideal for interacting with contracts, querying state, or supporting frontend applications.

### PostgreSQL Database
A preconfigured PostgreSQL instance used for indexing and storing chain data.

---
### Configuration
The node is configured by default to use llamarpc public RPC for ETH L1. It is recommended to update the `EN_ETH_CLIENT_URL` variable to a private RPC for higher reliability.

By default the node will utilize a snapshot for fast syncing. To disable snapshot and sync from genesis (can take several days) set the `EN_SNAPSHOTS_RECOVERY_ENABLED` variable to `false`

--- 
### Features
- One-click deployment via Railway
- Automatic connection between the node and Postgres
- Preloaded environment variables for fast setup
- Scalable infrastructure for production-ready use

### Ideal For
- Developers building on the Abstract mainnet
- Projects needing a reliable backend connection to Abstract
- Anyone who wants to explore or interact with the Abstract chain data

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| abstract-node | `matterlabs/external-node:v29.1.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Postgres DB Name |
| `DATABASE_URL` | Postgres | - | Postgres DB URL |
| `POSTGRES_USER` | Postgres | (secret) | Postgres Username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres Password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Databse Public URL |
| `RUST_LOG` | abstract-node | warn,zksync=info,zksync_core::metadata_calculator=debug,zksync_state=debug,zksync_utils=debug,zksync_web3_decl::client=error | Logging Options |
| `EN_WS_PORT` | abstract-node | 3061 | Websocket RPC Port |
| `DATABASE_URL` | abstract-node | - | Postgres Database URL |
| `EN_HTTP_PORT` | abstract-node | 3060 | HTTP RPC Port |
| `EN_L1_CHAIN_ID` | abstract-node | 1 | ETH Mainnet Chain ID |
| `EN_L2_CHAIN_ID` | abstract-node | 2741 | Abstract Chain ID |
| `EN_MAIN_NODE_URL` | abstract-node | https://api.mainnet.abs.xyz | Abstract Main Node URL |
| `EN_ETH_CLIENT_URL` | abstract-node | https://eth.llamarpc.com | ETH L1 RPC URL |
| `DATABASE_POOL_SIZE` | abstract-node | 10 | Postgres Database Pool Size |
| `EN_PROMETHEUS_PORT` | abstract-node | 3322 | Metrics Port |
| `EN_HEALTHCHECK_PORT` | abstract-node | 3081 | Healthcheck Port |
| `EN_MERKLE_TREE_PATH` | abstract-node | ./db/ext-node/lightweight | Lightweight Storage Path |
| `EN_STATE_CACHE_PATH` | abstract-node | ./db/ext-node/state_keeper | Statekeeper Cache Storage Path |
| `EN_GAS_PRICE_SCALE_FACTOR` | abstract-node | 1.5 | Gas Price Scaling Factor |
| `EN_ESTIMATE_GAS_SCALE_FACTOR` | abstract-node | 1.3 | Gas Estimation Scaling Factor |
| `EN_SNAPSHOTS_RECOVERY_ENABLED` | abstract-node | true | Indicates if snapshot recovery should be used |
| `EN_SNAPSHOTS_OBJECT_STORE_MODE` | abstract-node | GCSAnonymousReadOnly | GCS Object Storage Mode |
| `EN_ESTIMATE_GAS_ACCEPTABLE_OVERESTIMATION` | abstract-node | 5000 | Acceptable Gas Overestimation Level |
| `EN_SNAPSHOTS_OBJECT_STORE_BUCKET_BASE_URL` | abstract-node | raas-abstract-mainnet-external-node-snapshots | Bucket URL for Snapshot Recovery |

## Configuration

- **Start command:** `wrapper.sh postgres --port=5432 -c max_connections=200 -c log_error_verbosity=terse -c shared_buffers=2GB -c effective_cache_size=4GB -c maintenance_work_mem=1GB -c checkpoint_completion_target=0.9 -c random_page_cost=1.1 -c effective_io_concurrency=200 -c min_wal_size=4GB -c max_wal_size=16GB -c max_worker_processes=16 -c checkpoint_timeout=1800`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/rzhVvU)
