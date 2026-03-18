# Deploy karakeep:v0.30.0 on Railway

Quickly save links, notes, and images

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/lGB4F_)

## About

- 🔗 Bookmark links, take simple notes and store images and pdfs.
- ⬇️ Automatic fetching for link titles, descriptions and images.
- 📋 Sort your bookmarks into lists.
- 🔎 Full text search of all the content stored.
- ✨ AI-based (aka chatgpt) automatic tagging. With supports for local models using ollama!
- 🎆 OCR for extracting text from images.
- 🔖 Chrome plugin and Firefox addon for quick bookmarking.
- 📱 An iOS app, and an Android app.
- 📰 Auto hoarding from RSS feeds.
- 🔌 REST API.
- 🌐 Multi-language support.
- 🖍️ Mark and store highlights from your hoarded content.
- 🗄️ Full page archival (using monolith) to protect against link rot. Auto video archiving using youtube-dl.
- ☑️ Bulk actions support.
- 🔐 SSO support.
- 🌙 Dark mode support.
- 💾 Self-hosting first.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/karakeep-app/karakeep:0.29.0` | Web service |
| meilisearch | `getmeili/meilisearch:v1.9.0` | Database |
| browserless-v2 | [railwayapp-templates/browserless-v2](https://github.com/railwayapp-templates/browserless-v2) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATA_DIR` | web | /data | - |
| `OPENAI_API_KEY` | web | (secret) | - |
| `NEXTAUTH_SECRET` | web | (secret) | - |
| `PORT` | meilisearch | 3331 | - |
| `MEILI_ENV` | meilisearch | production | - |
| `MEILI_DB_PATH` | meilisearch | /meili_data/data.ms | - |
| `MEILI_HTTP_ADDR` | meilisearch | :::3331 | - |
| `NEXTAUTH_SECRET` | meilisearch | (secret) | - |
| `MEILI_NO_ANALYTICS` | meilisearch | true | - |
| `TOKEN` | browserless-v2 | (secret) | auto-generated upon template deploy |
| `BROWSER_TOKEN` | browserless-v2 | (secret) | - |
| `BROWSER_PORT_PRIVATE` | browserless-v2 | 3001 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/meili_data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/lGB4F_)
