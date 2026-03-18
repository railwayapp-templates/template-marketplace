# Deploy MongoDB on Railway

MongoDB  database service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mongo)

## About

MongoDB is a popular open-source NoSQL document database that provides a flexible and scalable way to store and manage unstructured and semi-structured data. It is widely used for modern web applications, content management systems, and various enterprise solutions that require rapid development.

Hosting MongoDB gives you access to a flexible document database capable of handling concurrent connections, managing data persistence, and supporting high availability configurations. MongoDB offers flexible database engine configuration, comprehensive user authentication and permission systems, and efficient storage and memory allocation. The database excels at query optimization and flexible indexing strategies. MongoDB deployments benefit from scalable CPU, RAM, and storage resources while supporting enterprise-grade network security through Railway's private network capabilities. Railway provides automated backup systems and comprehensive logging to support your database operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |

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

**Category:** Storage

[View on Railway →](https://railway.com/template/mongo)
