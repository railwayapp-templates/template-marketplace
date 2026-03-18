# Deploy S3Proxy on Railway

Run S3Proxy instance, can be used to expose s3 bucket to the public

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/s3proxy)

## About

This S3Proxy template allows you to proxy S3 traffic.

Super easy, just fill the required env vars with the S3 backend you want to connect to, expose this proxy to the public, and you're good to go.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| S3Proxy | `andrewgaul/s3proxy` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `JCLOUDS_ENDPOINT` | - | The S3 Endpoint |
| `JCLOUDS_IDENTITY` | - | Access Key ID |
| `JCLOUDS_PROVIDER` | s3 | The S3Proxy provider, default to S3. |
| `S3PROXY_IDENTITY` | - | Client access key id |
| `JCLOUDS_CREDENTIAL` | (secret) | Secret Access Key |
| `S3PROXY_CREDENTIAL` | (secret) | Client secret access key |
| `S3PROXY_AUTHORIZATION` | aws-v2-or-v4 | S3 Client auth method |
| `S3PROXY_CORS_ALLOW_ALL` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/template/s3proxy)
