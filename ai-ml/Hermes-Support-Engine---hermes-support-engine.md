# Deploy Hermes Support Engine on Railway

Self-host an AI support agent with persistent memory. No per-seat fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-support-engine)

## About

Hermes is an open-source AI agent framework built for production customer support — persistent
memory across conversations, multi-step tool use, LLM-agnostic design, and native integration
with Chatwoot and helpdesk platforms. Replace per-seat support software with a self-hosted AI
agent that handles tickets, resolves FAQs, and escalates to humans — running 24/7 on your own
infrastructure with no per-seat licensing costs.

![Hermes AI Agent](https://opengraph.githubassets.com/97e67c0384b7aab88e8e998a588a777bd1fe51724c9e34f46c83555bbc1b2502/NousResearch/hermes-agent)

---

Running an AI customer support agent in production means keeping a persistent service alive 24/7
with conversation memory that survives restarts, concurrent session handling for multiple customers,
secure API credential management, and webhook endpoints for helpdesk integrations. Without a
managed host, you're managing Docker, inter-service networking, SSL, and database backups manually.

Railway handles all of it. Hermes runs as an always-on support agent with persistent PostgreSQL
memory — customer context and ticket history survive every redeploy.

Typical cost: **~$5–10/month** on Railway's Hobby plan for the full stack. Compare that to
Intercom at $74/seat/month, Zendesk Suite at $55/seat/month, or Freshdesk Growth at $18/seat/month
— all of which cap AI features behind higher tiers. Hermes gives you unlimited AI-handled
conversations at a flat infrastructure cost.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes Agent | [praveen-ks-2001/hermes-agent-template](https://github.com/praveen-ks-2001/hermes-agent-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8642 | - |
| `ADMIN_PASSWORD` | (secret) | Create admin login password credential |
| `ADMIN_USERNAME` | (secret) | Create admin login username credential |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-support-engine)
