# Deploy vast-wild on Railway

What is vast-wild? Your descrip

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vast-wild)

## About

What is vast-wild? Your description in roughly ~50 words.What is vast-wild? Your description in roughly ~50 words.What is vast-wild? Your description in roughly ~50 words.What is vast-wild? Your description words.What is vast-wild? Your description  words.What is vast-wild? Your description words.What is vast-wild? Your description 
words.What is vast-wild? Your description words.What is vast-wild? Your description 
words.What is vast-wild? Your description words.What is vast-wild? Your description

What is vast-wild? Your description in roughly ~50 words.What is vast-wild? Your description in roughly ~50 words.What is vast-wild? Your description in roughly ~50 words.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MYSQLHOST` | - | Railway Private Domain Name. |
| `MYSQLPORT` | 3306 | MySQL port. |
| `MYSQLUSER` | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | railway | Database to be created on image startup. |
| `MYSQL_ROOT_PASSWORD` | (secret) | Root password for MySQL DB. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/vast-wild)
