# Deploy LuminaVision on Railway

E-commerce website LuminaVision

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/luminavision)

## About

The "Lumina Vision" project is an e-commerce website designed for a camera store, built with Django to offer an intuitive, user-friendly shopping experience for photography enthusiasts and professionals alike

Basic Django set up and Stripe set up all you need to start and configure this project

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LuminaVision | [pr0stre1/LuminaVision](https://github.com/pr0stre1/LuminaVision) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DEBUG` | False |
| `SECRET_KEY` | (secret) |
| `ALLOWED_HOSTS` | example.com |
| `PAYMENT_DEBUG` | False |
| `STRIPE_SECRET_KEY` | (secret) |
| `CSRF_TRUSTED_ORIGINS` | https://example.com |
| `STRIPE_ENDPOINT_SECRET` | (secret) |
| `STRIPE_PUBLISHABLE_KEY` | - |

## Configuration

- **Start command:** `python manage.py collectstatic --no-input && python manage.py makemigrations && python manage.py migrate && DJANGO_SETTINGS_MODULE=website1.settings gunicorn website1.wsgi:application --bind 0.0.0.0:8080`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, CSS, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/luminavision)
