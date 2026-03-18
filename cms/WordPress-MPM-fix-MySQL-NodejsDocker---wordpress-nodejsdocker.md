# Deploy WordPress (MPM fix + MySQL + Node.js/Docker) on Railway

Supports seamless local dev (sync plugins/themes/uploads)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-nodejsdocker)

## About

# WordPress on Railway

Easily deploy [WordPress](https://wordpress.com/) on Railway with **seamless** support for **local development** out of the box.

This templates does not crash on deployment due to the [more than one MPM loaded](https://station.railway.com/questions/more-than-one-mpm-loaded-error-on-php-8-9c836859) error.

Focal point of this template compared to the others is the local development, so you can easily **create/manage** custom **WordPress plugins, themes and uploads** without relying on Railway's SSH to access the files.

The template is **flexible** and **extendable** so you can even use it in a **monorepo** or other project structures.

## Common Use Cases

- You prefer **self-hosting** WordPress.
- You want to **develop** WordPress **plugins and themes**.
- You want to use WordPress as a **headless CMS** (API) for your frontend application.
- You have an **existing WordPress** installation and want to migrate/use it on Railway.

## Deploy and Host

1. Click the button to use the template.
2. Follow the instructions (zero-config).
3. Open the URL assigned by Railway in your browser (eg. https://your-app-name.up.railway.app).
4. Enjoy!

### Deployment Dependencies

- [WordPress Docker image](https://hub.docker.com/_/wordpress/)
- [MySQL Docker image](https://hub.docker.com/_/mysql)
- [Node.js](https://nodejs.org) (optional - for local developyment)

### About Hosting

This template creates the Apache server (WordPress) and MySQL database for you.

The domain for the WordPress application will be the provided public domain by Railway or your own domain.

## Local Development

In case you want to develop WordPress locally.

- Manage plugins, themes and uploads locally in these directories:
  - `./data/plugins`
  - `./data/themes`
  - `./data/uploads`
- Will automatically sync local changes to WordPress.
- Add an existing WordPress installation in `./data/migrate` to use it as the base installation.
- Only `plugins`, `themes` and `uploads` are synced, the rest are ignored by default to avoid messing up the core files of WordPress.
  - Feel free to add more directories if you need them.

### Helper Commands

#### **`yarn start`**

Starts the WordPress server.

#### **`yarn stop`**

Stops the WordPress server.

#### **`yarn restart`**

Stops the WordPress server and then starts it again.

#### **`yarn clean`**

Stops the WordPress server and deletes the docker container including it's image and volumes.

**IMPORTANT:** This will delete all data in the volumes, so make sure you have a backup of your data before running this command.

#### **`yarn clean:restart`**

Stops the WordPress server, deletes the docker container including it's image/volumes and then starts the WordPress server again.

**IMPORTANT:** This will delete all data in the volumes, so make sure you have a backup of your data before running this command.

#### **`yarn dirs`**

Generates these directories:
- `data/plugins`
- `data/themes`
- `data/uploads`
- `data/migrate`

#### **`yarn dirs:clean`**

Removes all files and folders inside these directories:
- `data/plugins`
- `data/themes`
- `data/uploads`
- `data/migrate`

### Dependencies for this template

Prerequisites for local development.

- [Docker](https://www.docker.com/)
- [Node.js &amp; npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (optional)
  - Only required for running the helper commands (eg. `yarn start` and `yarn stop`) which are easier to remember and more efficient than using the docker commands manually.

### Setup

Assuming you have already deployed the template on Railway:

1. Clone the [upstream repository](https://github.com/deltabox-studio/wordpress-railway) or create a new one using it as a template.
2. Publish the repository to GitHub.
3. At Railway change the `Source Repo` to your cloned repository to automatically redeploy the service from your own GitHub commits (optional).
4. Either run:
   - `yarn install` and then `yarn start` to start the server.
   - or `docker compose -f compose.yaml up`.
5. Open http://localhost:8080 in your browser to access WordPress.

### Troubleshooting

Report any issues or suggestions on [GitHub](https://github.com/deltabox-studio/wordpress-railway/issues) or [Railway](https://station.railway.com/templates/word-press-node-js-docker-d054a70f).

#### Missing Directories

If you accidentally delete the directories `data/plugins`, `data/themes`, `data/uploads` or `data/migrate` you can run `yarn dirs` to recreate them.

#### "dependency failed to start: container wordpress-railway-wordpress-db-1 is unhealthy"

If you get this error upon container startup in your local environment, you should try one or more of the following:

- Stop the container with `yarn stop` or `docker compose -f compose.yaml down` and restart it with `yarn start` or `docker compose -f compose.yaml up`.
  
- If the issue persists, you can try to delete the container including it's image and volumes by running `yarn clean` or `docker compose -f compose.yaml down --volumes --rmi all` and then recreate it with `yarn start` or `docker compose -f compose.yaml up` (**IMPORTANT:** This will delete all data in the volumes, so make sure you have a backup of your data before running this command).

## Why Deploy this template on Railway?


Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying WordPress (Node.js/Docker) on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.


# License

- **WordPress:** [GPL-2.0 (GNU General Public License v2.0)](https://wordpress.org/about/license/).
- **MySQL:** [GPL-2.0 (GNU General Public License v2.0)](https://www.mysql.com/about/legal/licensing/oem/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| WordPress | [deltabox-studio/wordpress-railway](https://github.com/deltabox-studio/wordpress-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Database domain |
| `MYSQLPORT` | MySQL | - | Database port |
| `MYSQLUSER` | MySQL | root | Database user |
| `MYSQL_URL` | MySQL | - | Database URL |
| `MYSQLDATABASE` | MySQL | - | Database name |
| `MYSQLPASSWORD` | MySQL | (secret) | Database password |
| `MYSQL_DATABASE` | MySQL | railway | Database name |
| `MYSQL_PUBLIC_URL` | MySQL | - | Database public URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Database Password |
| `PORT` | WordPress | 80 | Port for the Apache server |
| `WORDPRESS_DB_HOST` | WordPress | - | WordPress Database Host URL |
| `WORDPRESS_DB_NAME` | WordPress | - | WordPress Database Name |
| `WORDPRESS_DB_USER` | WordPress | (secret) | WordPress Database User |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) | WordPress Database Password |
| `WORDPRESS_CONFIG_EXTRA` | WordPress | - | Extra config for wp-config.php file |
| `WORDPRESS_WEBHOOK_SECRET` | WordPress | (secret) | WordPress Webhook Secret |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** CMS · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/wordpress-nodejsdocker)
