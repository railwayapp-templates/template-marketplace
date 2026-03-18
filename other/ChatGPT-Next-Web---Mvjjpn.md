# Deploy ChatGPT Next Web on Railway

An open-source ChatGPT UI alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Mvjjpn)

## About

## Overview
[ChatGPT Next Web](https://github.com/Yidadaa/ChatGPT-Next-Web) is an open-source ChatGPT UI alternative built using Next.js, TypeScript, and CSS. It can be deployed locally, or hosted on platforms like Railway, Vercel, and more.

Provide the following values during deployment or later:
* `OPENAI_API_KEY`: OpenAI API key
* `CODE` (optional): Comma-separated codes to password-protect your deployment

## Features
* One-click deploy on Railway and Vercel
* Privacy first, all data stored locally in the browser
* Responsive design, dark mode and PWA
* Fast first screen loading speed (~100kb), support streaming response
* Create, share and debug your chat tools with prompt templates (mask)
* Awesome prompts powered by awesome-chatgpt-prompts-zh and awesome-chatgpt-prompts
* Automatically compresses chat history to support long conversations while also saving your tokens
* One-click export all chat history with full Markdown support

## Learn More
* [GitHub Repo](https://github.com/Yidadaa/ChatGPT-Next-Web)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatgpt-next-web | [Yidadaa/ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CODE` | - | Access passwords, separated by comma. |
| `OPENAI_API_KEY` | (secret) | OpenAI API key |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, SCSS, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/Mvjjpn)
