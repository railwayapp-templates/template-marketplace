# Deploy ChartDB on Railway

Open-source database diagrams editor, and visualize DB with a single query

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fnMtKA)

## About

<h1 align="center">
  <img alt="ChartDB" height="70" width="400" src="https://raw.githubusercontent.com/chartdb/chartdb/refs/heads/main/src/assets/logo-dark.png">
</h1>

<p align="center">
  <b>Open-source database diagrams editor</b> <br>
  <b>No installations • No Database password required.</b>
</p>

<h3 align="center">
  <a href="https://discord.gg/QeFwyWSKwC">Community</a>  •
  <a href="https://www.chartdb.io">Website</a>  •
  <a href="https://app.chartdb.io/examples">Demo</a>
</h3>

<h4 align="center">
  <a href="https://github.com/chartdb/chartdb?tab=AGPL-3.0-1-ov-file#readme">
    <img alt="ChartDB is released under the AGPL license." src="https://img.shields.io/github/license/chartdb/chartdb?color=blue">
  </a>
  <a href="https://github.com/chartdb/chartdb/blob/main/CONTRIBUTING.md">
    <img alt="PRs welcome!" src="https://img.shields.io/badge/PRs-Welcome-brightgreen">
  </a>
  <a href="https://discord.gg/QeFwyWSKwC">
    <img alt="Discord community channel" src="https://img.shields.io/discord/1277047413705670678?color=5865F2&amp;label=Discord&amp;logo=discord&amp;logoColor=white">
  </a>
  <a href="https://x.com/chartdb_io">
    <img src="https://img.shields.io/twitter/follow/ChartDB?style=social">
  </a>

</h4>

---

<p align="center">
  <img src="https://raw.githubusercontent.com/chartdb/chartdb/refs/heads/main/public/ChartDB.png" width="700px">
</p>

### 🎉 ChartDB

ChartDB is a powerful, web-based database diagramming editor.
Instantly visualize your database schema with a single **"Smart Query."** Customize diagrams, export SQL scripts, and access all features—no account required. Experience seamless database design here.

**What it does**:

-   **Instant Schema Import**
    Run a single query to instantly retrieve your database schema as JSON. This makes it incredibly fast to visualize your database schema, whether for documentation, team discussions, or simply understanding your data better.

-   **AI-Powered Export for Easy Migration**
    Our AI-driven export feature allows you to generate the DDL script in the dialect of your choice. Whether you’re migrating from MySQL to PostgreSQL or from SQLite to MariaDB, ChartDB simplifies the process by providing the necessary scripts tailored to your target database.
-   **Interactive Editing**
    Fine-tune your database schema using our intuitive editor. Easily make adjustments or annotations to better visualize complex structures.

### Status

ChartDB is currently in Public Beta. Star and watch this repository to get notified of updates.

### Supported Databases

-   ✅ PostgreSQL
-   ✅ MySQL
-   ✅ SQL Server
-   ✅ MariaDB
-   ✅ SQLite
-   ✅ ClickHouse

## Try it on our website

1. Go to [ChartDB.io](https://chartdb.io)
2. Click "Go to app"
3. Choose the database that you are using.
4. Take the magic query and run it in your database.
5. Copy and paste the resulting JSON set into ChartDB.
6. Enjoy Viewing &amp; Editing!

## 💚 Community &amp; Support

-   [Discord](https://discord.gg/QeFwyWSKwC) (For live discussion with the community and the ChartDB team)
-   [GitHub Issues](https://github.com/chartdb/chartdb/issues) (For any bugs and errors you encounter using ChartDB)
-   [Twitter](https://x.com/chartdb_io) (Get news fast)

## License

ChartDB is licensed under the [GNU Affero General Public License v3.0](https://github.com/chartdb/chartdb/blob/main/LICENSE)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chartdb | [chartdb/chartdb](https://github.com/chartdb/chartdb) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | ChartDB Port |
| `VITE_OPENAI_API_KEY` | (secret) | Add OpenAI API key if you want to have AI capabilities |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, JavaScript, CSS, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/template/fnMtKA)
