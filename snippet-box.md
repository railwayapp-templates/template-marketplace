# Deploy Snippet Box on Railway

Simple self-hosted app for organizing your code snippets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/snippet-box)

## About

Snippet Box is a simple, self-hosted application for organizing and managing code snippets. It allows developers to easily create, edit, browse, search, and categorize snippets across various programming languages, with syntax highlighting, tag-based filtering, pinned favorites, and built-in Markdown support for adding notes or documentation.

![Snippet Box interface](https://raw.githubusercontent.com/pawelmalak/snippet-box/master/.github/img/snippets.png)

Hosting Snippet Box involves deploying its official Docker image, which bundles a full-stack Node.js application (Express backend with Sequelize/SQLite and React frontend). The container requires a persistent volume for the `/app/data` directory to store the SQLite database and user data. Deployment is straightforward with Docker or platforms like Railway, which handle container orchestration, scaling, and networking automatically. No external database is needed since it uses embedded SQLite, making it lightweight and easy to maintain. Once deployed, access the web interface to start adding and managing snippets securely on your own infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| snippet-box | `pawelmalak/snippet-box` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/template/snippet-box)
