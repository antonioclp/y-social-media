"use client";

import { ChangeEvent } from "react";
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onClick = () => {
    console.log("oi");
  };

  return (
    <main>
      <Header />
      <section>
        <CardFetchPost onChange={onChange} onClick={onClick}/>
      </section>
      <section>
        <CardFetchUsersPost />
      </section>
      <Recommendations />
    </main>
  );
}
