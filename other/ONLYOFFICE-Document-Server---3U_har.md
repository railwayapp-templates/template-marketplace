# Deploy ONLYOFFICE Document Server on Railway

Your private office anywhere you go!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/3U_har)

## About

![](https://link.storjshare.io/jukdnr5svii77oxqkn3csr7lnyka/readme-photos%2Fonlyoffice-doc-server%2Fonlyoffice.png?view=1)

## ONLYOFFICE Docs

_ONLYOFFICE Docs is an online office suite comprising viewers and editors for texts, spreadsheets and presentations, fully compatible with Office Open XML formats: .docx, .xlsx, .pptx and enabling collaborative editing in real time._

![ONLYOFFICE sample Page](https://link.storjshare.io/jwffkyhp563fnz6hnyrqcxwjsa3a/readme-photos%2Fonlyoffice-doc-server%2Fonlyoffice-sample-open-doc-template.png?view=1)

## Highlights

- Document Editor
- Spreadsheet Editor
- Presentation Editor
- Mobile web viewers
- Collaborative editing
- Hieroglyph support
- Support for all the popular formats: DOC, DOCX, TXT, ODT, RTF, ODP, EPUB, ODS, XLS, XLSX, CSV, PPTX, HTML

## How To Use

1. After deploy, take note of both the **JWT_SECRET** that will be randomly generated and the **URL** that is generated for your server.
2. If not integrating with Nextcloud, please visit the [ONLYOFFICE docs](https://helpcenter.onlyoffice.com/) for more info.
3. If integrating with Nextcloud, first make sure to install the **ONLYOFFICE app**, then navigate to **Administration Settings &gt; ONLYOFFICE**
4. Enter the URL from the railway service as the **ONLYOFFICE Docs address**
5. Enter the JWT_SECRET and the **Secret Key**
6. Click **Save** 
6. Enjoy ONLYOFFICE!

## Learn More

- [ONLYOFFICE website](https://www.onlyoffice.com/)
- [ONLYOFFICE docs](https://helpcenter.onlyoffice.com/installation/docs-community-install-docker.aspx)
- [LICENSE](https://github.com/ONLYOFFICE/DocumentServer/blob/master/LICENSE.txt)

---

<a href="https://www.buymeacoffee.com/bamtech"><img style="height: 60px !important;width: 217px !important;" alt="Buy Me A Coffee" src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png"></a>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| onlyoffice-docserver | `onlyoffice/documentserver` | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | onlyoffice-docserver | 80 | Port the docs server runs on |
| `DB_PWD` | onlyoffice-docserver | - | To map DB password with railway variable |
| `DB_HOST` | onlyoffice-docserver | - | To map DB host with railway variable |
| `DB_NAME` | onlyoffice-docserver | - | To map DB name with railway variable |
| `DB_PORT` | onlyoffice-docserver | - | To map DB port with railway variable |
| `DB_TYPE` | onlyoffice-docserver | mysql | Database type for the server to use |
| `DB_USER` | onlyoffice-docserver | (secret) | To map DB host with railway variable |
| `JWT_SECRET` | onlyoffice-docserver | (secret) | Secret for authentication to the server. Use this randomly generated or substitute your own |
| `JWT_ENABLED` | onlyoffice-docserver | true | Add a layer of security using JWT token |
| `WOPI_ENABLED` | onlyoffice-docserver | true | Enable WOPI feature |
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

**Category:** Other

[View on Railway →](https://railway.com/deploy/3U_har)
