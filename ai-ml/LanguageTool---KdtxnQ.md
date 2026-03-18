# Deploy LanguageTool on Railway

 More than a Grammar Checker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/KdtxnQ)

## About

# LanguageTool
LanguageTool is an Open Source proofreading software for English, French, German, Polish, Russian, and more than 20 other languages. It finds many errors that a simple spell checker cannot detect.

# Notes
Use the following URL in your extension or desktop app:

/v2

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LanguageTool | `erikvl87/languagetool` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8010 | Port for LanguageTool |
| `Java_Xms` | 512m | - |
| `Java_Xmx` | 1g | - |
| `langtool_languageModel` | /ngrams | - |

## Configuration

- **Healthcheck:** `/v2/check?text=helloworld&language=en-US`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/ngrams`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/KdtxnQ)
