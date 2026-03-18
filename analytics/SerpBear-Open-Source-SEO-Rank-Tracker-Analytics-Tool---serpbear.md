# Deploy SerpBear (Open-Source SEO Rank Tracker & Analytics Tool) on Railway

SerpBear [Mar ’26] (Track Keyword Rankings & SERP Changes) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/serpbear)

## About

In today's digital landscape, monitoring your website's performance on search engines is crucial for maintaining and improving your online presence. SerpBear is an open-source, privacy-focused, and cost-effective solution that allows you to track your website's keyword positions on Google. With the convenience of Railway's one-click deployment, setting up SerpBear has never been easier.

![SerpBear: Open-Source Search Engine Ranking Tracker for Privacy-Focused SEO Monitoring
Image](https://res.cloudinary.com/dojdzamvk/image/upload/v1761750238/serpbear-thumbnail-032423fdd758576508f542b1bcd7b0b5_nufcui.png "Hosting SerpBear on Railway platform”)

Self-hosting SerpBear on Railway provides you with complete control over your SEO data, ensuring privacy and customization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| towfiqi/serpbear | `towfiqi/serpbear` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `USER` | admin |
| `SECRET` | (secret) |
| `PASSWORD` | (secret) |
| `SESSION_DURATION` | 24 |
| `NEXT_PUBLIC_APP_URL` | https://${RAILWAY_PUBLIC_DOMAIN} |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Analytics

[View on Railway →](https://railway.com/template/serpbear)
