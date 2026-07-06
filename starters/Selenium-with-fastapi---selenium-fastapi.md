# Deploy Selenium with fastapi on Railway

[Jul'26] Deploy FastAPI with remote Selenium for web scraping

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selenium-fastapi)

## About

Hosting Selenium with FastAPI on Railway gives you a ready-to-use setup for building scraping APIs, automation workers, and internal browser automation tools.

This template separates the application layer and browser automation layer into two services:

* FastAPI REST API
  Handles incoming HTTP requests, API routes, scraping logic, and JSON responses.

* Selenium Standalone Chrome
  Runs headless Chrome and exposes a Remote WebDriver endpoint for browser sessions.

Instead of installing ChromeDriver directly inside the FastAPI container, the FastAPI app connects to the Selenium service through a remote URL. When both services run inside Railway, you can use Railway private networking for internal service-to-service communication.

Example internal Remote WebDriver URL:

```txt
http://standalone-chrome.railway.internal:4444/wd/hub
```

If you access Selenium from outside Railway, use the public Selenium service URL instead.

Example public Remote WebDriver URL:

```txt
https://your-selenium-service.up.railway.app/wd/hub
```

This architecture keeps the FastAPI service lightweight while allowing Selenium to run separately as a dedicated browser automation service.

### How to Use

After deploying this template, Railway will create two services:

1. FastAPI REST API
2. Selenium Standalone Chrome

Open the generated Railway domain for the FastAPI service to test the starter API.

The FastAPI service connects to Selenium using a Remote WebDriver URL. In a Railway-to-Railway setup, use the private internal Railway URL for faster and private service communication.

Example environment variable for the FastAPI service:

```env
SELENIUM_REMOTE_URL=http://standalone-chrome.railway.internal:4444/wd/hub
```

If you run the FastAPI app locally on your computer, you cannot use the `.railway.internal` URL. Use the public Selenium Railway URL instead:

```env
SELENIUM_REMOTE_URL=https://your-selenium-service.up.railway.app/wd/hub
```

### Test the API

After deployment, open the FastAPI root endpoint:

```txt
https://your-fastapi-service.up.railway.app/
```

You can also test it with `curl`:

```bash
curl https://your-fastapi-service.up.railway.app/
```

### Test the Scrape Endpoint

This template already includes a sample scrape endpoint in the FastAPI REST API service.

Test the scrape endpoint using:

```txt
https://your-fastapi-service.up.railway.app/scrape
```

Or with `curl`:

```bash
curl https://your-fastapi-service.up.railway.app/scrape
```

If the FastAPI service can connect to the Selenium Standalone Chrome service correctly, the endpoint should return a JSON response from the sample scraping task.

### Open API Docs

FastAPI provides interactive API documentation automatically.

Swagger UI:

```txt
https://your-fastapi-service.up.railway.app/docs
```

ReDoc:

```txt
https://your-fastapi-service.up.railway.app/redoc
```

Use the `/docs` page to test the available API endpoints directly from your browser.

### How to Check Selenium Status

You can verify the Selenium service by opening its status endpoint.

Private Railway network:

```txt
http://standalone-chrome.railway.internal:4444/status
```

Public Railway URL:

```txt
https://your-selenium-service.up.railway.app/status
```

If the Selenium service is running correctly, it should return a JSON response showing the Selenium node status.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| selenium | `selenium/standalone-chrome` | Worker |
| fastapi | [codestorm-official/selenium-fastapi](https://github.com/codestorm-official/selenium-fastapi) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | selenium | 4444 | - |
| `START_XVFB` | selenium | true | - |
| `SE_SCREEN_WIDTH` | selenium | 1920 | - |
| `SE_SCREEN_HEIGHT` | selenium | 1080 | - |
| `SE_SESSION_TIMEOUT` | selenium | 300 | - |
| `SE_NODE_CHROME_ARGS` | selenium | --disable-dev-shm-usage --no-sandbox --disable-gpu --disable-extensions --disable-infobars --window-size=1920,1080 --headless=new --remote-allow-origins=* | - |
| `SE_NODE_MAX_SESSIONS` | selenium | 4 | - |
| `SE_NODE_SESSION_TIMEOUT` | selenium | 300 | - |
| `SE_NODE_OVERRIDE_MAX_SESSIONS` | selenium | true | - |
| `PORT` | fastapi | 8000 | - |
| `LOG_LEVEL` | fastapi | INFO | - |
| `SCRAPE_URL` | fastapi | https://www.scrapethissite.com/ | - |
| `GUNICORN_BIND` | fastapi | - | Optional full bind override, for example 0.0.0.0:8000 |
| `GUNICORN_HOST` | fastapi | 0.0.0.0 | - |
| `GUNICORN_TIMEOUT` | fastapi | 120 | - |
| `GUNICORN_WORKERS` | fastapi | 2 | - |
| `GUNICORN_ERROR_LOG` | fastapi | - | - |
| `GUNICORN_KEEPALIVE` | fastapi | 5 | - |
| `GUNICORN_ACCESS_LOG` | fastapi | - | - |
| `GUNICORN_WORKER_CLASS` | fastapi | uvicorn.workers.UvicornWorker | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/selenium-fastapi)
