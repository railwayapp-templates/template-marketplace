# Deploy Spring Cloud Gateway - Straightforward on Railway

Deploy a Spring Cloud Gateway instance. Easily integrated with Eureka

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/OI2sbM)

## About

## Spring Cloud Gateway

### 👨‍👩‍👧‍👦 Target Audience

This template is intended **for everyone interested in deploying Spring Cloud and Spring Boot based microservices architectures.**

### ✨ Features

With this template you will deploy a Spring Cloud Gateway instance prepared to fetch data from Netflix Eureka to build the route table for redirections. Hence, it is recommended to use this template with [the Spring Cloud Netflix Eureka one](https://railway.app/template/HM8cFB?referralCode=jesus-unir). HTTP Resolution is enabled by default.

### 👀 See also

If you are looking for a complex Spring Cloud Gateway implementation with filters and request translation, use [this template](https://railway.app/template/CWxqH0?referralCode=jesus-unir)

###❓ What is Spring Cloud Gateway?

Spring Cloud Gateway is a powerful library within the Spring ecosystem, designed for building API gateways in a microservices architecture. It acts as an intermediary for handling requests, routing them to various microservices. This gateway simplifies the complexity of managing multiple services by providing a single entry point for all incoming requests.

Key features of Spring Cloud Gateway include dynamic routing, security, and monitoring. It supports routing based on various criteria like URL paths or headers and can dynamically route requests to different backends. This flexibility is crucial for modern applications with evolving needs.

Furthermore, Spring Cloud Gateway integrates seamlessly with other Spring Cloud components, enhancing its functionality with service discovery, load balancing, and circuit breakers. This integration ensures that applications are not only efficiently routed but also resilient and secure.

In essence, Spring Cloud Gateway is an indispensable tool for developers looking to streamline their microservices architecture, offering easy management, dynamic routing, and integration with the broader Spring Cloud ecosystem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Spring Cloud Gateway | [UnirCs/back-end-cloud-gateway](https://github.com/UnirCs/back-end-cloud-gateway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8762 | Value for `server.port` Spring property |
| `EUREKA_URL` | - | Enter the following URL, replacing ``your-railway-internal-name-for-eureka``. ``http://your-railway-internal-name-for-eureka:8761/eureka``. In order to deploy Spring Cloud Gateway it is very useful to have Eureka deployed too. Check "Spring Cloud Netflix Eureka" Railway template |
| `ALLOWED_ORIGINS` | * | Value for Spring Property `spring.cloud.gateway.globalcors.cors-configurations`. By default is "*", all origins allowed  |
| `ROUTE_TABLES_ENABLED` | unrestricted | Value for `management.endpoint.gateway.enabled` Spring property |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Dockerfile, Java

[View on Railway →](https://railway.com/deploy/OI2sbM)
