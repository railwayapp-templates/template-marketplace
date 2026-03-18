# Deploy 1Password Connect API and Server on Railway

Deploy and Host 1Password Connect API and Server with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/1password-connect-api-and-server)

## About

When you use 1Password Connect server as part of a Secrets Automation workflow, you can securely access your 1Password items and vaults in your company's apps and cloud infrastructure using a private REST API.

Connect servers work well for when you need unlimited requests and self-hosted infrastructure. 1Password also maintains several SDK libraries for the Connect API so you can integrate with your existing applications.

To get started, follow the documentation on 1Password's website to set up a Connect Server. https://developer.1password.com/docs/connect/get-started

You will need:
- a Connect Server on your 1Password Account
- a `1password-credentials.json` from that Connect Server
- Base64 encode your `1password-credentials.json` and provide it to the required `OP_SESSION` variable

Here's how to Base64 encode your json file:

```
cat 1password-credentials.json | base64 | tr '/+' '_-' | tr -d '=' | tr -d '\n'
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 1password-railway | [echohack/1password-railway](https://github.com/echohack/1password-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OP_SESSION` | - | The value of the Base64-encoded content of the 1password-credentials.json file. Required |
| `OP_LOG_LEVEL` | info | The logging level of the container.  Acceptable values: info, error, debug Default value: info |
| `OP_SYNC_TIMEOUT` | 10s | The time (in seconds) to wait for the initial sync to complete.  Acceptable values: A time duration (for example, 1h, 30m, 20s). Default value: 10s (10 seconds) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/opuser/.op/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/1password-connect-api-and-server)
