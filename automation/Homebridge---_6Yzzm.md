# Deploy Homebridge on Railway

Lightweight server that emulates the iOS HomeKit API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_6Yzzm)

## About

Source: https://github.com/homebridge/homebridge

**Homebridge** is a lightweight Node.js server you can run on your home network that emulates the iOS HomeKit API. It supports Plugins, which are community-contributed modules that provide a basic bridge from HomeKit to various 3rd-party APIs provided by manufacturers of "smart home" devices. 

Since Siri supports devices added through HomeKit, this means that with Homebridge you can ask Siri to control devices that don't have any support for HomeKit at all. For instance, using just some of the available plugins, you can say:

 * _Siri, unlock the back door._ [pictured to the right]
 * _Siri, open the garage door._
 * _Siri, turn on the coffee maker._ 
 * _Siri, turn on the living room lights._
 * _Siri, good morning!_

You can explore all available plugins at the NPM website by [searching for the keyword `homebridge-plugin`](https://www.npmjs.com/search?q=homebridge-plugin).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| homebridge | `homebridge/homebridge` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/homebridge`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/_6Yzzm)
