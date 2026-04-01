# Deploy Wordpress with File manager on Railway

Developer-friendly Wordpress with Cloud9 IDE

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-with-file-manager)

## About

![intro](https://raw.githubusercontent.com/lequanghuylc/wordpress-cloud-ide/main/intro.png)

This template run latest Wordpress verions with developer-friendly experience
- File manager via Cloud9 IDE
- Full access to terminal and WP CLI
- Debug log enabled and rotatable
- Bundled with multiple dev tools (Git, zip, unzip, nodejs, pm2)
- Seamless deployment experience for non-tech users

### Default domains

After the template is deployed, you can click the domain in networking section of **wordpress-cloud-ide** and begin the installation there

![wordpress domain](https://github.com/lequanghuylc/wordpress-cloud-ide/raw/main/wordpress-networking-domain.png)

To access the Cloud9 IDE, navigate to **Railway Addition Domains** container and click the domain there

![c9 domain](https://github.com/lequanghuylc/wordpress-cloud-ide/raw/main/c9-domain.png)

### Add/Change domains

You can change the default domain provided by Railway, or you can add your custom domain and point it to port 8080. After that, you need to add WP_HOME and WP_SITEURL to prevent wordpress keep redirecting to the old urls

![change domains](https://github.com/lequanghuylc/wordpress-cloud-ide/raw/main/change-domains.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Railway-Addition-Domains | [lequanghuylc/Railway-Addition-Domains](https://github.com/lequanghuylc/Railway-Addition-Domains) | Web service |
| wordpress-cloud-ide | [lequanghuylc/wordpress-cloud-ide](https://github.com/lequanghuylc/wordpress-cloud-ide) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `C9SDK_PASSWORD` | wordpress-cloud-ide | (secret) | Password to use with Cloud9 IDE, username is c9sdk |
| `WORDPRESS_DB_HOST` | wordpress-cloud-ide | - | Database host |
| `WORDPRESS_DB_NAME` | wordpress-cloud-ide | - | Database name |
| `WORDPRESS_DB_PORT` | wordpress-cloud-ide | - | Database port |
| `WORDPRESS_DB_USER` | wordpress-cloud-ide | (secret) | Database user |
| `WORDPRESS_DB_PASSWORD` | wordpress-cloud-ide | (secret) | Database password |
| `WORDPRESS_INITIAL_VERSION` | wordpress-cloud-ide | latest | Initial version, default to latest |
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
- **Volume:** `/var/www/html/wordpress`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/wordpress-with-file-manager)
