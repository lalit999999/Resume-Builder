# compile-service

Standalone LaTeX → PDF compiler, deployed separately from the Next.js app
(Vercel functions can't run TeX Live: binary size, ephemeral filesystem,
execution time limits). Exposes `POST /compile` over HTTP; the Next.js app
calls it via `COMPILE_SERVICE_URL`.

## Local dev

```sh
npm install
npm run dev
```

## Build & run

Always set container-level CPU/memory limits — a pathological `.tex` input
(e.g. deeply nested macros) can otherwise exhaust the host even with the
in-process 15s compile timeout:

```sh
docker build -t compile-service .
docker run -p 8080:8080 --memory=768m --cpus=1 --pids-limit=128 compile-service
```

Or with Compose:

```yaml
services:
  compile-service:
    build: ./compile-service
    ports: ["8080:8080"]
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 768M
```

## API

`POST /compile` — body `{ "texSource": "<latex source>" }`.

- `200` — PDF binary (`Content-Type: application/pdf`)
- `400` / `413` — malformed or oversized request
- `422` — compilation failed; body is `{ "error": "...", "log": "<sanitized log excerpt>" }`
