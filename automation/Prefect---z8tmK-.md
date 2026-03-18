# Deploy Prefect on Railway

Prefect is a Python orchestration framework for building data pipelines.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/z8tmK-)

## About

# Prefect

Prefect is a workflow orchestration framework for building data pipelines in Python.
It's the simplest way to elevate a script into a production workflow.
With Prefect, you can build resilient, dynamic data pipelines that react to the world around them and recover from unexpected changes.

With just a few lines of code, data teams can confidently automate any data process with features such as scheduling, caching, retries, and event-based automations.

Workflow activity is tracked and can be monitored with a self-hosted [Prefect server](https://docs.prefect.io/latest/manage/self-host/?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none) instance or managed [Prefect Cloud](https://www.prefect.io/cloud-vs-oss?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none) dashboard.

> [!TIP]
> Prefect flows can handle retries, dependencies, and even complex branching logic
> 
> [Check our docs](https://docs.prefect.io/v3/get-started/index?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none) or see the example below to learn more!

## Getting started

Prefect requires Python 3.9 or later. To [install the latest or upgrade to the latest version of Prefect](https://docs.prefect.io/get-started/install), run the following command:

```bash
pip install -U prefect
```

Then create and run a Python file that uses Prefect `flow` and `task` decorators to orchestrate and observe your workflow - in this case, a simple script that fetches the number of GitHub stars from a repository:

```python
from prefect import flow, task
import httpx


@task(log_prints=True)
def get_stars(repo: str):
    url = f"https://api.github.com/repos/{repo}"
    count = httpx.get(url).json()["stargazers_count"]
    print(f"{repo} has {count} stars!")


@flow(name="GitHub Stars")
def github_stars(repos: list[str]):
    for repo in repos:
        get_stars(repo)


# run the flow!
if __name__=="__main__":
    github_stars(["PrefectHQ/Prefect"])
```

Fire up a Prefect server and open the UI at http://localhost:4200 to see what happened:

```bash
prefect server start
```

To run your workflow on a schedule, turn it into a deployment and schedule it to run every minute by changing the last line of your script to the following:

```python
if __name__ == "__main__":
    github_stars.serve(
        name="first-deployment",
        cron="* * * * *",
        parameters={"repos": ["PrefectHQ/prefect"]}
    )
```

You now have a process running locally that is looking for scheduled deployments!
Additionally you can run your workflow manually from the UI or CLI. You can even run deployments in response to [events](https://docs.prefect.io/latest/automate/?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none).

> [!TIP]
> Where to go next - check out our [documentation](https://docs.prefect.io/v3/get-started/index?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none) to learn more about:
> - [Deploying flows to production environments](https://docs.prefect.io/v3/deploy?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none)
> - [Adding error handling and retries](https://docs.prefect.io/v3/develop/write-tasks#retries?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none)
> - [Integrating with your existing tools](https://docs.prefect.io/integrations/integrations?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none)
> - [Setting up team collaboration features](https://docs.prefect.io/v3/manage/cloud/manage-users/manage-teams#manage-teams?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none)


## Prefect Cloud

Prefect Cloud provides workflow orchestration for the modern data enterprise. By automating over 200 million data tasks monthly, Prefect empowers diverse organizations — from Fortune 50 leaders such as Progressive Insurance to innovative disruptors such as Cash App — to increase engineering productivity, reduce pipeline errors, and cut data workflow compute costs.

Read more about Prefect Cloud [here](https://www.prefect.io/cloud-vs-oss?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none) or sign up to [try it for yourself](https://app.prefect.cloud?utm_source=oss&utm_medium=oss&utm_campaign=oss_gh_repo&utm_term=none&utm_content=none).

## prefect-client

If your use case is geared towards communicating with Prefect Cloud or a remote Prefect server, check out our
[prefect-client](https://pypi.org/project/prefect-client/). It is a lighter-weight option for accessing client-side functionality in the Prefect SDK and is ideal for use in ephemeral execution environments.

## Next steps

- Check out the [Docs](https://docs.prefect.io/).
- Join the [Prefect Slack community](https://prefect.io/slack).
- Learn how to [contribute to Prefect](https://docs.prefect.io/contribute/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| prefecthq/prefect:3-latest | `prefecthq/prefect:3-latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | prefecthq/prefect:3-latest | 4200 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "prefect server start --host 0.0.0.0"`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/z8tmK-)
