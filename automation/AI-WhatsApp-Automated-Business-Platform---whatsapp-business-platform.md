# Deploy AI WhatsApp Automated Business Platform on Railway

AI WhatsApp messaging platform with campaign management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-business-platform)

## About

A self-hosted AI WhatsApp messaging platform built on Twilio's WhatsApp API. Send bulk campaigns, manage contacts, create message templates, and track delivery — all from a clean React dashboard. Includes an in-app setup wizard so non-technical users can connect Twilio without touching config files.

WhatsApp Business Automation Platform

Run a complete WhatsApp Business operation without writing a single line of code.
Connect your Twilio number, upload your product catalog, and your customers get
instant AI-powered replies — 24/7.

─── CORE FEATURES ───────────────────────────────────

✅ Two-Way Inbox
   Read and reply to every WhatsApp message from a clean web dashboard.
   Auto-creates contact profiles from incoming messages.

✅ Broadcast Campaigns
   Send bulk WhatsApp messages to your entire contact list or a filtered segment.
   Schedule for later, track delivery in real time.

✅ Message Templates
   Reusable templates with {{variable}} personalisation, images, and CTA buttons.
   AI can write them for you — just describe what you want.

✅ Contacts CRM
   Import contacts via CSV. Add tags, notes, opt-in/out status.
   Full message history per contact.

✅ Analytics
   Delivery rates, read rates, campaign performance trends — all in one view.

✅ In-App Twilio Setup Wizard
   5-step guided setup — no terminal, no env editing.
   Works with Twilio sandbox (free testing) and live business numbers.

─── AI / BETA FEATURES ─────────────────────────────

🤖 RAG Smart Replies
   Upload your product catalog, FAQ, or pricing sheet as PDF/TXT/CSV.
   When a customer messages you, Grok-3 reads your documents and replies
   accurately — automatically. No human needed.

📅 Campaign Scheduler
   Queue campaigns to send at any future date and time.
   Powered by BullMQ — reliable even after server restarts.

📧 Email Fallback
   When a WhatsApp message fails to deliver, the system automatically
   re-sends it via email using Resend. Zero missed leads.

🌍 Multi-Language Auto-Replies
   Detects the language of every incoming message and responds in the
   same language — Hindi, Marathi, Tamil, Gujarati, Telugu, and more.

─── TECH STACK ─────────────────────────────────────

  Backend   Node.js + Express + Prisma ORM
  Database  PostgreSQL (Railway managed)
  Queue     Redis + BullMQ
  AI        xAI Grok-3 (chat + images) · OpenAI GPT-4o (optional)
  Email     Resend
  Messaging Twilio WhatsApp API
  Frontend  React + Vite + Tailwind

─── SETUP: 3 REQUIRED VALUES ───────────────────────

  JWT_SECRET   =   Any random 64-char string (auto-generated) (already added)
  ADMIN_EMAIL    =Your dashboard login email (already added default)
  ADMIN_PASSWORD  =Your dashboard password (already added default)
 VITE_API_URL = https://[YOUR-BACKEND-DOMAIN]/api/v1 (You need to add the backend URL in same format work and redeploy dashboard service)

Everything else — Twilio, Grok, Resend — is configured inside the app
from Settings. No re-deploy needed when you change API keys.

─── OPTIONAL API KEYS ──────────────────────────────

  GROK_API_KEY    xAI Grok — enables AI replies + image generation
  RESEND_API_KEY  Resend — enables email fallback on failed delivery

─── PRICING NOTE ───────────────────────────────────

Railway infrastructure: ~$5–15/month (Postgres + Redis + 2 services)
Twilio WhatsApp: ~$0.005–0.05 per message (free $15 trial credit)
Grok API: very low cost, often free tier sufficient for small businesses

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| whatsapp-business-deploy-7i7a | [Ankitgelda8/whatsapp-business-deploy](https://github.com/Ankitgelda8/whatsapp-business-deploy) (root: dashboard) | Worker |
| whatsapp-business-deploy | [Ankitgelda8/whatsapp-business-deploy](https://github.com/Ankitgelda8/whatsapp-business-deploy) (root: backend) | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `JWT_SECRET` | whatsapp-business-deploy-7i7a | (secret) | - |
| `ADMIN_EMAIL` | whatsapp-business-deploy-7i7a | admin@watsapp.local.com | - |
| `ADMIN_PASSWORD` | whatsapp-business-deploy-7i7a | (secret) | - |
| `JWT_SECRET` | whatsapp-business-deploy | (secret) | - |
| `ADMIN_EMAIL` | whatsapp-business-deploy | admin@watsapp.local.com | - |
| `ADMIN_PASSWORD` | whatsapp-business-deploy | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/whatsapp-business-platform)
