// utils.js

export async function fetchWithCache(url, cacheKey, cacheTime = 3600000) {

  const cached = localStorage.getItem(cacheKey);

  if (cached) {

    const { data, timestamp } = JSON.parse(cached);

    const now = Date.now();

    if (now - timestamp < cacheTime) {
      console.log("📦 Usando datos en cache");
      return data;
    }
  }

  console.log("🌐 Llamando API...");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      data,
      timestamp: Date.now()
    })
  );

  return data;
}