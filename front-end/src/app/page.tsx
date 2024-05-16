"use client";

import { redirect } from "next/navigation";
import Cookies from "js-cookie";

// Components
import { CardFetchPost, CardFetchUsersPost } from "./utils/components/Cards";
import { Header } from "./utils/components/Header";
import { Recommendations } from "./utils/components/Asides";

/**
 * Front-end branch.
 */
export default function Home() {
  if (!Cookies.get("dXNy")) {
    redirect("/login");
  }

  return (
    <main>
      <Header />
      <section>
        <CardFetchPost />
      </section>
      <section>
        <CardFetchUsersPost />
      </section>
      <Recommendations />
    </main>
  );
}
