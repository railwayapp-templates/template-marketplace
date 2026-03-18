# Deploy Camunda BPMN Platform on Railway

Camunda BPM Platform: Workflow and process automation with BPMN and DMN.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/3WDvSx)

## About

Camunda BPM Platform is a powerful tool for workflow and process automation, supporting BPMN for process modeling and DMN for decision modeling. It provides a flexible, open-source solution for managing business processes.

**URLs for Access:**

**Welcome Page:** https://public-domain.up.railway.app/camunda-welcome/index.html

**Admin Console:** https://public-domain.up.railway.app/camunda
  - **Default Admin User:** `demo`
  - **Default Admin Password:** `demo`

- **Swagger UI:** https://public-domain.up.railway.app/swaggerui


For detailed documentation and further information, visit the [Camunda Documentation](https://docs.camunda.org/).

This setup allows you to quickly start using Camunda and leverage its features for business process management and automation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Camunda | `camunda/camunda-bpm-platform:run-latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/camunda-data`

**Category:** Automation

[View on Railway →](https://railway.com/template/3WDvSx)
