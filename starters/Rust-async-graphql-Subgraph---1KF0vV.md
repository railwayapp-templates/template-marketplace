# Deploy Rust async-graphql Subgraph on Railway

A federation-compatible GraphQL server implemented in Rust

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/1KF0vV)

## About

The fastest way to deploy a Rust GraphQL server! This template is federation-compatible, so you can use this to add Rust to an existing graph in just a few minutes. Leverages the [`async-graphql`](https://crates.io/crates/async-graphql) crate—a code-only GraphQL framework.

Includes GitHub Actions for integrating with Apollo GraphOS, enabling:

- Checks for breaking changes
- Detect composition errors
- Update your router or gateway automatically

This template is maintained by Apollo, so it will be kept up to date and always recommends best practices.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rust-subgraph | [apollographql/subgraph-template-rust-async-graphql](https://github.com/apollographql/subgraph-template-rust-async-graphql) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ROUTER_SECRET` | (secret) | A shared secret that must be passed as a Router-Authorization header for all requests |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Rust

[View on Railway →](https://railway.com/deploy/1KF0vV)
