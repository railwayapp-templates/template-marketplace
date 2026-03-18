# Deploy MongoDB Community Server Replica Set on Railway

Deploy a production-ready, high-availability MongoDB cluster

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-community-server-replica-set)

## About

This template deploys a production-ready MongoDB Community Server Replica Set alongside a modern Next.js 16 frontend and Border0 for secure access. It provides an automated, multi-service architecture that handles complex database clustering and secure networking in a single click.

Hosting this template involves deploying a three-member replica set within Railway's high-speed private network. The architecture consists of three interconnected nodes configured in a Primary-Secondary-Secondary (PSS) pattern, ensuring your application remains online even if one node fails.

Each data-bearing node is attached to a Railway Volume for persistent storage, preventing data loss across redeployments. The deployment includes an ephemeral Init-Service that automatically coordinates the cluster's internal handshake and security configuration, eliminating the need for manual database administration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo3 | [contourkde/mongodb_replicaset](https://github.com/contourkde/mongodb_replicaset) (root: /nodes) | Database |
| mongo2 | [contourkde/mongodb_replicaset](https://github.com/contourkde/mongodb_replicaset) (root: /nodes) | Database |
| Init Replica Set | [contourkde/mongodb_replicaset](https://github.com/contourkde/mongodb_replicaset) (root: /initService) | Worker |
| mongo1 | [contourkde/mongodb_replicaset](https://github.com/contourkde/mongodb_replicaset) (root: /nodes) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KEYFILE` | mongo3 | - | Inherits the security key from the primary mongo1 service for cluster authentication. |
| `MONGOUSER` | mongo3 | - | Reference to the root username for application-level authentication. |
| `MONGO_URL` | mongo3 | - | URI used for external/public connections through the TCP Proxy. |
| `MONGO_HOST` | mongo3 | - | The external domain provided by Railway's TCP Proxy for public internet access. |
| `MONGO_PORT` | mongo3 | - | The external port assigned by Railway for public database traffic. |
| `MONGOPASSWORD` | mongo3 | (secret) | Direct reference to the primary service password for connection strings. |
| `REPLICA_SET_NAME` | mongo3 | - | Inherits the cluster name from mongo1 to ensure this node joins the correct set. |
| `MONGO_PRIVATE_URL` | mongo3 | - | URI for fast, secure internal communication between services within the Railway network. |
| `REPLICA_SET_PRIVATE_URI` | mongo3 | - | Inherits the full internal replica set URI from the primary service for cluster-wide discovery. |
| `MONGODB_INITDB_ROOT_PASSWORD` | mongo3 | (secret) | Inherits the administrative password defined in the mongo1 service. |
| `MONGODB_INITDB_ROOT_USERNAME` | mongo3 | (secret) | Inherits the administrative username defined in the mongo1 service. |
| `KEYFILE` | mongo2 | - | Security key used for internal authentication between MongoDB replica set members. |
| `MONGOUSER` | mongo2 | - | Reference to the root username for application-level authentication. |
| `MONGO_URL` | mongo2 | - | Full URI for public/external database access via TCP Proxy. |
| `MONGO_HOST` | mongo2 | - | The external domain provided by Railway's TCP Proxy for access outside the private network. |
| `MONGO_PORT` | mongo2 | - | The specific external port assigned by Railway for public database traffic. |
| `MONGOPASSWORD` | mongo2 | (secret) | Reference to the root password for application-level authentication. |
| `REPLICA_SET_NAME` | mongo2 | - | Unique identifier for the MongoDB replica set cluster. |
| `MONGO_PRIVATE_URL` | mongo2 | - | URI for low-latency internal communication within the Railway project. |
| `REPLICA_SET_PRIVATE_URI` | mongo2 | - | Internal connection string specifically formatted for replica set member discovery. |
| `MONGODB_INITDB_ROOT_PASSWORD` | mongo2 | (secret) | The administrative password defined during the initial database setup. |
| `MONGODB_INITDB_ROOT_USERNAME` | mongo2 | (secret) | The administrative username defined during the initial database setup. |
| `MONGO_PORT` | Init Replica Set | 27017 | The internal port for MongoDB (default is 27017; leave blank or set to 27017). |
| `MONGOPASSWORD` | Init Replica Set | (secret) | Inherits the admin password from the primary mongo1 service. |
| `MONGOUSERNAME` | Init Replica Set | (secret) | Inherits the admin username from the primary mongo1 service. |
| `REPLICA_SET_NAME` | Init Replica Set | - | The shared name of the replica set cluster, inherited from mongo1. |
| `MONGO_PRIMARY_HOST` | Init Replica Set | - | The private internal network address for the first node (mongo1). |
| `MONGO_REPLICA_HOST` | Init Replica Set | - | The private internal network address for the second node (mongo2). |
| `MONGO_REPLICA2_HOST` | Init Replica Set | - | The private internal network address for the third node (mongo3). |
| `KEYFILE` | mongo1 | - | Generates a random 32-character base64-style string for replica set internal authentication. |
| `MONGOUSER` | mongo1 | - | Reference variable for the root username used by application connections. |
| `MONGO_URL` | mongo1 | - | Standard connection URI for external tools or local development. |
| `MONGO_HOST` | mongo1 | - | The external domain used for accessing the database from outside of Railway. |
| `MONGO_PORT` | mongo1 | - | The external port assigned by the TCP Proxy for public connections. |
| `MONGOPASSWORD` | mongo1 | (secret) | Reference variable for the root password used by application connections. |
| `REPLICA_SET_NAME` | mongo1 | rs0 | The custom name for your MongoDB cluster (e.g., "rs0"); required for replica set functionality. |
| `MONGO_PRIVATE_URL` | mongo1 | - | Direct internal connection URI for a single-node service within Railway. |
| `MONGO_PRIVATE_HOSTS` | mongo1 | - | A comma-separated list of all internal host addresses for the 3-node MongoDB cluster. |
| `REPLICA_SET_PRIVATE_URI` | mongo1 | - | The cluster-aware URI that allows the driver to automatically discover and failover between members. |
| `MONGODB_INITDB_ROOT_PASSWORD` | mongo1 | (secret) | Generates a random 32-character alphanumeric password for the root user. |
| `MONGODB_INITDB_ROOT_USERNAME` | mongo1 | (secret) | The primary administrative username (leave blank to set manually or define here mongodb). |

## Configuration

- **Volume:** `/data/db`

**Category:** AI/ML · **Languages:** Shell, JavaScript, Python, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/mongodb-community-server-replica-set)
