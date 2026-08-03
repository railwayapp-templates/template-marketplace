# Deploy 3d Cinematic Portfolio on Railway

3d interactive award winning portfolio

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/3d-cinematic-portfolio)

## About

Astro Portfolio is an open-source, high-performance personal portfolio built with Astro, SCSS, and JavaScript. Designed for developers and creative professionals, it showcases projects, experience, and accomplishments with a modern layout, optimized asset delivery, and fast page load speeds.

Railway hosts Astro Portfolio as a web service running Node.js in a containerized environment. Railway automatically builds the application from the repository Dockerfile or package settings and binds the web preview server to the assigned container port.

The deployment requires no persistent volumes or external databases, making it lightweight and fully stateless. Railway handles HTTP networking, automatic SSL/TLS certificate provisioning, zero-downtime deployments, and global custom domains. You can easily scale compute resources or adjust build configurations via the Railway dashboard without managing underlying server infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 3d-Portfolio | [bilalnawaz072/AW-2025-Portfolio](https://github.com/bilalnawaz072/AW-2025-Portfolio) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 4321 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Astro, SCSS, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/3d-cinematic-portfolio)
