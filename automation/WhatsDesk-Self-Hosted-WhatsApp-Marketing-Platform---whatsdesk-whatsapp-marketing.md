# Deploy WhatsDesk — Self-Hosted WhatsApp Marketing Platform on Railway

Self-host WhatsDesk: WhatsApp campaigns & contacts. Own your data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsdesk-whatsapp-marketing)

## About

WhatsDesk is an open-source WhatsApp marketing and automation platform — manage conversations,
organize contacts, build campaigns, and run broadcasts from a single self-hosted dashboard.
Instead of paying per-message on a SaaS marketing tool, connect your own WhatsApp and run
contact management, bulk messaging, and campaign workflows on infrastructure you own.

Hosted WhatsApp marketing tools charge monthly subscriptions plus per-message fees. WhatsDesk
self-hosted on Railway costs ~$5–10/month flat — your contacts, campaigns, and conversation
data stay on your own instance.

---

WhatsDesk is a self-hosted alternative to paid WhatsApp marketing SaaS — it puts campaign
management, a contact database, and a shared conversation inbox on your own server. Running it
means a persistent web app, a database, and a public HTTPS endpoint. This template wires the app
and database on Railway with nothing to configure by hand.

> **Account-safety note:** WhatsApp marketing and bulk-broadcast automation carry real risk.
> Meta actively detects and bans accounts sending unsolicited bulk messages or automating a
> personal account. Use a dedicated number you can afford to lose, warm it up gradually, only
> message contacts who opted in, and respect WhatsApp's business policies. For high-volume
> sanctioned sending, use the official WhatsApp Business API. This risk is inherent to WhatsApp
> marketing tools, not specific to this template.

Typical cost: **~$5–10/month** on Railway's Hobby plan for the app and database. WhatsDesk is
open source — you pay only compute, with no per-message or per-contact SaaS fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WhatsDesk | `mobidonia/whatsdesk` | Database |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_PASSWORD` | WhatsDesk | (secret) | - |
| `DB_USERNAME` | WhatsDesk | (secret) | - |
| `FORCE_HTTPS` | WhatsDesk | true | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Volume:** `/var/www/public/uploads`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/whatsdesk-whatsapp-marketing)
