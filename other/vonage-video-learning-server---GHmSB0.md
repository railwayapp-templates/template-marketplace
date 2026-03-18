# Deploy vonage-video-learning-server on Railway

The Vonage Video Learning Server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/GHmSB0)

## About

A sample server app shows you how to use Vonage Video Node Server SDK to create OpenTok sessions, generate tokens for those sessions, archive (or record) sessions, and download those archives. This backend server can be used to kick-start your own projects or use alongside our existing demos.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vonage-video-learning-server | [Vonage-Community/sample-video-node-learning_server/](https://github.com/Vonage-Community/sample-video-node-learning_server/) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEY` | (secret) | Your Vonage API Key. Required to use SIP Connectivity. |
| `API_SECRET` | (secret) | Your Vonage API Secret. Required to use SIP Connectivity. |
| `PRIVATE_KEY64` | - | Your Vonage Private Key as a base64-encoded value ( Linux: cat private.key | base64 -w 0 \n Mac: cat private.key | base64 -b 0 ): Login to the Vonage Dashboard (https://dashboard.nexmo.com/applications) to get this value |
| `CONFERENCE_NUMBER` | - | The phone number linked to your Vonage Application. Required for SIP Connectivity. |
| `API_APPLICATION_ID` | - | Vonage Application Id: Login to the Vonage Dashboard (https://dashboard.nexmo.com/applications) to get this value. |

## Configuration

- **Start command:** `npm start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Pug, CSS, Procfile

[View on Railway →](https://railway.com/deploy/GHmSB0)
