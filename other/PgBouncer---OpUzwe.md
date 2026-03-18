# Deploy PgBouncer on Railway

Lightweight connection pooler for PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/OpUzwe)

## About

# PgBouncer

### Lightweight connection pooler for PostgreSQL

**Notes**
- This template assumes you have a database named `Postgres` in your project before deploying this template, if this isn't the case please adjust the reference variables so they reference the correct namespace.

pgbouncer is a PostgreSQL connection pooler. Any target application can be connected to pgbouncer as if it were a PostgreSQL server, and pgbouncer will create a connection to the actual server, or it will reuse one of its existing connections.

The aim of pgbouncer is to lower the performance impact of opening new connections to PostgreSQL.

In order not to compromise transaction semantics for connection pooling, pgbouncer supports several types of pooling when rotating connections.

**Extra configurations can be done with the environment variables found on [bitnami's pgbouncer image overview page](https://hub.docker.com/r/bitnami/pgbouncer)**

## How to add a Userlist to PgBouncer

_If you have already created a new user, skip to step 2._

1. Connect to the base Postgres database and create a new user -

```sql
CREATE USER 'new_user' WITH PASSWORD 'my_password';
ALTER USER new_user WITH LOGIN;
GRANT ALL PRIVILEGES ON DATABASE railway TO new_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO new_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO new_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO new_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO new_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO new_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO new_user;
```

Replace `new_user` and `my_password` with your desired username and a secure password.

Add or remove any privileges as you see fit.

2. Grab the rolpassword for the newly created user

```sql
SELECT rolpassword FROM pg_authid WHERE rolname = 'new_user';
```

Replace `new_user` with the username created in the first step.

Copy down the returned value from the `rolpassword` column.

3. Set the `PGBOUNCER_USERLIST` service variable.

Notes - 
- This must be done using the Raw Editor option to avoid unnecessary string sanitations.

- The value for this variable should be encapsulated in quotes as shown.

```plaintext
PGBOUNCER_USERLIST=""new_user" "rolpassword""
```

Replace `new_user` with the username created in the first step, and replace `rolpassword` with the returned value from the previous step.

4. Deploy your changes.

5. **Done!** - Connect to PgBouncer using the username and password of the user created in the first step!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PgBouncer | `railwayapp/pgbouncer:latest` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATABASE_URL` | - | Private Database URL for PgBouncer |
| `POSTGRESQL_HOST` | - | Default Host reference variable<br>change namespace if needed |
| `POSTGRESQL_PORT` | 5432 | Default internal Port that Postgres listens on |
| `PGBOUNCER_DATABASE` | - | Expose the same database as passed in |
| `DATABASE_PUBLIC_URL` | - | Public Database URL for PgBouncer |
| `PGBOUNCER_POOL_MODE` | session | PgBouncer pool mode. Allowed values: session, transaction and statement. Default: session |
| `POSTGRESQL_DATABASE` | - | Default Database reference variable<br>change namespace if needed |
| `POSTGRESQL_PASSWORD` | (secret) | Default Password reference variable<br>change namespace if needed |
| `POSTGRESQL_USERNAME` | (secret) | Default Username reference variable<br>change namespace if needed |
| `PGBOUNCER_LISTEN_ADDRESS` | * | Listen on both IPv6 and IPv4 interfaces |
| `PGBOUNCER_MAX_CLIENT_CONN` | 120 | PgBouncer maximum number of client connections allowed. Default: 120 |
| `PGBOUNCER_DEFAULT_POOL_SIZE` | 20 | PgBouncer maximum server connections to allow per user/database pair. Default: 20 |

## Configuration

- **TCP Proxies:** 6432

**Category:** Other

[View on Railway →](https://railway.com/template/OpUzwe)
