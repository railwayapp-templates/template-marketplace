# Deploy sunny-charisma on Railway

Deploy and Host sunny-charisma with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sunny-charisma)

## About

n8n is an open-source workflow automation tool that connects apps, APIs, and databases into automated workflows. It provides a visual editor to design processes, automate repetitive tasks, and integrate services without needing complex code.

Hosting n8n on Railway is simple and efficient. Railway takes care of provisioning, scaling, and infrastructure management while you only need to deploy your project. Setup involves creating a Railway project, adding environment variables such as `N8N_BASIC_AUTH_USER` and `N8N_BASIC_AUTH_PASSWORD` for authentication, and exposing port `5678`. Once deployed, you can access the n8n dashboard from your browser to build and monitor workflows. Railway ensures that your automation runs securely, reliably, and with minimal effort.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | [n8n-io/n8n](https://github.com/n8n-io/n8n) | Worker |

## Configuration

- **Start command:** `npm run start`

**Category:** Other · **Languages:** TypeScript, Vue, SCSS, JavaScript, Python, Handlebars, HTML, Dockerfile, HCL, Shell, Just, Rich Text Format, CSS, Batchfile

[View on Railway →](https://railway.com/deploy/sunny-charisma)
