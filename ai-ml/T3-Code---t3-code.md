# Deploy T3 Code on Railway

T3 code hosted on railway with the web app open to the public

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/t3-code)

## About

This template is a simple docker file allowing you to host a t3 code instance publicly on railway. It will allow you to run your agents remotely and connect using the connection string

https://github.com/tpkowastaken/railway-t3-code

1. Add this template
2. Once the application is deployed you will need to get the connection token. You will find that in deploy logs of the latest deployment. On migrations to a different location, you will need to redeploy and get the connection string again
3. Open The public link from railway. You need to click on the instance, settings and there it should be
4. Once you open the public url set by Railway, you will need to put this token there to access
5. After that press ctrl + j or cmd + j do codex login --device-auth to login to the codex cli.

You are free to setup other developer tools, mcps and connectors as you wish.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-t3-code | [tpkowastaken/railway-t3-code](https://github.com/tpkowastaken/railway-t3-code) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/t3-code)
