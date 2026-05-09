"use client";

import { useAuth } from "@clerk/nextjs";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type ApiError = {
  status: number;
  error: string;
};

export async function fetchWithAuth<T>(
  getToken: () => Promise<string | null>,
  path: string,
  options?: RequestInit,
): Promise<T> {
  const token = await getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    let error = "Erro inesperado. Tente novamente.";
    try {
      const body = await res.json();
      if (body?.error) error = body.error;
    } catch {
      // ignore parse error
    }
    throw { status: res.status, error } satisfies ApiError;
  }

  return res.json() as Promise<T>;
}

export function useApiClient() {
  const { getToken } = useAuth();
  return {
    fetch: <T>(path: string, options?: RequestInit) =>
      fetchWithAuth<T>(getToken, path, options),
  };
}
