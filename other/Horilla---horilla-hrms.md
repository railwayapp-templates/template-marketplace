# Deploy Horilla on Railway

Open-source HR system for employees, leave, payroll and hiring

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/horilla-hrms)

## About

Horilla is a free, open-source HRMS covering the whole employee lifecycle in one Django application: an employee directory, attendance and shift tracking, leave approvals, payroll with allowances and deductions, recruitment and onboarding, performance reviews, project timesheets, asset tracking and an internal helpdesk. It suits small and mid-sized companies that want one system of record for HR data without a per-seat SaaS bill, and because every module shares one PostgreSQL schema, a leave request, an attendance record and a payslip all reference the same employee row.

Deploy Horilla on Railway with everything a production install needs already wired together. The web service runs Django 5.2 behind Gunicorn, serves its static assets through WhiteNoise, and keeps uploaded files — photos, employee documents, offer letters — on a persistent volume at `/app/media`. Managed PostgreSQL holds all application data and managed Redis backs the Django cache; both stay on the private network, and only the web service is public. Migrations and the first administrator account run automatically on first boot, so the URL lands on a working login page, not an installer.

![Horilla web service with Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787455451/horilla-architecture.png)

Horilla replaces the spreadsheet-and-email approach to HR admin with a permissioned web app HR staff, managers and employees use directly. Self-hosting matters more here than for most tools: an HRMS holds salaries, home addresses, identity documents and performance notes, and many organisations must keep that data in an environment they control. The interface also ships translated into nine languages besides English, all compiled and ready in this template.

Key modules include:

- **Employees** — directory, documents, work information, org structure, LDAP sign-in
- **Attendance** — check-in/out, shifts, rosters, overtime, biometric devices
- **Leave** — leave types, balances, holidays, approval workflows
- **Payroll** — allowances, deductions, federal tax, payslips, encashment
- **Recruitment and onboarding** — postings, candidate pipeline and portal, tasks
- **Performance, projects, assets, helpdesk** — objectives, timesheets, asset assignment, ticketing

Three Railway services make this work. The **Horilla web service** runs the Django application and its background schedulers; **PostgreSQL** is the system of record for all HR data; **Redis** backs Django's cache, keeping dashboards and list views responsive as headcount grows. Uploaded files live on the web service's volume and are served through Django, so every download is authorised per request rather than exposed as a static file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| horilla | [gridalpha/horilla-railway](https://github.com/gridalpha/horilla-railway) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | horilla | 8000 | Gunicorn listening port |
| `DEBUG` | horilla | False | Django debug mode, off in production |
| `REDIS_URL` | horilla | - | Redis cache connection string |
| `TIME_ZONE` | horilla | UTC | Timezone for attendance and payroll |
| `SECRET_KEY` | horilla | (secret) | Django signing key, keep stable |
| `HORILLA_ENV` | horilla | production | Enables the production security gate |
| `DATABASE_URL` | horilla | - | Postgres connection string |
| `DB_INIT_PASSWORD` | horilla | (secret) | Guards the demo-data loader |
| `HORILLA_ADMIN_EMAIL` | horilla | - | Administrator employee record email |
| `HORILLA_ADMIN_PASSWORD` | horilla | (secret) | First administrator password |
| `HORILLA_ADMIN_USERNAME` | horilla | (secret) | First administrator login |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/media`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/horilla-hrms)
