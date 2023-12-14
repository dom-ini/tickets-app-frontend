import { fetchData, fetchDataWithAuthorization } from "@/lib/api";
import { FetchError } from "@/lib/api/errors";
import {
  EmailAlreadyTakenError,
  InvalidCurrentPasswordError,
} from "@/lib/api/users/errors";
import { mapUserFromApi, mapUserUpdateToApi } from "@/lib/api/users/mapper";
import {
  RegisterPayload,
  User,
  UserUpdatePayload,
} from "@/lib/api/users/types";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const data = await fetchDataWithAuthorization(`/users/me`, {
      cache: "no-store",
    });
    return mapUserFromApi(data);
  } catch (err) {
    return null;
  }
}

export async function updateUser(
  payload: UserUpdatePayload
): Promise<User | null> {
  const apiPayload = mapUserUpdateToApi(payload);
  try {
    const data = await fetchDataWithAuthorization(`/users/me`, {
      method: "PATCH",
      body: JSON.stringify(apiPayload),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return mapUserFromApi(data);
  } catch (err) {
    if (err instanceof FetchError && err?.code === 403) {
      throw new InvalidCurrentPasswordError();
    }
    throw new Error("Failed to update user");
  }
}

export async function register(payload: RegisterPayload): Promise<void> {
  try {
    await fetchData(`/users`, {
      method: "POST",
      body: JSON.stringify(payload),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    if (err instanceof FetchError && err?.code === 400)
      throw new EmailAlreadyTakenError();
    throw new Error("Failed to register user");
  }
}
