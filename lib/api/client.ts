import { z } from "zod";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  timeoutMs?: number;
};

export async function apiFetch<T>(
  path: string,
  schema: z.ZodType<T>,
  options: RequestOptions = {},
): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? 15000);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });

    if (!response.ok) {
      let message = `Request failed with status ${response.status}`;
      try {
        const errorBody = await response.json();
        if (typeof errorBody.detail === "string") {
          message = errorBody.detail;
        } else if (Array.isArray(errorBody.detail) && errorBody.detail[0]?.msg) {
          message = errorBody.detail[0].msg;
        }
      } catch {
        // Keep the generic message.
      }
      throw new ApiError(message, response.status);
    }

    if (response.status === 204) {
      return schema.parse(undefined);
    }

    const json = await response.json();
    return schema.parse(json);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("The API did not respond in time.", 408);
    }
    throw new ApiError("The API is offline or returned an invalid response.", 0);
  } finally {
    window.clearTimeout(timeout);
  }
}