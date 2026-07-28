# Deploy Code Sandbox | Run Agent-Written Code With the Network Off on Railway

Run agent-written code with the network off and a hard time limit.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/code-sandbox-or-run-agent-written-code-w)

## About

An HTTP endpoint that runs JavaScript, TypeScript and Python with the network off, the filesystem closed, and a wall-clock limit — built for the code an AI agent just produced, which has to run somewhere that is not your application process.

Send code, get back stdout, stderr, exit code and duration. Nothing else crosses the boundary.

Agents write code, and something has to execute it. Doing that inside your own service means one infinite loop takes the whole thing down, and one careless `fetch` sends your environment variables to an address the model invented.

The option already in the catalogue is Judge0: 216 installs, 48% of deployments coming up. That rate is not a packaging mistake — Judge0 isolates through `isolate`, which needs cgroup privileges a managed platform does not grant. It cannot work in this environment, and it keeps being deployed anyway.

This template uses a boundary that does exist inside an ordinary container. The submitted code runs in a child process started with every permission denied, and Deno's runtime enforces that: no network, no subprocesses, no environment access, no writes, and reads limited to the single file being run. Python is CPython compiled to WebAssembly, so it has no system interpreter to fall back on — `urllib` is refused exactly the way `fetch` is.

**Where the boundary is.** This is process-level isolation, not a virtual machine. It is the right tool for code your own model generated — careless rather than hostile: runaway loops, accidental allocations, unintended network calls. It is not the right tool for running code submitted by strangers, which needs a kernel boundary (Firecracker, gVisor, Kata) and therefore host access no managed container has. Stated plainly here rather than discovered later.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Code Sandbox | [ak40u/code-sandbox-railway-starter](https://github.com/ak40u/code-sandbox-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `SANDBOX_TOKEN` | (secret) |
| `MAX_CONCURRENCY` | 4 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/code-sandbox-or-run-agent-written-code-w)
