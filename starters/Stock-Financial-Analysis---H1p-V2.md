# Deploy Stock Financial Analysis on Railway

Streamlit apps for stock financial analysis using YFinance/Polygon API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/H1p-V2)

## About

##Overview
[Streamlit](https://streamlit.io/) is an open-source Python library that allows you to create and share interactive web apps and data visualisations in Python with ease. You create web apps using Python code, but with powerful add-on capabilities by Streamlit. It includes built-in support for several data visualisation libraries like matplotlib, pandas, and plotly, making it easy to create interactive charts and graphs that update in real-time based on user input.

##Template
This template uses Streamlit to deploy two simple web apps, respectively using the YFinance API and Polygon API to retrieve stock quote information.

##Learn More
* [Build an Interactive Python Web App with Streamlit](https://alphasec.io/build-an-interactive-python-web-app-with-streamlit/)
* [Stock Financial Analysis with Streamlit and YFinance API](https://alphasec.io/stock-financial-analysis-with-streamlit-and-yfinance-api/)
* [streamlit-yfinance](https://github.com/alphasecio/streamlit-yfinance) GitHub repo
* [streamlit-polygon](https://github.com/alphasecio/streamlit-polygon) GitHub repo

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

[View on Railway →](https://railway.com/template/H1p-V2)
