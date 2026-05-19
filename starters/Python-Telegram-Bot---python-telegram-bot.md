# Deploy Python Telegram Bot on Railway

Just 1-click setup. Telegram bot with commands, echo & menu buttons 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/python-telegram-bot)

## About

Python Telegram Bot is a simple starter bot built with `python-telegram-bot`. It includes ready-to-use commands, echo replies, persistent chat menu buttons, fallback handling for unknown commands, and environment-based configuration. This template is ideal for quickly launching a Telegram bot that works immediately after adding your bot token.

![](https://raw.githubusercontent.com/codestorm-official/python-telegram-bot/refs/heads/main/img/bot.png)

Hosting a Python Telegram Bot means running a long-lived Python process that connects to Telegram, listens for incoming messages, and responds through the Telegram Bot API. This template uses environment variables for configuration, so your bot token stays separate from the codebase. After deployment, the bot starts automatically and keeps running as a service. It uses long polling, so you do not need to configure a webhook or public domain. Once the `BOT_TOKEN` variable is added, the bot can respond to commands, normal text messages, and menu button interactions.

### How to Use

After deploying this template, the app is already running on Railway. You can open the generated Railway domain to test the starter app immediately.

If you want to customize the source code, use one of the workflows below.

#### Via Railway CLI

Use this workflow if you want to edit the project locally and redeploy changes directly from your machine using Railway CLI.

1. Deploy the template.
2. Clone the repository from **Source Repo** or **Upstream Repo** in the Railway dashboard.
3. Enter the project directory:

```bash
cd 
```

4. Link your local project directory to the deployed Railway project:

```bash
railway link
```

5. Check the linked project, environment, service, and repository information:

```bash
railway status
```

6. Edit the code locally.
7. Redeploy your local changes to Railway:

```bash
railway up
```

Railway will upload the current local directory and deploy it to the linked service.

#### Via Git / GitHub

Use this workflow if you want to manage changes through GitHub and let Railway automatically redeploy after every push.

1. Deploy the template.
2. Open **Source Repo** or **Upstream Repo** from the Railway dashboard.
3. Fork the repository to your own GitHub account.
4. Clone your fork locally:

```bash
git clone 
cd 
```

5. Edit the code locally.
6. Commit and push your changes to your fork:

```bash
git add .
git commit -m "Customize Node.js starter"
git push origin main
```

7. In Railway, change the service **Source Repo** to your fork if Railway does not automatically create or link it.
8. After the service is connected to your fork, future pushes to the repository can trigger automatic redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| python-telegram-bot | [codestorm-official/python-telegram-bot](https://github.com/codestorm-official/python-telegram-bot) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BOT_TOKEN` | (secret) |
| `LOG_LEVEL` | INFO |

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/python-telegram-bot)
