# Deploy Traggo on Railway

Tag-based time tracking tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/e88vkn)

## About

Traggo is a tag-based time tracking tool. In Traggo there are no tasks, only [tagged](https://traggo.net/terminology/#tag) [time spans](https://traggo.net/terminology/#timespan).

With [tags](https://traggo.net/terminology/#tag), Traggo tries to be as customizable as possible, f.ex. if you work on different projects you could add a `project`-tag.
If you like to see statistics from the different things you do, you could add a `type`-tag with values like `email`, `programming`, `meeting`. 
You can do it just as you like.

## Features

* easy to setup
* time tracking (obviously)
* customizable dashboards with diagrams
* a list and calendar view of the tracked time
* sleek web ui with multiple themes
* simple user management

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| traggo/server:latest | `traggo/server:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3030 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/traggo/data`

**Category:** Other

[View on Railway →](https://railway.com/template/e88vkn)
