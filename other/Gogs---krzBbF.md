# Deploy Gogs on Railway

A painless self-hosted Git service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/krzBbF)

## About

![](https://user-images.githubusercontent.com/2946214/146899259-6a8b58ad-8d6e-40d2-ab02-79dc6aadabbf.png)

## Notes

In my experience, Gitea, which is a fork of Gogs, typically uses about 200MB of memory. Gogs, on the other hand, averages around 50MB, so I chose to go with Gogs instead.

## Setup Instructions

To deploy the Gogs project on Railway, simply click through the process; everything is configured and ready to be deployed. Once deployed, visit your domain to start setting up your instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gogs | `gogs/gogs` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/krzBbF)
