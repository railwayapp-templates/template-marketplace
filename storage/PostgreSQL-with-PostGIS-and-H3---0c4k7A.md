# Deploy PostgreSQL with PostGIS and H3 on Railway

Postgres image supporting PostGIS and Uber's H3 extensions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/0c4k7A)

## About

## PostGIS with H3 Extension Railway Template

This template provides a PostgreSQL database with PostGIS and Uber's H3 extension pre-installed, ready to deploy on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/0c4k7A?referralCode=8bSENY)

## Features

- PostgreSQL 16
- PostGIS 3.4
- Uber's H3 postgres extension bindings for hexagonal hierarchical geospatial indexing [https://github.com/postgis/h3-pg](https://github.com/postgis/h3-pg)
- Pre-configured extensions and dependencies

## Prerequisites

- A Railway account
- Railway CLI (optional, for local development)

## Environment Variables

These are the required Postgres variables, which can be modified before deployment; they contain the default values.

```env
POSTGRES_DB=postgres-h3-db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

## Local Development

Clone this repository:

```bash
git clone 
cd postgres-h3
```

## Running using Docker

Start the database using Docker Compose:

```bash
docker-compose up -d
```

Connect to the database:

```bash
psql -h localhost -p 54040 -U postgres -d postgres-h3-db
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Developed and maintained by [Chike Ozulumba](https://chikeozulumba.com). For issues or suggestions, please open an issue on the [GitHub repository](https://github.com/chikeozulumba/postgres-h3-railway).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chikeozulumba/postgres-postgis-h3 | `chikeozulumba/postgres-postgis-h3` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | postgres-h3-db |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432

**Category:** Storage

[View on Railway →](https://railway.com/deploy/0c4k7A)
