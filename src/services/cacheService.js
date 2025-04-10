const client = require('../config/cache');

client.connect().catch(console.error);

// 🔧 Utility to build consistent cache keys
const buildKey = (prefix, identifier) => `${prefix}:${identifier}`;

const setCache = async ({prefix, identifier, data, ttl = 60 * 10}) => {
  const key = buildKey(prefix, identifier);
  await client.set(key, JSON.stringify(data), { EX: ttl });
};


const getCache = async ({
  prefix,
  identifier,
  ttl = 60 * 10,
  fallbackFn,
}) => {
  const key = buildKey(prefix, identifier);
  const cached = await client.get(key);

  if (cached) {
    const data = JSON.parse(cached);
    return { ...data, from: "cache" }
  }

  if (typeof fallbackFn === 'function') {
    const data = await fallbackFn();
    if (data) {
      await setCache({prefix, identifier, data, ttl});
    }
    return data;
  }

  return null;
};

module.exports = {
  getCache,
  setCache,
  buildKey
};

