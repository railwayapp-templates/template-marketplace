# Deploy b1-template on Railway

Deploy and Host b1-template with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

## About

B1.church is Church Management Software to manage church members, groups, attendance, donations, and more.  

Hosting is provided for free at https://b1.church/ .  This template is provided for churches who prefer to host their own copy of the apps and database instead.

Hosting b1-template means running your own full copy of the B1 platform, including the API, database, and web interface. You are responsible for deployment, updates, backups, and uptime. In return, you gain full control over your data, customization options, and independence from any hosted provider.  The config is offered on Railway to simplify infrastructure, but some technical familiarity with environment variables, databases, and deployments is still required. This option is best suited for churches with a developer or IT volunteer who can manage occasional maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Api | [ChurchApps/Api](https://github.com/ChurchApps/Api) | Web service |
| B1App | [ChurchApps/B1App](https://github.com/ChurchApps/B1App) (branch: release) | Web service |
| B1Admin | [ChurchApps/B1Admin](https://github.com/ChurchApps/B1Admin) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `JWT_SECRET` | Api | (secret) |
| `ENVIRONMENT` | Api | railway |
| `REACT_APP_STAGE` | B1Admin | dev |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/content`

**Category:** Other · **Languages:** TypeScript, HTML, JavaScript, CSS, Shell

[View on Railway →](https://railway.com/deploy/b1-template)
