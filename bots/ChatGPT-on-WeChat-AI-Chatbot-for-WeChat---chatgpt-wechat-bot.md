# Deploy ChatGPT-on-WeChat — AI Chatbot for WeChat on Railway

Self-host an AI chatbot for WeChat. Your OpenAI key, deploy in 2 steps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatgpt-wechat-bot)

## About

ChatGPT-on-WeChat turns your WeChat account into an AI chatbot — connect OpenAI's models and
your WeChat auto-replies to messages in private chats and groups. Scan one QR code to log in,
and the bot answers on your behalf using GPT. Open source, self-hosted, and deployable in two
steps with just your OpenAI API key.

Self-host on Railway for ~$5/month plus your OpenAI usage — an always-on WeChat AI assistant
that runs in the cloud without keeping a computer on, with all conversation handling on
infrastructure you own.

---

Running a WeChat AI bot means keeping a long-lived process connected to WeChat 24/7, holding
the login session alive, and securely storing your OpenAI key. On a local machine that means
leaving a computer running constantly; on a raw VPS it means process managers and manual setup.

Railway keeps the bot online as a managed container with your OpenAI key injected as an
environment variable. Deploy, scan the QR code from the logs once to log in, and the bot stays
connected and replying.

> **Account-safety note:** this tool logs into WeChat as a userbot via QR scan. WeChat's terms
> restrict automation, and Tencent actively detects it — using a bot on a personal account can
> lead to temporary or permanent restrictions. Use a secondary or dedicated WeChat account you
> can afford to lose, not your primary one. This is inherent to WeChat automation, not specific
> to this template.

Typical cost: **~$5/month** on Railway's Hobby plan for the container, plus OpenAI API usage
(a few cents per conversation with `gpt-4o-mini`-class models).

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ChatGPT-on-WeChat | [kx-Huang/ChatGPT-on-WeChat](https://github.com/kx-Huang/ChatGPT-on-WeChat) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | Your OpenAI API key |
| `CHATGPT_TRIGGER_KEYWORD` | - | [Optional] Your keyword to trigger auto-reply |
| `OPENAI_ORGANIZATION_KEY` | - | [Optional] Your OpenAI Organization Key |

**Category:** Bots · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/chatgpt-wechat-bot)
