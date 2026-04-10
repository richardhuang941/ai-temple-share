import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

function resolveDeployBase(): string {
  const explicitBase = process.env.DEPLOY_BASE?.trim();

  if (explicitBase) {
    return explicitBase;
  }

  if (process.env.GITHUB_PAGES !== "true") {
    return "/";
  }

  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];

  return repositoryName ? `/${repositoryName}/` : "/";
}

export default defineConfig({
  base: resolveDeployBase(),
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
    passWithNoTests: true
  }
});
