"use client";

import { deleteCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { loginUser } from "@/lib/api/auth";
import { LoginPayload } from "@/lib/api/auth/types";
import { getCurrentUser } from "@/lib/api/users";
import { User } from "@/lib/api/users/types";
import { AUTH_COOKIE_KEY } from "@/lib/constants";

type UserContext = {
  user: User | null;
  isAuthenticated: boolean;
  load: () => Promise<void>;
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const missingUserProvider = "You forgot to wrap your app in <UserProvider>";

const UserContext = createContext<UserContext>({
  get user(): never {
    throw new Error(missingUserProvider);
  },
  get isAuthenticated(): never {
    throw new Error(missingUserProvider);
  },
  load: (): never => {
    throw new Error(missingUserProvider);
  },
  login: (): never => {
    throw new Error(missingUserProvider);
  },
  logout: (): never => {
    throw new Error(missingUserProvider);
  },
});

type UserProviderProps = React.PropsWithChildren;

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const logout = useCallback(async () => {
    setUser(null);
    deleteCookie(AUTH_COOKIE_KEY);
  }, [setUser]);

  const load = useCallback(async () => {
    try {
      const loadedUser = await getCurrentUser();
      setUser(loadedUser);
    } catch (error) {
      await logout();
    }
  }, [setUser, logout]);

  const login = useCallback(
    async (credentials: LoginPayload) => {
      const { token } = await loginUser(credentials);

      const decoded = jwtDecode<{ exp: number }>(token);
      setCookie(AUTH_COOKIE_KEY, token, {
        expires: new Date(decoded.exp * 1000),
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      await load();
    },
    [load]
  );

  const value = useMemo(
    () => ({ user, isAuthenticated, load, login, logout }),
    [user, isAuthenticated, load, login, logout]
  );

  useEffect(() => {
    const fetchUser = async () => {
      await load();
    };

    fetchUser();
  }, [load]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default function useUser(): UserContext {
  return useContext(UserContext);
}
