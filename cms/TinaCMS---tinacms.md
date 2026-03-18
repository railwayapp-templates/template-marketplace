# Deploy TinaCMS on Railway

Deploy and Host TinaCMS with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tinacms)

## About

Hosting TinaCMS on Railway allows you to quickly deploy your CMS backend without managing complex infrastructure. By setting up a GitHub repository with your TinaCMS project and connecting it to Railway, you can deploy in just a few clicks. Railway handles server provisioning, scaling, and SSL automatically. Before deployment, ensure your GitHub repository is correctly named and linked. You will also need a GitHub Personal Access Token to enable authentication and syncing. Once deployed, you can access the TinaCMS dashboard at `/admin` using the default credentials (`tinauser` / `tinarocks`).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tina | [sukrutnrvd/tina-self-hosted](https://github.com/sukrutnrvd/tina-self-hosted) | Web service |
| http | `ghcr.io/ikatsuba/serverless-redis` | Database |
| Redis | `redis/redis-stack` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXTAUTH_SECRET` | tina | (secret) | - |
| `KV_REST_API_TOKEN` | tina | (secret) | - |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | tina | (secret) | Github credentials for onPut and onDelete. How to get |
| `HOST` | http | :: | - |
| `PORT` | http | 8080 | - |
| `SR_TOKEN` | http | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | http | true | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/tinacms)
