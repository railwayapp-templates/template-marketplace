# Deploy Zoe-Xd on Railway

Zoe-XD is a powerful multi-device WhatsApp bot built with Node.js

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zoe-xd)

## About

**Zoe-XD WhatsApp Bot is a fast, reliable, and easy-to-use multi-device WhatsApp bot. It supports automation, messaging, and interaction across multiple devices. Fully maintained and regularly updated, Zoe-XD ensures smooth performance, quick responses, and a user-friendly experience for managing WhatsApp tasks efficiently.**

---

Hosting Zoe-XD on Railway is straightforward and beginner-friendly. You’ll need to fork the repository, generate a WhatsApp session ID, and configure environment variables such as bot handlers, session credentials, and API keys. Railway handles server setup, deployment, and scaling, so you can run the bot continuously without managing infrastructure. Once deployed, Zoe-XD connects to WhatsApp, enabling multi-device support and real-time messaging. Updates and maintenance are easy, allowing you to keep the bot functional with minimal effort while leveraging Railway’s reliable cloud infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| xirtexe/zoe-xd:latest | `quay.io/xirtexe/zoe-xd:latest` | Worker |
| Zoe | [Xirtexe/Zoe](https://github.com/Xirtexe/Zoe) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MODE` | private | Bot mode (public or private) |
| `HANDLER` | . | Handler for bot .ping |
| `SESSION` | your_session_id | session ID |

## Configuration

- **Start command:** `yarn start`

**Category:** Bots · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/zoe-xd)
