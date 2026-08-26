# Deploy Jenkins on Railway

Automation server that builds, tests and deploys your code

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jenkins-ci)

## About

Jenkins is the open-source automation server much of the world's software still builds on. Governed by the Continuous Delivery Foundation, its roughly 2,000 plugins reach almost every source-control system, artifact registry, cloud provider and deployment target. Teams choose it when the build process is genuinely theirs — matrix builds, air-gapped artifact stores, releases with manual sign-off — all expressed in a `Jenkinsfile` in the repository.

Deploy Jenkins on Railway and you get what the Jenkins documentation calls a distributed build: a `jenkins` controller that runs the web UI and schedules work, and a `jenkins-agent` service that runs it. The controller keeps `/var/jenkins_home` on a persistent volume and is the only service with a public URL. The agent stays private, dials the controller over a WebSocket, and offers two executors on its own workspace volume. The controller has zero executors, so nothing you build can touch the machine holding your credentials. Plugins, security realm, agent node and authorization matrix are all defined as code in [github.com/gridalpha/jenkins-railway](https://github.com/gridalpha/jenkins-railway), so a fresh deploy is set up the moment it answers.

![Jenkins controller and build agent services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787641679/jenkins-architecture.png)

Jenkins watches source repositories, runs whatever you tell it to run, and reports the result. Self-hosting is the point rather than a compromise: build logs, artifacts, signing keys and deployment credentials never leave infrastructure you control, and there are no build-minute charges.

- **Pipeline as code** — declarative or scripted pipelines committed as a `Jenkinsfile`.
- **Distributed builds** — the controller schedules, agents execute, capacity grows by adding agents.
- **A plugin for nearly everything** — Git, GitHub, GitLab, Docker, Kubernetes, Maven, Gradle, npm, Terraform, Slack, SonarQube.
- **Fine-grained authorization** — a permission matrix over users and groups.
- **Credentials management** — secrets stored encrypted and bound into builds.

**`jenkins`** is the controller: web UI, jobs, credential store and build history under `/var/jenkins_home`. **`jenkins-agent`** runs the official inbound agent image with Git and Git LFS preinstalled, dialling the controller privately so no second public port opens. Its volume keeps workspaces between deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jenkins | [gridalpha/jenkins-railway](https://github.com/gridalpha/jenkins-railway) | Web service |
| jenkins-agent | [gridalpha/jenkins-railway](https://github.com/gridalpha/jenkins-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | jenkins | 8080 | HTTP port Jenkins listens on |
| `JENKINS_ADMIN_ID` | jenkins | admin | Administrator username, created on first boot |
| `JENKINS_AGENT_NAME` | jenkins | railway-agent | Build agent node name |
| `JENKINS_LOCATION_URL` | jenkins | - | Public URL used in links |
| `JENKINS_ADMIN_PASSWORD` | jenkins | (secret) | Administrator password |
| `JENKINS_AGENT_CONNECT_PASSWORD` | jenkins | (secret) | Password for the agent connect account |
| `JENKINS_URL` | jenkins-agent | - | Private controller address |
| `JENKINS_AGENT_NAME` | jenkins-agent | - | Must match the controller node name |
| `JENKINS_AGENT_CONNECT_PASSWORD` | jenkins-agent | (secret) | Agent connect account password |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/jenkins_home`
- **Volume:** `/home/jenkins/agent`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/jenkins-ci)
