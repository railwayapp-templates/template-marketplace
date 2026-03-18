# Deploy C# HotChocolate Subgraph (Annotation) on Railway

A HotChocolate C# GraphQL server with support for Apollo Federation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cJcDcc)

## About

The fastest way to deploy a C# HotChocolate GraphQL server! This template is federation-compatible, so you can use this to add C# to an existing graph in just a few minutes.

Includes GitHub Actions for integrating with Apollo GraphOS, enabling:

- Checks for breaking changes
- Detect composition errors
- Update your router or gateway automatically

This template is maintained by Apollo, so it will be kept up to date and always recommends best practices.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| csharp-subgraph | [apollographql/subgraph-csharp-hotchocolate-annotation](https://github.com/apollographql/subgraph-csharp-hotchocolate-annotation) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `router-authorization` | A shared secret that must be passed as a Router-Authorization header for all requests |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** C#, Dockerfile

[View on Railway →](https://railway.com/template/cJcDcc)
