# Deploy hoader on Railway

bookmark manaer -- save, organize, and search saved contents easily

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/6cPpay)

## About

Project Overview:
Hoarder is an open-source, self-hosted app designed to help users manage and organize their saved web content effectively. It prioritizes privacy and user control while leveraging AI for smarter content organization. Key functionalities include:
	•	Content Saving: Easily save articles, links, and files for future reference.
	•	AI-Powered Tagging: Automatically tag and categorize content using AI for better organization.
	•	Custom Tagging and Categorization: Manually organize content with custom tags and categories for more control.
	•	Full-Text Search: Find content quickly using powerful search capabilities.
	•	Customizable Organization: Structure your library to suit your unique needs and workflow.
	•	User-Friendly Interface: Navigate and manage your content with ease through an intuitive design.

Hoarder combines AI-driven functionality with privacy-focused self-hosting, making it ideal for users who want an intelligent yet secure solution for managing saved web content.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/hoarder-app/hoarder:release` | Web service |
| meilisearch | `getmeili/meilisearch:v1.6` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DATA_DIR` | web | /data |
| `OPENAI_API_KEY` | web | (secret) |
| `DISABLE_SIGNUPS` | web | false |
| `NEXTAUTH_SECRET` | web | (secret) |
| `NEXTAUTH_SECRET` | meilisearch | (secret) |
| `MEILI_NO_ANALYTICS` | meilisearch | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/meili_data`

**Category:** Other

[View on Railway →](https://railway.com/template/6cPpay)
