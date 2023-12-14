import { fetchData } from "@/lib/api";
import {
  AccountNotActivatedError,
  InvalidCredentialsError,
  InvalidTokenError,
} from "@/lib/api/auth/errors";
import { mapResetPasswordToApi, mapTokenFromApi } from "@/lib/api/auth/mapper";
import {
  ActivateAccountPayload,
  LoginPayload,
  RequestPasswordResetPayload,
  ResetPasswordPayload,
  TokenData,
} from "@/lib/api/auth/types";
import { FetchError } from "@/lib/api/errors";
import { toXWwwFormUrlEncoded } from "@/lib/utils";

export async function loginUser(loginData: LoginPayload): Promise<TokenData> {
  const body = toXWwwFormUrlEncoded(loginData);
  try {
    const data = await fetchData("/auth/login", {
      method: "POST",
      body,
      cache: "no-store",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const tokenData = mapTokenFromApi(data);
    return tokenData;
  } catch (err) {
    if (err instanceof FetchError) {
      if (err?.code === 401) {
        throw new InvalidCredentialsError();
      }
      if (err?.code === 403) {
        throw new AccountNotActivatedError();
      }
    }
    throw new Error("Failed to login");
  }
}

export async function activateAccount(
  payload: ActivateAccountPayload
): Promise<boolean> {
  try {
    await fetchData(`/auth/verify/${payload.token}`, {
      method: "POST",
      cache: "no-store",
    });
    return true;
  } catch (err) {
    return false;
  }
}

export async function requestPasswordReset(
  payload: RequestPasswordResetPayload
): Promise<void> {
  try {
    await fetchData("/auth/password/reset", {
      method: "POST",
      body: JSON.stringify(payload),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    throw new Error("Failed to request password reset");
  }
}

export async function resetPassword(
  payload: ResetPasswordPayload
): Promise<void> {
  const apiPayload = mapResetPasswordToApi(payload);
  try {
    await fetchData("/auth/password/reset/confirm", {
      method: "POST",
      body: JSON.stringify(apiPayload),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    if (err instanceof FetchError && err?.code === 400)
      throw new InvalidTokenError();
    throw new Error("Failed to reset password");
  }
}
