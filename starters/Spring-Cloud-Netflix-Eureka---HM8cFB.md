# Deploy Spring Cloud Netflix Eureka on Railway

Deploy a Spring Cloud Netflix Eureka server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/HM8cFB)

## About

## Spring Cloud Netflix Eureka

### 👨‍👩‍👧‍👦 Target Audience

This template is intended **for everyone interested in deploying Spring Cloud and Spring Boot based microservices architectures.**

### ✨ Features

With this template you will deploy a Spring Cloud Netflix Eureka server prepared to register microservices in your architecture. For testing purposes, HTTP resolution is enabled. We recommend to disable it for a production deployment.

### 👀 See also

If you are looking for a reversal proxy for your Spring based microservices architecture, use [this template](https://railway.app/template/CWxqH0?referralCode=jesus-unir)

###❓ What is Spring Cloud Netflix Eureka?

Spring Cloud Netflix Eureka is a key tool in the microservices world, offering a robust solution for service discovery. Part of the Spring Cloud ecosystem, it is based on Netflix Eureka. Its main function is to allow services to register in its registry and discover other services through simple queries. This approach facilitates scalability and service management in microservices architectures, where services can vary and change dynamically.

Eureka helps developers focus on business logic while the system automatically handles service discovery. This includes load balancing, fault handling, and providing an easy interface for service management. Eureka seamlessly integrates with other Spring Cloud components like Config Server and Circuit Breaker, offering a cohesive ecosystem for microservices development.

In summary, Spring Cloud Netflix Eureka is an essential tool for building scalable, resilient, and efficient modern microservices-based applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Spring Cloud Netflix Eureka | [UnirCs/back-end-eureka](https://github.com/UnirCs/back-end-eureka) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8761 | Value for `server.port` Spring variable. 8761 by default |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Dockerfile, Java

[View on Railway →](https://railway.com/deploy/HM8cFB)
