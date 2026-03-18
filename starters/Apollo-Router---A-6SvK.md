# Deploy Apollo Router on Railway

A high-performance gateway for GraphQL microservices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/A-6SvK)

## About

[Apollo Federation](https://www.apollographql.com/docs/federation/) allows you to create a single graph from multiple GraphQL microservices—providing the convenience of a single GraphQL server for the frontend without the burden of a monolith on the backend.

[Apollo Router](https://www.apollographql.com/docs/router) is a high-performance entrypoint for your federated microservices packed with performance and security features.

This template lets you quickly deploy a router that you can point at your [Apollo GraphOS](https://www.apollographql.com/docs/graphos) account to immediately start building a federated "supergraph".

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| router | [apollographql/router-template](https://github.com/apollographql/router-template) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `APOLLO_KEY` | An API key from Apollo GraphOS that enables schema-polling. The associated account should have an Enterprise license. |
| `APOLLO_GRAPH_REF` | The "graph ref" from studio formatted like graph-name@variant. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/A-6SvK)
