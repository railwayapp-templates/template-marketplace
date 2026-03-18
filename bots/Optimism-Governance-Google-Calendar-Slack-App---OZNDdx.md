# Deploy Optimism Governance Google Calendar Slack App on Railway

Slack bot for Optimism Governance events with auto reminders & summaries

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/OZNDdx)

## About

This template deploys a Slack bot that keeps your community updated on Optimism Governance events. It features:

- Automated weekly summaries (Mondays 9 AM EST)
- Daily event reminders (9 AM EST)
- /getevents command for on-demand updates
- Recurring event support
- EST timezone handling
- Clean message formatting

Required Environment Variables:
- SLACK_BOT_TOKEN
- SLACK_SIGNING_SECRET
- SLACK_APP_TOKEN
- SLACK_CHANNEL_ID

The bot monitors the official Optimism Governance Google Calendar and sends notifications to your specified Slack channel. Perfect for DAOs and communities who want to stay engaged with Optimism governance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| optimism-calendar-slack-app | [fabianhug/optimism-calendar-slack-app](https://github.com/fabianhug/optimism-calendar-slack-app) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `CALENDAR_URL` | https://calendar.google.com/calendar/embed?src=c_fnmtguh6noo6qgbni2gperid4k%40group.calendar.google.com | - |
| `SLACK_APP_TOKEN` | (secret) | xapp-your-app-token |
| `SLACK_BOT_TOKEN` | (secret) | xoxb-your-bot-token |
| `SLACK_CHANNEL_ID` | - | id-of-channel-to-post-to |
| `SLACK_SIGNING_SECRET` | (secret) | your-signing-secret |

**Category:** Bots · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/OZNDdx)
