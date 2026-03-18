# Deploy SpacetimeDB on Railway

Highly performant realtime database designed primarily for MMO-RPGs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/JL9J05)

## About

<p align="center"> <a href="https://spacetimedb.com#gh-dark-mode-only"> <img width="320" src="https://github.com/clockworklabs/spacetimedb/raw/master/images/dark/logo.svg" alt="SpacetimeDB Logo"> </a> <a href="https://spacetimedb.com#gh-light-mode-only"> <img width="320" src="https://github.com/clockworklabs/spacetimedb/raw/master/images/light/logo.svg" alt="SpacetimeDB Logo"> </a> </p> <p align="center"> <a href="https://spacetimedb.com#gh-dark-mode-only"> <img width="250" src="https://github.com/clockworklabs/spacetimedb/raw/master/images/dark/logo-text.svg" alt="SpacetimeDB"> </a> <a href="https://spacetimedb.com#gh-light-mode-only"> <img width="250" src="https://github.com/clockworklabs/spacetimedb/raw/master/images/light/logo-text.svg" alt="SpacetimeDB"> </a> </p><h3 align="center"> Multiplayer at the speed of light – now on Railway! </h3> <p></p> <p align="center"> <a href="https://github.com/clockworklabs/spacetimedb"><img src="https://img.shields.io/github/v/release/clockworklabs/spacetimedb?color=%23ff00a0&amp;include_prereleases&amp;label=version&amp;sort=semver&amp;style=flat-square"></a> &nbsp; <a href="https://github.com/clockworklabs/spacetimedb"><img src="https://img.shields.io/badge/built_with-Rust-dca282.svg?style=flat-square"></a> &nbsp; <a href="https://hub.docker.com/r/clockworklabs/spacetimedb"><img src="https://img.shields.io/docker/pulls/clockworklabs/spacetimedb?style=flat-square"></a> &nbsp; <a href="https://github.com/clockworklabs/spacetimedb/blob/master/LICENSE.txt"><img src="https://img.shields.io/badge/license-BSL_1.1-00bfff.svg?style=flat-square"></a> </p> <p align="center"> <a href="https://discord.gg/spacetimedb"><img src="https://img.shields.io/discord/1037340874172014652?label=discord&amp;style=flat-square&amp;color=5a66f6"></a> &nbsp; <a href="https://twitter.com/spacetime_db"><img src="https://img.shields.io/badge/twitter-Follow_us-1d9bf0.svg?style=flat-square"></a> </p>

# SpacetimeDB on Railway

This repository provides a template to deploy SpacetimeDB, a revolutionary relational database and server combined into one, on Railway. With this template, you can quickly set up a SpacetimeDB instance to power real-time applications like games, chat systems, or collaboration tools—all with minimal configuration.

SpacetimeDB lets you upload your application logic as "modules" (fancy stored procedures) written in Rust, eliminating the need for separate servers, microservices, or complex infrastructure. Clients connect directly to the database, executing your logic with ultra-low latency. This template simplifies deployment by leveraging Railway’s platform to host a SpacetimeDB standalone server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SpacetimeDB | `clockworklabs/spacetimedb` | Database |

## Configuration

- **TCP Proxies:** 3000
- **Volume:** `/stdb/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/JL9J05)
