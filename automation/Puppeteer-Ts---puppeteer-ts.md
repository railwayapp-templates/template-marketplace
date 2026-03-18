# Deploy Puppeteer + Ts on Railway

A minimal Puppeteer setup with Typescript

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/puppeteer-ts)

## About

**Puppeteer + TypeScript** is a lightweight automation setup combining Google’s Puppeteer library with the safety and structure of TypeScript. Ideal for developers who want type safety in browser automation tasks like scraping, testing, and scripting.

This template deploys a Node.js service running Puppeteer with TypeScript support. It includes a basic TS setup with a compiler, headless Chromium launch, and sample script to get started. Designed for rapid prototyping and scalable deployment of browser automation tools, it compiles `.ts` files automatically and runs them on launch.

The included `Dockerfile` installs system dependencies for Chromium and uses a production-ready Node environment.

Eject repo to get your own code clone:

- In the service settings, under **Source**, find the **Upstream Repo** setting  
- Click the **Eject** button  
- Select the appropriate GitHub organization to create the new repository  
- Click **Eject service**  

For detailed instructions, see: [Railway Template Eject Guide](https://docs.railway.app/develop/template-eject)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| puppeteer-ts | [railtools/puppeteer-ts](https://github.com/railtools/puppeteer-ts) | Worker |

**Category:** Automation · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/puppeteer-ts)
