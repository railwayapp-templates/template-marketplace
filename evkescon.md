# Deploy evkescon on Railway

Deploy and Host evkescon with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/evkescon)

## About

**evkescon** is a lightweight full-stack web application that enables users to access, manage, and interact with educational or event-based content. It is built with a React frontend and Node.js backend, using a MySQL database for structured data storage. The project emphasizes modularity, fast deployment, and simple database connectivity.

---

Hosting **evkescon** on Railway involves deploying a Node.js backend server connected to a managed MySQL database. The backend handles API requests, authentication, and database queries. The frontend (built in React) is hosted separately via Netlify but fetches data from the Railway-hosted backend. This architecture ensures better scalability, secure data handling, and independent deployment pipelines. Railway handles provisioning of your MySQL database, injects connection environment variables into your app, and supports one-click deploys from GitHub.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |

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
| `MYSQL_PUBLIC_URL` | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | (secret) | Root password for MySQL DB. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/template/evkescon)
