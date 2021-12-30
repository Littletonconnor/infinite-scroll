interface Config {
  data?: unknown;
}

export default async function apiClient(
  offset: number,
  limit: number,
  { data }: Config = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return window.fetch(apiUrl, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}
