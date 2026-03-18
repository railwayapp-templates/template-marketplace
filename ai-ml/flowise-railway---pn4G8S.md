# Deploy flowise-railway on Railway

Flowise - low-code LLM apps builder

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pn4G8S)

## About

1. Click Deploy Now

2. Change to your preferred repository name

3. Click Deploy

4. If succeeds, you should be able to see a deployed URL

5. To add authorization, navigate to Variables tab and add:
- FLOWISE_USERNAME
- FLOWISE_PASSWORD

6.  You can also add volume to the template by right clicking and select Add Volume

7. Specify a volume mount path. For instance: /opt/railway/.flowise

8. Then add the following env variables:
- DATABASE_PATH - /opt/railway/.flowise
- APIKEY_PATH - /opt/railway/.flowise
- LOG_PATH - /opt/railway/.flowise/logs
- SECRETKEY_PATH - /opt/railway/.flowise

9. Or you can use the prebuilt template with volume -  https://railway.app/template/nEGbjR

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FlowiseAI-Railway | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/pn4G8S)
