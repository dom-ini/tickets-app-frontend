import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ wrapperClassName, className, ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

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
          aria-label={`${passwordVisible ? "Ukryj" : "Pokaż"} hasło`}
          data-test="show-password"
        >
          {passwordVisible ? <Eye /> : <EyeOff />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
