export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

/** A bounded, process-local sliding-window limiter. See deployment notes for multi-instance hosting. */
export class SlidingWindowRateLimiter {
  private readonly entries = new Map<string, number[]>();

  constructor(private readonly maxEntries = 10_000) {}

  check(
    key: string,
    limit: number,
    windowMs: number,
    now = Date.now(),
  ): RateLimitResult {
    const cutoff = now - windowMs;
    const recent = (this.entries.get(key) ?? []).filter(
      (timestamp) => timestamp > cutoff,
    );

    if (recent.length >= limit) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((recent[0] + windowMs - now) / 1000),
        ),
      };
    }

    if (!this.entries.has(key) && this.entries.size >= this.maxEntries) {
      for (const [storedKey, timestamps] of this.entries) {
        if (!timestamps.some((timestamp) => timestamp > cutoff))
          this.entries.delete(storedKey);
      }
      // Refuse excess new keys rather than evicting active entries and enabling a bypass.
      if (this.entries.size >= this.maxEntries)
        return {
          allowed: false,
          retryAfterSeconds: Math.ceil(windowMs / 1000),
        };
    }

    this.entries.set(key, [...recent, now]);
    return { allowed: true, retryAfterSeconds: 0 };
  }
}

export const contactRateLimiter = new SlidingWindowRateLimiter();
