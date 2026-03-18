# Deploy ExpressJS Mongoose on Railway

An example Express app connected to a Mongo database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/RM1WxR)

## About

## Overview

Mongoose is node.js library for elegant mongodb object modeling. Mongoose provides a straight-forward, schema-based solution to model your application data.

## Highlights

- Built-in type casting
- Validation out of the box
- Query building out of the box
- Business logic hooks out of the box

## Learn More

- [mongoose](https://mongoosejs.com/)
- [GitHub](https://github.com/railwayapp-templates/expressjs-mongoose)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| expressjs-mongoose | [railwayapp-templates/expressjs-mongoose](https://github.com/railwayapp-templates/expressjs-mongoose) | Web service |
| MongoDB | `mongo` | Database |

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

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Starters · **Languages:** TypeScript, Procfile

[View on Railway →](https://railway.com/deploy/RM1WxR)
