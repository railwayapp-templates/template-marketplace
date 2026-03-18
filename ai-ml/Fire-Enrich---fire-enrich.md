# Deploy Fire Enrich on Railway

Fire Enrich - AI-Powered Data Enrichment Tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fire-enrich)

## About

Fire Enrich is an open-source AI-powered data enrichment platform that transforms simple email lists into comprehensive company datasets. Using a multi-agent AI system powered by Firecrawl and OpenAI, it extracts detailed business intelligence including company profiles, industry information, funding data, tech stacks, and more with full source citations.

![Fire Enrich Interface](https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/fire-enrich-railway.png)

Deploying Fire Enrich on Railway provides a streamlined, production-ready environment for running this Next.js 15 application. The deployment requires minimal configuration—just two API keys (Firecrawl and OpenAI)—and Railway handles the rest. Fire Enrich is a stateless application, meaning it doesn't require a database or persistent storage, making it lightweight and easy to scale. The platform processes CSV files with email addresses and uses AI to enrich them with company data in real-time. Railway automatically manages the build process, environment variables, and public networking, allowing you to focus on enriching your data rather than managing infrastructure. The multi-stage Docker deployment ensures optimal performance with minimal resource usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Fire Enrich | [firecrawl/fire-enrich](https://github.com/firecrawl/fire-enrich) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | API key for OpenAI language models. Get it from https://platform.openai.com/api-keys |
| `FIRECRAWL_API_KEY` | (secret) | API key for Firecrawl web scraping service. Get it from https://firecrawl.link/api-keys |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/fire-enrich)
