# Deploy Kimai on Railway

Professional grade time-tracking application, free and open-source

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/SmKtMI)

## About

Kimai is a professional grade time-tracking application, free and open-source. It handles use-cases of freelancers as well as companies with dozens or hundreds of users. Kimai was build to track your project times and ships with many advanced features, including but not limited to:

JSON API, invoicing, data exports, multi-timer and punch-in punch-out mode, tagging, multi-user - multi-timezones - multi-language (over 30 translations existing!), authentication via SAML/LDAP/Database, two-factor authentication (2FA) with TOTP, customizable role and team permissions, responsive design, user/customer/project specific rates, advanced search & filtering, money and time budgets, advanced reporting, support for plugins and so much more.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql` | Database |
| Kimai v2 | `kimai/kimai2:apache` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `PORT` | Kimai v2 | 8001 |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/template/SmKtMI)
