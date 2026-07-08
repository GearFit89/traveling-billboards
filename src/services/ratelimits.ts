import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisClient = Redis.fromEnv(); // Re-use the same client instance to save memory

const defaultRatelimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
  prefix: "@upstash/ratelimit:default",        // Separate namespace
});

const heavyRatelimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(3, "60 s"),  // Separate namespace and stricter limits
  prefix: "@upstash/ratelimit:heavy",
});

export { defaultRatelimit, heavyRatelimit };