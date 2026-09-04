# Deploy CloudBeaver on Railway

Browser-based database manager with a SQL editor and data grid

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudbeaver-sql)

## About

CloudBeaver is the browser-based database manager built by the team behind DBeaver. It gives you a full SQL workbench in a tab: a schema navigator, a SQL editor with autocomplete and execution plans, an editable results grid, ER diagrams, CSV and JSON import and export, and an admin panel for users and shared connections. It speaks PostgreSQL, MySQL, SQLite, ClickHouse, SQL Server, Oracle, MongoDB and roughly ninety other engines through JDBC, so one deployment covers every database your team touches.

Deploy CloudBeaver on Railway and you get two services wired together. `cloudbeaver` runs the Community Edition behind a public HTTPS domain and keeps its workspace — saved scripts, connections, users and teams — on a persistent volume. `Postgres` is a managed PostgreSQL instance on the private network, already registered inside CloudBeaver as a connection named **Railway Postgres**, credentials included. You self-host CloudBeaver without touching a config file: the administrator is created from environment variables on first boot, so no setup wizard sits open on a public URL.

![Diagram of the CloudBeaver and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788477860/cloudbeaver-architecture.png)

CloudBeaver solves a problem every team with a shared database hits: everyone needs SQL access, nobody wants to hand out production credentials, and desktop clients scatter them across laptops. Self-hosting puts them in one place, behind one login, on infrastructure you control.

Key capabilities:

- SQL editor with autocomplete, execution plans and saved scripts
- Editable data grid with filtering, sorting and value/grouping panels
- Schema navigator for tables, views, indexes and functions
- ER diagrams generated from live foreign keys
- Import from CSV; export results to CSV, JSON, XML or SQL inserts
- Users, teams and permissions, plus shared connections defined once by an admin
- Roughly ninety JDBC drivers bundled, so most engines need no extra setup

The architecture is deliberately small. `cloudbeaver` is a Java application on Jetty; its state is the workspace directory on the volume, holding an embedded H2 database for users, teams and connection credentials plus saved scripts. `Postgres` makes the deployment useful the moment it finishes and doubles as a real database you can build on.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cloudbeaver | [gridalpha/cloudbeaver-railway](https://github.com/gridalpha/cloudbeaver-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | cloudbeaver | 8080 | Port the health endpoint listens on |
| `JAVA_OPTS` | cloudbeaver | -XX:MaxRAMPercentage=70 | JVM heap ceiling |
| `CB_ADMIN_NAME` | cloudbeaver | cbadmin | Administrator created on first boot |
| `CB_SERVER_NAME` | cloudbeaver | CloudBeaver | Non-empty value skips the setup wizard |
| `CB_ADMIN_PASSWORD` | cloudbeaver | (secret) | Administrator password, first boot only |
| `CB_SEED_CONNECTION_HOST` | cloudbeaver | - | Seeded connection host |
| `CB_SEED_CONNECTION_NAME` | cloudbeaver | Railway Postgres | Label of the seeded connection |
| `CB_SEED_CONNECTION_PORT` | cloudbeaver | - | Seeded connection port |
| `CB_SEED_CONNECTION_USER` | cloudbeaver | (secret) | Seeded connection user |
| `CLOUDBEAVER_FORCE_HTTPS` | cloudbeaver | true | Marks the session cookie Secure |
| `CB_SEED_CONNECTION_DRIVER` | cloudbeaver | postgres-jdbc | JDBC driver id of the seeded connection |
| `CB_SEED_CONNECTION_DATABASE` | cloudbeaver | - | Seeded connection database |
| `CB_SEED_CONNECTION_PASSWORD` | cloudbeaver | (secret) | Seeded connection password |
| `CLOUDBEAVER_WEB_SERVER_PORT` | cloudbeaver | 8978 | CloudBeaver HTTP port, the domain target |
| `CLOUDBEAVER_BIND_SESSION_TO_IP` | cloudbeaver | disable | Edge address rotates per request |
| `CLOUDBEAVER_APP_ANONYMOUS_ACCESS_ENABLED` | cloudbeaver | false | Require a login for every page |
| `CLOUDBEAVER_APP_SUPPORTS_CUSTOM_CONNECTIONS` | cloudbeaver | true | Let users add own connections |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/cloudbeaver/workspace`

**Category:** Other · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/cloudbeaver-sql)
