# Deploy ENSRainbow on Railway

Making the unknown, known

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Ddy-Qg)

## About

# Overview
ENSRainbow is an ENSNode sidecar service for healing millions of unknown ENS names.

Learn more at https://ensrainbow.io and https://ensnode.io.



# How to use

## Private network
Reference the `RAILWAY_PRIVATE_DOMAIN` variable connected to the ENSRainbow instance.

Connect using HTTP to the application port (default `3223`).

## Public network
For safety reasons, by default, ENSRainbow is placed in a **private** network without public Internet access.

In order to allow public access to the service, please modify the instance network configuration accordingly.

Connect to the service from outside of Railway using the [TCP Proxy](https://docs.railway.app/guides/public-networking#tcp-proxying).

Reference the `RAILWAY_PUBLIC_DOMAIN` variable connected to the ENSRainbow instance.

Connect using HTTP to the application port (default `3223`).

## Learn More 

[ENSRainbow documentation](https://www.ensrainbow.io)

[ENSNode GitHub repository](https://github.com/namehash/ensnode)

[ENSRainbow GitHub subrepo](https://github.com/namehash/ensnode/tree/main/apps/ensrainbow)

## Service configuration

### Service source
The service instance is using the latest Docker image from the official ENSRainbow application GitHub Container Repository:

`namehash/ensnode/ensrainbow:latest`

### Environment variables
The template contains the following environment variables:

- `DB_SCHEMA_VERSION` - version of the physical database layout. It is not related to the application's API version.
- `LABEL_SET_ID` - categorizes the type of ENSRainbow data (e.g., a full production set vs. a minimal test set).
- `LABEL_SET_VERSION` - a non-negative integer representing an incremental update to a dataset within a specific `LABEL_SET_ID`.
- `PORT` - defines the HTTP listening port (default `3223`).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ENSRainbow | `ghcr.io/namehash/ensnode/ensrainbow:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3223 | Application HTTP port |
| `LABEL_SET_ID` | subgraph | Categorizes the type of ENSRainbow data (e.g., a full production set vs. a minimal test set). |
| `DB_SCHEMA_VERSION` | 3 | Version of the physical database layout. It is not related to the application's API version. |
| `LABEL_SET_VERSION` | 0 | A non-negative integer representing an incremental update to a dataset within a specific `LABEL_SET_ID`. |

## Configuration

- **Healthcheck:** `/health`

**Category:** Other

[View on Railway →](https://railway.com/template/Ddy-Qg)
