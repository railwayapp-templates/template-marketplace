# Deploy Wekan + MongoDB on Railway

WeKan ® Open-Source Kanban

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wekan-mongodb)

## About

Experience efficient task management with WeKan - the Open-Source, customizable, and privacy-focused kanban.

One of the biggest advantages of WeKan is its self-hosting option, which gives you full control over your data, better security, greater customization options, cost-effectiveness, long-term viability, and can help you ensure that your data is not being accessed or shared without your knowledge.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wekan | `wekanteam/wekan` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BIND_IP` | wekan | 0.0.0.0 | - |
| `MAIL_URL` | wekan | smtp://user:pass@mailserver.example.com:587 | - |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/template/wekan-mongodb)
