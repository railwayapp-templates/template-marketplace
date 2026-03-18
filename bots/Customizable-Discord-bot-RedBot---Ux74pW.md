# Deploy Customizable Discord bot (RedBot) on Railway

An advanced fully modular, extendable Discord bot writen in python!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Ux74pW)

## About

**Customizable Discord Bot**

**Overview**

_**Warning:** This is an unofficial Railway template for the Red Discord Bot. Please refer to the official documentation for authoritative information._

Red is a fully modular Discord bot that offers a variety of features, including music, moderation, trivia, and stream alerts. This self-hosted bot allows you to customize its capabilities, enabling you to turn it into an admin assistant, a music player, a trivia master, or all of these at once!

Getting started is straightforward, and you don’t need any coding knowledge! Most of the setup and management can be done directly from within Discord.
Next Steps to Get Up and Running

1. Create a Discord Bot Account: Follow [this](https://red-discordbot-audio.readthedocs.io/en/stable/bot_application_guide.html) guide to set up your bot account: How to create a Discord Bot Account.

2. Deploy the Bot: Use the button to deploy Red on Railway effortlessly.

3. Configure Your Bot: After deployment, customize your bot's settings and modules to fit your server’s needs.

Default Modules Include:

- **Moderation Tools:** Manage your server with kick, ban, softban, mod-log, filters, and chat cleanup.
- **Trivia Games:** Engage users with built-in trivia lists and easy customization.
- **Music Features:** Stream from YouTube, SoundCloud, local files, and more.
- **Stream Alerts:** Get notifications for Twitch, YouTube, and Picarto.
- **Banking System:** Enjoy fun features like slot machines and user credits.
- **Custom Commands:** Tailor commands to your community's needs.
- **Media Search:** Quickly find images and GIFs.
- **Admin Automation:** Self-role assignments, cross-server announcements, and mod-mail reports.
- **Customizable Permissions:** Control who can use which commands.

Red supports a vibrant community, where you can find additional plugins (cogs) to enhance its capabilities.
Join the Community!

Red is actively developed and supported by a community that continuously creates new content (cogs/plugins) for everyone to enjoy. If you can’t find a specific cog, consult our guide on building your own!

Discover more about this open-source Discord bot here: https://github.com/Cog-Creators/Red-DiscordBot/tree/V3/develop

footnote: This deployment is a simplifed version

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DiscordBot - Redbot | [re-forgedpie/NixPackRedBot](https://github.com/re-forgedpie/NixPackRedBot) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_TOKEN` | (secret) | This is your bot token for the application. It is not the Client Secret found on the General Information page. Ensure that this token remains confidential and never share it publicly. |
| `DISCORD_PREFIX` | - | This is your bot's command prefix. Use this prefix in front of any command in Discord. It is commonly represented as [p] (for example, [p]help). |
| `ADDITIONAL_LAUNCH_ARGS` | - | Any addtional launch arguments needed for launching & running the bot. |

## Configuration

- **Volume:** `/var/lib/Red-DiscordBot/data`

**Category:** Bots

[View on Railway →](https://railway.com/template/Ux74pW)
