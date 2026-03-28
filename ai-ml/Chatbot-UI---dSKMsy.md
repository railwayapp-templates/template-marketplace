# Deploy Chatbot UI on Railway

An open-source ChatGPT UI alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dSKMsy)

## About

Chatbot UI is an open-source AI chat interface built with Next.js, TypeScript, and Tailwind CSS. It supports multiple AI model providers — including OpenAI, Anthropic, Google, and Ollama — and offers a polished chat experience with folders, prompt templates, conversation history, and more.

Chatbot UI v2.0 is a Next.js application that requires a [Supabase](https://supabase.com/) project as its backend for authentication, conversation storage, and user settings. You must create a Supabase project and obtain its credentials before deploying — Railway provides the hosting for the Next.js frontend, while Supabase handles the database and auth layer. Once the three required Supabase environment variables are set, Railway builds and deploys the app automatically from the GitHub source.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatbot-ui | [mckaywrigley/chatbot-ui](https://github.com/mckaywrigley/chatbot-ui) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `OPENAI_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, PLpgSQL, JavaScript, CSS, Shell

[View on Railway →](https://railway.com/deploy/dSKMsy)
