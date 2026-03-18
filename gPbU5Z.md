# Deploy Strawberry GraphQL on Railway

A simple Python GraphQL server. Introspection + production-ready servers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gPbU5Z)

## About

This template is un-opinionated, but gets you out the door ASAP with a functional GraphQL server.

It creates two services; one is an introspection server using Strawberry's built-in server. The other is a production-ready Flask server, where you can increase the number of replicas easily and scale horizontally.

Read more about Strawberry at [their website](https://strawberry.rocks/docs)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| graphiql-server | [bambrose24/strawberry-graphql-template](https://github.com/bambrose24/strawberry-graphql-template) | Web service |
| flask-server | [bambrose24/strawberry-graphql-template](https://github.com/bambrose24/strawberry-graphql-template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | graphiql-server | 8000 |
| `PORT` | flask-server | 8000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/template/gPbU5Z)
