# Deploy balanced-comfort on Railway

Automate Instagram engagement with smart keyword-triggered DMs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/balanced-comfort)

## About

Automate Instagram engagement with keyword-triggered DMs. When users comment specific words on your reels, instantly send them personalized DMs and public replies.

FastAPI backend that connects to Instagram Graph API. Receives webhook notifications when users comment, detects trigger keywords, and automatically sends DMs and replies. Includes REST API for per-reel configuration. Uses JSON file storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CommentDMAutomation | [TejasAdhiya/CommentDMAutomation](https://github.com/TejasAdhiya/CommentDMAutomation) (root: /backend) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `VERIFY_TOKEN` | (secret) |
| `IG_BUSINESS_ACCOUNT_ID` | paste |
| `INSTAGRAM_ACCESS_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, Python, CSS, JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/balanced-comfort)
