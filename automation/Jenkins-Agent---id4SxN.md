# Deploy Jenkins Agent on Railway

A Jenkins automation agent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/id4SxN)

## About

# Jenkins

#### Build great things at any scale

The leading open source automation server, Jenkins provides hundreds of plugins to support building, deploying and automating any project.

### Agent Setup

#### Jenkins Node Setup

Follow these steps to create a node in your Jenkins instance.

1. Setup the agent on Jenkins
2. Go to your Jenkins dashboard
3. Go to Manage Jenkins option in main menu
4. Go to Nodes item in System Configuration
5. Go to New Node option in side menu
6. Fill the Node(agent) name and select the type; (e.g. Name: agent1, Type: Permanent Agent)
7. Now fill the fields like remote root directory, labels, # of executors, etc.
    - `root directory` should be set to `/home/jenkins/agent`
    - `Launch method` should be set to `Launch agent by connecting it to the controller`
8. Press the Save button and the agent1 will be registered, but offline for the time being. Click on it.
9. You should now see the secret used for the configuration of the template.

#### Template configuration
1. Set the `JENKINS_AGENT_NAME` environment variable to the agent name you selected above.
2. Set the `JENKINS_SECRET ` environment variable to the secret generated above.
3. Set the `JENKINS_URL` environment variable to the url of your Jenkins instance. If using the Jenkins Template, it should be set to `http://${{Jenkins.JENKINS_PRIVATE_URL}}:${{Jenkins.JENKINS_PRIVATE_PORT}}`

Your agent should now be setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Jenkins Agent | `jenkins/inbound-agent:jdk17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `JENKINS_URL` | - | Url for the Jenkins server. Should be in the format: http://${{Jenkins.JENKINS_PRIVATE_URL}}:${{Jenkins.JENKINS_PRIVATE_PORT}} |
| `JENKINS_SECRET` | (secret) | The secret as shown on the controller after creating the agent. |
| `JENKINS_AGENT_NAME` | - | The name of the agent, it should match the name you specified when creating the agent on the controller. |
| `JENKINS_AGENT_WORKDIR` | /home/jenkins/agent | - |

## Configuration

- **Volume:** `/home/jenkins/agent`

**Category:** Automation

[View on Railway →](https://railway.com/template/id4SxN)
