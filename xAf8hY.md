# Deploy Auto-Reaction-Bot on Railway

A Telegram Bot that automatically reacts to posts in Telegram All messages.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/xAf8hY)

## About

<p align="center" style="text-align:center;">
  <img height="256px" width="256px" src="https://raw.githubusercontent.com/Malith-Rukshan/Auto-Reaction-Bot/main/logo.png" align="center">
</p>
<h1 align="center">❤️ Auto Reaction Bot ✨</h1>
<div align="center">
<a href="https://Auto_ReactionBOT.t.me">
<img src="https://img.shields.io/badge/Demo-Workers-1cd760?logo=cloudflare&amp;style=flat">
</a>
<a href="https://t.me/Auto_ReactionBOT">
<img src="https://img.shields.io/badge/Telegram-@Auto__ReactionBOT-blue?logo=telegram&amp;style=flat"> 
</a>
</div>
<h4 align="center">✨ Automate Your Telegram Chats with this Auto Reaction Bot! React to Messages Effortlessly! 🚀</h4>
<div align="center">
  Serverless deployment on Cloudflare - Free
  <br>
  <br>
  <a href="https://core.telegram.org/bots/api#setmessagereaction">Telegram API</a>
  ·
  <a href="https://core.telegram.org/bots/api#reactiontype">Supported Reactions</a>
  .
  <a href="https://github.com/Malith-Rukshan/Auto-Reaction-Bot/issues/new">Report a Bug</a>
</div>

##
![Auto Reaction Preview](https://raw.githubusercontent.com/Malith-Rukshan/Auto-Reaction-Bot/main/preview.gif)


## ✨ Features
- Automatic Reactions ✓
- Supports Multiple Chats ✓
- Customizable Reactions ✓
- Efficient Real-Time Processing ✓
- Serverless Architecture ✓
- Supports for Groups &amp; Channels ✓
- Compliance with Telegram API Updates ✓
- Lightweight Code - Easy Setup ✓
- More Comming Soon...

✅ **Demo**: Experience the Auto Reaction Bot in demo: [Auto Reaction Bot ✨](https://t.me/Auto_ReactionBOT).

## 🛠 Configuring Environments

To ensure that your Telegram Auto-Reaction Bot operates correctly, you will need to configure several environment variables in your Cloudflare Worker settings:

- `BOT_TOKEN`: This is your bot's token, which you can generate from [BotFather](https://t.me/BotFather). This token allows your bot to authenticate and interact with the Telegram API.
- `BOT_USERNAME`: The username you have set for your bot. This is used within the script to identify messages intended for your bot.
- `EMOJI_LIST`: A string of emojis that the bot will use to react to messages. You can customize this list to include any emojis you prefer, such as 👍❤🔥🥰👏😁🎉🤩🙏👌🕊😍🐳❤‍🔥💯⚡🏆.
- `RESTRICTED_CHATS`: A list of chat IDs where the bot should not react to messages (Optional). Split each chat ID by " , ". Example : `-1001233434,3434234`

## 🧩 Configure the Webhook
Open your web browser and enter the following URL (replace  with your actual bot token and https://your.cloudflare.worker.url/ with your Cloudflare Worker URL):
    <br>
    
```
https://api.telegram.org/bot/setWebhook?url=https://your.cloudflare.worker.url/
```

**Verify the Webhook Configuration**:
To check if the webhook is set up correctly, navigate to:
    <br>

```
https://api.telegram.org/bot/getWebhookInfo
```

## 🎯 Credits and Other
- Based on [Telegram BOT API](https://core.telegram.org/bots/api)
- 🧑‍💻 Built with 💖 by [Single Developers  ](https://t.me/SingleDevelopers)

## ⚖️ License
And of course:

MIT: http://opensource.org/licenses/MIT

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Auto-Reaction-Bot | [Malith-Rukshan/Auto-Reaction-Bot](https://github.com/Malith-Rukshan/Auto-Reaction-Bot) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BOT_TOKEN` | (secret) |
| `EMOJI_LIST` | 👍❤🔥🥰👏😁🎉🤩🙏👌🕊😍🐳❤‍🔥💯⚡🏆 |
| `BOT_USERNAME` | (secret) |

## Configuration

- **Start command:** `npm install`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** JavaScript, Dockerfile, Procfile

[View on Railway →](https://railway.com/template/xAf8hY)
