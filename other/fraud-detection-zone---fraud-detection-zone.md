# Deploy fraud-detection-zone on Railway

Deploy and Host fraud-detection-zone with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fraud-detection-zone)

## About

Hosting fraud-detection-zone on Railway involves deploying a Django application with AI/ML-driven fraud detection, utilizing MySQL (already deployed) and Redis for caching ML model outputs. The codebase, including fraud_detection.js for client-side device fingerprinting and views.py for server-side logic, is pushed to a GitHub repository linked to Railway for automated deployments. Configure environment variables (e.g., SECRET_KEY, FINGERPRINTJS_PUBLIC_KEY, ML_WEIGHT) in Railway’s dashboard. Run python manage.py migrate for database setup and create a superuser. Railway handles scaling, SSL, and networking, while AI/ML models process real-time anomaly detection, with CSRF/CORS ensuring secure API interactions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fraud-detection | [Oal304/fraud-detection](https://github.com/Oal304/fraud-detection) | Worker |

**Category:** Other · **Languages:** Python, HTML, JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/fraud-detection-zone)
