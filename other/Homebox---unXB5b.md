# Deploy Homebox on Railway

A simple home inventory management software

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unXB5b)

## About

Homebox is the inventory and organization system built for the Home User! With a focus on simplicity and ease of use, Homebox is the perfect solution for your home inventory, organization, and management needs.

* [Website](https://homebox.software/)
* [Documentation](https://homebox.software/en/quick-start.html)
* [GitHub](https://github.com/sysadminsmedia/homebox)

*Note: The development of Homebox was [taken over by SysAdmins Media](https://sysadminsjournal.com/were-continuing-homebox-development/) following the original maintainer [archiving](https://github.com/hay-kot/homebox/issues/919) the project.*

**Tips**

* By default, the template has `HBOX_OPTIONS_ALLOW_REGISTRATION=true` to allow for initial setup. Once you have created your account, consider setting this variable to `false` to disable open registration.
* Since [Volumes on Railway](https://docs.railway.app/reference/volumes) are still a new feature, there is no option to access or backup the persistent data. While Homebox has the option to import/export an inventory, it currently *does not* offer a comprehensive backup/restore of an installation. This means attachments, such as images, will not be recoverable if the volume is deleted.
* A complete list of supported environment variables can be found [here](https://homebox.sysadminsmedia.com/en/quick-start.html#env-variables-configuration). These can be added to the Homebox service to enable support for features such as email.

*Note: This is a community-made template and therefore not supported by the Homebox team. Please direct help requests to the [Railway thread for the template](https://help.railway.app/templates/homebox-31aab3c1).*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Homebox | `ghcr.io/sysadminsmedia/homebox:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone |
| `PORT` | 7745 | - |
| `HBOX_OPTIONS_ALLOW_REGISTRATION` | true | Allow user registration (Consider disabling after setup) |

## Configuration

- **Healthcheck:** `/api/v1/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/unXB5b)
