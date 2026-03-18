# Deploy MongoDB Single Replica on Railway

Single MongoDB replica set for use with clients needing a replica set.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dxhww9)

## About

This template deploys a single MongoDB instance for your data layer needs.

### Network Communication

All database communication is done over the [private network](https://docs.railway.app/reference/private-networking).

### Configuration tuning

To tune the configuration of your MongoDB instance, refer to the [MongoDB documentation](https://www.mongodb.com/docs/manual/replication/) or the [documentation page in Docker Hub](https://hub.docker.com/_/mongo).

### Authentication

The MongoDB instance is deployed with standard authentication enabled.

### Connecting to MongoDB

To connect to MongoDB from another service in Railway, you should create a URI in the service's environment variables. As an example:

```
MONGO_HOST=${{mongo.RAILWAY_PRIVATE_DOMAIN}}:27017
MONGO_URI=mongodb://${{mongo.MONGO_INITDB_ROOT_USERNAME}}:${{mongo.MONGO_INITDB_ROOT_PASSWORD}}@${{MONGO_HOST}}
```

With these variables set, you can then reference the `MONGO_URI` environment variable when configuring the client in your service code.

### Template source

The source for this template can be found in the [Railway Templates GitHub](https://github.com/railwayapp-templates/mongo-replica-set/tree/main).

The MongoDB instance is built directly from the [official MongoDB image in Docker Hub](https://hub.docker.com/_/mongo).

### Resources
- [MongoDB documentation](https://www.mongodb.com/docs/manual/)
- Tutorial: [Deploy MongoDB on Railway](https://docs.railway.app/tutorials/deploy-and-monitor-mongo)This template deploys a single MongoDB instance for your data layer needs.

### Network Communication

All database communication is done over the [private network](https://docs.railway.app/reference/private-networking).

### Configuration tuning

To tune the configuration of your MongoDB instance, refer to the [MongoDB documentation](https://www.mongodb.com/docs/manual/replication/) or the [documentation page in Docker Hub](https://hub.docker.com/_/mongo).

### Authentication

The MongoDB instance is deployed with standard authentication enabled.

### Connecting to MongoDB

To connect to MongoDB from another service in Railway, you should create a URI in the service's environment variables. As an example:

```
MONGO_HOST=${{mongo.RAILWAY_PRIVATE_DOMAIN}}:27017
MONGO_URI=mongodb://${{mongo.MONGO_INITDB_ROOT_USERNAME}}:${{mongo.MONGO_INITDB_ROOT_PASSWORD}}@${{MONGO_HOST}}
```

With these variables set, you can then reference the `MONGO_URI` environment variable when configuring the client in your service code.

### Template source

The source for this template can be found in the [Railway Templates GitHub](https://github.com/railwayapp-templates/mongo-replica-set/tree/main).

The MongoDB instance is built directly from the [official MongoDB image in Docker Hub](https://hub.docker.com/_/mongo).

### Resources
- [MongoDB documentation](https://www.mongodb.com/docs/manual/)
- Tutorial: [Deploy MongoDB on Railway](https://docs.railway.app/tutorials/deploy-and-monitor-mongo)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mongo Single Replica | [railwayapp-templates/mongo-replica-set](https://github.com/railwayapp-templates/mongo-replica-set) (branch: main) (root: /nodes) | Database |
| Init Single Replica | [railwayapp-templates/mongo-replica-set](https://github.com/railwayapp-templates/mongo-replica-set) (branch: main) (root: /initServiceSingle) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KEYFILE` | Mongo Single Replica | - | Base64 keyfile value used for authentication |
| `MONGOPASSWORD` | Mongo Single Replica | (secret) | - |
| `REPLICA_SET_NAME` | Mongo Single Replica | rs0 | - |
| `MONGO_INITDB_ROOT_PASSWORD` | Mongo Single Replica | (secret) | - |
| `MONGO_INITDB_ROOT_USERNAME` | Mongo Single Replica | (secret) | - |
| `MONGO_PORT` | Init Single Replica | 27017 | The used to connect to MongoDB |
| `MONGOPASSWORD` | Init Single Replica | (secret) | Admin password for the replica set |
| `MONGOUSERNAME` | Init Single Replica | (secret) | Root username for the replica set |
| `REPLICA_SET_NAME` | Init Single Replica | - | Name of the Mongo replica set |
| `MONGO_PRIMARY_HOST` | Init Single Replica | - | Private domain of primary mongo instance |

## Configuration

- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Storage · **Languages:** Shell, JavaScript, Python, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/dxhww9)
