# Deploy controlr on Railway

Open-source, self-hostable remote control and remote access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/controlr)

## About

ControlR is an open-source, self-hostable remote control and remote access solution.  It has cross-platform support for Windows, Mac, and Linux, allowing you to manage, troubleshoot, and control your devices remotely.

The template includes sane defaults for most configuration values.  You only need to set an authentication token for the metrics container to get started.

The first account you create will be the server and tenant admin.  Afterward, self-registration is disabled, and nobody else can join the server unless you explicitly invite them.

Note that account emails are disabled by default (forgot password, new account confirmation, etc.) since SMTP requires a Pro Railway subscription.

For more information, see the GitHub repo: https://github.com/bitbound/controlr

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| controlr | `bitbound/controlr` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| aspire-dashboard | `mcr.microsoft.com/dotnet/aspire-dashboard:9.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ASPNETCORE_HTTP_PORTS` | controlr | 8080 | - |
| `ASPNETCORE_ENVIRONMENT` | controlr | Production | - |
| `ControlR_POSTGRES_USER` | controlr | (secret) | - |
| `ControlR_OTLP_ENDPOINT_URL` | controlr | http://aspire-dashboard:18889 | - |
| `ControlR_POSTGRES_PASSWORD` | controlr | (secret) | - |
| `ControlR_AppOptions__SmtpHost` | controlr | - | SMTP settings are used to send account confirmation and password reset emails. |
| `ControlR_AppOptions__SmtpPort` | controlr | 587 | SMTP settings are used to send account confirmation and password reset emails. |
| `ControlR_AppOptions__SmtpEmail` | controlr | - | SMTP settings are used to send account confirmation and password reset emails. |
| `ControlR_AspireDashboard__Token` | controlr | (secret) | The access token for the Aspire Dashboard, where server logs and telemetry can be viewed.  |
| `ControlR_AppOptions__SmtpPassword` | controlr | (secret) | SMTP settings are used to send account confirmation and password reset emails. |
| `ControlR_AppOptions__SmtpUserName` | controlr | (secret) | SMTP settings are used to send account confirmation and password reset emails. |
| `ControlR_AppOptions__UseHttpLogging` | controlr | false | For debugging.  When enabled, logs will be written for all HTTP requests and responses. |
| `ControlR_Logging__LogLevel__Default` | controlr | Information | - |
| `ControlR_AppOptions__SmtpDisplayName` | controlr | - | SMTP settings are used to send account confirmation and password reset emails. |
| `ControlR_AppOptions__SmtpLocalDomain` | controlr | - | SMTP settings are used to send account confirmation and password reset emails. |
| `ControlR_AspireDashboard__PublicWebUrl` | controlr | - | The public URL for the Aspire Dashboard's web interface. |
| `ControlR_AppOptions__EnableNetworkTrust` | controlr | true | Bypasses KnownProxies/KnownIpNetworks checks and trusts all forwarded headers from Railway's proxy servers. |
| `ControlR_AppOptions__GitHubClientSecret` | controlr | (secret) | - |
| `ControlR_AzureMonitor__ConnectionString` | controlr | - | If supplied, server metrics will be sent to the Azure Application Insights resource. |
| `ControlR_Serilog__MinimumLevel__Default` | controlr | Information | - |
| `ControlR_AppOptions__DisableEmailSending` | controlr | true | Whether to disable system emails for account creation, password reset, etc.  Note that SMTP ports are blocked on Free and Hobby accounts on Railway. |
| `ControlR_AppOptions__MaxFileTransferSize` | controlr | 104857600 | The maximum file size (in bytes) allowed for the remote file system feature.  Set to -1 for unlimited. |
| `ControlR_AppOptions__PersistPasskeyLogin` | controlr | (secret) | If enabled, signing in with a passkey will effectively add the "remember me" option. |
| `ControlR_AppOptions__MicrosoftClientSecret` | controlr | (secret) | - |
| `ControlR_AppOptions__AuthenticatorIssuerName` | controlr | ControlR | - |
| `ControlR_AppOptions__EnablePublicRegistration` | controlr | false | - |
| `ControlR_AppOptions__EnableCloudflareProxySupport` | controlr | true | - |
| `ControlR_AppOptions__RequireUserEmailConfirmation` | controlr | false | Whether users must confirm their email before they can sign in.  Requires working SMTP settings. |
| `ControlR_AppOptions__SmtpCheckCertificateRevocation` | controlr | true | SMTP settings are used to send account confirmation and password reset emails. |
| `ControlR_Logging__LogLevel__Microsoft.AspNetCore.HttpLogging` | controlr | Information | The log level to use for HttpLogging (when it's enabled). |
| `ControlR_Logging__LogLevel__Microsoft.AspNetCore.HttpOverrides` | controlr | Debug | Log level for ForwardedHeadersMiddleware, among others.  This will help you detect misconfigurations. |
| `POSTGRES_DB` | Postgres | controlr | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `ASPNETCORE_URLS` | aspire-dashboard | http://0.0.0.0:18888 | - |
| `Dashboard__Frontend__PublicUrl` | aspire-dashboard | http://localhost:18888 | The public URL where the Aspire Dashboard will be accessible via browser.  For example, if you configure Cloudflare to route https://metrics.example.com to the Aspire Dashboard service, that is the URL you'd put here.  Leave this as localhost if you don't want to make it available yet. |
| `Dashboard__Frontend__BrowserToken` | aspire-dashboard | (secret) | An access token that you'll enter in the browser to view the metrics. |
| `DOTNET_DASHBOARD_OTLP_ENDPOINT_URL` | aspire-dashboard | http://aspire-dashboard:18889 | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/controlr)
