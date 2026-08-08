"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
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
        <h1>Přihlášení do administrace</h1>
        <p>Přihlaste se pro úpravu služeb, galerie, ceníku a nastavení webu.</p>
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
          {error ? <p className={styles.errorText}>{error}</p> : null}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Přihlašování..." : "Přihlásit se"}
          </button>
        </form>
      </div>
    </div>
  );
}
