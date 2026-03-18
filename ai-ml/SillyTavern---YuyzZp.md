# Deploy SillyTavern on Railway

LLM Frontend for Power Users

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/YuyzZp)

## About

---

⚠️  
After deploying, it may take a couple minutes for it to be ready, check `Deploy Logs` to see if it's ready.  
I also highly recommend you to change the password of default user to something else as soon as you're able to access ST.

---

SillyTavern (or ST for short) is a locally installed user interface that allows you to interact with text generation LLMs, image generation engines, and TTS voice models. Our goal is to empower users with as much utility and control over their LLM prompts as possible, embracing the steep learning curve as part of the fun.

SillyTavern is a passion project brought to you by a dedicated community of LLM enthusiasts and will always be free and open-sourced. Beginning in February 2023 as a fork of TavernAI 1.2.8, SillyTavern now has over 200 contributors and 2 years of independent development under its belt, and continues to serve as a leading software for savvy AI hobbyists.

This template pretty much uses the original SillyTavern's Docker image but slightly modified so that the config can be managed by Environment Variable .

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SillyTavern | `ghcr.io/null2264/st-railway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SILLYTAVERN_LOG_LEVEL` | 3 | Minimum log level to display (DEBUG = 0, INFO = 1, WARN = 2, ERROR = 3) |
| `SILLYTAVERN_ENABLE_IPV6` | false | Enable IPv6 support |
| `SILLYTAVERN_PREFER_IPV6` | false | Prefer IPv6 connection |
| `SILLYTAVERN_DISCREET_LOGIN` | (secret) | Whether or not to hide user list. Can be 'true' or 'false' (without quotation mark) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/app/persist/`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/YuyzZp)
