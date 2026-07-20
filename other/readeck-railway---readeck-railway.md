# Deploy readeck-railway on Railway

Docker image bridge for easy Readeck deployments to Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/readeck-railway)

## About

Readeck is a lightweight, self-hosted read-it-later service — a Pocket
replacement that saves the full readable content of web pages as permanent,
immutable archives. This template deploys it on Railway with persistent
storage, ready for browser extensions, the iOS client, and KOReader
e-reader sync.

Readeck publishes its official container image to Codeberg's registry, which
Railway's direct image deploys don't support — so this template builds from a
one-line Dockerfile shim that pulls the official image at build time. The
template provisions a persistent volume at `/readeck` holding the SQLite
database, configuration, and every archived article, so redeploys and
upgrades never touch your data. Serverless is disabled via `railway.json`
because read-later clients sync in short bursts and handle cold starts
poorly. After deploying, open the service URL, create your admin account,
and connect your clients. Total setup is a few minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| readeck-railway | [sisyphusSmiling/readeck-railway](https://github.com/sisyphusSmiling/readeck-railway) (root: /) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `READECK_ALLOWED_HOSTS` | Set after configuring custom url |
| `READECK_SERVER_BASE_URL` | Set after configuring custom domain |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/readeck`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/readeck-railway)
