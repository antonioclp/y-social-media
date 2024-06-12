"use client";

import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

// Api
import { genericFetch } from "@/app/utils/api";

export default function Post() {
  const id = usePathname().split("/").pop();

  useEffect(() => {
    if (!Cookies.get("dXNy")) {
      redirect("/login");
    }

    const fetch = async () => {
      const data = await genericFetch({
        option: "read-comments-by-post",
        method: "GET",
        endpoint: `comments/post/${id}`,
      });

      console.log(data);
    };

    fetch();
  }, [id]);

  return (
    <main>
      <section>Post by id</section>
    </main>
  );
}
