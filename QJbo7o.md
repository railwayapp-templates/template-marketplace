# Deploy Director by VideoDB on Railway

Director is an open source framework for creating AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/QJbo7o)

## About

Director provides a advance AI first framework for developing intelligent agents that can interact with your audio/video collection in natural language. Whether you're dealing with social content, lectures, movies, youtube videos, TV shows, talks, music, or other digital content, Director offers variety of tools to build powerful AI-powered assistants.

It uses the VideoDB’s scalable "video as data" infrastructure to create agentic workflows. For example, in natural language you can give commands like “upload this video and send the bullet point summary on my slack” and the agent will handle the rest.

GitHub: https://github.com/video-db/Director

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Frontend | [video-db/Director](https://github.com/video-db/Director) (root: ./frontend) | Web service |
| Backend | [video-db/Director](https://github.com/video-db/Director) (root: /backend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VITE_PORT` | Frontend | 8080 | - |
| `VITE_APP_BACKEND_URL` | Frontend | - | Please enter any string for now. Once both services are deployed, REPLACE it with the backend service's public URL, which can be found in Backend Service Settings → Networking → Public Networking. |
| `PORT` | Backend | 8000 | Port on which your service is listening. |
| `BEEP_AUDIO_ID` | Backend | - | Profanity Remover Agent |
| `BRAND_IMAGE_ID` | Backend | - | Brandkit Agent |
| `INTRO_VIDEO_ID` | Backend | - | Brandkit Agent |
| `OPENAI_API_KEY` | Backend | (secret) | Openai api key |
| `OUTRO_VIDEO_ID` | Backend | - | Brandkit Agent |
| `SLACK_BOT_TOKEN` | Backend | (secret) | Slack Agent |
| `VIDEO_DB_API_KEY` | Backend | (secret) | VideoDB API Key (https://console.videodb.io/) |
| `SLACK_CHANNEL_NAME` | Backend | - | Slack Agent |
| `REPLICATE_API_TOKEN` | Backend | (secret) | Replicate api token for replicate tool |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, JavaScript, Shell, Makefile, Vue, TypeScript, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/template/QJbo7o)
