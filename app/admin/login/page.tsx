"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";

export default function AdminLoginPage() {
  const [mode, setMode] = useState<"login" | "setup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setupKey, setSetupKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const endpoint = mode === "setup" ? "/api/admin/setup" : "/api/admin/login";
    const payload = mode === "setup" ? { email, password, setupKey } : { email, password };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      router.push("/admin");
      return;
    }

    const result = await response.json();
    setError(result?.message ?? "Neplatné přihlašovací údaje.");
    setIsSubmitting(false);
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1>{mode === "setup" ? "Prvotní nastavení administrace" : "Přihlášení do administrace"}</h1>
        <p>
          {mode === "setup"
            ? "Vytvořte prvního administrátora pomocí setup klíče. Po vytvoření už používejte běžné přihlášení."
            : "Přihlaste se pro úpravu služeb, galerie, ceníku a nastavení webu."}
        </p>

        <div className={styles.modeSwitch}>
          <button
            type="button"
            className={mode === "login" ? styles.modeActive : ""}
            onClick={() => {
              setMode("login");
              setError(null);
            }}
          >
            Přihlášení
          </button>
          <button
            type="button"
            className={mode === "setup" ? styles.modeActive : ""}
            onClick={() => {
              setMode("setup");
              setError(null);
            }}
          >
            Vytvořit admina
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Heslo
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {mode === "setup" ? (
            <label>
              Setup klíč
              <input
                type="password"
                value={setupKey}
                onChange={(event) => setSetupKey(event.target.value)}
                required
                autoComplete="off"
              />
            </label>
          ) : null}
          {error ? <p className={styles.errorText}>{error}</p> : null}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? mode === "setup"
                ? "Vytváření účtu..."
                : "Přihlašování..."
              : mode === "setup"
                ? "Vytvořit admin účet"
                : "Přihlásit se"}
          </button>
        </form>
      </div>
    </div>
  );
}
