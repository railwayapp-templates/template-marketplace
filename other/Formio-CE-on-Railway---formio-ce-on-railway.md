# Deploy Form.io CE on Railway on Railway

Deploy Form.io CE with native MongoDB and generated secrets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/formio-ce-on-railway)

## About

Form.io Community Edition is an open-source form builder and forms API backed by MongoDB. This template deploys a pinned Form.io CE image with Railway-native MongoDB, generated app secrets, a generated initial admin password, public HTTP access, and a `/form` health check.

Self-hosting Form.io CE normally means wiring MongoDB, runtime `NODE_CONFIG`, admin bootstrap credentials, public URL settings, health checks, and persistence rules by hand. This Railway template packages that baseline into a repeatable deployment with a small wrapper around `formio/formio:4.7.1`.

The template focuses on the core Community Edition workflow: log in as the initial admin, create forms, submit authenticated test data, and store Form.io state in MongoDB. Advanced Form.io and Enterprise features remain user-owned configuration after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| formio | [l4time/railway-formio-ce-template](https://github.com/l4time/railway-formio-ce-template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |
| `PORT` | formio | 8080 |
| `JWT_SECRET` | formio | (secret) |
| `ROOT_EMAIL` | formio | admin@example.com |
| `MONGO_SECRET` | formio | (secret) |
| `ROOT_PASSWORD` | formio | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/formio-ce-on-railway)
