# Deploy Passbolt on Railway

Password manager for teams, with end-to-end encrypted sharing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/passbolt-vault)

## About

Passbolt is an open-source password manager built for teams. Every credential is encrypted in the browser with OpenPGP and shared by encrypting it to each colleague's public key, so revoking access is a cryptographic operation rather than a permission flag. Engineering teams, agencies and IT departments use it to share server logins, API keys and service accounts without pasting them into chat.

Deploy Passbolt on Railway and you get the production shape rather than one container: a **passbolt** service running nginx, PHP-FPM and the email cron under supervisord; a Railway-managed **MySQL** database holding users, groups, permissions and encrypted secrets; and a **mailpit** service capturing the mail Passbolt sends. Mail matters more here than in most apps — the setup link, invitations and account recovery all arrive by email — so this template ships a working inbox rather than asking you to arrange SMTP first. The OpenPGP server key and JWT signing keys live on a persistent volume, and Railway's edge terminates TLS.

![Passbolt, MySQL and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788468539/passbolt-architecture.png)

Self-hosting Passbolt means the ciphertext never leaves infrastructure you control and no vendor holds a key that could decrypt it. Because encryption happens client-side the server is an ordinary PHP application: it stores OpenPGP messages it cannot read and decides who may fetch them.

Key features:

- Per-resource and per-folder sharing with Owner, Update and Read permissions
- Groups, so access follows a team rather than a list of individuals
- TOTP secrets, notes and custom fields stored alongside passwords
- Import and export in KeePass, LastPass, 1Password and CSV
- Browser extensions, mobile apps, and a JSON API with JWT authentication

The deployment splits this across three services. **passbolt** serves the API and the workspace and runs the cron that flushes outgoing mail every minute. **MySQL** is the only durable store for application data. **mailpit** accepts SMTP on the private network and keeps messages in a searchable inbox, replaceable with a real relay later.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| MySQL | `mysql:9.4` | Database |
| passbolt | [gridalpha/passbolt-railway](https://github.com/gridalpha/passbolt-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | mailpit | UTC | Timestamp timezone |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for private SMTP |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |
| `PORT` | passbolt | 8080 | Port nginx listens on |
| `APP_FULL_BASE_URL` | passbolt | - | Public URL used in every link |
| `PASSBOLT_DATA_DIR` | passbolt | /data | Volume holding the OpenPGP and JWT keys |
| `PASSBOLT_KEY_NAME` | passbolt | Passbolt server key | Label on the server OpenPGP key |
| `EMAIL_DEFAULT_FROM` | passbolt | - | Sender address |
| `PASSBOLT_KEY_EMAIL` | passbolt | - | Identity on the server OpenPGP key |
| `PASSBOLT_ADMIN_EMAIL` | passbolt | admin@example.com | First administrator; change before deploying |
| `EMAIL_DEFAULT_FROM_NAME` | passbolt | Passbolt | Sender display name |
| `DATASOURCES_DEFAULT_HOST` | passbolt | - | Private MySQL hostname |
| `DATASOURCES_DEFAULT_PORT` | passbolt | - | MySQL port |
| `PASSBOLT_ADMIN_LAST_NAME` | passbolt | Admin | First administrator's last name |
| `PASSBOLT_ADMIN_FIRST_NAME` | passbolt | Passbolt | First administrator's first name |
| `DATASOURCES_DEFAULT_DATABASE` | passbolt | - | Schema Passbolt installs into |
| `DATASOURCES_DEFAULT_PASSWORD` | passbolt | (secret) | MySQL password |
| `DATASOURCES_DEFAULT_USERNAME` | passbolt | (secret) | MySQL account |
| `EMAIL_TRANSPORT_DEFAULT_HOST` | passbolt | - | SMTP host |
| `EMAIL_TRANSPORT_DEFAULT_PORT` | passbolt | 1025 | SMTP port |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthcheck/status`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/passbolt-vault)
