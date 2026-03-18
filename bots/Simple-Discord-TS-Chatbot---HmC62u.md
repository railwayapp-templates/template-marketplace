# Deploy Simple Discord-TS Chatbot on Railway

Fun but simple addition to your Discord Server!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/HmC62u)

## About

# Simple Discord Chatbot

The AI uses OpenAI `gpt-3.5-turbo` ( you can edit this in the code though ) and streams its responses to chat. 
The bot is meant to be a fun addition to your Discord Server, and is meant to be used by a group of users at the same time.

## Customization
You can set the bot to only listen in a specific channel and or listen to users with specific roles. 
You can further customize the AI parameters itself in the `config.ts` file.

## Instructions

1. Provide `.env`<br>
Add a `.env` file, and add the required variables that can be found in `env.example.txt`.

2. Edit `config.ts`<br>
You can edit the bot accordingly in `config.ts` to provide specific parameters and instructions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SimpleDiscordChatbot | [FraglyG/SimpleDiscordChatbot](https://github.com/FraglyG/SimpleDiscordChatbot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ROLE_ID` | - | The ID of the role your discord bot may talk to ( restricts it to that people with the role, leave open if no restriction ) |
| `GUILD_ID` | - | The ID of your Discord Server |
| `BOT_TOKEN` | (secret) | Bot Token From Discord |
| `CHANNEL_ID` | - | The ID of the channel your discord bot will talk in ( restricts it to that channel, leave open if no restriction ) |
| `OPENAI_API_KEY` | (secret) | your OpenAI API key |

**Category:** Bots · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/HmC62u)
