# Deploy Selenium with flask on Railway

[Jun'26] Deploy Flask API with remote Selenium for web scraping

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selenium-flask)

## About

Hosting Selenium with Flask on Railway gives you a ready-to-use setup for building browser automation APIs, scraping workers, and internal automation tools.

This template separates the application layer and browser automation layer into two services:

* Flask REST API
  Handles incoming HTTP requests, API routes, scraping logic, and response formatting.

* Selenium Standalone Chrome
  Runs headless Chrome and exposes a Remote WebDriver endpoint for browser sessions.

Instead of installing ChromeDriver directly inside the Flask container, the Flask app connects to the Selenium service through a remote URL. When both services run inside Railway, you can use Railway private networking for internal service-to-service communication.

Example internal Remote WebDriver URL:

```txt
http://standalone-chrome.railway.internal:4444/wd/hub
```

If you access Selenium from outside Railway, use the public Selenium service URL instead.

Example public Remote WebDriver URL:

```txt
https://your-selenium-service.up.railway.app/wd/hub
```

This architecture keeps the Flask API lightweight while allowing Selenium to run as a dedicated browser automation service.

### How to Use

After deploying this template, Railway will create two services:

1. Flask REST API
2. Selenium Standalone Chrome

Open the generated Railway domain for the Flask service to test the starter API.

The Flask service connects to Selenium using a Remote WebDriver URL. In a Railway-to-Railway setup, use the private internal Railway URL for faster and private service communication.

Example environment variable for the Flask service:

```env
SELENIUM_REMOTE_URL=http://standalone-chrome.railway.internal:4444/wd/hub
```

If you run the Flask app locally on your computer, you cannot use the `.railway.internal` URL. Use the public Selenium Railway URL instead:

```env
SELENIUM_REMOTE_URL=https://your-selenium-service.up.railway.app/wd/hub
```

### Test the Scrape Endpoint

This template already includes a sample scrape endpoint in the Flask REST API service.

After deployment, test the Flask service using:

```txt
https://your-flask-service.up.railway.app/scrape
```

You can also test it with `curl`:

```bash
curl https://your-flask-service.up.railway.app/scrape
```

If the Flask service can connect to the Selenium Standalone Chrome service correctly, the endpoint should return a JSON response from the sample scraping task.

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
| flask | [codestorm-official/selenium-flask](https://github.com/codestorm-official/selenium-flask) | Web service |
| selenium | `selenium/standalone-chrome` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | flask | 8000 |
| `LOG_LEVEL` | flask | INFO |
| `SCRAPE_URL` | flask | https://www.scrapethissite.com/ |
| `GUNICORN_HOST` | flask | 0.0.0.0 |
| `GUNICORN_TIMEOUT` | flask | 120 |
| `GUNICORN_WORKERS` | flask | 2 |
| `GUNICORN_ERROR_LOG` | flask | - |
| `GUNICORN_KEEPALIVE` | flask | 5 |
| `GUNICORN_ACCESS_LOG` | flask | - |
| `GUNICORN_WORKER_CLASS` | flask | sync |
| `PORT` | selenium | 4444 |
| `START_XVFB` | selenium | true |
| `SE_SCREEN_WIDTH` | selenium | 1920 |
| `SE_SCREEN_HEIGHT` | selenium | 1080 |
| `SE_SESSION_TIMEOUT` | selenium | 300 |
| `SE_NODE_CHROME_ARGS` | selenium | --disable-dev-shm-usage --no-sandbox --disable-gpu --disable-extensions --disable-infobars --window-size=1920,1080 --headless=new --remote-allow-origins=* |
| `SE_NODE_MAX_SESSIONS` | selenium | 4 |
| `SE_NODE_SESSION_TIMEOUT` | selenium | 300 |
| `SE_NODE_OVERRIDE_MAX_SESSIONS` | selenium | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/selenium-flask)
