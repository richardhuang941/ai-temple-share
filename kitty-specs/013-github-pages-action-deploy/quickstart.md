# Quickstart

## Local verification

```bash
npm run build
```

## GitHub Pages release path

1. Push code to `main`
2. GitHub Actions runs `deploy-pages.yml`
3. Workflow builds `dist/`
4. Pages deploy job publishes artifact
