# Deploy Outbound Tools (Open Source Alternative To Lemlist, Instantly or Smartlead) on Railway

Outbound email tools to send, tag, and manage via lightweight IMAP/SMTP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outbound-tools)

## About

Outbound Tools is a free and open-source alternative to Lemlist, Instantly, and Smartlead. It's a lightweight email operations server that exposes tools for sending, tagging, and managing outbound emails via IMAP/SMTP. It connects to your Mailpool email accounts and provides tools for campaign sending, reply classification, audience segmentation, and deliverability metrics.

Deploying Outbound Tools gives you a hosted server that connects to your Mailpool email accounts over IMAP/SMTP. Once deployed, AI agents can use the exposed tools to send emails, read inbox and sent folders, tag messages with IMAP keywords, manage audience segments, match reply threads to original outreach, and track bounce and complaint rates. All state lives directly in your mailboxes as IMAP keywords, so there is no external database to manage. You own your data and your infrastructure. You just need a Mailpool API key to get started.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Outbound Tools | [arnaudjnn/outbound-tools](https://github.com/arnaudjnn/outbound-tools) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEY` | (secret) | Auto-generated secret used to secure the MCP server URL endpoint via Bearer token authentication |
| `MAILPOOL_API_KEY` | (secret) | API key for email accounts access |
| `ANTHROPIC_API_KEY` | (secret) | API key for Claude model access |

**Category:** AI/ML · **Languages:** TypeScript, CSS

[View on Railway →](https://railway.com/deploy/outbound-tools)
