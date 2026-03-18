# Deploy Firefly III on Railway

A free and open source personal finance manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-7wtOV)

## About

![](https://link.storjshare.io/jw3d5ib4witp2z75zhd3bxjilf7q/readme-photos%2Ffireflyiii%2Ffireflyiiilogo.png?view=1)

## Firefly III

_Firefly III is a free and powerful open source personal finance manager_

![Firefly III Sample Page](https://link.storjshare.io/jx4u7gvusfou4x6eu6fvxpajr4la/readme-photos%2Ffireflyiii%2Ffireflyiii_samplepage.png?view=1)

## Highlights

- **Full transaction management:** Firefly III features a double-entry bookkeeping system. You can quickly enter and organize your transactions in multiple currencies.
- **Advanced rule engine:** Use rules to quickly convert shorthands to detailed transactions or clean up your bank's CSV files.
- **Import data from any source:** A special Data Importer helps you import data into your Firefly III administration.

## Learn More

- [Firefly III website](https://www.firefly-iii.org/)
- [Firefly III docs](https://docs.firefly-iii.org/)
- [LICENSE](https://github.com/firefly-iii/firefly-iii/blob/main/LICENSE)

---

<a href="https://www.buymeacoffee.com/bamtech"><img style="height: 60px !important;width: 217px !important;" alt="Buy Me A Coffee" src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png"></a>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| firefly-core | `fireflyiii/core` | Web service |

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
| `PORT` | firefly-core | 8080 | app port |
| `APP_KEY` | firefly-core | - | app secret |
| `DB_HOST` | firefly-core | - | mysql host |
| `DB_PORT` | firefly-core | - | mysql port |
| `SITE_OWNER` | firefly-core | - | Your email address |
| `DB_DATABASE` | firefly-core | - | mysql db |
| `DB_PASSWORD` | firefly-core | (secret) | mysql password |
| `DB_USERNAME` | firefly-core | (secret) | mysql user |
| `DB_CONNECTION` | firefly-core | mysql | db type |
| `TRUSTED_PROXIES` | firefly-core | ** | trust reverse proxy |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/upload`

**Category:** Other

[View on Railway →](https://railway.com/deploy/-7wtOV)
