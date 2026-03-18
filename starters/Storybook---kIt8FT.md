# Deploy Storybook on Railway

Build, document, and showcase your React components in a UI library

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kIt8FT)

## About

# Storybook Template

## Overview
A production-ready template that turns your React (NextJS) components into a static component library, giving your team a permanent URL to browse and reference your UI components.

## Highlights
- Zero-configuration deployment
- Automatic rebuilds on every push
- Static hosting for fast component browsing
- Pre-configured Storybook 8 setup
- Built on Next.js 14 with TypeScript and Tailwind
- Full component isolation and documentation
- Perfect for teams needing a component showcase

## Local Development

```bash
# Install dependencies
npm install

# Run Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

## Learn More
- [Storybook](https://storybook.js.org/)
- [Documentation](https://docs.storybook.js.org/)

## Note
The template deploys as a static build, meaning your component library loads instantly without any server-side rendering or database needs. Each deploy creates a new static build, ensuring your component library always stays in sync with your codebase.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Storybook | [kadumedim/storybook-starter-template](https://github.com/kadumedim/storybook-starter-template) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, MDX, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/kIt8FT)
