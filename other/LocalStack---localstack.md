# Deploy LocalStack on Railway

AWS, but local in the cloud

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/localstack)

## About

**LocalStack** is a local AWS cloud emulator that lets you run AWS services such as S3, SQS, DynamoDB, Lambda, and more **without using real AWS accounts**. It’s ideal for development, testing, CI pipelines, and preview environments where speed, isolation, and cost control matter.

---

Hosting LocalStack means running a fully self-contained AWS-like environment that exposes AWS-compatible APIs over HTTP. Instead of provisioning real cloud resources, your applications interact with mocked services that behave like AWS, but run entirely within a container.

When deployed on **Railway**, LocalStack becomes a shared, always-available backend for CI pipelines, preview environments, and team development. Railway handles container orchestration, networking, and scaling, while LocalStack provides fast, deterministic AWS service emulation with no credentials or cloud costs.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| localstack/localstack | `localstack/localstack` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | 0 | Persistence |
| `LS_LOG` | info | - |
| `USE_SSL` | 0 | - |
| `DATA_DIR` | /local/data | Lambda execution |
| `HOSTNAME` | ${RAILWAY_PRIVATE_DOMAIN} | Initialization hooks |
| `SERVICES` | s3,sqs,sns,dynamodb,lambda,ssm,cloudwatch | - |
| `EDGE_PORT` | 4566 | - |
| `DOCKER_HOST` | unix:///var/run/docker.sock | - |
| `DOCKER_SOCK` | /var/run/docker.sock | Networking |
| `PERSISTENCE` | 0 | - |
| `DISABLE_EVENTS` | 0 | Logging & diagnostics |
| `LAMBDA_TIMEOUT` | 900 | Docker integration (required for Lambda) |
| `LAMBDA_EXECUTOR` | docker | - |
| `INIT_SCRIPTS_PATH` | /etc/localstack/init | Limits & behavior |
| `AWS_DEFAULT_REGION` | us-east-1 | - |
| `LAMBDA_REMOTE_DOCKER` | false | - |
| `LAMBDA_DOCKER_NETWORK` | bridge | - |
| `SKIP_SSL_CERT_DOWNLOAD` | 1 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/localstack)
