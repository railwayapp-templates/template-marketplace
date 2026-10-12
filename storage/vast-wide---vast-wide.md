# Deploy vast-wide on Railway

Helps you to collecting data from small projects

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vast-wide)

## About

Its Fast Aunthefication API for collecting data from landings.

FF

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fastserverForLandings | [kirb112008-prog/fastserverForLandings](https://github.com/kirb112008-prog/fastserverForLandings) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5000 | The server port |
| `ACCESS_TOKEN` | (secret) | Super secret API key |
| `ALLOWED_URLS` | `http://localhost:3000` | Origin URLs |

## Configuration

- **Start command:** `node ./src/index.js`

**Category:** Storage · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/vast-wide)
