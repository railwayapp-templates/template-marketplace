# Deploy Mage AI on Railway

🧙 A modern replacement for Airflow.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Cr5cge)

## About

<h1 align="center">
  <a href="https://mage.ai">
    <img style="width:100%;" src="https://github.com/mage-ai/assets/blob/main/mascots/mascots-shorter.jpeg?raw=true" alt="Mage" align="center">
  </a>
</h1>
<p align="center">
  🧙 A modern replacement for Airflow.
</p>

<img src="https://static.scarf.sh/a.png?x-pxid=b3c96d79-b8f0-414b-a687-8bfc164b4b7a">

<div align="center">

### Give your data team `magical` powers

</div>

<p align="center">
  <b>Integrate</b> and synchronize data from 3rd party sources
</p>

<p align="center">
  Build real-time and batch pipelines to <b>transform</b> data using Python, SQL, and R
</p>

<p align="center">
  Run, monitor, and <b>orchestrate</b> thousands of pipelines without losing sleep
</p>

<br>

<p align="center">1️⃣ 🏗️</p>
<h1 align="center">Build</h1>
<p align="center">
  Have you met anyone who said they loved developing in Airflow?
  <br>
  That’s why we designed an easy developer experience that you’ll enjoy.
</p>

|   |   |
| --- | --- |
| <b>Easy developer experience</b><br>Start developing locally with a single command or launch a dev environment in your cloud using Terraform.<br><br><b>Language of choice</b><br>Write code in Python, SQL, or R in the same data pipeline for ultimate flexibility.<br><br><b>Engineering best practices built-in</b><br>Each step in your pipeline is a standalone file containing modular code that’s reusable and testable with data validations. No more DAGs with spaghetti code. | <img src="https://github.com/mage-ai/assets/blob/main/overview/mage-build.gif?raw=true"> |

<p align="center">
  ↓
</p>

<p align="center">2️⃣ 🔮</p>
<h1 align="center">Preview</h1>
<p align="center">
  Stop wasting time waiting around for your DAGs to finish testing.
  <br>
  Get instant feedback from your code each time you run it.
</p>

|   |   |
| --- | --- |
| <b>Interactive code</b><br>Immediately see results from your code’s output with an interactive notebook UI.<br><br><b>Data is a first-class citizen</b><br>Each block of code in your pipeline produces data that can be versioned, partitioned, and cataloged for future use.<br><br><b>Collaborate on cloud</b><br>Develop collaboratively on cloud resources, version control with Git, and test pipelines without waiting for an available shared staging environment. | <img src="https://github.com/mage-ai/assets/blob/main/overview/mage-preview.gif?raw=True"> |

<p align="center">
  ↓
</p>

<p align="center">3️⃣ 🚀</p>
<h1 align="center">Launch</h1>
<p align="center">
  Don’t have a large team dedicated to Airflow?
  <br>
  Mage makes it easy for a single developer or small team to scale up and manage thousands of pipelines.
</p>

|   |   |
| --- | --- |
| <b>Fast deploy</b><br>Deploy Mage to AWS, GCP, or Azure with only 2 commands using maintained Terraform templates.<br><br><b>Scaling made simple</b><br>Transform very large datasets directly in your data warehouse or through a native integration with Spark.<br><br><b>Observability</b><br>Operationalize your pipelines with built-in monitoring, alerting, and observability through an intuitive UI. | <img src="https://github.com/mage-ai/assets/blob/main/overview/observability.gif?raw=True"> |

<br>

# 🧙 Intro

Mage is an open-source data pipeline tool for transforming and integrating data.

1. [Install](#%EF%B8%8F-install)
1. [Demo](#-demo)
1. [Tutorials](#-tutorials)
1. [Documentation](https://docs.mage.ai)
1. [Features](#-features)
1. [Core design principles](https://docs.mage.ai/design/core-design-principles)
1. [Core abstractions](https://docs.mage.ai/design/core-abstractions)
1. [Contributing](https://docs.mage.ai/community/contributing)

Looking for help? The _fastest_ way to get started is by checking out our documentation [here](https://docs.mage.ai/getting-started/setup).

Looking for quick examples? Open a [demo](https://demo.mage.ai/) project right in your browser or check out our [guides](https://docs.mage.ai/guides/overview).

# 🎮 Demo

### Live demo

Build and run a data pipeline with our <b>[demo app](https://demo.mage.ai/)</b>.

&gt; WARNING
&gt;
&gt; The live demo is public to everyone, please don’t save anything sensitive (e.g. passwords, secrets, etc).
### Demo video (5 min)

[![Mage quick start demo](https://github.com/mage-ai/assets/blob/main/overview/overview-video.png?raw=True)](https://youtu.be/GswOdShLGmg)

<sub><i>Click the image to play video</i></sub>

<br>

# 👩‍🏫 Tutorials

- [Load data from API, transform it, and export it to PostgreSQL](https://docs.mage.ai/guides/load-api-data)
- [Integrate Mage into an existing Airflow project](https://docs.mage.ai/integrations/airflow)
- [Train model on Titanic dataset](https://docs.mage.ai/guides/train-model)
- [Set up dbt models and orchestrate dbt runs](https://docs.mage.ai/integrations/dbt-models)

<img src="https://github.com/mage-ai/assets/blob/main/mage-fire-charging-up.svg?raw=True" height="160" alt="Fire mage">

<br>

# 🔮 [Features](https://docs.mage.ai/about/features)

|   |   |   |
| --- | --- | --- |
| 🎶 | <b>[Orchestration](https://docs.mage.ai/design/data-pipeline-management)</b> | Schedule and manage data pipelines with observability. |
| 📓 | <b>[Notebook](https://docs.mage.ai/about/features#notebook-for-building-data-pipelines)</b> | Interactive Python, SQL, &amp; R editor for coding data pipelines. |
| 🏗️ | <b>[Data integrations](https://docs.mage.ai/data-integrations/overview)</b> | Synchronize data from 3rd party sources to your internal destinations. |
| 🚰 | <b>[Streaming pipelines](https://docs.mage.ai/guides/streaming-pipeline)</b> | Ingest and transform real-time data. |
| ❎ | <b>[dbt](https://docs.mage.ai/dbt/overview)</b> | Build, run, and manage your dbt models with Mage. |

<b>A sample data pipeline defined across 3 files ➝</b>

1. Load data ➝
    ```python
    @data_loader
    def load_csv_from_file():
        return pd.read_csv('default_repo/titanic.csv')
    ```
1. Transform data ➝
    ```python
    @transformer
    def select_columns_from_df(df, *args):
        return df[['Age', 'Fare', 'Survived']]
    ```
1. Export data ➝
    ```python
    @data_exporter
    def export_titanic_data_to_disk(df) -&gt; None:
        df.to_csv('default_repo/titanic_transformed.csv')
    ```

<b>What the data pipeline looks like in the UI ➝</b>

<img src="https://github.com/mage-ai/assets/blob/main/data-pipeline-overview.png?raw=True" alt="data pipeline overview">

New? We recommend reading about <b>[blocks](https://docs.mage.ai/design/blocks)</b> and
learning from a <b>[hands-on tutorial](https://docs.mage.ai/guides/load-api-data)</b>.

[![Ask us questions on Slack](https://img.shields.io/badge/%20-Ask%20us%20questions%20on%20Slack-purple?style=for-the-badge&amp;logo=slack&amp;labelColor=6B50D7)](https://www.mage.ai/chat)

<br>

# 🏔️ [Core design principles](https://docs.mage.ai/design/core-design-principles)

Every user experience and technical design decision adheres to these principles.

|   |   |   |
| --- | --- | --- |
| 💻 | [Easy developer experience](https://docs.mage.ai/design/core-design-principles#easy-developer-experience) | Open-source engine that comes with a custom notebook UI for building data pipelines. |
| 🚢 | [Engineering best practices built-in](https://docs.mage.ai/design/core-design-principles#engineering-best-practices-built-in) | Build and deploy data pipelines using modular code. No more writing throwaway code or trying to turn notebooks into scripts. |
| 💳 | [Data is a first-class citizen](https://docs.mage.ai/design/core-design-principles#data-is-a-first-class-citizen) | Designed from the ground up specifically for running data-intensive workflows. |
| 🪐 | [Scaling is made simple](https://docs.mage.ai/design/core-design-principles#scaling-is-made-simple) | Analyze and process large data quickly for rapid iteration. |

<br>

# 🛸 [Core abstractions](https://docs.mage.ai/design/core-abstractions)

These are the fundamental concepts that Mage uses to operate.

|   |   |
| --- | --- |
| [Project](https://docs.mage.ai/design/core-abstractions#project) | Like a repository on GitHub; this is where you write all your code. |
| [Pipeline](https://docs.mage.ai/design/core-abstractions#pipeline) | Contains references to all the blocks of code you want to run, charts for visualizing data, and organizes the dependency between each block of code. |
| [Block](https://docs.mage.ai/design/core-abstractions#block) | A file with code that can be executed independently or within a pipeline. |
| [Data product](https://docs.mage.ai/design/core-abstractions#data-product) | Every block produces data after it's been executed. These are called data products in Mage. |
| [Trigger](https://docs.mage.ai/design/core-abstractions#trigger) | A set of instructions that determine when or how a pipeline should run. |
| [Run](https://docs.mage.ai/design/core-abstractions#run) | Stores information about when it was started, its status, when it was completed, any runtime variables used in the execution of the pipeline or block, etc. |

<br>

# 🤔 Frequently Asked Questions (FAQs)

Check out our [FAQ page](https://docs.mage.ai/about/frequently-asked-questions) to find answers to some of our most asked questions.

<br>

# 🪪 License
See the [LICENSE](LICENSE) file for licensing information.

[<img src="https://github.com/mage-ai/assets/blob/main/mage-water-charging-up.svg?raw=True" height="300" alt="Water mage casting spell">](https://www.mage.ai/)

<br>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| mage-ai | [botwayorg/mage-ai-docker](https://github.com/botwayorg/mage-ai-docker) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | mage-ai | 6789 | Mage AI Port |
| `MAGE_DATABASE_CONNECTION_URL` | mage-ai | - | Mage AI Database |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/src`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/Cr5cge)
