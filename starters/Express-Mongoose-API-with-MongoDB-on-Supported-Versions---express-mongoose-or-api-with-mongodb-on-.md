# Deploy Express + Mongoose | API with MongoDB on Supported Versions on Railway

Express 5 and Mongoose 9 on Railway, health check reads the database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/express-mongoose-or-api-with-mongodb-on-)

## About

An Express 5 API on Mongoose 9 and MongoDB, on versions that are still supported.

The Express/Mongoose starter most people deploy has not been touched since July 2023. It pins Mongoose 7, which reached end of life in 2024 and predates the MongoDB 8 server the same template deploys beside it. Around two thirds of its deployments never come up.

This one tracks current releases and pins them, and fixes two things that make a Mongo-backed service confusing to operate when it goes wrong.

**It connects before it listens.** Mongoose buffers commands while disconnected, so a server that starts listening first turns a connection problem into requests that hang until they time out. Awaiting the connection makes a bad MONGO_URL fail immediately, in the deploy logs, where you can see it.

**The health check reads the connection state.** A deployment that cannot reach Mongo reports unhealthy rather than looking fine and erroring on every request.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.3` | Database |
| API | [ak40u/express-mongoose-railway-starter](https://github.com/ak40u/express-mongoose-railway-starter) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |
| `PORT` | API | 8080 |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/express-mongoose-or-api-with-mongodb-on-)
