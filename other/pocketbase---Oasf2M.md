# Deploy pocketbase on Railway

Open Source backend for your next SaaS and Mobile app in 1 file

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Oasf2M)

## About

**Overview:** This Docker template sets up PocketBase, a backend-as-a-service platform, using Alpine Linux for a lightweight and efficient environment. It supports specifying the PocketBase version via the `PB_VERSION` environment variable (default is 0.22.18). 

The setup includes installing necessary packages, downloading the specified PocketBase version, and running the server on port 8080. 

**Deployment Instructions:** 
Nothing required

**Steps to Get Started:**
1. Customize the `PB_VERSION` environment variable if a 
different version is required.

2. For external access, configure the `PUBLIC_URL` environment variable with your domain or public URL; this is necessary for accessing the service from the internet. It is available from the service on Railway.

3. If accessing within Railway, no additional configuration is needed.

4. Once the setup is complete, access PocketBase at `http://localhost:8080` or your public URL for further configuration and use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase | [jorgelaranjo/pocketbase](https://github.com/jorgelaranjo/pocketbase) | Worker |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/Oasf2M)
