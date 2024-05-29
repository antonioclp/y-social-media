"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

// Interfaces
import { IPostsFetch, IUser } from "@/app/utils/interfaces";
import { genericFetch } from "@/app/utils/api";
import { CardFetchUsersPost } from "@/app/utils/components/Cards";

export default function Profile() {
  const [usrObj, setUsrObj] = useState<IUser>({});
  const [usrPosts, setUsrPosts] = useState<IPostsFetch[]>([]);

  useEffect(() => {
    try {
      if (!Cookies.get("dXNy")) {
        redirect("/login");
      }

      const obj: IUser = JSON.parse(Cookies.get("dXNy") || "{}");

      if (!obj.email && !obj.nickname) {
        redirect("/login");
      }

      setUsrObj(obj);

      const fetchPosts = async () => {
        const res = await genericFetch(
          {
            endpoint: "posts",
            method: "GET",
            option: "read-user-posts",
          },
          null,
          obj.nickname
        );

        if (res.data !== null && Array.isArray(res.data)) {
          setUsrPosts(res.data);
        }
      };

      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <main>
      <div>
        {usrPosts.length > 0
          ? usrPosts.map((p, index) => {
              return (
                <section key={index}>
                  <CardFetchUsersPost
                    user={p.user}
                    createdDate={p.createdDate}
                    createdTime={p.createdTime}
                    message={p.message}
                  />
                </section>
              );
            })
          : null}
      </div>
    </main>
  );
}
