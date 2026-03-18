# Deploy Carbone-ee on Railway

Carbone document generator

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/yyosuA)

## About

Automate the creation of your documents using your favorite editor and your JSON data. Carbone generates the document in any format!

No need to code to create your template. Use naturally and without constraint your Word, Excel, PowerPoint, LibreOffice, Google Docs, and much more.

Save time using a straightforward API and one tool for everything: Invoices, Reports, Mail, …

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Carbone | `carbone/carbone-ee` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CARBONE_EE_PORT` | 8080 | Port use by Carbone to expose HTTP API |
| `CARBONE_EE_STUDIO` | true | - |
| `CARBONE_EE_FACTORIES` | - | Multithread parameter, number of Libreoffice, Onlyoffice or Chromium converter |
| `CARBONE_EE_STUDIOUSER` | - | If the authentication option is enabled, the browser requests an authentication to access the web page. Credentials have to be formated, such as: `[username]:[password] |
| `CARBONE_EE_MAXDATASIZE` | - | Maximum JSON data size accepted when rendering a report, the value must be bytes. Calcul example: 100 * 1024 * 1024 = 100MB |
| `CARBONE_EE_XLSMENABLED` | false | Accept xlsm export |
| `CARBONE_EE_AUTHENTICATION` | false | Enable authentification on Carbone API. |
| `CARBONE_EE_MAXTEMPLATESIZE` | - | The file size limit when uploading a new template through the request POST /template, the value must be bytes. Calcul example: 30 * 1024 * 1024 = 30MB |
| `CARBONE_EE_NBREPORTMAXPERBATCH` | - | Max number of report in a batch when batchSplitBy is used. If equal 0, batch processing is disable and return an error |
| `CARBONE_AUTHENTICATION_PUBLIC_KEY` | - | Set public key for authentication |
| `CARBONE_EE_CONVERTERFACTORYTIMEOUT` | 60000 | Maximum conversion/socket timeout for one render (unit: ms) |

## Configuration

- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/template`

**Category:** Automation

[View on Railway →](https://railway.com/template/yyosuA)
