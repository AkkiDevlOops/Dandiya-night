import { redis } from "@/lib/redis";

const DISCOVERY_TTL = 300; // 5 minutes

export function discoveryCacheKey(userId, limit = 10) {
  const safeLimit = Math.min(
    Math.max(Number(limit) || 10, 1),
    20
  );

  return `raas-mitra:discovery:${String(userId)}:${safeLimit}`;
}

export async function getDiscoveryCache(userId, limit = 10) {
  try {
    const key = discoveryCacheKey(userId, limit);

    const cached = await redis.get(key);

    if (!cached) {
      return null;
    }

    return cached;
  } catch (error) {
    console.error("Redis GET discovery error:", error);
    return null;
  }
}

export async function setDiscoveryCache(
  userId,
  users,
  limit = 10
) {
  try {
    const key = discoveryCacheKey(userId, limit);

    await redis.set(key, users, {
      ex: DISCOVERY_TTL,
    });

    return true;
  } catch (error) {
    console.error("Redis SET discovery error:", error);
    return false;
  }
}

export async function clearDiscoveryCache(
  userId,
  limit = 10
) {
  try {
    const key = discoveryCacheKey(userId, limit);

    await redis.del(key);

    return true;
  } catch (error) {
    console.error("Redis DELETE discovery error:", error);
    return false;
  }
}   