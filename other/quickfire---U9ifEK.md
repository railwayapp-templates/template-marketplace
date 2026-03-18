# Deploy quickfire on Railway

Quickfire Minecraft Server. Simple and fast.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/U9ifEK)

## About

# Quickfire Minecraft Server

A project by Vessyl. Spins up an minecraft server in no time. Everything is ready. Ofc you can change everything from MaxPlayers, Mode, Version etc.

View all available variables here: https://github.com/vessylapp/quickfire-test-mc/tree/master?tab=readme-ov-file#environment-variables

# How to connect?

Go to > Settings > Networking  > Public Networking >
And there should be an address that looks something like this: monorail.proxy.rlwy.net:111111

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Quickfire | [vessylapp/quickfire-test-mc](https://github.com/vessylapp/quickfire-test-mc) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `Port` | 25565 | Dont change this |
| `Version` | 1.18.2 | You can change this to what ever you wan't |
| `Hardcore` | false | Enable Harcore Mode  |
| `MaxPlayers` | 15 | Not required, but a good thing to have |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/minecraft/data`

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/U9ifEK)
