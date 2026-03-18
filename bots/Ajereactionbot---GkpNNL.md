# Deploy Ajereactionbot on Railway

✨ This Bot can Auto-react to Channel Posts, Groups and Private Chats. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/GkpNNL)

## About

To ensure that your Telegram Auto-Reaction Bot operates correctly, you will need to configure several environment variables in your Cloudflare Worker settings:

BOT_TOKEN: This is your bot's token, which you can generate from BotFather. This token allows your bot to authenticate and interact with the Telegram API.
BOT_USERNAME: The username you have set for your bot. This is used within the script to identify messages intended for your bot.
EMOJI_LIST: A string of emojis that the bot will use to react to messages. You can customize this list to include any emojis you prefer, such as 👍❤🔥🥰👏😁🎉🤩🙏👌🕊😍🐳❤‍🔥💯⚡🏆.
RANDOM_LEVEL: An integer that determines the randomness of reactions in group chats. Lower values result in more predictable reactions, while higher values increase randomness. Default is 0, meaning reactions are consistent by default.
RESTRICTED_CHATS: A list of chat IDs where the bot should not react to messages (Optional). Split each chat ID by " , ". Example : -1001233434,343423hh

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [USDTQBOT/Telegram-reaction-bot](https://github.com/USDTQBOT/Telegram-reaction-bot) (root: Package.json) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BOT_TOKEN` | (secret) |
| `BOT_USERNAME` | (secret) |
| `CLOUDFLARE_API_TOKEN` | (secret) |

## Configuration

- **Start command:** `node api/index.js`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** JavaScript, Dockerfile, Procfile

[View on Railway →](https://railway.com/template/GkpNNL)
