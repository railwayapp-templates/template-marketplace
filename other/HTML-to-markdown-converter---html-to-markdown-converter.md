# Deploy HTML to markdown converter on Railway

A lightweight, efficient template for converting HTML to Markdown

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/html-to-markdown-converter)

## About

A lightweight TypeScript/Node.js template that converts HTML to Markdown using Turndown, featuring a RESTful API endpoint, health check, and Docker support for seamless Railway deployment.

Hosting this converter on Railway requires minimal configuration since all necessary files are included: the Express server with conversion logic, TypeScript configuration, Railway-specific build/deploy commands (.railway.json), and optional Dockerfile. Simply push your code to a GitHub repository, connect it to Railway, and the platform will automatically detect the build script (`npm install &amp;&amp; npm run build`) and start command (`npm start`). The service exposes port 3000 (configurable via PORT environment variable) and provides immediate HTML-to-Markdown conversion via POST /convert endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| html-markdown-converter | [INAPP-Mobile/html-markdown-converter](https://github.com/INAPP-Mobile/html-markdown-converter) | Worker |

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/html-to-markdown-converter)
