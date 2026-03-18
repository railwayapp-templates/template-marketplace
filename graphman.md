# Deploy Graphman + File Server on Railway

GraphQL API collection generator service using Graphman and Flask.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/graphman)

## About

# GraphQL API Collection Generator and Server

This repo contains two components which allow Railway to distribute the GraphQL API collection for Railway's public API.

We have captured this in a template for Railway users to deploy, should they find it useful.

## Components

### 1. file-server/

A [Flask](https://flask.palletsprojects.com/en/3.0.x/) application with the following routes:

- **/upload** (POST): Accepts a JSON body which is compared against the current collection file to be stored in `/data` if any changes are detected.
- **/** (GET): Renders a simple File Explorer of the `/data` directory and allows for downloading the existing collection file.  An archive directory also exists to store old versions of the file.

### 2. graphman/

A modified version of the [Graphman](https://github.com/Escape-Technologies/graphman) CLI. It runs on a cron schedule defined in `graphman/railway.toml`.  It is responsible for:

- Generating the GraphQL API collection.
- Sending a POST request to the `file-server` `/upload` endpoint with the GraphQL API collection object.

## Environment Variables
The Graphman component expects two environment variables.  Both are preconfigured in the Railway template, as follows -
- API_URL=`${{file-server.RAILWAY_PUBLIC_DOMAIN}}` *(URL of the file server)*
- GRAPHQL_ENDPOINT=`https://backboard.railway.app/graphql/v2` *(GraphQL API endpoint from which to generate a colection)*

*Note: If using this service to generate a collection from another GraphQL API, keep in mind that some API's may have authentication requirements that will require a modification of the Graphman cron.  Refer to the [Graphman Documentation](https://github.com/Escape-Technologies/graphman) for more information.*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| graphman-cron | [railwayapp-templates/graphman-plus-server](https://github.com/railwayapp-templates/graphman-plus-server) (root: /graphman) | Worker |
| file-server | [railwayapp-templates/graphman-plus-server](https://github.com/railwayapp-templates/graphman-plus-server) (root: /file-server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_URL` | - | URL of Flask File Server |
| `GRAPHQL_ENDPOINT` | https://backboard.railway.app/graphql/v2 | GraphQL endpoint for which to generate an API collection |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, Python, Dockerfile, Procfile

[View on Railway →](https://railway.com/template/graphman)
