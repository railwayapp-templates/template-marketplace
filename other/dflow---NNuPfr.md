# Deploy dflow on Railway

A self-hosted platform for deploying and managing applications.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/NNuPfr)

## About

A self-hosted platform for deploying and managing applications, similar to Vercel, Railway, or Heroku. dFlow provides automated deployment workflows, container orchestration, and infrastructure management capabilities while giving you full control over your infrastructure and data

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:7` | Database |
| Redis | `bitnami/redis:7.2.5` | Database |
| dflow | [akhil-naidu/dflow](https://github.com/akhil-naidu/dflow) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `PAYLOAD_SECRET` | dflow | (secret) | Auto generates a secret for you. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/NNuPfr)
