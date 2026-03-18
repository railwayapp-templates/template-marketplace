# Deploy ZenML (Open-Source MLOps Framework & Pipeline Orchestration Tool) on Railway

ZenML [Mar ’26] (ML Pipelines, MLflow & Airflow alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zenml)

## About

ZenML is an open-source MLOps framework designed to make machine learning (ML) workflows reproducible, collaborative, and production-ready. It integrates seamlessly with existing ML and data science tools like TensorFlow, PyTorch, Scikit-learn, and MLflow. With ZenML, teams can orchestrate their ML pipelines while keeping code modular, versioned, and deployment-friendly. ZenML is actively maintained and available on [ZenML GitHub](https://github.com/zenml-io/zenml).

You can **self host ZenML** to maintain complete control over your ML workflows, pipelines, and metadata, without relying on third-party servers. By deploying ZenML on Railway, you get the flexibility of open-source software with the convenience of managed hosting. Railway automates scaling, monitoring, and environment management, while you focus on building ML solutions.

ZenML self-hosting allows you to:

* Keep your ML workflows private and secure.
* Deploy pipelines tailored to your team’s data infrastructure.
* Reduce dependence on vendor lock-ins.
* Enable collaboration across teams with reproducible pipelines.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zenml-railway | [Shinyduo/zenml-railway](https://github.com/Shinyduo/zenml-railway) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ZENML_SECRETS_STORE_TYPE` | zenml-railway | (secret) |
| `ZENML_SECRETS_STORE_ENCRYPTION_KEY` | zenml-railway | (secret) |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/zenml)
