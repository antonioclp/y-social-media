"use client";

import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import Cookies from "js-cookie";

// Components
import { CardFetchPost } from "@/app/utils/components/Cards";

// Interfaces
import { IGenericResponse, IGetComments } from "@/app/utils/interfaces";

// Api
import { genericFetch } from "@/app/utils/api";

export default function Post() {
  const [postComments, setPostComments] = useState<IGetComments[]>([]);
  const id = usePathname().split("/").pop();

  useEffect(() => {
    try {
      if (!Cookies.get("dXNy")) {
        redirect("/login");
      }

      const fetch = async () => {
        const obj: IGenericResponse = await genericFetch({
          option: "read-comments-by-post",
          method: "GET",
          endpoint: `comments/post/${id}`,
        });

        const { data }: IGenericResponse = obj;

        if (Array.isArray(data)) {
          const comments: IGetComments[] = data;

          const sortedComments = comments.sort((cA, cB) => {
            const dateComparison = cB.createdDate.localeCompare(cA.createdDate);

            if (dateComparison === 0) {
              return cB.createdTime.localeCompare(cA.createdTime);
            }

            return dateComparison;
          });

          setPostComments(sortedComments);
        }
      };

      fetch();
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  const onChange = async () => {
    
  }

  return (
    <main>
      <section>
        <CardFetchPost />
      </section>
      <section>
        {postComments.length > 0
          ? postComments.map((c) => {
              return <section key={c.commentId}>{c.message}</section>;
            })
          : <span>No comments available</span>}
      </section>
    </main>
  );
}
