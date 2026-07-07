# Deploy Expo-Open-OTA on Railway

An open-source Go implementation of the Expo Updates protocol

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/MGW3k1)

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
| `PORT` | 3000 | Port used by the API |
| `BASE_URL` | - | https://axelmarciano.github.io/expo-open-ota/docs/getting-started/prerequisites#base-url |
| `AWS_REGION` | - | https://axelmarciano.github.io/expo-open-ota/docs/reference/environment |
| `JWT_SECRET` | (secret) | Expo settings |
| `EXPO_APP_ID` | - | https://axelmarciano.github.io/expo-open-ota/docs/getting-started/prerequisites#expo-token--project-id |
| `STORAGE_MODE` | s3 | https://axelmarciano.github.io/expo-open-ota/docs/server-configuration/storage |
| `S3_BUCKET_NAME` | - | AWS configuration |
| `AWS_ACCESS_KEY_ID` | - | https://axelmarciano.github.io/expo-open-ota/docs/server-configuration/storage |
| `AWS_BASE_ENDPOINT` | - | https://axelmarciano.github.io/expo-open-ota/docs/server-configuration/storage |
| `CLOUDFRONT_DOMAIN` | - | https://axelmarciano.github.io/expo-open-ota/docs/server-configuration/cdn/cloudfront |
| `EXPO_ACCESS_TOKEN` | (secret) | https://axelmarciano.github.io/expo-open-ota/docs/getting-started/prerequisites#expo-token--project-id |
| `KEYS_STORAGE_TYPE` | environment | https://axelmarciano.github.io/expo-open-ota/docs/server-configuration/key-store |
| `PUBLIC_EXPO_KEY_B64` | - | https://axelmarciano.github.io/expo-open-ota/docs/server-configuration/key-store/?keyStore=environment#expo-signing-certificate |
| `PRIVATE_EXPO_KEY_B64` | - | https://axelmarciano.github.io/expo-open-ota/docs/server-configuration/key-store/?keyStore=environment#expo-signing-certificate |
| `AWS_SECRET_ACCESS_KEY` | (secret) | CloudFront settings |
| `CLOUDFRONT_KEY_PAIR_ID` | - | Key storage settings |
| `PRIVATE_CLOUDFRONT_KEY_B64` | - | AWS Secrets Manager keys (if using aws-secrets-manager) |
| `AWSSM_EXPO_PUBLIC_KEY_SECRET_ID` | (secret) | https://axelmarciano.github.io/expo-open-ota/docs/server-configuration/key-store?keyStore=aws-secrets-manager |
| `AWSSM_EXPO_PRIVATE_KEY_SECRET_ID` | (secret) | https://axelmarciano.github.io/expo-open-ota/docs/server-configuration/key-store?keyStore=aws-secrets-manager |
| `AWSSM_CLOUDFRONT_PRIVATE_KEY_SECRET_ID` | (secret) | https://axelmarciano.github.io/expo-open-ota/docs/server-configuration/key-store?keyStore=aws-secrets-manager |

## Configuration

- **Healthcheck:** `/hc`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/MGW3k1)
