# Deploy MariaDB Starter Package on Railway

Deploys MariaDB with Adminer UI from a repo

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/BrjaHe)

## About

## What is MariaDB?
MariaDB Server is one of the most popular database servers in the world. It's made by the original developers of MySQL and guaranteed to stay open source. Notable users include Wikipedia, DBS Bank, and ServiceNow.

The intent is also to maintain high compatibility with MySQL, ensuring a library binary equivalency and exact matching with MySQL APIs and commands. MariaDB developers continue to develop new features and improve performance to better serve its users.

## ✨ Services
- MariaDB
- Adminer (Web GUI for Database management)

## 💁‍♀️ How to use

- Click the Railway button 👆
- Add the required environment variables. For more environment variables check the [official docs](https://mariadb.com/kb/en/mariadb-server-docker-official-image-environment-variables/)
- `init_db.sql` &amp; `create_user.sql` are custom scripts that will be executed on startup. You can customize them as per your needs.
- Deploy
- To access the Adminer GUI, use the railway public url. For example: `https://PROJECT_NAME.up.railway.app/`
![login](https://raw.githubusercontent.com/railwayapp-templates/mariadb/main/img/login.png)
- You can login into adminier with Server as `database` and username & password which you configured during service configuration or you can find under environmental variable for database service in Railway UI.
- You can utilize the railway internal network to connect to the database from other services.  For example `database.railway.internal` should be your database host.
- You can view list of databases and tables in the Adminer GUI
![adminer](https://raw.githubusercontent.com/railwayapp-templates/mariadb/main/img/database.png)
- To view tables within a database, click on the database name
![tables](https://raw.githubusercontent.com/railwayapp-templates/mariadb/main/img/adminer.png)
- Adminer also provides option to view table column infomration 
![columns](https://raw.githubusercontent.com/railwayapp-templates/mariadb/main/img/viewtable.png)
- You can edit and modify table structure using Adminer
![edit](https://raw.githubusercontent.com/railwayapp-templates/mariadb/main/img/updatetable.png)
- Table can be created from UI as well
![create](https://raw.githubusercontent.com/railwayapp-templates/mariadb/main/img/createtable.png)
- It also provider option to execute custom sql queries. By clicking on `SQL Command` you should be able to write your own sql and query the table you want.
![custom](https://raw.githubusercontent.com/railwayapp-templates/mariadb/main/img/customquery.png)
- To include your application make sure to create a separate folder and add new service. Use internal network to connect to db.
- Enjoy!

## 📝 Notes

- Source repo: https://github.com/MariaDB/mariadb-docker
- Docs: https://mariadb.com/kb/en/
- Adminer: https://www.adminer.org/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Adminer | [railwayapp-templates/mariaDB](https://github.com/railwayapp-templates/mariaDB) (root: /Adminer) | Web service |
| Database | [railwayapp-templates/mariaDB](https://github.com/railwayapp-templates/mariaDB) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Adminer | 8080 | - |
| `MARIADB_USER` | Database | (secret) | Database User |
| `MARIADB_PASSWORD` | Database | (secret) | User password |
| `MARIADB_DATABASE ` | Database | - | This variable allows you to specify the name of a database to be created on image startup. |
| `MARIADB_ROOT_PASSWORD` | Database | (secret) | Random Password for root user |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/BrjaHe)
