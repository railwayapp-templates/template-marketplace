# Deploy Whatomate on Railway

Comprehensive WhatsApp Solution for Organizations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatomate)

## About

Lightning-fast standalone WhatsApp Business API. Built with Go for performance, Vue.js for a modern UI. Single binary — works with any tech stack.

More info at: https://whatomate.io/

Deploys the server + 3 workers using best practices for scalability by using postgres, redis and s3 bucket.
You can increase the number of workers by scaling the worker component!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | `shridh0r/whatomate:latest` | Web service |
| workers | `shridh0r/whatomate:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `WHATOMATE_ENV` | server | production | it can be either development or production (recommended) |
| `WHATOMATE_JWT_SECRET` | server | (secret) | Secret for encrypting. Same value should be used for the workers |
| `WHATOMATE_STORAGE_TYPE` | server | s3 | - |
| `WHATOMATE_DATABASE_USER` | server | (secret) | - |
| `WHATOMATE_REDIS_PASSWORD` | server | (secret) | - |
| `WHATOMATE_DATABASE_PASSWORD` | server | (secret) | - |
| `WHATOMATE_STORAGE_S3_SECRET` | server | (secret) | - |
| `WHATOMATE_ENV` | workers | production | it can be either development or production (recommended) |
| `WHATOMATE_JWT_SECRET` | workers | (secret) | Secret for encrypting. This value should be the same as the server jwt secret |
| `WHATOMATE_STORAGE_TYPE` | workers | s3 | - |
| `WHATOMATE_DATABASE_USER` | workers | (secret) | - |
| `WHATOMATE_REDIS_PASSWORD` | workers | (secret) | - |
| `WHATOMATE_DATABASE_PASSWORD` | workers | (secret) | - |
| `WHATOMATE_STORAGE_S3_SECRET` | workers | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Start command:** `sh -c '(echo "IyBXaGF0b21hdGUgQ29uZmlndXJhdGlvbgojIENvcHkgdGhpcyB0byBjb25maWcudG9tbCBhbmQgdXBkYXRlIHZhbHVlcwojCiMgRm9yIERvY2tlcjogdXNlICJkYiIgYW5kICJyZWRpcyIgYXMgaG9zdG5hbWVzCiMgRm9yIGxvY2FsIGRldjogdXNlICJsb2NhbGhvc3QiCgpbYXBwXQpuYW1lID0gIldoYXRvbWF0ZSIKZW52aXJvbm1lbnQgPSAiZGV2ZWxvcG1lbnQiICAjIGRldmVsb3BtZW50LCBzdGFnaW5nLCBwcm9kdWN0aW9uCmRlYnVnID0gdHJ1ZQoKW3NlcnZlcl0KaG9zdCA9ICIwLjAuMC4wIgpwb3J0ID0gODA4MApyZWFkX3RpbWVvdXQgPSAzMAp3cml0ZV90aW1lb3V0ID0gMzAKYmFzZV9wYXRoID0gIiIgICMgU2V0IHRvICIvc3VicGF0aCIgaWYgYmVoaW5kIG5naW54IHByb3h5IHBhc3MKCltkYXRhYmFzZV0KaG9zdCA9ICJkYiIgICMgVXNlICJsb2NhbGhvc3QiIGZvciBsb2NhbCBkZXZlbG9wbWVudApwb3J0ID0gNTQzMgp1c2VyID0gIndoYXRvbWF0ZSIKcGFzc3dvcmQgPSAid2hhdG9tYXRlIgpuYW1lID0gIndoYXRvbWF0ZSIKc3NsX21vZGUgPSAiZGlzYWJsZSIKbWF4X29wZW5fY29ubnMgPSAyNQptYXhfaWRsZV9jb25ucyA9IDUKY29ubl9tYXhfbGlmZXRpbWUgPSAzMDAKCltyZWRpc10KaG9zdCA9ICJyZWRpcyIgICMgVXNlICJsb2NhbGhvc3QiIGZvciBsb2NhbCBkZXZlbG9wbWVudApwb3J0ID0gNjM3OQpwYXNzd29yZCA9ICIiCmRiID0gMAoKW2p3dF0Kc2VjcmV0ID0gInlvdXItc3VwZXItc2VjcmV0LWp3dC1rZXktY2hhbmdlLWluLXByb2R1Y3Rpb24iCmFjY2Vzc19leHBpcnlfbWlucyA9IDE1CnJlZnJlc2hfZXhwaXJ5X2RheXMgPSA3Cgpbc3RvcmFnZV0KdHlwZSA9ICJsb2NhbCIgICMgbG9jYWwsIHMzCmxvY2FsX3BhdGggPSAiLi91cGxvYWRzIgpzM19idWNrZXQgPSAiIgpzM19yZWdpb24gPSAiIgpzM19rZXkgPSAiIgpzM19zZWNyZXQgPSAiIgoK" | base64 -d > /app/config.toml) && ./whatomate server -config /app/config.toml -migrate -workers=0'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c '(echo "IyBXaGF0b21hdGUgQ29uZmlndXJhdGlvbgojIENvcHkgdGhpcyB0byBjb25maWcudG9tbCBhbmQgdXBkYXRlIHZhbHVlcwojCiMgRm9yIERvY2tlcjogdXNlICJkYiIgYW5kICJyZWRpcyIgYXMgaG9zdG5hbWVzCiMgRm9yIGxvY2FsIGRldjogdXNlICJsb2NhbGhvc3QiCgpbYXBwXQpuYW1lID0gIldoYXRvbWF0ZSIKZW52aXJvbm1lbnQgPSAiZGV2ZWxvcG1lbnQiICAjIGRldmVsb3BtZW50LCBzdGFnaW5nLCBwcm9kdWN0aW9uCmRlYnVnID0gdHJ1ZQoKW3NlcnZlcl0KaG9zdCA9ICIwLjAuMC4wIgpwb3J0ID0gODA4MApyZWFkX3RpbWVvdXQgPSAzMAp3cml0ZV90aW1lb3V0ID0gMzAKYmFzZV9wYXRoID0gIiIgICMgU2V0IHRvICIvc3VicGF0aCIgaWYgYmVoaW5kIG5naW54IHByb3h5IHBhc3MKCltkYXRhYmFzZV0KaG9zdCA9ICJkYiIgICMgVXNlICJsb2NhbGhvc3QiIGZvciBsb2NhbCBkZXZlbG9wbWVudApwb3J0ID0gNTQzMgp1c2VyID0gIndoYXRvbWF0ZSIKcGFzc3dvcmQgPSAid2hhdG9tYXRlIgpuYW1lID0gIndoYXRvbWF0ZSIKc3NsX21vZGUgPSAiZGlzYWJsZSIKbWF4X29wZW5fY29ubnMgPSAyNQptYXhfaWRsZV9jb25ucyA9IDUKY29ubl9tYXhfbGlmZXRpbWUgPSAzMDAKCltyZWRpc10KaG9zdCA9ICJyZWRpcyIgICMgVXNlICJsb2NhbGhvc3QiIGZvciBsb2NhbCBkZXZlbG9wbWVudApwb3J0ID0gNjM3OQpwYXNzd29yZCA9ICIiCmRiID0gMAoKW2p3dF0Kc2VjcmV0ID0gInlvdXItc3VwZXItc2VjcmV0LWp3dC1rZXktY2hhbmdlLWluLXByb2R1Y3Rpb24iCmFjY2Vzc19leHBpcnlfbWlucyA9IDE1CnJlZnJlc2hfZXhwaXJ5X2RheXMgPSA3Cgpbc3RvcmFnZV0KdHlwZSA9ICJsb2NhbCIgICMgbG9jYWwsIHMzCmxvY2FsX3BhdGggPSAiLi91cGxvYWRzIgpzM19idWNrZXQgPSAiIgpzM19yZWdpb24gPSAiIgpzM19rZXkgPSAiIgpzM19zZWNyZXQgPSAiIgoK" | base64 -d > /app/config.toml) && ./whatomate worker -config /app/config.toml -workers=3'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/whatomate)
