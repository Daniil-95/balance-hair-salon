"use client";

import type { FormHTMLAttributes, ReactNode } from "react";

interface ConfirmFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: ReactNode;
  message: string;
}

export function ConfirmForm({ children, message, ...props }: ConfirmFormProps) {
  return (
    <form
      {...props}
      onSubmit={(event) => {
        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </form>
  );
}
