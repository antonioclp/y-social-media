"use client";

import { redirect } from "next/navigation";
import Cookies from "js-cookie";

/**
 * Front-end branch.
 */
export default function Home() {
  if (!Cookies.get("dXNy")) {
    redirect("/login");
  }

  return (
    <main>
      <span>Nextjs</span>
    </main>
  );
}
