# Deploy notebin-bot on Railway

A discord bot that would create codebins using https://notebin.cf

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/3NbRXM)

## About

# Notebin Bot
- A discord bot that will save your text to [https://www.notebin.cf](https://notebin.cf)
- Link: [click here](https://discord.com/api/oauth2/authorize?client_id=970763345529548821&permissions=0&scope=bot)


[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/3NbRXM?referralCode=HN1He9)

# Links

1. Notebin - https://notebin.cf
2. Notebin api - https://notebin.cf/api 
3. Notebin src - https://github.com/spicybirsge/notebin

# Requirements for self hosting

- Node v16. 6.0 or higher

# Self hosting

1. Go to https://discord.com/developers and create a bot and get its token
2. Then copy this project and add an env variable called token and set its value to the token you got
3. Run the command `npm install` to install all dependencies
4. Run the project using node index.js
5. Wanna deploy this easily? click the "Deploy on Railway" button.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bot | [spicybirsge/notebin-bot](https://github.com/spicybirsge/notebin-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `token` | (secret) | Go to https://discord.com/developers and create a bot, then add its token here. |

## Configuration

- **Start command:** `node index.js`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/3NbRXM)
