# Deploy OrangeHRM | Free Open-Source HR Management on Railway

Self Host OrangeHRM: employee records, leave tracking, recruitment, & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/orangehrm)

## About

Deploy OrangeHRM on Railway to get a fully self-hosted human resource management system running in minutes. OrangeHRM is the world's most popular open-source HR software, handling everything from employee records and leave management to recruitment and performance reviews.

This Railway template pre-configures OrangeHRM with a MySQL database, persistent storage for uploads, and a public domain — ready for the guided setup wizard that creates your admin account and initializes the database on first visit.

OrangeHRM is a comprehensive Human Resource Management System released under the GPL-3.0 license. It provides a modular platform where organizations pick the HR functions they need without paying for features they don't.

- **Employee Information Management** — centralized database of personnel details, job histories, emergency contacts, and custom fields
- **Leave & Time Tracking** — automated PTO requests, approval workflows, attendance tracking with configurable leave types
- **Recruitment (ATS)** — job postings, applicant tracking, resume management, and interview scheduling
- **Performance Management** — 180° reviews, goal setting, evaluation cycles, and development plans
- **Reporting & Analytics** — pre-built and custom reports on attendance, turnover, demographics, and workforce planning
- **Mobile Apps** — iOS and Android apps for employee self-service on the go

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| OrangeHRM | `orangehrm/orangehrm:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |
| `PORT` | OrangeHRM | 80 | HTTP listening port |
| `ORANGEHRM_DATABASE_HOST` | OrangeHRM | - | MySQL internal hostname |
| `ORANGEHRM_DATABASE_NAME` | OrangeHRM | - | Database name |
| `ORANGEHRM_DATABASE_USER` | OrangeHRM | (secret) | Database username |
| `ORANGEHRM_DATABASE_PASSWORD` | OrangeHRM | (secret) | Database password |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'a2dismod mpm_event mpm_worker 2>/dev/null; a2enmod mpm_prefork; apache2-foreground'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/orangehrm`

**Category:** Other

[View on Railway →](https://railway.com/deploy/orangehrm)
