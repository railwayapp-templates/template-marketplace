# Deploy Floci on Railway

Floci 2.1 AWS emulator for S3, SQS, DynamoDB and more, with a gateway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/floci-1)

## About

Floci is a free, open-source AWS emulator. It serves S3, SQS, SNS, DynamoDB, Secrets Manager, SSM, IAM, API Gateway, Kinesis and many other AWS APIs on one endpoint, so AWS SDKs, the AWS CLI, Terraform, CDK and test suites run against it without an AWS account or paid feature gates.

This template deploys Floci 2.1.0 with persistent storage on a Railway volume, so buckets, queues and tables survive redeploys. Floci itself stays on the private network, where services in your project reach it directly. A small Caddy gateway exposes it publicly and only forwards signed requests whose access key ID matches a generated key, because Floci does not check signatures. Point CI jobs, preview environments or your laptop at the gateway. Services that need a Docker daemon, such as Lambda, RDS or ECS, are not available on Railway. It fits the Hobby plan. Clients use any secret access key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `caddy:2.11.4-alpine` | Web service |
| floci | `floci/floci:2.1.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | gateway | 8080 |
| `CADDYFILE` | gateway | {
	admin off
	auto_https off
}

:{$PORT} {
	handle /gateway_health {
		respond ok 200
	}

	# SigV4 requests whose access key ID is the generated gateway key.
	# Presigned URLs carry the key in the query string, so they are refused here.
	@signed {
		header_regexp Authorization `Credential={$FLOCI_ACCESS_KEY_ID}/`
		not query X-Amz-Credential=*
	}
	handle @signed {
		request_body {
			max_size {$FLOCI_MAX_UPLOAD}
		}
		reverse_proxy {$FLOCI_UPSTREAM} {
			header_up Host {upstream_hostport}
			flush_interval -1
		}
	}

	handle {
		header Content-Type application/xml
		respond `<Error><Code>AccessDenied</Code><Message>Sign requests with the gateway access key ID</Message></Error>` 403
	}
} |
| `FLOCI_MAX_UPLOAD` | gateway | 512MB |
| `PORT` | floci | 4566 |
| `FLOCI_STORAGE_MODE` | floci | persistent |
| `FLOCI_DEFAULT_REGION` | floci | us-east-1 |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/gateway_health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/usr/local/bin/docker-entrypoint.sh /app/application -Dquarkus.http.host=::`
- **Healthcheck:** `/_floci/health`
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/floci-1)
