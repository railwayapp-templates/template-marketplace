# Deploy radicle-seed-template on Railway

Radicle Seed and Explorer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/radicle-seed-template)

## About

Radicle-seed-template deploys a self-hosted
  [Radicle](https://radicle.xyz) seed node and web explorer in one
   click. Radicle is a sovereign, peer-to-peer code forge built on
   Git. A seed node replicates repositories over the Radicle
  network and serves them via an HTTP API, while the explorer
  provides a web interface to browse hosted repos.

  ## About Hosting radicle-seed-template

  Hosting a Radicle seed node involves running two services: the
  seed node itself and a web-based explorer. The seed node
  connects to the Radicle peer-to-peer network on port 8776,
  discovers and replicates Git repositories, and exposes them
  through an HTTP API. The explorer is a single-page application
  served by nginx that connects to the seed's API to provide a
  browsable interface for hosted repositories. Railway handles
  networking, persistent storage for the node's identity and
  repository data, and public domain provisioning for both
  services.

  ## Common Use Cases

  - **Host a public seed node** to improve availability and
  redundancy of Radicle repositories across the network
  - **Self-host a code explorer** for browsing your organization's
   Radicle-hosted projects through a web UI
  - **Mirror repositories** from the Radicle network by running an
   always-on seed with an open seeding policy

  ## Dependencies for radicle-seed-template Hosting

  - **Radicle** (v1.6.1) — peer-to-peer code collaboration stack
  including `radicle-node`, `radicle-httpd`, and `rad` CLI
  - **Radicle Explorer** — Svelte-based web UI for browsing
  Radicle repositories, built from source

  ### Deployment Dependencies

  - [Radicle Documentation](https://radicle.xyz/guides)
  - [Radicle Seeder Guide](https://radicle.xyz/guides/seeder)
  - [Radicle Explorer Source](https://app.radicle.xyz/nodes/seed.r
  adicle.xyz/rad:z4V1sjrXqjvFdnCUbxPFqd5p4DtH5)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| radicle-seed | [polats/free-the-claw](https://github.com/polats/free-the-claw) | Web service |
| radicle-explorer | [polats/free-the-claw](https://github.com/polats/free-the-claw) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/radicle/.radicle`

**Category:** Storage · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/radicle-seed-template)
