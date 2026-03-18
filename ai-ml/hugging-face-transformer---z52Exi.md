# Deploy hugging-face-transformer on Railway

A Hugging Face Transformer Railway Template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/z52Exi)

## About

# Hugging Face Transformer Example

This example starts up a [FastAPI](https://fastapi.tiangolo.com/) server which runs the [Hugging Face Transformers](https://huggingface.co/docs/transformers/en/index).

This example runs an embedding model on the CPU which works great with railway as resources can scale per requests.

Note: This won't work for GPU work flows and will crash.

## ⬆️ Deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/z52Exi?referralCode=66iek4)

or

Install the [Railway CLI](https://docs.railway.com/guides/cli), then run `railway up`

## ✨ Features

- Transformers
- FastAPI
- Hypercorn
- Python 3.11

Uses [Nixpacks](https://nixpacks.com/docs/providers/python) to deploy on railway which runs Python 3.11 by default.

## 💁‍♀️ How to use locally

- Clone locally and install packages with pip using `pip install -r requirements.txt`
- Run locally using `hypercorn main:app --reload`

## 🧩 Background

The team at [JigsawStack](https://jigsawstack.com) is launching an embedding model and we're experimenting with different infrastructure for scalable and affordable CPU usage. Check out the [embedding model here](https://jigsawstack.com/blog/introducing-multimodal-multilingual-embedding-model-for-images-audio-and-pdfs-in-alpha)

## Common issues

- When deployed on Railway, your instance region might be deployed to a metal region which is currently in BETA and seem to be a lot slower than non-beta regions. Switch to US West (Oregon, USA) for the best performance on testing. Metal regions don't have volume attachments which could be the issue for caching data.
- You can attach a volume if you switching models in a single instance, this would allow for better caching and faster switches
- If you need a specific python version, you can set `NIXPACKS_PYTHON_VERSION` in the variables tab to the desired version

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| transformer-fastapi | [JigsawStack/huggingface-transformers-railway-template](https://github.com/JigsawStack/huggingface-transformers-railway-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/z52Exi)
