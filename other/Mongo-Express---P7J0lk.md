# Deploy Mongo Express on Railway

A lightweight web-based admin tool for MongoDB databases.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/P7J0lk)

## About

##Template
This template deploys [Mongo Express](https://github.com/mongo-express/mongo-express), a lightweight web-based administrative tool for MongoDB databases. It also creates a sample MongoDB database instance to test Mongo Express capabilities. Just wait 1-2 minutes after deployment for the web interface to be ready.

##Overview
Mongo Express is a web-based administrative interface for MongoDB that allows you to easily manage your databases. It provides a simple, yet powerful way to view, add, edit, and delete data in your MongoDB databases.

##Learn More
* [Mongo Express: MongoDB Management Made Easy](https://alphasec.io/mongo-express-mongodb-management-made-easy/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo` | Database |
| mongo-express | `mongo-express` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Railway TCP Proxy Domain. |
| `MONGOPORT` | MongoDB | - | Mongodb TCP Proxy port. |
| `MONGOUSER` | MongoDB | - | Mongodb user, used for the Data panel. |
| `MONGO_URL` | MongoDB | - | URL to connect to MongoDB, used for Data panel. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password, used for Data panel. |
| `MONGO_PRIVATE_URL` | MongoDB | - | URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `PORT` | mongo-express | 8081 | mongo-express port |
| `MONGOPASSWORD` | mongo-express | (secret) | - |
| `ME_CONFIG_MONGODB_URL` | mongo-express | - | MongoDB connection URL |
| `ME_CONFIG_BASICAUTH_PASSWORD` | mongo-express | (secret) | mongo-express web password |
| `ME_CONFIG_BASICAUTH_USERNAME` | mongo-express | (secret) | mongo-express web username |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/P7J0lk)
