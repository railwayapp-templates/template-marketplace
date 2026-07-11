# Deploy WhatsApp AI Assistant — OpenAI-Powered Bot, Self-Hosted on Railway

Self-host a WhatsApp AI bot with your OpenAI Assistant. No per-convo fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-ai-assistant-bot)

## About

WhatsApp AI Assistant Bot is a Node.js bot that connects WhatsApp to your own OpenAI Assistant
using the BuilderBot framework — automated, intelligent conversations driven by an assistant you
configure, with custom flows and environment-variable setup. Scan a QR code to connect, point it
at your OpenAI Assistant ID, and your WhatsApp answers customers with GPT-powered replies.

Hosted WhatsApp AI chatbots charge monthly subscriptions plus per-conversation fees. Self-host on
Railway for ~$5/month plus your own OpenAI usage — an always-on AI assistant on WhatsApp with your
prompts, flows, and data on infrastructure you own.

---

Running an AI WhatsApp bot in production means a long-lived Node.js process holding the WhatsApp
session, secure storage for your OpenAI key, and a public HTTPS endpoint for BuilderBot's
webhooks. On a local machine that means keeping a computer on 24/7; on a raw VPS it means
process managers and manual setup.

Railway keeps the bot online as a managed container with your OpenAI key injected as an
environment variable and automatic HTTPS. Configure the bot entirely through environment
variables — your OpenAI Assistant ID, API key, and flow settings — with no code changes needed.

> **Account-safety note:** this bot connects a personal WhatsApp account through an unofficial
> library. WhatsApp/Meta detects and bans accounts that automate messaging or send bulk
> unsolicited messages. Use a dedicated business number you can afford to lose, message only
> users who initiated contact, and respect rate limits. For officially sanctioned high-volume
> messaging, use the WhatsApp Business API. This risk is inherent to all unofficial WhatsApp
> bots, not specific to this template.

Typical cost: **~$5/month** on Railway's Hobby plan for the bot, plus OpenAI API usage (a few
cents per conversation with `gpt-4o-mini`). No per-conversation SaaS fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| BOT-Monoagente | [pereyrahugor/Bot-RialWay](https://github.com/pereyrahugor/Bot-RialWay) | Worker |

**Category:** Bots · **Languages:** TypeScript, JavaScript, CSS, HTML, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/deploy/whatsapp-ai-assistant-bot)
