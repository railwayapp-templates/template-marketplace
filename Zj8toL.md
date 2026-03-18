# Deploy Tableflow on Railway

The open source CSV importer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Zj8toL)

## About

# ⚠️ ARCHIVED / BROKEN

**This Railway template is no longer maintained and should not be used.**

### Why is this happening?
The original creators of TableFlow have pivoted their business model and removed the open-source backend repository (`tableflowhq/tableflow`) that this template relies on. 

Because the source code and associated build artifacts have been removed from the public internet, **this template will fail to build.**

## What is Tableflow?
TableFlow is a powerful data management and visualization tool designed to streamline your data processing needs. Whether you're a business user, data analyst, or developer, TableFlow provides a user-friendly interface and robust backend services to simplify data organization, transformation, and visualization. This README will guide you through TableFlow's features, services, and how to get started.

## Features
TableFlow offers a wide range of features to help you manage and work with your data effectively:

- Admin UI: A user-friendly web-based administration interface to manage your data tables, users, and permissions.
- Backend Services: A powerful backend that handles data storage, retrieval, and processing.
- Importers: Built-in and customizable data importers to easily bring data into TableFlow.
- Data Manipulation: Tools for data cleaning, transformation, and manipulation.
- Visualization: Create stunning visualizations to gain insights from your data.
- Collaboration: Share data tables and visualizations with team members.
- Permissions: Fine-grained access control to protect sensitive data.
- Export: Export data tables and visualizations in various formats.
- Customization: Customize the appearance and behavior of your tables and visualizations.
- Automation: Automate repetitive tasks using scripting and scheduling.

## ✨ Services

- Admin UI
- Backend
- Importer UI

## 💁‍♀️ How to use

- Click the Railway button 👆
- Add the required environment variables. 
- Deploy.
- Deployment will take some time. Once scylla DB is deployed and running backend service should start.
- Access the Admin UI by clicking on Railway's public URL. 
![Dashboard](https://raw.githubusercontent.com/railwayapp-templates/tableflow-railway/main/img/admin-dashboard.png)
- You can create a new importer by clicking on the "Create New" button on the top right corner.
![importer](https://raw.githubusercontent.com/railwayapp-templates/tableflow-railway/main/img/new_importer.png)
- You can add necessary infomration and add new columns to importer based on the data type you want to import.
![column](https://raw.githubusercontent.com/railwayapp-templates/tableflow-railway/main/img/Add_column.png)
- You can view the created importer by clicking on the importer name .
![view](https://raw.githubusercontent.com/railwayapp-templates/tableflow-railway/main/img/example_importer.png)
- Once you save the importer, you can also modify the columns which you created.
![edit](https://raw.githubusercontent.com/railwayapp-templates/tableflow-railway/main/img/edit_column.png)
- Table flow also giving example code block which you can add into your website to use the importer.
![code](https://raw.githubusercontent.com/railwayapp-templates/tableflow-railway/main/img/code_block.png)
- Tableflow importer gives feature to import data from CSV with example CSV file which you can download. if you want to preview the importer you can click on `preview` button.
![preview](https://raw.githubusercontent.com/railwayapp-templates/tableflow-railway/main/img/importer-ui.png)
- Once you import the CSV file you can choose the header column and preview the data.
![importer-header](https://raw.githubusercontent.com/railwayapp-templates/tableflow-railway/main/img/importer-header.png)
- After previewing the data you can import the data into the tableflow.
![complete](https://raw.githubusercontent.com/railwayapp-templates/tableflow-railway/main/img/impoter-complete.png)
- You can view the imported data on data tab.
![data](https://raw.githubusercontent.com/railwayapp-templates/tableflow-railway/main/img/data.png)
- There are more features of managing data in tableflow which you can explore by yourself.
- Enjoy 🎉
## 📝 Notes

- Source repo: https://github.com/tableflowhq/tableflow
- Docs: https://tableflow.com/docs/introduction

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [railwayapp-templates/tableflow-railway](https://github.com/railwayapp-templates/tableflow-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| scylla | [railwayapp-templates/tableflow-railway](https://github.com/railwayapp-templates/tableflow-railway) (root: /scylla) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | backend | 80 | - |
| `SCYLLA_HOST` | backend | - | Ip address or hostname for Scylla DB |
| `POSTGRES_USER` | backend | (secret) | - |
| `POSTGRES_PASSWORD` | backend | (secret) | - |
| `TABLEFLOW_API_SERVER_PORT` | backend | 3003 | - |
| `TABLEFLOW_WEB_APP_AUTH_TOKEN` | backend | (secret) | ${{secret(32,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-")}} |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 9042
- **Volume:** `/var/lib/scylla`

**Category:** Other · **Languages:** Go, TypeScript, SCSS, Dockerfile, CSS, JavaScript, HTML, Shell

[View on Railway →](https://railway.com/template/Zj8toL)
