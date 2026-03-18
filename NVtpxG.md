# Deploy paste.croissant.one on Railway

Simple, no frills place to paste text. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/NVtpxG)

## About

# Croissant Paste it: The No-Annoyance Text Sharing App

## Overview

**Croissant Paste it** is a lightweight, no-nonsense web application for sharing text. Whether you're collaborating on code, jotting down notes, or simply need a quick place to store and share text, **Paste it** offers a clean and simple solution. Built with Node.js, Express, and React.js, it prioritizes user experience by eliminating ads, distractions, trackers, and unnecessary features, allowing you to focus on what matters: your experience.

## Features

- **No Ads, No Distractions**: A clean and minimalist interface free of ads and pop-ups, ensuring a seamless user experience.
- **Simplicity at Its Core**: Designed for ease of use, with an intuitive interface that requires no learning curve.
- **Quick Text Sharing**: Instantly generate shareable URLs for your text, making collaboration and sharing effortless.
- **Custom URLs**: Create custom URLs by navigating to `/custom` and pasting your text, making it even easier to share content with personalized links.
- **Fast and Lightweight**: Optimized for speed and performance, providing a smooth experience even on slow networks.
- **Privacy-Focused**: No user tracking or data collection. Your text is only accessible to those with whom you share it.
- **Responsive Design**: Access and use Croissant Paste it on any device—desktop, tablet, or mobile.

## Technology Stack

- **Node.js**: Ensures efficient and scalable server-side logic.
- **Express.js**: Handles backend routing and middleware with robustness and flexibility.
- **React.js**: Powers the dynamic, responsive user interface, enabling real-time interactions.


Contributions to **Croissant Paste it** are welcome! Feel free to fork the repository, make improvements, and submit pull requests.

https://github.com/arhammusheer/paste.croissant.one

You're also welcome to demo or just use the prod deploy at https://paste.croissant.one

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Paste frontend | [arhammusheer/paste.croissant.one](https://github.com/arhammusheer/paste.croissant.one) (root: /frontend) | Web service |
| Paste backend | [arhammusheer/paste.croissant.one](https://github.com/arhammusheer/paste.croissant.one) (root: /backend) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISHOST` | - | Railway Private Domain Name. |
| `REDISPORT` | 6379 | Port to connect to Redis. |
| `REDISUSER` | default | Default user to connect to Redis. |
| `REDIS_URL` | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | no | Disable writing to AOF file. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** TypeScript, JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/template/NVtpxG)
