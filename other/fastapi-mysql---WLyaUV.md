# Deploy fastapi-mysql on Railway

FastApi template with MySQL database and poetry

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/WLyaUV)

## About

<b>Getting Started:</b>
<ol>
<li>Setup Poetry</li>
- Create the poetry environment
```poetry env use 3.11```

<li>Start the poetry shell</li>
- ```poetry shell```

<li>Install dependencies:</li>
- ```poetry install```

<li>Create a .env file and input environment variables.</li>

<li>Initialize database tables:</li>
- ```alembic upgrade head```

<li>Start the application in development mode:</li>
- ```poetry run dev```

<li>Test the application by making requests to endpoints.</li>
</ol>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql-fastapi | [rschwemmer/mysql-fastapi](https://github.com/rschwemmer/mysql-fastapi) | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SECRET_KEY` | mysql-fastapi | (secret) | secret key that should be changes |
| `HASHING_ALGORITHM` | mysql-fastapi | HS256 | hashing algorithm |
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

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Python, Mako

[View on Railway →](https://railway.com/template/WLyaUV)
