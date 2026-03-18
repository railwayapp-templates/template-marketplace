# Deploy Forgejo on Railway

Forgejo is a self-hosted lightweight software forge.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Ot34oR)

## About

# Forgejo is a self-hosted lightweight software forge.

## Notes
Due to Railway only allowing 1 port to be forwarded to your project, you must use HTTP for checkout and push to the repositories setup in your Gitea instance.

## Purpose
The goal of this project is to make the easiest, fastest, and most painless way of setting up a self-hosted Git service.

Forgejo is a fork of Gitea, which is itself a fork of Gogs.

## Setup Instructions
To deploy the Gitea project on Railway, just click through, all environment variables are already configured for you. Once deployed, visit your domain, and you can start setting up your instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Forgejo | `mstreicherde/forgejo` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port that Forgejo will be served under |
| `USER_GID` | 1000 | - |
| `USER_UID` | 1000 | - |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/git`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/Ot34oR)
