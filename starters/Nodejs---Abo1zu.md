# Deploy Node.js on Railway

A minimal Node.js web application.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Abo1zu)

## About

Node.js (sometimes referred to as NodeJS) is an open-source, event-driven JavaScript runtime environment, frequently used to build server-side web applications. It is built on top of the Google Chrome V8 JavaScript engine, making it extremely fast and efficient for real-time data-intensive applications. It also has a large and active developer community, with plenty of modules and libraries for easy integration and extensibility.

Hosting Node.js means running JavaScript applications on the server side using the V8 JavaScript engine to handle HTTP requests, file operations, and real-time connections. The runtime manages event loops, handles asynchronous operations, and coordinates npm package dependencies across different environments. Production deployment requires managing package installations, environment variable configuration, process monitoring, and handling concurrent connections efficiently. Railway automates the Node.js deployment process by detecting package.json files, managing npm installations, configuring environment variables, and handling process management with automatic restarts and scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nodejs | [alphasecio/nodejs](https://github.com/alphasecio/nodejs) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/Abo1zu)
