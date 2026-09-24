# Deploy Gotify on Railway

Gotify 3.1 self-hosted push notification server with REST and WebSocket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gotify-2)

## About

Gotify is a simple, self-hosted server for sending and receiving push notifications. Applications, scripts and CI jobs post messages over a REST API using an app token, and clients receive them in real time over WebSocket, through the web UI, the Android app or any tool that speaks its API.

This template deploys Gotify v3.1.1, the first major release with environment-only configuration, as a single service with a SQLite database on a Railway volume at `/app/data`. The admin account is `admin` with a password generated at deploy time, registration is disabled, and session cookies are marked secure because Railway serves it over HTTPS. Gotify is light, so the Hobby plan is enough and the volume only grows with stored messages and images. Log in, create an application to get a sending token, then post messages from anywhere with `curl` or any HTTP client.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gotify | `gotify/server:3.1.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `GOTIFY_SERVER_PORT` | 80 |
| `GOTIFY_REGISTRATION` | false |
| `GOTIFY_DEFAULTUSER_NAME` | admin |
| `GOTIFY_SERVER_SECURECOOKIE` | true |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gotify-2)
