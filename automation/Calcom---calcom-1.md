# Deploy Calcom on Railway

Deploy and Host Calcom with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calcom-1)

## About

Cal.com is an open-source scheduling infrastructure platform that lets individuals and teams manage bookings, appointments, and meetings. It serves as a self-hostable alternative to Calendly, giving you full control over your scheduling data and workflows.

Cal.com is a Next.js application that requires a PostgreSQL database for storing users, bookings, event types, and availability. Hosting it involves configuring database connection variables, a `NEXTAUTH_SECRET` for session management, and a `NEXTAUTH_URL` pointing to your public deployment URL. Email (SMTP) configuration is needed for booking confirmation notifications. Optional integrations with Google Calendar, Zoom, Stripe, and other providers are enabled via additional environment variables post-deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| calcom-railway | [Amritasha/calcom-railway](https://github.com/Amritasha/calcom-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `WEBAPP_URL` | https://calcom-railway-production.up.railway.app |
| `NEXTAUTH_URL` | https://calcom-railway-production.up.railway.app |
| `NEXTAUTH_SECRET` | (secret) |
| `NEXT_PUBLIC_WEBAPP_URL` | https://calcom-railway-production.up.railway.app |
| `CALENDSO_ENCRYPTION_KEY` | rrutws7kqcmaif2t9298ln60s0viam9k |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/calcom-1)
