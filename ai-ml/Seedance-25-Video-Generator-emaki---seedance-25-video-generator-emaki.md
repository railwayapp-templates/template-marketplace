# Deploy Seedance 2.5 Video Generator (emaki) on Railway

One-page Seedance 2.5 text-to-video web app on the emaki API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seedance-25-video-generator-emaki)

## About

A one-page web app that turns a prompt into a Seedance 2.5 AI video clip. Type what happens in the shot, optionally paste an image URL as the first frame, pick aspect ratio, length and resolution, and the finished clip plays on the page a few minutes later. Clips come from the API of [emaki](https://emaki.ai/?utm_source=railway&amp;utm_medium=template).

It is a single Node.js service with no npm dependencies: `server.js` serves the page and two JSON routes, and `lib/emaki.js` forwards each request to the emaki HTTP API with your key. There is no database and no storage, because the finished clip is served from emaki's CDN. Railway builds the repository, starts `node server.js` on port 3000 and checks `/health`. You enter `EMAKI_API_KEY` when deploying (create one at [emaki.ai/settings/apikeys](https://emaki.ai/settings/apikeys)); `ACCESS_PASSWORD` is generated for you, so only people you share it with can spend the account's credits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| emaki-video-starter | [hanshs474/emaki-video-starter](https://github.com/hanshs474/emaki-video-starter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `EMAKI_MODEL` | seedance_2_5 | Video model: seedance_2_5, seedance_2, seedance_2_fast or seedance_2_mini |
| `EMAKI_API_KEY` | (secret) | Your emaki API key. Create one at https://emaki.ai/settings/apikeys |
| `ACCESS_PASSWORD` | (secret) | Password visitors enter before generating, so strangers cannot spend your credits |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/seedance-25-video-generator-emaki)
