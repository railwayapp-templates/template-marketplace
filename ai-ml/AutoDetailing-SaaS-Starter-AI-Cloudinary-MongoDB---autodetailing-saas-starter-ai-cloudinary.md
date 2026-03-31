# Deploy AutoDetailing SaaS Starter (AI + Cloudinary + MongoDB) on Railway

Auto detailing CRM & SaaS starter with AI and image uploads

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/autodetailing-saas-starter-ai-cloudinary)

## About

# Auto Detailing SaaS Template

A full-stack Auto Detailing SaaS template with built-in AI features, image handling, and booking system.

## Deploy and Host

### About Hosting
This template is designed to be deployed on Railway with minimal setup. It includes backend services, database integration, and environment variable configuration for quick deployment.

### Why Deploy
- Launch your own auto detailing SaaS in minutes
- Skip boilerplate setup and focus on business logic
- Built-in integrations for AI, image storage, and email
- Scalable architecture ready for production

### Common Use Cases
- Auto detailing business management system
- SaaS platform for car cleaning services
- AI-powered vehicle inspection tools
- Customer & booking management apps

## Features

- Customer & vehicle management
- License plate-based lookup
- Before/after photo uploads (Cloudinary)
- AI-ready architecture (Groq / LLM support)
- Email notifications (Resend)
- MongoDB database integration
- Ready-to-deploy Railway setup

## Dependencies for Deployment

### Deployment Dependencies
- MongoDB database
- Cloudinary account (image storage)
- Resend account (email service)
- Groq / LLM API key (optional AI features)

## Getting Started

1. Deploy via Railway template
2. Set required environment variables
3. Connect services (MongoDB, Cloudinary, etc.)
4. Start using your app 🚀

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cardetailing_app_template | [abenceszabo97/cardetailing_app_template](https://github.com/abenceszabo97/cardetailing_app_template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB_NAME` | your_database_name
 | # Name of the database used by the application |
| `MONGO_URL` | your_mongodb_connection_string
 | # MongoDB connection URI used to connect to the database |
| `CORS_ORIGINS` | http://localhost:3000
 | # Comma-separated list of allowed origins for Cross-Origin Resource Sharing (CORS) |
| `GROQ_API_KEY` | (secret) | # API key for accessing Groq LLM services (used for AI features) |
| `SENDER_EMAIL` | noreply@yourdomain.com
 | # Email address used as the sender for outgoing emails |
| `RESEND_API_KEY` | (secret) | # API key for Resend email service used to send transactional emails |
| `EMERGENT_LLM_KEY` | your_emergent_llm_key
 | # API key for Emergent LLM provider (used for AI processing / fallback models) |
| `CLOUDINARY_API_KEY` | (secret) | # Public API key used to authenticate requests to Cloudinary |
| `CLOUDINARY_API_SECRET` | (secret) | # Secret key used for signing and securing Cloudinary API requests (keep this private) |
| `CLOUDINARY_CLOUD_NAME` | your_cloud_name
 | # Unique Cloudinary cloud name that identifies your media storage account |

**Category:** AI/ML · **Languages:** JavaScript, Python, HTML, CSS, Shell, Procfile

[View on Railway →](https://railway.com/deploy/autodetailing-saas-starter-ai-cloudinary)
