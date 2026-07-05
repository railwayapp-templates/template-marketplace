# Deploy Flame on Railway

Flame is self-hosted startpage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flame)

## About

Flame is a self-hosted startpage and application dashboard for your server. It lets you organize bookmarks, apps, and services into a clean, customizable homepage with built-in editors — no file editing required. It includes a weather widget, search bar, and Docker container auto-detection.

Flame is a lightweight Node.js application that uses SQLite as its database, making it a single-container deployment with zero external dependencies. Once deployed, you can immediately start adding applications and bookmarks through the built-in web editor. The interface supports custom CSS themes, configurable search engines, and keyboard shortcuts for fast navigation. 

**Admin password** is configured from the enviroment variable `PASSWORD`. All data is stored in a persistent volume mounted at `/app/data`, so your configuration survives restarts and redeployments. The template automatically generates a public URL for your Flame instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pawelmalak/flame | `pawelmalak/flame` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Admin password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/flame)
