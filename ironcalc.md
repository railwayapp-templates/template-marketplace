# Deploy IronCalc on Railway

Deploy and Host IronCalc with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ironcalc)

## About

IronCalc is an open-source spreadsheet engine and web application built in Rust. It provides Excel-like functionality directly in the browser and can also be embedded into other products. Built for performance and portability, IronCalc offers a fully self-hosted spreadsheet experience without relying on third-party cloud providers.

Hosting IronCalc on Railway requires zero configuration. The official Docker image runs the entire web application stack out of the box, with no database, cache, or external services required.

All spreadsheet data is stored client-side in the browser, meaning there is no backend persistence or server-side storage. Simply deploy the container to Railway, expose the default port, and your spreadsheet application will be instantly accessible via your Railway-generated domain.

Since data is stored locally in the browser, users should download and save their spreadsheets frequently to avoid losing work.

Railway handles networking, container orchestration, and scaling automatically, making deployment fast and frictionless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| IronCalc UI | `ghcr.io/ironcalc/ironcalc-caddy:0.7.1` | Web service |
| IronCalc Server | `ghcr.io/ironcalc/ironcalc-server:0.7.1` | Worker |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/ironcalc)
