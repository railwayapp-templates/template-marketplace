# Deploy Teable on Railway

A super fast Airtable alternative with AI agent integrated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wada5e)

## About

<div align="center">
  <h3 align="center"><strong>Postgres-Airtable Fusion</strong></h3>
  <p>Teable is a Super fast, Real-time, Professional, Developer friendly, No-code database built on Postgres. It uses a simple, spreadsheet-like interface to create complex enterprise-level database applications. Unlock efficient app development with no-code, free from the hurdles of data security and scalability. </p>
</div>
  <div align="center">
    <picture>
      <source srcset="https://sss.teable.io/pub-assets/teable-interface-dark.png" media="(prefers-color-scheme: dark)">
      <img src="https://sss.teable.io/pub-assets/teable-interface-light.png" width="100%" alt="teable interface">
    </picture>
  </div>

## ✨Features

#### 📊 Spreadsheet-like interface

All you want is here

- Cell Editing: Directly click and edit content within cells.
- Formula Support: Input mathematical and logical formulas to auto-calculate values.
- Data Sorting and Filtering: Sort data based on a column or multiple columns; use filters to view specific rows of data.
- Aggregation Function: Automatically summarize statistics for each column, providing instant calculations like sum, average, count, max, and min for streamlined data analysis.
- Data Formatting: formatting numbers, dates, etc.
- Grouping: Organize rows into collapsible groups based on column values for easier data analysis and navigation.
- Freeze Columns: Freeze the left column of the table so they remain visible while scrolling.
- Import/Export Capabilities: Import and export data from other formats, e.g., .csv, .xlsx.
- Row Styling &amp; Conditional Formatting: Change row styles automatically based on specific conditions. (coming soon)
- Charts &amp; Visualization Tools: Create charts from table data such as bar charts, pie charts, line graphs, etc. (coming soon)
- Data Validation: Limit or validate data that are entered into cells. (coming soon)
- Undo/Redo: Undo or redo recent changes. (coming soon)
- Comments &amp; Annotations: Attach comments to rows, providing explanations or feedback for other users. (coming soon)
- Find &amp; Replace: Search content within the table and replace it with new content. (coming soon)

#### 🗂️ Multiple Views

Visualize and interact with data in various ways best suited for their specific tasks.

- Grid View: The default view of the table, which displays data in a spreadsheet-like format.
- Form View: Input data in a form format, which is useful for collecting data.
- Kanban View: Displays data in a Kanban board, which is a visual representation of data in columns and cards. (coming soon)
- Calendar View: Displays data in a calendar format, which is useful for tracking dates and events. (coming soon)
- Gallery View: Displays data in a gallery format, which is useful for displaying images and other media. (coming soon)
- Gantt View: Displays data in a Gantt chart, which is useful for tracking project schedules. (coming soon)
- Timeline View: Displays data in a timeline format, which is useful for tracking events over time. (coming soon)

#### 🚀 Super Fast

Amazing response speed and data capacity

- Millions of data are easily processed, and there is no pressure to filter and sort
- Automatic database indexing for maximum speed
- Supports batch data operations at one time

#### 👨‍💻 Full-featured SQL Support

Seamless integration with the software you are familiar with

- BI tools like Metabase PowerBi...
- No-code tools like Appsmith...
- Direct retrieve data with native SQL

#### 🔒 Privacy-First

You own your data, in spite of the cloud

- Bring your own database (coming soon)

#### ⚡️ Real-time collaboration

Designed for teams

- No need to refresh the page, data is updated in real-time
- Seamlessly integrate collaboration member invitation and management
- Perfect permission management mechanism, from table to column level

#### 🧩 Extensions (coming soon)

Expand infinite possibilities

- Backend-less programming capability based on React
- Customize your own application with extremely low cost
- Extremely easy-to-use script extensions mode

#### 🤖 Automation (coming soon)

Empower data-driven workflows effortlessly and seamlessly

- Design your workflow with AI or Visual programming
- Super easy to retrieve data from the table

#### 🧠 Copilot (coming soon)

Native Integrated AI ability

- Chat 2 App. "Create a project management app for me"
- Chat 2 Chart. "Analyze the data in the order table using a bar chart"
- Chat 2 View. "I want to see the schedule for the past week and only display participants"
- Chat 2 Action. "After the order is paid and completed, an email notification will be sent to the customer"
- More actions...

#### 🗄️ Support for multiple databases (coming soon)

Choose the SQL database you like

- Sqlite, PostgreSQL, MySQL, MariaDB, TiDB...

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| teable | `ghcr.io/teableio/teable` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | teable | 3000 | port |
| `PUBLIC_ORIGIN` | teable | - | website domain name |
| `PRISMA_DATABASE_URL` | teable | - | database connection address |
| `PUBLIC_DATABASE_PROXY` | teable | - | for external database access |
| `ENABLEALPINEPRIVATE_NETWORKING` | teable | true | Solve the problem that the Railway may not be able to access the intranet |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/.assets`

**Category:** CMS

[View on Railway →](https://railway.com/template/wada5e)
