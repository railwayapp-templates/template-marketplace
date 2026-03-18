# Deploy Spring Boot Microservice with Java on Railway

Deploy a discoverable Spring Boot-based microservice with Java

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/JvYvDw)

## About

## Spring Boot Microservice with Java Template

### 👨‍👩‍👧‍👦 Target Audience

This template is intended **for everyone interested in deploying Spring Cloud and Spring Boot based microservices architectures.**

### ✨ Features

With this template you will deploy a Spring Boot-based microservice with Java and Maven. Java version used is 17, but you can change this whenever you want.

This microservice comes with Spring Cloud Netflix Eureka Discovery Client inside and it will try to register itself against the Eureka Server. 

You also has these dependencies included:
- Spring Boot Starder Data JPA.
- Spring Boot Starter Web.
- Spring Boot Starter Validation (Hibernate Validator)
- Spring Boot Starter Test.
- Spring Boot DevTools.
- Lombok.
- H2 in-memory database.
  - Console path: `/h2-console`.
  - JDBC URL: `jdbc:h2:mem:testdb`.
  - Username: `sa`.
  - Password: Leave it blank.

A REST Controller is defined with a straightforward GET mapping for the root path.

Maven is used for dependency management.

### 👀 See also

Check out [Spring Cloud Netflix Eureka](https://railway.app/template/HM8cFB?referralCode=jesus-unir) template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| microservice | [UnirCs/back-end-spring-microservice-archetype](https://github.com/UnirCs/back-end-spring-microservice-archetype) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Value for `server.port` Spring property |
| `PROFILE` | railway | Value for `spring.profiles.active` Spring property |
| `HOSTNAME` | - | Private Networking name in Railway. This value could be set after deploying for first time |
| `EUREKA_URL` | - | Enter the following URL, replacing ``your-railway-internal-name-for-eureka``. ``http://your-railway-internal-name-for-eureka:8761/eureka``. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Java, Dockerfile

[View on Railway →](https://railway.com/template/JvYvDw)
