# Deploy Playwright Node.js Browser Automation on Railway

[Jul'26] Playwright with TypeScript, Express, OpenAPI & validation stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/playwright-with-nodejs)

## About

Playwright with Node.js is a browser automation and web scraping template built with Express, TypeScript, and Playwright Chromium. It provides a production-oriented API for scraping demo pages, running smoke tests, checking service health, and exploring endpoints through Swagger/OpenAPI documentation.

![](http://raw.githubusercontent.com/codestorm-official/playwright-with-nodejs/refs/heads/main/img/docs.png)

Hosting Playwright with Node.js involves running a Node.js API that can launch and control a headless Chromium browser in a server environment. This template is designed for deployment-friendly browser automation workloads, including scraping test pages, validating site availability, and exposing structured API endpoints for automation tasks. It includes Express routing, controller and service layers, request validation, logging, rate limiting, security middleware, and a Docker image that installs Playwright browser dependencies reliably for production-style deployments.

### How to Use

After deploying this template, the app is already running on Railway. You can open the generated Railway domain to test the starter app immediately.

If you want to customize the source code, use one of the workflows below.

#### Via Railway CLI

Use this workflow if you want to edit the project locally and redeploy changes directly from your machine using Railway CLI.

1. Deploy the template.
2. Clone the repository from **Source Repo** or **Upstream Repo** in the Railway dashboard.
3. Enter the project directory:

```bash
cd 
```

4. Link your local project directory to the deployed Railway project:

```bash
railway link
```

5. Check the linked project, environment, service, and repository information:

```bash
railway status
```

6. Edit the code locally.
7. Redeploy your local changes to Railway:

```bash
railway up
```

Railway will upload the current local directory and deploy it to the linked service.

#### Via Git / GitHub

Use this workflow if you want to manage changes through GitHub and let Railway automatically redeploy after every push.

1. Deploy the template.
2. Open **Source Repo** or **Upstream Repo** from the Railway dashboard.
3. Fork the repository to your own GitHub account.
4. Clone your fork locally:

```bash
git clone 
cd 
```

5. Edit the code locally.
6. Commit and push your changes to your fork:

```bash
git add .
git commit -m "Customize Node.js starter"
git push origin main
```

7. In Railway, change the service **Source Repo** to your fork if Railway does not automatically create or link it.
8. After the service is connected to your fork, future pushes to the repository can trigger automatic redeployments.

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
