# Deploy Send Emails on Railway Without SMTP — Resend API Starter on Railway

Fix Railway's email restriction. Resend HTTPS API — 3,000 free emails/month

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/resend-email-railway)

## About

Railway's Hobby and Free plans don't support raw SMTP — only transactional email services
with HTTPS APIs. Resend is the cleanest solution: a developer-first email API with a
TypeScript SDK, React Email template support, domain verification, open and click tracking,
and a free tier of **3,000 emails/month**. This template deploys a production-ready Resend
integration on Railway so you can send transactional emails — password resets, order
confirmations, magic links, notifications — in minutes, not hours.

---

Railway restricts outbound SMTP to Pro plan and above. On Hobby and Free plans, raw port 25
and 587 connections are blocked — which means tools configured for SMTP (WordPress, Ghost,
any Laravel/Django app) will silently fail to send email without a workaround.

Resend bypasses this entirely by using HTTPS instead of SMTP. Every email is sent via a
REST API call over port 443 — the same port as any web request — which Railway never
blocks on any plan. This template gives you a working email integration with Resend
pre-wired, verified, and ready to send from your Railway-hosted application.

Typical cost: **Free up to 3,000 emails/month** on Resend's free tier. Paid plans start
at $20/month for 50,000 emails. Compare to SendGrid at $19.95/month for 50,000 emails,
Mailgun at $35/month for 50,000 emails, or Postmark at $15/month for 10,000 emails —
Resend's free tier covers most indie projects and early-stage SaaS indefinitely.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Resend | [resend/resend-node-railway-starter](https://github.com/resend/resend-node-railway-starter) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RESEND_API_KEY` | (secret) | API Key from your Resend account. You can create a new key at https://resend.com/api-keys |

**Category:** Automation · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/resend-email-railway)
