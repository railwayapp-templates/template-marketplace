# Deploy MDView on Railway

block-based Markdown editor — Supports HWP/HWPX import and export

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mdview)

## About

MDView is a Korean-friendly, block-based WYSIWYG Markdown editor designed to seamlessly bridge Hangul documents and Markdown. It provides an intuitive editing experience with drag-and-drop support, slash commands, and offline capabilities. It is ideal for writers, developers, and professionals needing robust document conversion and large-file handling.

Hosting MDView on Railway provides a fast, scalable environment for running this Next.js application. Railway manages the underlying infrastructure, automatically handling the build process from the source code and deploying the server. Because MDView utilizes IndexedDB for local, in-browser autosaving and offline Progressive Web App support, the backend primarily serves the application assets and handles server-side rendering.

This architectural design means you do not need to configure persistent server volumes or external databases to get started. Railway's automatic HTTP proxy routing seamlessly connects your domain to the application, providing out-of-the-box HTTPS encryption and zero-downtime deployments. As traffic increases, Railway allows you to scale compute resources instantly to handle the load efficiently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mdview | [bilalnawaz072/mdview](https://github.com/bilalnawaz072/mdview) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/mdview)
