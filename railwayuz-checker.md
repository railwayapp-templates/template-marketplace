# Deploy railway.uz - ticket finder on Railway

Deploy and Host railway.uz - ticket finder with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/railwayuz-checker)

## About

Railway.uz - ticket finder is an app that helps users search and discover train tickets across Uzbekistan. It provides real-time availability, schedules, and pricing, enabling travelers to plan journeys efficiently without visiting the official railway website.

Hosting railway.uz - ticket finder involves deploying a web application that connects to Uzbekistan Railway’s public endpoints or APIs to fetch train data. The app typically includes a backend server for processing requests, optional caching or database for storing user preferences, and a responsive frontend for displaying search results. Railway simplifies deployment by managing infrastructure, scaling automatically, and handling environment setup, letting developers focus on improving app functionality rather than server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway_finder | [mrmuminov/railway_finder](https://github.com/mrmuminov/railway_finder) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_TO` | - | TO station (2900000) |
| `APP_DATE` | - | Date (YYYY-MM-DD) |
| `APP_FROM` | - | FROM station (2900000) |
| `APP_CHAT_ID` | - | Telegram chat id for Alert |
| `APP_INTERVAL` | 30 | Check every N second (loop) |
| `APP_MAX_COST` | 1000000 | Maximum price of ticket |
| `APP_BOT_TOKEN` | (secret) | Telegram bot API key for alert (8451:AAEgh8zM8....) |

**Category:** Automation · **Languages:** PHP, Dockerfile

[View on Railway →](https://railway.com/template/railwayuz-checker)
