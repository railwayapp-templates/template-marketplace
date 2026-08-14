# Deploy 2FAuth on Railway

2FAuth | Self-hosted TOTP/HOTP manager (Authy alternative)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/2fauth-railway)

## About

2FAuth is an open-source web app for managing your two-factor authentication accounts and generating their security codes from any browser. It stores the TOTP and HOTP secrets that services like GitHub, AWS and Google hand you at setup, then produces the rotating six-digit codes you need to sign in — the same job a phone authenticator does, but reachable from a laptop and encrypted at rest in a database you control. People self-host 2FAuth because a phone-only authenticator is a single point of failure: lose the handset and you lose every account behind it.

Deploy 2FAuth on Railway and this template runs the official `2fauth/2fauth` Docker image against managed PostgreSQL and Redis instances, with a persistent volume attached to the app. PostgreSQL holds users, groups and the encrypted secrets; Redis serves the cache and session store, keeping login state off the disk; the volume keeps the OAuth signing keys that authenticate API clients, plus service icons. Traffic reaches the app over HTTPS on a Railway domain, while the database and Redis stay private.

![2FAuth Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786645074/9ef3cd74-6bba-49b9-adb5-247b8f669d36.png)

2FAuth is a Laravel and Vue application under the AGPL-3.0 licence that acts as a personal or team vault for one-time-password seeds. Self-host it when you want codes on a desktop, need a recoverable backup of seeds that otherwise live only on a phone, or have a policy that authentication material must not sit with a SaaS vendor.

Key features:

- TOTP, HOTP and Steam codes, with configurable digits, period and algorithm
- QR capture by webcam, image upload or clipboard paste, plus manual entry
- Encrypted secrets and emails, keyed on your own application key
- WebAuthn / passkey sign-in, plus optional SSO via OpenID Connect or GitHub
- Import from 2FAS, Aegis and Google Authenticator; export in 2FAuth JSON
- Groups, search, icons, multi-user accounts and sharing between users
- A REST API with personal access tokens, used by the browser extension

The architecture is deliberately small: nginx in front of PHP-FPM on port 8000, PostgreSQL as the system of record, Redis for cache and sessions. The volume is not optional — it carries the OAuth key pair that signs API tokens, the icon cache, and the marker file the container reads to decide whether the database is already installed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 2fauth | `2fauth/2fauth` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | 2fauth | 8000 | Port the health check probes |
| `APP_ENV` | 2fauth | production | Laravel environment |
| `APP_KEY` | 2fauth | - | Encrypts 2FA secrets at rest |
| `APP_URL` | 2fauth | - | Public address, required by WebAuthn |
| `DB_HOST` | 2fauth | - | Private database hostname |
| `DB_PORT` | 2fauth | - | Database port |
| `APP_NAME` | 2fauth | 2FAuth | App name shown in UI |
| `APP_DEBUG` | 2fauth | false | Never expose stack traces |
| `LOG_LEVEL` | 2fauth | notice | Log verbosity |
| `REDIS_URL` | 2fauth | - | Redis connection string |
| `SITE_OWNER` | 2fauth | admin@example.com | Operator contact address |
| `CACHE_STORE` | 2fauth | redis | Cache backed by Redis |
| `DB_DATABASE` | 2fauth | - | Database name |
| `DB_PASSWORD` | 2fauth | (secret) | Database password |
| `DB_USERNAME` | 2fauth | (secret) | Database user |
| `LOG_CHANNEL` | 2fauth | stderr | Send logs to Railway |
| `MAIL_MAILER` | 2fauth | log | Set to smtp to send real email |
| `APP_TIMEZONE` | 2fauth | UTC | Default timezone for records |
| `THROTTLE_API` | 2fauth | 60 | API calls per minute per IP |
| `DB_CONNECTION` | 2fauth | pgsql | Use PostgreSQL, not SQLite |
| `LOGIN_THROTTLE` | 2fauth | (secret) | Failed logins per minute |
| `SESSION_DRIVER` | 2fauth | redis | Sessions backed by Redis |
| `TRUSTED_PROXIES` | 2fauth | * | Trust Railway's edge headers |
| `OTP_LOG_RETENTION` | 2fauth | 365 | OTP log retention in days |
| `SESSION_SECURE_COOKIE` | 2fauth | true | HTTPS-only session cookie |
| `WEBAUTHN_USER_VERIFICATION` | 2fauth | preferred | Passkey verification policy |
| `AUTHENTICATION_LOG_RETENTION` | 2fauth | 365 | Auth log retention in days |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Start command:** `/bin/sh -c 'echo "railway-init: booted as uid=$(id -u)"; addgroup -g 1000 tfa 2>/dev/null; adduser -D -H -u 1000 -G tfa -s /bin/sh tfa 2>/dev/null; mkdir -p /2fauth; chown -R 1000:1000 /2fauth /srv/bootstrap/cache; exec su -p -c "id; exec /usr/local/bin/entrypoint.sh" tfa'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/2fauth`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/2fauth-railway)
