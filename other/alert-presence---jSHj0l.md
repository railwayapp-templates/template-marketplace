# Deploy alert-presence on Railway

nbkrist-student-details-update

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jSHj0l)

## About

This template updates NBKR student details on nbkstudenthub.me by scraping data from the college website. It requires a valid student ID and password to log in, fetch academic data, and sync it with the student portal automatically,then it upadte the scraped data into supabase and that data is visible in the student details webiste

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [nrenx/nbkr-webupload-railway](https://github.com/nrenx/nbkr-webupload-railway) | Web service |

## Configuration

- **Start command:** `gunicorn app:app`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, HTML, Shell, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/jSHj0l)
