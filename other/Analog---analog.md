# Deploy Analog on Railway

Analog, the Full-Stack Angular Framework

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/analog)

## About

Analog.js is a fullstack meta-framework for Angular that enables server-side rendering, file-based routing, and API routes in a single application. Built on Vite for fast development and optimized production builds, Analog.js provides a modern developer experience while maintaining Angular's powerful features and ecosystem.

Hosting Analog.js on Railway involves deploying a Node.js server that handles both client-side navigation and server-side rendering. The application builds static assets for optimal performance and runs an Express-like server Railway's platform automatically detects Node.js applications, manages the build process with Vite, and provides health monitoring through the built-in /health endpoint. The deployment process requires zero Docker configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Analog | [LouisPetrik/railway-analog](https://github.com/LouisPetrik/railway-analog) | Worker |

**Category:** Other · **Languages:** TypeScript, Dockerfile, HTML, CSS

[View on Railway →](https://railway.com/deploy/analog)
