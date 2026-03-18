# Deploy astrotradeai on Railway

Deploy and Host astrotradeai.com with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cheerful-respect)

## About

# Deploy AstrotradeAI.com on Railway

A GUI-based automated stock trading dashboard powered by AI (Neural Networks) and real-time high-frequency stock monitoring.

## About AstrotradeAI.com

Deploying astrotradeai.com on Railway involves:

* Deploying the app: Push your code (or use Railway’s GitHub integration). Railway automatically builds and runs your Flask app using tools like Gunicorn and Nixpacks.

* Enabling Public Networking: In Railway's service settings, add a custom domain (e.g., astrotradeai.com). Railway will provide a CNAME target and issue an SSL certificate automatically.

* Connecting via Name.com DNS: Set a CNAME record (typically for www) pointing to the Railway-provided domain. If your provider doesn’t support CNAME on the root, use domain forwarding or a ‘www’ redirect. DNS propagation can take up to 72 hours.

## Common Use Cases

* Realized-Profit-Only Trading: Can only buy stocks if realized profits are available.
*  Web Interface: Easy-to-use visual trading dashboard.
*  High-Frequency Stock Monitoring: Checks stock prices every 2 seconds.
* Portfolio Management: Displays purchased stocks with quantity and buy price.
* Realized Profit Tracking: Live charts showing profit over time and profit percentage growth.
* Cash Balance Tracking: Live chart showing total cash + realized profit balance.
* Neural Network Model: Ready for predicting next-day stock prices (MLPRegressor).
* Transaction Logging: Automatically saves all BUY transactions to a trading_history.csv file.

## Dependencies for cheerful-respect Hosting

Core Backend Dependencies
* Flask – the web framework powering your dashboard 
* Gunicorn – production WSGI server to run your Flask app on Railway 
* Finance &amp; AI Tools
* yfinance – fetches current and historical stock data from Yahoo Finance 

### Deployment Dependencies

* https://github.com/sunil235/stock-auto-trader

## Why Deploy AstrotradeAI.com on Railway?


Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying AstrotradeAI.com on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [sunil235/stock-auto-trader](https://github.com/sunil235/stock-auto-trader) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DATABASE_URL` | postgresql://postgres:tckjnZYrwqepDMwPflSbiWdZSNpGCJLh@shortline.proxy.rlwy.net:24015/railway |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/cheerful-respect)
