# Deploy DBX on Railway

Web database client for Postgres, MySQL, Redis, Mongo and 100+ more + MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dbx)

## About

[DBX](https://github.com/t8y2/dbx) is a database client for 100+ databases, including PostgreSQL, MySQL, Redis, MongoDB, SQLite, DuckDB and SQL Server, with a SQL editor, table browser, AI assistant and an MCP server. This template runs its web version, pinned to 0.6.26.

Put DBX in the same Railway project as your databases and it reaches them over the private network, so you browse and query them from the browser without opening a public TCP proxy on the database.

The login password is set before anyone can see the page. DBX Web asks the first visitor to choose a password unless `DBX_PASSWORD` is set; here it's generated at deploy and applied on every start, and the first-run setup call is refused. Five wrong passwords in a row lock the login for about a minute.

DBX's own MCP endpoint is on at `DBX_MCP_URL`, behind a generated bearer token (`DBX_WEB_MCP_TOKEN`), so Claude Code, Cursor or another MCP client can list tables and run queries through the connections you saved. Only your Railway domain is accepted as the host; add a custom domain to `DBX_WEB_MCP_ALLOWED_HOSTS` if you use one. Remove the token variable to turn MCP off.

Connections, their encrypted passwords and the key that encrypts them are stored in `/app/data`, which is a volume here, so they survive redeploys.

Before publishing I tested it on Railway with a Postgres in the same project. Without the password the API answered 401, a stranger's first-run setup got 403 and a wrong password 401. Signed in, I saved a connection to `postgres.railway.internal`, created a table, wrote a row and read it back. Over MCP, a request without the token got 401; with it, DBX listed 23 tools and `dbx_execute_query` returned the same row through the saved connection. After a restart I signed in again, the connection was still there and both the web API and MCP read the row, which means the stored credentials and their key survived.

Idle, DBX used 0.01 GB of RAM (0.07 GB at most during the test).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DBX | `t8y2/dbx:0.6.26` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4224 | Port Railway routes to |
| `DBX_URL` | - | Open this and sign in with DBX_PASSWORD |
| `DBX_PORT` | 4224 | Port DBX listens on |
| `DBX_MCP_URL` | - | MCP endpoint for Claude Code, Cursor and other clients (send DBX_WEB_MCP_TOKEN as a Bearer token) |
| `DBX_PASSWORD` | (secret) | Web login password (generated). Applied at every start |
| `DBX_WEB_MCP_TOKEN` | (secret) | Bearer token for the MCP endpoint (generated). Remove it to turn MCP off |
| `DBX_WEB_MCP_ALLOWED_HOSTS` | - | Host names MCP clients may use. Add your custom domain here, comma-separated |

## Configuration

- **Healthcheck:** `/api/auth/check`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Tags:** dbx, database, database-client, postgres, mysql, redis, mongodb, mcp

[View on Railway →](https://railway.com/deploy/dbx)
