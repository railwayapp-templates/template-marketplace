# Deploy BTCPay Server on Railway

Bitcoin payments with BTCPay Server, Bitcoin Core, NBXplorer and Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/btcpay-server)

## About

BTCPay Server is a free, open-source, self-hosted Bitcoin payment processor. It creates invoices, point-of-sale apps, donation pages and payment requests, and connects to online stores through plugins and its Greenfield API. Payments go straight to a wallet you control, with no intermediary and no processing fees.

This template runs the same components as BTCPay's official Docker deployment: BTCPay Server, NBXplorer (its blockchain indexer), Bitcoin Core and PostgreSQL. It is set up for Bitcoin mainnet with a pruned node, so it can accept real payments once the node has synced. Bitcoin Core needs roughly 25 GB of disk, which exceeds the Hobby plan's 5 GB volume limit, so deploy it on Railway Pro. The first sync takes hours to days, and BTCPay shows a syncing banner until then. The first account you register becomes the server administrator, so create it right after deploying.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nbxplorer | `nicolasdorier/nbxplorer:2.6.17` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| bitcoind | `btcpayserver/bitcoin:31.1-1` | Database |
| btcpayserver | `btcpayserver/btcpayserver:2.4.4` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NBXPLORER_BIND` | nbxplorer | [::]:32838 |
| `NBXPLORER_CHAINS` | nbxplorer | btc |
| `NBXPLORER_NOAUTH` | nbxplorer | 1 |
| `NBXPLORER_NETWORK` | nbxplorer | mainnet |
| `NBXPLORER_TRIMEVENTS` | nbxplorer | 10000 |
| `NBXPLORER_BTCRPCPASSWORD` | nbxplorer | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `BITCOIN_CHAIN` | bitcoind | main |
| `CREATE_WALLET` | bitcoind | false |
| `BITCOIN_NETWORK` | bitcoind | mainnet |
| `BITCOIN_PRUNE_MB` | bitcoind | 10000 |
| `BITCOIN_RPC_USER` | bitcoind | (secret) |
| `BITCOIN_DBCACHE_MB` | bitcoind | 2048 |
| `BITCOIN_RPC_PASSWORD` | bitcoind | (secret) |
| `PORT` | btcpayserver | 49392 |
| `BTCPAY_BIND` | btcpayserver | [::]:49392 |
| `BTCPAY_CHAINS` | btcpayserver | btc |
| `BTCPAY_DATADIR` | btcpayserver | /datadir |
| `BTCPAY_NETWORK` | btcpayserver | mainnet |
| `BTCPAY_ROOTPATH` | btcpayserver | / |
| `BTCPAY_PLUGINDIR` | btcpayserver | /datadir/Plugins |
| `BTCPAY_UPDATEURL` | btcpayserver | https://api.github.com/repos/btcpayserver/btcpayserver/releases/latest |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/datadir`

**Category:** Other

[View on Railway →](https://railway.com/deploy/btcpay-server)
