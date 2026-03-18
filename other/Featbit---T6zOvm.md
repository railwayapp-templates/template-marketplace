# Deploy Featbit on Railway

Open-source feature flags management tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/T6zOvm)

## About

<p align="center">
    <a href="https://www.featbit.co/">
        <img style="border-radius: 15px; width: 700px;" src="https://github.com/featbit/featbit/assets/68597908/ff7a611e-9504-4f99-bf11-8ba9bccea696" alt="featbit logo">
    </a>
</p>

<h3 align="center">Platform for Managing Feature Flags</h3>

**Notes**

- Featbit will take a minute or so to fully come online despite Railway reporting everything is active, please give it a few minutes to set itself up before attempting to log in. The login page is `/en/login`.

- The **default username** is `admin@domain.com` and the **default password** is `123456`. Please change these by opening the Web UI and going to `/en/workspace/profile`.

- Both MongoDB and Redis are unexposed to the public by default, If you want to enable public access to these databases go to their respective service settings and add a TCP Proxy, enter `27017` as the internal port for MongoDB, and `6379` as the internal port for Redis.

**Ship Code Safely**. Mitigate risks with Production Testing, roll out new features to 1% of users initially then expanding, and ensure instant error recovery without redeployment.

**Innovate Faster**. Decouple feature deployment from release to minimize merge conflicts. Deploy at will, and release any feature immediately upon request from the boss.

<img style="border-radius: 10px;" src="https://github.com/featbit/.github/assets/68597908/db057b46-8762-4b9e-8d94-b205e13242c2">


**Targeted Experiences**. Release features to specific target users, and continuously measure and improve the product's business value, while reducing the need for developer involvement.

**Born for developers**. Use simple if/else statements to control and release features, eliminating complex DevOps tasks. This enables developers to directly drive business value. FeatBit refine tool details, freeing up your energy to better focus on the business.

<img style="border-radius: 10px;" src="https://github.com/featbit/.github/assets/68597908/8cc0518b-dd85-43a4-ae64-0a86dace3a56">

**Understanding Feature Usage Details**. FeatBit tracks feature usage, creates on-demand experimentation reports, and exports data to tools like DataDog, Amplitude for diverse business needs.

<img style="border-radius: 10px;" src="https://github.com/featbit/.github/assets/68597908/91805daa-b70e-45e0-833e-d75dfee4b198">

**Much more information** visit https://www.featbit.co and main github repo https://github.com/featbit/featbit

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| Web UI | `featbit/featbit-ui:latest` | Web service |
| API Server | `featbit/featbit-api-server:latest` | Web service |
| Data Analytics Server | `featbit/featbit-data-analytics-server` | Worker |
| MongoDB | `ghcr.io/brody192/mongo-for-featbit` | Database |
| Evaluation Server | `featbit/featbit-evaluation-server` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Public host |
| `REDISPORT` | Redis | - | Public port |
| `REDISUSER` | Redis | default | Redis user |
| `REDIS_URL` | Redis | - | Public URL |
| `REDISPASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password |
| `REDISHOST_PRIVATE` | Redis | - | Private Host |
| `REDISPORT_PRIVATE` | Redis | 6379 | Private port |
| `REDIS_PRIVATE_URL` | Redis | - | Private URL |
| `PORT` | Web UI | 80 | Server port |
| `API_URL` | Web UI | - | Public API URL |
| `DEMO_URL` | Web UI | - | Public domain |
| `EVALUATION_URL` | Web UI | - | Public evaluation server URL |
| `PORT` | API Server | 5000 | Server port |
| `API_URL` | API Server | - | Public URL |
| `Redis__Password` | API Server | (secret) | Redis password |
| `MongoDb__Database` | API Server | - | Default database |
| `OLAP__ServiceHost` | API Server | - | Data analytics private host |
| `Redis__ConnectionString` | API Server | - | Redis private connection string |
| `MongoDb__ConnectionString` | API Server | - | Private mongo URL |
| `PORT` | Data Analytics Server | 80 | Server port |
| `MONGO_URI` | Data Analytics Server | - | Private mongo URI |
| `MONGO_HOST` | Data Analytics Server | - | Private mongo host |
| `REDIS_HOST` | Data Analytics Server | - | Private redis host |
| `REDIS_PORT` | Data Analytics Server | - | Private redis port |
| `REDIS_USER` | Data Analytics Server | (secret) | Redis user |
| `REDIS_PASSWORD` | Data Analytics Server | (secret) | Redis password |
| `DA_HOST_PRIVATE` | Data Analytics Server | - | Data analytics private host |
| `CHECK_DB_LIVNESS` | Data Analytics Server | true | Check mongo liveness |
| `MONGO_INITDB_DATABASE` | Data Analytics Server | featbit | Default database |
| `MONGOHOST` | MongoDB | - | Public host |
| `MONGOPORT` | MongoDB | - | Public port |
| `MONGOUSER` | MongoDB | - | Mongo user |
| `MONGO_URL` | MongoDB | - | Public URL |
| `MONGOPASSWORD` | MongoDB | (secret) | Mongo password |
| `MONGOHOST_PRIVATE` | MongoDB | - | Private host |
| `MONGOPORT_PRIVATE` | MongoDB | 27017 | Private port |
| `MONGO_PRIVATE_URL` | MongoDB | - | Private URL |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Mongo password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Mongo username |
| `PORT` | Evaluation Server | 5100 | Server port |
| `EVALUATION_URL` | Evaluation Server | - | Public URL |
| `Redis__Password` | Evaluation Server | (secret) | Redis password |
| `MongoDb__Database` | Evaluation Server | - | Default database |
| `Redis__ConnectionString` | Evaluation Server | - | Redis private connection string |
| `MongoDb__ConnectionString` | Evaluation Server | - | Private mongo URL |

## Configuration

- **Volume:** `/bitnami`
- **Healthcheck:** `/en/login`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health/liveness`
- **Start command:** `/bin/sh -c "flask migrate-database && gunicorn flasky:app --bind [::]:$PORT"`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/T6zOvm)
