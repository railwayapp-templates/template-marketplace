# Deploy Spring Microservice Ecosystem on Railway

Deploy a Spring microservice ecosystem with Eureka and Cloud Gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/f6CKpT)

## About

## Spring Cloud Netflix Eureka

### 👨‍👩‍👧‍👦 Target Audience

This template is intended **for everyone interested in deploying Spring Cloud and Spring Boot based microservices architectures.**

### ✨ Features

With this template you will deploy a fully-fledged Spring Cloud Microservice Ecosystem with the following features:

- Netflix Eureka server prepared to register microservices in your architecture.
 -  HTTP resolution is enabled for testing purposes. We recommend to disable it for a production deployment.

- Spring Cloud Gateway instance prepared to fetch data from Netflix Eureka to build the route table for redirections.
 - HTTP resolution is enabled.
 - If you want to use a complex Spring Cloud Gateway implementation with filters and request translation, use [this template](https://railway.app/template/CWxqH0?referralCode=jesus-unir).

- Two microservices (empty implementation) ready to be used with Eureka and Cloud Gateway. They expose a dummy endpoint for testing purposes.
 - HTTP resolution is disabled so these parts of the architecture are not reachable directly from the Internet.

After deployment, you can test the entire ecosystem with the following GET request:

```bash
curl --location 'gateway_public_domain/microservice-one/'
```

Where `gateway_public_domain` is the public domain provided by Railway (something like spring-cloud-gateway-production-XXXX.up.railway.app)

### 👀 See also

Check out another templates with each part of this one but separately:
- [Eureka Server Standalone](https://railway.app/template/HM8cFB?referralCode=jesus-unir)
- [Cloud Gateway Straightforward Standalone](https://railway.app/template/OI2sbM?referralCode=jesus-unir)
- [Cloud Gateway ACL Standalone](https://railway.app/template/CWxqH0?referralCode=jesus-unir)
- [Microservice Archetype Standalone](https://railway.app/template/JvYvDw?referralCode=jesus-unir)

###❓ What is Spring Cloud Netflix Eureka?

Spring Cloud Netflix Eureka is a key tool in the microservices world, offering a robust solution for service discovery. Part of the Spring Cloud ecosystem, it is based on Netflix Eureka. Its main function is to allow services to register in its registry and discover other services through simple queries. This approach facilitates scalability and service management in microservices architectures, where services can vary and change dynamically.

Eureka helps developers focus on business logic while the system automatically handles service discovery. This includes load balancing, fault handling, and providing an easy interface for service management. Eureka seamlessly integrates with other Spring Cloud components like Config Server and Circuit Breaker, offering a cohesive ecosystem for microservices development.

In summary, Spring Cloud Netflix Eureka is an essential tool for building scalable, resilient, and efficient modern microservices-based applications.

###❓ What is Spring Cloud Gateway?

Spring Cloud Gateway is a powerful library within the Spring ecosystem, designed for building API gateways in a microservices architecture. It acts as an intermediary for handling requests, routing them to various microservices. This gateway simplifies the complexity of managing multiple services by providing a single entry point for all incoming requests.

Key features of Spring Cloud Gateway include dynamic routing, security, and monitoring. It supports routing based on various criteria like URL paths or headers and can dynamically route requests to different backends. This flexibility is crucial for modern applications with evolving needs.

Furthermore, Spring Cloud Gateway integrates seamlessly with other Spring Cloud components, enhancing its functionality with service discovery, load balancing, and circuit breakers. This integration ensures that applications are not only efficiently routed but also resilient and secure.

In essence, Spring Cloud Gateway is an indispensable tool for developers looking to streamline their microservices architecture, offering easy management, dynamic routing, and integration with the broader Spring Cloud ecosystem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| microservice-one | [UnirCs/back-end-spring-microservice-archetype](https://github.com/UnirCs/back-end-spring-microservice-archetype) | Worker |
| microservice-two | [UnirCs/back-end-spring-microservice-archetype](https://github.com/UnirCs/back-end-spring-microservice-archetype) | Worker |
| spring-cloud-gateway | [UnirCs/back-end-cloud-gateway](https://github.com/UnirCs/back-end-cloud-gateway) | Web service |
| spring-cloud-eureka | [UnirCs/back-end-eureka](https://github.com/UnirCs/back-end-eureka) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | microservice-one | 8080 | Used to specify the port number on which the application will run. 8080 by default |
| `PROFILE` | microservice-one | railway | Spring Execution Profile |
| `APP_NAME` | microservice-one | - | The service name. |
| `HOSTNAME` | microservice-one | - | specifies the hostname that will be used by the Eureka server to register the client instance. This is essential for identifying and locating the service instance within the network. By default, the value is the same as the service name in the project |
| `EUREKA_URL` | microservice-one | - | Used to specify the default URL of the Eureka server. This URL is where the Eureka client will register itself and also fetch the registry information of other services. By default, this variable references the Eureka server privately, without traffic leaving Railway's network |
| `PORT` | microservice-two | 8080 | Used to specify the port number on which the application will run. 8080 by default |
| `PROFILE` | microservice-two | railway | Spring Execution Profile |
| `APP_NAME` | microservice-two | - | The service name. |
| `HOSTNAME` | microservice-two | - | specifies the hostname that will be used by the Eureka server to register the client instance. This is essential for identifying and locating the service instance within the network. By default, the value is the same as the service name in the project |
| `EUREKA_URL` | microservice-two | - | Used to specify the default URL of the Eureka server. This URL is where the Eureka client will register itself and also fetch the registry information of other services. By default, this variable references the Eureka server privately, without traffic leaving Railway's network |
| `PORT` | spring-cloud-gateway | 8762 | Used to specify the port number on which the application will run. 8762 by default |
| `HOSTNAME` | spring-cloud-gateway | - | specifies the hostname that will be used by the Eureka server to register the client instance. This is essential for identifying and locating the service instance within the network. By default, the value is the same as the service name in the project |
| `EUREKA_URL` | spring-cloud-gateway | - | Used to specify the default URL of the Eureka server. This URL is where the Eureka client will register itself and also fetch the registry information of other services. By default, this variable references the Eureka server privately, without traffic leaving Railway's network |
| `ALLOWED_ORIGINS` | spring-cloud-gateway | * | Used to set up Cross-Origin Resource Sharing (CORS) policies, determining which external domains are permitted to access resources on the server. All origins are allowed by default |
| `PORT` | spring-cloud-eureka | 8761 | Used to specify the port number on which the application will run. 8761 by default |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Java, Dockerfile

[View on Railway →](https://railway.com/deploy/f6CKpT)
