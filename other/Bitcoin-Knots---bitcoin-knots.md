# Deploy Bitcoin Knots on Railway

Pruned Bitcoin Knots 29.4.2 node with private RPC, on the Knots chain.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bitcoin-knots)

## About

Bitcoin Knots is a Bitcoin full node derived from Bitcoin Core and maintained by Luke Dashjr. It downloads and independently validates every block, applies a stricter transaction relay policy, and exposes the standard `bitcoind` JSON-RPC interface, so your wallets, indexers and scripts can rely on a node you control instead of a third party.

This template runs one private `bitcoind` service built from the official Knots 29.4.2 release binaries, whose SHA256 hashes are pinned after verifying the release signatures. It runs a pruned mainnet node that keeps about 10 GB of recent blocks, so it needs roughly 25 GB of disk. That exceeds the Hobby plan's 5 GB volume limit, so deploy it on Railway Pro. The first sync validates the whole chain history and takes hours to days. **Chain notice:** Knots 29.4.1 and later include a hard fork to BLAKE2b proof of work, so this node follows the Knots chain, not the chain Bitcoin Core and most wallets and exchanges follow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bitcoind | [aalfath/bitcoin-knots-railway-template](https://github.com/aalfath/bitcoin-knots-railway-template) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BITCOIN_CHAIN` | main |
| `BITCOIN_PRUNE_MB` | 10000 |
| `BITCOIN_RPC_USER` | (secret) |
| `BITCOIN_DBCACHE_MB` | 2048 |
| `BITCOIN_RPC_PASSWORD` | (secret) |
| `BITCOIN_MAXMEMPOOL_MB` | 300 |
| `BITCOIN_DISABLE_WALLET` | 1 |
| `BITCOIN_MAX_UPLOAD_MB_PER_DAY` | 2000 |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bitcoin-knots)
