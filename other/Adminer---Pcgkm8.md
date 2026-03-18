# Deploy Adminer on Railway

A full-featured database management tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Pcgkm8)

## About

<p align="center">
    <a href="https://www.adminer.org/">
        <img style="background: #fff; padding: 30px; border-radius: 5px; width: 300px;" src="https://res.cloudinary.com/h5kvzw/image/upload/v1705208103/logo_n5edl7.png" alt="adminer logo">
    </a>
</p>

<h3 align="center">A full-featured database management tool</h3>

Adminer (formerly phpMinAdmin) is a full-featured database management tool written in PHP. Conversely to phpMyAdmin, it consist of a single file ready to deploy to the target server. Adminer is available for MySQL, MariaDB, PostgreSQL, SQLite, MS SQL, Oracle, Elasticsearch, MongoDB and others via plugin.

Replace phpMyAdmin with Adminer and you will get a tidier user interface, better support for MySQL features, higher performance and more security.

Adminer development priorities are: 1. Security, 2. User experience, 3. Performance, 4. Feature set, 5. Size.

Features
- Connect to a database server with username and password
- Select an existing database or create a new one
- List fields, indexes, foreign keys and triggers of table
- Change name, engine, collation, auto_increment and comment of table
- Alter name, type, collation, comment and default values of columns
- Add and drop tables and columns
- Create, alter, drop and search by indexes including fulltext
- Create, alter, drop and link lists by foreign keys
- Create, alter, drop and select from views
- Create, alter, drop and call stored procedures and functions
- Create, alter and drop triggers
- List data in tables with search, aggregate, sort and limit results
- Insert new records, update and delete the existing ones
- Supports all data types, blobs through file transfer
- Execute any SQL command from a text field or a file
- Export table structure, data, views, routines, databases to SQL or CSV
- Print database schema connected by foreign keys
- Show processes and kill them
- Display users and rights and change them
- Display variables with links to documentation
- Manage events and table partitions (MySQL 5.1)
- Schemas, sequences, user types (PostgreSQL)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Adminer | `adminer` | Web service |

## Configuration

- **Start command:** `/bin/sh -c "entrypoint.sh php -S [::]:${PORT} -t /var/www/html"`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/Pcgkm8)
