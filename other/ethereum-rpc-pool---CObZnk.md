# Deploy ethereum-rpc-pool on Railway

Stop paying for Ethereum nodes!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/CObZnk)

## About

This project is a Go-based proxy server designed to distribute POST requests across multiple RPC endpoints using a round-robin algorithm. By using this proxy, you can avoid relying on a single RPC endpoint. Instead, you can configure a list of public RPC endpoints, and the service will handle the distribution of requests among them. This approach can help you avoid the costs associated with paid nodes while ensuring better reliability and load balancing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ethereum-rpc-pool | [itxtoledo/ethereum-rpc-pool](https://github.com/itxtoledo/ethereum-rpc-pool) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `RPC_LIST` | https://ethereum.publicnode.com,https://eth.llamarpc.com,https://rpc.ankr.com/eth |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/CObZnk)
