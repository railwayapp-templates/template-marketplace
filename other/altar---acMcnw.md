# Deploy altar on Railway

A lightweight API for identicon generation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/acMcnw)

## About

**Altar is a tiny API that generates identicons.**

📘 Read the docs here: https://github.com/berrysauce/altar

Identicons are visual representations of data, that serve the purpose of identifying someone or something ([Wikipedia](https://en.wikipedia.org/wiki/Identicon)).

Altar always generates the same image from the same input through hashing and simple calculations. This means that you can use Altar to generate profile pictures for users based on their username or any other unique identifier.

Altar was built from the ground up with minimal dependencies but is inspired by GitHub's Identicons and [minidenticons](https://github.com/laurentpayot/minidenticons).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| altar | [berrysauce/altar](https://github.com/berrysauce/altar) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEY` | (secret) | Protect your Altar instance with an API key. More info in the README. |

## Configuration

- **Start command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python

[View on Railway →](https://railway.com/deploy/acMcnw)
