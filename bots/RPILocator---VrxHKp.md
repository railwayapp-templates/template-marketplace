# Deploy RPILocator on Railway

A bot for notifying you when a new Raspberry Pi comes in stock

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/VrxHKp)

## About

A bot for notifying you when a new Raspberry Pi comes in stock. It uses the RSS feed from https://rpilocator.com

Steps to deploy:

- Create a new bot in the Discord application dashboard
- Deploy this template with the TOKEN and APPLICATION_ID environment variables
- Use /opt-in to opt into notifications, and /opt-out to opt out

The RSS feed is checked once per minute

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RPILocator | [FerretCode/rpilocator-bot](https://github.com/FerretCode/rpilocator-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TOKEN` | (secret) | Your Discord Bot Token |
| `APPLICATION_ID` | - | The Application ID of your bot |

**Category:** Bots · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/VrxHKp)
