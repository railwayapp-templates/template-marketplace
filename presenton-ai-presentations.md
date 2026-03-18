# Deploy Presenton - AI Presentations and API on Railway

Create beautiful AI Presentations with Presenton - UI and API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/presenton-ai-presentations)

## About

By deploying Presenton on Railway, you can serve both its web-based UI and powerful REST API from the cloud. Presenton must be configured to run on **port 80**, and Railway should expose that port publicly for full functionality.

You can provide your own model keys and optionally disable user modifications via environment variables. Once deployed, Presenton can be accessed via browser or integrated into other systems using its robust presentation-generation API.


---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| presenton/presenton:latest | `ghcr.io/presenton/presenton:latest` | TCP service |

## Configuration

- **TCP Proxies:** 80

**Category:** Other

[View on Railway →](https://railway.com/template/presenton-ai-presentations)
