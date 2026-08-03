# Deploy 3D Portfolio on Railway

Interactive 3D developer portfolio with 3d animations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/3d-portfolio)

## About

Interactive 3D Developer Portfolio is a modern, high-performance web application designed to showcase a developer's skills, projects, and work experience. Built with Next.js, React, TypeScript, GSAP, and Framer Motion, it features an interactive 3D keyboard rendered via Spline where each keycap represents a specific skill. It is intended for software engineers, web developers, and creators looking for a visually striking online presence.

Deploying the Interactive 3D Developer Portfolio on Railway provides a streamlined, zero-config hosting experience for Next.js applications. Railway builds the application directly from the source repository using its native Next.js build detection.

The service operates as a web process receiving incoming web traffic. Railway provides automatic HTTPS certificates and custom domain routing via its public networking infrastructure. Because this is a static/SSR frontend application, no persistent volumes or database services are strictly required for core functionality. However, if you choose to enable optional features like email delivery through Resend or analytics via Umami, Railway manages the associated environment variables securely across deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 3d-portfolio | [bilalnawaz072/3d-portfolio](https://github.com/bilalnawaz072/3d-portfolio) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RESEND_API_KEY` | (secret) | API key from Resend for the contact form |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, SCSS, MDX, JavaScript

[View on Railway →](https://railway.com/deploy/3d-portfolio)
