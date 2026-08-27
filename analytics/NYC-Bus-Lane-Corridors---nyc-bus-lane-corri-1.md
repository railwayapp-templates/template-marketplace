# Deploy NYC Bus-Lane Corridors on Railway

Before/after bus speed, trip time & ridership for NYC bus-lane routes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nyc-bus-lane-corri-1)

## About

NYC Bus-Lane Corridors is an interactive CARTO + deck.gl map that shows, for Manhattan's 5 busiest bus-only-lane routes, how bus **speed**, **trip time**, and **ridership** changed **before vs. after** the lane. Ride each route end-to-end (a "before-lane" point races an "after-lane" point), scrub the trip, and read Apache ECharts panels — all streaming live from CARTO. Themed for the [Spatial Data Science Conference](https://spatial-data-science-conference.com/) (New York, Oct 20–21, 2026).

It's a static Vite + React single-page app. Railway builds it with `npm run build` and serves the compiled `dist/` with `vite preview` on the injected `$PORT` (config in `railway.json`). There is no backend and no database — the app talks directly to the CARTO Maps + Widget APIs from the browser using a referer-locked public token, so hosting is just a small static web service. A public domain is generated automatically on deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nyc-bus-corridors | [gabrielAHN/nyc-bus-corridors-app](https://github.com/gabrielAHN/nyc-bus-corridors-app) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `VITE_CARTO_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** TypeScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/nyc-bus-lane-corri-1)
