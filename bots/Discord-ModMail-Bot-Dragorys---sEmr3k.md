# Deploy Discord ModMail Bot (Dragory's) on Railway

ModMail Discord Bot (Dragory)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sEmr3k)

## About

## How to deploy:
1.) Fill in the required environment variable values

## How to configure:
See https://github.com/Dragory/modmailbot/blob/master/docs/configuration.md#other-options
https://github.com/Dragory/modmailbot/blob/master/docs/configuration.md#environment-variables

## How to migrate existing data:
If you already have a modmailbot instance and you want to merge data here, simply upload your db/data.sqlite file so it can be directly downloaded via HTTP(S), discord's CDN works fine.
Afterwards, insert the download URL on the `MIGRATE_URL` environment variable during setup.
Your data file will be downloaded on first run.

## How to update (bot):
Simply go to your deployment and hit redeploy. That will pull from latest.

## How to update (template):
Railway should have a way to update it automatically (?)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| modmail-railway | [metal0/modmail-railway](https://github.com/metal0/modmail-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | Don't edit this |
| `MM_URL` | - | Don't edit this (even if you have a custom domain) |
| `DB_FILE` | /app/modmailbot/db/data.sqlite | Var required for migration to work |
| `MM_PORT` | 8890 | Don't edit this |
| `MM_TOKEN` | (secret) | Bot's token |
| `MM_PREFIX` | ! | The commands prefix |
| `MM_STATUS` | Message me for help! | - |
| `MIGRATE_URL` | - | If you have an existing modmail instance, upload the data.sqlite file somewhere (discord CDN works) and put the URL to download it here, the bot will fetch it on startup |
| `MM_ALLOW_MOVE` | on | - |
| `MM_LOG_STORAGE` | local | local/attachment |
| `MM_MENTION_ROLE` | here | - |
| `MM_TYPING_PROXY` | on | - |
| `MM_CLOSE_MESSAGE` | We've closed your thread. If you have any further questions, feel free to send another message to open another thread. | - |
| `MM_LOG_CHANNEL_ID` | - | Log channel ID |
| `MM_MAIN_SERVER_ID` | - | Main Server's ID (Where the bot will listen to requests) |
| `MM_INBOX_SERVER_ID` | - | Server ID of the Inbox server (can be same as main) |
| `MM_RESPONSE_MESSAGE` | Thank you for your message! Our mod team will reply to you here as soon as possible. | - |
| `MM_PIN_THREAD_HEADER` | on | - |
| `MM_ATTACHMENT_STORAGE` | original | original=link original attachment, discord=reupload it to discord CDN |
| `MM_FALLBACK_ROLE_NAME` | Staff | - |
| `MM_PING_ON_BOT_MENTION` | off | - |
| `MM_UPDATE_MESSAGES_LIVE` | on | - |
| `MM_ANONYMIZE_CHANNEL_NAME` | on | - |
| `MM_ROLES_IN_THREAD_HEADER` | on | - |
| `MM_INBOX_SERVER_PERMISSION` | manageMessages | - |
| `MM_IGNORE_ACCIDENTAL_THREADS` | on | - |
| `MM_ATTACHMENT_STORAGE_CHANNEL_ID` | - | When using MM_ATTACHMENT_STORAGE=discord, the channel ID of where to store the attachments |
| `MM_MENTION_USER_IN_THREAD_HEADER` | on | - |
| `MM_CATEGORY_AUTOMATION__NEW_THREAD` | - | Channel ID of the Category in which to create new threads |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/modmailbot/db`

**Category:** Bots · **Languages:** Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/sEmr3k)
