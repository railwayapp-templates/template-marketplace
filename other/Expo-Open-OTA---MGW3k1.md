# Deploy Expo-Open-OTA on Railway

An open-source Go implementation of the Expo Updates protocol

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/MGW3k1)

## About

An open-source Go implementation of the Expo Updates protocol, designed for production with support for cloud storage like S3 and CDN integration, delivering fast and reliable OTA updates for React Native apps.


For detailed information and to explore the core functionalities of expo-open-ota, visit the main repository:
[expo-open-ota on GitHub](https://github.com/axelmarciano/expo-open-ota)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Expo-Open-OTA | `ghcr.io/axelmarciano/expo-open-ota` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `JWT_SECRET` | (secret) | Expo settings |
| `STORAGE_MODE` | local | - |
| `S3_BUCKET_NAME` | - | AWS configuration |
| `EXPO_ACCESS_TOKEN` | (secret) | Storage configuration |
| `KEYS_STORAGE_TYPE` | environment | - |
| `AWS_SECRET_ACCESS_KEY` | (secret) | CloudFront settings |
| `CLOUDFRONT_KEY_PAIR_ID` | - | Key storage settings |
| `LOCAL_BUCKET_BASE_PATH` | ./updates | - |
| `PRIVATE_CLOUDFRONT_KEY_B64` | - | AWS Secrets Manager keys (if using aws-secrets-manager) |
| `AWSSM_EXPO_PUBLIC_KEY_SECRET_ID` | (secret) | - |
| `AWSSM_EXPO_PRIVATE_KEY_SECRET_ID` | (secret) | - |
| `AWSSM_CLOUDFRONT_PRIVATE_KEY_SECRET_ID` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/updates`

**Category:** Other

[View on Railway →](https://railway.com/template/MGW3k1)
