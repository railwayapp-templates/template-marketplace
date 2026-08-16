# Deploy CloudBeaver CE on Railway

Web-based SQL client for browsing and querying databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudbeaver-ce)

## About

CloudBeaver CE is the open-source, web-based SQL client from the DBeaver team. This template
packages the official `dbeaver/cloudbeaver` Docker image so you can deploy a fully working
instance on Railway in a single click, without installing a desktop database client or managing
a server yourself.

CloudBeaver CE runs entirely in the browser: connect to PostgreSQL, MySQL, SQLite, MongoDB, and
many other databases through one shared web UI. Hosting it on Railway means Railway builds the
Docker image, terminates TLS on a public domain, and keeps the container restarted and healthy —
you only manage the data sources you connect to.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CloudBeaver CE | [vergissberlin/railwayapp-cloudbeaver-ce](https://github.com/vergissberlin/railwayapp-cloudbeaver-ce) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/cloudbeaver/workspace`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/cloudbeaver-ce)
