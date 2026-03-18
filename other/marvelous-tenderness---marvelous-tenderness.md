# Deploy marvelous-tenderness on Railway

Deploy and Host marvelous-tenderness with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/marvelous-tenderness)

## About

UX Audit Bot is a web application that performs comprehensive user experience (UX) and technical audits of websites. It analyzes visual hierarchy, navigation, typography, accessibility, mobile responsiveness, and provides Lighthouse performance metrics including SEO, security, and best practices scores.

Hosting UX Audit Bot involves running a Node.js Express server that uses Puppeteer and Lighthouse to perform automated website audits. The application requires Chrome/Chromium dependencies for headless browser automation, making it essential to deploy on a platform that supports these requirements. Railway's NIXPACKS builder automatically detects and installs necessary system dependencies, including Chrome for Puppeteer. The application exposes REST API endpoints for audit operations and serves a web interface for interactive audits. Configuration is handled through `railway.json`, which specifies the start command, health checks, and restart policies to ensure reliable operation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ux-audit-bot | [yatarasov724/ux-audit-bot](https://github.com/yatarasov724/ux-audit-bot) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/marvelous-tenderness)
