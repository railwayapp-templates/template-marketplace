# Deploy beaverhabits on Railway

Open-source, private, and portable Habit Tracker with charts & streaks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/beaverhabits)

## About

Clone the template. Env variables are already configured. Launch, assign a domain, and create a user account.

?

 ## Why Deploy
? dude who made this template

 ## Common Use Cases
Tracking how many time you cheat on your wife 

 ## Dependencies for
Cheating on your wife

 ### Deployment Dependencies
Wife

<img width="250" src="https://github.com/daya0576/beaverhabits/assets/6239652/0418fa41-8985-46ef-b623-333b62b2f92e">
<img width="250" src="https://github.com/daya0576/beaverhabits/assets/6239652/c0ce98cf-5a44-4bbc-8cd3-c7afb20af671">
<img width="250" src="https://github.com/daya0576/beaverhabits/assets/6239652/516c19ca-9f55-4c21-9e6d-c8f0361a5eb2">

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| beaverhabits | `daya0576/beaverhabits:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HABITS_STORAGE` | DATABASE | DATABASE will store habits data in a SQLite file called habits.db. USER_DISK stores it as a JSON file called habits.json.  |
| `ENABLE_IOS_STANDALONE` | true | Experiential feature to enable standalone mode on iOS. The default setting is true. Lowercase. Disabling will turn off the PWA features. |
| `INDEX_HABIT_DATE_COLUMNS` | 7 | The number of days into the past you can see on the homescreen. Default is 5. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.user`

**Category:** Analytics

[View on Railway →](https://railway.com/template/beaverhabits)
