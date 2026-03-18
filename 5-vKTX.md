# Deploy iGotify on Railway

Sends Gotify notifications to iOS devices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/5-vKTX)

## About

## iGotify

A small Gotify server notification assistant that decrypt the message and trigger a Push Notifications to iOS Devices via Apple's APNs with my service SecNtfy

### Features

 - show received notifications with markdown
- decrypted the message with a public key that is generated from the iGotify device
- sending the decrypted message to SecNtfy and forwarded it to Apple's APN service, without saving the payload
- multiuser support

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| iGotify | `ghcr.io/androidseb25/igotify-notification-assist` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Internal port for iGotify |

## Configuration

- **Healthcheck:** `/api/Version`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/template/5-vKTX)
