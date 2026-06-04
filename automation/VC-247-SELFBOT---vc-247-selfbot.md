# Deploy VC 24/7 SELFBOT on Railway

VC 24/7 SELFBOT In Discord

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vc-247-selfbot)

## About

Hosting VC 24/7 SELFBOT involves setting up an environment where the bot can run continuously on a cloud platform like Railway. This process ensures your bot stays online even if your computer is turned off. You will need to prepare some essential information, such as your Discord Token, the Server ID of the server you want the bot to join, and the Channel ID of the voice channel the bot will reside in. Once this information is entered, the bot will be able to connect and stay in the voice channel as long as you desire.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Voicecord | [Tubby12345/Voicecord](https://github.com/Tubby12345/Voicecord) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TOKEN` | (secret) | user token |
| `SELF_DEAF` | - | deaf? |
| `SELF_MUTE` | - | mute? |
| `SERVER_ID` | - | server id |
| `CHANNEL_ID` | - | channel id |

**Category:** Automation · **Languages:** Python

[View on Railway →](https://railway.com/deploy/vc-247-selfbot)
