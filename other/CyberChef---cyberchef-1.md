# Deploy CyberChef on Railway

GCHQ CyberChef 11.5, the web app for encoding, decoding and data analysis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cyberchef-1)

## About

CyberChef is GCHQ's web app for encoding, decoding, encryption, compression and data analysis. You drag operations such as Base64, hex, AES, XOR, hashing, regular expressions and JSON formatting into a recipe and see the result instantly. It runs fully in the browser, so the data you paste never leaves your machine.

This template deploys CyberChef v11.5.0 from the official image, a small nginx server that serves the static app on port 8080. There is no database, no volume and no account system, because every operation runs in the visitor's browser and nothing is sent back to the server. That makes it a good fit for a team-internal copy that works without depending on the public instance. The service uses very little memory and fits easily on the Hobby plan. Recipes can be saved as links or in the browser's local storage and shared with colleagues.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cyberchef | `ghcr.io/gchq/cyberchef:11.5.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/cyberchef-1)
