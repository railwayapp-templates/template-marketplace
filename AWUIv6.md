# Deploy Django with Volume Support on Railway

Use Railway Volumes with Django

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/AWUIv6)

## About

# Django with Volume Support Example

This example template starts a Django server utilizing volume support on Railway for storing and serving assets.

## ✨ Features

- Django
- Railway Volumes
- Python 3

## 💁‍♀️ How to use

- Clone locally and install packages with pip using `pip install -r requirements.txt`
- Run locally using `python manage.py migrate && python manage.py collectstatic --noinput && gunicorn mysite.wsgi`

## 📝 Troubleshooting
If you get the following error `No such file or directory: '/app/media/directory/...'` make sure your directory exists since your folder structure has to be build from scratch for production purpose on the persistent storage.

You can use something like this:

```python
new_directory = os.path.join(settings.MEDIA_ROOT, 'directory')
if not os.path.exists(new_directory):
  os.makedirs(new_directory)
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| django-volumes | [railwayapp-templates/django-volume](https://github.com/railwayapp-templates/django-volume) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/media`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Python, HTML

[View on Railway →](https://railway.com/template/AWUIv6)
