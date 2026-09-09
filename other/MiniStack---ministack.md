# Deploy MiniStack on Railway

A free AWS emulator with 60+ services for development and testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ministack)

## About

MiniStack is a lightweight AWS service emulator designed for development, testing, CI/CD, and integration workflows without requiring access to real AWS infrastructure.

This deployment includes MiniStack together with Redis for features that depend on an external Redis service, while keeping the core AWS-compatible APIs accessible through a single gateway.

This deployment runs MiniStack and Redis as separate Railway services.

MiniStack exposes a unified AWS-compatible gateway on port `4566`, allowing applications, AWS SDKs, CLI tools, Terraform, CDK, Pulumi, and test frameworks to interact with supported AWS services through one endpoint.

Redis is connected through Railway private networking and is used by MiniStack features that rely on an external Redis instance.

A Railway Volume can be mounted to MiniStack to retain supported persistent emulator data such as S3 state.

No real AWS account or production AWS credentials are required for standard emulator usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ministack | `ministackorg/ministack:latest` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ministack | 4566 | Railway HTTP target port |
| `LOG_LEVEL` | ministack | INFO | MiniStack log verbosity |
| `REDIS_HOST` | ministack | - | Redis private hostname |
| `REDIS_PORT` | ministack | - | Redis service port |
| `S3_PERSIST` | ministack | 1 | Persist S3 data on the mounted volume |
| `GATEWAY_PORT` | ministack | - | MiniStack unified AWS gateway port |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/tmp/ministack-data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ministack)
