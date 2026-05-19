# Deploy Selenium + FastAPI on Railway

Lightweight Selenium and FastAPI template for fast scraping on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selenium-fastapi)

## About

Selenium + FastAPI is a compact starter setup for running browser-driven scraping inside a container. It bundles headless Chromium, a tuned ChromeDriver configuration, and a clean API layer so scraping tasks can be triggered easily through HTTP.

Hosting Selenium + FastAPI on Railway ensures that all components needed for headless browser tasks run smoothly inside a managed container. Railway handles build steps, networking, environment variables, and scaling, while your service focuses on fetching pages, running browser actions, and parsing data through FastAPI endpoints. The system avoids manual browser setup and remains light enough for small plans. You can extend it with schedulers, queues, or new endpoints without touching the core setup.

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
| selenium-fastapi | [codestorm-official/selenium-fastapi](https://github.com/codestorm-official/selenium-fastapi) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CHROMEDRIVER_PATH` | /usr/bin/chromedriver | CHROMEDRIVER_PATH |
| `GOOGLE_CHROME_BIN` | /usr/bin/chromium | CHROMEDRIVER_PATH |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/selenium-fastapi)
