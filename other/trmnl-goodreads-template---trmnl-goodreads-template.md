# Deploy trmnl-goodreads-template on Railway

Display your current Goodreads reading progress on TRMNL e-ink devices.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trmnl-goodreads-template)

## About

A Flask backend that transforms your Goodreads RSS feed into beautiful reading progress displays for TRMNL e-ink devices. Features intelligent data fusion, automatic challenge tracking, and optimized JSON output for TRMNL templates.

This lightweight Flask application continuously processes your Goodreads RSS feed to provide clean JSON data for your TRMNL device. Includes smart caching (5-minute book data, 30-minute challenge updates) to minimize API calls while keeping reading progress current. Simply deploy, configure your Goodreads RSS URL, and connect to your TRMNL device.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [goodlibbin/trmnl-goodreads-template](https://github.com/goodlibbin/trmnl-goodreads-template) | Web service |

## Configuration

- **Start command:** `python app.py`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/trmnl-goodreads-template)
