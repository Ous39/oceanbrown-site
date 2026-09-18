type Entry = { count: number; reset: number }; const buckets = new Map<string, Entry>();
export function rateLimit(key: string, maximum: number, windowMs: number) { const now = Date.now(); const current = buckets.get(key); if (!current || current.reset <= now) { buckets.set(key, { count: 1, reset: now + windowMs }); return true; } current.count += 1; if (buckets.size > 2_000) for (const [name, value] of buckets) if (value.reset <= now) buckets.delete(name); return current.count <= maximum; }
export function clientKey(request: Request, scope: string) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",").map(value => value.trim()).filter(Boolean);
  const ip = realIp || forwarded?.at(-1) || "unknown";
  return `${scope}:${ip}`;
}
