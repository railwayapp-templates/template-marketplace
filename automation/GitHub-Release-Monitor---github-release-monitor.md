# Deploy GitHub Release Monitor on Railway

Automatically monitor GitHub repository releases and receive notifications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/github-release-monitor)

## About

**GitHub Release Monitor** is a powerful, self-hostable application that automatically monitors GitHub repository releases and sends instant email notifications. Keep track of your favorite projects without manually checking for updates.

### Deployment Steps

1.  Import the template, filling out the `AUTH_USERNAME` and `AUTH_PASSWORD` fields. You’ll use these to sign in to the application. All other variables are automatically generated.
2.  Once the deployment is ready, click on the deployment and the pre-generated `.railway.app` domain to view the instance.
3.  Sign in with the credentials you set up earlier

If you wish to use a custom domain, you simply need to click on the deployment, go to Settings → Networking and click on the **\+ Custom Domain** button. Enter your domain and select or enter port `8080`.

### Post-Deployment Steps

The following actions are **optional**, but **strongly recommended** by the maintainer:

- **Create a GitHub Personal Access Token**
    - To avoid being rate-limited, it is highly recommended to create a [Personal Access Token](https://github.com/settings/personal-access-tokens) with **no scopes** (public repository access is sufficient and more secure).
    - Once you have the token, click on the deployment in Railway → Variables, then paste it in to the `GITHUB_ACCESS_TOKEN` field.
- **Email (SMTP) Configuration**
    - If you wish to receive email updates, you can provide SMTP details. As Railway blocks outbound SMTP, you would need to use a third-party SMTP provider (e.g., Resend) if you wish to use this feature.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GitHub Release Monitor | `ghcr.io/iamspido/github-release-monitor:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | - | The timezone for the container (e.g., `Europe/Berlin`). Affects log timestamps and date formatting |
| `MAIL_HOST` | - | The hostname or IP address of your SMTP server |
| `MAIL_PORT` | 25 | The port for your SMTP server (e.g., 587 or 465) |
| `AUTH_SECRET` | (secret) | A secret key (at least 32 characters) for encrypting user sessions |
| `AUTH_PASSWORD` | (secret) | The password for logging into the application |
| `AUTH_USERNAME` | (secret) | The username for logging into the application |
| `MAIL_PASSWORD` | (secret) | The password or app token for SMTP authentication |
| `MAIL_USERNAME` | (secret) | The username for SMTP authentication |
| `MAIL_FROM_NAME` | - | The display name for the "from" address |
| `MAIL_TO_ADDRESS` | - | The email address that will receive the notifications |
| `MAIL_FROM_ADDRESS` | - | The email address that notifications will be sent from |
| `GITHUB_ACCESS_TOKEN` | (secret) | A GitHub personal access token is not required, but strongly recommended to increase the API rate limit from 60 to 5000 requests per hour. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/github-release-monitor)
