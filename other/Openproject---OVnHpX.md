# Deploy Openproject on Railway

OpenProject is a project management software with a focus on sovereignty

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/OVnHpX)

## About

# OpenProject

[OpenProject](https://www.openproject.org) is a powerful open-source project management software that helps teams efficiently plan, track, and collaborate on their projects. It offers a wide range of features including task management, Gantt charts, agile boards, time tracking, budget management, and reporting tools.

With OpenProject, teams can manage their workflows using methodologies such as Agile, Scrum, and traditional project management techniques. It provides an intuitive user interface and robust collaboration features, making it ideal for organizations of all sizes.

Key features of OpenProject include:

- **Project Planning & Scheduling** – Define project goals, milestones, and timelines.
- **Agile and Scrum Support** – Manage sprints, backlogs, and team velocity.
- **Time and Cost Tracking** – Monitor project budgets and employee work hours.
- **Collaboration Tools** – Share documents, comments, and updates with team members.
- **Security and Permissions** – Role-based access controls to manage data security.


### Troubleshooting

In case the OpenProject UI is not displayed, check that the DB is correctly created with the tables, and restart the OpenProject service and look at the deployment logs until the message "Listen 0.0.0.0.0:8080" is displayed.


For detailed information and installation guides, visit the official documentation:

[OpenProject Documentation](https://www.openproject.org/docs/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Openproject | `openproject/openproject:15.4.2` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Openproject | 8080 | - |
| `OPENPROJECT_HTTPS` | Openproject | true | - |
| `OPENPROJECT_SECRET_KEY_BASE` | Openproject | (secret) | - |
| `OPENPROJECT_DEFAULT__LANGUAGE` | Openproject | en | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/health_checks/all`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/openproject/assets`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/OVnHpX)
