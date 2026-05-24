# Deploy Ghost CMS + MySQL on Railway

Ghost 6 with MySQL 8, volumes, private networking, and safer startup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-cms-mysql)

## About

Run Ghost 6 on Railway with MySQL 8, persistent content storage, persistent database storage, private networking, and a Railway public domain.

- `ghost`: official `ghost:6-alpine` image exposed on port `2368`
- `mysql`: official `mysql:8.4` image on Railway private networking
- Persistent Ghost content volume at `/var/lib/ghost/content`
- Persistent MySQL volume at `/var/lib/mysql`
- Generated MySQL application and root passwords
- Ghost configured with Railway's public domain and private MySQL host

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql | `mysql:8.4` | Database |
| ghost | `ghost:6-alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_USER` | mysql | (secret) | Application username Ghost uses to connect to MySQL. |
| `MYSQL_DATABASE` | mysql | ghost | Database name created for the Ghost application. |
| `MYSQL_PASSWORD` | mysql | (secret) | Generated password for the Ghost MySQL application user. |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) | Generated root password for administrative MySQL access. |
| `url` | ghost | - | Ghost site URL. Railway fills this from the generated public domain. |
| `PORT` | ghost | 2368 | Railway HTTP proxy port for the Ghost service. |
| `server__host` | ghost | 0.0.0.0 | Bind Ghost to all network interfaces inside the container. |
| `server__port` | ghost | 2368 | Ghost application port exposed by the container. |
| `database__client` | ghost | mysql | Database driver Ghost should use. |
| `database__connection__host` | ghost | - | Private hostname for the MySQL service on Railway. |
| `database__connection__port` | ghost | 3306 | Internal MySQL port. |
| `database__connection__user` | ghost | (secret) | MySQL user Ghost uses for application queries. |
| `database__connection__database` | ghost | - | MySQL database Ghost stores content in. |
| `database__connection__password` | ghost | (secret) | Password for the Ghost MySQL application user. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -lc 'set -eu; host="${database__connection__host:-mysql.railway.internal}"; port="${database__connection__port:-3306}"; attempt=1; until node -e "const net=require(process.argv[3]); const socket=net.createConnection({host:process.argv[1],port:Number(process.argv[2])},()=>process.exit(0)); socket.setTimeout(3000); socket.on(process.argv[4],()=>process.exit(1)); socket.on(process.argv[5],()=>process.exit(1));" "$host" "$port" net error timeout; do if [ "$attempt" -ge 60 ]; then echo "MySQL did not become reachable at $host:$port"; exit 1; fi; echo "Waiting for MySQL at $host:$port ($attempt/60)"; attempt=$((attempt + 1)); sleep 2; done; exec docker-entrypoint.sh node current/index.js'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/ghost-cms-mysql)
