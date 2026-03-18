# Deploy Quantum-Backend on Railway

Deploy and Host Quantum-Backend with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/quantum-backend)

## About

[What is Quantum-Backend? Your description in roughly ~50 words.]

An Amazon Analytics tool

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| reengineered-web | [Bedrock25/reengineered-web](https://github.com/Bedrock25/reengineered-web) | Worker |
| MongoDB | `mongo:8.0` | Database |
| reengineered-services | [Bedrock25/reengineered-services](https://github.com/Bedrock25/reengineered-services) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MONGOHOST` | - | Railway Private Domain Name. |
| `MONGOPORT` | 27017 | MongoDB Port. |
| `MONGOUSER` | - | Mongodb user. |
| `MONGO_URL` | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | (secret) | User created during initialization, given the root role. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/template/quantum-backend)
