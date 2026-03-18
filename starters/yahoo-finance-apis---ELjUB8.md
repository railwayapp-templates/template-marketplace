# Deploy yahoo-finance-apis on Railway

Deploy a real-time stock price API with FastAPI in one click!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ELjUB8)

## About

🧩 About This Template
This template deploys a lightweight FastAPI application that fetches real-time stock market data using the popular yfinance Python library.
It allows users to query stock tickers (like AAPL, TSLA, MSFT) and retrieve the latest closing prices from Yahoo Finance via a simple REST API.

Perfect for developers, students, and finance enthusiasts who want fast and easy access to stock market data without setting up complex servers or paying for APIs.

🚀 Features
- Fetch real-time stock prices (latest closing price).
- Simple and fast API built using FastAPI and Uvicorn.
- Deployed in minutes using Railway’s one-click deployment.
- Lightweight & cost-effective for hobby, testing, and prototyping projects.
- Open-source and easy to extend (e.g., historical data, financial ratios, etc.).

⚙️ Technologies Used

- FastAPI — Web framework for building APIs quickly.
- Uvicorn — Lightning-fast ASGI server.
- yfinance — Yahoo Finance data downloader.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| yahoo-finance-railway | [arpand9/yahoo-finance-railway](https://github.com/arpand9/yahoo-finance-railway) | Web service |

## Configuration

- **Start command:** `web: uvicorn app:app --host 0.0.0.0 --port ${PORT}`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/ELjUB8)
