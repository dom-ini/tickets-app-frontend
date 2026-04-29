"use client";

import { createContext, useContext } from "react";

type DemoModeContext = {
  isDemoMode: boolean;
  testUsername: string;
  testPassword: string;
};

const missingDemoModeProvider =
  "You forgot to wrap your app in <DemoModeProvider>";

const DemoModeContext = createContext<DemoModeContext>({
  get isDemoMode(): never {
    throw new Error(missingDemoModeProvider);
  },
  get testUsername(): never {
    throw new Error(missingDemoModeProvider);
  },
  get testPassword(): never {
    throw new Error(missingDemoModeProvider);
  },
});

type DemoModeProviderProps = React.PropsWithChildren;

export function DemoModeProvider({ children }: DemoModeProviderProps) {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE_ENABLED === "true";
  const testUsername = process.env.NEXT_PUBLIC_DEMO_USERNAME || "";
  const testPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD || "";

  return (
    <DemoModeContext.Provider
      value={{ isDemoMode, testUsername, testPassword }}
    >
      {children}
    </DemoModeContext.Provider>
  );
}

export default function useDemoMode(): DemoModeContext {
  return useContext(DemoModeContext);
}
