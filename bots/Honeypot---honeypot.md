# Deploy Honeypot on Railway

🍯 Catch and ban Discord spam bots by monitoring a "#honeypot" channel!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/honeypot)

## About

A Discord bot to automatically catch and remove spam bots by monitoring a dedicated "#honeypot" channel.

Very simple, all you need to do is add the bot token in `DISCORD_TOKEN` and then add the bot to your server(s) and everything will be taken care of: 

1. [**Invite the bot**](https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID) to your server with appropriate permissions (Ban Members, Manage Channels, etc).
2. The bot will create a `#honeypot` channel on join, or you can set it up with `/honeypot`.
3. Configure the admin log channel and action (kick or ban) using the `/honeypot` command.
4. Ensure the bot’s highest role is above any self-assignable (color/ping) roles.
5. Any user posting in the honeypot channel will be banned or removed, and the action will be logged.

&gt; **Note:** Kick is default and is a softban (bans &amp; unbans) so Discord deletes their immediate messages

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Honeypot | [RiskyMH/Honeypot](https://github.com/RiskyMH/Honeypot) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATABASE_URL` | sqlite:///data/honeypot.sqlite | Database connection for the Bot |
| `DISCORD_TOKEN` | (secret) | The Discord API token for the bot |

## Configuration

- **Start command:** `bun start`
- **Volume:** `/data`

**Category:** Bots · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/honeypot)
