# Deploy Stock Financial Analysis on Railway

Streamlit apps for stock financial analysis using YFinance/Polygon API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/H1p-V2)

## About

Stock financial analysis involves retrieving and visualising real-time and historical market data for a given stock ticker. This template uses [Streamlit](https://streamlit.io/) with the [YFinance](https://github.com/ranaroussi/yfinance) and [Massive](https://massive.com/) (formerly Polygon.io) APIs to display key financial metrics interactively.

Hosting a stock financial analysis app requires a Python runtime with access to financial data APIs and a web server to serve the Streamlit interface. This template deploys two Streamlit apps — one powered by the YFinance API and one by the Massive API (formerly Polygon.io). Each app retrieves stock ticker details, plots a 30-day historical price chart, and displays key financial metrics including market cap, revenue, assets, liabilities, EPS, and previous day's OHLCV data. Railway handles all infrastructure provisioning, so no manual server configuration is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| streamlit-yfinance | [alphasecio/streamlit-yfinance](https://github.com/alphasecio/streamlit-yfinance) | Web service |
| streamlit-polygon | [alphasecio/streamlit-polygon](https://github.com/alphasecio/streamlit-polygon) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | streamlit-yfinance | 8501 |
| `PORT` | streamlit-polygon | 8501 |

## Configuration

- **Start command:** `streamlit run streamlit_app.py`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Jupyter Notebook

[View on Railway →](https://railway.com/deploy/H1p-V2)
