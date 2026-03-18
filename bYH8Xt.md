# Deploy railway-docker-nginx-basic-auth on Railway

Add basic auth to your web app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bYH8Xt)

## About

This is for web application running in railway.app which need a basic auth without modifing source code.

This template uses `nginx:alpine` in docker. You can modify your username and password by change enviroment variables.

Just leave `ENABLE_ALPINE_PRIVATE_NETWORKING` with value `true`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nginx-basic-auth | [toyjack/railway-nginx-basic-auth](https://github.com/toyjack/railway-nginx-basic-auth) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | for nginx expose |
| `PASSWORD` | (secret) | - |
| `USERNAME` | (secret) | - |
| `PROXY_PASS` | http://xxx.railway.internal:3000 | for railway web app needs basic auth |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | true | for alpine image working on private network |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/bYH8Xt)
