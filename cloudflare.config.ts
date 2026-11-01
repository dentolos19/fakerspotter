import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "fakerspotter",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-01",
    observability: {
      logs: { enabled: true },
      traces: { enabled: true },
      issues: { enabled: true },
    },
    domains: ["fakerspotter.dennise.me"],
    assets: { notFoundHandling: "none" },
    env: { ASSETS: bindings.assets() },
  }),
});
