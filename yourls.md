# Deploy YOURLS on Railway

The de facto standard self-hosted URL shortener.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/yourls)

## About

**YOURLS** is a set of PHP scripts that will allow you to run **Y**our **O**wn **URL** **S**hortener, on **your** server. You'll have full control over your data, detailed stats, analytics, plugins, and more. It's free and open-source.

### Post-Deployment Setup

Once both services are running, click on the `yourls` service and visit the `.railway.app` domain generated for it. You can also add your own domain now, if you prefer.

When you visit the URL, **you should see a “Forbidden” message**

&gt; **If you see a Railway error**, you’ll need to configure the ports for your app:
&gt; 
&gt; 1.  In Railway, click on the `yourls` service.
&gt; 2.  Navigate to **Settings**, then scroll down to **Networking**.
&gt; 3.  Click on the Edit Icon, then click on **→ Edit Port**.
&gt; 4.  If port `80` is showing, select that one. Otherwise, click **\+ Custom Port**, then enter `80`.
&gt; 5.  Click on **Update**, and your domain should now work!

From the domain with the “Forbidden” message, add `/admin` to the end of the URL. This should redirect you to an installation page.

1.  Click on the **Install YOURLS** button.
2.  Once everything is successful, click on the **YOURLS Administration Page** link.
3.  Your username and password are created as part of the template.
    1.  In Railway, click on the `yourls` service.
    2.  Navigate to **Variables**, then scroll down until you see `YOURLS_PASS`.
        - _Note that there is a variable with the name_ YOURLS_DB_PASS _— ignore this one._
    3.  Hover over the variable and click the Copy button that appears.
    4.  Head back to the login page and enter `admin` as the username (unless you changed it in the Variables tab) and the password you copied.
4.  You should now be signed in to your YOURLS instance!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| yourls | `yourls:latest` | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `YOURLS_PASS` | yourls | - | YOURLS instance password. |
| `YOURLS_SITE` | yourls | - | YOURLS instance URL, no trailing slash, lowercase. |
| `YOURLS_USER` | yourls | (secret) | YOURLS instance username. |
| `YOURLS_DB_HOST` | yourls | - | Host for the database. |
| `YOURLS_DB_NAME` | yourls | - | Database name. The database must have been created before installing YOURLS. |
| `YOURLS_DB_PASS` | yourls | - | Password for the database. |
| `YOURLS_DB_USER` | yourls | (secret) | User for the database. |
| `YOURLS_DB_PREFIX` | yourls | - | Database tables prefix, defaults to `yourls_`. Only set this when you need to override the default table prefix. |
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
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/template/yourls)
