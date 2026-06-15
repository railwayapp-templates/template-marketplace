# Deploy tac-test on Railway

Deploy and Host tac-test with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tac-test)

## About

This is Twilio Agent Connect Deploy Template on Railway. The Goal is to simplify the deploy for TAC.

This is using the most basic code for deploy TAC with openai agent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tac-railway | [JacobHuang91/tac-railway](https://github.com/JacobHuang91/tac-railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | openai api key to use ai agent |
| `TWILIO_API_KEY` | (secret) | - |
| `TWILIO_LOG_LEVEL` | DEBUG | - |
| `TWILIO_API_SECRET` | (secret) | - |
| `TWILIO_AUTH_TOKEN` | (secret) | - |
| `TWILIO_PHONE_NUMBER` | - | twilio phone number |
| `TWILIO_VOICE_PUBLIC_DOMAIN` | - | Update it after having public domain |

**Category:** Other · **Languages:** Python, HTML, Procfile

[View on Railway →](https://railway.com/deploy/tac-test)
