# Deploy AI Powered Analytics on Railway

Analyses keywords on google and ai platforms.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ai-powered-analytics)

## About

AI-Powered Analytics is an intelligent application designed to perform keyword analysis and Search Engine Optimization (SEO) specifically for AI platforms and Google. It leverages AI to uncover valuable insights, track keyword performance, and provide data-driven recommendations to improve online visibility and search rankings.

A MongoDB database, either self-hosted or managed (like MongoDB Atlas), is required for storing user data and analysis results. File storage is handled by an S3 bucket for assets or generated reports. The deployment process also includes securely managing API keys and environment variables for third-party services like Google/Microsoft OAuth, SendGrid for email, and Stripe for payments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| peec-ai | [iqbalexperience/peec-ai](https://github.com/iqbalexperience/peec-ai) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `S3_UPLOAD_SECRET` | (secret) |
| `SENDGRID_API_KEY` | (secret) |
| `STRIPE_SECRET_KEY` | (secret) |
| `BETTER_AUTH_SECRET` | (secret) |
| `GOOGLE_CLIENT_SECRET` | (secret) |
| `STRIPE_WEBHOOK_SECRET` | (secret) |
| `MICROSOFT_CLIENT_SECRET` | (secret) |
| `EMAIL_VERIFICATION_CALLBACK_URL` | / |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/ai-powered-analytics)
