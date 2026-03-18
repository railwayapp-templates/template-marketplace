# Deploy Apache Guacamole on Railway

Clientless remote desktop gateway for protocols like VNC, RDP, and SSH

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/apache-guacamole)

## About

Apache Guacamole is a clientless remote desktop gateway that lets you access servers and desktops directly from your browser using protocols like RDP, VNC, and SSH without installing any client software.

Hosting Apache Guacamole involves running the Guacamole web application alongside `guacd`, the proxy daemon responsible for handling remote desktop protocols, and a database for authentication and configuration storage. This template deploys Guacamole with PostgreSQL authentication, using Railway’s managed networking to securely connect services internally. Once deployed, you can manage users, connections, and permissions entirely through the Guacamole web interface, making it ideal for browser-based remote access without VPNs or client installations.

By default, the Guacamole web interface is served under the `/guacamole` path. After deployment, you can access the UI at:
<br>`https:///guacamole`

If you see a generic Tomcat page or a 404 at the root URL (`/`), this is expected behavior, Guacamole is not hosted at the root context by default.

After the first deployment, Guacamole automatically creates a default administrative account.

- **Username:** `guacadmin`  
- **Password:** `guacadmin`  

For security reasons, you should change this password immediately after logging in. To do so, open the **user menu (top-right corner)**, choose **Settings → Preferences**, and update the password using the **Change Password** section. The password cannot be changed from the general user-edit screen and must be updated via the dedicated password menu.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| guacd | `guacamole/guacd` | Worker |
| guacamole-railway | [decoge/guacamole-railway](https://github.com/decoge/guacamole-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `GUACD_PORT` | guacamole-railway | 4822 | Port on which guacd is listening (default: 4822) |
| `GUACD_HOSTNAME` | guacamole-railway | guacd | Hostname of the guacd service (Guacamole proxy daemon for RDP/VNC/SSH) |
| `POSTGRESQL_PORT` | guacamole-railway | - | Port used by the PostgreSQL service (default: 5432) |
| `POSTGRESQL_DATABASE` | guacamole-railway | - | Name of the PostgreSQL database used by Guacamole |
| `POSTGRESQL_HOSTNAME` | guacamole-railway | - | Hostname of the PostgreSQL service (Railway-managed) |
| `POSTGRESQL_PASSWORD` | guacamole-railway | (secret) | Password for the PostgreSQL user |
| `POSTGRESQL_USERNAME` | guacamole-railway | (secret) | PostgreSQL username used by Guacamole |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/apache-guacamole)
