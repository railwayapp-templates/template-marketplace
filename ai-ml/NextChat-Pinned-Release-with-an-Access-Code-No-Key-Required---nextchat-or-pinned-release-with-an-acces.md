# Deploy NextChat | Pinned Release with an Access Code, No Key Required on Railway

NextChat pinned to a release, access code generated, no key demanded

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextchat-or-pinned-release-with-an-acces)

## About

NextChat pinned to a release, with an access code generated for you and no API key demanded before deployment.

The NextChat template on Railway builds the app from its GitHub repository rather than using the published image, and declares CODE and OPENAI_API_KEY with empty values. Railway turns every empty value into a required field, so the Deploy button stays dark until you paste an OpenAI key - for a chat UI you have not seen run yet. A quarter of its deployments do not come up.

This one runs the official image at a pinned version, generates the access code, and asks for nothing. You add a provider key afterwards, or let people bring their own.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NextChat | `yidadaa/chatgpt-next-web:v2.16.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `HOSTNAME` | 0.0.0.0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nextchat-or-pinned-release-with-an-acces)
