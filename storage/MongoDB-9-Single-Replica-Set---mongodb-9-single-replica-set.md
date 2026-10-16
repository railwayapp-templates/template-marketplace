# Deploy MongoDB 9 Single Replica Set on Railway

MongoDB 9 single-node replica set. Persistent data and transaction support.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-9-single-replica-set)

## About

MongoDB is a document database designed for flexible, scalable data storage. A replica set is a group of MongoDB processes that maintain the same data and provide replication and automatic primary election. This template deploys MongoDB 9 as a single-member replica set on Railway, with persistent storage and private networking for applications running within your Railway project.

Running MongoDB as a replica set is useful even when you only need one database instance. Features such as multi-document transactions and change streams require a replica set, including in single-node development and application environments.

This template automates the setup of MongoDB with a single-member replica set, initializes the database with root credentials, and provides a connection string that applications can use to connect over Railway's private network.

A single-member replica set does not provide redundancy or automatic failover to another server. It is a practical option for applications that need replica set functionality without the operational overhead of a multi-node cluster.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongodb | [ventry-es/railway-mongodb-single-replica](https://github.com/ventry-es/railway-mongodb-single-replica) (root: /mongo) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MONGO_URL` | - | MongoDB connection string for applications running within the Railway private network. Includes authentication and replica set configuration. |
| `MONGO_REPLICA_SET_NAME` | rs0 | Name of the MongoDB replica set. Defaults to rs0 for single-node replica set functionality. |
| `MONGO_INITDB_ROOT_PASSWORD` | (secret) | Root password for MongoDB authentication. Generated securely for each deployment; keep this secret. |
| `MONGO_INITDB_ROOT_USERNAME` | (secret) | Username for the MongoDB root administrator account. Defaults to root. |

## Configuration

- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mongodb-9-single-replica-set)
