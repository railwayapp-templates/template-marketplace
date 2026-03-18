# Deploy Slack AI on Railway

Summarize Slack threads with AI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pwcyob)

## About

Slack AI helps save you from having to read long threads in Slack. The way it works is simple:
- Right-click on a message (including messages inside a thread)
- Click "More message shortcuts"
- Search for, and then click "Summarize this thread"

This will provide you with a full summary of what happened in the thread, including any reactions that may have been used. It also handles different users being inside the conversation, and can use this fact in order to provide a more helpful summary.

You'll need an AI provider to use this project, like [OpenAI](https://openai.com) or [OpenRouter](https://openrouter.ai) (which proxies different AI providers and can help reduce latency issues, as well as allowing you to use one balance across multiple providers). **Even if you don't use OpenAI, you still should set the `OPENAI_*` environment variables** using the AI provider's API URL and key.

## Tips
- Thinking models work well but can be slow. `o3-mini` is a good option
- In my experience, `gemini-2.5-flash` or DeepSeek v3 are great options for faster responses

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| slack-ai | [SkyfallWasTaken/slack-ai](https://github.com/SkyfallWasTaken/slack-ai) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | - |
| `SLACK_APP_TOKEN` | (secret) | Get this after enabling Socket Mode. xapp-... |
| `SLACK_BOT_TOKEN` | (secret) | Get this after creating a new app on the Slack API dashboard. xoxb-... |

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/pwcyob)
