# Deploy Enclosed on Railway

A minimalistic application designed for sending private and secure notes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/0sqPWB)

## About

See https://docs.enclosed.cc/self-hosting/configuration for more env variables that you can set including restricting public access.

The attached volume is necessary so that notes remain in tact on re-deploy.

Github: https://github.com/CorentinTh/enclosed

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Enclosed | `corentinth/enclosed` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AUTHENTICATION_JWT_SECRET` | (secret) |
| `STORAGE_DRIVER_FS_LITE_PATH` | /data |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/0sqPWB)
