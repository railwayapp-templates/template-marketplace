# Deploy finance-agent-malaysia on Railway

Personal finance tracker for Malaysia: Maybank, TNG, Telegram bot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/finance-agent-malaysia)

## About

finance-agent-malaysia is a personal finance tracker for people living in Malaysia. Send it Maybank or Touch 'n Go statements and it keeps a Postgres ledger, sorts spending into categories and sends weekly and monthly reports to your Telegram bot, with a web dashboard. Bot and dashboard speak Russian.

The template runs one Python service (FastAPI, the Telegram bot webhook and a report scheduler) next to a Railway Postgres database. Before deploying, create a bot with @BotFather and get your numeric Telegram id from @userinfobot: these are the only two values you enter. Secrets are generated for you, the public domain is wired into the webhook, and every start runs database migrations and loads default categories. It is single-user: the bot answers only your Telegram account, and your statements stay in your own Railway project. Open your bot, press Start and send a statement PDF.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| finance_system_malaysia | [emris-git/finance_system_malaysia](https://github.com/emris-git/finance_system_malaysia) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | finance_system_malaysia | 8000 | Port the app listens on. Keep 8000: the public domain points to it. |
| `TZ_NAME` | finance_system_malaysia | Asia/Kuala_Lumpur | IANA time zone for reports and dates, e.g. Asia/Kuala_Lumpur. |
| `API_TOKEN` | finance_system_malaysia | (secret) | Bearer token for the CLI, the iOS Shortcut and the categorization agent. Generated for you. |
| `SECRET_KEY` | finance_system_malaysia | (secret) | Signs dashboard login links and cookies. Generated for you; keep it secret. |
| `DATABASE_URL` | finance_system_malaysia | - | Connection string of the Postgres service in this template. Leave as is. |
| `MONTH_START_DAY` | finance_system_malaysia | 1 | First day of your financial month (1–28). 1 = calendar months; salary on the 25th → 26. |
| `PUBLIC_BASE_URL` | finance_system_malaysia | - | Public URL of this service, taken from its Railway domain. Leave as is. |
| `SCHEDULER_ENABLED` | finance_system_malaysia | true | true sends a weekly report every Monday and a monthly report on MONTH_START_DAY. |
| `TELEGRAM_OWNER_ID` | finance_system_malaysia | - | Your numeric Telegram user id from @userinfobot (not @username). Only this user can use the bot. |
| `TELEGRAM_BOT_TOKEN` | finance_system_malaysia | (secret) | Bot token from @BotFather: send /newbot and copy the token it gives you. |
| `TELEGRAM_WEBHOOK_SECRET` | finance_system_malaysia | (secret) | Proves that updates come from Telegram. Generated for you; letters and digits only. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Python, JavaScript, CSS, HTML, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/finance-agent-malaysia)
