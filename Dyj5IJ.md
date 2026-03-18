# Deploy thirdweb Insight on Railway

Simple & customizable endpoints for querying rich blockchain data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Dyj5IJ)

## About

<a rel="noopener noreferrer" href="https://thirdweb.com/engine">
  <img src="https://raw.githubusercontent.com/thirdweb-dev/.github/main/header-image.png" alt="thirdweb Engine banner" width="100%" height="auto" style="border-radius: 10px">
</a>

## Template

This is the **official community Railway template** for [thirdweb Insight](https://thirdweb.com/insight) maintained by the thirdweb community team. This template deploys [thirdweb Insight](https://hub.docker.com/r/thirdweb/insight), lets you retrieve blockchain data from any EVM chain, enrich it with metadata, and transform it using custom logic. This template also deploys a modified [Clickhouse Server](https://github.com/warengonzaga/thirdweb-insight-clickhouse-railway) database to create pre-defined tables for Insight to store data.

## Attention
To successfully deploy this template your account must be on the **hobby plan** or **higher**. If you are on the free plan, you can still deploy this template, but it will not work as expected. You can upgrade your account by going to the [Railway billing page](https://railway.app/billing).

### Requirements

- [Custom Clickhouse Server](https://github.com/warengonzaga/thirdweb-insight-clickhouse-railway) (v24.11+)
- thirdweb API Client. [[Get it here](https://thirdweb.com/dashboard/settings/api-keys)]
- RPC URL of the blockchain you want to index. [[Get it here](https://thirdweb.com/chains)]

## Overview

Insight is a powerful tool that lets you retrieve blockchain data from any EVM chain, enrich it with metadata, and transform it using custom logic. Whether you're building a gaming inventory system, tracking DeFi metrics, or analyzing NFT collections, Insight makes it easy to get the data you need with simple API calls.

## Why use Insight?

- It gives developers an easily understandable data API to query blockchain data.
- No need to index blockchains yourself or manage infrastructure and RPC costs.
- Transform and enrich data with custom Blueprints.
- Insight is open source.

## Cloud-Hosted Version

Are you looking for a managed thirdweb Insight? [Try Cloud-Hosted](https://portal.thirdweb.com/insight/get-started)!

## Documentation

For the complete documentation, please visit the [thirdweb Insight documentation](https://portal.thirdweb.com/insight).



## Support

If you need help, please submit a ticket to our [support site](https://thirdweb.com/support).

## Community

Join the vibrant thirdweb community to stay updated and connect with fellow Web3 developers!

- **[Discord](https://discord.gg/thirdweb)**: Engage in real-time discussions, get support, and share your projects.
- **[DailyDev Squad](https://app.daily.dev/squads/thirdweb)**: Stay updated with the latest web3 development news and updates.
- **[Reddit](https://www.reddit.com/r/thirdweb)**: Join our subreddit to participate in discussions, ask questions, and share insights.

We look forward to seeing you there!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Insight | `thirdweb/insight:latest` | Web service |
| Clickhouse | [warengonzaga/thirdweb-insight-railway](https://github.com/warengonzaga/thirdweb-insight-railway) (root: /services/clickhouse) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Insight | 3000 | Set the port for the API server to listen on. (Default: 3000) |
| `RPC_URL` | Insight | - | Set your RPC URL with your client ID here. e.g. `https://1.rpc.thirdweb.com/<client-id>` (Get your client ID from https://thirdweb.com/dashboard/settings/api-keys) |
| `LOG_LEVEL` | Insight | debug | Set the log level for the application. (Default: debug) |
| `LOG_PRETTY` | Insight | true | Set to true to enable pretty logging. (Default: true) |
| `POLLER_ENABLED` | Insight | true | Set to true to enable the poller. (Default: true) |
| `POLLER_INTERVAL` | Insight | 3000 | Set the interval for the poller in milliseconds. (Default: 3000) |
| `POLLER_FROMBLOCK` | Insight | 20000000 | Set the block number from which the poller should start. (Default: 20000000) |
| `COMMITTER_ENABLED` | Insight | true | Set to true to enable the committer. (Default: true) |
| `POLLER_UNTILBLOCK` | Insight | 20000010 | Set the block number until which the poller should run. (Default: 20000010) |
| `COMMITTER_INTERVAL` | Insight | 3000 | Set the interval for the committer in milliseconds. (Default: 3000) |
| `RPC_TRACES_ENABLED` | Insight | true | Set to true to enable traces indexing. (Default: true) |
| `COMMITTER_FROMBLOCK` | Insight | 20000000 | Set the block number from which the committer should start. (Default: 20000000) |
| `RPC_LOGS_BATCHDELAY` | Insight | 100 | Set the batch delay for logs indexing. (Default: 100) |
| `POLLER_BLOCKSPERPOLL` | Insight | 3 | Set the number of blocks per poll for the poller. (Default: 3) |
| `REORGHANDLER_ENABLED` | Insight | true | Set to true to enable the reorg handler. (Default: true) |
| `POLLER_FORCEFROMBLOCK` | Insight | false | Set to true to force the poller to start from a specific block. (Default: false) |
| `REORGHANDLER_INTERVAL` | Insight | 3000 | Set the interval for the reorg handler in milliseconds. (Default: 3000) |
| `RPC_BLOCKS_BATCHDELAY` | Insight | 100 | Set the batch delay for blocks indexing. (Default: 100) |
| `RPC_TRACES_BATCHDELAY` | Insight | 100 | Set the batch delay for traces indexing. (Default: 100) |
| `API_BASICAUTH_PASSWORD` | Insight | (secret) | Set your API Basic Auth password here. |
| `API_BASICAUTH_USERNAME` | Insight | (secret) | Set your API Basic Auth username here. |
| `REORGHANDLER_FROMBLOCK` | Insight | 20000000 | Set the block number from which the reorg handler should start. (Default: 20000000) |
| `FAILURERECOVERER_ENABLED` | Insight | true | Set to true to enable the failure recoverer. (Default: true) |
| `COMMITTER_BLOCKSPERCOMMIT` | Insight | 1000 | Set the number of blocks per commit for the committer. (Default: 1000) |
| `FAILURERECOVERER_INTERVAL` | Insight | 3000 | Set the interval for the failure recoverer in milliseconds. (Default: 3000) |
| `RPC_BLOCKRECEIPTS_ENABLED` | Insight | false | Set to true to enable block receipts indexing, please make sure your RPC supports this. (Default: true) |
| `RPC_LOGS_BLOCKSPERREQUEST` | Insight | 100 | Set the number of blocks per request for logs indexing. (Default: 100) |
| `REORGHANDLER_BLOCKSPERSCAN` | Insight | 1000 | Set the number of blocks per scan for the reorg handler. (Default: 1000) |
| `REORGHANDLER_FORCEFROMBLOCK` | Insight | true | Set to true to force the reorg handler to start from a specific block. (Default: true) |
| `RPC_BLOCKS_BLOCKSPERREQUEST` | Insight | 1000 | Set the number of blocks per request for blocks indexing. (Default: 1000) |
| `RPC_TRACES_BLOCKSPERREQUEST` | Insight | 100 | Set the number of blocks per request for traces indexing. (Default: 100) |
| `RPC_BLOCKRECEIPTS_BATCHDELAY` | Insight | 100 | Set the batch delay for block receipts indexing. (Default: 100) |
| `STORAGE_MAIN_CLICKHOUSE_HOST` | Insight | - | Set the host for the main Clickhouse storage. |
| `STORAGE_MAIN_CLICKHOUSE_PORT` | Insight | 9000 | Set the port for the main Clickhouse storage. (Default: 9000) |
| `FAILURERECOVERER_BLOCKSPERRUN` | Insight | 100 | Set the number of blocks per run for the failure recoverer. (Default: 100) |
| `STORAGE_STAGING_CLICKHOUSE_HOST` | Insight | - | Set the host for the staging Clickhouse storage. |
| `STORAGE_STAGING_CLICKHOUSE_PORT` | Insight | 9000 | Set the port for the staging Clickhouse storage. (Default: 9000) |
| `STORAGE_MAIN_CLICKHOUSE_DATABASE` | Insight | - | Set the database name for the main Clickhouse storage. |
| `STORAGE_MAIN_CLICKHOUSE_PASSWORD` | Insight | (secret) | Set the password for the main Clickhouse storage. |
| `STORAGE_MAIN_CLICKHOUSE_USERNAME` | Insight | (secret) | Set the username for the main Clickhouse storage. |
| `RPC_BLOCKRECEIPTS_BLOCKSPERREQUEST` | Insight | 100 | Set the number of blocks per request for block receipts indexing. (Default: 100) |
| `STORAGE_MAIN_CLICKHOUSE_DISABLETLS` | Insight | true | Set to true to disable TLS for the main Clickhouse storage. (Default: true) |
| `STORAGE_STAGING_CLICKHOUSE_DATABASE` | Insight | - | Set the database name for the staging Clickhouse storage. |
| `STORAGE_STAGING_CLICKHOUSE_PASSWORD` | Insight | (secret) | Set the password for the staging Clickhouse storage. |
| `STORAGE_STAGING_CLICKHOUSE_USERNAME` | Insight | (secret) | Set the username for the staging Clickhouse storage. |
| `STORAGE_ORCHESTRATOR_CLICKHOUSE_HOST` | Insight | - | Set the host for the orchestrator Clickhouse storage. |
| `STORAGE_ORCHESTRATOR_CLICKHOUSE_PORT` | Insight | 9000 | Set the port for the orchestrator Clickhouse storage. (Default: 9000) |
| `STORAGE_ORCHESTRATOR_MEMORY_MAXITEMS` | Insight | 10000 | Set the maximum number of items in memory for the orchestrator. (Default: 10000) |
| `STORAGE_STAGING_CLICKHOUSE_DISABLETLS` | Insight | true | Set to true to disable TLS for the staging Clickhouse storage. (Default: true) |
| `STORAGE_ORCHESTRATOR_CLICKHOUSE_DATABASE` | Insight | - | Set the database name for the orchestrator Clickhouse storage. |
| `STORAGE_ORCHESTRATOR_CLICKHOUSE_PASSWORD` | Insight | (secret) | Set the password for the orchestrator Clickhouse storage. |
| `STORAGE_ORCHESTRATOR_CLICKHOUSE_USERNAME` | Insight | (secret) | Set the username for the orchestrator Clickhouse storage. |
| `STORAGE_ORCHESTRATOR_CLICKHOUSE_DISABLETLS` | Insight | true | Set to true to disable TLS for the orchestrator Clickhouse storage. (Default: true) |
| `CLICKHOUSE_DB` | Clickhouse | default | Set the database name for the Clickhouse server. (Default: default) |
| `CLICKHOUSE_USER` | Clickhouse | (secret) | Set the username for the Clickhouse server. |
| `CLICKHOUSE_PASSWORD` | Clickhouse | (secret) | Set the password for the Clickhouse server. |
| `CLICKHOUSE_INIT_TIMEOUT` | Clickhouse | 60 | Set the timeout for Clickhouse initialization in seconds. (Default: 300) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/Dyj5IJ)
