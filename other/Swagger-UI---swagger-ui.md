# Deploy Swagger UI on Railway

An interactive documentation built from an OpenAPI specification

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/swagger-ui)

## About

Swagger UI allows anyone — be it your development team or your end consumers — to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from your [OpenAPI (formerly known as Swagger) Specification](https://www.openapis.org/), with the visual documentation making it easy for back end implementation and client side consumption.

**[Example Swagger UI](https://petstore.swagger.io/)**

**There are a lot of environment variables you can change to control the behaviour of Swagger UI**. See the *Pre-Configured Environment Variables*.

Swagger UI requires an [OpenAPI specification](https://www.openapis.org/) which describes your API. It then builts a visual and interactive web documentation based on this specification. This file should be hosted and accessible on a public URL.

This template has multiple environment values that control the behaviour of Swagger UI. A full overview of these options can be found [here](https://github.com/swagger-api/swagger-ui/blob/HEAD/docs/usage/configuration.md).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Swagger UI | `swaggerapi/swagger-ui` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `URL` | - | The public URL pointing to API definition (normally swagger.json or swagger.yaml) |
| `PORT` | 80 | - |
| `FILTER` | false | Either "true", "false" or a string. If set, enables filtering. The top bar will show an edit box that you can use to filter the tagged operations that are shown. Can be Boolean to enable or disable, or a string, in which case filtering will be enabled using that string as the filter expression. Filtering is case sensitive matching the filter expression anywhere inside the tag |
| `DEEP_LINKING` | - | If set to true, enables deep linking for tags and operations which will add fragments in the URL which will link to the specific parts |
| `DOC_EXPANSION` | list | Controls the default expansion setting for the operations and tags. It can be 'list' (expands only the tags), 'full' (expands the tags and operations) or 'none' (expands nothing) |
| `SHOW_EXTENSIONS` | false | Controls the display of vendor extension (x-) fields and values for Operations, Parameters, Responses, and Schema |
| `TRY_IT_OUT_ENABLED` | - | Either "true" or "false", controls whether the "Try it out" section should be enabled by default |
| `DISPLAY_OPERATION_ID` | false | Controls the display of operationId in operations list |
| `PERSIST_AUTHORIZATION` | false | If set to true, it persists authorization data and it would not be lost on browser close/refresh |
| `SHOW_COMMON_EXTENSIONS` | false | Controls the display of extensions (pattern, maxLength, minLength, maximum, minimum) fields and values for Parameters |
| `DEFAULT_MODEL_RENDERING` | example | Either "example" or "model", controls how the model is shown when the API is first rendered. (The user can always switch the rendering for a given model by clicking the 'Model' and 'Example Value' links) |
| `DISPLAY_REQUEST_DURATION` | false | Controls the display of the request duration (in milliseconds) for "Try it out" requests |
| `SUPPORTED_SUBMIT_METHODS` | ["get", "put", "post", "delete", "options", "head", "patch", "trace"] | List of HTTP methods that have the "Try it out" feature enabled. An empty array disables "Try it out" for all operations. This does not filter the operations from the display |
| `DEFAULT_MODEL_EXPAND_DEPTH` | 1 | The default expansion depth for the model on the model-example section |
| `DEFAULT_MODELS_EXPAND_DEPTH` | 1 | The default expansion depth for models (set to -1 completely hide the models) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/swagger-ui)
