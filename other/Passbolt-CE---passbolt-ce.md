# Deploy Passbolt CE on Railway

Deploy and Host Passbolt CE with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/passbolt-ce)

## About

Passbolt is a hybrid credential platform. It is built-first for modern IT teams, yet simple enough for everyone.
A sovereign, battle-tested solution that delivers for a team of 5, or an organisation of 5000.

⚠️ This is not a one click deploy ⚠️

You will have to SSH to the server using [Railway CLI](https://docs.railway.com/guides/cli)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Passbolt | `passbolt/passbolt` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | railway | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `PASSBOLT_KEY_NAME` | Passbolt | Passbolt Server | - |
| `PASSBOLT_KEY_EMAIL` | Passbolt | - | owner@company.com |
| `DATASOURCES_DEFAULT_PASSWORD` | Passbolt | (secret) | - |
| `DATASOURCES_DEFAULT_USERNAME` | Passbolt | (secret) | - |
| `EMAIL_TRANSPORT_DEFAULT_PASSWORD` | Passbolt | (secret) | - |
| `EMAIL_TRANSPORT_DEFAULT_USERNAME` | Passbolt | (secret) | - |
| `PASSBOLT_GPG_SERVER_KEY_FINGERPRINT` | Passbolt | - | SSH to the server and run:  gpg --homedir $GNUPGHOME --list-keys --with-colons ${PASSBOLT_KEY_EMAIL:-passbolt@yourdomain.com} | grep fpr | head -1 | cut -f10 -d: |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/bash -c "mkdir -p /var/lib/passbolt-data/gpg /var/lib/passbolt-data/jwt && chown -R www-data:www-data /var/lib/passbolt-data /var/lib/passbolt/tmp && rm -rf /etc/passbolt/gpg /etc/passbolt/jwt && ln -sf /var/lib/passbolt-data/gpg /etc/passbolt/gpg && ln -sf /var/lib/passbolt-data/jwt /etc/passbolt/jwt && chown -R root:www-data /var/lib/passbolt-data/jwt && chmod 750 /var/lib/passbolt-data/jwt && chmod 640 /var/lib/passbolt-data/jwt/* 2>/dev/null; /docker-entrypoint.sh"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/passbolt-data`

**Category:** Other

[View on Railway →](https://railway.com/template/passbolt-ce)
