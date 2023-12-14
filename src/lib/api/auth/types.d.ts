export type TokenData = {
  token: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type ActivateAccountPayload = {
  token: string;
};

export type RequestPasswordResetPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  newPassword: string;
};
