# Deploy Playwright Node.js Browser Automation on Railway

Production API stack with TypeScript, Express, OpenAPI, and validation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/playwright-with-nodejs)

## About

Playwright with Node.js is a browser automation and web scraping template built with Express, TypeScript, and Playwright Chromium. It provides a production-oriented API for scraping demo pages, running smoke tests, checking service health, and exploring endpoints through Swagger/OpenAPI documentation.

![](http://raw.githubusercontent.com/codestorm-official/playwright-with-nodejs/refs/heads/main/img/docs.png)

Hosting Playwright with Node.js involves running a Node.js API that can launch and control a headless Chromium browser in a server environment. This template is designed for deployment-friendly browser automation workloads, including scraping test pages, validating site availability, and exposing structured API endpoints for automation tasks. It includes Express routing, controller and service layers, request validation, logging, rate limiting, security middleware, and a Docker image that installs Playwright browser dependencies reliably for production-style deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| playwright-nodejs | [codestorm-official/playwright-with-nodejs](https://github.com/codestorm-official/playwright-with-nodejs) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 3000 |
| `NODE_ENV` | production |
| `LOG_LEVEL` | info |
| `CORS_ORIGIN` | * |
| `RATE_LIMIT_MAX` | 60 |
| `SCRAPER_BASE_URL` | https://webscraper.io/test-sites |
| `SCRAPER_MAX_LIMIT` | 50 |
| `PLAYWRIGHT_HEADLESS` | true |
| `RATE_LIMIT_WINDOW_MS` | 60000 |
| `PLAYWRIGHT_TIMEOUT_MS` | 30000 |
| `SCRAPER_ECOMMERCE_URL` | https://webscraper.io/test-sites/e-commerce/allinone |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/playwright-with-nodejs)
