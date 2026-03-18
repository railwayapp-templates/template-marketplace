# Deploy 2Fauth on Railway

Deploy and Host 2Fauth with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/2fauth)

## About

[2Fauth](https://2fauth.app/) is a self-hosted two-factor authentication (2FA) manager designed to securely store and manage your TOTP/HOTP secrets in a private environment. It provides a simple, privacy-first interface and is ideal for individuals and teams who want to keep their authentication tokens under their own control rather than relying on third-party providers.

Hosting 2Fauth allows you to run your own secure 2FA service on your infrastructure. With this template, deploying on [Railway](https://railway.app/) is fast and requires minimal configuration. Railway handles provisioning, builds, and hosting so you can focus on managing your authentication tokens. Once deployed, 2Fauth can be accessed via a browser with optional SSL configuration and can be connected to your preferred storage and authentication layers. This gives you full control, enhanced security, and flexibility in your deployment environment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| 2fauth | `2fauth/2fauth` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `APP_ENV` | 2fauth | local | You can leave this on "local". If you change it to production most console commands will ask for extra confirmation.Never set it to "testing". |
| `APP_KEY` | 2fauth | - | The encryption key for  our database and sessions. Keep this very secure. If you generate a new one all existing data must be considered LOST. |
| `APP_URL` | 2fauth | - | This variable must match your installation's external address. Webauthn won't work otherwise. |
| `APP_NAME` | 2fauth | 2FAuth | You can change the name of the app |
| `APP_DEBUG` | 2fauth | false | Set to true if you want to see debug information in error screens. |
| `ASSET_URL` | 2fauth | - | If you want to serve js assets from a CDN (like https://cdn.example.com), uncomment the following line and set this var with the CDN url. Otherwise, let this line emptr. |
| `LOG_LEVEL` | 2fauth | notice | Log level. You can set this from least severe to most severe: debug, info, notice, warning, error, critical, alert, emergency If you set it to debug your logs will grow large, and fast. If you set it to emergency probably nothing will get logged, ever. |
| `MAIL_PORT` | 2fauth | 2525 | - |
| `SITE_OWNER` | 2fauth | - | This should be your email address |
| `DB_PASSWORD` | 2fauth | (secret) | - |
| `DB_USERNAME` | 2fauth | (secret) | - |
| `IS_DEMO_APP` | 2fauth | false | Turn this to true if you want your app to react like a demo. The Demo mode reset the app content every hours and set a generic demo user. |
| `LOG_CHANNEL` | 2fauth | daily |  The log channel defines where your log entries go to.  'daily' is the default logging mode giving you 7 daily rotated log files in /storage/logs/.  Also available are 'errorlog', 'syslog', 'stderr', 'papertrail', 'slack' and a 'stack' channel  to combine multiple channels into a single one. |
| `MAIL_MAILER` | 2fauth | log | - |
| `WEBAUTHN_ID` | 2fauth | null | Relying Party ID, should equal the site domain (i.e 2fauth.example.com). If null, the device will fill it internally (recommended) See https://webauthn-doc.spomky-labs.com/prerequisites/the-relying-party#how-to-determine-the-relying-party-id |
| `APP_TIMEZONE` | 2fauth | UTC | The timezone for your application, which is used to record dates and times to database. This global setting can be overridden by users via in-app settings for a personalised dates and times display. If this setting is changed while the application is already running, existing records in the database won't be updated |
| `CACHE_DRIVER` | 2fauth | file | If you're looking for performance improvements, you could install memcached. |
| `THROTTLE_API` | 2fauth | 60 |  API settings  The maximum number of API calls in a minute from the same IP.  Once reached, all requests from this IP will be rejected until the minute has elapsed.  Set to null to disable the API throttling. |
| `DB_CONNECTION` | 2fauth | pgsql | - |
| `MAIL_PASSWORD` | 2fauth | (secret) | - |
| `MAIL_USERNAME` | 2fauth | (secret) | - |
| `WEBAUTHN_NAME` | 2fauth | 2FAuth | WebAuthn settings Relying Party name, aka the name of the application. If blank, defaults to APP_NAME. Do not set to null. |
| `LOGIN_THROTTLE` | 2fauth | (secret) | Authentication settings The number of times per minute a user can fail to log in before being locked out. Once reached, all login attempts will be rejected until the minute has elapsed. This setting applies to both email/password and webauthn login attemps. |
| `MAIL_FROM_NAME` | 2fauth | MAIL_FROM_NAME | - |
| `SESSION_DRIVER` | 2fauth | file | - |
| `MAIL_ENCRYPTION` | 2fauth | null | - |
| `TRUSTED_PROXIES` | 2fauth | null | Use this setting to declare trusted proxied. Supported:   '*': to trust any proxy   A comma separated IP list: The list of proxies IP to trust.  |
| `PROXY_LOGOUT_URL` | 2fauth | null | Custom logout URL to open when using an auth proxy. |
| `MAIL_FROM_ADDRESS` | 2fauth | null | - |
| `AUTHENTICATION_GUARD` | 2fauth | web-guard | The default authentication guard Supported:   'web-guard' : The Laravel built-in auth system (default if nulled)   'reverse-proxy-guard' : When 2FAuth is deployed behind a reverse-proxy that handle authentication WARNING When using 'reverse-proxy-guard' 2FAuth only look for the dedicated headers and skip all other built-in authentication checks. That means your proxy is fully responsible of the authentication process, 2FAuth will trust him as long as headers are presents. |
| `MAIL_VERIFY_SSL_PEER` | 2fauth | true | SSL peer verification. Set this to false to disable the SSL certificate validation. WARNING Disabling peer verification can result in a major security flaw. Change it only if you know what you're doing. |
| `CONTENT_SECURITY_POLICY` | 2fauth | false | Set this to true to enable Content-Security-Policy (CSP). CSP helps to prevent or minimize the risk of certain types of security threats. This is mainly used as a defense against cross-site scripting (XSS) attacks, in which an attacker is able to inject malicious code into the web app.  |
| `AUTH_PROXY_HEADER_FOR_USER` | 2fauth | (secret) | Name of the HTTP headers sent by the reverse proxy that identifies the authenticated user at proxy level. Check your proxy documentation to find out how these headers are named (i.e 'REMOTE_USER', 'REMOTE_EMAIL', etc...) (only relevant when AUTHENTICATION_GUARD is set to 'reverse-proxy-guard') |
| `WEBAUTHN_USER_VERIFICATION` | 2fauth | preferred | Use this setting to control how user verification behave during the WebAuthn authentication flow. Most authenticators and smartphones will ask the user to actively verify themselves for log in. For example, through a touch plus pin code, password entry, or biometric recognition (e.g., presenting a fingerprint). The intent is to distinguish one user from any other. Supported:   'required': Will ALWAYS ask for user verification   'preferred' (default) : Will ask for user verification IF POSSIBLE   'discouraged' : Will NOT ask for user verification (for example, to minimize disruption to the user interaction flow) |
| `AUTH_PROXY_HEADER_FOR_EMAIL` | 2fauth | null | Name of the HTTP headers sent by the reverse proxy that identifies the authenticated user at proxy level. Check your proxy documentation to find out how these headers are named (i.e 'REMOTE_USER', 'REMOTE_EMAIL', etc...) (only relevant when AUTHENTICATION_GUARD is set to 'reverse-proxy-guard') |
| `PROXY_FOR_OUTGOING_REQUESTS` | 2fauth | null | Proxy for outgoing requests like new releases detection or logo fetching. You can provide a proxy URL that contains a scheme, username, and password. For example, "http://username:password@192.168.16.1:10". |
| `AUTHENTICATION_LOG_RETENTION` | 2fauth | AUTHENTICATION_LOG_RETENTION | Authentication log retention time, in days. Log entries older than that are automatically deleted. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/2fauth`

**Category:** Other

[View on Railway →](https://railway.com/deploy/2fauth)
