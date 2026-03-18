# Deploy chatgpt-on-wechat-freely on Railway

This Template allow you to deploy weChat robot simply. Default use link ai.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Fct8Sl)

## About

This template allows you to deploy a weChat robot simply, 
Default use link ai. You can register at https://chat.link-ai.tech. And you can add var override the default value. You can find all var and description in file config.py.And you can find open source at GitHub https://github.com/jeady5/chatgpt-on-wechat or Gitee https://gitee.com/jeady5/chatgpt-on-wechat.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wechatRobot | [jeady5/chatgpt-on-wechat](https://github.com/jeady5/chatgpt-on-wechat) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `use_linkai` | True | the flag to use link |
| `linkai_api_key` | (secret) | The api key from linkai |
| `linkai_app_code` | - | the app code from link ai |
| `group_name_white_list` | ["群聊名称"] | The WeChat Group Name List |

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/Fct8Sl)
