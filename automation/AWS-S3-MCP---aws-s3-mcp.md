# Deploy AWS S3 MCP on Railway

Deploy and AWS S3 MCP with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aws-s3-mcp)

## About

AWS S3 MCP is a Model Context Protocol server that exposes S3 buckets to LLM clients as tools — `list-buckets`, `list-objects`, and `get-object`. This template deploys the MCP server behind an nginx bearer-token auth gateway, so an LLM can safely read objects from a publicly reachable endpoint.

The upstream project has no built-in authentication, so this template places an nginx service in front that validates every request against a comma-separated list of bearer tokens before proxying to the MCP over Railway's private network. The MCP can be pointed at any S3-compatible storage — AWS S3, a Railway bucket, MinIO, Cloudflare R2, or Backblaze B2.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AWS S3 MCP Gateway | [FournyP/aws-s3-mcp-railway-template](https://github.com/FournyP/aws-s3-mcp-railway-template) (root: /gateway) | Web service |
| AWS S3 MCP | [FournyP/aws-s3-mcp-railway-template](https://github.com/FournyP/aws-s3-mcp-railway-template) (root: /mcp) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | AWS S3 MCP Gateway | 80 | PORT of the Gateway |
| `API_KEYS` | AWS S3 MCP Gateway | (secret) | Comma-separated list of bearer tokens allowed to call the MCP. |
| `MCP_HOST` | AWS S3 MCP Gateway | - | Hostname of the MCP service on Railway's private network. Defaults to mcp.railway.internal. Only override if you rename the MCP service — then set it to <new-name>.railway.internal. |
| `MCP_PORT` | AWS S3 MCP Gateway | - | Port the MCP service listens on. Defaults to 3000, which matches the MCP service's fixed PORT. Don't change unless you also change PORT on the MCP service. |
| `PORT` | AWS S3 MCP | 3000 | Port the MCP HTTP server binds to inside the container. Fixed at 3000 to match what the gateway proxies to. Shoul match 'MCP_PORT' on the gateway. |
| `AWS_REGION` | AWS S3 MCP | - | Region of the target buckets. For Railway's built-in bucket, reference the bucket's AWS_DEFAULT_REGION (auto). For real AWS, use us-east-1/eu-west-3/etc. |
| `S3_BUCKETS` | AWS S3 MCP | - | Comma-separated allowlist of bucket names the MCP is permitted to touch. For Railway's built-in bucket, reference the bucket's AWS_S3_BUCKET_NAME. If empty, no buckets are exposed. |
| `AWS_ENDPOINT` | AWS S3 MCP | - | S3 endpoint URL. For Railway's built-in bucket, reference the bucket's AWS_ENDPOINT_URL. For real AWS, leave empty. For other S3-compatible services (MinIO, R2, B2), set the provider's endpoint URL. |
| `S3_MAX_BUCKETS` | AWS S3 MCP | - | Maximum number of buckets the list-buckets tool will return. Defaults to 5. Raise if you need the LLM to see more. |
| `AWS_ACCESS_KEY_ID` | AWS S3 MCP | - | Access key for your S3-compatible storage. For Railway's built-in bucket, reference the bucket's 'AWS_ACCESS_KEY_ID'. |
| `AWS_SECRET_ACCESS_KEY` | AWS S3 MCP | (secret) | Secret for your S3-compatible storage. For Railway's built-in bucket, reference the bucket's AWS_SECRET_ACCESS_KEY. For real AWS, use an IAM user scoped to read-only on the target buckets. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/aws-s3-mcp)
