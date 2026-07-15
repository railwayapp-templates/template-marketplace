# Deploy homepage on Railway

Modern, highly-configurable app dashboard with 100+ service integrations.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homepage)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/homepage)

&gt; **Canonical code:** `homepage` — deploy URL: https://railway.com/new/template/homepage

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-homepage/main/og-image.svg)

Homepage is a modern, highly-configurable self-hosted application dashboard with 100+ service integrations. Deploy it on Railway in minutes to turn your stack into a beautiful start page.

Homepage runs as a single container with a persistent Railway volume for config (`/app/config`). Railway provides the compute, TLS at the edge, and a public URL. The service restarts automatically on failures via Railway's built-in health check. No external database or cache is needed — everything runs in one container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| homepage | [INAPP-Mobile/railway-homepage](https://github.com/INAPP-Mobile/railway-homepage) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOMEPAGE_VAR_TITLE` | - | Custom dashboard title (e.g., My Dashboard). Leave empty for default. Applied only if config YAML uses {{HOMEPAGE_VAR_TITLE}}. |
| `HOMEPAGE_VAR_LANGUAGE` | - | Dashboard language code (e.g., en, fr, de). Leave empty for browser default. Applied only if config YAML uses {{HOMEPAGE_VAR_LANGUAGE}}. |
| `HOMEPAGE_ALLOWED_HOSTS` | * | Comma-separated list of hosts allowed to serve Homepage (required by Homepage v1.0+). Railway serves from a dynamic *.railway.app domain, so '*' disables the host check. For tighter security set this to your actual domain(s), e.g. mydash.railway.app. |
| `HOMEPAGE_VAR_DEFAULT_THEME` | dark | Default theme: dark, light, neon, or glassmorphism. Applied only if your config YAML references the {{HOMEPAGE_VAR_DEFAULT_THEME}} placeholder. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/homepage)
