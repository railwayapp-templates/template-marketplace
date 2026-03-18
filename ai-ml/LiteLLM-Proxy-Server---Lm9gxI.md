# Deploy LiteLLM Proxy Server on Railway

A self-contained template for LiteLLM Proxy Server with  DB/Cache

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Lm9gxI)

## About

## LiteLLM Proxy Server Deployment Guide

This guide walks through deploying a LiteLLM Proxy Server instance with pre-configured setup for Postgres DB access, Redis cache, and UI panel access.

### Configuration Management

LiteLLM is designed to load configuration settings via `config.yaml`. Since Railway doesn't directly support file management while maintaining easy image deployment via the LiteLLM git repository, we'll use AWS S3 to host and manage the configuration file.

For complete configuration options, refer to the [official LiteLLM documentation](https://docs.litellm.ai/docs/proxy/config_settings).

#### Sample Configuration File

Here's a sample `config.yaml` that demonstrates configuring an OpenRouter model with Redis caching and Langfuse callbacks. This is what I personally used in my basic deployment:

```yaml
model_list:
  - model_name: gpt-4o-openrouter
    litellm_params:
      model: openrouter/openai/gpt-4o-2024-11-20
      api_base: https://openrouter.ai/api/v1
      api_key: your-openrouter-key
      input_cost_per_token: 0.0000025
      output_cost_per_token: 0.000010
      rpm: 300

litellm_settings:
  success_callback: ["langfuse"]
  cache: True
  cache_params:
    type: "redis"
```

#### S3 Configuration Setup

1. **Create S3 Bucket**
   - Navigate to AWS S3 Console
   - Create new bucket with these settings:
     - Name: `your-litellm-configs`
     - Region: `your-region`
     - Object Ownership: ACLs disabled
     - Block Public Access: Enable all
     - Bucket Versioning: Enable
     - Default encryption: SSE-S3

2. **Create IAM User and Policy**
   - Go to AWS IAM Console
   - Create new user named `litellm-config-user`
   - Create this policy named `litellm-config-access`:
     ```json
     {
         "Version": "2012-10-17",
         "Statement": [
             {
                 "Effect": "Allow",
                 "Action": [
                     "s3:GetObject",
                     "s3:ListBucket",
                     "s3:PutObject"
                 ],
                 "Resource": [
                     "arn:aws:s3:::your-litellm-configs",
                     "arn:aws:s3:::your-litellm-configs/*"
                 ]
             }
         ]
     }
     ```
   - Attach policy to user
   - Create access keys for "Application running outside AWS"
   - Save both the Access Key ID and Secret Access Key

3. **Upload Configuration**
   - Create your `config.yaml` file locally
   - Upload to your S3 bucket

#### Railway Environment Setup

Configure these environment variables in your Railway project:

- `LITELLM_CONFIG_BUCKET_NAME=your-litellm-configs`
- `LITELLM_CONFIG_BUCKET_OBJECT_KEY=config.yaml`
- `AWS_ACCESS_KEY_ID=your_access_key_id`
- `AWS_SECRET_ACCESS_KEY=your_secret_access_key`
- `AWS_REGION_NAME=your_region`

For additional configuration options and advanced settings, please refer to the [LiteLLM Proxy documentation](https://docs.litellm.ai/docs/proxy/config_settings).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| litellm | `ghcr.io/berriai/litellm:main-stable` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `bitnami/redis:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | litellm | :: | Fixes a bug where railway can otherwise not access the private domain assigned to the LiteLLM instance |
| `PORT` | litellm | 4000 | - |
| `OR_API_KEY` | litellm | (secret) | API Key if using OpenRouter service |
| `OR_APP_NAME` | litellm | - | App name for OpenRouter metrics - ex. "Your App Name" |
| `OR_SITE_URL` | litellm | - | Site URL for OpenRouter metrics - ex. "https://yoursite.com" |
| `UI_PASSWORD` | litellm | (secret) | Admin panel login password |
| `UI_USERNAME` | litellm | (secret) | Admin panel login username |
| `LANGFUSE_HOST` | litellm | - | For LLM logging callbacks |
| `REDIS_PASSWORD` | litellm | (secret) | - |
| `AWS_REGION_NAME` | litellm | - | Optional - to allow LiteLLM to remotely load config.yaml from a remote S3 bucket | See docs for details : https://railway.com/deploy/Lm9gxI |
| `LITELLM_SALT_KEY` | litellm | - | Key for salting DB entries, immutable after initialization - ex. "sk-12345" |
| `AWS_ACCESS_KEY_ID` | litellm | - | Optional - to allow LiteLLM to remotely load config.yaml from a remote S3 bucket | See docs for details : https://railway.com/deploy/Lm9gxI |
| `STORE_MODEL_IN_DB` | litellm | - | See LiteLLM Proxy Server Documentation |
| `LITELLM_MASTER_KEY` | litellm | - | Master authentication key for virtual key creation - ex. "sk-12345" |
| `LANGFUSE_PUBLIC_KEY` | litellm | - | For LLM logging callbacks |
| `LANGFUSE_SECRET_KEY` | litellm | (secret) | For LLM logging callbacks |
| `AWS_SECRET_ACCESS_KEY` | litellm | (secret) | Optional - to allow LiteLLM to remotely load config.yaml from a remote S3 bucket | See docs for details : https://railway.com/deploy/Lm9gxI |
| `LITELLM_CONFIG_BUCKET_NAME` | litellm | - | Optional - to allow LiteLLM to remotely load config.yaml from a remote S3 bucket |
| `LITELLM_CONFIG_BUCKET_OBJECT_KEY` | litellm | - | Optional - to allow LiteLLM to remotely load config.yaml from a remote S3 bucket |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/bitnami`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/Lm9gxI)
