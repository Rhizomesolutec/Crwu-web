/**
 * Centralized domain / subdomain configuration and parsing utilities.
 *
 * This is the ONLY place that should know how to turn a raw hostname into
 * an artist subdomain, or an artist subdomain into a URL. Nothing else in
 * the app should hardcode "crwu.com", "localhost", or port numbers.
 *
 * Local development:
 *   NEXT_PUBLIC_ROOT_DOMAIN=localhost   ->  mhr.localhost:3000
 *
 * Production (after buying the domain):
 *   NEXT_PUBLIC_ROOT_DOMAIN=crwu.com    ->  mhr.crwu.com
 *
 * Switching environments requires ONLY changing the environment variable
 * (plus real DNS / wildcard hosting configuration) — no code changes.
 */

/** Subdomains that must never be treated as an artist microsite. */
const RESERVED_SUBDOMAINS = new Set([
  "www",
  "app",
  "admin",
  "api",
  "mail",
  "ftp",
  "sites",
]);

/**
 * RFC-1035-style DNS label: lowercase letters/digits, optional internal
 * hyphens, 1-63 characters, cannot start/end with a hyphen.
 * Shared by the subdomain parser below AND the Artist Mongoose schema so
 * validation never drifts between the two.
 */
export const SUBDOMAIN_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

/** Root domain from env, always lowercased/trimmed, defaults to "localhost". */
export function getRootDomain(): string {
  return (process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost").toLowerCase().trim();
}

/** True when running against the local dev root domain. */
function isLocalRootDomain(rootDomain: string): boolean {
  return rootDomain === "localhost" || rootDomain === "127.0.0.1";
}

/** Convert any display name into a clean, URL-safe subdomain label. */
export function sanitizeSubdomain(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function isValidSubdomain(value: string): boolean {
  return SUBDOMAIN_PATTERN.test(value) && !RESERVED_SUBDOMAINS.has(value);
}

/** Strip a port number (":3000") and lowercase a raw Host header value. */
function normalizeHostname(host: string): string {
  return host.split(":")[0].toLowerCase().trim();
}

/**
 * Extract the artist subdomain label from a raw request Host header.
 *
 * Returns `null` for:
 *  - the main/root domain itself (e.g. "localhost:3000", "crwu.com")
 *  - the `www` subdomain (treated as the main site, never an artist)
 *  - any hostname that isn't a recognised single-level subdomain of the
 *    configured root domain (e.g. a Vercel preview URL, an IP address) —
 *    these safely fall back to rendering the main site.
 */
export function extractSubdomain(host: string | null | undefined): string | null {
  if (!host) return null;

  const hostname = normalizeHostname(host);
  const rootDomain = getRootDomain();

  if (hostname === rootDomain) return null;

  if (!hostname.endsWith(`.${rootDomain}`)) {
    return null;
  }

  const label = hostname.slice(0, hostname.length - rootDomain.length - 1);

  // Only single-level subdomains are supported (no a.b.rootdomain nesting).
  if (!label || label.includes(".")) return null;

  if (!isValidSubdomain(label)) return null;

  return label;
}

/** Fully-qualified base URL for the main CRWU site, e.g. for "back to CRWU" links. */
export function getRootSiteUrl(): string {
  const rootDomain = getRootDomain();
  const protocol = isLocalRootDomain(rootDomain) ? "http" : "https";
  const port = isLocalRootDomain(rootDomain)
    ? `:${process.env.NEXT_PUBLIC_DEV_PORT || "3000"}`
    : "";
  return `${protocol}://${rootDomain}${port}`;
}

/** Fully-qualified URL for a given artist's dedicated microsite. */
export function getArtistUrl(subdomain: string): string {
  const rootDomain = getRootDomain();
  const protocol = isLocalRootDomain(rootDomain) ? "http" : "https";
  const port = isLocalRootDomain(rootDomain)
    ? `:${process.env.NEXT_PUBLIC_DEV_PORT || "3000"}`
    : "";
  return `${protocol}://${subdomain}.${rootDomain}${port}`;
}
