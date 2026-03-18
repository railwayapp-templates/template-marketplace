# Deploy one-api on Railway

Access all LLM through the standard OpenAI API format, easy to deploy & use

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/X32mcN)

## About

***
The initial account username is root and password is 123456.

***



<p align="right">
    <a href="./README.md">中文</a> | <strong>English</strong> | <a href="./README.ja.md">日本語</a>
</p>

<p align="center">
  <a href="https://github.com/songquanpeng/one-api"><img alt="one-api logo" height="150" width="150" src="https://raw.githubusercontent.com/songquanpeng/one-api/main/web/default/public/logo.png"></a>
</p>

<div align="center">

# One API

_✨ Access all LLM through the standard OpenAI API format, easy to deploy &amp; use ✨_

</div>

<p align="center">
  <a href="https://raw.githubusercontent.com/songquanpeng/one-api/main/LICENSE">
    <img alt="license" src="https://img.shields.io/github/license/songquanpeng/one-api?color=brightgreen">
  </a>
  <a href="https://github.com/songquanpeng/one-api/releases/latest">
    <img alt="release" src="https://img.shields.io/github/v/release/songquanpeng/one-api?color=brightgreen&amp;include_prereleases">
  </a>
  <a href="https://hub.docker.com/repository/docker/justsong/one-api">
    <img alt="docker pull" src="https://img.shields.io/docker/pulls/justsong/one-api?color=brightgreen">
  </a>
  <a href="https://github.com/songquanpeng/one-api/releases/latest">
    <img alt="release" src="https://img.shields.io/github/downloads/songquanpeng/one-api/total?color=brightgreen&amp;include_prereleases">
  </a>
  <a href="https://goreportcard.com/report/github.com/songquanpeng/one-api">
    <img alt="GoReportCard" src="https://goreportcard.com/badge/github.com/songquanpeng/one-api">
  </a>
</p>

<p align="center">
  <a href="#deployment">Deployment Tutorial</a>
  ·
  <a href="#usage">Usage</a>
  ·
  <a href="https://github.com/songquanpeng/one-api/issues">Feedback</a>
  ·
  <a href="#screenshots">Screenshots</a>
  ·
  <a href="https://openai.justsong.cn/">Live Demo</a>
  ·
  <a href="#faq">FAQ</a>
  ·
  <a href="#related-projects">Related Projects</a>
  ·
  <a href="https://iamazing.cn/page/reward">Donate</a>
</p>

&gt; **Warning**: This README is translated by ChatGPT. Please feel free to submit a PR if you find any translation errors.

&gt; **Note**: The latest image pulled from Docker may be an `alpha` release. Specify the version manually if you require stability.

## Features
1. Support for multiple large models:
   + [x] [OpenAI ChatGPT Series Models](https://platform.openai.com/docs/guides/gpt/chat-completions-api) (Supports [Azure OpenAI API](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference))
   + [x] [Anthropic Claude Series Models](https://anthropic.com)
   + [x] [Google PaLM2 and Gemini Series Models](https://developers.generativeai.google)
   + [x] [Baidu Wenxin Yiyuan Series Models](https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html)
   + [x] [Alibaba Tongyi Qianwen Series Models](https://help.aliyun.com/document_detail/2400395.html)
   + [x] [Zhipu ChatGLM Series Models](https://bigmodel.cn)
2. Supports access to multiple channels through **load balancing**.
3. Supports **stream mode** that enables typewriter-like effect through stream transmission.
4. Supports **multi-machine deployment**. [See here](#multi-machine-deployment) for more details.
5. Supports **token management** that allows setting token expiration time and usage count.
6. Supports **voucher management** that enables batch generation and export of vouchers. Vouchers can be used for account balance replenishment.
7. Supports **channel management** that allows bulk creation of channels.
8. Supports **user grouping** and **channel grouping** for setting different rates for different groups.
9. Supports channel **model list configuration**.
10. Supports **quota details checking**.
11. Supports **user invite rewards**.
12. Allows display of balance in USD.
13. Supports announcement publishing, recharge link setting, and initial balance setting for new users.
14. Offers rich **customization** options:
    1. Supports customization of system name, logo, and footer.
    2. Supports customization of homepage and about page using HTML &amp; Markdown code, or embedding a standalone webpage through iframe.
15. Supports management API access through system access tokens.
16. Supports Cloudflare Turnstile user verification.
17. Supports user management and multiple user login/registration methods:
    + Email login/registration and password reset via email.
    + [GitHub OAuth](https://github.com/settings/applications/new).
    + WeChat Official Account authorization (requires additional deployment of [WeChat Server](https://github.com/songquanpeng/wechat-server)).
18. Immediate support and encapsulation of other major model APIs as they become available.


### Environment Variables
1. `REDIS_CONN_STRING`: When set, Redis will be used as the storage for request rate limiting instead of memory.
    + Example: `REDIS_CONN_STRING=redis://default:redispw@localhost:49153`
2. `SESSION_SECRET`: When set, a fixed session key will be used to ensure that cookies of logged-in users are still valid after the system restarts.
    + Example: `SESSION_SECRET=random_string`
3. `SQL_DSN`: When set, the specified database will be used instead of SQLite. Please use MySQL version 8.0.
    + Example: `SQL_DSN=root:123456@tcp(localhost:3306)/oneapi`
4. `LOG_SQL_DSN`: When set, a separate database will be used for the `logs` table; please use MySQL or PostgreSQL.
    + Example: `LOG_SQL_DSN=root:123456@tcp(localhost:3306)/oneapi-logs`
5. `FRONTEND_BASE_URL`: When set, the specified frontend address will be used instead of the backend address.
    + Example: `FRONTEND_BASE_URL=https://openai.justsong.cn`
6. 'MEMORY_CACHE_ENABLED': Enabling memory caching can cause a certain delay in updating user quotas, with optional values of 'true' and 'false'. If not set, it defaults to 'false'.
7. `SYNC_FREQUENCY`: When set, the system will periodically sync configurations from the database, with the unit in seconds. If not set, no sync will happen.
    + Example: `SYNC_FREQUENCY=60`
8. `NODE_TYPE`: When set, specifies the node type. Valid values are `master` and `slave`. If not set, it defaults to `master`.
    + Example: `NODE_TYPE=slave`
9. `CHANNEL_UPDATE_FREQUENCY`: When set, it periodically updates the channel balances, with the unit in minutes. If not set, no update will happen.
    + Example: `CHANNEL_UPDATE_FREQUENCY=1440`
10. `CHANNEL_TEST_FREQUENCY`: When set, it periodically tests the channels, with the unit in minutes. If not set, no test will happen.
    + Example: `CHANNEL_TEST_FREQUENCY=1440`
11. `POLLING_INTERVAL`: The time interval (in seconds) between requests when updating channel balances and testing channel availability. Default is no interval.
    + Example: `POLLING_INTERVAL=5`
12. `BATCH_UPDATE_ENABLED`: Enabling batch database update aggregation can cause a certain delay in updating user quotas. The optional values are 'true' and 'false', but if not set, it defaults to 'false'.
    +Example: ` BATCH_UPDATE_ENABLED=true`
    +If you encounter an issue with too many database connections, you can try enabling this option.
13. `BATCH_UPDATE_INTERVAL=5`: The time interval for batch updating aggregates, measured in seconds, defaults to '5'.
    +Example: ` BATCH_UPDATE_INTERVAL=5`
14. Request frequency limit:
    + `GLOBAL_API_RATE_LIMIT`: Global API rate limit (excluding relay requests), the maximum number of requests within three minutes per IP, default to 180.
    + `GLOBAL_WEL_RATE_LIMIT`: Global web speed limit, the maximum number of requests within three minutes per IP, default to 60.
15. Encoder cache settings:
    +`TIKTOKEN_CACHE_DIR`: By default, when the program starts, it will download the encoding of some common word elements online, such as' gpt-3.5 turbo '. In some unstable network environments or offline situations, it may cause startup problems. This directory can be configured to cache data and can be migrated to an offline environment.
    +`DATA_GYM_CACHE_DIR`: Currently, this configuration has the same function as' TIKTOKEN-CACHE-DIR ', but its priority is not as high as it.
16. `RELAY_TIMEOUT`: Relay timeout setting, measured in seconds, with no default timeout time set.
17. `RELAY_PROXY`: After setting up, use this proxy to request APIs.
18. `USER_CONTENT_REQUEST_TIMEOUT`: The timeout period for users to upload and download content, measured in seconds.
19. `USER_CONTENT_REQUEST_PROXY`: After setting up, use this agent to request content uploaded by users, such as images.
20. `SQLITE_BUSY_TIMEOUT`: SQLite lock wait timeout setting, measured in milliseconds, default to '3000'.
21. `GEMINI_SAFETY_SETTING`: Gemini's security settings are set to 'BLOCK-NONE' by default.
22. `GEMINI_VERSION`: The Gemini version used by the One API, which defaults to 'v1'.
23. `THE`: The system's theme setting, default to 'default', specific optional values refer to [here] (./web/README. md).
24. `ENABLE_METRIC`: Whether to disable channels based on request success rate, default not enabled, optional values are 'true' and 'false'.
25. `METRIC_QUEUE_SIZE`: Request success rate statistics queue size, default to '10'.
26. `METRIC_SUCCESS_RATE_THRESHOLD`: Request success rate threshold, default to '0.8'.
27. `INITIAL_ROOT_TOKEN`: If this value is set, a root user token with the value of the environment variable will be automatically created when the system starts for the first time.
28. `INITIAL_ROOT_ACCESS_TOKEN`: If this value is set, a system management token will be automatically created for the root user with a value of the environment variable when the system starts for the first time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| one-api | [chinpeerapat/one-api](https://github.com/chinpeerapat/one-api) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, Go, SCSS, CSS, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/X32mcN)
