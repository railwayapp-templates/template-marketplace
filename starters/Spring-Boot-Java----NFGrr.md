# Deploy Spring Boot (Java) on Railway

A Spring Boot starter app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-NFGrr)

## About

Spring Boot is an open-source Java framework that simplifies the development of production-ready applications with minimal configuration. This is a Spring Boot starter app that deploys to Railway.

Hosting Spring Boot means running a Java application server that handles HTTP requests through embedded Tomcat, Jetty, or Undertow containers. The application packages dependencies into executable JAR files and manages configuration through application properties or YAML files. Production deployment requires JVM tuning, memory management, profile-specific configurations, and coordinating build processes with Maven or Gradle. Railway handles the Java runtime environment, automatically detects Spring Boot applications through the JAR structure, manages environment variables for different deployment profiles, and handles port binding through the server.port configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Spring Boot | [railwayapp-templates/java-spring-boot](https://github.com/railwayapp-templates/java-spring-boot) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Java, Dockerfile

[View on Railway →](https://railway.com/deploy/-NFGrr)
