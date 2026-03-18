# Deploy bento on Railway

Transform your Bento profile with a personalized domain name

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/6fVSiZ)

## About

1. Create a [Railway account](https://railway.com?referralCode=HB99pt) if you don't have one.
2. Click the button below to deploy using this repo as a template:
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/6fVSiZ?referralCode=HB99pt)
5. Railway will automatically detect the project and set up the necessary environment.
6. You'll be prompted to configure environment variables:
   - `BENTO_USERNAME`: Your Bento username
7. Click "Deploy" to start the deployment process.
8. Once deployed, you'll get a URL to access your Bento profile with a custom domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bento | [vixshan/bento](https://github.com/vixshan/bento) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `BENTO_USERNAME` | (secret) |

## Configuration

- **Start command:** `bun start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** TypeScript, Dockerfile, Procfile

[View on Railway →](https://railway.com/template/6fVSiZ)
