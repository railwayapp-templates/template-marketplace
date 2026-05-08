# Deploy keen-cool on Railway

Deploy and Host keen-cool with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keen-cool)

## About

A two-user eBay reselling order management dashboard built with Next.js 14 and MongoDB. Track inventory from sourcing to sold, calculate profit automatically, and view combined or individual analytics across both users.

Hosting the reselling dashboard on Railway involves running two services: a Next.js 14 App Router application and a MongoDB 8.0 database. The app handles authentication via NextAuth.js with JWT sessions, serves a REST API for order management, and connects to MongoDB for persistent storage. Railway links the two services privately so the database is never exposed to the public internet. Environment variables for the database credentials and NextAuth secret are injected at runtime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| reselling_dashboard | [vances25/reselling_dashboard](https://github.com/vances25/reselling_dashboard) | Worker |

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
| `NEXTAUTH_URL` | reselling_dashboard | your-secret-here-run-openssl-rand-base64-32 | - |
| `NEXTAUTH_SECRET` | reselling_dashboard | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/keen-cool)
