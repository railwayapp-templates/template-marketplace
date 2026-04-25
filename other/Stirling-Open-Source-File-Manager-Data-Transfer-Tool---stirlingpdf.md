# Deploy Stirling (Open-Source File Manager & Data Transfer Tool) on Railway

Stirling PDF [May ’26] (Manage, Transfer & Organise Files) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stirlingpdf)

## About

Stirling PDF is a powerful, open-source web-based PDF manipulation tool that allows users to edit, merge, compress, convert, and secure PDFs without needing any paid software. It offers a simple and intuitive web interface where users can perform complex PDF operations instantly.

Self-hosting Stirling PDF on Railway allows you to manage and edit your PDFs directly from your own secure environment. You don’t need to rely on third-party services or expose your confidential files to external servers. Railway offers a modern deployment experience that simplifies the hosting of open-source applications like Stirling PDF, making it ideal for personal, team, or enterprise use.
By hosting Stirling PDF yourself, you can customize the instance to your needs, manage user permissions, and connect it to your own file storage systems. Plus, Railway automates infrastructure setup - meaning you can deploy, scale, and maintain your PDF service with zero DevOps overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stirling-pdf | `stirlingtools/stirling-pdf:latest-fat` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LANGS` | en_GB |
| `DISABLE_ADDITIONAL_FEATURES` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/stirlingpdf)
