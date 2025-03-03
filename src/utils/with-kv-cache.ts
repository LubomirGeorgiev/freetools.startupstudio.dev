import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import ms from "ms";
import isProd from "./is-prod";

interface CacheOptions {
  key: string;
  ttl: string; // e.g., "1h", "5m", "1d"
}

export async function withKVCache<T>(
  fn: () => Promise<T>,
  { key, ttl }: CacheOptions
): Promise<T> {
  // In development mode, always bypass the cache
  if (!isProd) {
    return fn();
  }

  const { env } = await getCloudflareContext({ async: true });
  const kv = env.NEXT_CACHE_WORKERS_KV;

  // Try to get the cached value
  const cached = await kv.get<T>(key, "json");
  if (cached !== null) {
    return cached;
  }

  // If not cached, execute the function
  const result = await fn();

  // Cache the result with the specified TTL
  await kv.put(key, JSON.stringify(result), {
    expirationTtl: Math.floor(ms(ttl) / 1000), // Convert ms to seconds for KV
  });

  return result;
}
