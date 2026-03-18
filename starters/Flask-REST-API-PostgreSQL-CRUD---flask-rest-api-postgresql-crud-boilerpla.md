# Deploy Flask REST API + PostgreSQL CRUD on Railway

A production-ready Flask REST API with CRUD, PostgreSQL, pagination.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flask-rest-api-postgresql-crud-boilerpla)

## About

Flask REST API + PostgreSQL CRUD Boilerplate is a production-ready, single-file Python REST API built with Flask and SQLAlchemy. It provides full CRUD operations, pagination, health checks, CORS support, and automatic PostgreSQL integration — ready to deploy in one click with zero configuration.

Hosting this boilerplate involves deploying a Flask web server alongside a PostgreSQL database. Railway handles both seamlessly — the Postgres plugin auto-injects `DATABASE_URL` into the environment, and the app picks it up at startup. Gunicorn serves the app in production behind Railway's built-in proxy and HTTPS. The boilerplate auto-creates database tables on first boot, so there's no manual migration step. Nixpacks detects the Python project and installs dependencies from `requirements.txt` automatically. Scaling, logging, and restarts are managed by Railway, making it ideal for beginners who want a working API without managing infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flask-restapi-postgresql | [Oclemy/flask-restapi-postgresql](https://github.com/Oclemy/flask-restapi-postgresql) | Worker |

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/flask-rest-api-postgresql-crud-boilerpla)
