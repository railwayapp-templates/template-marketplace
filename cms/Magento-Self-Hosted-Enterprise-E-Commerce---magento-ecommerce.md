# Deploy Magento — Self-Hosted Enterprise E-Commerce on Railway

Self-host Magento 2.4.7 — enterprise store, high-RAM required

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/magento-ecommerce)

## About

Magento (Adobe Commerce Open Source) is the most powerful open-source e-commerce platform — an enterprise-grade store engine for large catalogs, multi-store setups, B2B, and complex merchandising, with deep customization through its module ecosystem. This template deploys Magento 2.4.7 with Elasticsearch (which Magento requires), MySQL, and Redis pre-wired. Magento is resource-heavy by design, so this is for merchants who specifically want its enterprise capabilities and will run it on an appropriately sized plan — see the requirements below.

---

Magento is enterprise software, and its resource and setup requirements are real — this section is deliberately honest so you deploy it successfully rather than hit avoidable failures.

**Provision a high-RAM plan — this is the most important thing.** Magento 2.4.7 is heavy: the install steps alone (`setup:install`, dependency compilation, static-content deployment) commonly need 4–6 GB of RAM or they run out of memory mid-install, and Elasticsearch wants another 1–2 GB. Plan for roughly 6–8 GB across the stack to install and run comfortably. On a small plan, the install will OOM or the store will be sluggish. Size your Railway plan accordingly before deploying — this is the difference between a working store and a failed install.

**Elasticsearch is mandatory, not optional.** Magento 2.4 will not install or serve catalog search without an Elasticsearch (or OpenSearch) backend, so this template includes and wires it. This is why the stack is multi-service rather than a single container.

**The install is a long, multi-step process — let it finish.** First boot runs Magento's CLI installer, compiles dependency injection, deploys static content, and reindexes — a process that can take 20–40 minutes and is the most failure-prone phase. Watch the logs, and don't interrupt it. Once it completes and the indexes are built, the storefront and admin come up.

**Set the base URL to your domain.** Magento stores its base URL in the database, so it must match your Railway (or custom) domain, or the storefront and admin render with broken assets and links.

**Configure cron and run production mode.** Magento relies on cron for reindexing, cache flushing, and scheduled jobs — without it, the catalog and prices go stale. For a live store, run production mode (not developer mode) for acceptable performance, and consider Varnish for full-page caching at scale. Products, orders, and customers live in MySQL, and media on a volume — both survive redeploys, with MySQL the primary backup target.

Typical cost: **higher than a lightweight store** — budget for the RAM the stack needs (often $30–60+/month depending on plan), plus MySQL and Elasticsearch. Magento is free of license fees, but its infrastructure footprint is significant. For a lighter self-hosted store, PrestaShop or WooCommerce run on far smaller plans.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Elasticsearch | [feliperosenek/elasticsearch-railway](https://github.com/feliperosenek/elasticsearch-railway) | Database |
| Magento 2.4.7 | [feliperosenek/mangeto2-railway](https://github.com/feliperosenek/mangeto2-railway) | Database |
| MySQL 8 | [feliperosenek/mysql-any-version-railway](https://github.com/feliperosenek/mysql-any-version-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Elasticsearch | 9200 | Elasticsearch port |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms100m -Xmx300m | Elasticsearch RAM options (min - max) |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Elasticsearch password |
| `ELASTIC_USERNAME` | Elasticsearch | (secret) | Elasticsearch username |
| `BASE_URL` | Magento 2.4.7 | - | Shop base URL |
| `ADMIN_USER` | Magento 2.4.7 | (secret) | Admin User Magento |
| `MYSQL_HOST` | Magento 2.4.7 | - | MySQL host |
| `MYSQL_PORT` | Magento 2.4.7 | 3306 | MySQL port |
| `MYSQL_USER` | Magento 2.4.7 | (secret) | MySQL user |
| `ADMIN_EMAIL` | Magento 2.4.7 | - | Magento admin e-email |
| `ADMIN_LASTNAME` | Magento 2.4.7 | - | Magento admin lastname |
| `ADMIN_PASSWORD` | Magento 2.4.7 | (secret) | Magento admin password |
| `MYSQL_DATABASE` | Magento 2.4.7 | railway | MySQL database name |
| `MYSQL_PASSWORD` | Magento 2.4.7 | (secret) | MySQL password |
| `ADMIN_FIRSTNAME` | Magento 2.4.7 | - | Magento admin first name |
| `BACKEND_FRONTNAME` | Magento 2.4.7 | admin | Define your_url/{BACKEND_FRONTNAME} to access admin page |
| `ELASTICSEARCH_HOST` | Magento 2.4.7 | - | Elasticsearch host |
| `ELASTICSEARCH_PORT` | Magento 2.4.7 | - | Elasticsearch port |
| `INSTALL_SAMPLE_DATA` | Magento 2.4.7 | false | Set true to install Magento sample data |
| `ELASTICSEARCH_PASSWORD` | Magento 2.4.7 | (secret) | Elasticsearch password |
| `ELASTICSEARCH_USERNAME` | Magento 2.4.7 | (secret) | Elasticsearch username |
| `ELASTICSEARCH_ENABLE_AUTH` | Magento 2.4.7 | 1 | Elasticsearch auth to login |
| `MYSQL_ROOT_PASSWORD` | MySQL 8 | (secret) | MySQL password root |

## Configuration

- **Volume:** `/esdata`
- **Volume:** `/var/www`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/magento-ecommerce)
