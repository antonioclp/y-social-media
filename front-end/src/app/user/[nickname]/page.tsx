"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

// Interfaces
import { IPostsFetch, IUser } from "@/app/utils/interfaces";
import { genericFetch } from "@/app/utils/api";
import { CardFetchUsersPost } from "@/app/utils/components/Cards";

export default function Profile() {
  const [usrObj, setUsrObj] = useState<IUser>({});
  const [usrPosts, setUsrPosts] = useState<IPostsFetch[]>([]);
  const [editBioEnable, setEditBioEnable] = useState<boolean>(false);

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

  const onClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    const { id } = target;

    if (id === "edit-bio") {
      setEditBioEnable(true);
      return;
    }

    if (id === "confirm-edit") {
      setEditBioEnable(false);
      return;
    }
  };

  return (
    <main>
      <section>
        <span>{usrObj.nickname}</span>
        <span>{usrObj.username}</span>
        {editBioEnable ? (
          <section>
            <textarea
              placeholder="Insert your bio."
              maxLength={250}
              rows={2}
              cols={20}
            ></textarea>
            <Image
              src="/icons/confirmation.png"
              alt="confirm"
              width={20}
              height={20}
              priority
              id="confirm-edit"
              onClick={onClick}
            />
          </section>
        ) : (
          <p>{usrObj.bio}</p>
        )}
        <Image
          src="/icons/edit.png"
          alt="bio"
          width={20}
          height={20}
          priority
          id="edit-bio"
          onClick={onClick}
        />
      </section>
      <section>
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
      </section>
    </main>
  );
}
