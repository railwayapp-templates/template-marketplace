# Deploy QR & Barcode Generator on Railway

Barcode and QR code generation API — one-click deploy on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/humble-illumination)

## About

The app uses Python + python-barcode library to generate barcodes and the qrcode library for QR codes. Each request is stateless and lightweight — no external APIs, no database, no background workers. Results are returned as SVG (scalable, tiny file size) or PNG (rasterized). Ideal for e-commerce, inventory management, logistics, and ticketing systems.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [INAPP-Mobile/railway-barcode-api](https://github.com/INAPP-Mobile/railway-barcode-api) | Web service |

## Configuration

- **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/humble-illumination)
