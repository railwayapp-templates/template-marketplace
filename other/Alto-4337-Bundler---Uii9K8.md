# Deploy Alto 4337 Bundler on Railway

Account Abstraction ERC-4337 Bundler: Alto by Pimlico

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Uii9K8)

## About

NOTE: If it is failing on healthcheck, flip the runtime from V2 to Legacy and redeploy.

# ⛰️ Alto ⛰️

---

# ALTO on Railway with Arbitrum

This project is a fork of the original [pimlico/alto](https://github.com/pimlico/alto) repository. We would like to acknowledge and thank the original creators for their work and contribution. This fork has been modified to enable hosting on Railway with default settings configured for Arbitrum.

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Features](#features)
- [Configuration](#configuration)
- [Alto Help](#alto-help)
- [Security Considerations](#security-considerations)
- [UserOperation Mempool](#useroperation-mempool)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Introduction
In ERC-4337, a Bundler is the core infrastructure component that allows account abstraction to work on any EVM network. On the highest level, its purpose is to work with a mempool of User Operations to get the transaction to be included on-chain.

This project allows you to deploy the ALTO bundler application on Railway with support for Arbitrum. ALTO is a platform designed to provide decentralized orchestration for blockchain-based tasks, specifically functioning as a Bundler for ERC-4337.

## Getting Started
Follow these steps to get the project up and running:

1. **Fork the Repository**: Fork this repository to your own GitHub account.
2. **Clone the Repository**: Clone the forked repository to your local machine.
    ```sh
    git clone https://github.com/syphrpunk/alto.git
    ```
3. **Install Dependencies**: Navigate to the project directory and install the required dependencies.
    ```sh
    cd alto
    pnpm install
    ```
4. **Deploy to Railway**: Follow the [Railway Documentation](https://docs.railway.app/running/deployments) to deploy the project. Or 1-click deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/Uii9K8?referralCode=JQ7ELw)

Once the service is up and running - it can be called at 
https://{domain}.up.railway.app/rpc

sample post
```
{
    "jsonrpc": "2.0",
    "method": "eth_supportedEntryPoints",
    "params": [],
    "id": 1
}
```


sample response
```
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
        "0x0000000071727De22E5E9d8BAf0edAc6f37da032"
    ]
}
```
Learn more at the repo directly https://github.com/syphrpunk/alto?tab=readme-ov-file#alto-on-railway-with-arbitrum

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bundler-alto-rail | [voidfab/bundler-alto-rail](https://github.com/voidfab/bundler-alto-rail) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `RPC_URL` | https://arbitrum.llamarpc.com | https://arbitrum.llamarpc.com |
| `NODE_ENV` | production | - |
| `LOG_LEVEL` | debug | - |
| `CHAIN_TYPE` | arbitrum | - |
| `ENTRYPOINT` | 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789,0x0000000071727De22E5E9d8BAf0edAc6f37da032 | - |
| `NETWORK_NAME` | arbitrum | - |
| `SIGNER_PRIVATE_KEY` | 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 | 0x... |
| `UTILITY_PRIVATE_KEY` | 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d | 0x... |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Solidity, Shell, Dockerfile

[View on Railway →](https://railway.com/template/Uii9K8)
