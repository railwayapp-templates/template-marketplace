# Deploy mediawiki on Railway

Deploy and Host MediaWiki on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mediawiki)

## About

The MediaWiki software is used by tens of thousands of websites and thousands of companies and organisations. It powers Wikipedia and also this website. MediaWiki helps you collect and organise knowledge and make it available to people. It's powerful, multilingual, free and open, extensible, customisable, reliable.

***Note:*** Deploying on a free plan may take up to 10 minutes to download and run all the containers

This template runs [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki) version `1.43` and can be deployed in 1-click with all the defaults. In that case you should use the following default Admin user credentials to login into your wiki:

- Username: `Admin`
- Password: `Passsw0rd!`

And once logged in - change your password on the Preferences page.

If you would like to change the credentials before  deploying you have to update the following variables:

- `MW_ADMIN_USER` - the username of the wiki admin user to be created, for example `Admin`
- `MW_ADMIN_PASS` - the password for the admin user. The password must be 10 chars length min. and contain a number and a special character, i.e. `Passsw0rd!`

In  addition, the wiki name (aka site-name) can be  controlled by the following variable:

- `MW_SITE_NAME` - the name of your wiki, can be any string, i.e. `My Wiki`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:8.0` | Database |
| wikiteq/taqasta:latest | `ghcr.io/wikiteq/taqasta:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Redis private host |
| `REDISPORT` | Redis | 6379 | Redis port |
| `REDISUSER` | Redis | default | Redis user |
| `REDIS_URL` | Redis | - | Redis connection string |
| `MYSQLHOST` | MySQL | - | Database host |
| `MYSQLPORT` | MySQL | 3306 | Database port |
| `MYSQLUSER` | MySQL | root | Database user |
| `MYSQL_URL` | MySQL | - | Connection string |
| `MYSQLDATABASE` | MySQL | mediawiki | Database name |
| `MYSQLPASSWORD` | MySQL | (secret) | User password |
| `MYSQL_DATABASE` | MySQL | mediawiki | Database  name |
| `MYSQL_PUBLIC_URL` | MySQL | - | Database public  URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password |
| `PORT` | wikiteq/taqasta:latest | 80 | Container port |
| `MW_DB_NAME` | wikiteq/taqasta:latest | - | Database name |
| `MW_DB_PASS` | wikiteq/taqasta:latest | - | Database password |
| `MW_DB_TYPE` | wikiteq/taqasta:latest | mysql | Database type |
| `MW_DB_USER` | wikiteq/taqasta:latest | (secret) | Database user name |
| `MW_DB_SERVER` | wikiteq/taqasta:latest | - | Database server |
| `MW_SITE_LANG` | wikiteq/taqasta:latest | en | Site language |
| `MW_SITE_NAME` | wikiteq/taqasta:latest | MyWiki | Display name of your wiki, i.e. "MyWiki" |
| `MW_ADMIN_PASS` | wikiteq/taqasta:latest | Passsw0rd! | Admin  user password, min. 10 chars, i.e. "Passsw0rd!" |
| `MW_ADMIN_USER` | wikiteq/taqasta:latest | (secret) | Admin username, i.e. "Admin" |
| `MW_LOAD_SKINS` | wikiteq/taqasta:latest | Vector,chameleon | Skins to  load |
| `MW_SITE_SERVER` | wikiteq/taqasta:latest | - | Wiki public URL |
| `MW_DEFAULT_SKIN` | wikiteq/taqasta:latest | vector | Default skin to use |
| `MW_ENABLE_EMAIL` | wikiteq/taqasta:latest | 1 | Enable email features |
| `MW_REDIS_SERVERS` | wikiteq/taqasta:latest | - | Redis cache server and port |
| `MW_ENABLE_UPLOADS` | wikiteq/taqasta:latest | 1 | Enable file uploads |
| `PHP_POST_MAX_SIZE` | wikiteq/taqasta:latest | 100M | Max  file upload  size |
| `MW_LOAD_EXTENSIONS` | wikiteq/taqasta:latest | ImageMap,InputBox,MathJax,Nuke,ParserFunctions,ReplaceText,Renameuser,Scribunto,SyntaxHighlight_GeSHi,Widgets,WikiEditor,CodeEditor,VisualEditor,Elastica,CirrusSearch,Echo,Cite,ExternalData,SemanticMediaWiki | Extensions to load |
| `MW_MAIN_CACHE_TYPE` | wikiteq/taqasta:latest | CACHE_REDIS | Cache type |
| `MW_USE_IMAGE_MAGIC` | wikiteq/taqasta:latest | 1 | Enable  ImageMagick for image conversions |
| `MW_DB_INSTALLDB_PASS` | wikiteq/taqasta:latest | - | Database password for install user |
| `MW_DB_INSTALLDB_USER` | wikiteq/taqasta:latest | (secret) | Database user to install wiki |
| `MW_ENABLE_USER_EMAIL` | wikiteq/taqasta:latest | 1 | Enable user email features |
| `PHP_UPLOAD_MAX_FILESIZE` | wikiteq/taqasta:latest | 100M | Max file upload size |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G  --default-authentication-plugin=caching_sha2_password --log-bin --binlog-expire-logs-seconds=172800`
- **Volume:** `/var/lib/mysql`
- **Start command:** `bash -c "rm -f /etc/apache2/sites-enabled/000-default.conf && rm -f /etc/apache2/sites-available/000-default.conf && rm -rf /var/www/html && /run-apache.sh"`
- **Healthcheck:** `/w/api.php`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mediawiki`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/mediawiki)
