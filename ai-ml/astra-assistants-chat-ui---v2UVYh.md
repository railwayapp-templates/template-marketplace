# Deploy astra-assistants-chat-ui on Railway

DataStax Open Source GenAI Starter

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/v2UVYh)

## About

UI to create assistants with file upload functionality. Supports various third party LLMs.

Powered by Huggingface chat-ui and astra-assistants-api

Add the following variables for third party LLM support:

> https://platform.openai.com/api-keys --> create new secret key
OPENAI_API_KEY=

> https://www.perplexity.ai/settings/api  --> generate
PERPLEXITYAI_API_KEY=

> https://dashboard.cohere.com/api-keys
COHERE_API_KEY=

> bedrock models https://docs.aws.amazon.com/bedrock/latest/userguide/setting-up.html
AWS_REGION_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

> vertexai models https://console.cloud.google.com/vertex-ai
GOOGLE_JSON_PATH=
GOOGLE_PROJECT_ID=

> gemini api https://makersuite.google.com/app/apikey
GEMINI_API_KEY=


Additional models can be added to the MODELS variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chat-ui | [datastax/chat-ui](https://github.com/datastax/chat-ui) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MODELS` | [     {        "name": "huggingface/mistralai/Mistral-7B-Instruct-v0.1",       "displayName": "mistralai/Mistral-7B-Instruct-v0.1",       "description": "Mistral 7B is a new Apache 2.0 model, released by Mistral AI that outperforms Llama2 13B in benchmarks.",       "endpoints": [{         "type" : "openai",       }],     },     {       "name": "huggingface/meta-llama/Llama-2-70b-chat-hf",       "displayName": "meta-llama/Llama-2-70b-chat-hf",       "description": "The latest and biggest model from Meta, fine-tuned for chat.",       "endpoints": [{         "type" : "openai",       }],     },     {       "name": "huggingface/NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",       "displayName": "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",       "description": "Nous Hermes 2 Mixtral 8x7B DPO is the new flagship Nous Research model trained over the Mixtral 8x7B MoE LLM.",       "endpoints": [{         "type" : "openai",       }],     },     {       "name": "huggingface/codellama/CodeLlama-70b-Instruct-hf",       "displayName": "codellama/CodeLlama-70b-Instruct-hf",       "description": "Code Llama, a state of the art code model from Meta. Now in 70B!",       "endpoints": [{         "type" : "openai",       }],     },     {       "name": "huggingface/mistralai/Mistral-7B-Instruct-v0.2",       "displayName": "mistralai/Mistral-7B-Instruct-v0.2",       "description": "Mistral 7B is a new Apache 2.0 model, released by Mistral AI that outperforms Llama2 13B in benchmarks.",       "endpoints": [{         "type" : "openai",       }],     },     {       "name": "huggingface/openchat/openchat-3.5-0106",       "displayName": "openchat/openchat-3.5-0106",       "description": "OpenChat 3.5 is the #1 model on MT-Bench, with only 7B parameters.",       "endpoints": [{         "type" : "openai",       }],     },      {       "name": "gpt-3.5-turbo",       "displayName": "gpt-3.5-turbo",       "endpoints": [{         "type" : "openai",       }],     },     {       "name": "gpt-4-1106-preview",       "displayName": "gpt-4-1106-preview",       "endpoints": [{         "type" : "openai",       }],     }, ] | Valid models for use with assistants api |
| `HF_TOKEN` | (secret) | https://huggingface.co/docs/hub/en/security-tokens |
| `TASK_MODEL` | huggingface/mistralai/Mistral-7B-Instruct-v0.1 | This model is used for general tasks like creating emojis |
| `MONGODB_URL` | - | temporary thing |
| `COHERE_API_KEY` | (secret) | https://dashboard.cohere.com/api-keys |
| `GEMINI_API_KEY` | (secret) | https://makersuite.google.com/app/apikey |
| `OPENAI_API_KEY` | (secret) | https://platform.openai.com/api-keys --> create new secret key |
| `ASTRA_API_TOKEN` | (secret) | https://astra.datastax.com/ --> tokens --> administrator user --> generate |
| `AWS_REGION_NAME` | - | https://docs.aws.amazon.com/bedrock/latest/userguide/setting-up.html |
| `AWS_ACCESS_KEY_ID` | - | https://docs.aws.amazon.com/bedrock/latest/userguide/setting-up.html |
| `ENABLE_ASSISTANTS` | true | - |
| `USE_LOCAL_WEBSEARCH` | true | Allow browser based web search |
| `PERPLEXITYAI_API_KEY` | (secret) | https://docs.perplexity.ai/docs/getting-started |
| `AWS_SECRET_ACCESS_KEY` | (secret) | https://docs.aws.amazon.com/bedrock/latest/userguide/setting-up.html |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Svelte, JavaScript, HTML, Dockerfile, Shell, CSS

[View on Railway →](https://railway.com/deploy/v2UVYh)
