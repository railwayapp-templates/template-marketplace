# Deploy Passbolt — Open Source Team Password Manager on Railway

Self-host Passbolt — end-to-end encrypted team password vault

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/passbolt-team-password-manager)

## About

Passbolt is an open-source, end-to-end encrypted password manager built for teams — a self-hosted alternative to 1Password and LastPass where the server never sees your plaintext passwords. Every secret is encrypted with OpenPGP and decrypted only in the browser extension, true zero-knowledge security on infrastructure you own. This template deploys Passbolt with MariaDB and — most importantly — persists the GPG server keys your entire vault depends on.

---

Passbolt's security model is the reason to use it and the reason one specific setup step matters more than anything else.

**The GPG server keypair *is* your vault — persist it or lose everything.** Passbolt encrypts every password with OpenPGP, and the server's keypair in `/etc/passbolt/gpg` is required to decrypt them. If that volume isn't persistent, a redeploy generates a new keypair and every password already in the database becomes **permanently undecryptable** — the data is there, but nothing can read it. This isn't losing a session, it's losing the vault. This template persists the GPG volume, and you should back it up separately, because without matching keys even a database backup can't be restored.

**The JWT volume matters too.** `/etc/passbolt/jwt` holds the authentication token keys — persist it alongside GPG so logins stay valid across redeploys.

**`APP_FULL_BASE_URL` must exactly match your access URL.** Set it to your full Railway domain including `https://`. If it doesn't match, registration and recovery links break — a common and confusing failure. Note Passbolt uses **MariaDB, not PostgreSQL** (unlike most self-hosted apps); this template includes MariaDB 10.11.

**Setup requires the browser extension and a CLI-created admin.** Passbolt has no password-in-a-form login — authentication is GPG-key-based through the official browser extension, which you'll need installed. The first admin is created via a one-time CLI command (`cake passbolt register_user`), which returns a registration link you open in the browser with the extension to finish setup.

Typical cost: **~$10–15/month** on Railway for Passbolt and MariaDB. Passbolt CE is 100% free and open source under AGPL-3.0; 1Password and LastPass bill per user per month.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Passbolt | `passbolt/passbolt:latest-ce` | Database |
| MariaDB | `mariadb:10.11` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Passbolt | 80 | - |
| `EMAIL_DEFAULT_FROM` | Passbolt | - | From address — set after deploy (e.g. no-reply@yourdomain.com) |
| `PASSBOLT_KEY_EMAIL` | Passbolt | - | GPG server key email |
| `PASSBOLT_SSL_FORCE` | Passbolt | false | - |
| `EMAIL_DEFAULT_FROM_NAME` | Passbolt | - | Passbolt |
| `DATASOURCES_DEFAULT_HOST` | Passbolt | - | ${{MariaDB.RAILWAY_PRIVATE_DOMAIN}} |
| `DATASOURCES_DEFAULT_PORT` | Passbolt | 3306 | - |
| `EMAIL_TRANSPORT_DEFAULT_TLS` | Passbolt | true | - |
| `DATASOURCES_DEFAULT_PASSWORD` | Passbolt | (secret) | - |
| `DATASOURCES_DEFAULT_USERNAME` | Passbolt | (secret) | - |
| `EMAIL_TRANSPORT_DEFAULT_HOST` | Passbolt | - | SMTP server (e.g. smtp.gmail.com, smtp.sendgrid.net) |
| `EMAIL_TRANSPORT_DEFAULT_PORT` | Passbolt | - | SMTP port (587 TLS, 465 SSL) |
| `PASSBOLT_REGISTRATION_PUBLIC` | Passbolt | false | - |
| `EMAIL_TRANSPORT_DEFAULT_PASSWORD` | Passbolt | (secret) | SMTP password / app password — set after deploy |
| `EMAIL_TRANSPORT_DEFAULT_USERNAME` | Passbolt | (secret) | SMTP username — set after deploy |
| `MYSQL_USER` | MariaDB | (secret) | - |
| `MYSQL_DATABASE` | MariaDB | passbolt | - |
| `MYSQL_PASSWORD` | MariaDB | (secret) | - |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) | - |

## Configuration

- **Volume:** `/data/passbolt`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/passbolt-team-password-manager)
