# Deploy MongoDB 8 Replica Set on Railway

MongoDB 8 replica set with failover. Data survives template updates.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-8-replica-set)

## About

MongoDB is a document database. A replica set is a group of MongoDB servers holding the same data, able to elect a new primary automatically when one of them fails. This template deploys three data-bearing members plus a one-shot reconciler, giving you a highly available cluster that is reachable only over the private network.

Running a replica set is harder than running one container. Members authenticate to each other with a shared keyfile, so every one of them must hold exactly the same secret. The set has to be initiated exactly once — doing it again on a set that already holds data throws that data away. Each member needs its own persistent volume, and the hostnames written into the replica set configuration have to stay resolvable. Credentials generated at deploy time must not drift out of sync with the credentials the database was actually provisioned with.

This template handles all of it, and closes off each of those failure modes explicitly rather than assuming they will not happen.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo-secondary-2 | [ventry-es/railway-mongodb-replica](https://github.com/ventry-es/railway-mongodb-replica) (root: /mongo) | Database |
| mongo-primary | [ventry-es/railway-mongodb-replica](https://github.com/ventry-es/railway-mongodb-replica) (root: /mongo) | Database |
| mongo-secondary-1 | [ventry-es/railway-mongodb-replica](https://github.com/ventry-es/railway-mongodb-replica) (root: /mongo) | Database |
| init | [ventry-es/railway-mongodb-replica](https://github.com/ventry-es/railway-mongodb-replica) (root: /init) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo-secondary-2 | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | mongo-secondary-2 | (secret) |
| `MONGO_BOOTSTRAP` | mongo-primary | true |
| `MONGO_REPLICA_SET_NAME` | mongo-primary | rs0 |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo-primary | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | mongo-primary | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo-secondary-1 | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | mongo-secondary-1 | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | init | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | init | (secret) |

## Configuration

- **Volume:** `/data`
- **TCP Proxies:** 27017

**Category:** Storage · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/mongodb-8-replica-set)
