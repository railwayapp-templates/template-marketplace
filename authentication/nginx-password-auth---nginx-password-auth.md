# Deploy nginx-password-auth on Railway

Put any service behind a username / password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nginx-password-auth)

## About

A lightweight nginx-based reverse proxy with HTTP Basic Authentication. Allows you to put any service behind a username/password

Set the internal network of your service as `ORIGIN` and your username / password as `BASIC_AUTH`:


| Variable           | Required | Description                                         | Example                     |
| ------------------ | -------- | --------------------------------------------------- | --------------------------- |
| `ORIGIN`           | ✅       | The upstream URL to proxy to                        | `https://myapp.railway.internal:3000` |
| `BASIC_AUTH`       | ✅\*     | Username and password in `username:password` format | `admin:mysecretpass`        |
| `BASIC_AUTH_REALM` | ❌       | Authentication realm message                        | `"Restricted Area"`         |
| `ALLOW_NO_AUTH`    | ❌       | Set to `"true"` to disable auth requirement         | `"true"`                    |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nginx-password-auth | [biw/railway-nginx-password-auth](https://github.com/biw/railway-nginx-password-auth) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `ORIGIN` | The URL that is proxied. i.e. express.railway.local:3000 |
| `BASIC_AUTH` | username:password |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nginx-password-auth)
