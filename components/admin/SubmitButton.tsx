"use client";

import { useState, type ButtonHTMLAttributes, type MouseEvent } from "react";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pendingLabel?: string;
}

export function SubmitButton({ children, pendingLabel = "Ukládám...", className, disabled, onClick, ...props }: SubmitButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsPending(true);
    onClick?.(event);
  };

  return (
    <button
      {...props}
      className={className}
      disabled={disabled || isPending}
      onClick={handleClick}
    >
      {isPending ? pendingLabel : children}
    </button>
  );
}
