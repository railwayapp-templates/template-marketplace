# Deploy DVWA (Damn Vulnerable Web App) on Railway

DVWA is an intentionally vulnerable web app to help understand attacks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/GFqNIL)

## About

### About
"Damn Vulnerable Web Application (DVWA) is a PHP/MySQL web application that is damn vulnerable. Its main goal is to be an aid for security professionals to test their skills and tools in a legal environment, help web developers better understand the processes of securing web applications and to aid both students & teachers to learn about web application security in a controlled class room environment.

The aim of DVWA is to practice some of the most common web vulnerabilities, with various levels of difficulty, with a simple straightforward interface. Please note, there are both documented and undocumented vulnerabilities with this software. This is intentional. You are encouraged to try and discover as many issues as possible."

### Note
I have forked the original repo and made some slight modifications to enable easy Railway deployment. If you have any issues with deployment, please create an issue on the w33ts/DVWA repo or ping w33t.io in the Railway Discord. I will keep it up to date as needed.

### Sources
Original Repo: https://github.com/digininja/DVWA

Modified Repo: https://github.com/w33ts/DVWA

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| DVWA | `ghcr.io/w33ts/dvwa:latest` | Web service |

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
| `PORT` | DVWA | 80 | Do not change. |
| `DB_PORT` | DVWA | - | Do not change. |
| `DB_USER` | DVWA | (secret) | Do not change. |
| `DB_SERVER` | DVWA | - | Do not change. |
| `DB_DATABASE` | DVWA | - | Do not change. |
| `DB_PASSWORD` | DVWA | (secret) | Do not change. |
| `RECAPTCHA_PUBLIC_KEY` | DVWA | - | Used for the "Insecure CAPTCHA" module. Optional, but recommended. Generate keys at https://www.google.com/recaptcha/admin. |
| `RECAPTCHA_PRIVATE_KEY` | DVWA | - | Used for the "Insecure CAPTCHA" module. Optional, but recommended. Generate keys at https://www.google.com/recaptcha/admin. |
| `DEFAULT_SECURITY_LEVEL` | DVWA | impossible | Default is impossible. Options are low, medium, high, and impossible. Must be exactly as stated in this description. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/GFqNIL)
