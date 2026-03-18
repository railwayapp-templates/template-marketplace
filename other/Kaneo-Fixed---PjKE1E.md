# Deploy Kaneo (Fixed) on Railway

An open source project management platform for simplicity and efficiency

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/PjKE1E)

## About

<p align="center">
  <a href="https://kaneo.app">
    <img width="200" alt="Kaneo's logo" src="https://assets.kaneo.app/logo-mono-rounded.png">
  </a>
</p>

# 🚀 Kaneo: Open Source Project Management

[![GitHub Stars](https://img.shields.io/github/stars/usekaneo/kaneo?style=social)](https://github.com/usekaneo/kaneo)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/usekaneo/kaneo/blob/main/LICENSE)


## 🌟 Break Free from Enterprise Tools

Kaneo is your sleek, lightning-fast alternative to bloated project management tools like Jira, Trello, or Asana. Built with simplicity at its core, Kaneo delivers just what you need without the complexity.

## ⚙️ Self-Hosted Simplicity

Host Kaneo on your own infrastructure with complete control over your data. Perfect for teams that need privacy, customization, and ownership of their workflow.

### 🔐 Important Deployment Note

When deploying on Railway (or similar platforms), **the backend service must be publicly exposed** for proper functionality. 

## ✨ Key Features

- 📋 **Intuitive Kanban Boards** - Visualize your workflow with customizable columns
- 🎯 **Sprint Planning** - Organize work into manageable timeboxes 
- 🔄 **Real-time Updates** - Changes reflect instantly across your team
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- 🔍 **Powerful Filtering** - Find what you need instantly
- 🏷️ **Custom Labels** - Organize your way with flexible tagging
- 👥 **Team Collaboration** - Assign tasks, comment, and track progress

## 🛠️ Technology Stack

Built with modern technologies:
- TypeScript &amp; React for the frontend
- ElysiaJS for the lightning-fast backend
- SQLite for simple, reliable data storage

## 🔗 Quick Links

- [GitHub Repository](https://github.com/usekaneo/kaneo)
- [Documentation](https://kaneo.app/quick-start/)
- [Live Demo](https://demo.kaneo.app)

Give Kaneo a ⭐ on [GitHub](https://github.com/usekaneo/kaneo) if you find it useful!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kaneo-backend | `ghcr.io/usekaneo/api:latest` | Web service |
| kaneo-frontend | `ghcr.io/usekaneo/web:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | kaneo-backend | 1337 |
| `DB_PATH` | kaneo-backend | /app/apps/api/data/kaneo.db |
| `PORT` | kaneo-frontend | 80 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/apps/api/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/PjKE1E)
