# Deploy Flowboard360 Setup Template - Flowise on Railway

Self hosted dashboard for your Flowise chatbots

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/2XlruV)

## About

🔗 www.flowboard360.com

Self Hosted Dashboard for your Flowise Chatbots.

Effortlessly track, monitor, and share Flowise chatbot reports with your clients using a branded dashboard.

✅ One click setup in under 6 minutes

✅ No technical knowledge required

✅ Add unlimited bots & clients

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| Flowboard360 | [manojnaidu619/Flowboard360](https://github.com/manojnaidu619/Flowboard360) (branch: prod) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `AUTH_URL` | Flowboard360 | - | The domain URL to access this application. Example: https://www.myagencydashboard.com (Must be same as NEXT_PUBLIC_APP_URL) |
| `AUTH_SECRET` | Flowboard360 | (secret) | Generate one here: https://auth-secret-gen.vercel.app/ |
| `UPLOADTHING_TOKEN` | Flowboard360 | (secret) | - |
| `NEXT_PUBLIC_APP_URL` | Flowboard360 | - | The domain URL to access this application. Example: https://www.myagencydashboard.com. (Must be same as AUTH_URL) |
| `FLOWISE_DATABASE_URL` | Flowboard360 | - | Your Flowise Database URL |
| `FLOWISE_DATABASE_PROVIDER` | Flowboard360 | - | Your Flowise Database type. Must be one of "mysql" or "postgresql" |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `npm run prod:start`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/2XlruV)
