# Deploy ChatGPT-to-API on Railway

Create a fake API using ChatGPT's website

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Yxd_qk)

## About

#### For more info, please visit https://github.com/slippersheepig/ChatGPT-to-API-Railway
#### By default, no account is logged in. If you need local deployment, please visit https://github.com/slippersheepig/ChatGPT-to-API
#### Source code https://github.com/xqdoo00o/ChatGPT-to-API
#### API endpoint is https://the-name-you-defined-production.up.railway.app/v1/chat/completions
#### API KEY is sk-mjj
#### Copyright belongs to xqdoo00o. For more information, please see the author's project
#### If you want to deploy it yourself from github, please refer to the following steps
- 1. Log in to your github, create a new **private** blank repository, and copy the `Dockerfile` and `api_keys.txt` of this project to your project
 + The content in `api_keys.txt` can be edited and used for API authentication
 + If you want to log in to your account, you need to complete the following two steps (ignore this step if you do not log in to your account)
 + Create a new `harPool` folder in the repository, upload the `chatgpt.com.har` file into the folder, and add `COPY harPool/ /cta/harPool/` in the second to last line of the Dockerfile.
 + Create a new `accounts.txt` file in the repository, enter and save the account information in the following format, and add `COPY accounts.txt.` in the second to last line of the Dockerfile.
 ```
 email:password  
 ```
 + You can also fork this repository directly (not recommended, because non-paid GitHub users cannot make it private after forking, and your project has the risk of privacy leakage and abuse, especially if you add your account information, it is equivalent to being completely public)
- 2. Open [Railway](https://railway.app), click login in the upper right corner and select github to log in. Continue to click New Project in the upper right corner and follow the instructions below.
 + Click Deploy from Github repo and select the warehouse you created in the first step
 + Click Add variables, fill in SERVER_HOST for VARIABLE_NAME, fill in 0.0.0.0 for VALUE, and click Add on the right
 + Continue to click New Variable on the upper right, fill in PORT for VARIABLE_NAME, fill in 8080 for VALUE, and click Add on the right
 + You will find Apply 2 changes in the upper left corner of the webpage, click Deploy on the right side of it
 + Wait a few minutes and click Deployments below the project name. If the status has changed to Active, click View Logs on the right. If the last line shows that it is listening to 0.0.0.0:8080, the deployment is successful.
 + Click Settings under the project name, scroll down to the Networking option, click Generate Domain under Public Networking, and the XXX-production.up.railway.app that comes out is the API access address.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ChatGPT-to-API-Railway | [slippersheepig/ChatGPT-to-API-Railway](https://github.com/slippersheepig/ChatGPT-to-API-Railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `UA` | Mozilla/5.0 |
| `PORT` | 8080 |
| `SERVER_HOST` | 0.0.0.0 |
| `CLIENT_PROFILE` | Chrome_124 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/Yxd_qk)
