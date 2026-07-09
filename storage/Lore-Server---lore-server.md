# Deploy Lore Server on Railway

Epic Games' Lore version control server, backed by a Railway bucket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lore-server)

## About

[Lore](https://github.com/EpicGames/lore) is Epic Games' open source version control
system, built for projects that mix source code with heavy binary assets. It stores
everything in a content-addressed Merkle tree, hydrates file content on demand, and
keeps branch switching fast even when the repository holds gigabytes of textures,
models, and audio.

This template runs `loreserver`, the central server your team pushes to and clones
from, using Epic's latest official Linux release binary (resolved at build time and
verified against GitHub's published sha256). It deploys in about a minute.

The template deploys three pieces:

- **lore-server**: the Lore server itself
- **lore-store**: a Railway bucket holding your repository content. Bucket storage
  is $0.015 per GB-month with free egress, and you never resize it.
- **dynamodb**: a DynamoDB-compatible metadata store (fragment, branch, and lock
  records) with a volume for persistence

This is the same storage split Epic uses in their own AWS setup: payloads in S3,
metadata in DynamoDB. The metadata store is `amazon/dynamodb-local`, which is fine
for a small team on a single node; point the server at real AWS DynamoDB later if
you outgrow it.

### Connect a client

Install the Lore CLI ([instructions](https://epicgames.github.io/lore/how-to/install-lore-cli/)):

```sh
curl -fsSL https://raw.githubusercontent.com/EpicGames/lore/main/scripts/install.sh | bash
```

Find your server's TCP proxy address in the service's Settings tab under Networking.
It looks like `mainline.proxy.rlwy.net:12345`. Then create your first repository:

```sh
mkdir my-project && cd my-project
lore repository create grpc://mainline.proxy.rlwy.net:12345/my-project
```

Commit and push:

```sh
lore stage --scan .
lore commit "First commit"
lore push
```

Teammates clone the same URL:

```sh
lore clone grpc://mainline.proxy.rlwy.net:12345/my-project
```

### Use grpc:// URLs, not lore://

Lore's default `lore://` scheme transfers file content over QUIC, which runs on UDP.
Railway's proxy routes TCP only, so QUIC packets never arrive. With a `grpc://` URL the
client sends everything over gRPC on the TCP proxy instead. Same features, one caveat:
traffic to the proxy is not TLS-encrypted. There is a
[Central Station thread](https://station.railway.com/feedback/allow-outbound-udp-traffic-0f74101c)
discussing UDP support on Railway; if it ships, `lore://` should work here too.

### Before you invite the team

- Authentication is off by default. Anyone with your proxy address can read and write
  every repository on the server. To require signed JWTs, set
  `LORE__SERVER__AUTH__JWT_ISSUER` and `LORE__SERVER__AUTH__JWK__ENDPOINT` to your
  identity provider's issuer and JWKS URL. The
  [server config reference](https://epicgames.github.io/lore/reference/lore-server-config/)
  covers the details.
- Lore is pre-1.0 and under active development. Epic ships new releases often; each
  build fetches the newest one, so redeploying updates the server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dynamodb | `amazon/dynamodb-local:latest` | Database |
| lore-server | [snowfall-games/lore-railway](https://github.com/snowfall-games/lore-railway) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 41339 | Port Railway's health check probes. Leave as 41339, the Lore HTTP endpoint. |
| `AWS_REGION` | - | Bucket region for the AWS SDK, wired from the lore-store bucket by reference. |
| `AWS_ACCESS_KEY_ID` | - | Access key for the lore-store bucket, wired by reference. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Secret key for the lore-store bucket, wired by reference. |
| `LORE__PLUGINS__AWS__S3_BUCKET` | - | Bucket that stores Lore's fragment payloads, wired by reference. |
| `LORE__PLUGINS__AWS__S3_REGION` | - | Region of the fragment payload bucket, wired by reference. |
| `LORE__PLUGINS__AWS__S3_ENDPOINT_URL` | - | S3 endpoint of the fragment payload bucket, wired by reference. |
| `LORE__PLUGINS__AWS__DYNAMODB_ENDPOINT_URL` | - | Private address of the dynamodb service that holds Lore's metadata tables. |

## Configuration

- **Start command:** `java -jar DynamoDBLocal.jar -sharedDb -dbPath /data`
- **Volume:** `/data`
- **Healthcheck:** `/health_check`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 41337

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/lore-server)
