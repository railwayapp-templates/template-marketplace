# Deploy kuai-mvp on Railway

A template to deploy for DApp mvp with kuai

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/KO6Gvb)

## About

This is the minimum viable product(MVP) designed to demonstrate Kuai's ability to manipulate a group of cells on the Nervos Common Knowledge Base (CKB).

The Kuai MVP DApp is a partially implemented [data.did.id](https://data.did.id/), which serves as a decentralized account profile. In comparison to the fully implemented version, the Kuai MVP DApp focuses solely on on- and off-chain data management. On-chain state verification will be supported in the next stage of development.

You can find an online preview of the Kuai MVP DApp at https://kuai-mvp-dapp-ui.vercel.app/.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kuai | [ckb-js/kuai](https://github.com/ckb-js/kuai) | Web service |
| kuai-mvp-dapp-ui | [Magickbase/kuai-mvp-dapp-ui](https://github.com/Magickbase/kuai-mvp-dapp-ui) | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | kuai | 0.0.0.0 | - |
| `NEXT_PUBLIC_CKB_NODE` | kuai-mvp-dapp-ui | https://testnet.ckb.dev/rpc | CKB node rpc url |
| `NEXT_PUBLIC_CHAIN_TYPE` | kuai-mvp-dapp-ui | testnet | CKB chain type |
| `NEXT_PUBLIC_SERVER_API` | kuai-mvp-dapp-ui | - | The DApp service API url, it was created by kuai. |
| `NEXT_PUBLIC_STORAGE_CAPACITY` | kuai-mvp-dapp-ui | 5000 | The min capacity needs |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** TypeScript, SCSS, JavaScript, HTML, Rust, CSS, Shell, Dockerfile, Makefile

[View on Railway →](https://railway.com/template/KO6Gvb)
