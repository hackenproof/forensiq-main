export default defineNitroPlugin(() => {
  const missing = missingConfig(useRuntimeConfig());

  if (missing.length) console.warn(`Demo form disabled — missing env: ${missing.join(", ")}`);
});
