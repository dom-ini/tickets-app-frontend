import type { ResetPasswordPayload, TokenData } from "@/lib/api/auth/types";

interface TokenDataApi {
  access_token: string;
  token_type: string;
}

type ResetPasswordPayloadApi = Pick<ResetPasswordPayload, "token"> & {
  new_password?: string;
};

export function mapTokenFromApi(tokenData: TokenDataApi): TokenData {
  return {
    token: tokenData.access_token,
  };
}

export function mapResetPasswordToApi(
  payload: ResetPasswordPayload
): ResetPasswordPayloadApi {
  return {
    token: payload.token,
    new_password: payload.newPassword,
  };
}
