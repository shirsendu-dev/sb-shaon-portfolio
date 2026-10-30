export function getSiteOrigin(configuredUrl = "", env = process.env) {
  const deploymentHost = env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  const value = env.SITE_URL?.trim() || configuredUrl.trim()
    || (deploymentHost ? `https://${deploymentHost.trim()}` : "");

  if (!value) return "";

  const url = new URL(value);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("SITE_URL and site.url must use an absolute HTTP or HTTPS origin.");
  }

  return url.origin;
}
