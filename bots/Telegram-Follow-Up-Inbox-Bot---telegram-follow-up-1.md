# Deploy Telegram Follow-Up Inbox Bot on Railway

A Telegram bot that turns your chat into a personal follow-up inbox

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-follow-up-1)

## About

A Telegram bot that turns your chat into a personal follow-up inbox. Forward messages or drop them in a group called "Follow Up Inbox" — then manage everything with simple commands like /open, /done, /due, and /snooze.

This bot runs as a single Python worker process on Railway, polling Telegram for new messages. All your data is stored in your own Supabase PostgreSQL database — Railway hosts the bot, Supabase holds the rows. There's no web server, no frontend, and no shared database. Once deployed, the bot runs continuously in the background. You interact with it entirely through Telegram. Setup takes about 10 minutes and requires a free Supabase account and a Telegram bot token from @BotFather.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| telegram-followup-inbox | [redblueorangeyellowpurple/telegram-followup-inbox](https://github.com/redblueorangeyellowpurple/telegram-followup-inbox) (branch: supabase-saas) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SUPABASE_KEY` | - | service_role secret key from Supabase → Project Settings → API |
| `SUPABASE_URL` | - | Project URL from Supabase → Project Settings → API |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token from @BotFather |

**Category:** Bots · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/telegram-follow-up-1)
