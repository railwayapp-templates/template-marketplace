# Deploy FreshRSS on Railway

Deploy and Host FreshRSS with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/freshrss)

## About

FreshRSS is a free, self-hosted RSS and Atom feed aggregator for people who want a fast, private way to follow blogs, news sites, podcasts, newsletters, and other feed-based content. It is lightweight, customizable, and ideal for users who want full control over their reading experience.

Hosting FreshRSS usually involves running the application in a container, attaching persistent storage for configuration and feed data, and choosing a supported database backend such as SQLite or PostgreSQL. Because FreshRSS is lightweight and easy to operate, it is a strong fit for self-hosted deployments on modern infrastructure platforms. With Railway, you can package FreshRSS into a reusable deployment template that makes spinning up a personal or shared feed reader much simpler. This gives users an easy way to deploy, manage, and scale their FreshRSS instance without spending much time on infrastructure setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| freshrss/freshrss:latest | `freshrss/freshrss:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Asia/Shanghai |
| `CRON_MIN` | 1,31 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/FreshRSS/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/freshrss)
