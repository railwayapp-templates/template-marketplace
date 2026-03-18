# Deploy Twitch Chat Logger (justlogs) on Railway

JustLogs template for twitch logging

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vtHoV_)

## About

Justlog is a twitch irc bot. It focuses on logging and providing an api for the logs.

This template sets up a Justlog instance and uses it to power the Justlog Docker image.

[Repo for Justlogs](https://github.com/gempir/justlog)

Several variables need to be set and will be populated in the configuration file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| justlogs-on-railway | [YaRissi/justlogs-on-railway](https://github.com/YaRissi/justlogs-on-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8025 | - |
| `ADMINS` | - | will only respond to commands executed by these users, seperated by comma |
| `CHANNELS` | - | the channels (userids) you want to log |
| `LOGLEVEL` | info | the log level, keep this to info probably, all options are: trace, debug, info, warn, error, fatal, and panic, logs output is stdout |
| `USERNAME` | (secret) | bot username (can be justinfan123123 if you don't want to use an account) |
| `ADMINAPIKEY` | - | our secret api key to access the admin api, can be any string, used in api request to admin endpoints |
| `BOTVERIFIED` | false | increase ratelimits if you have a verified bot, so the bot can join faster, false by default |
| `MERGE_CHANNELS` | 1 | If you change the channels to join over a command it will not overwrite it with the config in the repo on every redeploy. Default: 1 |
| `MYSECRETCLIENTID` | (secret) | your twitch client secret |
| `MYTWITCHCLIENTID` | - | your client ID, needed for fetching userids or usernames etc |
| `OAUTHTOKENFORCHAT` | (secret) | bot token can be anything if justinfan123123 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/data`

**Category:** Bots · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/vtHoV_)
