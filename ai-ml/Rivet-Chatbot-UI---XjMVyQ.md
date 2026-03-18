# Deploy Rivet + Chatbot-UI on Railway

Hosts Rivet with an Open AI compatible API + Chatbot-UI as a frontend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/XjMVyQ)

## About

This template allows you to run your Rivet-Graphs (https://rivet.ironcladapp.com/) in the cloud and talk to them via Chatbot-UI interface. Only thing you need to do is add your project files via the fileupload interface and create a custom model in Chatbot-UI!

Video-tutorial can be found here:
https://youtu.be/WY2t1wFg50M

Requirements:
- Supabase account [free] (https://supabase.com/)
- Your Rivet project file with the following settings:
  - Main graph selected in project settings
  - Chat node(s) that should be used as streaming output need to be renamed to "output"
- Open AI API Key

Installation:
- Filebrowser: Just add username + password you want to use
- Chatbot-UI: Add all the information from supabase (see variable descriptions)
- Rivet-Chat-API: Add your Open-AI-Key

Setup:
- Go to Filebrowser, open the public URL, enter your username + password and upload your rivet project file (remember the name)
- Go to Chatbot-UI, create an account and click the link in the verification e-mail
- Go to "models" and create a custom model
  - Enter any name
  - For Model ID enter your rivet project file name, e.g. "example.rivet-project"
  - For Base URL enter: "http://rivet-chat-api.railway.internal:3100"
  - You do not need an API Key for internal communication

Further configurations can be done in your superbase account, e.g.:
  - Disallow new users to sign up
  - Edit the template + link in the verification e-mail
  - etc.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Filebrowser | `ghcr.io/brody192/filebrowser-template:latest` | Web service |
| chatbot-ui | [ai-made-approachable/chatbot-ui](https://github.com/ai-made-approachable/chatbot-ui) | Web service |
| rivet-chat-api | [ai-made-approachable/rivet-chat-api](https://github.com/ai-made-approachable/rivet-chat-api) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `WEB_PASSWORD` | Filebrowser | (secret) | Your password to access the web-interface |
| `WEB_USERNAME` | Filebrowser | (secret) | Your username to access the web-interface |
| `USE_VOLUME_ROOT` | Filebrowser | 0 | - |
| `PORT` | chatbot-ui | 3000 | - |
| `SUPABASE_ACCESS_TOKEN` | chatbot-ui | (secret) | https://supabase.com/dashboard/account/tokens --> Generate new token  |
| `SUPABASE_DATABASE_URL` | chatbot-ui | - | supabase.com --> Your project --> Project Settings --> Database --> Connection string (URI); do NOT add your password, keep it as it is |
| `SUPABASE_REFERENCE_ID` | chatbot-ui | - | supabase.com --> Your project --> General --> Reference ID |
| `NEXT_PUBLIC_SUPABASE_URL` | chatbot-ui | - | supabase.com --> Your project --> Project Settings --> API --> Project Url |
| `SUPABASE_SERVICE_ROLE_KEY` | chatbot-ui | - | supabase.com --> Your project --> Project Settings --> API --> Project API keys --> "service_rolesecret" |
| `SUPABASE_DATABASE_PASSWORD` | chatbot-ui | (secret) | supabase.com --> Your project --> Project Settings --> Database --> Password |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | chatbot-ui | - | supabase.com --> Your project --> Project Settings --> API --> Project API keys --> "anonpublic" |
| `PORT` | rivet-chat-api | 3100 | - |
| `OPENAI_API_KEY` | rivet-chat-api | (secret) | Your OpenAI API Key |
| `RIVET_CHAT_API_KEY` | rivet-chat-api | (secret) | - |
| `FILEBROWSE_PASSWORD` | rivet-chat-api | (secret) | - |
| `FILEBROWSER_USERNAME` | rivet-chat-api | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, PLpgSQL, Shell, CSS

[View on Railway →](https://railway.com/deploy/XjMVyQ)
