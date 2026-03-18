# Deploy matrix-conduit on Railway

Deploy matrix conduit server with Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/matrix-conduit)

## About

Check doc here: https://docs.conduit.rs/deploying/docker.html
This instance is pretty easy to set up, while there are still some bugs since it's still in beta.
You can try another matrix server "synapse" here: https://railway.com/deploy/matrix-synapse

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| matrix-conduit | `matrixconduit/matrix-conduit:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CONDUIT_PORT` | 6167 |
| `CONDUIT_CONFIG` | /var/lib/matrix-conduit/conduit.toml |
| `CONDUIT_ADDRESS` | 0.0.0.0 |
| `CONDUIT_DATABASE_PATH` | /var/lib/matrix-conduit/ |
| `CONDUIT_TRUSTED_SERVERS` | ["matrix.org"] |
| `CONDUIT_ALLOW_FEDERATION` | true |
| `CONDUIT_DATABASE_BACKEND` | rocksdb |
| `CONDUIT_MAX_REQUEST_SIZE` | 20000000 |
| `CONDUIT_ALLOW_REGISTRATION` | true |
| `CONDUIT_ALLOW_CHECK_FOR_UPDATES` | true |
| `CONDUIT_MAX_CONCURRENT_REQUESTS` | 100 |

## Configuration

- **Volume:** `/var/lib/matrix-conduit/`

**Category:** Other

[View on Railway →](https://railway.com/template/matrix-conduit)
