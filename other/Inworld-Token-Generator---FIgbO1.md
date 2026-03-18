# Deploy Inworld Token Generator on Railway

The Inworld integration token generation project

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/FIgbO1)

## About

The Inworld integration token generator project.

Connect your Inworld characters with our SDK Platforms. This project contains a server that uses the Inworld API Key, Inworld API Secret and an Inworld Scene ID to generate an authorization token to access Inworld integrations.

An Inworld account is required: https://inworld.ai/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| inworld-nodejs-generate-token | [inworld-ai/inworld-nodejs-generate-token](https://github.com/inworld-ai/inworld-nodejs-generate-token) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NOENV` | true | Used to define an .env file is not needed. |
| `INWORLD_KEY` | - | The Inworld Workspace Integration API Key. |
| `INWORLD_SCENE` | - | This is your machine readable scene id |
| `INWORLD_SECRET` | (secret) | The Inworld Workspace Integration API Secret. |

## Configuration

- **Start command:** `yarn start`

**Category:** Other · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/FIgbO1)
