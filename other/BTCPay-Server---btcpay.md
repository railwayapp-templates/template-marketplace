# Deploy BTCPay Server on Railway

Bitcoin payment processor for accepting payments in your own store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/btcpay)

## About

BTCPay Server is a free, open-source Bitcoin payment processor a merchant runs
themselves. Where BitPay or Coinbase Commerce sits between a shop and its customers —
holding funds, demanding identity documents, taking a percentage — BTCPay Server
generates invoices against a wallet the merchant controls, so payments settle on-chain
or over Lightning with no intermediary and no fee. It ships a checkout page, a point of
sale, payment buttons, crowdfunding pages, refunds, payouts and a REST API, plus
plugins for WooCommerce and Shopify.

Self-host BTCPay Server on Railway and four services come up wired together.
`btcpayserver` is the web application and the only one with a public URL. `nbxplorer`
is the UTXO indexer it depends on: it watches the chain for the addresses your wallets
derive and tells BTCPay when an invoice is paid. `bitcoind` is Bitcoin Core, pruned to
fit a Railway volume, and the only source of truth about the chain. `Postgres` holds
BTCPay's stores, invoices and users alongside NBXplorer's index. Traffic reaches only
`btcpayserver`, which talks to `nbxplorer` privately, which talks to `bitcoind` over
JSON-RPC and the Bitcoin peer-to-peer protocol.

![Diagram of the BTCPay Server, NBXplorer, Bitcoin Core and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788418056/btcpay-server-architecture.png)

Accepting Bitcoin through a processor reintroduces the custodian a merchant was trying
to avoid: funds land in the processor's wallet, accounts get frozen, and a percentage
of every sale leaves the business. Self-hosting moves invoice generation and payment
detection onto infrastructure you control, and the money goes straight to your own
extended public key.

- **Invoices and checkout** — payment pages with configurable expiry, exchange rates
  and partial-payment handling
- **Wallets** — hot or watch-only, hardware wallets, PSBT, coin selection
- **Apps** — point of sale, crowdfunding, payment buttons, pull payments, payouts
- **Lightning** — connect an external LND, Core Lightning or phoenixd node

The split matters. BTCPay never talks to Bitcoin Core directly: NBXplorer indexes the
transactions that concern your wallets, so BTCPay can ask "was invoice X paid?"
without scanning the chain. Bitcoin Core validates every block itself, which is what
makes the deployment trustless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| bitcoind | [gridalpha/btcpay-server-railway](https://github.com/gridalpha/btcpay-server-railway) (root: bitcoind) | Database |
| nbxplorer | [gridalpha/btcpay-server-railway](https://github.com/gridalpha/btcpay-server-railway) (root: nbxplorer) | Database |
| btcpayserver | [gridalpha/btcpay-server-railway](https://github.com/gridalpha/btcpay-server-railway) (root: btcpayserver) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | bitcoind | 8000 | Serves the JSON health endpoint |
| `BITCOIN_PRUNE` | bitcoind | 550 | MB of blocks kept on the volume |
| `BITCOIN_DBCACHE` | bitcoind | 512 | UTXO cache in MB |
| `BITCOIN_NETWORK` | bitcoind | regtest | Private chain; mainnet needs a bigger volume |
| `BITCOIN_RPC_URL` | bitcoind | http://bitcoind.railway.internal:43782/ | Read by nbxplorer |
| `BITCOIN_P2P_PORT` | bitcoind | 39388 | Peer-to-peer port |
| `BITCOIN_RPC_PORT` | bitcoind | 43782 | JSON-RPC port |
| `BITCOIN_RPC_USER` | bitcoind | (secret) | RPC account NBXplorer uses |
| `BITCOIN_MAXMEMPOOL` | bitcoind | 300 | Mempool ceiling in MB |
| `BITCOIN_FALLBACKFEE` | bitcoind | 0.0002 | BTC/kvB where fee estimation has no data |
| `BITCOIN_P2P_ENDPOINT` | bitcoind | bitcoind.railway.internal:39388 | Read by nbxplorer |
| `BITCOIN_RPC_PASSWORD` | bitcoind | (secret) | RPC password; rpcauth is derived at boot |
| `PORT` | nbxplorer | 32838 | HTTP listening port |
| `NBXPLORER_DB` | nbxplorer | nbxplorerregtest | NBXplorer's database, created at boot |
| `NBXPLORER_URL` | nbxplorer | http://nbxplorer.railway.internal:32838/ | Read by btcpayserver |
| `NBXPLORER_PORT` | nbxplorer | 32838 | Same port, read by NBXplorer itself |
| `BITCOIN_NETWORK` | nbxplorer | regtest | Must match bitcoind |
| `BITCOIN_RPC_USER` | nbxplorer | (secret) | Bitcoin Core RPC user |
| `NBXPLORER_BTCRPCURL` | nbxplorer | - | Bitcoin Core JSON-RPC endpoint |
| `BITCOIN_RPC_PASSWORD` | nbxplorer | (secret) | Bitcoin Core RPC password |
| `NBXPLORER_BTCNODEENDPOINT` | nbxplorer | - | Bitcoin Core P2P endpoint |
| `PORT` | btcpayserver | 8080 | HTTP listening port |
| `BTCPAY_DB` | btcpayserver | btcpayserverregtest | BTCPay's own database, created at boot |
| `NBXPLORER_DB` | btcpayserver | - | NBXplorer's database, for reporting |
| `BITCOIN_NETWORK` | btcpayserver | regtest | Chain all three services run on |
| `BTCPAY_CHEATMODE` | btcpayserver | true | Mine/pay controls in the UI; ignored on mainnet |
| `BTCPAY_ADMIN_EMAIL` | btcpayserver | admin@example.dev | First server admin, created at boot |
| `BTCPAY_ADMIN_PASSWORD` | btcpayserver | (secret) | First server admin password |
| `BTCPAY_BTCEXPLORERURL` | btcpayserver | - | Private NBXplorer endpoint |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Volume:** `/data`
- **Healthcheck:** `/v1/cryptos/btc/status`
- **Volume:** `/datadir`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/btcpay)
