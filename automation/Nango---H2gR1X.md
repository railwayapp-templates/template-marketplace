# Deploy Nango on Railway

The complete platform for product integrations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/H2gR1X)

## About

✨ Nango is the open-source integration platform designed to simplify connecting to third-party APIs. It manages complex authentication flows like OAuth, API keys, and token refreshes out-of-the-box. With Nango, you can securely store credentials, standardize API integrations, and eliminate the hassle of managing authentication logic manually. Focus on building product features while Nango handles the heavy lifting of API connections, credential storage, and token lifecycle management—all directly from your codebase.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nango | `nangohq/nango-server:hosted-0.58.7` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SMTP_URL` | - | The url of your SMTP server (ex: `smtps://username:password@my-stmp-server.com:465`) |
| `SMTP_FROM` | - | The email address used to send emails |
| `SERVER_PORT` | 3003 | - |
| `NANGO_SERVER_URL` | - | The public URL of the ALB (e.g., `http://ALB.DNS`). |
| `NANGO_LOGS_ES_PWD` | - | Your Elasticsearch password. |
| `NANGO_LOGS_ES_URL` | - | Elasticsearch endpoint URL, required if `NANGO_LOGS_ENABLED=true`. ex:`https://my.elastic.cluster:9500`. |
| `NANGO_DATABASE_URL` | - | The database connection URL from RDS (use dynamic reference or Secrets Manager). Format: `postgresql://<user>:<password>@<host>:<port>/<db_name>`. |
| `NANGO_LOGS_ENABLED` | false | `true` (Set to `'false'` to disable Nango logs). |
| `NANGO_LOGS_ES_USER` | (secret) | Your Elasticsearch username. |
| `NANGO_ENCRYPTION_KEY` | - | Reference the value secret created earlier. |
| `FLAG_SERVE_CONNECT_UI` | false | Set to "true" to enable the Connect UI (default: true) |
| `NANGO_PUBLIC_SERVER_URL` | - | Same as `NANGO_SERVER_URL`. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/H2gR1X)
