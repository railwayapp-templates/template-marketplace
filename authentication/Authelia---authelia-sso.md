# Deploy Authelia on Railway

Authelia SSO and 2FA portal with lldap directory, PostgreSQL & Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/authelia-sso)

## About

Authelia is an open-source authentication and authorization server that puts a single sign-on portal, two-factor authentication and an OpenID Connect 1.0 provider in front of the apps you already run. It is a single Go binary, used by homelabs and engineering teams who want one login and one place to enforce 2FA without paying per seat — the answer to five internal tools with five separate user lists.

Deploy Authelia on Railway and you get the whole identity stack, not a lone container: the portal, an **lldap** directory with a web UI for users and groups, **PostgreSQL** for two-factor secrets and OAuth 2.0 state, **Redis** as the session store, and **Mailpit** to catch the one-time codes Authelia emails during credential registration. Sign-ins hit the portal, which binds to lldap over the private network to check the password, records the second factor in Postgres and keeps the session in Redis — every piece wired together on first boot.

![Diagram of the Authelia, lldap, Mailpit, Postgres and Redis services](https://res.cloudinary.com/rroe4rtk/image/upload/v1787749934/authelia-architecture.png)

Authelia solves the problem of every self-hosted tool having its own login form. It answers one question — is this person allowed in, and have they proved it twice — then hands the answer over through OpenID Connect or a reverse proxy's forward-auth hook. Self-host it when you want SSO you control, or when per-user pricing is out of proportion to a small team.

- One sign-in portal with password policy enforcement and brute-force regulation
- Second factors: TOTP apps, WebAuthn security keys and passkeys, Duo push
- A full OpenID Connect 1.0 provider with consent screens, refresh tokens and group claims
- Forward-auth endpoints for NGINX, Traefik, Caddy, HAProxy and Envoy
- Access rules by domain, path, user, group and network, and email-verified password reset

The Railway architecture splits those responsibilities across small services. Authelia keeps only its OpenID Connect signing key on a volume. lldap is the directory — LDAP on the private network, an admin UI for you. PostgreSQL holds encrypted TOTP secrets, WebAuthn credentials, OAuth 2.0 grants and the audit log. Redis holds sessions so they survive deployments. Mailpit captures outbound mail; repoint the SMTP variables at a real provider when you go live.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| lldap | `lldap/lldap:stable` | Web service |
| authelia | [gridalpha/authelia-railway](https://github.com/gridalpha/authelia-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | mailpit | 8025 | Inbox HTTP port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox UI |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | Required SMTP credentials |
| `SMTP_PASSWORD` | mailpit | (secret) | SMTP account password |
| `SMTP_USERNAME` | mailpit | (secret) | SMTP account username |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Inbox bind address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP bind address, IPv6 for private networking |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow AUTH on the plaintext listener |
| `PORT` | lldap | 17170 | Admin UI HTTP port |
| `LLDAP_HTTP_URL` | lldap | - | Public URL for reset links |
| `LLDAP_KEY_SEED` | lldap | - | Seeds the password encryption key |
| `LLDAP_HTTP_HOST` | lldap | 0.0.0.0 | Admin UI bind address |
| `LLDAP_HTTP_PORT` | lldap | 17170 | Admin UI port |
| `LLDAP_LDAP_HOST` | lldap | :: | LDAP bind address, IPv6 for private networking |
| `LLDAP_LDAP_PORT` | lldap | 3890 | LDAP port, private only |
| `LLDAP_JWT_SECRET` | lldap | (secret) | Signs admin UI sessions |
| `LLDAP_DATABASE_URL` | lldap | sqlite:///data/users.db?mode=rwc | Directory database on the volume |
| `LLDAP_LDAP_BASE_DN` | lldap | dc=example,dc=com | Directory base DN |
| `LLDAP_LDAP_USER_DN` | lldap | admin | Admin username |
| `LLDAP_LDAP_USER_PASS` | lldap | - | Admin password, also the Authelia login |
| `LLDAP_LDAP_USER_EMAIL` | lldap | admin@example.com | Admin email address |
| `LLDAP_SMTP_OPTIONS__FROM` | lldap | LLDAP Admin <lldap@example.com> | Sender address |
| `LLDAP_SMTP_OPTIONS__PORT` | lldap | 1025 | SMTP port |
| `LLDAP_SMTP_OPTIONS__USER` | lldap | (secret) | SMTP username |
| `LLDAP_SMTP_OPTIONS__SERVER` | lldap | - | SMTP host |
| `LLDAP_SMTP_OPTIONS__PASSWORD` | lldap | (secret) | SMTP password |
| `LLDAP_SMTP_OPTIONS__SMTP_ENCRYPTION` | lldap | NONE | Private plaintext SMTP |
| `LLDAP_SMTP_OPTIONS__ENABLE_PASSWORD_RESET` | lldap | (secret) | Enable password reset email |
| `PORT` | authelia | 9091 | Portal HTTP listening port |
| `SMTP_HOST` | authelia | - | Mail host, repoint for production |
| `SMTP_PORT` | authelia | 1025 | SMTP port |
| `REDIS_HOST` | authelia | - | Private cache hostname |
| `REDIS_PORT` | authelia | 6379 | Redis port |
| `LDAP_ADDRESS` | authelia | - | Directory address |
| `LDAP_BASE_DN` | authelia | - | Directory base DN |
| `POSTGRES_HOST` | authelia | - | Private database hostname |
| `POSTGRES_PORT` | authelia | 5432 | Database port |
| `POSTGRES_USER` | authelia | (secret) | Database user |
| `SMTP_PASSWORD` | authelia | (secret) | SMTP password |
| `SMTP_USERNAME` | authelia | (secret) | SMTP username |
| `OIDC_CLIENT_ID` | authelia | app | Registers one OpenID Connect client |
| `REDIS_PASSWORD` | authelia | (secret) | Redis password |
| `REDIS_USERNAME` | authelia | (secret) | Redis ACL username |
| `SESSION_SECRET` | authelia | (secret) | Encrypts session data in Redis |
| `LDAP_ADMIN_USER` | authelia | (secret) | Bind account username |
| `OIDC_CLIENT_NAME` | authelia | My Application | Name shown on the consent screen |
| `OIDC_HMAC_SECRET` | authelia | (secret) | Signs OAuth 2.0 tokens |
| `POSTGRES_DATABASE` | authelia | - | Database name |
| `POSTGRES_PASSWORD` | authelia | (secret) | Database password |
| `LDAP_BIND_PASSWORD` | authelia | (secret) | Bind account password |
| `OIDC_CLIENT_SECRET` | authelia | (secret) | Plaintext secret, hashed at boot |
| `STORAGE_ENCRYPTION_KEY` | authelia | - | Encrypts secrets at rest |
| `OIDC_CLIENT_REDIRECT_URIS` | authelia | - | Set to your app callback |
| `RESET_PASSWORD_JWT_SECRET` | authelia | (secret) | Signs password reset links |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/authelia-sso)
