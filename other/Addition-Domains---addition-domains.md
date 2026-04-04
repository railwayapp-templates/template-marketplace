# Deploy Addition Domains on Railway

Extra Railway/custom domains for your container

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/addition-domains)

## About

Each service/container on Railway only supports 1 public railway domain (xxx.up.railway.app). This one gets you another, by using reserve proxy

You will need to have your main container/service up and running first. after that use this template as a reserve proxy layer

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Railway-Addition-Domains | [lequanghuylc/Railway-Addition-Domains](https://github.com/lequanghuylc/Railway-Addition-Domains) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CLIENT_MAX_BODY_SIZE` | 5G |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/addition-domains)
