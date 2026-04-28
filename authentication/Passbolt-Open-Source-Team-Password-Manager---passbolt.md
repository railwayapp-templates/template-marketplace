# Deploy Passbolt | Open Source Team Password Manager on Railway

Self Host Passbolt. Team password vault with end-to-end encryption

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/passbolt)

## About

Deploy Passbolt CE on Railway to give your team a self-hosted, GPG-encrypted password manager with granular access controls and browser-based autofill. Self-host Passbolt on Railway and keep full ownership of your credentials — no third-party cloud provider ever sees your plaintext passwords.

This Railway template deploys Passbolt Community Edition with a MariaDB database, persistent GPG key storage, and automatic database migrations. Run Passbolt on Railway with a single click and get a production-ready team password vault behind HTTPS.

Passbolt is an open-source password manager built specifically for team collaboration. Unlike consumer password managers, Passbolt uses asymmetric GPG encryption where the server never has access to plaintext passwords — decryption happens entirely in the browser extension.

Key features of Passbolt CE:

- **End-to-end GPG encryption** — client-side only, server never sees plaintext
- **Granular role-based access control** with group permissions and shared folders
- **Browser extensions** for Chrome, Firefox, Edge, and Safari with form autofill
- **Native mobile apps** for iOS and Android with biometric authentication
- **Full REST API** for automation, CI/CD credential injection, and integrations
- **Multi-factor authentication** supporting TOTP, Duo, and YubiKey
- **Detailed audit logs** tracking who accessed or modified every credential

The Railway template runs two services: Passbolt-App (the PHP application with Nginx) and MariaDB 10.11 for persistent storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:10.11` | Database |
| Passbolt | `passbolt/passbolt:latest-ce` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_USER` | MariaDB | (secret) | Application database user |
| `MYSQL_DATABASE` | MariaDB | passbolt | Application database name |
| `MYSQL_PASSWORD` | MariaDB | (secret) | Application database password |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) | MariaDB root password |
| `PORT` | Passbolt | 80 | HTTP listening port |
| `APP_FULL_BASE_URL` | Passbolt | - | Public HTTPS URL |
| `EMAIL_DEFAULT_FROM` | Passbolt | - | From address — set after deploy (e.g. no-reply@yourdomain.com) |
| `PASSBOLT_KEY_EMAIL` | Passbolt | - | GPG server key email |
| `PASSBOLT_SSL_FORCE` | Passbolt | false | Disable SSL redirect (Railway TLS proxy) |
| `EMAIL_DEFAULT_FROM_NAME` | Passbolt | Passbolt | From display name |
| `DATASOURCES_DEFAULT_HOST` | Passbolt | - | MariaDB internal host |
| `DATASOURCES_DEFAULT_PORT` | Passbolt | 3306 | MariaDB port |
| `EMAIL_TRANSPORT_DEFAULT_TLS` | Passbolt | true | Enable TLS encryption |
| `DATASOURCES_DEFAULT_DATABASE` | Passbolt | - | Database name |
| `DATASOURCES_DEFAULT_PASSWORD` | Passbolt | (secret) | Database password |
| `DATASOURCES_DEFAULT_USERNAME` | Passbolt | (secret) | Database username |
| `EMAIL_TRANSPORT_DEFAULT_HOST` | Passbolt | - | SMTP server (e.g. smtp.gmail.com, smtp.sendgrid.net) |
| `EMAIL_TRANSPORT_DEFAULT_PORT` | Passbolt | - | SMTP port (587 TLS, 465 SSL) |
| `PASSBOLT_REGISTRATION_PUBLIC` | Passbolt | false | Disable public registration |
| `EMAIL_TRANSPORT_DEFAULT_PASSWORD` | Passbolt | (secret) | SMTP password / app password — set after deploy |
| `EMAIL_TRANSPORT_DEFAULT_USERNAME` | Passbolt | (secret) | SMTP username — set after deploy |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'mkdir -p /data/passbolt/gpg /data/passbolt/jwt && rm -rf /etc/passbolt/gpg /etc/passbolt/jwt && ln -sfn /data/passbolt/gpg /etc/passbolt/gpg && ln -sfn /data/passbolt/jwt /etc/passbolt/jwt && chmod -R 777 /data/passbolt && /usr/bin/wait-for.sh -t 60 $DATASOURCES_DEFAULT_HOST:3306 -- /docker-entrypoint.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/passbolt`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/passbolt)
