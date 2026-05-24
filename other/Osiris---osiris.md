# Deploy Osiris on Railway

Open Source Global Intelligence Platform - A Palantir Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/osiris)

## About

Osiris is an open source, real-time global intelligence dashboard that aggregates live flight tracking, CCTV networks, earthquake monitoring, conflict zone mapping, NASA wildfire data, satellite tracking, and 24/7 news feeds into a single GPU-accelerated MapLibre interface. Every data point is rendered via WebGL for smooth 60fps performance with thousands of concurrent entities on screen.

Deploying Osiris requires a single web service. There is no database, no background worker, and no persistent volume — the entire application is stateless and pulls data on demand from public OSINT sources (OpenSky, USGS, NASA FIRMS, NOAA SWPC, NVD, GDELT, EONET, and 25+ broadcaster RSS feeds) through its own Next.js API routes. Rendering happens client-side via MapLibre GL. The bundled multi-stage Dockerfile produces a hardened, non-root Next.js standalone runtime image that Railway can build directly from the source repository with zero additional configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| osiris | [sinan-pauz/osiris-railway](https://github.com/sinan-pauz/osiris-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port the application listens on |
| `HOSTNAME` | 0.0.0.0 | Bind interface for the Next.js standalone server |
| `NODE_ENV` | production | Node.js environment mode |
| `AIS_API_KEY` | (secret) | Optional AIS Stream API key for live maritime vessel tracking |
| `SCANNER_KEY` | - | Optional auth key paired with SCANNER_URL |
| `SCANNER_URL` | - | Optional external port-scanner backend URL for the RECON toolkit |
| `N2YO_API_KEY` | (secret) | Optional N2YO API key for live satellite tracking and pass predictions |
| `OPENSKY_PASSWORD` | (secret) | Optional OpenSky Network password paired with OPENSKY_USERNAME |
| `OPENSKY_USERNAME` | (secret) | Optional OpenSky Network username for enhanced flight-tracking API quota |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/osiris)
