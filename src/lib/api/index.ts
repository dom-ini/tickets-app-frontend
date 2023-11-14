export async function fetchData(url: string, fetchOptions: RequestInit) {
  const res = await fetch(`${process.env.API_URL}${url}`, fetchOptions);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
