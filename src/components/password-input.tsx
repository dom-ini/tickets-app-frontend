import * as React from "react";

import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ wrapperClassName, className, ...props }, ref) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const handlePasswordVisibilityClick = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className={cn("relative", wrapperClassName)}>
      <Input
        {...props}
        type={passwordVisible ? "text" : "password"}
        ref={ref}
        className={cn("", className)}
      />
      <Button
        type="button"
        variant="ghost"
        className="absolute right-0 bottom-0"
        size="icon"
        onClick={handlePasswordVisibilityClick}
      >
        {passwordVisible ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
