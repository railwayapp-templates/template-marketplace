# Deploy Is On Water on Railway

Check if coordinate is on water (seas, lakes, and rivers) with 1m precision

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/MfUYQX)

## About

# `is-on-water`

💧HTTP API using reverse geocoding to check whether a geographic coordinate is on water (seas, lakes, and rivers) with 1m precision

- Single coordinate

`GET /api/water?lat=${lat}&lon=${lon}`

- Batch coordinates

`POST /api/water` with body containing array of coordinate objects `[{ lat, lon }, { lat, lon }, ...]`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [osbytes/is-on-water](https://github.com/osbytes/is-on-water) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/MfUYQX)
