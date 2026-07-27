# Deploy SQLite | Database on a Volume with a Web UI on Railway

SQLite on a volume with a web UI, current Python and enforced auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sqlite-or-database-on-a-volume-with-a-we)

## About

A SQLite database on a persistent volume, with a web UI in front of it, on a Python that still gets security patches.

The SQLite template on Railway builds from a repository last touched in January 2024, and its Dockerfile begins:

```
FROM python:3.7-alpine3.17
RUN pip install gevent sqlite_web
```

Python 3.7 reached end of life in June 2023 - no security patches for over two years. The two packages are then installed unpinned into that runtime, so pip resolves whatever last version still claimed 3.7 support. A third of its deployments never come up, and some that build fail at runtime with `peewee.OperationalError: unable to open database file`.

This one runs Python 3.13 with both packages pinned, and fixes two things the original leaves to chance.

**It refuses to start without a password.** The original leaves WEB_USERNAME empty as a required field. This one checks WEB_PASSWORD in the entrypoint and exits with a clear message rather than ever putting an unauthenticated database browser on a public domain.

**It turns on WAL.** `PRAGMA journal_mode=WAL` lets readers and the writer work at the same time instead of blocking each other. Without it SQLite serialises everything, which is most of why people conclude it does not work for web apps.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SQLite | [ak40u/sqlite-web-railway-starter](https://github.com/ak40u/sqlite-web-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `WEB_PASSWORD` | (secret) |
| `DATABASE_PATH` | /data/database.db |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/sqlite-or-database-on-a-volume-with-a-we)
