# Deploy ente on Railway

The API server for ente photos & auth (2fa). 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/O5gHP2)

## About

![](https://github.com/ente-io/ente/raw/74377a93d8e20e969d9a2531f32f577b5f0ef090/.github/assets/ente-rocketship.png)

## Overview

Ente is a fully open-source, end-to-end encrypted platform designed for storing data in the cloud without requiring trust in the service provider. Built on this platform are two apps: Ente Photos (an alternative to Apple and Google Photos) and Ente Auth (a 2FA alternative to the deprecated Authy).

Learn more at [ente.io](https://ente.io).

## Configuration

### Environment Variables

#### S3 Storage

Configure the S3 variables `S3_ACCESS_KEY_ID`, `S3_ACCESS_KEY_SECRET`, `S3_ENDPOINT`, `S3_BUCKET`, and `S3_REGION` if you want to use Ente Photos. Leave these variables empty if you're only planning to use Ente Auth.

#### Cryptographic Keys

For a quick start, you can leave the `ENTE_KEY_ENCRYPTION`, `ENTE_KEY_HASH`, and `ENTE_KEY_JWT` variables empty, although it's recommended to generate new keys. See details [here](https://github.com/ente-io/ente/tree/74377a93d8e20e969d9a2531f32f577b5f0ef090/server/tools/gen-random-keys).

#### Verification Code

Creating an account typically requires confirming it with a verification code sent via email. To complete the verification, you have two options: either set values for the optional variables `ENTE_INTERNAL_HARDCODED-OTT_LOCAL-DOMAIN-SUFFIX` and `ENTE_INTERNAL_HARDCODED-OTT_LOCAL-DOMAIN-VALUE`, or retrieve the code from the deployment logs.

### Client App

Once the server is deployed, Railway will automatically generate a public URL listening on port 8080. The URL will look like "https://your-project.up.railway.app". To connect the client app to your server, tap 7 times on the onboarding screen to bring up a page where you can configure this URL as your endpoint. For more details, see [here](https://help.ente.io/self-hosting/guides/custom-server/).

Create an account and use the verification code as described above.

## Increase Storage Quota

By default, the storage quota is set to 5GB. To increase it to 1TB, go to the Postgres service and view the database under "Data". Navigate to the "users" table, select the user you want to update, and change the following fields:

- `bonus_id`: `self-hosted-myself`
- `storage`: `1099511627776`
- `type`: `ADD_ON_SUPPORT`
- `valid_till`: `0`

---

### Shared Albums

You can enable shared folders with a self-hosted instance. However, for simplicity, this template doesn't include that configuration. For more details, see [here](https://help.ente.io/self-hosting/faq/sharing).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| museum | `ghcr.io/ente-io/server` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | museum | 8080 | - |
| `ENDPOINT` | museum | - | The endpoint of the museum server. Use this link to connect to your instance. |
| `S3_BUCKET` | museum | - | The name of your bucket. Leave empty, if you're only going to use ente auth. |
| `S3_REGION` | museum | - | Your S3 region. Leave empty, if you're only going to use ente auth. |
| `S3_ENDPOINT` | museum | - | Your S3 enpoint. Leave empty, if you're only going to use ente auth. |
| `ENTE_DB_USER` | museum | (secret) | - |
| `ENTE_KEY_JWT` | museum | - | Can be left empty for quick start. To generate a key see https://github.com/ente-io/ente/tree/74377a93d8e20e969d9a2531f32f577b5f0ef090/server/tools/gen-random-keys |
| `ENTE_KEY_HASH` | museum | - | Can be left empty for quick start. To generate a key see https://github.com/ente-io/ente/tree/74377a93d8e20e969d9a2531f32f577b5f0ef090/server/tools/gen-random-keys |
| `ENTE_DB_PASSWORD` | museum | (secret) | - |
| `S3_ACCESS_KEY_ID` | museum | - | Your S3 access key id. Leave empty, if you're only going to use ente auth. |
| `ENTE_KEY_ENCRYPTION` | museum | - | Can be left empty for quick start. To generate a key see https://github.com/ente-io/ente/tree/74377a93d8e20e969d9a2531f32f577b5f0ef090/server/tools/gen-random-keys |
| `S3_ACCESS_KEY_SECRET` | museum | (secret) | Your S3 access key secret. Leave empty, if you're only going to use ente auth. |
| `ENTE_S3_B2_EU_CEN_SECRET` | museum | (secret) | - |
| `ENTE_S3_ARE_LOCAL_BUCKETS` | museum | false | - |
| `ENTE_INTERNAL_HARDCODED-OTT_LOCAL-DOMAIN-VALUE` | museum | - | A six-digit hardcoded OTTs code, to complete the email verification at account creation, e.g. "123456". If left empty the code will be printed in the deploy logs. |
| `ENTE_INTERNAL_HARDCODED-OTT_LOCAL-DOMAIN-SUFFIX` | museum | - | Email domain to use the hardcoded OTP code with. E.g. "@gmail.com" |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/template/O5gHP2)
