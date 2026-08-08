# Deploy 3d Chess on Railway

King's Gambit — Medieval 3D Chess

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/3d-chess)

## About

Rork Medieval 3D Chess is a cinematic, browser-based 3D chess game featuring rival civilizations represented as fully rigged, animated characters. Designed for chess enthusiasts and web graphics developers, it includes AI opponents, hotseat multiplayer, and spectacular visual effects. The game requires no backend and runs entirely in the browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 3d-chess | [bilalnawaz072/3d-chess](https://github.com/bilalnawaz072/3d-chess) (root: /web) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 8080 |

## Configuration

- **Start command:** `bunx serve dist -l tcp://0.0.0.0:$PORT`

**Category:** Other · **Languages:** TypeScript, CSS, Shell, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/3d-chess)
