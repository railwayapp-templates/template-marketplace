# Deploy Node.js on Railway

A minimal Node.js web application for REST APIs or web servers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nodejs-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/YDRT1o?referralCode=CREDITS&utm_medium=integration&utm_source=template&utm_campaign=generic)

Node.js is a JavaScript runtime built on Chrome's V8 engine that enables developers to build scalable server-side applications. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for real-time applications and APIs.

Hosting Node.js applications requires a platform that supports JavaScript runtime environments and can handle asynchronous operations efficiently. Your Node.js server needs to listen on a dynamically assigned port, manage dependencies through npm or yarn, and have access to environment variables for configuration. The hosting platform should provide automatic restarts on crashes, log streaming for debugging, and the ability to scale based on traffic demands. Modern hosting solutions detect Node.js projects automatically by reading the `package.json` file and execute the appropriate start command.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nodejs-railway | [aeither/nodejs-railway](https://github.com/aeither/nodejs-railway) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/nodejs-1)
