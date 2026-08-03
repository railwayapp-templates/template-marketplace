# Deploy Twikoo on Railway

A simple, safe, free comment system.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twikoo)

## About

Twikoo is a simple, safe, and free static website comment system. It allows developers and site owners to integrate lightweight commenting features into static sites or blogs without sacrificing privacy. Key features include Akismet spam detection, email notifications, multi-language support, custom emojis, and an embedded management panel for site administrators.

When deploying Twikoo on Railway, Railway hosts both the Node.js application backend and the required database infrastructure using isolated cloud containers. Deploying Twikoo on Railway simplifies infrastructure management by providing automatic builds, managed databases, and built-in networking.

Twikoo relies on a MongoDB database to persist comments, user settings, and administrative credentials across container restarts. Railway automatically configures secure internal networking between the Twikoo service and the MongoDB database. Public HTTP traffic is processed through Railway's reverse proxy, which provides automatic SSL/TLS termination for custom and generated domain names, ensuring secure HTTPS endpoints out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| twikoo | [bilalnawaz072/twikoo](https://github.com/bilalnawaz072/twikoo) | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | twikoo | 0.0.0.0 | - |
| `PORT` | twikoo | 8080 | - |
| `TWIKOO_PORT` | twikoo | 8080 | - |
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
- **Volume:** `/data/db`

**Category:** Other · **Languages:** JavaScript, Vue, Go, CSS, HCL, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/twikoo)
