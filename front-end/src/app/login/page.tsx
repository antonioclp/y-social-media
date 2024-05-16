"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

// Fetch
import { fetchLogin } from "../utils/api";
import Image from "next/image";

// Style
import "@/styles/pages/login.css";

export default function Login() {
  const [error, setError] = useState(false);

  const formAction = async (form: FormData) => {
    const email = form.get("email-input") as string;
    const password = form.get("password-input") as string;

    const obj = await fetchLogin(email, password);

    if (obj.status !== 200) {
      setError(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setError(false);
      return;
    }

    Cookies.set("dXNy", JSON.stringify(obj.data));
    redirect("/");
  };

  return (
    <main className="lgn-m">
      <form action={formAction} className="lgn-m--form">
        <Image
          src="/icons/y-logo.png"
          alt="y"
          width={100}
          height={100}
          priority
        />
        <label htmlFor="password-input">
          <span>Email</span>
          <input type="text" id="email-input" name="email-input" />
        </label>
        <label htmlFor="password-input">
          <span>Password</span>
          <input type="password" id="password-input" name="password-input" />
        </label>
        <section>
          {error ? (
            <span id="lgn-m--form_err">Email or password are incorrect</span>
          ) : (
            <span>Connect and see the world</span>
          )}
          <span>
            {"Don't have account? Try "}
            <Link href="/register">register</Link>
          </span>
          <button type="submit">Login</button>
        </section>
      </form>
    </main>
  );
}
