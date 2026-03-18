# Deploy SiYuan on Railway

A privacy-first, fully OSS personal knowledge management software

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/EWaCNw)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/EWaCNw?referralCode=IFlm92)

## What is this template

This template deploys [SiYuan](https://github.com/siyuan-note/siyuan), an open-source, privacy-focused personal knowledge management system, to Railway.app with just one click.

SiYuan is designed for individuals who value data ownership and powerful knowledge organization. Think of it as your second brain that helps you connect thoughts and manage information.

### Key Features

- **Block-based Editing**: Create and manipulate content in discrete blocks, similar to Notion or Roam Research
- **Bidirectional Linking**: Connect notes and concepts with powerful bidirectional links
- **Local-first Philosophy**: Your data stays on your device by default
- **Markdown Support**: Write in familiar Markdown syntax with extended capabilities
- **Full-text Search**: Quickly find anything in your knowledge base
- **Math & Diagrams**: Support for LaTeX math formulas and various diagram types
- **Cross-platform**: Available on Windows, macOS, Linux, Android, and iOS
- **API Access**: Programmatic access to your data through RESTful APIs

## Quick Start Guide

1. Click the "Deploy on Railway" button at the top of this page
2. Leave all variables and settings as their defaults
3. Wait for your new instance to deploy (this typically takes 2-3 minutes)
4. Once deployed, copy the `SIYUAN_AUTH_CODE` variable that Railway generated for you from the variables tab in your SiYuan service.
5. Navigate to your new SiYuan instance at the URL provided by Railway. This URL will be in your SiYuan service's settings tab.
6. Use the auth code to log in when prompted
7. Start building your knowledge base!

## Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SIYUAN_AUTH_CODE` | Authentication code for accessing your SiYuan instance | Auto-generated secure string |
| `TZ` | Timezone for your SiYuan instance | `UTC` |

### Timezone Configuration

The `TZ` variable allows you to set the system timezone for your SiYuan instance. This affects how timestamps are displayed throughout the application.

Examples of valid timezone values:
- `America/Vancouver` (for Pacific Time)
- `America/Toronto` (for Eastern Time)
- `Europe/London`
- `Asia/Tokyo`

Changing this variable only affects the system time display and does not impact any functionality.

## Project Structure & Services

This template uses a straightforward architecture:

- **SiYuan Application**: Deployed using the official [SiYuan Docker image](https://hub.docker.com/r/b3log/siyuan)
- **Persistent Storage**: Railway volume mounted to `/siyuan/workspace/` to ensure your data persists across redeploys and upgrades
- **Automatic Updates**: When new versions of SiYuan are released, you can easily redeploy to get the latest features

The Docker container exposes port 6806, which Railway automatically maps to a public URL for you to access.

## Additional Resources

- [SiYuan Official Documentation](https://github.com/siyuan-note/siyuan/blob/master/README.md)
- [SiYuan Community Forum](https://liuyun.io/)
- [SiYuan GitHub Repository](https://github.com/siyuan-note/siyuan)
- [Docker Image Details](https://hub.docker.com/r/b3log/siyuan)

---

Developed and maintained by the SiYuan community. Railway template by Mykal and team.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SiYuan | `b3log/siyuan` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | america/los_angeles | The timezone that you reside in (i.e. america/vancouver, america/new_york) |
| `PORT` | 6806 | The port that the SiYuan web server runs on |
| `SIYUAN_ACCESS_AUTH_CODE` | - | The authentication code you'll use to login to SiYuan  |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/siyuan/workspace`

**Category:** Other

[View on Railway →](https://railway.com/deploy/EWaCNw)
