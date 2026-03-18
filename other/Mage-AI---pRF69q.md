# Deploy Mage AI on Railway

The modern replacement for Airflow

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pRF69q)

## About

<p align="center">
    <a href="https://docs.mage.ai/introduction/overview">
        <img alt="mage ai logo" src="https://mintlify.s3-us-west-1.amazonaws.com/mage/logo/dark.svg" style="width: 500px;">
    </a>
</p>

<h3 align="center">🧙 A modern replacement for Airflow</h3>

<div align="center">

Give your data team `magical` powers

</div>

<p align="center">
  <b>Integrate</b> and synchronize data from 3rd party sources
</p>

<p align="center">
  Build real-time and batch pipelines to <b>transform</b> data using Python, SQL, and R
</p>

<p align="center">
  Run, monitor, and <b>orchestrate</b> thousands of pipelines without losing sleep
</p>

**Notes:**

- Login with the default email `admin@admin.com` and the password `admin`. Once logged in go to `/settings/workspace/users` and change the default credentials.

- Communication to Postgres is done exclusively over the private network and the database is not exposed externally in any way by default, if you want to enable access from outside of the private network you can go to the databases settings to enable TCP proxying and enter the internal port (5432) the TCP proxy can be again removed at any point to close off external access.

### 🦄 Make data magical

We put the fun in fun-ctional programming. Mage is a hybrid framework that combines the best of both worlds: the flexibility of notebooks with the rigor of modular code.

- **Extract** and synchronize data from 3rd party sources.
- **Transform** data with real-time and batch pipelines using Python, SQL, and R.
- **Load** data into your data warehouse or data lake using our pre-built connectors.
- Run, monitor, and **orchestrate** thousands of pipelines without losing sleep.

### 🔨 Build

Have you met anyone who loves developing in Airflow? That's why we designed an easy developer experience that you'll enjoy.

- **Simple developer experience:** Start developing locally with a single command or launch a dev environment in your cloud using Terraform.
- **Language of choice:** Write code in Python, SQL, or R in the same pipeline for ultimate flexibility.
- **Engineering best practices built-in:** Every step in your pipeline is a standalone file with modular code that's reusable and testable. No more DAGs with spaghetti code 🍝.
- **Bring your favorite tools:** Write **[dbt](https://docs.mage.ai/dbt/overview)** models, use your favorite **[IDE](https://docs.mage.ai/development/text-editor)**, **[track changes with Git](https://docs.mage.ai/getting-started/setting-up-git)**, and much much more.

### 🔍 Preview

Don't waste time waiting for your DAGs to finish testing. Get instant feedback from your code every time you run it.

- **Interactive code:** Immediately see results from your code's output with an interactive notebook UI.
- **Data is a first-class citizen:** Each block of code in your pipeline produces data that can be versioned, partitioned, and cataloged for future use.
- **Collaborate on cloud:** Develop collaboratively on **[cloud resources](https://docs.mage.ai/production/deploying-to-cloud/architecture)**, version control with **[Git](https://docs.mage.ai/getting-started/setting-up-git)**, and **[test](https://docs.mage.ai/development/data-validation)** pipelines without waiting for an available shared staging environment.

### 🚀 Launch

Don't have a large team dedicated to Airflow? Mage makes it easy for a single developer or small team to scale up and manage thousands of pipelines.

- **Fast deploy:** Deploy Mage to Railway with only a few clicks.
- **Scaling made simple:** Transform very large datasets directly in your data warehouse or through a native integration with Spark.
- **Observability:** Operationalize your pipelines with built-in monitoring, alerting, and observability through an intuitive UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mage | `mageai/mageai` | Web service |
| Postgres | `postgres:15` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JWT_SECRET` | Mage | (secret) | The json web token secret used for encoding and decoding access tokens |
| `MAGE_PUBLIC_HOST` | Mage | - | The public host url that can be used to access the Mage app |
| `JWT_DOWNLOAD_SECRET` | Mage | (secret) |  The json web token secret used for encoding and decoding download tokens |
| `REQUIRE_USER_AUTHENTICATION` | Mage | 1 | Enable user authentication in Mage |
| `MAGE_DATABASE_CONNECTION_URL` | Mage | - | Configure Mage to connect to Postgres over the private network |
| `MAGE_ACCESS_TOKEN_EXPIRY_TIME` | Mage | (secret) | 7 days -  The expiration time of a Mage access token in seconds |
| `POSTGRES_DB` | Postgres | railway | Default database |
| `DATABASE_URL` | Postgres | - | Public database URL |
| `POSTGRES_USER` | Postgres | (secret) | Database username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private URL |

## Configuration

- **Start command:** `/bin/sh -c "exec /app/run_app.sh mage start --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/api/statuses`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/src`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/pRF69q)
