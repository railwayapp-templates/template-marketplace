# Deploy Door Prize Web App on Railway

Door Prize System built with Go (Fiber) & Tailwind UI. Zero-database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/door-prize-web-app)

## About

The Door Prize Web App is a high-performance digital raffle tool built with the GoFiber framework and a clean HTML/JS frontend. It allows event organizers to manage participant lists and pick winners randomly with a smooth, interactive interface, ensuring fairness and excitement for any giveaway or corporate event.

Hosting the Door Prize Web App involves deploying a Go binary along with its static assets (HTML, CSS, and JS). Using a framework like GoFiber ensures the application has an extremely low memory footprint, making it ideal for cloud hosting. The deployment process typically includes setting up a continuous integration pipeline where Railway detects your Go environment, installs the necessary modules via go.mod, builds the executable, and serves it over a secure port. Because the app is stateless by default, it starts up instantly and can handle hundreds of concurrent users during a live drawing without lag.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| free_doorprize | [karyalimi/free_doorprize](https://github.com/karyalimi/free_doorprize) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** HTML, JavaScript, Dockerfile, Go

[View on Railway →](https://railway.com/deploy/door-prize-web-app)
