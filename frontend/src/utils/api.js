export async function fetchAPI(endpoint, body) {
  const res = await fetch(`/api${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function mockFetch(data, delay = 1000) {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}
