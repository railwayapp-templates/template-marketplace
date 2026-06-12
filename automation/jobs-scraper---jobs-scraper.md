# Deploy jobs-scraper on Railway

A template for a jobs scraper API from a popular job hosting website

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jobs-scraper)

## About

jobs-scraper is a FastAPI app that scrapes LinkedIn's public job search results and returns structured job listings including title, company, location, description, salary, and seniority, as JSON. Built for daily automation workflows and LLM-based filtering pipelines.

jobs-scraper exposes a single POST endpoint (`/jobs`) that accepts search keywords, location, and work type filters. On each request it scrapes LinkedIn's public guest job search API, fetches individual job detail pages for full descriptions, and returns clean structured JSON. Hosting on Railway gives you a persistent, always-on URL you can hit from automation tools like Make, Zapier, or a cron job — no local machine required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [jmurray6/jobs_scraper](https://github.com/jmurray6/jobs_scraper) | Web service |

## Configuration

- **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/jobs-scraper)
