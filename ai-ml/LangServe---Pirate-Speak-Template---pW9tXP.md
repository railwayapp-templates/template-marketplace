# Deploy LangServe - Pirate Speak Template on Railway

Basic Langserve server with the pirate speak template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pW9tXP)

## About

See the readme for this project for more information:
https://github.com/PaulLockett/LangServe-Railway/tree/main

Make sure to set your environmental variables! The defaults are only placeholders.

Note that when adding a new template you must also add it to the poetry project so that the nix build will pick it up and make the module available to the langServe server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LangServe-Railway | [PaulLockett/LangServe-Railway](https://github.com/PaulLockett/LangServe-Railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SUPABASE_KEY` | { Input supabase api key here } | The API key for your supabase database |
| `SUPABASE_URL` | https://{supabase project reference id}.supabase.co | The url for your Supabase database. |
| `OPENAI_API_KEY` | (secret) | This is your api key for openAI. It will be used by chains in this langServe service. |
| `ANTHROPIC_API_KEY` | (secret) | This is your api key for Anthropic. It will be used by chains in this langServe service. |
| `LANGCHAIN_API_KEY` | (secret) | This is your API key for LangSmith observability. |
| `LANGCHAIN_PROJECT` | railway_deployment | The default project name used to organize observed chain calls done with this service. |
| `LANGCHAIN_ENDPOINT` | https://api.smith.langchain.com | The endpoint for LangSmith usage. This may be needed for older version of Langchain if they are used. |
| `LANGCHAIN_TRACING_V2` | true | This is the boolean value for LangSmith to use v2 of there tracing |
| `HUGGING_FACE_INFERENCE_API` | { Input hugging face inference api key here } | This is your api key for HuggingFace Inference endpoints. It will be used by chains in this langServe service. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/pW9tXP)
