# Deploy Chatbot UI on Railway

An open-source ChatGPT UI alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dSKMsy)

## About

##Overview
[Chatbot UI](https://github.com/mckaywrigley/chatbot-ui) is an open-source ChatGPT UI alternative built using Next.js, TypeScript, and Tailwind CSS. Chatbot UI can be deployed locally, or hosted on cloud and web app hosting platforms like AWS, Google Cloud, Railway, Vercel, and more.

Note: Chatbot UI now requires a Supabase backend. Please create an account and get the details for the required variables first.
* `NEXT_PUBLIC_SUPABASE_URL`
* `NEXT_PUBLIC_SUPABASE_ANON_KEY`
* `SUPABASE_SERVICE_ROLE_KEY`

##Highlights
Since the launch, Chatbot UI has seen several enhancements:
* Ability to create folders, prompt templates, and customise system prompt
* Ability to name conversations, highlight code syntax, and support Markdown
* Ability to import/export chats, stop message generation, and search chats
* Google Search integration and more (coming soon...)

##Learn More
* [Open-Source ChatGPT UI Alternative with Chatbot UI](https://alphasec.io/open-source-chatgpt-ui-alternative-with-chatbot-ui/)

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

[View on Railway →](https://railway.com/template/dSKMsy)
