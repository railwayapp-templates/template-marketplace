# Deploy Git Backup on Railway

Automated Github Backup System for Disaster Recovery

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/HgR-fs)

## About

## Git Backup

Automated Github Backup System for Disaster Recovery. This system takes daily snapshots of the whole organisation code and store them into S3 as a backup storage which is easily searchable based on date wise directory structure. 

## Example of ENV File

```
GITHUB_TOKEN=
GITHUB_ORG=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| git-backup | [romitkarmakar/git-backup](https://github.com/romitkarmakar/git-backup) | Worker |

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/HgR-fs)
