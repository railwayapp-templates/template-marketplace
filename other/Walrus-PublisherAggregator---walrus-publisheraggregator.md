# Deploy Walrus Publisher/Aggregator on Railway

Template to run your own Walrus Publisher and/or Aggregator

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/walrus-publisheraggregator)

## About

Walrus Publisher and Aggregator are services that enable interaction with Walrus decentralized storage on the Sui blockchain. The Publisher uploads and manages blobs, while the Aggregator retrieves and serves stored content. Run them independently or combined in Daemon mode for a complete storage solution.

Hosting Walrus services involves running HTTP endpoints that interact with the Walrus decentralized storage network on Sui blockchain. The Publisher service accepts blob uploads via REST API, manages parallel transactions through sub-wallets, and stores data across the Walrus network with configurable redundancy. The Aggregator service retrieves and serves blobs on-demand with efficient caching and concurrent request handling. Both services support JWT authentication, metrics monitoring, and can operate on testnet or mainnet networks. The containerized deployment handles wallet management, network configuration, and resource optimization automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cmdoss/walrus | `cmdoss/walrus` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MODE` | - | Service mode: `publisher`, `aggregator`, `daemon`, or unset for CLI mode |
| `NETWORK` | - | **Required** Network to use (`testnet`, `mainnet`) |
| `BLOCKLIST` | - | Path to blocklist file (YAML) |
| `N_CLIENTS` | - | Number of Walrus clients |
| `BIND_ADDRESS` | - | HTTP server bind address (default `[::]:31415`) |
| `SUI_KEYSTORE` | - | **Required for publisher/daemon modes** Private key from `~/.sui/sui_config/sui.keystore` |
| `JWT_ALGORITHM` | - | JWT algorithm (e.g., `HS256`) |
| `MAX_BLOB_SIZE` | - | Maximum blob size in bytes |
| `MAX_BODY_SIZE` | - | Maximum upload body size (KB) |
| `JWT_CACHE_SIZE` | - | JWT cache size |
| `ALLOWED_HEADERS` | - | Space-separated list of allowed response headers |
| `METRICS_ADDRESS` | - | Metrics endpoint address (default `[::]:27182`) |
| `REFILL_INTERVAL` | - | Wallet refill interval |
| `BURN_AFTER_STORE` | - | Burn WAL tokens after store (1=yes, 0=no) |
| `JWT_EXPIRING_SEC` | - | JWT expiration time (seconds) |
| `GAS_REFILL_AMOUNT` | - | SUI gas refill amount (MIST) |
| `JWT_DECODE_SECRET` | (secret) | JWT secret for verification |
| `JWT_VERIFY_UPLOAD` | - | Verify JWT on upload (1=yes, 0=no) |
| `WAL_REFILL_AMOUNT` | - | WAL token refill amount |
| `ALLOW_QUILT_PATCH_TAGS` | - | Allow quilt patch tags in response (1=yes, 0=no) |
| `SUB_WALLETS_MIN_BALANCE` | - | Minimum sub-wallet balance |
| `PUBLISHER_MAX_BUFFER_SIZE` | - | Publisher max buffer size |
| `AGGREGATOR_MAX_BUFFER_SIZE` | - | Aggregator max buffer size |
| `JWT_CACHE_REFRESH_INTERVAL` | - | JWT cache refresh interval |
| `PUBLISHER_MAX_CONCURRENT_REQUESTS` | - | Publisher max concurrent requests |
| `AGGREGATOR_MAX_CONCURRENT_REQUESTS` | - | Aggregator max concurrent requests |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/wallets`

**Category:** Other

[View on Railway →](https://railway.com/deploy/walrus-publisheraggregator)
