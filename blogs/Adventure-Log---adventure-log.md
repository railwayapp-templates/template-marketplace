# Deploy Adventure-Log on Railway

Self-hostable travel tracker and trip planner

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adventure-log)

## About

AdventureLog is a modern open-source travel companion. Log locations and visits with photos, notes, and trails; build multi-day trip itineraries; mark countries, regions, and cities on an interactive world map; and share plans with the people you travel with - all while keeping your data on infrastructure you control.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/adventure-log)

Hosting AdventureLog on Railway runs three containers on Railway’s private network:

- **AdventureLog** (frontend) - SvelteKit UI, publicly reachable via Railway’s HTTPS domain
- **Server** (backend) - Django API + media handling
- **Db** - PostGIS 15 for geospatial data (locations, maps, regions)

The frontend talks to the backend over the private network. The backend stores media on a persistent volume and uses PostGIS for map features. After deploy, open the public AdventureLog domain, log in with the auto-generated admin credentials (or the ones you set), and start logging trips.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Server | `ghcr.io/seanmorley15/adventurelog-backend:v0.13.0` | Database |
| Db | `ghcr.io/baosystems/postgis:15-3.5` | Database |
| AdventureLog | `ghcr.io/seanmorley15/adventurelog-frontend:v0.13.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Server | 8000 | Specifies the network port that the application process binds to and listens on for incoming traffic inside the container. |
| `DEBUG` | Server | False | Disables Django's debug mode for production safety, hiding detailed error tracebacks and sensitive system information from end users. |
| `DOMAIN` | Server | - | The primary public hostname dynamically assigned by Railway, typically used by Django for ALLOWED_HOSTS configuration. |
| `PUBLIC_URL` | Server | - | The full public HTTPS URL where this server app is accessible from the internet. |
| `SECRET_KEY` | Server | (secret) | Cryptographic key used by Django for signing sessions, cookies, and tokens. (Should be replaced with a strong secret in production). |
| `FRONTEND_URL` | Server | - | The public HTTPS URL of the frontend client service ("AdventureLog"), used by the backend to formulate redirect links or handle cross-origin requests. |
| `DJANGO_ADMIN_EMAIL` | Server | admin@example.com | The email address assigned to the default superuser account created for the Django Admin interface. |
| `CSRF_TRUSTED_ORIGINS` | Server | - | Authorizes unsafe requests (e.g., POST/PUT) originating from the frontend domain to pass Django's Cross-Site Request Forgery security checks. |
| `DJANGO_ADMIN_PASSWORD` | Server | (secret) | Auto-generates a secure, random 32-character password for the default Django superuser account via Railway's template variables. |
| `DJANGO_ADMIN_USERNAME` | Server | (secret) | Auto-generates a secure, random 32-character username for the default Django superuser account to prevent credential guessing. |
| `POSTGRES_DB` | Db | database | Sets the default database name created automatically when the PostgreSQL database container initializes for the first time. |
| `POSTGRES_USER` | Db | (secret) | Sets the default superuser username created automatically during the initial PostgreSQL database setup. |
| `POSTGRES_PASSWORD` | Db | (secret) | Sets the password for the default PostgreSQL superuser (POSTGRES_USER) created at initialization. |
| `ORIGIN` | AdventureLog | - | Public-facing HTTPS URL resolved dynamically by Railway. Used for CORS settings, OAuth callbacks, and redirect generation. |
| `BODY_SIZE_LIMIT` | AdventureLog | Infinity | Disables payload size restrictions for incoming HTTP requests (e.g., large file uploads, large JSON payloads) to avoid 413 Payload Too Large errors. |
| `PUBLIC_SERVER_URL` | AdventureLog | - | Internal network endpoint for private service-to-service communication on port 8000 within the Railway project (bypasses public internet). |

## Configuration

- **Volume:** `/code/media/`
- **Volume:** `/var/lib/postgresql/data/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/adventure-log)
