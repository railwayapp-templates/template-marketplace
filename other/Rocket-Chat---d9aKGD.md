# Deploy Rocket Chat on Railway

Team communication platform with strong data protection.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/d9aKGD)

## About

# Rocket Chat Template

The ultimate Free Open Source Solution for team communications. Rocket.Chat is an open-source fully customizable communications platform developed in JavaScript for organizations with high standards of data protection.

## How to Install

Simply deploy the template, there is no need to customize any of the environment variables.

## Debugging

If you have trouble during the initial setup at the last step, then try redeploying, this usually solves that problem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo` | Database |
| rocket.chat:6.5.3 | `rocket.chat:6.5.3` | Web service |

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

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/d9aKGD)
