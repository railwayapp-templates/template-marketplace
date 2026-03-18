# Deploy create-t3-app on Railway

The easiest way to develop typesafe full stack apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/1DI67q)

## About

## Overview
The create T3 app starter contains a next app pre-configured with trpc, tailwind, nextauth ( complete with database setup ) and prisma.  Since we are deploying on Railway a database is already setup and linked to your project, with migrations that run at deployment time!

## Highlights
- Pre-configured database
- Fullstack typesafety
- Pre-configured Tailwind, Trpc, Next-auth and Prisma
- Excellent developer experience 

## Learn More
For more information about create-t3-app please head over to https://create.t3.gg/en/introduction or join the discord https://t3.gg/discord

## Notes
To enable nextauth head over to the `src/server/auth.ts` file and configure any providers you would like on line 31.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [FinnDore/create-t3-app-starter](https://github.com/FinnDore/create-t3-app-starter) | Web service |
| MySQL | `mysql` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXTAUTH_SECRET` | app | (secret) | Secret used by nextauth |
| `MYSQLHOST` | MySQL | - | Railway TCP Proxy Domain. |
| `MYSQLPORT` | MySQL | - | MySQL TCP Proxy port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PRIVATE_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Start command:** `pnpm prisma migrate deploy && pnpm run start`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Starters · **Languages:** TypeScript, JavaScript, Shell, CSS

[View on Railway →](https://railway.com/template/1DI67q)
