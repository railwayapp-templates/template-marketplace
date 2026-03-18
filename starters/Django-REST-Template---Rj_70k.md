# Deploy Django REST Template on Railway

Django Rest Framework Starter Template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Rj_70k)

## About

# Getting Started with Django REST + Postgres Starter

Welcome to the Django REST + Postgres Starter! This guide will walk you through the steps to get started with the project after deploying the service. Before you begin, make sure you have deployed the template.

## Step 1: Set the SECRET_KEY Variable

The `SECRET_KEY` is a critical security parameter used by Django to secure cryptographic signatures and session data. To enhance the security of your project, it's essential to change the default `SECRET_KEY` to a unique and secure value.

1. Open the your railway service variables.
2. Locate the `SECRET_KEY` variable and update it with your desired value.

Example:

```python
SECRET_KEY = 'your_secret_key_here'
```

## Step 2: Update CSRF_TRUSTED_ORIGINS

Django uses Cross-Site Request Forgery (CSRF) protection to prevent malicious attacks. When deploying the project to Railway or a custom domain, you need to specify the trusted origins that are allowed to send POST, PUT, PATCH, or DELETE requests.

1. Open the project local_settings file.
2. Locate the `CSRF_TRUSTED_ORIGINS` variable and update it with the URLs of your Railway app or custom domain.
3. Dont forget to also do the same at your production_settings.py

Example:

```python
CSRF_TRUSTED_ORIGINS = ['your_railway_app_url_here', 'your_custom_domain_url_here']
```

## Step 3: Run the Development Server

With the `SECRET_KEY` and `CSRF_TRUSTED_ORIGINS` updated, you can now run the development server to test your Django REST + Postgres Starter locally.

1. Open a terminal or command prompt.
2. Navigate to the root directory of your project.
3. Run the following command:

```bash
python manage.py runserver
```

The development server should start, and you can access your project at `http://127.0.0.1:8000/`.

## Step 4: Start Building Your API

With the project set up and the development server running, you are ready to start building your API. The Django REST + Postgres Starter provides a solid foundation to create powerful RESTful APIs. You can define your models, serializers, views, and URLs to implement your desired functionality.

Refer to Django REST Framework documentation (https://www.django-rest-framework.org/) for detailed information on how to create APIs, handle authentication, permissions, and much more.

## Conclusion

Congratulations! You have successfully set up the Django REST + Postgres Starter and made the necessary changes to enhance the security and compatibility with Railway or a custom domain. Now you can begin building your API and start your exciting development journey with Django and Postgres.

Happy coding! 🚀

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| django-rest-starter | [Grey-A/django-rest-starter](https://github.com/Grey-A/django-rest-starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DJANGO_ENV` | django-rest-starter | PRODUCTION | This is used to control which settings file the django app should use |
| `SECRET_KEY` | django-rest-starter | (secret) | Your Django Secret Key, Make Sure to change it! |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/template/Rj_70k)
