# Deploy Linknexus (Linktree Clone) on Railway

Create and manage your own social media reference landing page.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/29wYgN)

## About

Your go-to social media reference hub! Streamline your platforms, curate content, and engage your audience effortlessly. Hosted or SaaS options available. This will be updated soon as this template is a work in progress. The ENV variables are fairly self explanatory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo` | Database |
| website | [willuhmjs/linknexus](https://github.com/willuhmjs/linknexus) | Web service |

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
| `JWT_KEY` | website | CANBEANYTHINGYOUWANT | - |
| `SAAS_RAW` | website | true | Whether or not to operate in SAAS mode (as opposed to single user mode) |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** Svelte, TypeScript, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/29wYgN)
