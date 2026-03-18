# Deploy elk-zone on Railway

 A nimble Mastodon web client 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/elk-zone)

## About

[![Elk](https://github.com/elk-zone/elk/raw/main/public/logo.svg)](https://github.com/elk-zone/elk)

Hosting Elk on Railway leverages Railway’s native Docker support and persistent volumes. 
The application requires persistent storage for user data and configuration,  by default through volumes mounted at `/elk/data`.

All configuration, including dependency management and build steps, are done within the container, ensuring consistency and reliability. Railway provides automatic HTTPS for your instance, and you can easily add custom domains if you want to host your own self-managed version of Elk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| elk | [jellydeck/elk](https://github.com/jellydeck/elk) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/elk/data`

**Category:** Other · **Languages:** Vue, TypeScript, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/elk-zone)
