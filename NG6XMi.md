# Deploy Etherpad on Railway

A modern really-real-time collaborative document editor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/NG6XMi)

## About

![Etherpad Logo](https://etherpad.org/assets/brand-K7rskzxz.svg)

Etherpad is a real-time collaborative editor scalable to thousands of simultaneous real time users. It provides full data export capabilities, and runs on your server, under your control.

## Authentication

The default user and admin password can be found in the service variables, they're automatically created. You can set a custom one on deployment of the service.

## Docs

Check out the etherpad wiki for more information [here](https://github.com/ether/etherpad-lite/wiki)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Etherpad | `etherpad/etherpad` | Web service |
| MongoDB | `mongo` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `IP` | Etherpad | 0.0.0.0 | - |
| `PORT` | Etherpad | 9001 | - |
| `TITLE` | Etherpad | Etherpad | - |
| `DB_TYPE` | Etherpad | mongodb | - |
| `FAVICON` | Etherpad | favicon.ico | - |
| `USER_PASSWORD` | Etherpad | (secret) | - |
| `ADMIN_PASSWORD` | Etherpad | (secret) | - |
| `DEFAULT_PAD_TEXT` | Etherpad | Welcome to Etherpad! This pad text is synchronized as you type, so that everyone viewing this page sees the same text. This allows you to collaborate seamlessly on documents! Get involved with Etherpad at https://etherpad.org | - |
| `MONGOHOST` | MongoDB | - | Railway TCP Proxy Domain. |
| `MONGOPORT` | MongoDB | - | Mongodb TCP Proxy port. |
| `MONGOUSER` | MongoDB | - | Mongodb user, used for the Data panel. |
| `MONGO_URL` | MongoDB | - | URL to connect to MongoDB, used for Data panel. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password, used for Data panel. |
| `MONGO_PRIVATE_URL` | MongoDB | - | URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** CMS

[View on Railway →](https://railway.com/template/NG6XMi)
