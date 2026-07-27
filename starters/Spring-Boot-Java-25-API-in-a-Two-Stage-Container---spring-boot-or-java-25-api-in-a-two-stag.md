# Deploy Spring Boot | Java 25 API in a Two-Stage Container on Railway

Spring Boot 4 on Java 25, two-stage image, bound to the platform port

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spring-boot-or-java-25-api-in-a-two-stag)

## About

Spring Boot 4 on Java 25, in a two-stage container, listening on the port the platform assigns.

The Spring Boot template on Railway builds from a repository last updated in October 2024, and about four deployments in ten never come up. Two things in it are worth fixing.

**The port is never configured.** Its application.properties contains a single line - the application name. Spring then listens on its own default rather than on the port the platform hands the container, and whether that works is left to autodetection. Here the properties file says `server.port=${PORT:8080}`.

**The container is a single stage.** Its Dockerfile builds with a full JDK and then runs that same image, so the deployed container carries the JDK, the Maven cache and the sources. This one builds in a Maven image and copies only the jar into a JRE image - 347 MB, with nothing in it that only the build needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API | [ak40u/spring-boot-railway-starter](https://github.com/ak40u/spring-boot-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `JAVA_OPTS` | -XX:MaxRAMPercentage=75 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Java, Dockerfile

[View on Railway →](https://railway.com/deploy/spring-boot-or-java-25-api-in-a-two-stag)
