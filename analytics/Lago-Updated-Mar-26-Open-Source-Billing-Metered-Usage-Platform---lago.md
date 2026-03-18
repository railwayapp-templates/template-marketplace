# Deploy Lago [Updated Mar ’26] (Open-Source Billing & Metered Usage Platform) on Railway

Lago [Mar ’26] (GetLago) (Stripe Billing & Chargebee alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/lago)

## About

Lago (GetLago) is an open-source, event-based billing software available on GitHub, designed as a flexible and scalable alternative to Stripe Billing and other SaaS billing solutions. With Lago, businesses can implement **metered billing software**, hybrid pricing models, and full invoice automation, all while maintaining complete control over their billing data. The **GetLago app** can be self-hosted with Docker, giving startups and enterprises the power of a modern billing engine without being locked into vendor pricing.

When you **self host Lago billing**, you keep all your financial data and customer billing information under your control. Unlike SaaS-only tools that store everything on external servers, hosting Lago on Railway ensures privacy, flexibility, and compliance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | `getlago/api:v1.39.0` | Web service |
| Redis | `railwayapp/redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| front | `getlago/front:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | api | 3000 | - |
| `RAILS_ENV` | api | production | - |
| `LAGO_USE_GCS` | api | false | Mark True if using GCS |
| `REDIS_PASSWORD` | api | (secret) | - |
| `LAGO_USE_AWS_S3` | api | false | Mark True if using S3 |
| `RSA_PRIVATE_KEY` | api | MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDjj4RKw1SRK/2F2uWmtrCz6Lp1Is2Tozcy5xmqw5BZ5F7FH/Jk3OanC9TyClPtEyKpQNLuA3ds1/NzuIkhg9lZiW6+B2/ic3Qh2s0Ljz1HWNqaxnKTZrBpys7kYNCqEkZaiJj+PL63eh7FHFa1nyoZa1I0S0NCf7LKkO8LgeYn6FDtMO6KaGntrxIdznHo01LcGmwDmIXKU8KvRGO3M+MI3kWhyFZ7dnaQ9GLXzx+8NE21UOuR8vAlpM9BkF5s4CrVaJWkEgpLK+VMqQPYwSnlUoem3zkDEEZyW2nbJarICFlpN3j4BThVEIq8qdLvYKiK4te0FH9nlwniFtP5HUClAgMBAAECggEAGv1nYXZTTms4RYT/jjXJwUuH1x9xlBngE9UsXuw7Mc+xDAPnD6PttwR2LMor2eLSyU4dVU11lKDvY42R1LwHQsgnuMUyFvQw3nZzCEnBAduMUxf8efekEYtJGRM6XiRmQTCr29fJkm6SzpqTJp4leRh04Rpxo9PTpialZlumZKfPGtnvL2wENPE14XgucXrUZXPiKFLL7T5XM1hcgb/OniX2wA4F0FDopQOCZGh6wu6xI52RKBeQ5z3r+J8PXn8ik8XDJOFtWGGd+qUp1RDPvO1HtsRxtB3CQeKHbKkWwTLkRQ24fVfLBtRiFCxHeFysvxcGldD+AtEtSdmPWwovAQKBgQD6nJloR5iK3pl3g3peALm5tU8JJg7lyB+rFC9TQJkSnKOrIHJ0BwVf9SF1UWJUOzHtXXMQjHb5vrSwI6Iv8ECnQC3YzTGUfHgoCFbvdHwVnJPwXzCwUW/c4FRCoCYU/aaz95cDo9AOjvwUgxQYuE7xRoRm8AucdGGsHTy+sBIcRwKBgQDv4FtDUwBwtgKpVdX3iUBk08zpSJMdlaRlTogxuDFCNkKm4XZpS9GwDbVmqFzxOb17J4idtZfKJ1WQNVat1djpoCZ2xOm5f2zcNJh4Kcx7VwQl9raVXOmXAyMiw3b0xO4OEJm0HiiWaopS8wvAuYsgu41VtpIruf8GpGCpKnmozQKBgQD4hI+Sc5T2+Az9PDckPDTf3XGHqBeXzA7eEtPFGJ0OqEEiyshfiKJil6GIXyS6lldb2g06p2JUDjN379cVtPT6GChDmxgmln/r5MNL5WtkslHgJytpZZe4VbrB39UMmNZZbYOyh0bCvQ3W8wHiqeYGmuWYb6mfgipRHjX/tVQP7QKBgQCLZ/NCpZznINQaP4CuAiAGkQFOdKFONVe7ydSZShSRpUL9jkLQHvaNncsLQhU+FerNsvOgRAPUJhOdHT3qJUE8qVwlg/mFgZ9Nqj+W2eUsyGXxGKi9JU1G08yufx4yD5Zw5PZ3l8DoMJmHHybxxB40zNqU8QOAtiWCit2MzQwIPQKBgQCo1tcKZ/j1Ti5aF0nuYB9HkbNdM3M2spgevCgDz7bRnAOOwMH2n5Y2oUQGY6zVZWkIuTikAcHst6G2D2BhYwy/jwybHvRdhdDV6DyPy0tQ08RbLayqOr2/ynrrI6wUefT4uxFw6ZLPukvjFqugsN9QwVCeUakWVrl+jWW0QOIwTA== | - |
| `SECRET_KEY_BASE` | api | (secret) | - |
| `LAGO_DISABLE_SIGNUP` | api | false | - |
| `RAILS_LOG_TO_STDOUT` | api | true | - |
| `LAGO_RSA_PRIVATE_KEY` | api | MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDjj4RKw1SRK/2F2uWmtrCz6Lp1Is2Tozcy5xmqw5BZ5F7FH/Jk3OanC9TyClPtEyKpQNLuA3ds1/NzuIkhg9lZiW6+B2/ic3Qh2s0Ljz1HWNqaxnKTZrBpys7kYNCqEkZaiJj+PL63eh7FHFa1nyoZa1I0S0NCf7LKkO8LgeYn6FDtMO6KaGntrxIdznHo01LcGmwDmIXKU8KvRGO3M+MI3kWhyFZ7dnaQ9GLXzx+8NE21UOuR8vAlpM9BkF5s4CrVaJWkEgpLK+VMqQPYwSnlUoem3zkDEEZyW2nbJarICFlpN3j4BThVEIq8qdLvYKiK4te0FH9nlwniFtP5HUClAgMBAAECggEAGv1nYXZTTms4RYT/jjXJwUuH1x9xlBngE9UsXuw7Mc+xDAPnD6PttwR2LMor2eLSyU4dVU11lKDvY42R1LwHQsgnuMUyFvQw3nZzCEnBAduMUxf8efekEYtJGRM6XiRmQTCr29fJkm6SzpqTJp4leRh04Rpxo9PTpialZlumZKfPGtnvL2wENPE14XgucXrUZXPiKFLL7T5XM1hcgb/OniX2wA4F0FDopQOCZGh6wu6xI52RKBeQ5z3r+J8PXn8ik8XDJOFtWGGd+qUp1RDPvO1HtsRxtB3CQeKHbKkWwTLkRQ24fVfLBtRiFCxHeFysvxcGldD+AtEtSdmPWwovAQKBgQD6nJloR5iK3pl3g3peALm5tU8JJg7lyB+rFC9TQJkSnKOrIHJ0BwVf9SF1UWJUOzHtXXMQjHb5vrSwI6Iv8ECnQC3YzTGUfHgoCFbvdHwVnJPwXzCwUW/c4FRCoCYU/aaz95cDo9AOjvwUgxQYuE7xRoRm8AucdGGsHTy+sBIcRwKBgQDv4FtDUwBwtgKpVdX3iUBk08zpSJMdlaRlTogxuDFCNkKm4XZpS9GwDbVmqFzxOb17J4idtZfKJ1WQNVat1djpoCZ2xOm5f2zcNJh4Kcx7VwQl9raVXOmXAyMiw3b0xO4OEJm0HiiWaopS8wvAuYsgu41VtpIruf8GpGCpKnmozQKBgQD4hI+Sc5T2+Az9PDckPDTf3XGHqBeXzA7eEtPFGJ0OqEEiyshfiKJil6GIXyS6lldb2g06p2JUDjN379cVtPT6GChDmxgmln/r5MNL5WtkslHgJytpZZe4VbrB39UMmNZZbYOyh0bCvQ3W8wHiqeYGmuWYb6mfgipRHjX/tVQP7QKBgQCLZ/NCpZznINQaP4CuAiAGkQFOdKFONVe7ydSZShSRpUL9jkLQHvaNncsLQhU+FerNsvOgRAPUJhOdHT3qJUE8qVwlg/mFgZ9Nqj+W2eUsyGXxGKi9JU1G08yufx4yD5Zw5PZ3l8DoMJmHHybxxB40zNqU8QOAtiWCit2MzQwIPQKBgQCo1tcKZ/j1Ti5aF0nuYB9HkbNdM3M2spgevCgDz7bRnAOOwMH2n5Y2oUQGY6zVZWkIuTikAcHst6G2D2BhYwy/jwybHvRdhdDV6DyPy0tQ08RbLayqOr2/ynrrI6wUefT4uxFw6ZLPukvjFqugsN9QwVCeUakWVrl+jWW0QOIwTA== | - |
| `GOOGLE_AUTH_CLIENT_ID` | api | - | Needed for Signup via Google |
| `LAGO_WEBHOOK_ATTEMPTS` | api | 3 | - |
| `GOOGLE_AUTH_CLIENT_SECRET` | api | (secret) | Needed for Signup via Google |
| `LAGO_AWS_S3_SECRET_ACCESS_KEY` | api | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | front | 80 | - |
| `APP_ENV` | front | production | - |
| `LAGO_DISABLE_SIGNUP` | front | false | - |
| `LAGO_OAUTH_PROXY_URL` | front | https://proxy.getlago.com | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/template/lago)
