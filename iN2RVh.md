# Deploy infisical on Railway

Infisical - Secure and Cost-Optimized for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/iN2RVh)

## About

_EN

Infisical is a simple and effective solution to centralize and securely manage API keys, secrets, and environment variables.

Why choose our Railway template for Infisical?

Cost Optimization: The internal private network between services allows you to keep your URLs unexposed and eliminates the costs of traffic generated between them.

Enhanced Security: No need to make your services public, significantly reducing potential attack risks.

Embrace Digital Sobriety
Remember to use "sleep mode" and adjust the resources of each of your services for responsible and efficient management!

_FR

Infisical est une solution simple et efficace pour centraliser et gérer en toute sécurité les clés API, secrets et variables d'environnement.

Pourquoi choisir notre template Railway pour Infisical ?

Optimisation des coûts : Le réseau privé interne entre les services permet de ne pas exposer vos URL et de supprimer les frais de trafic généré entre eux.

Sécurité renforcée : Aucun besoin de rendre vos services publics, réduisant ainsi les risques d'attaques potentielles.

Adopter une démarche de sobriété numérique
N'oubliez pas d'utiliser le "sleep mode" et d'ajuster les ressources de chacun de vos services pour une gestion responsable et efficace !

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| migration | `infisical/infisical:latest-postgres` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| infisical | `infisical/infisical:latest-postgres` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | redis.railway.internal | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `SMTP_HOST` | infisical | smtp.example.com | Change it ! |
| `SMTP_PORT` | infisical | 587 | Change as needed |
| `AUTH_SECRET` | infisical | (secret) | - |
| `SMTP_SECURE` | infisical | true | - |
| `SMTP_PASSWORD` | infisical | (secret) | - |
| `SMTP_USERNAME` | infisical | (secret) | - |
| `SMTP_FROM_NAME` | infisical | Infisical | - |
| `SMTP_FROM_ADDRESS` | infisical | noreply@example.com | - |

## Configuration

- **Volume:** `/bitnami`
- **Start command:** `npm run migration:latest`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/iN2RVh)
