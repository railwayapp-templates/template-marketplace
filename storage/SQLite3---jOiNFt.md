# Deploy SQLite3 on Railway

SQLite3 is a lightweight database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jOiNFt)

## About

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/2560px-SQLite370.svg.png" style="max-width: 100%;">

<h1 align="center">SQLite Template</h1>

SQLite3 is a lightweight, serverless, open-source database engine used for local storage in applications. It requires no configuration and supports SQL for data manipulation.

# ✨ Features

- SQLite3 database
- SQLite Web Interface
- `trains` table with sample data about Thomas &amp; Friends (do you still need more features?)

# 🤔 How to use

## 🌎 WebUI Usage

1. Open the project named "SQLite Template"

2. Go to the "Variables" tab and view the `SQLITE_WEB_UI_PASSWORD` variable, this is the password you'll need to access the web interface

3. Back to `Deployments`, in the top you'll see a URL which you can use to access the web interface

4. Click on the URL and you'll be redirected to the web interface, type your password and you'll be able to manage your database

That's it! You can now manage your SQLite3.

## ⚙️ `seed_db.sql` Usage

After you've deployed this template, you'll find a copy of this project in your Github.  
From there you can populate `seed_db.sql` with your own SQL code.  
The file will only be executed when you change anything in it and will run only once.

## ⚙️ `init_db.sql` Usage

This file is used to initialize the database.  
It includes sample data for a `trains` table.

# 📙 Learn more

- [SQLite3](https://www.sqlite.org/index.html)
- [SQLite Web](https://github.com/coleifer/sqlite-web)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SQLite3 | [railwayapp-templates/sqlite](https://github.com/railwayapp-templates/sqlite) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SQLITE_WEB_UI_PASSWORD` | (secret) | The password which you'll use to access the WebUI Interface |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/template/jOiNFt)
