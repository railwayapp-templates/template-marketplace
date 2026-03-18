# Deploy Graylog on Railway

Free and open log management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/_GawOC)

## About

## Overview
This template is based on the official Graylog [docker guide](https://go2docs.graylog.org/5-2/downloading_and_installing_graylog/docker_installation.htm). It sets up a Graylog instance with a single Opensearch node, backed by a MongoDB database.

## Configuration
Only two environment variables need to be set: `GRAYLOG_ROOT_PASSWORD_SHA2` on the `graylog` service, and  `OPENSEARCH_INITIAL_ADMIN_PASSWORD` on the `opensearch` service (otherwise the default is set to `admin` for both)

## Deploy
No further configuration is required, simply deploy the template and you're good to go

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| graylog | `graylog/graylog:5.2` | Web service |
| opensearch | `opensearchproject/opensearch:2` | Worker |
| MongoDB | `mongo` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | graylog | 9000 | Default port for the graylog web interface |
| `GRAYLOG_MONGODB_URI` | graylog | - | Mongodb connection url |
| `GRAYLOG_ROOT_USERNAME` | graylog | (secret) | The username for the root user, default username is `admin` |
| `GRAYLOG_PASSWORD_SECRET` | graylog | (secret) | A salt for the password, default salt is randomly generated |
| `GRAYLOG_HTTP_PUBLISH_URI` | graylog | http://graylog-production.up.railway.app/ | External url for accessing the graylog web interface, can be a custom domain if one is configured for the service |
| `GRAYLOG_HTTP_EXTERNAL_URI` | graylog | http://graylog-production.up.railway.app/ | External url for accessing the graylog web interface, can be a custom domain if one is configured for the service |
| `GRAYLOG_ROOT_PASSWORD_SHA2` | graylog | (secret) | The SHA-256 hash for the root user's password, default password is `admin` |
| `GRAYLOG_ELASTICSEARCH_HOSTS` | graylog | http://opensearch:9200 | Comma separeated list of Opensearch / Elasticsearch nodes |
| `PORT` | opensearch | 9200 | Default opensearch service connection port |
| `http.host` | opensearch | 0.0.0.0 | Expose opensearch on all interfaces |
| `discovery.type` | opensearch | single-node | Disable opensearch multi-node cluster |
| `node.store.allow_mmap` | opensearch | false | Disable large in-memory maps as this cannot be adjusted in the railway enviornment |
| `plugins.security.disabled` | opensearch | true | Disable opensearch ssl as this service is not exposted externally |
| `OPENSEARCH_INITIAL_ADMIN_PASSWORD` | opensearch | (secret) | Default password for initial admin user, default password is randomly generated |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Observability

[View on Railway →](https://railway.com/template/_GawOC)
