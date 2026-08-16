# Deploy Outerbase Studio on Railway

Browser-based GUI for Postgres, MySQL, and SQLite databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outerbase-studio)

## About

Outerbase Studio is a lightweight, open-source database GUI that runs in your browser and connects
to Postgres, MySQL, and SQLite. This template packages the community-maintained
`chewcw/outerbase-studio` Docker image so you can deploy a working instance on Railway in a single
click, without installing a desktop database client or managing a server yourself.

Outerbase Studio serves its UI from a single container and connects to your databases directly
from the browser session. Hosting it on Railway means Railway builds the Docker image, terminates
TLS on a public domain, and keeps the container restarted and healthy — you only manage the
database connections you add inside the app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Outerbase Studio | [vergissberlin/railwayapp-outerbase-studio](https://github.com/vergissberlin/railwayapp-outerbase-studio) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `STUDIO_USER` | (secret) |
| `STUDIO_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/outerbase-studio)
