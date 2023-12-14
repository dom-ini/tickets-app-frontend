import { getCookie } from "cookies-next";

import { FetchError } from "@/lib/api/errors";
import { AUTH_COOKIE_KEY } from "@/lib/constants";

export async function fetchData(url: string, fetchOptions?: RequestInit) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    fetchOptions
  );
  if (!res.ok) throw new FetchError(res.statusText, res.status);
  return res.json();
}

export async function fetchDataWithAuthorization(
  url: string,
  fetchOptions?: RequestInit
) {
  const authCookie = getCookie(AUTH_COOKIE_KEY);
  const options: RequestInit = {
    ...fetchOptions,
    headers: {
      ...fetchOptions?.headers,
      Authorization: `Bearer ${authCookie}`,
    },
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);
  if (!res.ok) {
    throw new FetchError(res.statusText, res.status);
  }
  return res.json();
}
