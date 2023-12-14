import { User, UserUpdatePayload } from "@/lib/api/users/types";

type UserApi = {
  id: number;
  email: string;
  is_activated: boolean;
  is_disabled: boolean;
  is_superuser: boolean;
  joined_at: string;
};

type UserUpdatePayloadApi = Pick<UserUpdatePayload, "email"> & {
  new_password?: string;
  current_password: string;
};

export function mapUserFromApi(user: UserApi): User {
  return {
    id: user.id,
    email: user.email,
    isActivated: user.is_activated,
    isDisabled: user.is_disabled,
    isSuperuser: user.is_superuser,
    joinedAt: new Date(user.joined_at),
  };
}

export function mapUserUpdateToApi(
  payload: UserUpdatePayload
): UserUpdatePayloadApi {
  return {
    email: payload.email,
    new_password: payload.newPassword,
    current_password: payload.currentPassword,
  };
}
