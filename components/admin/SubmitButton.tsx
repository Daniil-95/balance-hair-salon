"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes, type MouseEvent } from "react";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pendingLabel?: string;
  pendingTimeoutMs?: number;
}

export function SubmitButton({
  children,
  pendingLabel = "Ukládám...",
  pendingTimeoutMs = 7500,
  className,
  disabled,
  onClick,
  ...props
}: SubmitButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };

  useEffect(() => {
    const button = buttonRef.current;
    const form = button?.form;

    if (!button || !form) {
      return;
    }

    const handleSubmit = (event: Event) => {
      const submitEvent = event as SubmitEvent;
      if (submitEvent.submitter !== button) {
        return;
      }

      setIsPending(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsPending(false);
      }, pendingTimeoutMs);
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [pendingTimeoutMs]);

  return (
    <button
      ref={buttonRef}
      {...props}
      className={className}
      disabled={disabled || isPending}
      data-pending={isPending ? "true" : "false"}
      onClick={handleClick}
    >
      {isPending ? pendingLabel : children}
    </button>
  );
}
