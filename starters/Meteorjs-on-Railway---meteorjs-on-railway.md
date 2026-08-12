# Deploy Meteor.js on Railway on Railway

Deploy a Meteor.js 3.5 app on Railway with a standalone MongoDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meteorjs-on-railway)

## About

Meteor.js is a full-stack JavaScript platform for building real-time web and mobile apps from a single codebase. This template packages a Meteor 3.5 app into a production-ready multi-stage Dockerfile (via meteor-base) alongside a standalone MongoDB, so it builds and serves traffic on Railway with no manual server setup.

Hosting Meteor.js means compiling the app into a production bundle and running it with Node, backed by MongoDB. This template handles that with a two-stage Dockerfile: a build stage based on the `geoffreybooth/meteor-base` image compiles the bundle, and a slim Node alpine stage runs it. A standalone MongoDB service runs alongside the app, and the two share Railway's private network, with `MONGO_URL` and `ROOT_URL` wired as variable references so nothing is hardcoded. A healthcheck on `/` gives you zero-downtime deploys out of the box, and the whole stack (app, database, networking, and environment) comes up ready to use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| meteor-on-railway | [fredmaiaarantes/meteor-on-railway](https://github.com/fredmaiaarantes/meteor-on-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MONGOHOST` | - | Railway Private Domain Name. |
| `MONGOPORT` | 27017 | MongoDB Port. |
| `MONGOUSER` | - | Mongodb user. |
| `MONGO_URL` | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | (secret) | Root password. |
| `MONGO_INITDB_ROOT_PASSWORD` | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | (secret) | User created during initialization, given the root role. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** CSS, JavaScript, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/meteorjs-on-railway)
