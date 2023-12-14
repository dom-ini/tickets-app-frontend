export type User = {
  email: string;
  isActivated: boolean;
  isDisabled: boolean;
  isSuperuser: boolean;
  joinedAt: Date;
  id: number;
};

export type UserUpdatePayload = {
  email?: string;
  newPassword?: string;
  currentPassword: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
};
