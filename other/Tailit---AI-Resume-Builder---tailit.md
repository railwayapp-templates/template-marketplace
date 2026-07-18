# Deploy Tailit - AI Resume Builder on Railway

AI Powered Resume builder

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tailit)

## About

Tailit is a free, open-source AI-powered resume builder that tailors resumes to specific job descriptions in minutes. It uses Groq-hosted language models to rewrite existing resume content while preserving factual accuracy, generates ATS-friendly PDFs with Typst, and keeps resume data private by storing it locally in the browser.

Hosting Tailit on Railway provides a production-ready Node.js environment for running the Next.js application and its server-side PDF rendering service. Railway automatically builds the application from the repository, provisions HTTPS, and provides a public domain with zero infrastructure management. Unlike many resume builders, Tailit stores user resumes locally in the browser using localStorage, so no database or persistent storage is required. The only external service needed is a Groq API key for AI-powered resume tailoring. Railway simplifies deployment, environment variable management, networking, and scaling while allowing the native Typst PDF compiler to run on a long-lived server for reliable PDF generation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tailit | [kaviarahul123/tailit](https://github.com/kaviarahul123/tailit) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GROQ_MODEL` | llama-3.3-70b-versatile |
| `GROQ_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Typst, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/tailit)
