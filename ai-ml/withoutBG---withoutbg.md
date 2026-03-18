# Deploy withoutBG on Railway

AI Image Background Removal

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/withoutbg)

## About

withoutBG is an AI-powered tool for removing backgrounds from images using advanced segmentation models.

The dockerized web app can be one-click deployed.

There is no authentication so deploy an NGINX proxy [such as this template](https://railway.com/deploy/bYH8Xt) if you'd like to add basic authentication

To use this web app as an API, simply POST the image as multi-part form data to /api/remove-background

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| withoutBG | `withoutbg/app:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/withoutbg)
