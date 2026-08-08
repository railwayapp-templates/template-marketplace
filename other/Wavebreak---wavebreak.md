# Deploy Wavebreak on Railway

Browser-based, cel-shaded arcade boat racing game

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wavebreak)

## About

Wavebreak is a browser-based, cel-shaded arcade boat racing game built with Vite, TypeScript, and three.js. It features an endless, living ocean and procedural generation with zero external assets. Intended for gamers and web developers, it provides a visually striking WebGL2 experience directly within modern web browsers.

Hosting Wavebreak on Railway provides a fast, globally distributed platform for serving this lightweight static web application. Since the game requires zero external assets, relies entirely on code-lofted meshes, and synthesizes audio via the Web Audio API, the infrastructure overhead is extremely minimal. Railway simplifies the deployment process by automatically building the application from the source using modern JavaScript package managers.

It does not require persistent storage, databases, or complex networking configurations. Railway provisions automatic HTTPS and handles global edge caching, ensuring low-latency access for players worldwide. Scaling is effortlessly managed by Railway's platform, adjusting to incoming web traffic seamlessly as the static bundle is delivered to players' browsers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Wavebreak | [bilalnawaz072/Wavebreak](https://github.com/bilalnawaz072/Wavebreak) (root: /web) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/wavebreak)
