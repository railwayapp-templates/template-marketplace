# Deploy SvelteKit on Railway

Deploy SvelteKit in 1-click. It just works. 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sveltekit-starter)

## About

SvelteKit is a modern web application framework built on Svelte. It provides routing, server-side rendering, build optimization, and flexible rendering modes out of the box, making it a great choice for fast, interactive, production-ready web apps with a simple developer experience.

![](https://raw.githubusercontent.com/codestorm-official/sveltekit-starter/refs/heads/main/docs/assets/sveltekit-hp.png)

Hosting a SvelteKit app usually involves building the application for production, choosing the correct adapter, and running the generated server output on a Node-compatible runtime. This template uses `@sveltejs/adapter-node`, which makes it suitable for Railway and other Node.js hosting environments. Railway can deploy the app from GitHub, through the Railway CLI, or with the included Dockerfile. For production, the app is built with `npm run build` and started with `npm run start`. Railway can also provide a public domain, environment variables, logs, and optional services like databases or Redis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sveltekit-starter | [codestorm-official/sveltekit-starter](https://github.com/codestorm-official/sveltekit-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Svelte, TypeScript, CSS, JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/sveltekit-starter)
