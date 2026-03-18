# Deploy Zenko CloudServer on Railway

A Zenko CloudServer S3 file storage instance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/7JpuFX)

## About

![zenko](https://github.com/scality/cloudserver/blob/development/9.0/res/scality-cloudserver-logo.png?raw=true$0)

# Zenko CloudServer
An open-source Amazon S3-compatible object storage server.

CloudServer is useful for Developers, either to run as part of a continous integration test environment to emulate the AWS S3 service locally or as an abstraction layer to develop object storage enabled application on the go.

**Note:** This template does not provide a default bucket. You will be required to create one manually.

## Variables
`SCALITY_ACCESS_KEY_ID` - The username or access key to be used for authentication.
`SCALITY_SECRET_ACCESS_KEY` - The secret key to be used for authentication.

## Example Bucket Creation Script
The following is an example of how you would create a bucket using Python.
```python
import boto3

s3 = boto3.client(
    's3',
    endpoint_url='',
    aws_access_key_id='',
    aws_secret_access_key=''
)

s3.create_bucket(Bucket='mybucket')
```

For additional configuration, view the variables available for Zenko CloudServer on their [official documentation](https://s3-server.readthedocs.io/en/latest/DOCKER.html#environment-variables).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Zenko CloudServer | `zenko/cloudserver:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | - |
| `S3BACKEND` | file | - |
| `S3DATAPATH` | /mnt/data/localData | - |
| `S3METADATAPATH` | /mnt/data/localMetadata | - |
| `SCALITY_ACCESS_KEY_ID` | - | Username or access key to be used for authentication |
| `HEALTHCHECKS_ALLOWFROM` | 0.0.0.0/0 | - |
| `REMOTE_MANAGEMENT_DISABLE` | 1 | - |
| `SCALITY_SECRET_ACCESS_KEY` | (secret) | Secret key to be used for authentication |

## Configuration

- **Start command:** `/bin/bash -c "mkdir -p /mnt/data/localData && mkdir -p /mnt/data/localMetadata && exec ./docker-entrypoint.sh yarn start"`
- **Healthcheck:** `/_/healthcheck/deep`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/7JpuFX)
